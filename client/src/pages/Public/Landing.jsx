import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex flex-col relative overflow-hidden">

            {/* Animated Background Shapes (responsive + optimized) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="hidden sm:block absolute top-20 left-10 w-40 h-40 sm:w-72 sm:h-72 bg-blue-400/30 rounded-full blur-3xl animate-float" />
                <div className="hidden md:block absolute bottom-20 right-10 w-48 h-48 sm:w-80 sm:h-80 bg-teal-400/25 rotate-45 blur-3xl animate-float-delayed" />
                <div className="hidden lg:block absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-float-slow" />
                <div className="hidden md:block absolute top-40 right-1/4 w-56 h-56 bg-purple-400/20 rounded-3xl rotate-12 blur-2xl animate-float-reverse" />
                <div className="hidden lg:block absolute bottom-40 left-1/4 w-56 h-56 bg-pink-400/25 rounded-full blur-3xl animate-float-slow-delayed" />
                <div className="hidden xl:block absolute top-1/3 right-20 w-48 h-48 bg-green-400/20 rotate-45 blur-2xl animate-float-fast" />
                <div className="hidden xl:block absolute bottom-1/3 left-1/3 w-52 h-52 bg-orange-400/20 rounded-full blur-3xl animate-float-medium" />
            </div>

            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <img src={logo} alt="MedSathi Logo" className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover" />
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                                MedSathi
                            </span>
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-3 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base text-gray-700 hover:text-blue-600 transition cursor-pointer"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="px-4 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12 sm:py-16 relative z-10">
                <div className="max-w-4xl text-center space-y-6 sm:space-y-8">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                        Your Health,
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                            Simplified
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Manage health records, connect with pharmacists, and take control of your wellness journey.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
                        <button
                            onClick={() => navigate('/register')}
                            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl text-base sm:text-lg font-semibold hover:shadow-lg transition cursor-pointer"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-xl text-base sm:text-lg font-semibold hover:border-blue-300 transition cursor-pointer"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
                        {[
                            { icon: '🏥', title: 'Health Records', desc: 'Store and access your medical history' },
                            { icon: '💊', title: 'Find Pharmacists', desc: 'Connect with trusted pharmacy professionals' },
                            { icon: '💊', title: 'Track Medications', desc: 'Manage prescriptions and reminders' }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition"
                            >
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6 relative z-10">
                <div className="max-w-7xl mx-auto px-6 text-center text-xs sm:text-sm text-gray-600">
                    © 2026 MedSathi. All rights reserved.
                </div>
            </footer>

            {/* Animations */}
            <style>{`
                @keyframes float {
                    0%,100%{transform:translate(0,0)}
                    50%{transform:translate(30px,-30px)}
                }
                @keyframes float-delayed {
                    0%,100%{transform:translate(0,0) rotate(45deg)}
                    50%{transform:translate(-30px,30px) rotate(65deg)}
                }
                @keyframes float-slow {
                    0%,100%{transform:translate(0,0)}
                    50%{transform:translate(20px,-40px)}
                }
                .animate-float{animation:float 20s ease-in-out infinite}
                .animate-float-delayed{animation:float-delayed 26s ease-in-out infinite}
                .animate-float-slow{animation:float-slow 30s ease-in-out infinite}
            `}</style>
        </div>
    );
}

export default Landing;
