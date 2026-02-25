import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";

export const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/patient-dashboard', icon: '🏠' },
        { name: 'Book Appointment', path: '/book-appointment', icon: '📅' },
        { name: 'My Appointments', path: '/my-appointments', icon: '📋' },
        { name: 'Medical History', path: '/medical-history', icon: '📄' },
        { name: 'Pharmacist Availability', path: '/pharmacist-availability', icon: '👨‍🔬' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            ></div>

            {/* Sidebar */}
            <div className={`
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
                fixed 
                top-0 left-0 
                w-64 
                h-full
                bg-gray-800 
                text-white 
                flex flex-col 
                z-40
                transition-transform 
                duration-300 
                ease-in-out
            `}>
                {/* Logo */}
                <Link to="/patient-dashboard" className="p-6 flex items-center space-x-3 border-b border-gray-700 hover:bg-gray-700 transition-colors">
                    <div className="
                        w-8 h-8 
                        md:w-10 md:h-10 
                        rounded-lg 
                        overflow-hidden 
                        flex-shrink-0
                    ">
                        <img
                            src={logo}
                            alt="MedSathi logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="
                        text-lg 
                        md:text-xl 
                        font-bold 
                        truncate
                    ">
                        MedSathi
                    </span>
                </Link>

                {/* Menu Items */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={toggleSidebar} // Close sidebar on mobile nav click
                            className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }
                            `}
                        >
                            <span className="text-2xl w-6 text-center">
                                {item.icon}
                            </span>
                            <span className="font-medium truncate">
                                {item.name}
                            </span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="
                    p-3 
                    md:p-4 
                    border-t 
                    border-gray-700 
                    text-center 
                    text-gray-400 
                    text-xs 
                    md:text-sm
                ">
                    © 2026 MedSathi
                </div>
            </div>
        </>
    );
}