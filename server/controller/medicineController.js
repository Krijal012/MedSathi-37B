import { Medicine } from "../model/medicineModel.js";
import { Op } from "sequelize";

// Add a new medicine
export const addMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.create(req.body);
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
