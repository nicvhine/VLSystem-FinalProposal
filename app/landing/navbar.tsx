"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import LoginModal from './loginmodal';
// import TrackModal from '@/components/TrackModal';

export default function Navbar() {
  const [language, setLanguage] = useState('English');
  const pathname = usePathname();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false); 

  const navItems = [
    { name: 'Apply', href: '/' },
    { name: 'Track Application', href: '/clients' },
    { name: 'Team', href: '/loans' },
    { name: 'About Us', href: '/applications' },
    { name: 'Contact Us', href: '/agents' },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 shadow-sm">
      <div className="w-full px-6 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <Link
            href="/dashboard"
            className="text-xl font-semibold bg-gradient-to-r from-red-600 to-blue-800 bg-clip-text text-transparent hover:from-red-700 hover:to-red-900 transition-all"
          >
            VLSystem
          </Link>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 mt-3 sm:mt-0">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={language === "ceb"}
                onChange={() => setLanguage(language === "en" ? "ceb" : "en")}
              />
              <div className="relative w-12 h-6 bg-gray-300 rounded-full transition">
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition ${
                    language === "ceb" ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {language === "en" ? "English" : "Cebuano"}
              </span>
            </label>

            <nav>
              <ul className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? 'text-blue-600 bg-blue-50 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}

                <li>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Login
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
