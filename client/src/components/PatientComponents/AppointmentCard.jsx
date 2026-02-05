import React from 'react';

const AppointmentCard = ({ id, providerName, specialty, date, time, status, onComplete }) => {
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
            <div className="flex items-center space-x-3 mb-3 sm:mb-0 min-w-0 flex-1">
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
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${status === 'completed' ? 'bg-green-100 text-green-700' :
                            status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                        }`}>
                        {status || 'pending'}
                    </span>
                </div>
            </div>
            <div className="
                text-left 
                sm:text-right 
                flex 
                sm:flex-col
                justify-between 
                items-center
                sm:items-end
                gap-2
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
                {onComplete && status !== 'completed' && status !== 'cancelled' && (
                    <button
                        onClick={() => onComplete(id)}
                        className="px-3 py-1 bg-teal-600 text-white text-xs font-semibold rounded hover:bg-teal-700 transition-colors"
                    >
                        Mark Complete
                    </button>
                )}
            </div>
        </div>
    );
};

export default AppointmentCard;