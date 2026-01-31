import { RegisterForm } from "../../components/AuthComponents/RegisterForm";
import { RegisterHero } from "../../components/AuthComponents/RegisterHero";

function Register() {
    return (
        <div className="flex min-h-screen">
            {/* Left Side - Hero Section */}
            <RegisterHero />

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-8">
                <RegisterForm />
            </div>
        </div>
    );
}

export default Register;
