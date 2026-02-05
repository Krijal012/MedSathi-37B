import express from "express";
import { getAllDoctors, createDoctor, updateDoctor, deleteDoctor } from "../controller/doctorController.js";

export const doctorRouter = express.Router();

doctorRouter.get("/", getAllDoctors);
doctorRouter.post("/", createDoctor);
doctorRouter.put("/:id", updateDoctor);
doctorRouter.delete("/:id", deleteDoctor);
