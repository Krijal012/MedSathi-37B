import React from 'react';

const MyAppointmentCard = ({ doctorName, specialty, date, time, status, onCancel }) => {
    return (
        <div className="
            bg-white rounded-lg p-4 
            sm:p-5 
            shadow-sm border border-gray-100 
            flex flex-col 
            sm:flex-row 
            sm:items-center 
            justify-between 
            hover:shadow-md 
            transition-shadow
            w-full
            mb-4
        ">
            <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-0 min-w-0 flex-1">
                <div className="
                    text-2xl 
                    sm:text-3xl 
                    flex-shrink-0
                ">
                    🩺
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="
                        font-semibold text-gray-800 
                        text-base 
                        sm:text-lg 
                        truncate
                    ">
                        {doctorName}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">
                        {specialty}
                    </p>
                    <div className="
                        flex flex-col 
                        sm:flex-row 
                        sm:items-center 
                        gap-1 
                        sm:gap-3 
                        text-xs 
                        sm:text-sm 
                        text-gray-600
                    ">
                        <span className="flex items-center">
                            📅 {date}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center">
                            🕐 {time}
                        </span>
                    </div>
                </div>
            </div>
            <div className="
                flex 
                items-center 
                justify-between 
                sm:justify-end 
                sm:space-x-3
                border-t 
                sm:border-t-0 
                pt-4 
                sm:pt-0
            ">
                <span className="
                    px-3 py-1 
                    sm:px-4 sm:py-1 
                    bg-blue-100 
                    text-blue-700 
                    rounded-full 
                    text-xs 
                    sm:text-sm 
                    font-medium
                    whitespace-nowrap
                ">
                    {status}
                </span>
                <button
                    onClick={onCancel}
                    className="
                        px-3 py-1 
                        sm:px-4 sm:py-1 
                        text-red-500 
                        font-medium 
                        hover:bg-red-50 
                        rounded 
                        transition-colors
                        text-xs 
                        sm:text-sm
                        whitespace-nowrap
                    "
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default MyAppointmentCard;