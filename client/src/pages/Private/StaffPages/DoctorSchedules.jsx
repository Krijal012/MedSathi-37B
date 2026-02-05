import { useState, useEffect } from 'react';
import StaffSidebar from '../../../components/StaffComponents/StaffSideBar';
import StaffHeader from '../../../components/StaffComponents/StaffHeader';
import DoctorScheduleCard from '../../../components/StaffComponents/DoctorScheduleCard';

const DoctorSchedules = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/doctors');
                const data = await response.json();
                if (data.success) {
                    setDoctors(data.data);
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <StaffSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <StaffHeader staffName="Admin User" toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-6 sm:p-8 lg:p-10 bg-[#f8fafc]">
                    {/* Page Title */}
                    <div className="mb-10">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-2">Pharmacist Schedules</h1>
                        <p className="text-lg text-[#64748b] font-medium">Manage pharmacist working hours</p>
                    </div>

                    {/* Pharmacist Schedules List */}
                    <div>
                        {loading ? (
                            <p>Loading pharmacists...</p>
                        ) : doctors.length > 0 ? (
                            doctors.map((doctor) => (
                                <DoctorScheduleCard
                                    key={doctor.id}
                                    doctorName={doctor.name}
                                    specialty={doctor.specialty}
                                    schedule={doctor.schedule}
                                />
                            ))
                        ) : (
                            <p>No doctors found.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorSchedules;