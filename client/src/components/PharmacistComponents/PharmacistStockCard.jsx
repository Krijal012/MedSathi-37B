import React from 'react';

const PharmacistStockCard = ({ medicineName, category, stockLeft, minimumRequired, image }) => {
    // Calculate percentage for progress bar
    const percentage = (stockLeft / minimumRequired) * 100;

    return (
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100 flex items-center justify-center">
                        {image ? (
                            <img src={`http://localhost:5000${image}`} alt={medicineName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl">💊</span>
                        )}
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 text-lg">{medicineName}</h4>
                        <p className="text-sm text-gray-500">{category}</p>
                    </div>
                </div>
                <span className="text-red-500 font-semibold text-sm">{stockLeft} left</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                />
            </div>

            <p className="text-xs text-gray-500">Minimum required: {minimumRequired}</p>
        </div>
    );
};

export default PharmacistStockCard;