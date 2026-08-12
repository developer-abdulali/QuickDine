import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { Restaurant } from "../models/restaurant.model.js";
import uploadToCloudinary from "../config/cloudinary.js";
import { Booking } from "../models/bookings.model.js";

// Get owner's restaurants
// GET /api/owner/restaurant
export const getOwnerRestaurant = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const restaurants = await Restaurant.find({ owner: req.user?._id }).sort({
      createdAt: -1,
    });
    res.json(restaurants);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Create owner's restaurant (submitted to pending)
// POST /api/owner/restaurant
export const createOwnerRestaurant = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const {
      name,
      description,
      cuisine,
      priceRange,
      location,
      address,
      chef,
      tags,
      availableSlots,
      totalSeats,
    } = req.body;

    if (
      !name ||
      !description ||
      !cuisine ||
      !priceRange ||
      !location ||
      !address ||
      !chef
    ) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const slugExisting = await Restaurant.findOne({ slug });
    if (slugExisting) {
      res
        .status(400)
        .json({ message: "A restaurant with this name already exists" });
      return;
    }

    // Handle image
    let imageUrl = "";
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer);
        // @ts-ignore
        imageUrl = result.secure_url;
      } catch (uploadError: any) {
        console.error("Image upload failed", uploadError);
      }
    }

    // Setup parsed tags and slots
    const parsedTags =
      typeof tags === "string"
        ? tags.split(",").map((t) => t.trim())
        : tags || [];

    const parsedSlots =
      typeof availableSlots === "string"
        ? availableSlots.split(",").map((s) => s.trim())
        : availableSlots || ["17:00", "18:00", "19:00", "20:00", "21:00"];

    const restaurant = await Restaurant.create({
      name,
      slug,
      description,
      cuisine,
      priceRange,
      location,
      address,
      chef,
      image: imageUrl,
      tags: parsedTags,
      availableSlots: parsedSlots,
      totalSeats: totalSeats ? Number(totalSeats) : 20,
      owner: req.user?._id,
      status: "pending",
    });

    res.json(restaurant);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Update owner's restaurant
// PUT /api/owner/restaurant/:id
export const updateOwnerRestaurant = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOne({
      _id: req.params.id,
      owner: req.user?._id,
    });
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant profile not found" });
      return;
    }

    const {
      name,
      description,
      cuisine,
      priceRange,
      location,
      address,
      chef,
      tags,
      availableSlots,
      totalSeats,
    } = req.body;

    if (name) restaurant.name = name;
    if (description) restaurant.description = description;
    if (cuisine) restaurant.cuisine = cuisine;
    if (priceRange) restaurant.priceRange = priceRange;
    if (location) restaurant.location = location;
    if (address) restaurant.address = address;
    if (chef) restaurant.chef = chef;
    if (totalSeats) restaurant.totalSeats = totalSeats;

    if (tags) {
      restaurant.tags =
        typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : tags;
    }

    if (availableSlots) {
      restaurant.availableSlots =
        typeof availableSlots === "string"
          ? availableSlots.split(",").map((t) => t.trim())
          : availableSlots;
    }

    // Handle image
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer);
        // @ts-ignore
        restaurant.image = result.secure_url;
      } catch (uploadError: any) {
        console.error("Image upload failed", uploadError);
      }
    }

    const updated = await restaurant.save();
    res.json(updated);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Get bookings for all owner's restaurants
// GET /api/owner/bookings
export const getOwnerBookings = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const restaurants = await Restaurant.find({ owner: req.user?._id });
    const restaurantIds = restaurants.map((r) => r._id);

const bookings = await Booking.find({
      restaurant: { $in: restaurantIds },
    })
      .populate("user", "name email phone")
      .populate("restaurant", "name location image slug status")
      .sort({ date: -1, time: -1 });

    res.json(bookings);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Update status of a booking
// PUT /api/owner/bookings/:id/status
export const updateBookingStatus = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { status } = req.body;
    if (!status || !["confirmed", "cancelled", "completed"].includes(status)) {
      res.status(400).json({ message: "Please enter a valid booking status" });
      return;
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    // Verify booking belongs to the owner's restaurant
    const restaurant = await Restaurant.findById(booking.restaurant);
    if (
      !restaurant ||
      restaurant.owner.toString() !== req.user?._id.toString()
    ) {
      res
        .status(401)
        .json({ message: "Not authorized to manage this booking" });
      return;
    }

    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};
