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
      
      {/* Interactive Mockup Control Toolbar */}
      <DemoToolbar 
        currentView={currentView} 
        onSelectView={handleNavigate} 
      />

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
