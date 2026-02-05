import React from 'react';

const DoctorScheduleCard = ({ doctorName, specialty, schedule = {} }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 mb-6 group hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
            <div className="flex items-center space-x-5 mb-8">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    🩺
                </div>
                <div>
                    <h4 className="text-xl font-bold text-[#1e293b] leading-tight mb-1">{doctorName}</h4>
                    <p className="text-sm font-medium text-[#64748b] tracking-wide uppercase">{specialty}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                {days.map((day) => (
                    <div
                        key={day}
                        className={`flex-1 min-w-[120px] rounded-xl p-3 flex flex-col items-center justify-center border transition-all duration-200 ${schedule[day] === 'Off' || !schedule[day]
                                ? 'bg-gray-50 border-gray-100'
                                : 'bg-indigo-50/30 border-indigo-100 hover:border-indigo-300'
                            }`}
                    >
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{day}</span>
                        <span className={`text-sm font-bold ${schedule[day] === 'Off' || !schedule[day] ? 'text-gray-400' : 'text-indigo-600'
                            }`}>
                            {schedule[day] || 'Off'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorScheduleCard;