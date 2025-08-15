"use client";
import { owner } from "@/lib/constants";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Signin() {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        "email": "",
        "password": ""
    });
    const [video, setVideo] = useState(0);
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
            } else {
                console.error('Verify failed:', data.message);
            }
        } catch (error) {
            console.error('Error verify out:', error);
        }
    }

    useEffect(() => {
        const handleRefresh = () => {
            setVideo(Math.floor(Math.random() * owner.length));
        };
        if (typeof document !== 'undefined' && document.cookie) {
            handleAdmin();
        }
        window.addEventListener('load', handleRefresh);
        return () => {
            window.removeEventListener('load', handleRefresh);
        };
    }, []);

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

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
                        <a className="flex-grow font-semibold text-2x1" href="/"><img src='/logo/letter.png' className='w-40 no-drag' alt='SangrahDB' /></a>
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
                    <div className="flex items-center justify-center flex-grow p-6 lg:w-2/3 h-screen lg:h-auto pb-10">
                        <div className="w-full max-w-md">
                            <h2 className="flex flex-row mb-6 text-2xl font-bold">Sign in to <span className="ml-3"> </span><img src='/logo/letter-dark.png' className='h-7 no-drag' alt='SangrahDB' /></h2>
                            <form action={submit}> {/** form */}
                                <div className="mb-4">
                                    <label className="block mb-2 font-bold text-gray-700 text-sl"> Email </label>
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
                                        >
                                            Forgot Password?
                                        </button>
                                    </span>
                                    <input value={formData.password} onChange={handleChange} id="password" type="password" 
                                    className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:border-indifo-500 h-14 focus:outline-none focus:ring" />
                                </div>
                                { error && (<div className="mb-6">
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm font-medium text-red-700">{error}</span>
                                        </div>
                                    </div>
                                </div> )}
                                
                                { successMessage && (<div className="mb-6">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Signing In...
                                            </>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </button>
                                </div>
                                <p className="mt-4 text-sm text-center text-gray-600">
                                    Don't have an account?<span> </span>
                                    <a href="/signup" className="font-sans text-sm text-gray-600 underline cursor-pointer">Sign up </a>
                                </p>
                            </form> {/* form*/}
                        </div>
                    </div>
                </div>

                {/* Forgot Password Modal */}
                {showForgotModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
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