import React from 'react';

const DoctorCard = ({ doctorName, specialty, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full bg-white rounded-lg p-4 border-2 transition-all hover:shadow-md ${
                isSelected ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
        >
            <div className="flex items-center space-x-3">
                <div className="text-2xl">🩺</div>
                <div className="text-left">
                    <h4 className="font-semibold text-gray-800">{doctorName}</h4>
                    <p className="text-sm text-gray-500">{specialty}</p>
                </div>
            </div>
        </button>
    );
};

export default DoctorCard;