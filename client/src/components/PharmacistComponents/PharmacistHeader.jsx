import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const PharmacistHeader = ({ pharmacistName = "Pharmacist", toggleSidebar }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
    const [profileData, setProfileData] = React.useState({
        licenseNumber: '',
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
            const response = await fetch('http://localhost:5000/api/pharmacists/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setProfileData({
                    licenseNumber: data.data.licenseNumber || '',
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
            formData.append('licenseNumber', profileData.licenseNumber);
            if (imageFile) {
                formData.append('profileImage', imageFile);
            }

            const response = await fetch('http://localhost:5000/api/pharmacists/me', {
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
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {/* Hamburger Menu for mobile */}
                    <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none lg:hidden mr-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <h2 className="text-sm text-gray-500 hidden sm:block">
                        Welcome back, <span className="font-semibold text-gray-700">{pharmacistName}</span>
                    </h2>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                        onClick={() => setIsProfileModalOpen(true)}
                        className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            {profileData.image ? (
                                <img src={`http://localhost:5000${profileData.image}`} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-xl">🧑‍⚕️</span>
                            )}
                        </div>
                        <span className="font-medium text-gray-700 hidden md:block">{pharmacistName}</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-2 sm:px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 cursor-pointer text-sm"
                    >
                        <span>🚪</span>
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-800">Edit Pharmacist Profile</h2>
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
                                        <label className="block text-sm font-semibold text-gray-700">License Number</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your license number"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            value={profileData.licenseNumber}
                                            onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                                        />
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
                                    className="flex-1 px-4 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default PharmacistHeader;
