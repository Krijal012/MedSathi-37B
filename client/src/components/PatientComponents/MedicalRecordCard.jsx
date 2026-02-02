import React, { useState } from 'react';

const MedicalRecordCard = ({ title, date, doctorName }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="text-3xl">🩺</div>
                    <div>
                        <h4 className="font-semibold text-gray-800 text-lg">{title}</h4>
                        <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                            <span>📅 {date}</span>
                            <span>Dr. {doctorName}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-2xl text-gray-600 hover:text-gray-800 transition-transform"
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                    ▼
                </button>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Diagnosis:</span>
                            <span className="font-medium text-gray-800">Regular Checkup</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Prescription:</span>
                            <span className="font-medium text-gray-800">Medication A, B</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Notes:</span>
                            <span className="font-medium text-gray-800">All vitals normal</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicalRecordCard;