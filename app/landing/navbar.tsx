"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import LoginModal from './loginmodal';
import TrackModal from './trackmodal';

export default function Navbar() {
  const [language, setLanguage] = useState('English');
  const pathname = usePathname();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false); 

  const navItems = [
    { name: 'Apply', href: '/' },
    { name: 'Track Application', href: '#', onClick: () => setIsTrackOpen(true) },
    { name: 'Team', href: '#team' },
    { name: 'About Us', href: "#about" },
    { name: 'Contact Us', href: '#footer' },
  ];

  const isActive = (href: string) => {
    return pathname === href || (href === '#' && pathname !== '/');
  };
  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 shadow-md sticky top-0 z-20">
      <div className="w-full px-6 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-blue-800 bg-clip-text hover:from-red-700 hover:to-red-900 transition-all"
          >
            VLSystem
          </Link>

          <div className="flex flex-wrap items-center gap-6 mt-3 sm:mt-0">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={language === "ceb"}
                onChange={() => setLanguage(language === "en" ? "ceb" : "en")}
              />
              <div className="relative w-12 h-6 bg-gray-300 rounded-full transition-all">
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    language === "ceb" ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {language === "en" ? "English" : "Cebuano"}
              </span>
            </label>

            <nav>
              <ul className="flex gap-6 items-center">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={item.onClick}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          active
                            ? 'text-blue-600 bg-blue-100 shadow-md'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
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
      <TrackModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />
    </div>
  );
}
