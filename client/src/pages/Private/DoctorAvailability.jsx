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
                <main className="flex-1 p-8">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Doctor Availability</h1>
                        <p className="text-gray-500">Find available doctors and view their schedules</p>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex items-center space-x-4 mb-6">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Search doctors..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative">
                            <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                                className="px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 bg-white cursor-pointer appearance-none pr-10"
                            >
                                <option value="All">All</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Dentist">Dentist</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="General">General Physician</option>
                            </select>
                            <span className="absolute right-3 top-4 text-gray-400 pointer-events-none">▼</span>
                        </div>
                    </div>

                    {/* Doctors List */}
                    <div className="space-y-4">
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