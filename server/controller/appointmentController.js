import { Appointment } from "../model/appointmentModel.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get appointments for a specific patient (by name for simplicity)
export const getPatientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({ where: { patientName: req.params.patientName } });
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete/Cancel an appointment
export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Appointment.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
        } else {
            res.status(404).json({ success: false, message: "Appointment not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
