import React, { useState, useEffect } from 'react';
import StaffSidebar from '../../../components/StaffComponents/StaffSideBar';
import StaffHeader from '../../../components/StaffComponents/StaffHeader';
import PatientQueueItem from '../../../components/StaffComponents/PatientQueueItem';

const PatientQueue = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const [queueList, setQueueList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQueue = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/queue/pharmacist');
                const data = await response.json();
                if (data.success) {
                    setQueueList(data.data);
                }
            } catch (error) {
                console.error("Error fetching pharmacist queue:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQueue();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/queue/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await response.json();
            if (data.success) {
                setQueueList(queueList.map(item => item.id === id ? { ...item, status: newStatus } : item));
                if (newStatus === 'complete' || newStatus === 'completed') {
                    alert('Patient marked as complete!');
                }
            }
        } catch (error) {
            console.error("Error updating queue status:", error);
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
                        {loading ? (
                            <p>Loading queue...</p>
                        ) : queueList.length > 0 ? (
                            queueList.map((item) => (
                                <PatientQueueItem
                                    key={item.id}
                                    queueNumber={item.queueNumber || item.id.toString().padStart(3, '0')}
                                    patientName={item.patientName}
                                    doctorName={item.doctorName}
                                    waitTime={item.waitTime || 'N/A'}
                                    status={item.status}
                                    onStatusChange={(status) => handleStatusChange(item.id, status)}
                                />
                            ))
                        ) : (
                            <p>No patients in queue.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientQueue;