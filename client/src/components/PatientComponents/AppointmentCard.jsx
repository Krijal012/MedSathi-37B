import React from 'react';

const AppointmentCard = ({ doctorName, specialty, date, time }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl border border-gray-200">
                    🩺
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">{doctorName}</h4>
                    <p className="text-sm text-gray-500">{specialty}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-medium text-gray-800">{date}</p>
                <p className="text-sm text-gray-500">{time}</p>
            </div>
        </div>
    );
};

export default AppointmentCard;