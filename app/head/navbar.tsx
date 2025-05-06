'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [language, setLanguage] = useState('English');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState('john_doe');
  const [password, setPassword] = useState('password123');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/head' },
    { name: 'Clients', href: '/head/clients' },
    { name: 'Loans', href: '/head/loans'},
    { name: 'Applications', href: '/head/applications'},
    { name: 'Agents', href: '/head/agents'},
    { name: 'Collections', href: '/head/collections'},
   // { name: 'Users', href: '/users' },
  ];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleEdit = () => {
    if (isEditing && newPassword !== confirmPassword) {
      setPasswordError('New Password and Confirm Password do not match.');
    } else {
      setPasswordError('');
      setIsEditing(!isEditing);
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your actual logout logic here (e.g., clear tokens, redirect, etc.)
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 shadow-sm">
      <div className="w-full px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link href="/dashboard" className="flex items-center space-x-2 text-xl font-semibold bg-gradient-to-r from-red-600 to-blue-800 bg-clip-text text-transparent hover:from-red-700 hover:to-red-900 transition-all">
            <span>VLSystem</span>
          </Link>

          {/* Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Language Switch */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={language === 'ceb'}
                onChange={() => setLanguage(language === 'en' ? 'ceb' : 'en')}
              />
              <div className="relative w-12 h-6 bg-gray-300 rounded-full transition">
                <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition ${language === 'ceb' ? 'translate-x-6' : ''}`} />
              </div>
              <span className="ml-3 text-sm text-gray-900 font-medium">
                {language === 'en' ? 'English' : 'Cebuano'}
              </span>
            </label>

            {/* Nav Links */}
            <ul className="flex items-center space-x-6">
              {navItems.map(item => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive ? 'text-blue-600 bg-blue-50 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Profile Dropdown */}
            <div className="relative">
              <div
                className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-red-900 ring-offset-2 cursor-pointer hover:ring-4 transition-all"
                onClick={toggleDropdown}
              >
                <Image src="/idPic.jpg" alt="Profile" width={36} height={36} className="object-cover w-full h-full" />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-20 p-4 text-black">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {isEditing && (
                    <>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      {passwordError && <p className="text-red-500 text-xs mb-2">{passwordError}</p>}
                    </>
                  )}

                  <div className="flex flex-col space-y-2 mt-3">
                    <button
                      onClick={handleEdit}
                      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                    >
                      {isEditing ? 'Save' : 'Edit'}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <ul className="space-y-2">
              {navItems.map(item => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center space-x-3 px-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={language === 'ceb'}
                  onChange={() => setLanguage(language === 'en' ? 'ceb' : 'en')}
                />
                <div className="relative w-12 h-6 bg-gray-300 rounded-full transition">
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition ${
                      language === 'ceb' ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
                <span className="text-gray-900 ml-3 text-sm font-medium">
                  {language === 'en' ? 'English' : 'Cebuano'}
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}