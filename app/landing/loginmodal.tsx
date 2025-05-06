"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isOpen || showOtpModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, showOtpModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'head' && password === 'head') {
      router.push('/head');
      onClose();
    } else if (username === 'manager' && password === 'manager') {
      router.push('/manager');
      onClose();
    } else if (username === 'loanofficer' && password === 'loanofficer') {
      router.push('/loanofficer');
      onClose();
    } else if (username === 'collector' && password === 'collector') {
      router.push('/collector');
      onClose();
    } else if (username === 'borrower' && password === 'borrower') {
      setShowOtpModal(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp === '123456') {
      setShowOtpModal(false);
      onClose();
      router.push('/borrower');
    } else {
      alert('Invalid OTP');
    }
  };

  if (!isOpen && !showOtpModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* OTP Modal */}
      {showOtpModal ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <h2 className="text-sm text-gray-600 mb-4">Enter OTP sent to your registered number</h2>
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border rounded mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Login Modal
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            ✖
          </button>
          <h2 className="text-sm text-gray-600 mb-4">Login to your VLSystem account.</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded mb-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
