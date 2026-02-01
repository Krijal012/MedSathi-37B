import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Header = ({ patientName = "Patient" }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm text-gray-500">
                        Welcome back, <span className="font-semibold text-gray-700">{patientName}</span>
                    </h2>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xl">👤</span>
                        </div>
                        <span className="font-medium text-gray-700">{patientName}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 cursor-pointer"
                    >
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;