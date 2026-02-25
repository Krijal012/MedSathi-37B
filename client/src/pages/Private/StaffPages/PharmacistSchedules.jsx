import { useState, useEffect } from 'react';
import StaffSidebar from '../../../components/StaffComponents/StaffSideBar';
import StaffHeader from '../../../components/StaffComponents/StaffHeader';
import PharmacistScheduleCard from '../../../components/StaffComponents/PharmacistScheduleCard';

const PharmacistSchedules = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const [user, setUser] = useState(null);
    const [professionals, setProfessionals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/pharmacists');
                const pharmacistsData = await response.json();

                const filtered = (pharmacistsData.success ? pharmacistsData.data.filter(p => {
                    const schedule = p.schedule || {};
                    return Object.values(schedule).some(time => time && time !== 'Off' && time !== '');
                }).map(p => ({ ...p, type: 'Pharmacist', specialty: 'Pharmacy' })) : []);

                setProfessionals(filtered);
            } catch (error) {
                console.error("Error fetching schedules:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSchedules();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <StaffSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:ml-64">
                <StaffHeader staffName={user?.name || "Staff"} toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-6 sm:p-8 lg:p-10 bg-[#f8fafc]">
                    {/* Page Title */}
                    <div className="mb-10">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-2">Pharmacist Schedules</h1>
                        <p className="text-lg text-[#64748b] font-medium">Manage pharmacist working hours</p>
                    </div>

                    {/* Schedules List */}
                    <div className="space-y-6">
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : professionals.length > 0 ? (
                            professionals.map((pro) => (
                                <div key={`${pro.type}-${pro.id}`} className="relative">
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-700`}>
                                            {pro.type}
                                        </span>
                                    </div>
                                    <PharmacistScheduleCard
                                        pharmacistName={pro.name}
                                        specialty={pro.specialty}
                                        schedule={pro.schedule}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
                                <p className="text-slate-400 font-medium">No pharmacist schedules found.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PharmacistSchedules;
