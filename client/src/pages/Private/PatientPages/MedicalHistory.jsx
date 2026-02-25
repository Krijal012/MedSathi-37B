import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '../../../components/PatientComponents/Sidebar';
import Header from '../../../components/PatientComponents/Header';
import StatCard from '../../../components/PatientComponents/StatCard';
import MedicalRecordCard from '../../../components/PatientComponents/MedicalRecordCard';

const MedicalHistory = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        { title: 'Total Records', value: '0', icon: '📄', iconColor: 'text-blue-500' },
        { title: 'Providers Visited', value: '0', icon: '👨‍⚕️', iconColor: 'text-purple-500' },
        { title: 'Last Update', value: 'N/A', icon: '📅', iconColor: 'text-green-500' },
    ]);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        const fetchHistory = async () => {
            if (!storedUser) return;
            try {
                const res = await axios.get(`http://localhost:5000/api/history/${storedUser.name}`);
                const data = res.data.data || [];
                setMedicalRecords(data);

                // Calculate stats
                const providers = new Set(data.map(r => r.pharmacistName)).size;
                const lastRecordDate = data.length > 0 ? new Date(data[0].date).toLocaleDateString() : 'N/A';

                setStats([
                    { title: 'Total Records', value: data.length.toString(), icon: '📄', iconColor: 'text-blue-500' },
                    { title: 'Providers Visited', value: providers.toString(), icon: '👨‍⚕️', iconColor: 'text-purple-500' },
                    { title: 'Last Record', value: lastRecordDate, icon: '📅', iconColor: 'text-green-500' },
                    { title: 'Status', value: 'Updated', icon: '✅', iconColor: 'text-teal-500' },
                ]);
            } catch (err) {
                console.error("Error fetching history:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <Header patientName={user?.name || "Patient"} toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Medical History</h1>
                        <p className="text-gray-500 text-sm sm:text-base">
                            View your complete medical records
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                        <div className="mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Medical Records</h2>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            {loading ? (
                                <p className="text-center py-8 text-gray-500 italic">Loading your records...</p>
                            ) : medicalRecords.length > 0 ? (
                                medicalRecords.map((record) => (
                                    <MedicalRecordCard
                                        key={record.id}
                                        diagnosis={record.diagnosis}
                                        treatment={record.treatment}
                                        date={new Date(record.date).toLocaleDateString()}
                                        pharmacistName={record.pharmacistName}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 italic">No medical records found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MedicalHistory;