import React from 'react';

const TimeSlot = ({ time, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`
                px-4 py-2 
                sm:px-5 sm:py-2.5 
                md:px-6 md:py-2 
                rounded-lg 
                border-2 
                font-medium 
                transition-all 
                text-xs 
                sm:text-sm 
                md:text-base
                whitespace-nowrap
                w-full 
                sm:w-auto
                ${isSelected
                    ? 'bg-blue-400 text-white border-blue-400'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                }
            `}
        >
            {time}
        </button>
    );
};

export default TimeSlot;