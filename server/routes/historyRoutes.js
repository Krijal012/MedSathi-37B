import express from "express";
import { createHistory, getPatientHistory } from "../controller/historyController.js";

const router = express.Router();

router.post("/", createHistory);
router.get("/:patientName", getPatientHistory);

export { router as historyRouter };
