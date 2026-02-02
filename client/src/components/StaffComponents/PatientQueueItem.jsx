const PatientQueueItem = ({ queueNumber, patientName, doctorName, waitTime, status, onStatusChange }) => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition-shadow mb-4 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
                <div className="bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4">
                    <p className="text-xl sm:text-2xl font-bold text-gray-600">{queueNumber}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 text-base sm:text-lg">{patientName}</h4>
                    <p className="text-sm text-gray-500">Dr {doctorName}</p>
                    <p className="text-xs text-gray-400 mt-1">Est. wait: {waitTime}</p>
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2 sm:space-x-3">
                <button
                    onClick={() => onStatusChange('in-progress')}
                    className="px-3 py-2 sm:px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                >
                    {status}
                </button>
                <button
                    onClick={() => onStatusChange('complete')}
                    className="px-3 py-2 sm:px-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm flex items-center space-x-1"
                >
                    <span>✓</span>
                    <span>Complete</span>
                </button>
            </div>
        </div>
    );
};

export default PatientQueueItem;