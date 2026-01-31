import { LoginHero } from '../../components/AuthComponents/LoginHero';
import { LoginForm } from '../../components/AuthComponents/LoginForm';

function Login() {
    return (
        <div className="flex min-h-screen">
            {/* Left Side - Hero Section */}
            <LoginHero />

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100 px-4 py-8 md:px-12 lg:p-8">
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
