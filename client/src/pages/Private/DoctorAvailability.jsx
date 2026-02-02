import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/PatientComponents/Sidebar';
import Header from '../../components/PatientComponents/Header';
import DoctorAvailabilityCard from '../../components/PatientComponents/DoctorAvailabilityCard';

const DoctorAvailability = () => {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState('All');

    // Sample doctors data
    const doctors = [
        {
            id: 1,
            name: 'Dr. Sarah Chen',
            specialty: 'Cardiologist',
            rating: 4.8,
            reviews: 156,
            experience: 12,
            nextAvailable: 'Today, 2:30 PM',
            clinic: 'City Heart Center',
            consultationFee: '$150',
            languages: ['English', 'Mandarin'],
            isOnline: true
        },
        {
            id: 2,
            name: 'Dr. Michael Rodriguez',
            specialty: 'Pediatrician',
            rating: 4.9,
            reviews: 203,
            experience: 8,
            nextAvailable: 'Tomorrow, 10:00 AM',
            clinic: 'Children\'s Health Clinic',
            consultationFee: '$120',
            languages: ['English', 'Spanish'],
            isOnline: false
        },
        {
            id: 3,
            name: 'Dr. Emily Park',
            specialty: 'Dermatologist',
            rating: 4.7,
            reviews: 89,
            experience: 6,
            nextAvailable: 'Today, 4:15 PM',
            clinic: 'Skin Care Specialists',
            consultationFee: '$130',
            languages: ['English', 'Korean'],
            isOnline: true
        },
        {
            id: 4,
            name: 'Dr. James Wilson',
            specialty: 'Orthopedic Surgeon',
            rating: 4.9,
            reviews: 178,
            experience: 15,
            nextAvailable: 'Tomorrow, 11:30 AM',
            clinic: 'Sports Medicine Institute',
            consultationFee: '$200',
            languages: ['English'],
            isOnline: false
        },
        {
            id: 5,
            name: 'Dr. Lisa Thompson',
            specialty: 'Dentist',
            rating: 4.6,
            reviews: 112,
            experience: 9,
            nextAvailable: 'Today, 5:00 PM',
            clinic: 'Bright Smile Dental',
            consultationFee: '$110',
            languages: ['English', 'French'],
            isOnline: true
        },
    ];

    const handleBookNow = (doctorId) => {
        navigate('/book-appointment');
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
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Doctor Availability</h1>
                        <p className="text-gray-500 text-sm sm:text-base">
                            Find available doctors and view their schedules
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="
                        flex flex-col 
                        sm:flex-row 
                        items-stretch 
                        sm:items-center 
                        gap-3 sm:gap-4 
                        mb-4 sm:mb-6
                    ">
                        {/* Search Bar */}
                        <div className="relative flex-1">
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
                                placeholder="Search doctors..."
                                className="
                                    w-full 
                                    pl-10 pr-4 
                                    py-2.5 sm:py-3 
                                    border border-gray-300 
                                    rounded-lg 
                                    focus:outline-none 
                                    focus:border-blue-400
                                    text-sm sm:text-base
                                "
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative">
                            <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                                className="
                                    w-full 
                                    sm:w-auto
                                    px-4 sm:px-6 
                                    py-2.5 sm:py-3 
                                    border border-gray-300 
                                    rounded-lg 
                                    focus:outline-none 
                                    focus:border-blue-400 
                                    bg-white 
                                    cursor-pointer 
                                    appearance-none 
                                    pr-10
                                    text-sm sm:text-base
                                "
                            >
                                <option value="All">All Specialties</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Dentist">Dentist</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="General">General Physician</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Orthopedic">Orthopedic</option>
                            </select>
                            <span className="
                                absolute 
                                right-3 top-1/2 
                                -translate-y-1/2 
                                text-gray-400 
                                pointer-events-none
                            ">
                                ▼
                            </span>
                        </div>
                    </div>

                    {/* Doctors List */}
                    <div className="space-y-3 sm:space-y-4">
                        {doctors.map((doctor) => (
                            <DoctorAvailabilityCard
                                key={doctor.id}
                                doctorName={doctor.name}
                                specialty={doctor.specialty}
                                rating={doctor.rating}
                                reviews={doctor.reviews}
                                experience={doctor.experience}
                                nextAvailable={doctor.nextAvailable}
                                onBookNow={() => handleBookNow(doctor.id)}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DoctorAvailability;