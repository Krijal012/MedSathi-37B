// routes/userRoutes.js
import express from "express";
import { register, login, getMe, logout } from "../Controller/authController.js";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../Controller/userController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

export const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", authenticate, getMe);
router.post("/logout", authenticate, logout);

// User management routes
router.get("/users", authenticate, authorize('admin'), getAllUsers);
router.get("/users/:id", authenticate, getUserById);
router.put("/users/:id", authenticate, updateUser);
router.delete("/users/:id", authenticate, authorize('admin'), deleteUser);