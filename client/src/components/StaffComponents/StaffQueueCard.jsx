import React from 'react';

const StaffQueueCard = ({ queueNumber, patientName, doctorName, status, timeElapsed }) => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition-shadow space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4">
                <div className="bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4">
                    <p className="text-xl sm:text-2xl font-bold text-gray-600">{queueNumber}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 text-base sm:text-lg">{patientName}</h4>
                    <p className="text-sm text-gray-500">{doctorName}</p>
                </div>
            </div>
            <div className="text-right flex sm:flex-col items-end justify-between">
                <span className="inline-block px-3 py-1 bg-gray-600 text-white text-xs sm:text-sm rounded-full">
                    {status}
                </span>
                <p className="text-sm text-gray-500 mt-1">{timeElapsed}</p>
            </div>
        </div>
    );
};

export default StaffQueueCard;