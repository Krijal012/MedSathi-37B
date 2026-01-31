import Background from "../../assets/background.jpg";
import logo from "../../assets/logo.jpg";

export function RegisterHero() {
    return (
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-400 to-teal-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-50">
                <img src={Background} alt="Background" className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full text-white p-12">
                {/* Logo */}
                <div className="mb-8">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-4 border-white backdrop-blur-sm">
                        <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 leading-tight">
                    Join Our Healthcare <br /> Network
                </h1>

                {/* Description */}
                <div className="text-lg text-left max-w-md opacity-90 space-y-6">
                    <p>
                        Create an account to access personalized healthcare services and manage your medical journey.
                    </p>

                    <ul className="text-left inline-block space-y-2">
                        <li className="flex items-center">
                            <span className="bg-white rounded-full p-1 mr-3 opacity-80"></span>
                            Easy appointment booking
                        </li>
                        <li className="flex items-center">
                            <span className="bg-white rounded-full p-1 mr-3 opacity-80"></span>
                            Access to medical records
                        </li>
                        <li className="flex items-center">
                            <span className="bg-white rounded-full p-1 mr-3 opacity-80"></span>
                            Real-time updates
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}