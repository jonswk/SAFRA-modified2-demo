import React, { useState } from 'react';
import { LogIn, HelpCircle, Mail, MapPin, Eye, EyeOff } from 'lucide-react';
import { ViewState } from '../types';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
  onLoginSuccess: (email: string, name: string) => void;
}

export default function LandingPage({ onNavigate, onLoginSuccess }: LandingPageProps) {
  const [loginEmail, setLoginEmail] = useState('jonathang@gmail.com');
  const [loginPassword, setLoginPassword] = useState('MyP@ssword123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginEmail) {
      setErrorMsg('Please enter your Email or Member ID.');
      return;
    }
    if (!loginPassword) {
      setErrorMsg('Please enter your password.');
      return;
    }

    // Mock Login: Accept anything but provide friendly feedback
    let computedName = 'Jonathan';
    if (loginEmail.includes('@')) {
      computedName = loginEmail.split('@')[0];
    }
    
    onLoginSuccess(loginEmail, computedName);
  };

  const handleQuickPrefill = (email: string) => {
    setLoginEmail(email);
    setLoginPassword('MyP@ssword123');
  };

  return (
    <div className="bg-gray-100 flex-1 flex flex-col" id="landing-page-root">
      {/* Hero Section + Login Panel */}
      <section 
        className="relative bg-black min-h-[520px] lg:min-h-[580px] flex items-center py-12 px-4 bg-cover bg-center transition-all duration-300"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200')`
        }}
        id="hero-section"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
          
          {/* Left Column: Headline */}
          <div className="lg:col-span-7 text-white text-left space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase">
              Ready to be part of <br />
              the <span className="text-safra-red">SAFRA</span> family?
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light max-w-xl">
              Start your journey by creating a mySAFRA account below and unlock a world of exclusive member benefits, active sports, club fitness, premium dining perks, and recreation.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('REGISTER_EMPTY')}
                className="bg-safra-red hover:bg-safra-red-dark text-white px-8 py-3 uppercase font-bold text-sm tracking-wider shadow-lg transition-colors cursor-pointer rounded-sm"
                id="hero-signup-btn"
              >
                Sign Up Now
              </button>
              <a
                href="#lifestyle"
                className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-3 uppercase font-bold text-sm tracking-wider transition-all rounded-sm text-center"
                id="hero-learn-more-btn"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Column: Login Card Widget */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto bg-white shadow-2xl overflow-hidden rounded-sm border-t-4 border-safra-red">
            <div className="p-6 sm:p-8 text-left">
              
              <div className="flex items-center gap-2 text-safra-red font-bold text-sm uppercase mb-1">
                <LogIn className="w-4 h-4" />
                <span>HELLO,</span>
              </div>
              <h2 className="text-xs text-gray-500 uppercase tracking-wider mb-6">
                It's great your day's started. PLEASE LOGIN YOUR ACCOUNT
              </h2>

              {errorMsg && (
                <div className="mb-4 bg-red-50 border-l-4 border-safra-red text-safra-red p-3 text-xs font-semibold rounded-sm">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="input-label block">Email / Member ID</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-safra-red focus:border-safra-red transition-all"
                    placeholder="Enter your email or ID"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    id="login-email-input"
                  />
                  <div className="flex gap-2 mt-1.5">
                    <span className="text-[10px] text-gray-400">Quick Test:</span>
                    <button 
                      type="button" 
                      onClick={() => handleQuickPrefill('jonathang@gmail.com')}
                      className="text-[10px] text-safra-red hover:underline font-semibold cursor-pointer"
                    >
                      jonathang@gmail.com
                    </button>
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <label className="input-label">Password</label>
                    <button
                      type="button"
                      onClick={() => alert('Password recovery has been initiated. A link will be sent to ' + (loginEmail || 'your registered email') + '.')}
                      className="text-[10px] text-safra-red hover:underline font-bold"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 pr-10 focus:outline-none focus:ring-1 focus:ring-safra-red focus:border-safra-red transition-all"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      id="login-password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember me & Forgot Member ID */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-300 text-safra-red focus:ring-safra-red"
                    />
                    <span>Remember me</span>
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => alert('Please contact membership@safra.sg or retrieve ID via NRIC on the registration page.')}
                    className="text-[11px] text-safra-red hover:underline font-semibold"
                  >
                    Forgot Member ID?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-safra-red hover:bg-safra-red-dark text-white font-bold uppercase py-3 rounded-sm shadow-md transition-colors text-xs tracking-wider cursor-pointer"
                  id="login-submit-btn"
                >
                  LOGIN
                </button>
              </form>

              {/* Registration Link */}
              <div className="mt-6 text-center border-t border-gray-100 pt-4 text-xs text-gray-500">
                New here?{' '}
                <button
                  onClick={() => onNavigate('REGISTER_EMPTY')}
                  className="text-safra-red font-bold hover:underline cursor-pointer"
                  id="login-register-link"
                >
                  Create a mySAFRA account
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* The SAFRA Lifestyle Grid */}
      <section className="bg-white py-16 px-4" id="lifestyle">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight uppercase">
            The SAFRA Lifestyle
          </h2>
          {/* Accent red bar as requested */}
          <div className="w-24 h-1.5 bg-safra-red mx-auto mt-3 mb-10"></div>

          {/* Grid Layout matching mockup */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 text-left">
            
            {/* 1. Clubhouse Facilities (Gym/Large Left) */}
            <div 
              className="lg:col-span-7 relative h-[420px] rounded-sm overflow-hidden group cursor-pointer shadow-md"
              onClick={() => alert('Clubhouses are equipped with premium pools, state-of-the-art gyms, tennis/futsal courts, and private multi-purpose rooms.')}
              id="lifestyle-card-facilities"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <span className="bg-safra-red text-[10px] font-bold uppercase px-2 py-0.5 tracking-wider rounded-sm">
                  Fitness & Recreation
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight">Clubhouse Facilities</h3>
                <p className="text-xs text-gray-300 font-light max-w-md">Access state-of-the-art energy zones and elite gyms islandwide.</p>
              </div>
            </div>

            {/* Right Side Stack */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* 2. Dining Perks */}
              <div 
                className="relative h-[197px] rounded-sm overflow-hidden group cursor-pointer shadow-sm"
                onClick={() => alert('Check out exclusive dining discounts up to 30% off for SAFRA Members at over 150 participating outlets!')}
                id="lifestyle-card-dining"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-black uppercase tracking-tight">Dining Perks</h4>
                  <p className="text-[11px] text-gray-300">Gourmet discount treats & premium food vouchers.</p>
                </div>
              </div>

              {/* 3. Family Events */}
              <div 
                className="relative h-[197px] rounded-sm overflow-hidden group cursor-pointer shadow-sm"
                onClick={() => alert('Family bonding event calendars, pool parties, and movie nights at SAFRA clubhouses!')}
                id="lifestyle-card-family"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-black uppercase tracking-tight">Family Events</h4>
                  <p className="text-[11px] text-gray-300">Adventure, swimming pool camps, and parent-child bonding.</p>
                </div>
              </div>

            </div>

            {/* 4. Networking & Skills (Full Width bottom card) */}
            <div 
              className="lg:col-span-12 relative h-[240px] rounded-sm overflow-hidden group cursor-pointer shadow-md mt-2"
              onClick={() => alert('Browse and sign up for SAFRA professional workshops, technical certifications, and networking mixers.')}
              id="lifestyle-card-networking"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-left">
                <span className="bg-safra-red text-[10px] font-bold uppercase px-2 py-0.5 tracking-wider rounded-sm inline-block mb-1">
                  Professional Growth
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight">Networking & Skills</h3>
                <p className="text-xs text-gray-300 font-light max-w-xl">Accelerate your career through certified seminars, business conferences, and veteran networks.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* News Subscription Banner */}
      <section className="bg-safra-red text-white py-12 px-4 shadow-inner" id="news-section">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight">Stay updated with SAFRA News</h3>
            <p className="text-sm opacity-90 font-light">Get the latest on major club events, exclusive hot-deals, and active member benefits.</p>
          </div>
          
          <form 
            onSubmit={(e) => { e.preventDefault(); alert('Thank you! You are now subscribed to the mySAFRA newsletter.'); }}
            className="flex w-full lg:w-auto max-w-md gap-2"
          >
            <input
              type="email"
              required
              className="flex-1 bg-white text-gray-800 placeholder-gray-400 px-4 py-3 rounded-sm text-sm focus:outline-none"
              placeholder="Your Email Address"
              id="newsletter-email-input"
            />
            <button
              type="submit"
              className="bg-black hover:bg-gray-900 text-white font-bold uppercase px-6 py-3 text-sm tracking-wider rounded-sm transition-all cursor-pointer"
              id="newsletter-join-btn"
            >
              JOIN
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
