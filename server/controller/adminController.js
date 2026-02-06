import { Patient } from "../model/patientModel.js";
import { Staff } from "../model/staffModel.js";
import { Appointment } from "../model/appointmentModel.js";
import { sequelize } from "../database/db.js";
import { Op } from "sequelize";

// Get dashboard statistics
export const getAdminStats = async (req, res) => {
    try {
        const totalPatients = await Patient.count();
        const totalStaff = await Staff.count();

        const today = new Date().toISOString().split('T')[0];
        const appointmentsToday = await Appointment.count({
            where: {
                date: today
            }
        });

        // Mock revenue calculation for now (e.g., each appointment is Rs 2000)
        // In a real app, this would come from a payments table
        const monthlyRevenue = appointmentsToday * 2000; // Simplified for demo

        res.status(200).json({
            success: true,
            data: {
                totalPatients,
                totalStaff,
                appointmentsToday,
                monthlyRevenue: `Rs ${monthlyRevenue}`
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get recent activities (latest patients and appointments)
export const getRecentActivities = async (req, res) => {
    try {
        const latestPatients = await Patient.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        const latestAppointments = await Appointment.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        const activities = [
            ...latestPatients.map(p => ({
                id: `p-${p.id}`,
                title: 'New Patient Registered',
                description: p.name,
                time: 'Recently',
                type: 'patient'
            })),
            ...latestAppointments.map(a => ({
                id: `a-${a.id}`,
                title: 'Appointment Booked',
                description: `Patient: ${a.patientName} with Dr. ${a.doctorName}`,
                time: 'Recently',
                type: 'appointment'
            }))
        ].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 10);

        res.status(200).json({
            success: true,
            data: activities
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
