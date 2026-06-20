"use client";
import { owner } from '@/lib/constants';
import React, { useEffect, useState } from 'react';
import TermsAcceptance from '@/components/ui/TermsAcceptance';
import { useConsent } from '@/lib/ConsentContext';

export default function Signup() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    "name": "",
    "email": "",
    "password": "",
    "confirmPassword": ""
  });
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [video, setVideo] = useState(0);
  const { hasValidConsent, updateConsent } = useConsent();

  useEffect(() => {
      setVideo(Math.floor(Math.random() * owner.length));
  }, []);

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  }

  const handleTermsAccept = () => {
    setShowTermsModal(false);
    // Consent is already handled by TermsAcceptance component
    proceedWithSignup();
  };

  const handleTermsDecline = () => {
    setShowTermsModal(false);
    setError("You must accept the terms and conditions to create an account");
  };

  const proceedWithSignup = async () => {
    try {
      const response = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          termsAccepted: true,
          consentTimestamp: new Date().toISOString()
        }),
      });
      const responseData: any = await response.json();
      if (response.ok && responseData.success && typeof window !== "undefined") {
        window.location.href = "/signin";
      } else {
        setError(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  const submit = async () => {
    // Validate form fields
    for (const [key, value] of Object.entries(formData)) {
      if (value === "") {
        setError(`${key} is required`)
        return;
      }
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return;
    }

    // Check if user has already accepted terms
    if (hasValidConsent()) {
      proceedWithSignup();
    } else {
      // Show terms acceptance modal
      setShowTermsModal(true);
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
        <div className="flex items-center justify-center flex-grow p-6 lg:w-2/3 h-screen lg:h-auto pb-10">
          <div className="w-full max-w-md">
            <h2 className="flex flex-row mb-6 text-2xl font-bold">Sign up to <span className="ml-3"> </span><img src='/logo/letter-dark.png' className='h-7 no-drag' alt='Arkynox' /></h2>
            <form action={submit}> {/**form*/}
              <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700 text-sl"> Name </label>
                <input value={formData.name} onChange={handleChange} id="name" type="text" 
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2"/>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold text-gray-700 text-sl"> Email </label>
                <input value={formData.email} onChange={handleChange} id="email" type="email" 
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none h-14 focus:border-indigo-500 focus:shadow-lg focus:outline-none focus:ring-2" />
              </div>
              <div className="mb-4">
                <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                  Password
                </span>
                <input value={formData.password} onChange={handleChange} id="password" type="password" 
                    placeholder='8+ characters' className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:border-indifo-500 h-14 focus:outline-none focus:ring" />
              </div>
              <div className="mb-4">
                <span className="flex items-center justify-between mb-2 font-sans font-bold text-gray-700 text-sl">
                  Confirm Password
                </span>
                <input value={formData.confirmPassword} onChange={handleChange} id="confirmPassword" type="password" 
                    placeholder='8+ characters' className="w-full px-3 mb-3 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:border-indifo-500 h-14 focus:outline-none focus:ring" />
              </div>
                <div className="flex items-center mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg w-full">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Terms & Privacy Agreement</h4>
                        <p className="text-sm text-blue-800">
                          By creating an account, you'll be asked to review and accept our{' '}
                          <a href="/policy/terms-and-condition" target="_blank" className="underline hover:text-blue-900">
                            Terms & Conditions
                          </a>{' '}
                          and{' '}
                          <a href="/policy/privacy-policy" target="_blank" className="underline hover:text-blue-900">
                            Privacy Policy
                          </a>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              { error && (<div className="mb-6">
                <span className="flex items-center justify-between mb-2 font-sans text-lg font-bold text-red-700">
                  {error}
                </span>
              </div> )}
              <div>
                <button type='submit' className="focus:shadow-outline h-14 w-full rounded-3xl bg-[#0D0C22] px-4 py-2 font-sans font-bold text-white hover:bg-gray-800 focus:outline-none">Create Account</button>
              </div>
              <p className="mt-4 text-sm text-center text-gray-600">
                Already have an account?<span> </span>
                <a href="/signin" className="font-sans text-sm text-gray-600 underline cursor-pointer">Sign in </a>
              </p>
            </form>{/**form*/}
          </div>
        </div>
      </div>

      {/* Terms Acceptance Modal */}
      <TermsAcceptance 
        isOpen={showTermsModal}
        onAccept={handleTermsAccept}
        onDecline={handleTermsDecline}
        userEmail={formData.email}
      />
    </main>
    </>
  );
};