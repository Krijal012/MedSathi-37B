import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPassSchema } from '../../schema/forgotPass.schema';

export function ForgotPassForm() {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        email: ''
    });

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

        const result = ForgotPassSchema.safeParse(formData);

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
            <h2 className="text-3xl font-bold text-left mb-2">Forgot Password</h2>
            <p className="text-gray-600 text-left mb-6">
                Enter your email address and we'll send you a reset link
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

                {/* Reset Password Button */}
                <button
                    type="submit"
                    className="w-full bg-teal-500 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-teal-600 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                    Send Reset Link
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>

                {/* Back to Login Link */}
                <div className="text-center text-sm text-gray-600">
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-gray-500 hover:text-gray-700 font-medium cursor-pointer flex items-center justify-center gap-2 w-full"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Login
                    </button>
                </div>
            </form>
        </div>
    );
}
