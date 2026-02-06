import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Header = ({ patientName = "Patient" }) => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
    const [profileData, setProfileData] = React.useState({
        age: '',
        gender: 'Male',
        address: '',
        image: ''
    });
    const [imageFile, setImageFile] = React.useState(null);
    const [imagePreview, setImagePreview] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/patients/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setProfileData({
                    age: data.data.age || '',
                    gender: data.data.gender || 'Male',
                    address: data.data.address || '',
                    image: data.data.image || ''
                });
                if (data.data.image) {
                    setImagePreview(`http://localhost:5000${data.data.image}`);
                }
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('age', profileData.age);
            formData.append('gender', profileData.gender);
            formData.append('address', profileData.address);
            if (imageFile) {
                formData.append('profileImage', imageFile);
            }

            const response = await fetch('http://localhost:5000/api/patients/me', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Profile updated successfully');
                setIsProfileModalOpen(false);
            } else {
                toast.error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error('An error occurred');
        }
    };

    React.useEffect(() => {
        if (isProfileModalOpen) {
            fetchProfile();
        }
    }, [isProfileModalOpen]);

    return (
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-xs sm:text-sm text-gray-500 truncate">
                        Welcome back, <span className="font-semibold text-gray-700">{patientName}</span>
                    </h2>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                        onClick={() => setIsProfileModalOpen(true)}
                        className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {profileData.image ? (
                                <img src={`http://localhost:5000${profileData.image}`} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-lg sm:text-xl">👤</span>
                            )}
                        </div>
                        <div className="hidden md:block text-left mr-2">
                            <p className="text-sm font-medium text-gray-700">{patientName}</p>
                            <p className="text-xs text-blue-600">Edit Profile</p>
                        </div>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm whitespace-nowrap"
                    >
                        <span className="text-sm sm:text-base">🚪</span>
                        <span className="hidden sm:inline">Logout</span>
                        <span className="sm:hidden">Out</span>
                    </button>
                </div>
            </div>

            {/* Profile Settings Modal */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-800">Complete Your Profile</h2>
                            <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <span className="text-xl">✕</span>
                            </button>
                        </div>
                        <form onSubmit={handleUpdateProfile} className="p-6 space-y-5">
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">Age</label>
                                        <input
                                            type="number"
                                            required
                                            placeholder="Enter your age"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            value={profileData.age}
                                            onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">Gender</label>
                                        <select
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            value={profileData.gender}
                                            onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">Profile Picture</label>
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all border border-gray-300 rounded-lg"
                                            />
                                            {imagePreview && (
                                                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">Current Address</label>
                                        <textarea
                                            placeholder="Enter your permanent address"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all min-h-[100px]"
                                            value={profileData.address}
                                            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="pt-2 flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsProfileModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {loading ? 'Saving...' : 'Save Settings'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;