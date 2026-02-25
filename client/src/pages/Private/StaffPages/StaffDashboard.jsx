import React, { useState, useEffect } from 'react';
import StaffSidebar from '../../../components/StaffComponents/StaffSideBar';
import StaffHeader from '../../../components/StaffComponents/StaffHeader';
import StaffStatCard from '../../../components/StaffComponents/StaffStatCard';
import StaffQueueCard from '../../../components/StaffComponents/StaffQueueCard';

const StaffDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const [user, setUser] = useState(null);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    const [stats, setStats] = useState([
        { title: 'Patients Queue', value: '0', icon: '👥', iconColor: 'text-gray-600' }, // Total appointments today
        { title: 'In Queue', value: '0', icon: '⏱️', iconColor: 'text-green-500' }, // Confirmed appointments
        { title: 'Completed', value: '0', icon: '✅', iconColor: 'text-teal-500' }, // Completed appointments
        { title: 'Pharmacists Available', value: '0', icon: '👨‍🔬', iconColor: 'text-blue-500' }, // Total pharmacists
    ]);

    const [queueData, setQueueData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch current queue
                const queueRes = await fetch('http://localhost:5000/api/queue/current');
                const queueJson = await queueRes.json();

                let currentQueueData = [];
                if (queueJson.success && Array.isArray(queueJson.data)) {
                    currentQueueData = queueJson.data;
                    setQueueData(currentQueueData);
                }

                // Fetch basic stats
                const pharmacistsRes = await fetch('http://localhost:5000/api/pharmacists');
                const pharmacistsJson = await pharmacistsRes.json();
                const pharmacistsData = pharmacistsJson.success && Array.isArray(pharmacistsJson.data) ? pharmacistsJson.data : [];

                setStats(prev => [
                    { ...prev[0], value: currentQueueData.length.toString() },
                    { ...prev[1], value: currentQueueData.filter(q => q.status === 'confirmed').length.toString() },
                    { ...prev[2], value: currentQueueData.filter(q => q.status === 'completed').length.toString() },
                    { ...prev[3], value: pharmacistsData.length.toString() }
                ]);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <StaffSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <StaffHeader staffName={user?.name || "Staff"} toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Staff Dashboard</h1>
                        <p className="text-gray-500">Manage patient flow and pharmacist schedules</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <StaffStatCard
                                key={index}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                                iconColor={stat.iconColor}
                            />
                        ))}
                    </div>

                    {/* Current Queue Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Current Queue</h2>
                        <div className="space-y-4">
                            {loading ? (
                                <p>Loading queue...</p>
                            ) : queueData.length > 0 ? (
                                queueData.map((queue, index) => (
                                    <StaffQueueCard
                                        key={index}
                                        queueNumber={queue.queueNumber || queue.id.toString().padStart(3, '0')}
                                        patientName={queue.patientName}
                                        pharmacistName={queue.pharmacistName}
                                        status={queue.status}
                                        timeElapsed={queue.timeElapsed || 'N/A'}
                                    />
                                ))
                            ) : (
                                <p>No patients in queue currently.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StaffDashboard;