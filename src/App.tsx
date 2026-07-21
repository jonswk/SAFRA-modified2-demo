import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DemoToolbar from './components/DemoToolbar';
import LandingPage from './components/LandingPage';
import RegistrationForm from './components/RegistrationForm';
import RegistrationSuccess from './components/RegistrationSuccess';
import MemberPortal from './components/MemberPortal';
import { ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [userEmail, setUserEmail] = useState('jonathang@gmail.com');
  const [userName, setUserName] = useState('Jonathan');

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleLoginSuccess = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name || 'Jonathan');
    setCurrentView('MEMBER_PORTAL');
  };

  const handleRegisterSuccess = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name || 'Jonathan');
    setCurrentView('REGISTER_SUCCESS');
  };

  const handleActivateAccount = () => {
    // Simulated confirmation email click takes user to logged in member portal
    setCurrentView('MEMBER_PORTAL');
  };

  const handleLogout = () => {
    setUserEmail('');
    setUserName('');
    setCurrentView('LANDING');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans" id="app-wrapper">
      
      {/* 🛠️ Change Log / Description Banner above SAFRA Portal Simulator */}
      <div className="bg-slate-950 text-slate-100 border-b border-slate-800 text-[11px] sm:text-xs py-2.5 px-4 shadow-sm" id="changelog-banner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-safra-red text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase">Website Changes</span>
            <span className="text-slate-300 font-medium">
              Implemented Singpass login simulation auto-populating 7 fields (Email, Name, Nationality, NRIC Last 4, Gender, DOB, Mobile), added show/hide password toggles, decoupled Member ID validation to be fully optional, and added inline helper guides.
            </span>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('changelog-banner');
              if (el) el.style.display = 'none';
            }}
            className="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer text-[10px] font-bold self-end md:self-auto"
          >
            Dismiss
          </button>
        </div>
      </div>

      {/* Interactive Mockup Control Toolbar (SAFRA Portal Simulator) */}
      <DemoToolbar 
        currentView={currentView} 
        onSelectView={handleNavigate} 
      />

      {/* 📊 Old vs New Site Comparison Tile under SAFRA Simulator */}
      <div className="bg-white border-b border-gray-200 shadow-sm" id="comparison-dashboard">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 text-left">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-2.5">
            <div>
              <h3 className="text-xs sm:text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2">
                <span className="bg-slate-100 text-slate-800 text-[10px] font-extrabold px-2 py-0.5 rounded">Analysis Tile</span>
                Old vs. New Site Comparison & Improvements
              </h3>
              <p className="text-[11px] text-gray-500">Highlighting legacy site friction points vs. our newly implemented streamlined features.</p>
            </div>
            <button
              onClick={() => {
                const content = document.getElementById('comparison-details-grid');
                const btn = document.getElementById('comparison-toggle-btn');
                if (content && btn) {
                  const isHidden = content.classList.contains('hidden');
                  if (isHidden) {
                    content.classList.remove('hidden');
                    btn.innerText = 'Collapse Tile';
                  } else {
                    content.classList.add('hidden');
                    btn.innerText = 'Expand Tile';
                  }
                }
              }}
              className="text-[11px] font-bold text-safra-red hover:underline bg-transparent border-none cursor-pointer self-end sm:self-auto"
              id="comparison-toggle-btn"
            >
              Collapse Tile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" id="comparison-details-grid">
            {/* Legacy Site Column */}
            <div className="bg-red-50/40 p-4 rounded border border-red-100/80">
              <h4 className="text-xs font-black text-red-700 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                🔴 Legacy Site Issues
              </h4>
              <ul className="space-y-2 text-[11px] text-gray-600 list-disc pl-4 leading-relaxed">
                <li>
                  <strong className="text-red-950">Tedious Manual Entry:</strong> Users had to manually type all personal details, causing high user fatigue and form abandonment.
                </li>
                <li>
                  <strong className="text-red-950">Rigid Member ID Validation:</strong> Blocked registrations unless users supplied a valid Member ID, preventing streamlined guest registration.
                </li>
                <li>
                  <strong className="text-red-950">Hidden Password Characters:</strong> No show/hide password option, making passwords highly prone to accidental typing errors and failed verification.
                </li>
                <li>
                  <strong className="text-red-950">Format Confusion:</strong> Lacked helpful tooltips to guide users on fields like NRIC format, causing common input format errors.
                </li>
              </ul>
            </div>

            {/* Upgraded Site Column */}
            <div className="bg-emerald-50/40 p-4 rounded border border-emerald-100/80">
              <h4 className="text-xs font-black text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                🟢 Upgraded Site Improvements
              </h4>
              <ul className="space-y-2 text-[11px] text-gray-600 list-disc pl-4 leading-relaxed">
                <li>
                  <strong className="text-emerald-950">Singpass 1-Click Prefill:</strong> Automatically populates <span className="font-semibold text-emerald-800">Email, Name, Nationality, NRIC last 4, Gender, DOB, and Mobile</span> directly from verified government registers.
                </li>
                <li>
                  <strong className="text-emerald-950">Optional Member ID:</strong> Decoupled from core validation. Guests can now register without an ID, and helpful instructions are displayed to find it.
                </li>
                <li>
                  <strong className="text-emerald-950">Password Eye Toggles:</strong> Clear visual toggles allow users to easily review passwords as they type to eliminate password errors.
                </li>
                <li>
                  <strong className="text-emerald-950">Dynamic Helper Tooltips:</strong> Provides clear instructions and formats (such as standard Singapore NRIC formatting check) to simplify the UX.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Corporate Header */}
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        userEmail={userEmail}
        userName={userName}
      />

      {/* Render matching view panel based on current state */}
      <main className="flex-1 flex flex-col" id="app-main-content">
        {currentView === 'LANDING' && (
          <LandingPage 
            onNavigate={handleNavigate} 
            onLoginSuccess={handleLoginSuccess} 
          />
        )}

        {(currentView === 'REGISTER_EMPTY' || 
          currentView === 'REGISTER_SINGPASS' ||
          currentView === 'REGISTER_PW_ERROR' || 
          currentView === 'REGISTER_SYS_ERROR') && (
          <RegistrationForm 
            currentView={currentView}
            onNavigate={handleNavigate}
            onRegisterSuccess={handleRegisterSuccess}
            triggerSystemError={() => setCurrentView('REGISTER_SYS_ERROR')}
          />
        )}

        {currentView === 'REGISTER_SUCCESS' && (
          <RegistrationSuccess 
            email={userEmail}
            name={userName}
            onNavigate={handleNavigate}
            onActivate={handleActivateAccount}
          />
        )}

        {currentView === 'MEMBER_PORTAL' && (
          <MemberPortal 
            email={userEmail}
            name={userName}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Footer copyright section */}
      <Footer />
    </div>
  );
}
