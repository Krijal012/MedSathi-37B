import React, { useState } from 'react';
import { Sidebar } from '../../../components/PatientComponents/Sidebar';
import Header from '../../../components/PatientComponents/Header';
import MyAppointmentCard from '../../../components/PatientComponents/MyAppointmentCard';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyAppointments = () => {
    const [activeTab, setActiveTab] = useState('scheduled');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const [appointments, setAppointments] = useState({ scheduled: [], completed: [], cancelled: [] });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    React.useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        const fetchAppointments = async () => {
            if (!storedUser) return;
            try {
                const response = await axios.get(`http://localhost:5000/api/appointments/patient/${storedUser.name}`);
                const data = response.data.data || [];

                // Categorize appointments
                const categorized = {
                    scheduled: data.filter(a => a.status === 'pending' || a.status === 'Scheduled'),
                    completed: data.filter(a => a.status === 'Completed' || a.status === 'completed'),
                    cancelled: data.filter(a => a.status === 'Cancelled' || a.status === 'cancelled')
                };
                setAppointments(categorized);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const handleCancel = async (id) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            try {
                await axios.delete(`http://localhost:5000/api/appointments/${id}`);
                // Refresh data
                const response = await axios.get(`http://localhost:5000/api/appointments/patient/${user.name}`);
                const data = response.data.data || [];
                const categorized = {
                    scheduled: data.filter(a => a.status === 'pending' || a.status === 'Scheduled'),
                    completed: data.filter(a => a.status === 'Completed' || a.status === 'completed'),
                    cancelled: data.filter(a => a.status === 'Cancelled' || a.status === 'cancelled')
                };
                setAppointments(categorized);
                toast.success('Appointment cancelled successfully!');
            } catch (error) {
                console.error("Error cancelling appointment:", error);
                toast.error('Failed to cancel appointment.');
            }
        }
    };

    const filteredAppointments = appointments[activeTab]?.filter(appt =>
        appt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (appt.reason && appt.reason.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

    const getTabCount = (tab) => {
        return appointments[tab]?.length || 0;
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <Header patientName={user?.name || "Patient"} toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Appointments</h1>
                        <p className="text-gray-500 text-sm sm:text-base">
                            View and manage your appointments
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by provider or speciality..."
                                className="
                                    w-full 
                                    pl-10 pr-4 
                                    py-2.5 sm:py-3 
                                    border border-gray-300 
                                    rounded-lg 
                                    focus:outline-none 
                                    focus:border-teal-400
                                    text-sm sm:text-base
                                "
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="
                        flex flex-col 
                        sm:flex-row 
                        gap-2 sm:gap-4 
                        mb-4 sm:mb-6
                        overflow-x-auto 
                        pb-2
                    ">
                        <button
                            onClick={() => setActiveTab('scheduled')}
                            className={`
                                px-4 py-2.5 
                                sm:px-6 sm:py-3 
                                rounded-lg font-medium 
                                transition-colors 
                                whitespace-nowrap
                                text-sm sm:text-base
                                ${activeTab === 'scheduled'
                                    ? 'bg-white text-gray-800 shadow-sm border border-teal-100'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }
                            `}
                        >
                            Scheduled ({getTabCount('scheduled')})
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`
                                px-4 py-2.5 
                                sm:px-6 sm:py-3 
                                rounded-lg font-medium 
                                transition-colors 
                                whitespace-nowrap
                                text-sm sm:text-base
                                ${activeTab === 'completed'
                                    ? 'bg-white text-gray-800 shadow-sm border border-teal-100'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }
                            `}
                        >
                            Completed ({getTabCount('completed')})
                        </button>
                        <button
                            onClick={() => setActiveTab('cancelled')}
                            className={`
                                px-4 py-2.5 
                                sm:px-6 sm:py-3 
                                rounded-lg font-medium 
                                transition-colors 
                                whitespace-nowrap
                                text-sm sm:text-base
                                ${activeTab === 'cancelled'
                                    ? 'bg-white text-gray-800 shadow-sm border border-teal-100'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }
                            `}
                        >
                            Cancelled ({getTabCount('cancelled')})
                        </button>
                    </div>

                    {/* Appointments List */}
                    <div className="space-y-3 sm:space-y-4">
                        {loading ? (
                            <p className="text-gray-500 italic">Syncing your appointments...</p>
                        ) : filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment) => (
                                <MyAppointmentCard
                                    key={appointment.id}
                                    providerName={appointment.doctorName}
                                    specialty={appointment.reason || "Public Health Consultation"}
                                    date={new Date(appointment.date).toLocaleDateString()}
                                    time={appointment.time}
                                    status={appointment.status}
                                    onCancel={() => handleCancel(appointment.id)}
                                />
                            ))
                        ) : (
                            <div className="
                                text-center 
                                py-8 sm:py-12 
                                text-gray-500 
                                text-sm sm:text-base
                            ">
                                No {activeTab} appointments found
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MyAppointments;