'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import type { LoginFormData, RegisterFormData } from '@/types/auth';

// Login Form Component
interface LoginFormProps {
    onSwitchTab: (tab: 'login' | 'register') => void;
}

const LoginForm = ({ onSwitchTab }: LoginFormProps) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // TODO: Implement login logic with Shopify API
            // const response = await loginCustomer({ email, password });
            // login(response.customerAccessToken);
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="text-red-600 text-xs">{error}</div>
                )}
                <div>
                    <label htmlFor="email" className="block text-xs mb-2">E-mail*</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-3 py-2 border border-gray-300 text-xs"
                        required
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-xs mb-2">Password*</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border border-gray-300 text-xs"
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="text-xs">
                    <Link href="/auth/forgot-password" className="text-gray-600 hover:underline">
                        Forgot your password?
                    </Link>
                </div>
                <button
                    type="submit"
                    className="btn-represent w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                </button>
            </form>

            <div className="mt-8 bg-gray-50 p-6 text-center">
                <h2 className="text-sm font-medium mb-4">WELCOME TO THE NEW REST OF WORLD STORE</h2>
                <p className="text-xs mb-4">
                    If you are an existing customer, please{' '}
                    <Link href="/auth/register" className="underline">
                        register & activate
                    </Link>{' '}
                    your account with the same email address that you used previously. This will ensure you can
                    view your loyalty points, gift cards and address settings in the new account.
                </p>
                <p className="text-xs">
                    If you have any questions please don't hesitate to reach out to us at{' '}
                    <a href="mailto:customersupport@representctclo.com" className="underline">
                        customersupport@representctclo.com
                    </a>
                </p>
                <button
                    onClick={() => onSwitchTab('register')}
                    className="btn-represent w-full mt-4"
                >
                    REGISTER & ACTIVATE
                </button>
            </div>
        </div>
    );
};

// Register Form Component
const RegisterForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthday: '',
        gender: '',
        newsletter: false
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // TODO: Implement registration logic with Shopify API
            // const response = await registerCustomer(formData);
            // login(response.customerAccessToken);
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="text-red-600 text-xs">{error}</div>
                )}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-xs mb-2">First name*</label>
                        <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Enter your first name"
                            className="w-full px-3 py-2 border border-gray-300 text-xs"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-xs mb-2">Last name*</label>
                        <input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Enter your last name"
                            className="w-full px-3 py-2 border border-gray-300 text-xs"
                            required
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="register-email" className="block text-xs mb-2">E-mail*</label>
                    <input
                        type="email"
                        id="register-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email address"
                        className="w-full px-3 py-2 border border-gray-300 text-xs"
                        required
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="register-password" className="block text-xs mb-2">Password*</label>
                    <input
                        type="password"
                        id="register-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border border-gray-300 text-xs"
                        required
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="birthday" className="block text-xs mb-2">Birthday</label>
                    <input
                        type="date"
                        id="birthday"
                        value={formData.birthday}
                        onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 text-xs"
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="gender" className="block text-xs mb-2">Gender</label>
                    <select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 text-xs"
                        disabled={isLoading}
                    >
                        <option value="">Your Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="flex items-start">
                    <input
                        type="checkbox"
                        id="newsletter"
                        checked={formData.newsletter}
                        onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                        className="mt-1"
                        disabled={isLoading}
                    />
                    <label htmlFor="newsletter" className="ml-2 text-xs text-gray-600">
                        Subscribe to receive email updates about Represent product launches,
                        promotions and exclusive discounts.
                    </label>
                </div>
                <div className="text-xs text-gray-600">
                    By submitting this form, you accept the{' '}
                    <Link href="/terms" className="underline">
                        Terms & Conditions
                    </Link>
                </div>
                <button
                    type="submit"
                    className="btn-represent w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'REGISTERING...' : 'REGISTER'}
                </button>
            </form>
        </div>
    );
};

// Main Auth Page Component
export default function AuthPage() {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

    // Force header to use solid style
    useEffect(() => {
        // Add a class to the body to indicate we're on the auth page
        document.body.classList.add('auth-page');

        return () => {
            // Clean up when component unmounts
            document.body.classList.remove('auth-page');
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="container-represent py-12">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <Link href="/">
                            <Image
                                src="/images/logo.png"
                                alt="MY PRESTIGE"
                                width={120}
                                height={40}
                                className="mx-auto"
                            />
                        </Link>
                        <h1 className="text-xl mt-4 text-black">MY MESSAGE</h1>
                    </div>

                    <div className="flex justify-center space-x-8 mb-8">
                        <button
                            onClick={() => setActiveTab('login')}
                            className={`text-sm ${activeTab === 'login'
                                ? 'border-b-2 border-black text-black'
                                : 'text-gray-500'
                                }`}
                        >
                            LOG IN
                        </button>
                        <button
                            onClick={() => setActiveTab('register')}
                            className={`text-sm ${activeTab === 'register'
                                ? 'border-b-2 border-black text-black'
                                : 'text-gray-500'
                                }`}
                        >
                            REGISTER
                        </button>
                    </div>

                    {activeTab === 'login' ? <LoginForm onSwitchTab={setActiveTab} /> : <RegisterForm />}
                </div>
            </div>
        </div>
    );
} 