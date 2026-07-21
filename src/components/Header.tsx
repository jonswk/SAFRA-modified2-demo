import React from 'react';
import { ShieldCheck, LogOut, User, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: any) => void;
  userEmail?: string;
  userName?: string;
}

export default function Header({ currentView, onNavigate, userEmail, userName }: HeaderProps) {
  const isLoggedIn = currentView === 'MEMBER_PORTAL';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate(isLoggedIn ? 'MEMBER_PORTAL' : 'LANDING')}
            className="font-black text-safra-red text-2xl sm:text-3xl tracking-tighter hover:opacity-85 transition-opacity cursor-pointer flex items-center gap-1"
            id="header-logo-btn"
          >
            SAFRA
          </button>
          
          {isLoggedIn && (
            <span className="hidden md:inline-flex items-center gap-1 bg-red-50 text-safra-red text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> mySAFRA portal
            </span>
          )}
        </div>

        {/* Right Side: Links or User Profile */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs uppercase font-semibold text-gray-500">
          {!isLoggedIn ? (
            <>
              <a 
                href="#corporate" 
                onClick={(e) => { e.preventDefault(); onNavigate('LANDING'); }}
                className="hover:text-safra-red border-b-2 border-transparent hover:border-safra-red py-5 transition-all text-[11px] hidden sm:block"
                id="link-corporate"
              >
                SAFRA Corporate Site
              </a>
              <button 
                onClick={() => onNavigate('REGISTER_EMPTY')}
                className="hover:text-safra-red py-5 transition-all text-[11px] text-left cursor-pointer"
                id="link-faq"
              >
                Join SAFRA
              </button>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); alert("SAFRA Customer Service: 1800-377-2372 or email membership@safra.sg"); }}
                className="hover:text-safra-red py-5 transition-all text-[11px]"
                id="link-contact"
              >
                Contact Us
              </a>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* Notification icon */}
              <button className="p-2 text-gray-400 hover:text-gray-600 relative rounded-full hover:bg-gray-100 transition-colors cursor-pointer" id="header-bell">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-safra-red rounded-full"></span>
              </button>

              {/* Profile details */}
              <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-safra-red font-bold text-sm">
                  {userName ? userName[0].toUpperCase() : 'J'}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-gray-800 font-bold capitalize text-xs">{userName || 'Jonathan'}</div>
                  <div className="text-[10px] text-gray-400 font-normal lowercase tracking-normal">{userEmail || 'jonathan@gmail.com'}</div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => onNavigate('LANDING')}
                className="flex items-center gap-1.5 border border-gray-300 text-gray-600 hover:text-safra-red hover:border-safra-red px-3 py-1.5 rounded-sm transition-all text-[10px] font-bold cursor-pointer"
                id="header-logout-btn"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>LOGOUT</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
