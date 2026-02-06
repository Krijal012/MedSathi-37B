import React from 'react';

const DoctorCard = ({ doctorName, specialty, isSelected, onClick, image }) => {
    return (
        <button
            onClick={onClick}
            className={`
                w-full 
                bg-white rounded-lg p-3 
                sm:p-4 
                border-2 transition-all 
                hover:shadow-md
                ${isSelected
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }
            `}
        >
            <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="
                    w-10 h-10 
                    sm:w-12 sm:h-12 
                    bg-blue-50 rounded-full 
                    flex items-center justify-center 
                    overflow-hidden 
                    flex-shrink-0
                    border border-blue-100
                ">
                    {image ? (
                        <img src={`http://localhost:5000${image}`} alt={doctorName} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xl sm:text-2xl">🩺</span>
                    )}
                </div>
                <div className="text-left min-w-0 flex-1">
                    <h4 className="
                        font-semibold text-gray-800 
                        text-sm 
                        sm:text-base 
                        truncate
                    ">
                        {doctorName}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {specialty}
                    </p>
                </div>
            </div>
        </button>
    );
};

export default DoctorCard;