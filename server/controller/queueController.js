import { Appointment } from "../model/appointmentModel.js";
import { Patient } from "../model/patientModel.js";
import { Op } from "sequelize";

// Get patients waiting for pharmacist
export const getPharmacistQueue = async (req, res) => {
    try {
        const queue = await Appointment.findAll({
            where: {
                [Op.or]: [
                    { status: 'waiting_for_pharmacist' },
                    {
                        providerType: 'pharmacist',
                        status: { [Op.in]: ['pending', 'confirmed'] }
                    }
                ]
            }
        });
        res.status(200).json({ success: true, data: queue });
    } catch (error) {
        console.error("Error in getPharmacistQueue:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get current general queue (e.g. for dashboard)
export const getCurrentQueue = async (req, res) => {
    try {
        const queue = await Appointment.findAll({
            where: { status: 'confirmed' } // Or whatever status means "waiting for doctor"
        });
        res.status(200).json({ success: true, data: queue || [] });
    } catch (error) {
        console.error("Error in getCurrentQueue:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update appointment status (e.g. to 'completed' or 'waiting_for_pharmacist')
export const updateQueueStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }
        appointment.status = status;
        await appointment.save();
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        console.error("Error in updateQueueStatus:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
