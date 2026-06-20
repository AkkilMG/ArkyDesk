"use client";

import { useState } from 'react';
import Shimmer from '@/components/ui/Shimmer';

const allowedProblems = ['crash', 'copyright'];

export default function GuestCreate({ showHeader = true }: { showHeader?: boolean }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [requestLoginLink, setRequestLoginLink] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showUpgradeCta, setShowUpgradeCta] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingLink, setSendingLink] = useState(false);
  const [guestLoginUrl, setGuestLoginUrl] = useState('');

  const submit = async (e: any) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !subject.trim() || !description.trim() || !problem) {
      setError('Please fill in all fields.');
      return;
    }
    if (!allowedProblems.includes(problem.toLowerCase())) {
      setError('Invalid problem category.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/guest/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, description, problem }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || 'Unable to submit report.');
        return;
      }

      let message = 'Report submitted successfully.';
        if (requestLoginLink) {
        setSendingLink(true);
        try {
          const linkRes = await fetch('/api/guest/login-link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email }),
          });
          const linkData = await linkRes.json();
          if (linkData.success) {
            message = linkData.sent
              ? 'Report submitted. Check your email for a temporary login link.'
              : 'Report submitted. Your temporary login link was created but email is not configured on this environment.';
            if (linkData.loginUrl) {
              setGuestLoginUrl(linkData.loginUrl);
            }
          }
        } finally {
          setSendingLink(false);
        }
      }

      setSuccess(message);
      setShowUpgradeCta(true);
      if (!guestLoginUrl) setGuestLoginUrl('');
      setName('');
      setEmail('');
      setSubject('');
      setDescription('');
      setProblem('');
      setRequestLoginLink(true);
      setTimeout(() => setSuccess(''), 8000);
    } catch (err) {
      console.error(err);
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={showHeader ? "max-w-2xl mx-auto bg-white p-6 rounded-lg shadow" : "w-full"}>
      {showHeader && <h2 className="text-xl font-semibold mb-4">Report an Issue (Guest)</h2>}
      {error && <div className="mb-3 p-2 text-sm bg-red-50 border border-red-200 text-red-600 rounded" role="alert">{error}</div>}
      {success && <div className="mb-3 p-2 text-sm bg-green-50 border border-green-200 text-green-600 rounded" role="alert">{success}</div>}
      {guestLoginUrl && (
        <div className="mb-3 text-sm">
          <p className="text-gray-600">Temporary login link (development):</p>
          <a href={guestLoginUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">{guestLoginUrl}</a>
        </div>
      )}
      {showUpgradeCta && (
        <div className="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-medium text-indigo-900 text-sm">Upgrade to a Full Account</h4>
              <p className="text-sm text-indigo-700 mt-1">Create a password to track your tickets, comment on them, and access all support categories.</p>
              <a href="/signup" className="inline-block mt-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">Create Account</a>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={submit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="border border-gray-300 p-3 sm:p-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="border border-gray-300 p-3 sm:p-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none" />
        </div>
        <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" className="w-full border border-gray-300 p-3 sm:p-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none" />
        <select value={problem} onChange={e => setProblem(e.target.value)} className="w-full border border-gray-300 p-3 sm:p-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none">
          <option value="">Select problem category</option>
          <option value="crash">Application Crash</option>
          <option value="copyright">Copyright Issues</option>
        </select>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} placeholder="Describe the issue in detail..." className="w-full border border-gray-300 p-3 sm:p-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none resize-none"></textarea>
        <label className="flex items-center gap-2 text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
          <input type="checkbox" checked={requestLoginLink} onChange={e => setRequestLoginLink(e.target.checked)} className="h-4 w-4 rounded border-gray-300 accent-blue-600" />
          <span>Send me a one-time login link so I can upgrade to a full account later</span>
        </label>
        <div className="flex justify-end gap-2">
          <button disabled={loading || sendingLink} type="submit" className="px-4 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors">
            {loading || sendingLink ? (
              <span className="flex items-center gap-2">
                <Shimmer className="h-4 w-4 rounded-full" shape="circle" variant="button" />
                <span>Submitting...</span>
              </span>
            ) : (
              'Submit Report'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
