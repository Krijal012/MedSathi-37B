import Background from "../../assets/background.jpg";
import logo from "../../assets/logo.jpg";

export function ForgotPassHero() {
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
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-4 border-white">
                        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                    Password Recovery
                </h1>

                {/* Description */}
                <p className="text-lg text-left max-w-md opacity-90">
                    Don't worry, it happens to the best of us. We 'll help <br /> you get back into your account.
                </p>
            </div>
        </div>
    );
}