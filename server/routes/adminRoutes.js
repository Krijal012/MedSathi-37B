import express from "express";
import { getAdminStats, getRecentActivities } from "../controller/adminController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

export const adminRouter = express.Router();

// All admin routes are protected
adminRouter.use(authenticate, authorize('admin'));

adminRouter.get("/stats", getAdminStats);
adminRouter.get("/activities", getRecentActivities);
