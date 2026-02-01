import express from "express";
import { register, login } from "../Controller/authController.js";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../Controller/userController.js";

export const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);