import React, { useState, useEffect } from 'react';
import { Input, Button, Checkbox } from '@nextui-org/react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Dummy credentials
    const DUMMY_EMAIL = 'testuser@example.com';
    const DUMMY_PASSWORD = 'Test123!';

    // Autofill credentials when component mounts
    useEffect(() => {
        setEmail(DUMMY_EMAIL);
        setPassword(DUMMY_PASSWORD);
        
        // Optional: Show a toast to inform user about autofill
        toast.success('Credentials autofilled for testing', {
            duration: 2000
        });
    }, []); // Empty dependency array means this runs once on mount

    const createToken = () => {
        // Generate a simple JWT-like token 
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
            email: email,
            exp: Date.now() + 3600000, // 1 hour expiration
            iat: Date.now()
        }));
        const signature = btoa(`${header}.${payload}`);
        const token = `${header}.${payload}.${signature}`;

        // Log token to console
        console.log('Token Created:', token);

        // Optionally store in localStorage
        localStorage.setItem('authToken', token);

        return token;
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            toast.error('Please enter both email and password');
            return;
        }

        // Check credentials
        if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
            // Create and log token
            const token = createToken();

            toast.success('Login Successful!', {
                icon: '👏',
                duration: 2000
            });
            
            // Redirect after a short delay to show toast
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } else {
            toast.error('Invalid email or password', {
                duration: 3000
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 sm:p-6">
            <Toaster 
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: '#4CAF50',
                            color: 'white',
                        },
                    },
                    error: {
                        style: {
                            background: '#F44336',
                            color: 'white',
                        },
                    },
                }}
            />
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400 text-xs sm:text-sm">
                            Sign in to continue to your account
                        </p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                        <Input
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            startContent={<Lock className="text-gray-500" size={16} sm:size={20} />}
                            endContent={
                                <button 
                                    type="button" 
                                    onClick={togglePasswordVisibility}
                                    className="focus:outline-none"
                                >
                                    {showPassword ? 
                                        <EyeOff className="text-gray-500" size={16} sm:size={20} /> : 
                                        <Eye className="text-gray-500" size={16} sm:size={20} />
                                    }
                                </button>
                            }
                            variant="bordered"
                            classNames={{
                                input: "text-white text-sm sm:text-base",
                                label: "text-gray-300 text-xs sm:text-sm",
                                inputWrapper: "border-white/20 bg-white/5 hover:bg-white/10 focus-within:!border-white/50 h-10 sm:h-12"
                            }}
                        />
                        
                        <div className="flex justify-between items-center">
                            <Checkbox 
                                classNames={{
                                    label: "text-gray-300 text-xs sm:text-sm",
                                    wrapper: "border-white/20 bg-white/5"
                                }}
                            >
                                Remember me
                            </Checkbox>
                            
                            <a 
                                href="#" 
                                className="text-xs sm:text-sm text-white/80 hover:text-white hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                        
                        <Button 
                            type="submit"
                            className="w-full bg-white text-black font-semibold py-2 sm:py-3 rounded-xl text-sm sm:text-base transform transition-all duration-300 hover:bg-gray-200 hover:shadow-xl"
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;