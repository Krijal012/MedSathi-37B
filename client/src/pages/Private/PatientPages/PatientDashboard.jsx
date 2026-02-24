import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../components/PatientComponents/Sidebar';
import Header from '../../../components/PatientComponents/Header';
import StatCard from '../../../components/PatientComponents/StatCard';
import AppointmentCard from '../../../components/PatientComponents/AppointmentCard';
import axios from 'axios';

const PatientDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const [appointments, setAppointments] = useState([]);
    const [history, setHistory] = useState([]);
    const [pharmacists, setPharmacists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        const fetchData = async () => {
            try {
                const [pharmRes, apptRes, histRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/pharmacists'),
                    storedUser ? axios.get(`http://localhost:5000/api/appointments/patient/${storedUser.name}`) : Promise.resolve({ data: { data: [] } }),
                    storedUser ? axios.get(`http://localhost:5000/api/history/${storedUser.name}`) : Promise.resolve({ data: { data: [] } })
                ]);

                setPharmacists(pharmRes.data.data || []);
                setAppointments(apptRes.data.data || []);
                setHistory(histRes.data.data || []);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);



    const stats = [
        { title: 'Appointments', value: appointments.length.toString().padStart(2, '0'), icon: '📅', iconColor: 'text-blue-500' },
        { title: 'Prescriptions', value: '00', icon: '💊', iconColor: 'text-green-500' },
        { title: 'Medical Records', value: history.length.toString().padStart(2, '0'), icon: '📄', iconColor: 'text-purple-500' },
        { title: 'Pharmacists', value: pharmacists.length.toString().padStart(2, '0'), icon: '👨‍🔬', iconColor: 'text-teal-500' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <Header patientName={user?.name || "Patient"} toggleSidebar={toggleSidebar} />

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
                        <div className="space-y-3">
                            {loading ? (
                                <p>Loading appointments...</p>
                            ) : appointments.length > 0 ? (
                                appointments.map((appt, index) => (
                                    <AppointmentCard
                                        key={index}
                                        providerName={appt.doctorName}
                                        specialty={appt.reason || "Checkup"}
                                        date={new Date(appt.date).toLocaleDateString()}
                                        time={appt.time}
                                        status={appt.status}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 italic mb-4">You have no upcoming appointments.</p>
                                    <button
                                        onClick={() => navigate('/book-appointment')}
                                        className="text-teal-600 font-semibold hover:underline"
                                    >
                                        Book your first appointment
                                    </button>
                                </div>
                            )}
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-8 mb-4">Provider Availability</h2>
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                                <h3 className="font-bold text-green-800 mb-2">Pharmacists ({pharmacists.length})</h3>
                                {pharmacists.length > 0 ? (
                                    <p className="text-sm text-green-600">Pharmacies ready to serve.</p>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">No pharmacists registered.</p>
                                )}
                            </div>
                        </div>

                        {pharmacists.length > 0 && (
                            <>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Available Pharmacists</h2>
                                <div className="space-y-3">
                                    {pharmacists.map((pharm, index) => (
                                        <div key={index} className="p-4 border rounded-lg bg-white flex justify-between items-center shadow-sm">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                                    {pharm.image ? (
                                                        <img src={`http://localhost:5000${pharm.image}`} alt={pharm.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">👤</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold">{pharm.name}</p>
                                                    <p className="text-sm text-gray-600">License: {pharm.licenseNumber}</p>
                                                </div>
                                            </div>
                                            <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-medium">Verified</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Medical History Section */}
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
                            Medical History
                        </h2>
                        <div className="space-y-4">
                            {loading ? (
                                <p>Loading history...</p>
                            ) : history.length > 0 ? (
                                history.map((record, index) => (
                                    <div key={index} className="p-4 border-l-4 border-teal-500 bg-gray-50 rounded shadow-sm">
                                        <p className="text-xs text-gray-500 mb-1">{new Date(record.date).toLocaleDateString()}</p>
                                        <p className="font-bold text-gray-800">{record.diagnosis}</p>
                                        <p className="text-sm text-gray-600 mt-1">{record.treatment}</p>
                                        <p className="text-xs text-teal-600 mt-2 italic">By: {record.doctorName || 'Pharmacist'}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-gray-500 italic text-sm">No medical records found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientDashboard;