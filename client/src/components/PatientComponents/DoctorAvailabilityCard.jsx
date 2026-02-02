import React from 'react';

const DoctorAvailabilityCard = ({ doctorName, specialty, rating, reviews, experience, nextAvailable, onBookNow }) => {
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
            <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-0 w-full sm:w-auto">
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
                        flex flex-wrap 
                        items-center 
                        gap-2 
                        sm:space-x-3 
                        text-xs 
                        sm:text-sm
                    ">
                        <span className="
                            flex items-center 
                            text-yellow-500 
                            bg-yellow-50 
                            px-2 py-1 
                            rounded-full
                            sm:bg-transparent 
                            sm:px-0 sm:py-0
                        ">
                            ⭐ {rating} <span className="hidden sm:inline">({reviews})</span>
                        </span>
                        <span className="
                            text-gray-600 
                            bg-gray-50 
                            px-2 py-1 
                            rounded-full
                            sm:bg-transparent 
                            sm:px-0 sm:py-0
                        ">
                            {experience} yrs
                        </span>
                    </div>
                </div>
            </div>
            <div className="
                border-t 
                sm:border-t-0 
                pt-4 
                sm:pt-0 
                flex 
                sm:block 
                justify-between 
                items-center
                sm:text-right
            ">
                <div className="sm:mb-3">
                    <p className="text-xs text-gray-500 hidden sm:block">
                        Next available
                    </p>
                    <p className="
                        font-semibold text-gray-800 
                        text-sm 
                        sm:text-base
                    ">
                        {nextAvailable}
                    </p>
                </div>
                <button
                    onClick={onBookNow}
                    className="
                        px-4 py-2 
                        sm:px-6 sm:py-2 
                        bg-teal-500 
                        text-white 
                        rounded-lg 
                        hover:bg-teal-600 
                        transition-colors
                        text-sm 
                        sm:text-base
                        whitespace-nowrap
                    "
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default DoctorAvailabilityCard;