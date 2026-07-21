import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DemoToolbar from './components/DemoToolbar';
import LandingPage from './components/LandingPage';
import RegistrationForm from './components/RegistrationForm';
import RegistrationSuccess from './components/RegistrationSuccess';
import MemberPortal from './components/MemberPortal';
import ComparisonPage from './components/ComparisonPage';
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
      {currentView !== 'COMPARISON' && (
        <div className="bg-white border-b border-gray-200 shadow-sm animate-fade-in" id="comparison-dashboard">
          <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 text-left">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-xs sm:text-sm font-black text-gray-800 uppercase tracking-wider flex flex-wrap items-center gap-2">
                  <span className="bg-safra-red text-white text-[9px] font-black px-1.5 py-0.5 rounded tracking-wide">Analysis Tile</span>
                  Old vs. New Site Comparison & Improvements
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Highlighting legacy site friction points vs. our newly implemented streamlined features.</p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleNavigate('COMPARISON')}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[11px] px-3.5 py-2 rounded flex items-center gap-1.5 shadow transition-all cursor-pointer border-none"
                >
                  🔍 View Side-by-Side Screen Captures & Heuristic Audit
                </button>
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
                  className="text-[11px] font-bold text-safra-red hover:underline bg-transparent border-none cursor-pointer"
                  id="comparison-toggle-btn"
                >
                  Collapse Tile
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-fade-in" id="comparison-details-grid">
              {/* Legacy Site Column */}
              <div className="bg-red-50/40 p-4 rounded border border-red-100/80">
                <h4 className="text-xs font-black text-red-700 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  🔴 Legacy Site Issues (Reported Friction)
                </h4>
                <ul className="space-y-2 text-[11px] text-gray-600 list-disc pl-4 leading-relaxed">
                  <li>
                    <strong className="text-red-950">1. Tedious Manual Entry:</strong> Users had to manually type all personal details, causing high user fatigue and form abandonment.
                  </li>
                  <li>
                    <strong className="text-red-950">2. Inconsistent Password Rules:</strong> Promoted 6-character rule but secretly required 8-character passwords with zero visual checklist support.
                  </li>
                  <li>
                    <strong className="text-red-950">3. Optional Member ID Trap:</strong> Marked as "Optional", but registered users were blocked by cryptic system administrator error flags if they left it blank.
                  </li>
                </ul>
              </div>

              {/* Upgraded Site Column */}
              <div className="bg-emerald-50/40 p-4 rounded border border-emerald-100/80">
                <h4 className="text-xs font-black text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  🟢 Upgraded Site Improvements (Nielsen's Heuristics Applied)
                </h4>
                <ul className="space-y-2 text-[11px] text-gray-600 list-disc pl-4 leading-relaxed">
                  <li>
                    <strong className="text-emerald-950">Singpass 1-Click Prefill:</strong> Populates <span className="font-semibold text-emerald-800">Email, Name, Nationality, NRIC last 4, Gender, DOB, and Mobile</span> in a single tap (<span className="italic font-medium text-emerald-900">Heuristic #7: Flexibility & Efficiency</span>).
                  </li>
                  <li>
                    <strong className="text-emerald-950">Interactive Checklist & Eye Toggle:</strong> Provides real-time visual indicator lists and password visibility controls (<span className="italic font-medium text-emerald-900">Heuristic #5: Error Prevention & Heuristic #10</span>).
                  </li>
                  <li>
                    <strong className="text-emerald-950">Truly Optional Member ID:</strong> Decoupled from core account creation to support instant guest accounts (<span className="italic font-medium text-emerald-900">Heuristic #9: Error Recovery</span>).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

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

        {currentView === 'COMPARISON' && (
          <ComparisonPage 
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer copyright section */}
      <Footer />
    </div>
  );
}
