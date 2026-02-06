import { Patient } from "../model/patientModel.js";
import { User } from "../model/userModel.js";
import { sequelize } from "../database/db.js";
import { Op } from "sequelize";

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
    const transaction = await sequelize.transaction();
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) {
            await transaction.rollback();
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        // Delete from User table first
        await User.destroy({
            where: { email: patient.email },
            transaction
        });

        // Delete from Patient table
        await patient.destroy({ transaction });

        await transaction.commit();
        res.status(200).json({ success: true, message: "Patient and user account deleted successfully" });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ success: false, message: error.message });
    }
};

// Search patients by name
export const searchPatients = async (req, res) => {
    const { query } = req.query;
    try {
        const patients = await Patient.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).json({ success: true, data: patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// Get current logged in patient profile
export const getMePatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({ where: { email: req.user.email } });
        if (!patient) return res.status(404).json({ success: false, message: "Patient profile not found" });
        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update current logged in patient profile
export const updateMePatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({ where: { email: req.user.email } });
        if (!patient) return res.status(404).json({ success: false, message: "Patient profile not found" });

        const updateData = req.body;
        if (req.file) {
            updateData.image = `/uploads/profiles/${req.file.filename}`;
        }

        await patient.update(updateData);
        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
