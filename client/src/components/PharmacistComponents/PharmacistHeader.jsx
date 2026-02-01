import React from 'react';

const PharmacistHeader = ({ pharmacistName = "Pharmacist" }) => {
    return (
        <header className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm text-gray-500">
                        Welcome back, <span className="font-semibold text-gray-700">{pharmacistName}</span>
                    </h2>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xl">👨‍⚕️</span>
                    </div>
                    <span className="font-medium text-gray-700">{pharmacistName}</span>
                </div>
            </div>
        </header>
    );
};

export default PharmacistHeader;