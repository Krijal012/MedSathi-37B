import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const PharmacistSidebar = () => {
    const menuItems = [
        { name: 'Dashboard', path: '/pharmacist-dashboard', icon: '🏠' },
        { name: 'Add Medicine', path: '/add-medicine', icon: '💊' },
        { name: 'Search Medicine', path: '/search-medicine', icon: '🔍' },
        { name: 'Billing', path: '/pharmacy-billing', icon: '📄' },
    ];

    return (
        <div className="w-64 bg-gray-800 min-h-screen text-white flex flex-col">
            {/* Logo */}
            <Link to="/pharmacist-dashboard" className="p-6 flex items-center space-x-3 border-b border-gray-700 hover:bg-gray-700 transition-colors">
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <img src={logo} alt="MedSathi Logo" className="w-full h-full object-cover" />
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
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 text-center text-gray-400 text-sm">
                © 2026 MedSathi
            </div>
        </div>
    );
};

export default PharmacistSidebar;