import React from 'react';

const TimeSlot = ({ time, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-2 rounded-lg border-2 font-medium transition-all ${
                isSelected
                    ? 'bg-blue-400 text-white border-blue-400'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
            }`}
        >
            {time}
        </button>
    );
};

export default TimeSlot;