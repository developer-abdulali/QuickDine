import { Router } from "express";
import { adminOnly, protect } from "../middlewares/auth.middleware.js";
import {
  approveRejectRestaurant,
  deleteRestaurant,
  deleteUser,
  getAdminStats,
  getAllRestaurants,
  getAllUsers,
  updateUserRole,
} from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.use(protect);
adminRouter.use(adminOnly);

adminRouter.get("/restaurants", getAllRestaurants);
adminRouter.put("/restaurants/:id/approve", approveRejectRestaurant);
adminRouter.delete("/restaurants/:id", deleteRestaurant);
adminRouter.get("/users", getAllUsers);
adminRouter.put("/users/:id/role", updateUserRole);
adminRouter.delete("/users/:id", deleteUser);
adminRouter.get("/stats", getAdminStats);

export default adminRouter;
