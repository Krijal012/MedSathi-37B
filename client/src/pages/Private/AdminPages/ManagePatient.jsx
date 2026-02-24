import { useState, useEffect } from 'react';
import AdminHeader from "../../../components/AdminComponents/AdminHeader";
import AdminSidebar from "../../../components/AdminComponents/AdminSideBar";
import { getAllPatients, searchPatients, updatePatient, deletePatient } from '../../../services/patientService';
import toast from 'react-hot-toast';

const ManagePatients = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: '',
        age: '',
        gender: '',
        address: ''
    });

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const data = await getAllPatients();
            setPatients(data.data || []);
        } catch (error) {
            console.error("Error fetching patients:", error);
            toast.error("Failed to fetch patients");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                handleSearch();
            } else {
                fetchPatients();
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handleSearch = async () => {
        try {
            const data = await searchPatients(searchQuery);
            setPatients(data.data || []);
        } catch (error) {
            console.error("Error searching patients:", error);
        }
    };

    const handleEditClick = (patient) => {
        setSelectedPatient(patient);
        setEditFormData({
            name: patient.name || '',
            email: patient.email || '',
            phone: patient.phone || '',
            status: patient.status || 'Active',
            age: patient.age || '',
            gender: patient.gender || '',
            address: patient.address || ''
        });
        setEditModalOpen(true);
    };

    const handleDeleteClick = (patient) => {
        setSelectedPatient(patient);
        setDeleteModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updatePatient(selectedPatient.id, editFormData);
            if (response.success) {
                toast.success("Patient updated successfully");
                setEditModalOpen(false);
                fetchPatients();
            }
        } catch (error) {
            console.error("Error updating patient:", error);
            toast.error("Failed to update patient");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deletePatient(selectedPatient.id);
            if (response.success) {
                toast.success("Patient deleted successfully");
                setDeleteModalOpen(false);
                fetchPatients();
            }
        } catch (error) {
            console.error("Error deleting patient:", error);
            toast.error("Failed to delete patient");
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
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {/* Page Title */}
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Patients</h1>
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
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    {/* Patients Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500 italic">Loading patients...</td>
                                    </tr>
                                ) : patients.length > 0 ? (
                                    patients.map((patient, index) => (
                                        <tr
                                            key={patient.id}
                                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                } hover:bg-blue-50 transition-colors`}
                                        >
                                            <td className="px-6 py-4 text-gray-800 font-medium">{patient.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{patient.email}</td>
                                            <td className="px-6 py-4 text-gray-600">{patient.phone || 'N/A'}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm ${patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {patient.status || 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => handleEditClick(patient)}
                                                        className="text-blue-600 hover:text-blue-800 text-xl"
                                                        title="Edit"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(patient)}
                                                        className="text-red-600 hover:text-red-800 text-xl"
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500 italic">No patients found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Edit Patient</h2>
                            <button onClick={() => setEditModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editFormData.email}
                                        onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="text"
                                        value={editFormData.phone}
                                        onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                                    <input
                                        type="number"
                                        value={editFormData.age}
                                        onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                                    <select
                                        value={editFormData.status}
                                        onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                                <textarea
                                    value={editFormData.address}
                                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
                                    rows="2"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">⚠️</div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Patient?</h2>
                            <p className="text-gray-600 mb-6">Are you sure you want to delete <span className="font-bold text-gray-800">{selectedPatient?.name}</span>? This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePatients;
