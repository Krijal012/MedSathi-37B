import { ResetPassForm } from "../../components/AuthComponents/ResetPassForm";
import { ForgotPassHero } from "../../components/AuthComponents/ForgotPassHero";

function ResetPass() {
    return (
        <div className="flex min-h-screen">
            {/* Left Side - Hero Section (Reused) */}
            <ForgotPassHero />

            {/* Right Side - Reset Password Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 px-4 py-8 md:px-12 lg:p-8">
                <ResetPassForm />
            </div>
        </div>
    );
}

export default ResetPass;
