import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import PharmacistSidebar from '../../../components/PharmacistComponents/PharmacistSidebar';
import PharmacistHeader from '../../../components/PharmacistComponents/PharmacistHeader';
import PharmacistStatCard from '../../../components/PharmacistComponents/PharmacistStatcard';
import PharmacistStockCard from '../../../components/PharmacistComponents/PharmacistStockCard';
import AppointmentCard from '../../../components/PatientComponents/AppointmentCard';

const PharmacistDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState([
        { title: 'Total Medicines', value: '0', icon: '🔧', iconColor: 'text-gray-600' },
        { title: 'Low Stock Items', value: '0', icon: '⚠️', iconColor: 'text-red-500' },
        { title: "Today's Appointments", value: '0', icon: '📅', iconColor: 'text-blue-500' },
        { title: 'Pharmacy Status', value: 'Active', icon: '✅', iconColor: 'text-green-500' },
    ]);
    const [lowStockMedicines, setLowStockMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const fetchDashboardData = async () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) return;
        try {
            const [apptRes, medRes] = await Promise.all([
                axios.get(`http://localhost:5000/api/appointments`),
                axios.get(`http://localhost:5000/api/medicine`)
            ]);

            const allAppts = apptRes.data.data || [];
            const pharmacistAppts = allAppts.filter(a => a.doctorName === storedUser.name);
            setAppointments(pharmacistAppts);

            const allMeds = medRes.data.data || [];
            const lowStock = allMeds.filter(m => m.stock < 20);
            setLowStockMedicines(lowStock);

            setStats([
                { title: 'Total Medicines', value: allMeds.length.toString(), icon: '🔧', iconColor: 'text-gray-600' },
                { title: 'Low Stock Items', value: lowStock.length.toString(), icon: '⚠️', iconColor: 'text-red-500' },
                { title: "Today's Appointments", value: pharmacistAppts.filter(a => a.status !== 'completed').length.toString(), icon: '📅', iconColor: 'text-blue-500' },
                { title: 'Pharmacy Status', value: 'Active', icon: '✅', iconColor: 'text-green-500' },
            ]);

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
        fetchDashboardData();
    }, []);

    const handleCompleteAppointment = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/api/appointments/${id}/status`, { status: 'completed' });
            toast.success('Appointment marked as completed!');
            fetchDashboardData();
        } catch (error) {
            console.error("Error updating appointment:", error);
            toast.error('Failed to update appointment.');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <PharmacistSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <PharmacistHeader pharmacistName={user?.name || "Pharmacist"} toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Pharmacist Dashboard</h1>
                        <p className="text-gray-500">Welcome back, {user?.name}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <PharmacistStatCard
                                key={index}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                                iconColor={stat.iconColor}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Upcoming Appointments Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <span className="text-blue-500 text-2xl">📅</span>
                                    <h2 className="text-xl font-bold text-gray-800">Your Appointments</h2>
                                </div>
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                                    {appointments.length} Total
                                </span>
                            </div>

                            <div className="space-y-4">
                                {loading ? (
                                    <p className="text-gray-500 italic">Loading appointments...</p>
                                ) : appointments.length > 0 ? (
                                    appointments.map((appt, index) => (
                                        <AppointmentCard
                                            key={index}
                                            id={appt.id}
                                            providerName={appt.patientName}
                                            specialty={appt.reason || "Pharmacy Visit"}
                                            date={new Date(appt.date).toLocaleDateString()}
                                            time={appt.time}
                                            status={appt.status}
                                            onComplete={handleCompleteAppointment}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 italic">No appointments booked for you yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Low Stock Items Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                            <div className="flex items-center space-x-2 mb-6">
                                <span className="text-red-500 text-2xl">⚠️</span>
                                <h2 className="text-xl font-bold text-gray-800">Critical Stock Alert</h2>
                            </div>
                            <div className="space-y-4">
                                {loading ? (
                                    <p className="text-gray-500 italic">Checking inventory...</p>
                                ) : lowStockMedicines.length > 0 ? (
                                    lowStockMedicines.map((medicine, index) => (
                                        <PharmacistStockCard
                                            key={index}
                                            medicineName={medicine.name}
                                            category={medicine.category}
                                            stockLeft={medicine.stock}
                                            minimumRequired={20}
                                            image={medicine.image}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-teal-600 font-medium">All medicines are well-stocked!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PharmacistDashboard;