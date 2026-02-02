import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const StaffHeader = ({ staffName = "Staff", toggleSidebar }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

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
                        Welcome back, <span className="font-semibold text-gray-700">{staffName}</span>
                    </h2>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xl">👤</span>
                        </div>
                        <span className="font-medium text-gray-700 hidden md:block">{staffName}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-2 sm:px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 cursor-pointer text-sm"
                    >
                        <span>🚪</span>
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default StaffHeader;