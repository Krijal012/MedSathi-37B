import { Medicine } from "../model/medicineModel.js";
import { Op } from "sequelize";

// Add a new medicine
export const addMedicine = async (req, res) => {
    try {
        const medicineData = req.body;
        if (req.file) {
            medicineData.image = `/uploads/medicines/${req.file.filename}`;
        }
        const medicine = await Medicine.create(medicineData);
        res.status(201).json({ success: true, data: medicine });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all medicines
export const getAllMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.findAll();
        res.status(200).json({ success: true, data: medicines });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Search medicines
export const searchMedicines = async (req, res) => {
    const { query } = req.query;
    try {
        const medicines = await Medicine.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { category: { [Op.iLike]: `%${query}%` } }
                ]
            }
        });
        res.status(200).json({ success: true, data: medicines });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a medicine
export const updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByPk(req.params.id);
        if (!medicine) {
            return res.status(404).json({ success: false, message: "Medicine not found" });
        }
        await medicine.update(req.body);
        res.status(200).json({ success: true, data: medicine });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a medicine
export const deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByPk(req.params.id);
        if (!medicine) {
            return res.status(404).json({ success: false, message: "Medicine not found" });
        }
        await medicine.destroy();
        res.status(200).json({ success: true, message: "Medicine deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
