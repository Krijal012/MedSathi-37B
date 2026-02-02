import React from 'react';

const HealthMetricCard = ({ label, value, status, icon }) => {
    const getStatusColor = (status) => {
        if (status === 'Normal') return 'text-green-600';
        if (status === 'Warning') return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="
            bg-gray-50 rounded-lg p-3 
            sm:p-4 
            flex items-center justify-between
            w-full
        ">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className="
                    text-xl 
                    sm:text-2xl 
                    flex-shrink-0
                ">
                    {icon}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="
                        text-xs 
                        sm:text-sm 
                        text-gray-500 
                        truncate
                    ">
                        {label}
                    </p>
                    <p className="
                        font-semibold text-gray-800 
                        text-base 
                        sm:text-lg
                        truncate
                    ">
                        {value}
                    </p>
                </div>
            </div>
            <span className={`
                font-medium 
                text-xs 
                sm:text-sm 
                ${getStatusColor(status)}
                whitespace-nowrap 
                ml-2
            `}>
                {status}
            </span>
        </div>
    );
};

export default HealthMetricCard;