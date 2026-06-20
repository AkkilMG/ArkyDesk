"use client";
import Shimmer from '@/components/ui/Shimmer';
import { owner } from "@/lib/constants";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Signin() {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [guestError, setGuestError] = useState("");
    const [guestMessage, setGuestMessage] = useState("");
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [guestLoading, setGuestLoading] = useState(false);
    const [formData, setFormData] = useState({
        "email": "",
        "password": ""
    });
    const [guestForm, setGuestForm] = useState({
        name: "",
        email: ""
    });
    const [video, setVideo] = useState(0);
    const [activeTab, setActiveTab] = useState<"signin" | "guest">("signin");
    const [checkingSession, setCheckingSession] = useState(true);
    const router = useRouter();
    
    async function handleAdmin() {
        try {
            const res = await fetch('/api/auth/verify', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.success) {
                if (!data.admin) {
                    router.push("/tickets");
                } else {
                    router.push("/dashboard");
                }
                return;
            } else {
                console.error('Verify failed:', data.message);
            }
        } catch (error) {
            console.error('Error verify out:', error);
        }
        setCheckingSession(false);
    }

    useEffect(() => {
        const handleRefresh = () => {
            setVideo(Math.floor(Math.random() * owner.length));
        };
        if (typeof document !== 'undefined' && document.cookie) {
            handleAdmin();
        } else {
            setCheckingSession(false);
        }
        // Show upgrade success message if redirected from signup
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (params.get('upgraded') === '1') {
                setSuccessMessage('Your guest account has been upgraded successfully! Sign in with your new password.');
            }
        }
        window.addEventListener('load', handleRefresh);
        return () => {
            window.removeEventListener('load', handleRefresh);
        };
    }, []);

    if (checkingSession) {
        return (
            <main className="flex flex-col">
                <header className="fixed top-0 z-50 hidden w-full text-gray-100 transition-all duration-300 ease-in-out lg:block lg:w-1/3 body-font">
                    <div className="container flex flex-row flex-wrap items-center p-5 mx-auto">
                        <a className="flex-grow font-semibold text-2x1" href="/"><img src='/logo/letter.png' className='w-40 no-drag' alt='Arkynox' /></a>
                    </div>
                </header>
                <div className="flex flex-row flex-grow">
                    <div className="hidden lg:block lg:w-1/3">
                        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
                            <Shimmer className="w-full h-full" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-grow p-6 lg:w-2/3 min-h-screen lg:min-h-0 pb-10">
                        <div className="w-full max-w-md space-y-6">
                            <Shimmer className="h-8 w-48 rounded" variant="card" />
                            <div className="flex gap-3">
                                <Shimmer className="h-12 flex-1 rounded-xl" variant="card" />
                                <Shimmer className="h-12 flex-1 rounded-xl" variant="card" />
                            </div>
                            <div className="space-y-4">
                                <Shimmer className="h-4 w-16 rounded" variant="list" />
                                <Shimmer className="h-14 w-full rounded-lg" variant="card" />
                                <Shimmer className="h-4 w-16 rounded" variant="list" />
                                <Shimmer className="h-14 w-full rounded-lg" variant="card" />
                                <Shimmer className="h-14 w-full rounded-3xl" variant="card" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleGuestChange = (event: any) => {
        setGuestForm({
            ...guestForm,
            [event.target.id]: event.target.value
        });
    };

    const handleGuestContinue = async () => {
        setGuestError("");
        setGuestMessage("");

        if (!guestForm.name.trim() || !guestForm.email.trim()) {
            setGuestError("Name and email are required for guest access.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(guestForm.email)) {
            setGuestError("Please enter a valid email address.");
            return;
        }

        setGuestLoading(true);

        try {
            const response = await fetch('/api/guest/login-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: guestForm.name,
                    email: guestForm.email,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setGuestError(data.message || 'Unable to start guest session.');
                return;
            }

            setGuestMessage('Guest session created. Redirecting you now.');
            if (data.loginUrl) {
                window.location.href = data.loginUrl;
                return;
            }

            if (data.sent) {
                setGuestMessage('Check your email for the guest login link.');
            } else {
                setGuestMessage('Guest login link created. Open the email link or ask support to resend it.');
            }
        } catch (error) {
            console.error('Guest login error:', error);
            setGuestError('An error occurred while creating the guest session.');
        } finally {
            setGuestLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!forgotEmail.trim()) {
            setError("Please enter your email address");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(forgotEmail)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: forgotEmail }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccessMessage("Password reset instructions have been sent to your email address. Please check your inbox and spam folder.");
                setShowForgotModal(false);
                setForgotEmail("");
            } else {
                setError(data.message || "Failed to send password reset email. Please try again.");
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            setError("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const submit = async () => {
        setError("");
        setSuccessMessage("");
        
        for (const [key, value] of Object.entries(formData)) {
            if (value === "") {
                setError(`${key} is required`);
                return;
            }
        }
        
        setIsLoading(true);
        
        try {
            const response = await fetch(`/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const responseData: any = await response.json();
            if (response.ok && responseData.success) {
                handleAdmin();
            } else {
                setError(responseData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError("An error occurred during sign in. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <main className="flex flex-col">
                <header className="fixed top-0 z-50 hidden w-full text-gray-100 transition-all duration-300 ease-in-out lg:block lg:w-1/3 body-font">
                    <div className="container flex flex-row flex-wrap items-center p-5 mx-auto">
                        <a className="flex-grow font-semibold text-2x1" href="/"><img src='/logo/letter.png' className='w-40 no-drag' alt='Arkynox' /></a>
                    </div>
                </header>
                <div className="flex flex-row flex-grow">
                    <div className="hidden lg:block lg:w-1/3">
                        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
                            <video className="object-cover w-full h-full border-none no-drag" autoPlay muted loop>
                                <source src={`/assets/video/${video}.mp4`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <a href={`https://dribbble.com/${owner[video]}`} className="font-bold text-center text-white" style={{ position: 'absolute', bottom: 0, width: '100%', marginBottom: '20px' }}>@{owner[video]}</a>
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-grow p-6 lg:w-2/3 min-h-screen lg:min-h-0 pb-10">
                        <div className="w-full max-w-md">
                            <h2 className="flex flex-row mb-6 text-2xl font-bold">Sign in to <span className="ml-3"> </span><img src='/logo/letter-dark.png' className='h-7 no-drag' alt='Arkynox' /></h2>

                            <div className="flex gap-3 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("signin")}
                                    className={`flex-1 h-12 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center ${activeTab === "signin" ? "bg-[#0D0C22] text-white shadow-lg" : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"}`}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("guest")}
                                    className={`flex-1 h-12 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center ${activeTab === "guest" ? "bg-[#0D0C22] text-white shadow-lg" : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"}`}
                                >
                                    Guest Access
                                </button>
                            </div>

                            {activeTab === "signin" ? (
                                    <form action={submit} aria-label="Sign in form">
                                        <div className="mb-4">
                                            <label className="block mb-2 font-bold text-gray-700 text-sl" htmlFor="email"> Email </label>
                                        <input value={formData.email} onChange={handleChange} id="email" type="email" 
                                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" />
                                    </div>
                                    <div className="mb-6">
                                        <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                                            Password
                                            <button 
                                                type="button"
                                                onClick={(e) => setShowForgotModal(true)}
                                                className="font-sans text-sm font-normal text-blue-600 hover:text-blue-800 underline cursor-pointer transition-colors"
                                                aria-label="Forgot password"
                                            >
                                                Forgot Password?
                                            </button>
                                        </span>
                                        <input value={formData.password} onChange={handleChange} id="password" type="password" 
                                        className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:border-indifo-500 h-14 focus:outline-none focus:ring" aria-label="Password" />
                                    </div>
                                    { error && (<div className="mb-6" role="alert">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm font-medium text-red-700">{error}</span>
                                            </div>
                                        </div>
                                    </div> )}
                                    
                                    { successMessage && (<div className="mb-6" role="alert">
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm font-medium text-green-700">{successMessage}</span>
                                            </div>
                                        </div>
                                    </div> )}
                                    <div>
                                        <button 
                                            type="submit" 
                                            disabled={isLoading}
                                            className="focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Shimmer className="h-5 w-5 rounded-full" shape="circle" variant="button" />
                                                    Signing In...
                                                </span>
                                            ) : (
                                                'Sign In'
                                            )}
                                        </button>
                                    </div>
                                    <p className="mt-4 text-sm text-center text-gray-600">
                                        Don't have an account?<span> </span>
                                        <a href="/signup" className="font-sans text-sm text-gray-600 underline cursor-pointer">Sign up </a>
                                    </p>
                                </form>
                            ) : (
                                <div>
                                    <div className="mb-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                                        <div className="flex items-start space-x-3">
                                            <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <h3 className="text-sm font-semibold text-indigo-900">Guest Access</h3>
                                                <p className="mt-1 text-sm text-indigo-700">
                                                    Submit bug reports without creating an account. Guest sessions are limited and some features will be restricted until you sign up.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-bold text-gray-700 text-sl" htmlFor="guest-name">Guest name</label>
                                        <input
                                            id="name"
                                            value={guestForm.name}
                                            onChange={handleGuestChange}
                                            type="text"
                                            placeholder="Enter your display name"
                                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2"
                                            aria-label="Guest name"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 font-bold text-gray-700 text-sl" htmlFor="guest-email">Guest email</label>
                                        <input
                                            id="email"
                                            value={guestForm.email}
                                            onChange={handleGuestChange}
                                            type="email"
                                            placeholder="name@example.com"
                                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2"
                                            aria-label="Guest email"
                                        />
                                    </div>
                                    {guestError && (
                                        <div className="mb-6" role="alert">
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-red-700">{guestError}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {guestMessage && (
                                        <div className="mb-6" role="alert">
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-green-700">{guestMessage}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <button
                                            type="button"
                                            onClick={handleGuestContinue}
                                            disabled={guestLoading}
                                            className="focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                                        >
                                            {guestLoading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Shimmer className="h-5 w-5 rounded-full" shape="circle" variant="button" />
                                                    Starting guest session...
                                                </span>
                                            ) : (
                                                'Continue as Guest'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Forgot Password Modal */}
                {showForgotModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Reset password">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={(e) => setShowForgotModal(false)} />
                        
                        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold">Reset Your Password</h3>
                                        <p className="text-blue-100 text-sm mt-1">Enter your email to receive reset instructions</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            setShowForgotModal(false);
                                            setError("");
                                            setForgotEmail("");
                                        }}
                                        className="text-white hover:text-gray-200 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="mb-6">
                                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg mb-4">
                                        <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <h4 className="font-medium text-blue-900">How it works</h4>
                                            <p className="text-sm text-blue-700">We'll send you a secure link to reset your password. The link expires in 1 hour for security.</p>
                                        </div>
                                    </div>

                                    <label className="block mb-2 font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={forgotEmail}
                                        onChange={(e) => setForgotEmail(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleForgotPassword()}
                                        placeholder="Enter your registered email address"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        disabled={isLoading}
                                    />
                                </div>

                                {error && (
                                    <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm text-red-700">{error}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex space-x-3">
                                    <button
                                        onClick={(e) => {
                                            setShowForgotModal(false);
                                            setError("");
                                            setForgotEmail("");
                                        }}
                                        className="flex-1 px-4 py-3 text-gray-600 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleForgotPassword}
                                        disabled={isLoading || !forgotEmail.trim()}
                                        className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Shimmer className="h-4 w-4 rounded-full" shape="circle" variant="button" />
                                                Sending...
                                            </span>
                                        ) : (
                                            'Send Reset Link'
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 px-6 py-4 rounded-b-xl">
                                <div className="flex items-center text-sm text-gray-600">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Your privacy is protected. We'll only use your email for password reset.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}