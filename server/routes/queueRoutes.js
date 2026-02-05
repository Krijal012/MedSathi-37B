import express from "express";
import { getPharmacistQueue, getCurrentQueue, updateQueueStatus } from "../controller/queueController.js";

export const queueRouter = express.Router();

queueRouter.get("/pharmacist", getPharmacistQueue);
queueRouter.get("/current", getCurrentQueue);
queueRouter.patch("/:id/status", updateQueueStatus);
