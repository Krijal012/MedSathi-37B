import React, { useState } from 'react';
import { Sidebar } from '../../components/PatientComponents/Sidebar';
import Header from '../../components/PatientComponents/Header';
import StatCard from '../../components/PatientComponents/StatCard';
import MedicalRecordCard from '../../components/PatientComponents/MedicalRecordCard';

const MedicalHistory = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    // Stats data
    const stats = [
        { title: 'Total Records', value: '4', icon: '📄', iconColor: 'text-blue-500' },
        { title: 'Doctors Visited', value: '3', icon: '👨‍⚕️', iconColor: 'text-purple-500' },
        { title: 'Active Prescriptions', value: '3', icon: '💊', iconColor: 'text-pink-500' },
        { title: 'Last Visit', value: 'Dec 15', icon: '📅', iconColor: 'text-green-500' },
    ];

    // Medical records data
    const medicalRecords = [
        {
            id: 1,
            title: 'Annual Physical Examination',
            date: 'Feb 5, 2024',
            doctorName: 'Dr. Sarah Chen',
            specialization: 'Internal Medicine',
            clinic: 'City Health Center',
            status: 'Completed'
        },
        {
            id: 2,
            title: 'COVID-19 Vaccination (Booster)',
            date: 'Nov 20, 2023',
            doctorName: 'Dr. Michael Rodriguez',
            specialization: 'Immunology',
            clinic: 'Community Vaccination Clinic',
            status: 'Completed'
        },
        {
            id: 3,
            title: 'Knee Injury Consultation',
            date: 'Aug 15, 2023',
            doctorName: 'Dr. James Wilson',
            specialization: 'Orthopedics',
            clinic: 'Sports Medicine Institute',
            status: 'Follow-up Required'
        },
        {
            id: 4,
            title: 'Dermatology Checkup',
            date: 'Jun 3, 2023',
            doctorName: 'Dr. Emily Park',
            specialization: 'Dermatology',
            clinic: 'Skin Care Specialists',
            status: 'Completed'
        },
        {
            id: 5,
            title: 'Allergy Testing',
            date: 'Mar 12, 2023',
            doctorName: 'Dr. Robert Kim',
            specialization: 'Allergy & Immunology',
            clinic: 'Allergy Relief Center',
            status: 'Completed'
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <Header patientName="John Doe" toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Medical History</h1>
                        <p className="text-gray-500 text-sm sm:text-base">
                            View your complete medical records
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-4 sm:mb-6">
                        <div className="relative max-w-full sm:max-w-md">
                            <span className="
                                absolute 
                                left-3 top-1/2 
                                -translate-y-1/2 
                                text-gray-400
                            ">
                                🔍
                            </span>
                            <input
                                type="text"
                                placeholder="Search records..."
                                className="
                                    w-full 
                                    pl-10 pr-4 
                                    py-2.5 sm:py-3 
                                    border border-gray-300 
                                    rounded-lg 
                                    focus:outline-none 
                                    focus:border-blue-400
                                    text-sm sm:text-base
                                "
                            />
                        </div>
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

                    {/* Medical Records Section */}
                    <div className="
                        bg-white rounded-lg 
                        shadow-sm border border-gray-100 
                        p-4 sm:p-6
                    ">
                        <div className="mb-4 sm:mb-6">
                            <h2 className="
                                text-xl sm:text-2xl 
                                font-bold text-gray-800
                            ">
                                Medical Records
                            </h2>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            {medicalRecords.map((record) => (
                                <MedicalRecordCard
                                    key={record.id}
                                    title={record.title}
                                    date={record.date}
                                    doctorName={record.doctorName}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MedicalHistory;