import { ForgotPassForm } from "../../components/AuthComponents/ForgotPassForm";
import { ForgotPassHero } from "../../components/AuthComponents/ForgotPassHero";

function ForgotPass() {
    return (
        <div className="flex min-h-screen">
            {/* Left Side - Hero Section */}
            <ForgotPassHero />

            {/* Right Side - Forgot Password Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 p-8">
                <ForgotPassForm />
            </div>
        </div>
    );
}

export default ForgotPass;
