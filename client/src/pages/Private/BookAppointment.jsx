import React, { useState } from 'react';
import { Sidebar } from '../../components/PatientComponents/Sidebar';
import Header from '../../components/PatientComponents/Header';
import StepIndicator from '../../components/PatientComponents/StepIndicator';
import DoctorCard from '../../components/PatientComponents/DoctorCard';
import TimeSlot from '../../components/PatientComponents/TimeSlot';

const BookAppointment = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [reason, setReason] = useState('');

    // Sample doctors data
    const doctors = [
        { id: 1, name: 'Dr. Ram Shrestha', specialty: 'Cardiologist' },
        { id: 2, name: 'Dr. Ram Shrestha', specialty: 'Cardiologist' },
        { id: 3, name: 'Dr. Ram Shrestha', specialty: 'Cardiologist' },
        { id: 4, name: 'Dr. Ram Shrestha', specialty: 'Cardiologist' },
        { id: 5, name: 'Dr. Ram Shrestha', specialty: 'Cardiologist' },
        { id: 6, name: 'Dr. Ram Shrestha', specialty: 'Cardiologist' },
    ];

    // Sample time slots
    const timeSlots = [
        '09:00AM', '09:30AM', '10:00AM',
        '10:30AM', '11:00AM', '11:30AM',
        '12:00PM', '12:30PM', '13:00PM',
        '13:30PM', '14:00PM', '14:30PM',
        '15:00PM', '15:30PM', '16:00PM',
    ];

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        console.log('Appointment Details:', {
            doctor: selectedDoctor,
            date: selectedDate,
            time: selectedTime,
            reason: reason,
        });
        alert('Appointment booked successfully!');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header patientName="John Doe" />

                {/* Appointment Content */}
                <main className="flex-1 p-8">
                    {/* Page Title */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Book Appointment</h1>
                        <p className="text-gray-500">Schedule a visit with our healthcare professionals</p>
                    </div>

                    {/* Step Indicator */}
                    <StepIndicator currentStep={currentStep} totalSteps={3} />

                    {/* Form Container */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto">
                        {/* Step 1: Select Doctor */}
                        {currentStep === 1 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Doctor</h2>
                                <p className="text-gray-500 mb-6">Choose a healthcare professional for your appointment</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {doctors.map((doctor) => (
                                        <DoctorCard
                                            key={doctor.id}
                                            doctorName={doctor.name}
                                            specialty={doctor.specialty}
                                            isSelected={selectedDoctor?.id === doctor.id}
                                            onClick={() => setSelectedDoctor(doctor)}
                                        />
                                    ))}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={handleNext}
                                        disabled={!selectedDoctor}
                                        className="w-full px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Select Date & Time */}
                        {currentStep === 2 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Date & Time</h2>
                                <p className="text-gray-500 mb-6">Choose your preferred appointment slot</p>

                                <div className="mb-8">
                                    {/* Date Selection */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">Select Date</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-gray-400 text-xl">📅</span>
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Time Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">Select Time</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {timeSlots.map((time) => (
                                                <TimeSlot
                                                    key={time}
                                                    time={time}
                                                    isSelected={selectedTime === time}
                                                    onClick={() => setSelectedTime(time)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleBack}
                                        className="flex-1 px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={!selectedDate || !selectedTime}
                                        className="flex-1 px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Appointment Details */}
                        {currentStep === 3 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Details</h2>
                                <p className="text-gray-500 mb-6">Provide additional information for your visit</p>

                                {/* Reason for Visit */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for visit</label>
                                    <textarea
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        placeholder="Describe your symptoms or reason for the appointment"
                                        rows="5"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none resize-none"
                                    />
                                </div>

                                {/* Appointment Summary */}
                                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Appointment Summary</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Doctor:</span>
                                            <span className="font-semibold text-gray-800">{selectedDoctor?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Date:</span>
                                            <span className="font-semibold text-gray-800">
                                                {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : ''}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Time:</span>
                                            <span className="font-semibold text-gray-800">{selectedTime}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleBack}
                                        className="flex-1 px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BookAppointment;