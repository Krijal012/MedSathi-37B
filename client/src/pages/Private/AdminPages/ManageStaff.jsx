import { useState } from 'react';
import AdminHeader from "../../../components/AdminComponents/AdminHeader";
import AdminSidebar from "../../../components/AdminComponents/AdminSideBar";

const ManageStaffs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    // Sample staff data
    const staffs = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john@gmail.com',
            role: 'Doctor',
            department: 'Cardiology',
            status: 'Active',
        },
        {
            id: 2,
            name: 'John Smith',
            email: 'john@gmail.com',
            role: 'Doctor',
            department: 'Cardiology',
            status: 'Active',
        },
        {
            id: 3,
            name: 'John Smith',
            email: 'john@gmail.com',
            role: 'Doctor',
            department: 'Cardiology',
            status: 'Active',
        },
        {
            id: 4,
            name: 'John Smith',
            email: 'john@gmail.com',
            role: 'Doctor',
            department: 'Cardiology',
            status: 'Active',
        },
    ];

    const handleEdit = (id) => {
        console.log('Edit staff:', id);
        alert('Edit staff functionality');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this staff member?')) {
            console.log('Delete staff:', id);
            alert('Staff deleted successfully!');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Header */}
                <AdminHeader adminName="Admin User" toggleSidebar={toggleSidebar} />

                {/* Page Content */}
                <main className="flex-1 p-8">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Manage Staff</h1>
                        <p className="text-gray-500">View and manage staff members</p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Staff..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    {/* Staff Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Department
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffs.map((staff, index) => (
                                    <tr
                                        key={staff.id}
                                        className={`${
                                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        } hover:bg-blue-50 transition-colors`}
                                    >
                                        <td className="px-6 py-4 text-gray-800 font-medium">
                                            {staff.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{staff.email}</td>
                                        <td className="px-6 py-4 text-gray-600">{staff.role}</td>
                                        <td className="px-6 py-4 text-gray-600">{staff.department}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                                {staff.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => handleEdit(staff.id)}
                                                    className="text-blue-600 hover:text-blue-800 text-xl"
                                                    title="Edit"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(staff.id)}
                                                    className="text-red-600 hover:text-red-800 text-xl"
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ManageStaffs;