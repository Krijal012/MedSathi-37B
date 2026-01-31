import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex flex-col relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float-delayed" />
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl animate-float-slow" />
            </div>

            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 relative z-10">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                                <img src={logo} alt="MedSathi Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-2xl font-bold text-gray-800">MedSathi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-6 py-2 text-gray-700 font-medium cursor-pointer hover:text-blue-600 transition-colors"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
                <div className="max-w-4xl text-center space-y-8">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                        Your Health,
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                            Simplified
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Manage health records, connect with doctors, and take control of your wellness journey.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <button
                            onClick={() => navigate('/register')}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl text-lg cursor-pointer hover:shadow-lg transition-all"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl text-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Simple Feature Cards with Hover Shadow */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
                        <div className="bg-white rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                            <div className="text-3xl mb-3">🏥</div>
                            <h3 className="font-semibold text-gray-800 mb-2">Health Records</h3>
                            <p className="text-sm text-gray-600">Store and access your medical history</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                            <div className="text-3xl mb-3">👨‍⚕️</div>
                            <h3 className="font-semibold text-gray-800 mb-2">Find Doctors</h3>
                            <p className="text-sm text-gray-600">Connect with trusted healthcare providers</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                            <div className="text-3xl mb-3">💊</div>
                            <h3 className="font-semibold text-gray-800 mb-2">Track Medications</h3>
                            <p className="text-sm text-gray-600">Manage prescriptions and reminders</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6 relative z-10">
                <div className="max-w-6xl mx-auto px-6 text-center text-gray-600 text-sm">
                    © 2024 MedSathi. All rights reserved.
                </div>
            </footer>

            {/* Animation Styles */}
            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -30px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }

                @keyframes float-delayed {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(-40px, 30px) scale(1.05);
                    }
                    66% {
                        transform: translate(25px, -25px) scale(0.95);
                    }
                }

                @keyframes float-slow {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    50% {
                        transform: translate(20px, -40px) scale(1.08);
                    }
                }

                .animate-float {
                    animation: float 20s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 25s ease-in-out infinite;
                }

                .animate-float-slow {
                    animation: float-slow 30s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

export default Landing;