import { Pharmacist } from "../model/pharmacistModel.js";

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
    try {
        const pharmacist = await Pharmacist.findByPk(req.params.id);
        if (!pharmacist) return res.status(404).json({ success: false, message: "Pharmacist not found" });
        await pharmacist.destroy();
        res.status(200).json({ success: true, message: "Pharmacist deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
