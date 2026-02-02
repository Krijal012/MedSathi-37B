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
        <header className="
            bg-white border-b border-gray-200 
            px-4 
            sm:px-6 
            lg:px-8 
            py-3 
            sm:py-4
        ">
            <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="
                        text-xs 
                        sm:text-sm 
                        text-gray-500 
                        truncate
                    ">
                        Welcome back, <span className="font-semibold text-gray-700">
                            {patientName}
                        </span>
                    </h2>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="hidden sm:flex items-center space-x-2">
                        <div className="
                            w-8 h-8 
                            sm:w-10 sm:h-10 
                            bg-gray-200 
                            rounded-full 
                            flex items-center justify-center
                            flex-shrink-0
                        ">
                            <span className="text-lg sm:text-xl">👤</span>
                        </div>
                        <span className="
                            font-medium text-gray-700 
                            hidden 
                            md:inline
                        ">
                            {patientName}
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="
                            px-3 py-1.5 
                            sm:px-4 sm:py-2 
                            bg-red-500 text-white 
                            rounded-lg 
                            hover:bg-red-600 
                            transition-colors 
                            flex items-center 
                            space-x-1 
                            sm:space-x-2 
                            text-xs 
                            sm:text-sm
                            whitespace-nowrap
                        "
                    >
                        <span className="text-sm sm:text-base">🚪</span>
                        <span className="hidden sm:inline">Logout</span>
                        <span className="sm:hidden">Out</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;