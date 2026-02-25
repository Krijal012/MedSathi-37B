import React from 'react';

const PharmacistAvailabilityCard = ({ name, specialty, rating, reviews, experience, nextAvailable, onBookNow, image }) => {
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
                    w-12 h-12 
                    sm:w-16 sm:h-16 
                    rounded-full 
                    overflow-hidden 
                    bg-teal-50 
                    border border-teal-100 
                    flex items-center 
                    justify-center 
                    flex-shrink-0
                ">
                    {image ? (
                        <img src={`http://localhost:5000${image}`} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-2xl sm:text-3xl">💊</span>
                    )}
                </div>
                <div className="min-w-0 flex-1 pl-2">
                    <h4 className="
                        font-semibold text-gray-800 
                        text-base 
                        sm:text-lg 
                        truncate
                    ">
                        {name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">
                        {specialty || 'Pharmacist'}
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
                            ⭐ {rating || '4.5'} <span className="hidden sm:inline">({reviews || '0'})</span>
                        </span>
                        <span className="
                            text-gray-600 
                            bg-gray-50 
                            px-2 py-1 
                            rounded-full
                            sm:bg-transparent 
                            sm:px-0 sm:py-0
                        ">
                            {experience || '5'}+ yrs
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
                        Status
                    </p>
                    <p className="
                        font-semibold text-teal-600 
                        text-sm 
                        sm:text-base
                    ">
                        Available Now
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
                    Consult Now
                </button>
            </div>
        </div>
    );
};

export default PharmacistAvailabilityCard;