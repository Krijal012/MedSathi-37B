import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', path: '/patient-dashboard', icon: '🏠' },
        { name: 'Book Appointment', path: '/book-appointment', icon: '📅' },
        { name: 'My Appointments', path: '/my-appointments', icon: '📋' },
        { name: 'Medical History', path: '/medical-history', icon: '📄' },
        { name: 'Doctor Availability', path: '/doctor-availability', icon: '👨‍⚕️' },
    ];

    const isActive = (path) => location.pathname === path;

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="
                    fixed 
                    top-4 left-4 
                    z-50 
                    md:hidden 
                    bg-gray-800 
                    text-white 
                    p-2 
                    rounded-lg
                    shadow-lg
                "
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? '✕' : '☰'}
            </button>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="
                        fixed 
                        inset-0 
                        bg-black bg-opacity-50 
                        z-40 
                        md:hidden
                    "
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
                fixed 
                md:relative
                top-0 left-0 
                w-64 
                h-screen
                bg-gray-800 
                text-white 
                flex flex-col 
                z-40
                transition-transform 
                duration-300 
                ease-in-out
            `}>
                {/* Logo */}
                <div className="
                    p-4 
                    md:p-6 
                    flex items-center 
                    space-x-3 
                    border-b 
                    border-gray-700
                ">
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
                </div>

                {/* Menu Items */}
                <nav className="
                    flex-1 p-3 
                    md:p-4 
                    space-y-1 
                    md:space-y-2
                    overflow-y-auto
                ">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => {
                                navigate(item.path);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`
                                w-full 
                                flex items-center 
                                space-x-3 
                                px-3 py-2.5 
                                md:px-4 md:py-3 
                                rounded-lg 
                                transition-colors 
                                cursor-pointer
                                text-sm 
                                md:text-base
                                ${isActive(item.path)
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }
                            `}
                        >
                            <span className="
                                text-xl 
                                md:text-2xl 
                                w-6 
                                md:w-auto
                            ">
                                {item.icon}
                            </span>
                            <span className="font-medium truncate">
                                {item.name}
                            </span>
                        </button>
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