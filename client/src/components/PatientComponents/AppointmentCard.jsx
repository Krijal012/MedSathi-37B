import React from 'react';

const AppointmentCard = ({ providerName, specialty, date, time }) => {
    return (
        <div className="
            bg-gray-50 rounded-lg p-3 
            sm:p-4 
            flex flex-col 
            sm:flex-row 
            sm:items-center 
            justify-between 
            hover:bg-gray-100 
            transition-colors
            w-full
        ">
            <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                <div className="
                    w-10 h-10 
                    sm:w-12 sm:h-12 
                    bg-white rounded-full 
                    flex items-center justify-center 
                    text-xl 
                    sm:text-2xl 
                    border border-gray-200
                    flex-shrink-0
                ">
                    👤
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="
                        font-semibold text-gray-800 
                        text-sm 
                        sm:text-base 
                        truncate
                    ">
                        {providerName}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {specialty}
                    </p>
                </div>
            </div>
            <div className="
                text-left 
                sm:text-right 
                flex 
                sm:block 
                justify-between 
                items-center
            ">
                <div>
                    <p className="
                        font-medium text-gray-800 
                        text-sm 
                        sm:text-base
                    ">
                        {date}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                        {time}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;