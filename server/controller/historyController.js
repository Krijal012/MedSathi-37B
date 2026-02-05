import { MedicalHistory } from "../model/historyModel.js";

// Add a history record
export const createHistory = async (req, res) => {
    try {
        const history = await MedicalHistory.create(req.body);
        res.status(201).json({ success: true, data: history });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get history for a patient
export const getPatientHistory = async (req, res) => {
    try {
        const history = await MedicalHistory.findAll({ where: { patientName: req.params.patientName } });
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
