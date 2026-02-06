import { Pharmacist } from "../model/pharmacistModel.js";
import { User } from "../model/userModel.js";
import { sequelize } from "../database/db.js";

// Create a new pharmacist
export const createPharmacist = async (req, res) => {
    try {
        const pharmacist = await Pharmacist.create(req.body);
        res.status(201).json({ success: true, data: pharmacist });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all pharmacists
export const getAllPharmacists = async (req, res) => {
    try {
        const pharmacists = await Pharmacist.findAll();
        res.status(200).json({ success: true, data: pharmacists });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get pharmacist by ID
export const getPharmacistById = async (req, res) => {
    try {
        const pharmacist = await Pharmacist.findByPk(req.params.id);
        if (!pharmacist) return res.status(404).json({ success: false, message: "Pharmacist not found" });
        res.status(200).json({ success: true, data: pharmacist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get pharmacist by Email
export const getPharmacistByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const pharmacist = await Pharmacist.findOne({ where: { email: email.toLowerCase() } });
        if (!pharmacist) return res.status(404).json({ success: false, message: "Pharmacist not found" });
        res.status(200).json({ success: true, data: pharmacist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update pharmacist
export const updatePharmacist = async (req, res) => {
    try {
        const pharmacist = await Pharmacist.findByPk(req.params.id);
        if (!pharmacist) return res.status(404).json({ success: false, message: "Pharmacist not found" });
        await pharmacist.update(req.body);
        res.status(200).json({ success: true, data: pharmacist });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete pharmacist
export const deletePharmacist = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const pharmacist = await Pharmacist.findByPk(req.params.id);
        if (!pharmacist) {
            await transaction.rollback();
            return res.status(404).json({ success: false, message: "Pharmacist not found" });
        }

        // Delete from User table
        await User.destroy({
            where: { email: pharmacist.email },
            transaction
        });

        // Delete from Pharmacist table
        await pharmacist.destroy({ transaction });

        await transaction.commit();
        res.status(200).json({ success: true, message: "Pharmacist and user account deleted successfully" });
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get current logged in pharmacist profile
export const getMePharmacist = async (req, res) => {
    try {
        const pharmacist = await Pharmacist.findOne({ where: { email: req.user.email } });
        if (!pharmacist) return res.status(404).json({ success: false, message: "Pharmacist profile not found" });
        res.status(200).json({ success: true, data: pharmacist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update current logged in pharmacist profile
export const updateMePharmacist = async (req, res) => {
    try {
        const pharmacist = await Pharmacist.findOne({ where: { email: req.user.email } });
        if (!pharmacist) return res.status(404).json({ success: false, message: "Pharmacist profile not found" });

        const updateData = req.body;
        if (req.file) {
            updateData.image = `/uploads/profiles/${req.file.filename}`;
        }

        await pharmacist.update(updateData);
        res.status(200).json({ success: true, data: pharmacist });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
