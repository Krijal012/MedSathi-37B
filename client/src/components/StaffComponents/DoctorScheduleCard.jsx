const DoctorScheduleCard = ({ doctorName, specialty, schedule }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">🩺</div>
                <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{doctorName}</h4>
                    <p className="text-sm text-gray-500">{specialty}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
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