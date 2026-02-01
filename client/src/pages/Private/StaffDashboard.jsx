import React from 'react';
import StaffSidebar from '../../components/StaffComponents/StaffSideBar';
import StaffHeader from '../../components/StaffComponents/StaffHeader';
import StaffStatCard from '../../components/StaffComponents/StaffStatCard';
import StaffQueueCard from '../../components/StaffComponents/StaffQueueCard';

const StaffDashboard = () => {
    // Sample data
    const stats = [
        { title: 'Patients Queue', value: '20', icon: '👥', iconColor: 'text-gray-600' },
        { title: 'In Queue', value: '8', icon: '⏱️', iconColor: 'text-green-500' },
        { title: 'Completed', value: '12', icon: '✅', iconColor: 'text-teal-500' },
        { title: 'Doctors Available', value: '15', icon: '👨‍⚕️', iconColor: 'text-blue-500' },
    ];

    const queueData = [
        {
            queueNumber: '001',
            patientName: 'John Smith',
            doctorName: 'Dr. Ram Shrestha',
            status: 'In Progress',
            timeElapsed: '5 Mins',
        },
        {
            queueNumber: '002',
            patientName: 'Sarah Johnson',
            doctorName: 'Dr. Ram Shrestha',
            status: 'In Progress',
            timeElapsed: '5 Mins',
        },
        {
            queueNumber: '003',
            patientName: 'Mike Brown',
            doctorName: 'Dr. Ram Shrestha',
            status: 'In Progress',
            timeElapsed: '5 Mins',
        },
        {
            queueNumber: '004',
            patientName: 'Emily Davis',
            doctorName: 'Dr. Ram Shrestha',
            status: 'In Progress',
            timeElapsed: '5 Mins',
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <StaffSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <StaffHeader staffName="Admin User" />

                {/* Dashboard Content */}
                <main className="flex-1 p-8">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Staff Dashboard</h1>
                        <p className="text-gray-500">Manage patient flow and doctor schedules</p>
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
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Queue</h2>
                        <div className="space-y-4">
                            {queueData.map((queue, index) => (
                                <StaffQueueCard
                                    key={index}
                                    queueNumber={queue.queueNumber}
                                    patientName={queue.patientName}
                                    doctorName={queue.doctorName}
                                    status={queue.status}
                                    timeElapsed={queue.timeElapsed}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StaffDashboard;