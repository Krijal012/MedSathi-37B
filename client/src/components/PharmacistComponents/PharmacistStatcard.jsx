import React from 'react';

const PharmacistStatCard = ({ title, value, icon, iconColor = 'text-blue-500' }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <p className="text-gray-500 text-sm mb-2">{title}</p>
            <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-gray-800">{value}</p>
                <div className={`text-2xl ${iconColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default PharmacistStatCard;