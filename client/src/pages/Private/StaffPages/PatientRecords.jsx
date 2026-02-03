import React, { useState } from 'react';
import StaffSidebar from '../../../components/StaffComponents/StaffSideBar';
import StaffHeader from '../../../components/StaffComponents/StaffHeader';

const PatientRecords = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const patientRecords = [
        { id: 1, name: 'John Smith', lastVisit: '2024-07-10', status: 'Active' },
        { id: 2, name: 'Sarah Johnson', lastVisit: '2024-07-08', status: 'Active' },
        { id: 3, name: 'Mike Brown', lastVisit: '2024-06-25', status: 'Inactive' },
        { id: 4, name: 'Emily Davis', lastVisit: '2024-07-11', status: 'Active' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <StaffSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col lg:ml-64">
                <StaffHeader staffName="Admin User" toggleSidebar={toggleSidebar} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Patient Records</h1>
                        <p className="text-gray-500">Search, view, and manage patient medical records.</p>
                    </div>

                    {/* Search and filter controls */}
                    <div className="mb-6 flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search by patient name or ID..."
                            className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 self-start sm:self-auto">
                            Search
                        </button>
                    </div>

                    {/* Patient Records Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {patientRecords.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{patient.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.lastVisit}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{patient.status}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                            <button className="text-indigo-600 hover:text-indigo-900">View</button>
                                            <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
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

export default PatientRecords;