import { useState } from 'react';
import StaffSidebar from '../../components/StaffComponents/StaffSideBar';
import StaffHeader from '../../components/StaffComponents/StaffHeader';
import DoctorScheduleCard from '../../components/StaffComponents/DoctorScheduleCard';

const DoctorSchedules = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const doctors = [
        {
            id: 1,
            name: 'Dr. Sarah Chen',
            specialty: 'Cardiologist',
            schedule: {
                Monday: '8AM-4PM',
                Tuesday: '9AM-5PM',
                Wednesday: '10AM-6PM',
                Thursday: '8AM-12PM',
                Friday: '1PM-7PM',
                Saturday: 'Emergency Only',
            },
        },
        {
            id: 2,
            name: 'Dr. Michael Rodriguez',
            specialty: 'Pediatrician',
            schedule: {
                Monday: '9AM-5PM',
                Tuesday: '10AM-6PM',
                Wednesday: '9AM-5PM',
                Thursday: '8AM-4PM',
                Friday: '9AM-3PM',
                Saturday: '10AM-2PM',
            },
        },
        {
            id: 3,
            name: 'Dr. Emily Park',
            specialty: 'Dermatologist',
            schedule: {
                Monday: '10AM-6PM',
                Tuesday: '8AM-4PM',
                Wednesday: '9AM-5PM',
                Thursday: 'Off',
                Friday: '9AM-5PM',
                Saturday: '9AM-1PM',
            },
        },
        {
            id: 4,
            name: 'Dr. James Wilson',
            specialty: 'Orthopedic Surgeon',
            schedule: {
                Monday: '7AM-3PM',
                Tuesday: '8AM-4PM',
                Wednesday: 'Off',
                Thursday: '9AM-5PM',
                Friday: '8AM-4PM',
                Saturday: 'Emergency Only',
            },
        },
        {
            id: 5,
            name: 'Dr. Lisa Thompson',
            specialty: 'Dentist',
            schedule: {
                Monday: '8AM-5PM',
                Tuesday: '9AM-6PM',
                Wednesday: '8AM-5PM',
                Thursday: '9AM-6PM',
                Friday: '8AM-4PM',
                Saturday: '9AM-3PM',
            },
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <StaffSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <StaffHeader staffName="Admin User" toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Doctor Schedules</h1>
                        <p className="text-gray-500">Manage doctor working hours</p>
                    </div>

                    {/* Doctor Schedules List */}
                    <div>
                        {doctors.map((doctor) => (
                            <DoctorScheduleCard
                                key={doctor.id}
                                doctorName={doctor.name}
                                specialty={doctor.specialty}
                                schedule={doctor.schedule}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorSchedules;