import { useState, useEffect } from 'react';
import AdminHeader from "../../../components/AdminComponents/AdminHeader";
import AdminSidebar from "../../../components/AdminComponents/AdminSideBar";
import { getAllStaff, updateStaff, deleteStaff } from '../../../services/staffService';
import toast from 'react-hot-toast';

const ManageStaffs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        role: '',
        department: '',
        status: '',
        designation: ''
    });

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const fetchStaffs = async () => {
        setLoading(true);
        try {
            const data = await getAllStaff();
            setStaffs(data.data || []);
        } catch (error) {
            console.error("Error fetching staff:", error);
            toast.error("Failed to fetch staff list");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaffs();
    }, []);

    const handleEditClick = (staff) => {
        setSelectedStaff(staff);
        setEditFormData({
            name: staff.name || '',
            email: staff.email || '',
            role: staff.role || '',
            department: staff.department || '',
            status: staff.status || 'Active',
            designation: staff.designation || ''
        });
        setEditModalOpen(true);
    };

    const handleDeleteClick = (staff) => {
        setSelectedStaff(staff);
        setDeleteModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateStaff(selectedStaff.id, editFormData);
            if (response.success) {
                toast.success("Staff member updated successfully");
                setEditModalOpen(false);
                fetchStaffs();
            }
        } catch (error) {
            console.error("Error updating staff:", error);
            toast.error("Failed to update staff member");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteStaff(selectedStaff.id);
            if (response.success) {
                toast.success("Staff member deleted successfully");
                setDeleteModalOpen(false);
                fetchStaffs();
            }
        } catch (error) {
            console.error("Error deleting staff:", error);
            toast.error("Failed to delete staff member");
        }
    };

    const filteredStaffs = staffs.filter(staff =>
        (staff.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (staff.email?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (staff.department?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

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
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Staff</h1>
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
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    {/* Staff Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500 italic">Loading staff list...</td>
                                    </tr>
                                ) : filteredStaffs.length > 0 ? (
                                    filteredStaffs.map((staff, index) => (
                                        <tr
                                            key={staff.id}
                                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                } hover:bg-blue-50 transition-colors`}
                                        >
                                            <td className="px-6 py-4 text-gray-800 font-medium">{staff.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{staff.email}</td>
                                            <td className="px-6 py-4 text-gray-600">{staff.role || staff.designation || 'N/A'}</td>
                                            <td className="px-6 py-4 text-gray-600">{staff.department}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm ${staff.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {staff.status || 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => handleEditClick(staff)}
                                                        className="text-blue-600 hover:text-blue-800 text-xl"
                                                        title="Edit"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(staff)}
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
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500 italic">No staff members found.</td>
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
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Edit Staff Member</h2>
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
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role/Designation</label>
                                    <input
                                        type="text"
                                        value={editFormData.role || editFormData.designation}
                                        onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value, designation: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                                    <input
                                        type="text"
                                        value={editFormData.department}
                                        onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none"
                                        required
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
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Staff Member?</h2>
                            <p className="text-gray-600 mb-6">Are you sure you want to delete <span className="font-bold text-gray-800">{selectedStaff?.name}</span>? This action cannot be undone.</p>
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

export default ManageStaffs;
