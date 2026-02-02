const DoctorScheduleCard = ({ doctorName, specialty, schedule }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="text-2xl">🩺</div>
                <div>
                    <h4 className="font-semibold text-gray-800 text-base sm:text-lg">{doctorName}</h4>
                    <p className="text-sm text-gray-500">{specialty}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
                {days.map((day) => (
                    <div key={day} className="bg-gray-100 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 mb-1">{day}</p>
                        <p className="text-sm font-semibold text-gray-800">{schedule[day] || 'Off'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorScheduleCard;