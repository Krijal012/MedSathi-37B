import React, { useState } from 'react';
import StaffSidebar from '../../../components/StaffComponents/StaffSideBar';
import StaffHeader from '../../../components/StaffComponents/StaffHeader';
import PatientQueueItem from '../../../components/StaffComponents/PatientQueueItem';

const PatientQueue = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const queueList = [
        {
            id: 1,
            queueNumber: '001',
            patientName: 'John Smith',
            doctorName: 'Dr. Sarah Chen',
            waitTime: '5 mins',
            status: 'In Progress',
        },
        {
            id: 2,
            queueNumber: '002',
            patientName: 'Emily Johnson',
            doctorName: 'Dr. Michael Rodriguez',
            waitTime: '10 mins',
            status: 'Waiting',
        },
        {
            id: 3,
            queueNumber: '003',
            patientName: 'Robert Williams',
            doctorName: 'Dr. James Wilson',
            waitTime: '15 mins',
            status: 'Waiting',
        },
        {
            id: 4,
            queueNumber: '004',
            patientName: 'Lisa Brown',
            doctorName: 'Dr. Emily Park',
            waitTime: '0 mins',
            status: 'Complete',
        },
        {
            id: 5,
            queueNumber: '005',
            patientName: 'David Miller',
            doctorName: 'Dr. Sarah Chen',
            waitTime: '8 mins',
            status: 'Waiting',
        },
    ];

    const handleStatusChange = (id, newStatus) => {
        console.log(`Queue ${id} status changed to:`, newStatus);
        if (newStatus === 'complete') {
            alert('Patient marked as complete!');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <StaffSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <StaffHeader staffName="Staff User" toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Patient Queue</h1>
                        <p className="text-gray-500">Manage patient waiting queue</p>
                    </div>

                    {/* Queue List */}
                    <div>
                        {queueList.map((item) => (
                            <PatientQueueItem
                                key={item.id}
                                queueNumber={item.queueNumber}
                                patientName={item.patientName}
                                doctorName={item.doctorName}
                                waitTime={item.waitTime}
                                status={item.status}
                                onStatusChange={(status) => handleStatusChange(item.id, status)}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientQueue;