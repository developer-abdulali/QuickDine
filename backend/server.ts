import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.router.js";
import restaurantRouter from "./routes/restaurant.router.js";
import bookingRouter from "./routes/booking.router.js";
import ownerRouter from "./routes/owner.router.js";

const app = express();

await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/owner", ownerRouter);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandle Error:", err);
  res.status(500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
