import React from 'react';

const StatCard = ({ title, value, icon, iconColor = 'text-blue-500' }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-gray-500 text-sm mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                </div>
                <div className={`text-2xl ${iconColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;