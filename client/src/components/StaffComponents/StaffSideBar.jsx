import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const StaffSidebar = ({ isOpen, toggleSidebar }) => {
    const menuItems = [
        { name: 'Dashboard', path: '/staff-dashboard', icon: '🏠' },
        { name: 'Doctor Schedule', path: '/doctor-schedule', icon: '📅' },
        { name: 'Patient Records', path: '/patient-records', icon: '📁' },
        { name: 'Patient Queue', path: '/patient-queue', icon: '⏱️' },
    ];
    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            ></div>

            <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:fixed`}>
                {/* Logo */}
                <Link to="/staff-dashboard" className="p-6 flex items-center space-x-3 border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img src={logo} alt="MedSathi logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xl font-bold">MedSathi</span>
                </Link>

                {/* Menu Items */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-700 text-center text-gray-400 text-sm">
                    © 2026 MedSathi
                </div>
            </div>
        </>
    );
};

export default StaffSidebar;