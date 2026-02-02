import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/PatientComponents/Sidebar';
import Header from '../../components/PatientComponents/Header';
import StatCard from '../../components/PatientComponents/StatCard';
import AppointmentCard from '../../components/PatientComponents/AppointmentCard';
import HealthMetricCard from '../../components/PatientComponents/HealthMetricCard';

const PatientDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

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
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <Header patientName="John Doe" toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Patient Dashboard</h1>
                        <p className="text-gray-500 text-sm sm:text-base">
                            Monitor your health and manage appointments
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="
                        grid grid-cols-1 
                        sm:grid-cols-2 
                        lg:grid-cols-4 
                        gap-4 sm:gap-6 
                        mb-6 sm:mb-8
                    ">
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
                    <div className="
                        grid grid-cols-1 
                        lg:grid-cols-3 
                        gap-4 sm:gap-6
                    ">
                        {/* Upcoming Appointments Section */}
                        <div className="
                            lg:col-span-2 
                            bg-white rounded-lg 
                            shadow-sm border border-gray-100 
                            p-4 sm:p-6
                        ">
                            <div className="
                                flex flex-col 
                                sm:flex-row 
                                items-start 
                                sm:items-center 
                                justify-between 
                                gap-3 
                                mb-4 sm:mb-6
                            ">
                                <h2 className="
                                    text-lg sm:text-xl 
                                    font-bold text-gray-800
                                ">
                                    Upcoming Appointments
                                </h2>
                                <button
                                    onClick={() => navigate('/book-appointment')}
                                    className="
                                        w-full 
                                        sm:w-auto
                                        px-4 py-2 
                                        bg-teal-500 text-white 
                                        rounded-lg 
                                        hover:bg-teal-600 
                                        transition-colors 
                                        cursor-pointer
                                        text-sm sm:text-base
                                    "
                                >
                                    Book New Appointment
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
                        <div className="
                            bg-white rounded-lg 
                            shadow-sm border border-gray-100 
                            p-4 sm:p-6
                        ">
                            <h2 className="
                                text-lg sm:text-xl 
                                font-bold text-gray-800 
                                mb-4 sm:mb-6
                            ">
                                Health Metrics
                            </h2>
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