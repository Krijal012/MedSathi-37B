import React from 'react';
import { Sidebar } from '../../components/PatientComponents/Sidebar';
import Header from '../../components/PatientComponents/Header';
import StatCard from '../../components/PatientComponents/Statcard';
import AppointmentCard from '../../components/PatientComponents/AppointmentCard';
import HealthMetricCard from '../../components/PatientComponents/HealthMetricCard';

const PatientDashboard = () => {
    // Sample data
    const stats = [
        { title: 'Upcoming Appointments', value: '2', icon: '📅', iconColor: 'text-blue-500' },
        { title: 'Prescriptions Active', value: '3', icon: '💊', iconColor: 'text-purple-500' },
        { title: 'Medical Records', value: '12', icon: '📄', iconColor: 'text-red-500' },
        { title: 'Health Score', value: '82%', icon: '💚', iconColor: 'text-green-500' },
    ];

    const upcomingAppointments = [
        {
            doctorName: 'Dr. Ram Shrestha',
            specialty: 'Cardiologist',
            date: 'Jan 10, 2025',
            time: '10:00 AM',
        },
        {
            doctorName: 'Dr. Ram Shrestha',
            specialty: 'Cardiologist',
            date: 'Jan 10, 2025',
            time: '10:00 AM',
        },
        {
            doctorName: 'Dr. Ram Shrestha',
            specialty: 'Cardiologist',
            date: 'Jan 10, 2025',
            time: '10:00 AM',
        },
    ];

    const healthMetrics = [
        { label: 'Blood Pressure', value: '120/80', status: 'Normal', icon: '💓' },
        { label: 'Heart Rate', value: '72 BPM', status: 'Normal', icon: '❤️' },
        { label: 'Weight', value: '70 KG', status: 'Normal', icon: '⚖️' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header patientName="John Doe" />

                {/* Dashboard Content */}
                <main className="flex-1 p-8">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
                        <p className="text-gray-500">Monitor your health and manage appointments</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <StatCard
                                key={index}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                                iconColor={stat.iconColor}
                            />
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Upcoming Appointments Section */}
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
                                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                                    Book New
                                </button>
                            </div>
                            <div className="space-y-3">
                                {upcomingAppointments.map((appointment, index) => (
                                    <AppointmentCard
                                        key={index}
                                        doctorName={appointment.doctorName}
                                        specialty={appointment.specialty}
                                        date={appointment.date}
                                        time={appointment.time}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Health Metrics Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Health Metrics</h2>
                            <div className="space-y-3">
                                {healthMetrics.map((metric, index) => (
                                    <HealthMetricCard
                                        key={index}
                                        label={metric.label}
                                        value={metric.value}
                                        status={metric.status}
                                        icon={metric.icon}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientDashboard;