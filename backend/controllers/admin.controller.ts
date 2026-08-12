import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { Booking } from "../models/bookings.model.js";
import { Restaurant } from "../models/restaurant.model.js";
import { User } from "../models/user.model.js";

// Get all restaurants for admin management
// GET /api/admin/restaurants
export const getAllRestaurants = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const restaurants = await Restaurant.find({})
      .populate("owner", "name email address")
      .sort({ createdAt: -1 });

    res.json(restaurants);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Approve/Reject restaurant profile
// PUT /api/admin/restaurants/:id/approve
export const approveRejectRestaurant = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { status } = req.body;
    if (!status || !["approved", "rejected", "pending"].includes(status)) {
      res
        .status(400)
        .json({ message: "Please provide a valid approval status" });
      return;
    }

    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant profile not found" });
      return;
    }

    restaurant.status = status;
    await restaurant.save();

    res.json(restaurant);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Get all users for admin management
// GET /api/admin/users
export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Update a user's role
// PUT /api/admin/users/:id/role
export const updateUserRole = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { role } = req.body;
    if (!role || !["user", "admin", "owner"].includes(role)) {
      res.status(400).json({ message: "Please provide a valid role" });
      return;
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Prevent changing your own role to avoid account lockout
    if (user._id.toString() === req.user?._id.toString()) {
      res.status(400).json({ message: "You cannot change your own role" });
      return;
    }

    user.role = role;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Delete a user along with their restaurants and bookings
// DELETE /api/admin/users/:id
export const deleteUser = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (req.params.id === req.user?._id.toString()) {
      res.status(400).json({ message: "You cannot delete your own account" });
      return;
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const restaurants = await Restaurant.find({ owner: user._id }).select(
      "_id",
    );
    const restaurantIds = restaurants.map((r) => r._id);

    await Booking.deleteMany({ user: user._id });
    if (restaurantIds.length) {
      await Booking.deleteMany({ restaurant: { $in: restaurantIds } });
      await Restaurant.deleteMany({ owner: user._id });
    }
    await User.deleteOne({ _id: user._id });

    res.json({ message: "User and related data deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Delete a restaurant along with its bookings
// DELETE /api/admin/restaurants/:id
export const deleteRestaurant = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant profile not found" });
      return;
    }

    await Booking.deleteMany({ restaurant: restaurant._id });
    await Restaurant.deleteOne({ _id: restaurant._id });

    res.json({ message: "Restaurant and related bookings deleted" });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Get system statistics
// GET /api/admin/stats
export const getAdminStats = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalOwners = await User.countDocuments({ role: "owner" });
    const totalBookings = await Booking.countDocuments({});
    const totalRestaurants = await Restaurant.countDocuments({});

    // Get latest 10 bookings
    const latestBookings = await Booking.find({})
      .populate("user", "name email")
      .populate("restaurant", "name")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      users: { totalUsers, totalOwners, total: totalUsers + totalOwners },
      restaurants: { total: totalRestaurants },
      bookings: { total: totalBookings },
      latestBookings,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};
