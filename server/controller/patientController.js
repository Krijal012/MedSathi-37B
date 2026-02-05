import { Patient } from "../model/patientModel.js";

// Create a new patient
export const createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json({ success: true, data: patient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all patients
export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json({ success: true, data: patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get patient by ID
export const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });
        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update patient
export const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });
        await patient.update(req.body);
        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete patient
export const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });
        await patient.destroy();
        res.status(200).json({ success: true, message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
