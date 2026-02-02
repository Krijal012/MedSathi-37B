import React, { useState } from 'react';

const MedicalRecordCard = ({ title, date, doctorName }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="
            bg-white rounded-lg p-4 
            sm:p-5 
            shadow-sm border border-gray-100 
            hover:shadow-md 
            transition-shadow
            w-full
            mb-4
        ">
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className="
                        text-2xl 
                        sm:text-3xl 
                        flex-shrink-0
                    ">
                        🩺
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="
                            font-semibold text-gray-800 
                            text-base 
                            sm:text-lg 
                            mb-1
                        ">
                            {title}
                        </h4>
                        <div className="
                            flex flex-col 
                            sm:flex-row 
                            sm:items-center 
                            gap-1 
                            sm:gap-3 
                            text-xs 
                            sm:text-sm 
                            text-gray-500
                        ">
                            <span className="flex items-center">
                                📅 {date}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center">
                                Dr. {doctorName}
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="
                        text-xl 
                        sm:text-2xl 
                        text-gray-600 
                        hover:text-gray-800 
                        transition-transform
                        ml-2 
                        flex-shrink-0
                    "
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    aria-label={isExpanded ? "Collapse details" : "Expand details"}
                >
                    ▼
                </button>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="
                    mt-4 pt-4 border-t border-gray-200 
                    animate-slideDown
                ">
                    <div className="
                        space-y-2 
                        text-xs 
                        sm:text-sm
                    ">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                            <span className="text-gray-600 w-24">Diagnosis:</span>
                            <span className="font-medium text-gray-800 text-right sm:text-left">
                                Regular Checkup
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                            <span className="text-gray-600 w-24">Prescription:</span>
                            <span className="font-medium text-gray-800 text-right sm:text-left">
                                Medication A, B
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                            <span className="text-gray-600 w-24">Notes:</span>
                            <span className="font-medium text-gray-800 text-right sm:text-left">
                                All vitals normal
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicalRecordCard;