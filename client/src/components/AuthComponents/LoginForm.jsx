import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from '../../schema/login.schema';

export function LoginForm() {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const result = LoginSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach(err => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        console.log('Login data:', formData);
        // Add your login API call here
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            {/* Header */}
            <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-gray-600 text-center mb-6">
                Login to access your healthcare portal
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <div className="relative">
                        {/* Email Icon */}
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        {errors.email && (
                            <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                        )}
                    </div>
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        {/* Lock Icon */}
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>

                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
                    )}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                    <a href="#" className="text-sm text-gray-600 hover:text-teal-600">
                        Forgot Password?
                    </a>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                    Login
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>

                {/* Signup Link */}
                <div className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        onClick={() => navigate('/register')}
                        className="text-teal-600 hover:underline font-medium cursor-pointer"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}
