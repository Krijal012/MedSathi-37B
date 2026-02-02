import React from 'react';

const StatCard = ({ title, value, icon, iconColor = 'text-blue-500' }) => {
    return (
        <div className="
            bg-white rounded-lg p-4 
            sm:p-6 
            shadow-sm border border-gray-100 
            hover:shadow-md 
            transition-shadow
            w-full
            h-full
        ">
            <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                    <p className="
                        text-gray-500 
                        text-xs 
                        sm:text-sm 
                        mb-1 
                        sm:mb-2
                    ">
                        {title}
                    </p>
                    <p className="
                        text-2xl 
                        sm:text-3xl 
                        font-bold 
                        text-gray-800
                        truncate
                    ">
                        {value}
                    </p>
                </div>
                <div className={`
                    text-xl 
                    sm:text-2xl 
                    ml-4 
                    flex-shrink-0
                    ${iconColor}
                `}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;