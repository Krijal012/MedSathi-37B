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
        { id: 1, name: 'Dr. Sarah Chen', specialty: 'Cardiologist' },
        { id: 2, name: 'Dr. Michael Rodriguez', specialty: 'Pediatrician' },
        { id: 3, name: 'Dr. Emily Park', specialty: 'Dermatologist' },
        { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedic Surgeon' },
        { id: 5, name: 'Dr. Lisa Thompson', specialty: 'Dentist' },
        { id: 6, name: 'Dr. Robert Kim', specialty: 'Allergist' },
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
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-4 sm:mb-6 lg:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Book Appointment</h1>
                        <p className="text-gray-500 text-sm sm:text-base">
                            Schedule a visit with our healthcare professionals
                        </p>
                    </div>

                    {/* Step Indicator */}
                    <div className="mb-6 sm:mb-8">
                        <StepIndicator currentStep={currentStep} totalSteps={3} />
                    </div>

                    {/* Form Container */}
                    <div className="
                        bg-white rounded-lg shadow-sm border border-gray-100 
                        p-4 sm:p-6 lg:p-8 
                        max-w-full sm:max-w-2xl lg:max-w-4xl 
                        mx-auto
                        w-full
                    ">
                        {/* Step 1: Select Doctor */}
                        {currentStep === 1 && (
                            <div>
                                <div className="mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Select Doctor</h2>
                                    <p className="text-gray-500 text-sm sm:text-base">
                                        Choose a healthcare professional for your appointment
                                    </p>
                                </div>

                                <div className="
                                    grid grid-cols-1 
                                    sm:grid-cols-2 
                                    lg:grid-cols-3 
                                    gap-3 sm:gap-4 
                                    mb-6 sm:mb-8
                                ">
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
                                        className="
                                            w-full 
                                            sm:w-auto
                                            px-4 sm:px-6 lg:px-8 
                                            py-2.5 sm:py-3 
                                            bg-teal-500 text-white 
                                            font-semibold rounded-lg 
                                            hover:bg-teal-600 
                                            transition-colors 
                                            disabled:bg-gray-300 
                                            disabled:cursor-not-allowed
                                            text-sm sm:text-base
                                        "
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Select Date & Time */}
                        {currentStep === 2 && (
                            <div>
                                <div className="mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Select Date & Time</h2>
                                    <p className="text-gray-500 text-sm sm:text-base">
                                        Choose your preferred appointment slot
                                    </p>
                                </div>

                                <div className="mb-6 sm:mb-8">
                                    {/* Date Selection */}
                                    <div className="mb-4 sm:mb-6">
                                        <label className="
                                            block 
                                            text-sm 
                                            font-semibold 
                                            text-gray-700 
                                            mb-2 sm:mb-3
                                        ">
                                            Select Date
                                        </label>
                                        <div className="relative">
                                            <span className="
                                                absolute 
                                                left-3 top-1/2 
                                                -translate-y-1/2
                                                text-gray-400 
                                                text-lg sm:text-xl
                                            ">
                                                📅
                                            </span>
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                className="
                                                    w-full 
                                                    pl-10 sm:pl-12 pr-4 
                                                    py-2.5 sm:py-3 
                                                    border-2 border-gray-300 
                                                    rounded-lg 
                                                    focus:border-blue-400 
                                                    focus:outline-none
                                                    text-sm sm:text-base
                                                "
                                            />
                                        </div>
                                    </div>

                                    {/* Time Selection */}
                                    <div>
                                        <label className="
                                            block 
                                            text-sm 
                                            font-semibold 
                                            text-gray-700 
                                            mb-2 sm:mb-3
                                        ">
                                            Select Time
                                        </label>
                                        <div className="
                                            grid grid-cols-2 
                                            sm:grid-cols-3 
                                            lg:grid-cols-4 
                                            gap-2
                                        ">
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

                                <div className="
                                    flex flex-col-reverse 
                                    sm:flex-row 
                                    gap-3 sm:gap-4
                                ">
                                    <button
                                        onClick={handleBack}
                                        className="
                                            flex-1 
                                            px-4 sm:px-6 lg:px-8 
                                            py-2.5 sm:py-3 
                                            bg-white text-gray-700 
                                            font-semibold rounded-lg 
                                            border-2 border-gray-300 
                                            hover:bg-gray-50 
                                            transition-colors
                                            text-sm sm:text-base
                                        "
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={!selectedDate || !selectedTime}
                                        className="
                                            flex-1 
                                            px-4 sm:px-6 lg:px-8 
                                            py-2.5 sm:py-3 
                                            bg-teal-500 text-white 
                                            font-semibold rounded-lg 
                                            hover:bg-teal-600 
                                            transition-colors 
                                            disabled:bg-gray-300 
                                            disabled:cursor-not-allowed
                                            text-sm sm:text-base
                                        "
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Appointment Details */}
                        {currentStep === 3 && (
                            <div>
                                <div className="mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Appointment Details</h2>
                                    <p className="text-gray-500 text-sm sm:text-base">
                                        Provide additional information for your visit
                                    </p>
                                </div>

                                {/* Reason for Visit */}
                                <div className="mb-4 sm:mb-6">
                                    <label className="
                                        block 
                                        text-sm 
                                        font-semibold 
                                        text-gray-700 
                                        mb-2
                                    ">
                                        Reason for visit
                                    </label>
                                    <textarea
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        placeholder="Describe your symptoms or reason for the appointment"
                                        rows="4"
                                        className="
                                            w-full 
                                            px-4 py-3 
                                            border-2 border-gray-300 
                                            rounded-lg 
                                            focus:border-blue-400 
                                            focus:outline-none 
                                            resize-none
                                            text-sm sm:text-base
                                        "
                                    />
                                </div>

                                {/* Appointment Summary */}
                                <div className="
                                    bg-gray-50 rounded-lg 
                                    p-4 sm:p-6 
                                    mb-6 sm:mb-8
                                ">
                                    <h3 className="
                                        text-lg sm:text-xl 
                                        font-bold text-gray-800 
                                        mb-3 sm:mb-4
                                    ">
                                        Appointment Summary
                                    </h3>
                                    <div className="space-y-2 sm:space-y-3">
                                        <div className="
                                            flex flex-col 
                                            sm:flex-row 
                                            sm:justify-between 
                                            gap-1
                                        ">
                                            <span className="text-gray-600 text-sm sm:text-base">
                                                Doctor:
                                            </span>
                                            <span className="
                                                font-semibold 
                                                text-gray-800 
                                                text-sm sm:text-base
                                            ">
                                                {selectedDoctor?.name || 'Not selected'}
                                            </span>
                                        </div>
                                        <div className="
                                            flex flex-col 
                                            sm:flex-row 
                                            sm:justify-between 
                                            gap-1
                                        ">
                                            <span className="text-gray-600 text-sm sm:text-base">
                                                Date:
                                            </span>
                                            <span className="
                                                font-semibold 
                                                text-gray-800 
                                                text-sm sm:text-base
                                            ">
                                                {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                }) : 'Not selected'}
                                            </span>
                                        </div>
                                        <div className="
                                            flex flex-col 
                                            sm:flex-row 
                                            sm:justify-between 
                                            gap-1
                                        ">
                                            <span className="text-gray-600 text-sm sm:text-base">
                                                Time:
                                            </span>
                                            <span className="
                                                font-semibold 
                                                text-gray-800 
                                                text-sm sm:text-base
                                            ">
                                                {selectedTime || 'Not selected'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="
                                    flex flex-col-reverse 
                                    sm:flex-row 
                                    gap-3 sm:gap-4
                                ">
                                    <button
                                        onClick={handleBack}
                                        className="
                                            flex-1 
                                            px-4 sm:px-6 lg:px-8 
                                            py-2.5 sm:py-3 
                                            bg-white text-gray-700 
                                            font-semibold rounded-lg 
                                            border-2 border-gray-300 
                                            hover:bg-gray-50 
                                            transition-colors
                                            text-sm sm:text-base
                                        "
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="
                                            flex-1 
                                            px-4 sm:px-6 lg:px-8 
                                            py-2.5 sm:py-3 
                                            bg-teal-500 text-white 
                                            font-semibold rounded-lg 
                                            hover:bg-teal-600 
                                            transition-colors
                                            text-sm sm:text-base
                                        "
                                    >
                                        Confirm Appointment
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