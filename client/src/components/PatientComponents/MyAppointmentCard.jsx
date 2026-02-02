import React from 'react';

const MyAppointmentCard = ({ doctorName, specialty, date, time, status, onCancel }) => {
    return (
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <div className="text-3xl">🩺</div>
                <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{doctorName}</h4>
                    <p className="text-sm text-gray-500">{specialty}</p>
                    <div className="flex items-center space-x-3 mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                            📅 {date}
                        </span>
                        <span className="flex items-center">
                            🕐 {time}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {status}
                </span>
                <button
                    onClick={onCancel}
                    className="px-4 py-1 text-red-500 font-medium hover:bg-red-50 rounded transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default MyAppointmentCard;