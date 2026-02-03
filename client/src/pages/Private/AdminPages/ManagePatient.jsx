import { useState } from 'react';
import AdminHeader from "../../../components/AdminComponents/AdminHeader";
import AdminSidebar from "../../../components/AdminComponents/AdminSideBar";

const ManagePatients = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    // Sample patient data
    const patients = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john@gmail.com',
            phone: '9800000000',
            bloodGroup: 'A+',
            status: 'Active',
        },
        {
            id: 2,
            name: 'John Smith',
            email: 'john@gmail.com',
            phone: '9800000000',
            bloodGroup: 'A+',
            status: 'Active',
        },
        {
            id: 3,
            name: 'John Smith',
            email: 'john@gmail.com',
            phone: '9800000000',
            bloodGroup: 'A+',
            status: 'Active',
        },
        {
            id: 4,
            name: 'John Smith',
            email: 'john@gmail.com',
            phone: '9800000000',
            bloodGroup: 'A+',
            status: 'Active',
        },
    ];

    const handleEdit = (id) => {
        console.log('Edit patient:', id);
        alert('Edit patient functionality');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            console.log('Delete patient:', id);
            alert('Patient deleted successfully!');
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
                        <h1 className="text-3xl font-bold text-gray-800">Manage Patients</h1>
                        <p className="text-gray-500">View and manage patient records</p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Patients..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    {/* Patients Table */}
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
                                        Phone
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Blood Group
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
                                {patients.map((patient, index) => (
                                    <tr
                                        key={patient.id}
                                        className={`${
                                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        } hover:bg-blue-50 transition-colors`}
                                    >
                                        <td className="px-6 py-4 text-gray-800 font-medium">
                                            {patient.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{patient.email}</td>
                                        <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                                        <td className="px-6 py-4 text-gray-600">{patient.bloodGroup}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => handleEdit(patient.id)}
                                                    className="text-blue-600 hover:text-blue-800 text-xl"
                                                    title="Edit"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(patient.id)}
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

export default ManagePatients;