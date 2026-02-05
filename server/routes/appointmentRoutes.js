import express from "express";
import {
    createAppointment,
    getAllAppointments,
    getPatientAppointments,
    deleteAppointment,
    updateAppointmentStatus
} from "../controller/appointmentController.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAllAppointments);
router.get("/patient/:patientName", getPatientAppointments);
router.delete("/:id", deleteAppointment);
router.patch("/:id/status", updateAppointmentStatus);

export { router as appointmentRouter };
