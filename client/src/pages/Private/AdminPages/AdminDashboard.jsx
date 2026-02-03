import { useState } from "react";
import ActivityItem from "../../../components/AdminComponents/ActivityItem";
import AdminHeader from "../../../components/AdminComponents/AdminHeader";
import AdminSidebar from "../../../components/AdminComponents/AdminSideBar";
import AdminStatCard from "../../../components/AdminComponents/AdminStat";

const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    // Stats data
    const stats = [
        { title: 'Total Patients', value: '1280', icon: '👥', iconColor: 'text-blue-500' },
        { title: 'Total Staffs', value: '100', icon: '👨‍⚕️', iconColor: 'text-purple-500' },
        { title: 'Appointments Today', value: '50', icon: '📅', iconColor: 'text-teal-500' },
        { title: 'Monthly Revenue', value: 'Rs 100000', icon: '💵', iconColor: 'text-green-500' },
    ];

    // Recent activity data
    const recentActivities = [
        {
            id: 1,
            title: 'New Patient Registered',
            description: 'John Smith',
            time: '5 mins ago',
        },
        {
            id: 2,
            title: 'New Patient Registered',
            description: 'John Smith',
            time: '5 mins ago',
        },
        {
            id: 3,
            title: 'New Patient Registered',
            description: 'John Smith',
            time: '5 mins ago',
        },
        {
            id: 4,
            title: 'New Patient Registered',
            description: 'John Smith',
            time: '5 mins ago',
        },
        {
            id: 5,
            title: 'New Patient Registered',
            description: 'John Smith',
            time: '5 mins ago',
        },
        {
            id: 6,
            title: 'New Patient Registered',
            description: 'John Smith',
            time: '5 mins ago',
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Header */}
                <AdminHeader adminName="Admin User" toggleSidebar={toggleSidebar} />

                {/* Dashboard Content */}
                <main className="flex-1 p-8">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage your hospital operations</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <AdminStatCard
                                key={index}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                                iconColor={stat.iconColor}
                            />
                        ))}
                    </div>

                    {/* Recent Activity Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
                        <div className="space-y-3">
                            {recentActivities.map((activity) => (
                                <ActivityItem
                                    key={activity.id}
                                    title={activity.title}
                                    description={activity.description}
                                    time={activity.time}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;