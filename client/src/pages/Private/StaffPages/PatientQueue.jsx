import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
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
                const response = await fetch('http://localhost:5000/api/queue/current');
                const data = await response.json();
                if (data.success) {
                    setQueueList(data.data);
                }
            } catch (error) {
                console.error("Error fetching patient queue:", error);
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
                if (newStatus === 'complete' || newStatus === 'completed') {
                    setQueueList(queueList.filter(item => item.id !== id));
                    toast.success('Patient appointment marked as complete!');
                } else {
                    setQueueList(queueList.map(item => item.id === id ? { ...item, status: newStatus } : item));
                    toast.success(`Status updated to ${newStatus}`);
                }
            }
        } catch (error) {
            console.error("Error updating queue status:", error);
            toast.error('Failed to update status');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <StaffSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <StaffHeader staffName="Staff User" toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-6 sm:p-8 lg:p-10 bg-[#f8fafc]">
                    {/* Page Title */}
                    <div className="mb-10">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-2">Patient Queue</h1>
                        <p className="text-lg text-[#64748b] font-medium">Manage patient waiting queue</p>
                    </div>

                    {/* Queue List */}
                    <div className="max-w-5xl">
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : queueList.length > 0 ? (
                            queueList.map((item) => (
                                <PatientQueueItem
                                    key={item.id}
                                    queueNumber={item.queueNumber || item.id.toString().padStart(3, '0')}
                                    patientName={item.patientName}
                                    doctorName={item.doctorName}
                                    waitTime={item.waitTime || '0 mins'}
                                    status={item.status}
                                    onStatusChange={(status) => handleStatusChange(item.id, status)}
                                />
                            ))
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
                                <p className="text-slate-400 font-medium">No patients in queue currently.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PatientQueue;