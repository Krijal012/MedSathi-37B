import { useState, useEffect } from "react";
import ActivityItem from "../../../components/AdminComponents/ActivityItem";
import AdminHeader from "../../../components/AdminComponents/AdminHeader";
import AdminSidebar from "../../../components/AdminComponents/AdminSideBar";
import AdminStatCard from "../../../components/AdminComponents/AdminStat";
import { getAdminStats, getRecentActivities } from "../../../services/adminService";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [stats, setStats] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, activitiesRes] = await Promise.all([
                    getAdminStats(),
                    getRecentActivities()
                ]);

                if (statsRes.success) {
                    const mappedStats = [
                        { title: 'Total Patients', value: statsRes.data.totalPatients, icon: '👥', iconColor: 'text-blue-500' },
                        { title: 'Total Staffs', value: statsRes.data.totalStaff, icon: '👨‍⚕️', iconColor: 'text-purple-500' },
                        { title: 'Appointments Today', value: statsRes.data.appointmentsToday, icon: '📅', iconColor: 'text-teal-500' },
                        { title: 'Monthly Revenue', value: statsRes.data.monthlyRevenue, icon: '💵', iconColor: 'text-green-500' },
                    ];
                    setStats(mappedStats);
                }

                if (activitiesRes.success) {
                    setRecentActivities(activitiesRes.data);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                toast.error("Failed to fetch dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Header */}
                <AdminHeader adminName="Admin User" toggleSidebar={toggleSidebar} />

                {/* Dashboard Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage your hospital operations</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse h-32"></div>
                            ))
                        ) : (
                            stats.map((stat, index) => (
                                <AdminStatCard
                                    key={index}
                                    title={stat.title}
                                    value={stat.value}
                                    icon={stat.icon}
                                    iconColor={stat.iconColor}
                                />
                            ))
                        )}
                    </div>

                    {/* Recent Activity Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Recent Activity</h2>
                        <div className="space-y-3">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="h-16 bg-gray-50 rounded-lg animate-pulse"></div>
                                ))
                            ) : recentActivities.length > 0 ? (
                                recentActivities.map((activity) => (
                                    <ActivityItem
                                        key={activity.id}
                                        title={activity.title}
                                        description={activity.description}
                                        time={activity.time}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent activities found.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;