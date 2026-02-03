import React from 'react';

const ActivityItem = ({ title, description, time }) => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div>
                <h4 className="font-semibold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <span className="text-xs text-gray-400">{time}</span>
        </div>
    );
};

export default ActivityItem;