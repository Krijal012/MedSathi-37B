import { Staff } from "../model/staffModel.js";
import { User } from "../model/userModel.js";
import { sequelize } from "../database/db.js";

// Create a new staff member
export const createStaff = async (req, res) => {
    try {
        const staff = await Staff.create(req.body);
        res.status(201).json({ success: true, data: staff });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all staff
export const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.findAll();
        res.status(200).json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get staff by ID
export const getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (!staff) return res.status(404).json({ success: false, message: "Staff member not found" });
        res.status(200).json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update staff
export const updateStaff = async (req, res) => {
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (!staff) return res.status(404).json({ success: false, message: "Staff member not found" });
        await staff.update(req.body);
        res.status(200).json({ success: true, data: staff });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete staff
export const deleteStaff = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const staff = await Staff.findByPk(req.params.id);
        if (!staff) {
            await transaction.rollback();
            return res.status(404).json({ success: false, message: "Staff member not found" });
        }

        // Delete from User table
        await User.destroy({
            where: { email: staff.email },
            transaction
        });

        // Delete from Staff table
        await staff.destroy({ transaction });

        await transaction.commit();
        res.status(200).json({ success: true, message: "Staff member and user account deleted successfully" });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ success: false, message: error.message });
    }
};
