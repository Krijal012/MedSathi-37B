import React from 'react';

const HealthMetricCard = ({ label, value, status, icon }) => {
    const getStatusColor = (status) => {
        if (status === 'Normal') return 'text-green-600';
        if (status === 'Warning') return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="text-2xl">{icon}</div>
                <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="font-semibold text-gray-800">{value}</p>
                </div>
            </div>
            <span className={`font-medium ${getStatusColor(status)}`}>
                {status}
            </span>
        </div>
    );
};

export default HealthMetricCard;