import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/patient-dashboard', icon: '🏠' },
        { name: 'Book Appointment', path: '/book-appointment', icon: '📅' },
        { name: 'My Appointments', path: '/my-appointments', icon: '📋' },
        { name: 'Medical History', path: '/medical-history', icon: '📄' },
        { name: 'Doctor Availability', path: '/doctor-availability', icon: '👨' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-64 bg-gray-800 min-h-screen text-white flex flex-col">
            {/* Logo */}
            <div className="p-6 flex items-center space-x-3 border-b border-gray-700">
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <img src={logo} alt="MedSathi logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-bold">MedSathi</span>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${isActive(item.path)
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 text-center text-gray-400 text-sm">
                © 2026 MedSathi
            </div>
        </div>
    )
}