import { Doctor } from "../model/doctorModel.js";

// Get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new doctor (Admin/Staff only ideally)
export const createDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json({ success: true, data: doctor });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update doctor information/schedule
export const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        await doctor.update(req.body);
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Doctor.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ success: true, message: "Doctor deleted successfully" });
        } else {
            res.status(404).json({ success: false, message: "Doctor not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
