import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// Register a new user (/api/auth/register)
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please enter all required fields" });
      return;
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPass,
      phone,
      role,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error: any) {
    console.error("Error while creating user", error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Login user (/api/auth/login)
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({ message: "Please enter all required fields" });
      return;
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id.toString()),
    });
  } catch (error: any) {
    console.error("Error while login user", error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};

// Get user profile (/api/auth/me) @private access
export const getUserProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // @ts-ignore
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    // @ts-ignore
    res.json(req.user);
  } catch (error: any) {
    console.error("Error getting user", error);
    res.status(400).json({
      message: error.message || "Internal server error",
    });
  }
};
