import { RegisterForm } from "../../components/AuthComponents/RegisterForm";
import { RegisterHero } from "../../components/AuthComponents/RegisterHero";

function Register() {
    return (
        <div className="flex min-h-screen">
            {/* Left Side - Hero Section */}
            <RegisterHero />

            {/* Right Side - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 px-4 py-8 md:px-12 lg:p-8">
                <RegisterForm />
            </div>
        </div>
    );
}

export default Register;
