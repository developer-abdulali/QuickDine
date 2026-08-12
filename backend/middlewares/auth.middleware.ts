import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user.model.js";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };

      // Get user from token and exclude password
      const user = await User.findById(decode.id).select("-password");
      if (!user) {
        res.status(401).json({ message: "Not authorized, user not found" });
        return;
      }

      req.user = user;
      next();
    } catch (error: any) {
      console.error("Auth middleware error", error);
      res.status(400).json({
        message: error.message || "Internal server error",
      });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied, admin role required",
    });
  }
};

export const ownerOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (req.user && (req.user.role === "owner" || req.user.role === "admin")) {
    next();
  } else {
    res.status(403).json({
      message: "Access denied, restaurant owner role required",
    });
  }
};
