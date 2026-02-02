import React, { useState } from 'react';
import { Sidebar } from '../../components/PatientComponents/Sidebar';
import Header from '../../components/PatientComponents/Header';
import MyAppointmentCard from '../../components/PatientComponents/MyAppointmentCard';

const MyAppointments = () => {
    const [activeTab, setActiveTab] = useState('scheduled');

    // Sample appointments data
    const appointments = {
        scheduled: [
            {
                id: 1,
                doctorName: 'Dr. Ram Shrestha',
                specialty: 'Cardiologist',
                date: 'Jan 10, 2026',
                time: '15:00PM',
                status: 'Scheduled',
            },
            {
                id: 2,
                doctorName: 'Dr. Hari Bahadur Shah',
                specialty: 'Oncologist',
                date: 'Feb 10, 2026',
                time: '15:00PM',
                status: 'Scheduled',
            },
            {
                id: 3,
                doctorName: 'Dr. Sita Thapa',
                specialty: 'Neurologist',
                date: 'Feb 10, 2026',
                time: '15:00PM',
                status: 'Scheduled',
            },
        ],
        completed: [
            {
                id: 4,
                doctorName: 'Dr. Sarah Johnson',
                specialty: 'General Physician',
                date: 'Dec 15, 2024',
                time: '10:00AM',
                status: 'Completed',
            },
        ],
        cancelled: [
            {
                id: 5,
                doctorName: 'Dr. Mike Brown',
                specialty: 'Dentist',
                date: 'Dec 20, 2024',
                time: '14:00PM',
                status: 'Cancelled',
            },
        ],
    };

    const handleCancel = (id) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            console.log('Cancelled appointment:', id);
            alert('Appointment cancelled successfully!');
        }
    };

    const getTabCount = (tab) => {
        return appointments[tab]?.length || 0;
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header patientName="John Doe" />

                {/* Page Content */}
                <main className="flex-1 p-8">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
                        <p className="text-gray-500">View and manage your appointments</p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Search by doctor or speciality..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-4 mb-6">
                        <button
                            onClick={() => setActiveTab('scheduled')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'scheduled'
                                ? 'bg-white text-gray-800 shadow-sm'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                        >
                            Scheduled ({getTabCount('scheduled')})
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'completed'
                                ? 'bg-white text-gray-800 shadow-sm'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                        >
                            Completed ({getTabCount('completed')})
                        </button>
                        <button
                            onClick={() => setActiveTab('cancelled')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'cancelled'
                                ? 'bg-white text-gray-800 shadow-sm'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                        >
                            Cancelled ({getTabCount('cancelled')})
                        </button>
                    </div>

                    {/* Appointments List */}
                    <div className="space-y-4">
                        {appointments[activeTab]?.map((appointment) => (
                            <MyAppointmentCard
                                key={appointment.id}
                                doctorName={appointment.doctorName}
                                specialty={appointment.specialty}
                                date={appointment.date}
                                time={appointment.time}
                                status={appointment.status}
                                onCancel={() => handleCancel(appointment.id)}
                            />
                        ))}

                        {appointments[activeTab]?.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
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