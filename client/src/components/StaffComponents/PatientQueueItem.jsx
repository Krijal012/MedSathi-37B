import React from 'react';

const PatientQueueItem = ({ queueNumber, patientName, doctorName, waitTime, status, onStatusChange }) => {
    return (
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 mb-6 group">
            <div className="flex items-center space-x-6">
                {/* Queue Number */}
                <div className="bg-slate-100 rounded-lg w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-slate-200">
                    <p className="text-xl sm:text-2xl font-bold text-slate-500 font-mono tracking-tighter">{queueNumber}</p>
                </div>

                {/* Patient Info */}
                <div>
                    <h4 className="font-bold text-slate-800 text-lg sm:text-xl mb-1 group-hover:text-blue-600 transition-colors">{patientName}</h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <p className="text-sm font-medium text-slate-400">Dr {doctorName}</p>
                        <p className="text-xs font-semibold text-slate-300">Est. wait: {waitTime}</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 mt-4 sm:mt-0">
                <button
                    onClick={() => onStatusChange('in_progress')}
                    className="px-5 py-2 sm:px-6 bg-slate-500 text-white rounded-full hover:bg-slate-600 transition-all font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95"
                >
                    In Progress
                </button>
                <button
                    onClick={() => onStatusChange('completed')}
                    className="px-5 py-2 sm:px-6 bg-[#64748b] text-white rounded-full hover:bg-[#475569] transition-all font-semibold text-xs sm:text-sm flex items-center space-x-2 shadow-md hover:shadow-lg active:scale-95 border-2 border-[#475569]"
                >
                    <span className="bg-white text-[#64748b] rounded-full w-5 h-5 flex items-center justify-center shadow-inner">✓</span>
                    <span>Complete</span>
                </button>
            </div>
        </div>
    );
};

export default PatientQueueItem;