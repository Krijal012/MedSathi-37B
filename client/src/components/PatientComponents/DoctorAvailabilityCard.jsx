import React from 'react';

const DoctorAvailabilityCard = ({ doctorName, specialty, rating, reviews, experience, nextAvailable, onBookNow }) => {
    return (
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <div className="text-3xl">🩺</div>
                <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{doctorName}</h4>
                    <p className="text-sm text-gray-500">{specialty}</p>
                    <div className="flex items-center space-x-3 mt-2 text-sm">
                        <span className="flex items-center text-yellow-500">
                            ⭐ {rating} ({reviews})
                        </span>
                        <span className="text-gray-600">{experience} years</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Next available</p>
                <p className="font-semibold text-gray-800 mb-3">{nextAvailable}</p>
                <button
                    onClick={onBookNow}
                    className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default DoctorAvailabilityCard;