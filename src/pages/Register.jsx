import React, { useState } from 'react';
import { Input, Button, Checkbox } from '@nextui-org/react';
import { Mail, Lock, User, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAgreed: false
    });

    // New function to create token
    const createToken = () => {
        // Generate a simple token
        const token = {
            fullName: formData.fullName,
            email: formData.email,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour expiration
        };

        // Convert to JSON string for console logging
        const tokenString = JSON.stringify(token, null, 2);

        // Log token to console
        console.log('Registration Token Created:', tokenString);

        return token;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation checks
        if (!formData.fullName) {
            toast.error('Please enter your full name');
            return;
        }

        if (!formData.email) {
            toast.error('Please enter your email');
            return;
        }

        if (!formData.password) {
            toast.error('Please enter a password');
            return;
        }

        // if (formData.password !== formData.confirmPassword) {
        //     toast.error('Passwords do not match');
        //     return;
        // }

        if (!formData.termsAgreed) {
            toast.error('Please agree to the Terms and Conditions');
            return;
        }

        // Simulated registration logic
        try {
            // Create token for testing purposes
            const registrationToken = createToken();

            // Simulating successful registration
            toast.success('Registration Successful! Token created for testing.', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#4CAF50',
                    color: 'white',
                }
            });

            // Optional: Reset form after successful registration
            setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                termsAgreed: false
            });
        } catch (error) {
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 sm:p-6">
            <Toaster />
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">
                            Create Account
                        </h1>
                        <p className="text-gray-400 text-xs sm:text-sm">
                            Sign up to get started
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <Input
                            name="fullName"
                            type="text"
                            label="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            startContent={<User className="text-gray-500" size={16} sm:size={20} />}
                            variant="bordered"
                            classNames={{
                                input: "text-white text-sm sm:text-base",
                                label: "text-gray-300 text-xs sm:text-sm",
                                inputWrapper: "border-white/20 bg-white/5 hover:bg-white/10 focus-within:!border-white/50 h-10 sm:h-12"
                            }}
                        />

                        <Input
                            name="email"
                            type="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            startContent={<Mail className="text-gray-500" size={16} sm:size={20} />}
                            variant="bordered"
                            classNames={{
                                input: "text-white text-sm sm:text-base",
                                label: "text-gray-300 text-xs sm:text-sm",
                                inputWrapper: "border-white/20 bg-white/5 hover:bg-white/10 focus-within:!border-white/50 h-10 sm:h-12"
                            }}
                        />
                        
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create your password"
                            startContent={<Lock className="text-gray-500" size={16} sm:size={20} />}
                            endContent={
                                <button 
                                    className="focus:outline-none" 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <Eye className="text-gray-500" size={16} sm:size={20} />
                                </button>
                            }
                            variant="bordered"
                            classNames={{
                                input: "text-white text-sm sm:text-base",
                                label: "text-gray-300 text-xs sm:text-sm",
                                inputWrapper: "border-white/20 bg-white/5 hover:bg-white/10 focus-within:!border-white/50 h-10 sm:h-12"
                            }}
                        />

                        <Input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            label="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Repeat your password"
                            startContent={<Lock className="text-gray-500" size={16} sm:size={20} />}
                            endContent={
                                <button 
                                    className="focus:outline-none" 
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <Eye className="text-gray-500" size={16} sm:size={20} />
                                </button>
                            }
                            variant="bordered"
                            classNames={{
                                input: "text-white text-sm sm:text-base",
                                label: "text-gray-300 text-xs sm:text-sm",
                                inputWrapper: "border-white/20 bg-white/5 hover:bg-white/10 focus-within:!border-white/50 h-10 sm:h-12"
                            }}
                        />
                        
                        <div className="flex items-center">
                            <Checkbox 
                                name="termsAgreed"
                                checked={formData.termsAgreed}
                                onChange={handleInputChange}
                                classNames={{
                                    label: "text-gray-300 text-xs sm:text-sm",
                                    wrapper: "border-white/20 bg-white/5"
                                }}
                            >
                                I agree to the Terms and Conditions
                            </Checkbox>
                        </div>
                        
                        <Button 
                            type="submit"
                            className="w-full bg-white text-black font-semibold py-2 sm:py-3 rounded-xl text-sm sm:text-base transform transition-all duration-300 hover:bg-gray-200 hover:shadow-xl"
                        >
                            Sign Up
                        </Button>

                        <div className="text-center mt-4">
                            <p className="text-gray-400 text-xs sm:text-sm">
                                Already have an account? {' '}
                                <Link 
                                    to="/" 
                                    className="text-white/80 hover:text-white hover:underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;