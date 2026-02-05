import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import PharmacistSidebar from '../../../components/PharmacistComponents/PharmacistSidebar';
import PharmacistHeader from '../../../components/PharmacistComponents/PharmacistHeader';

const PharmacistSchedule = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [schedule, setSchedule] = useState({});
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [pharmacistId, setPharmacistId] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        if (storedUser && storedUser.email) {
            const fetchSchedule = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/pharmacists/email/${storedUser.email}`);
                    if (response.data.success) {
                        setSchedule(response.data.data.schedule || {});
                        setPharmacistId(response.data.data.id);
                    }
                } catch (error) {
                    console.error("Error fetching schedule:", error);
                    toast.error("Failed to load pharmacist profile");
                } finally {
                    setLoading(false);
                }
            };
            fetchSchedule();
        }
    }, []);

    const handleScheduleChange = (day, value) => {
        setSchedule(prev => ({
            ...prev,
            [day]: value
        }));
    };

    const handleSave = async () => {
        if (!pharmacistId) {
            toast.error("Pharmacist profile not loaded correctly");
            return;
        }
        setIsUpdating(true);
        try {
            const response = await axios.put(`http://localhost:5000/api/pharmacists/${pharmacistId}`, {
                schedule: schedule
            });
            if (response.data.success) {
                toast.success("Schedule updated successfully!");
                // Update local storage user object if needed, though usually schedule isn't there
            }
        } catch (error) {
            console.error("Error updating schedule:", error);
            toast.error("Failed to update schedule");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <PharmacistSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <PharmacistHeader pharmacistName={user?.name || "Pharmacist"} toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#f8fafc]">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold text-[#0f172a] mb-2 tracking-tight">Working Hours</h1>
                            <p className="text-lg text-[#64748b] font-medium">Set your weekly availability for patient consultations</p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                            <div className="p-6 sm:p-8 space-y-6">
                                {loading ? (
                                    <div className="flex justify-center py-20">
                                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {days.map((day) => (
                                                <div key={day} className="group p-5 bg-slate-50/50 rounded-2xl border border-transparent hover:border-blue-100 transition-all duration-300">
                                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 group-hover:text-blue-500 transition-colors">
                                                        {day}
                                                    </label>
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="text"
                                                            value={schedule[day] || ''}
                                                            placeholder="e.g. 9AM - 5PM or Off"
                                                            onChange={(e) => handleScheduleChange(day, e.target.value)}
                                                            className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-slate-700"
                                                        />
                                                        <button
                                                            onClick={() => handleScheduleChange(day, 'Off')}
                                                            className="px-3 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                            title="Mark as Off"
                                                        >
                                                            ✖
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-end pt-4 border-t border-slate-100">
                                            <button
                                                onClick={handleSave}
                                                disabled={isUpdating}
                                                className={`
                                                    px-10 py-4 bg-[#0f172a] text-white rounded-2xl font-bold 
                                                    shadow-[0_10px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_15px_25px_rgba(15,23,42,0.2)]
                                                    transition-all active:scale-95 disabled:opacity-50
                                                    flex items-center space-x-2
                                                `}
                                            >
                                                {isUpdating ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    <span>Save Changes</span>
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-4">
                            <span className="text-2xl mt-0.5">💡</span>
                            <div>
                                <h4 className="font-bold text-blue-900 mb-1">Timing Guidelines</h4>
                                <p className="text-blue-700 text-sm leading-relaxed">
                                    Use formats like <strong>9AM - 4PM</strong> or <strong>09:00 - 16:00</strong>. Patients will see these timings when booking an appointment with you. Use "Off" for days you aren't available.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PharmacistSchedule;
