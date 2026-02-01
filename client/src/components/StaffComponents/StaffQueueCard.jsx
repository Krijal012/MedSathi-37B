import React from 'react';

const StaffQueueCard = ({ queueNumber, patientName, doctorName, status, timeElapsed }) => {
    return (
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-6">
                <div className="bg-gray-100 rounded-lg px-6 py-4">
                    <p className="text-2xl font-bold text-gray-600">{queueNumber}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{patientName}</h4>
                    <p className="text-sm text-gray-500">{doctorName}</p>
                </div>
            </div>
            <div className="text-right">
                <span className="inline-block px-4 py-1 bg-gray-600 text-white text-sm rounded-full">
                    {status}
                </span>
                <p className="text-sm text-gray-500 mt-1">{timeElapsed}</p>
            </div>
        </div>
    );
};

export default StaffQueueCard;