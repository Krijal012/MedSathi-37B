import express from "express";
import {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    searchPatients,
    getMePatient,
    updateMePatient
} from "../controller/patientController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authenticate, getMePatient);
router.put("/me", authenticate, updateMePatient);
router.get("/search", searchPatients);

router.post("/", createPatient);
router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export { router as patientRouter };
