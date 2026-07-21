import React, { useState, useEffect } from 'react';
import { ShieldCheck, HelpCircle, AlertCircle, X, RefreshCw, Zap, Sparkles, Lock, User, Check, Mail, Search, Eye, EyeOff } from 'lucide-react';
import { ViewState, RegistrationData } from '../types';

interface RegistrationFormProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onRegisterSuccess: (email: string, name: string) => void;
  triggerSystemError: () => void;
}

export default function RegistrationForm({
  currentView,
  onNavigate,
  onRegisterSuccess,
  triggerSystemError
}: RegistrationFormProps) {
  // Form fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [memberId, setMemberId] = useState('');
  const [nric, setNric] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [mobileCountry, setMobileCountry] = useState('65');
  const [mobileNo, setMobileNo] = useState('');
  
  // Consent checkboxes
  const [emailAck, setEmailAck] = useState(false);
  const [termsAck, setTermsAck] = useState(false);
  const [captchaAck, setCaptchaAck] = useState(false);

  // Captcha Input State
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('4R8H7K');

  // Error/validation messages
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Streamlined Sign Up state
  const [showModal, setShowModal] = useState<'NONE' | 'SINGPASS' | 'GOOGLE' | 'MICROSOFT'>('NONE');
  const [prefilledFields, setPrefilledFields] = useState<string[]>([]);
  const [prefillSource, setPrefillSource] = useState<'NONE' | 'SINGPASS' | 'GOOGLE' | 'MICROSOFT'>('NONE');
  const [prefillSuccessMsg, setPrefillSuccessMsg] = useState<string | null>(null);

  // Flow Optimization Mode States
  const [regFlow, setRegFlow] = useState<'MEMBER' | 'GUEST'>('MEMBER');
  const [uiMode, setUiMode] = useState<'OPTIMIZED' | 'LEGACY'>('OPTIMIZED');
  const [showLookupModal, setShowLookupModal] = useState(false);
  const [lookupNric, setLookupNric] = useState('');
  const [lookupResult, setLookupResult] = useState<{ id: string; name: string } | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // When view changes from Demo toolbar, populate appropriate mock values
  useEffect(() => {
    setGlobalError(null);
    setFormErrors({});
    setPrefilledFields([]);
    setPrefillSource('NONE');
    setPrefillSuccessMsg(null);
    setLookupResult(null);
    setLookupError(null);
    setLookupNric('');
    
    if (currentView === 'REGISTER_PW_ERROR') {
      setRegFlow('MEMBER');
      // Setup detailed password validation error scenario values (Mockup 3)
      setEmail('jonath.itg@gmail.com');
      setPassword('password');
      setConfirmPassword('otherpassword');
      setName('Jonathan');
      setNationality('Singaporean');
      setMemberId('Forgot Member ID?');
      setNric('733D');
      setGender('Male');
      setDob('1989-10-10'); // '10 October 1989'
      setMobileCountry('65');
      setMobileNo('82887307');
      setEmailAck(true);
      setTermsAck(true);
      setCaptchaAck(true);
      setCaptchaInput('4R8H7K');
      
      setFormErrors({
        password: 'Minimum 8 characters, needs digits, lowercase, uppercase',
        confirmPassword: 'Password not matched'
      });
      setGlobalError(
        'Failed to register. Error: Password length is at least 8, contains at least one digit and contains at least one lower case and one upper case alphabet - at LogicLayer.PortalSubsystem.PortalUserRegistration.Register(UserInfo user, SAFRAMemberService.SOL.RegisterUserRequest request)'
      );
    } else if (currentView === 'REGISTER_SYS_ERROR') {
      setRegFlow('MEMBER');
      // Setup system registration error scenario values (Mockup 1)
      setEmail('jonathang@gmail.com');
      setPassword('MyPassword123');
      setConfirmPassword('MyPassword123');
      setName('Jonathan');
      setNationality('Singaporean');
      setMemberId('S8123456D');
      setNric('456D');
      setGender('Male');
      setDob('1980-10-10'); // '10 October 1980'
      setMobileCountry('65');
      setMobileNo('92887307');
      setEmailAck(true);
      setTermsAck(true);
      setCaptchaAck(true);
      setCaptchaInput('4R8H7K');
      
      setGlobalError(
        'Failed to register. Error: Unable to create online account. For further assistance, please email to membership@safra.sg.'
      );
    } else {
      setRegFlow('MEMBER');
      // Reset for clean slate
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setNationality('');
      setMemberId('');
      setNric('');
      setGender('');
      setDob('');
      setMobileCountry('65');
      setMobileNo('');
      setEmailAck(false);
      setTermsAck(false);
      setCaptchaAck(false);
      setCaptchaInput('');
    }
  }, [currentView]);

  const handleInitiateShortcut = (source: 'SINGPASS' | 'GOOGLE' | 'MICROSOFT') => {
    setGlobalError(null);
    setShowModal(source);
  };

  const handleApplyAutofill = (source: 'SINGPASS' | 'GOOGLE' | 'MICROSOFT') => {
    setIsLoading(true);
    setShowModal('NONE');
    setPrefillSuccessMsg(null);
    
    setTimeout(() => {
      setIsLoading(false);
      setPrefillSource(source);
      
      if (source === 'SINGPASS') {
        setName('JONATHAN GOH WEI JIE');
        setNationality('Singaporean');
        setNric('567A');
        setGender('Male');
        setDob('1994-06-18');
        setMobileCountry('65');
        setMobileNo('91234567');
        setEmail('jonathan.goh@gmail.com');
        setMemberId('S9412345D');
        setEmailAck(true);
        setTermsAck(true);
        setCaptchaAck(true);
        setCaptchaInput('4R8H7K');
        setPrefilledFields(['name', 'nationality', 'nric', 'gender', 'dob', 'mobile', 'email', 'memberId', 'emailAck', 'termsAck', 'captcha']);
        
        setGlobalError(null);
        setPrefillSuccessMsg('✨ Authenticated via Singpass Myinfo! NRIC, Nationality, Gender, Date of Birth, Mobile, and Email were retrieved securely. Please choose a password below.');
      } else if (source === 'GOOGLE') {
        setName('Jonathan Goh');
        setEmail('jonathan.goh.google@gmail.com');
        setPrefilledFields(['name', 'email']);
        setGlobalError(null);
        setPrefillSuccessMsg('✨ Authenticated via Google! Name and Email have been pre-filled. Please type your remaining personal details to register.');
      } else if (source === 'MICROSOFT') {
        setName('Jonathan Goh');
        setEmail('jgoh_msft@outlook.com');
        setPrefilledFields(['name', 'email']);
        setGlobalError(null);
        setPrefillSuccessMsg('✨ Authenticated via Microsoft! Name and Email have been pre-filled. Please type your remaining personal details to register.');
      }
      
      // Smooth scroll to form
      const formEl = document.getElementById('registration-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1000);
  };

  const handleResetToManual = () => {
    setPrefilledFields([]);
    setPrefillSource('NONE');
    setPrefillSuccessMsg(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setNationality('');
    setMemberId('');
    setNric('');
    setGender('');
    setDob('');
    setMobileCountry('65');
    setMobileNo('');
    setEmailAck(false);
    setTermsAck(false);
    setCaptchaAck(false);
    setCaptchaInput('');
    setGlobalError(null);
    setFormErrors({});
  };

  // Generate a mock CAPTCHA
  const generateCaptcha = () => {
    const codes = ['4R8H7K', '9X2Y3Z', '5P8Q1W', '7T4V9M', '3K6B8L'];
    const randomCode = codes[Math.floor(Math.random() * codes.length)];
    setCaptchaCode(randomCode);
    setCaptchaInput('');
  };

  // Perform form validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setGlobalError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const errors: Record<string, string> = {};

      // 1. Basic Fields validation
      if (!email) errors.email = 'Email is required';
      if (!password) errors.password = 'Password is required';
      if (!confirmPassword) errors.confirmPassword = 'Confirmation password is required';
      if (!name) errors.name = 'Name is required';
      if (!mobileNo) errors.mobile = 'Mobile number is required';
      
      // Member-only fields validation
      if (regFlow === 'MEMBER') {
        if (!nationality) errors.nationality = 'Nationality is required';
        if (!nric) errors.nric = 'NRIC last 4 chars is required';
        if (!gender) errors.gender = 'Gender is required';
        if (!dob) errors.dob = 'Date of birth is required';
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setGlobalError('Please fill out all the required fields indicated with a red asterisk (*)');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Check if membership ID is empty/not entered (only if registering as full member)
      if (regFlow === 'MEMBER') {
        if (!memberId || !memberId.trim() || memberId === 'Forgot Member ID?') {
          errors.memberId = 'Member ID is required to link existing membership';
          setFormErrors(errors);
          setGlobalError(
            'Failed to register. Error: Unable to create online account. For further assistance, please email to membership@safra.sg.'
          );
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // 2. Complex Password validation
      const hasDigit = /\d/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const isLengthValid = password.length >= 8; // Aligned with the legacy error requirement (at least 8 chars)

      if (!isLengthValid || !hasDigit || !hasLower || !hasUpper) {
        errors.password = 'Password does not meet complexity guidelines (8+ chars, with digit, upper & lower case)';
        setFormErrors(errors);
        setGlobalError(
          'Failed to register. Error: Password length is at least 8, contains at least one digit and contains at least one lower case and one upper case alphabet - at LogicLayer.PortalSubsystem.PortalUserRegistration.Register(UserInfo user, SAFRAMemberService.SOL.RegisterUserRequest request)'
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 3. Confirm Password Match check
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        setFormErrors(errors);
        setGlobalError('Confirmation password does not match the entered password.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 4. Consent checklists validation
      if (!emailAck || !termsAck) {
        setGlobalError('You must acknowledge the Email and Terms of Use checkboxes to register.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 5. Captcha Validation
      if (!captchaAck) {
        setGlobalError('Please check the CAPTCHA checkbox to verify you are not a robot.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (captchaInput !== captchaCode) {
        errors.captcha = 'Verification code does not match';
        setFormErrors(errors);
        setGlobalError('The verification code you entered is incorrect. Please try again.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // System registration simulation check (If user input email contains 'system' or 'fail', mock system registration error banner)
      if (email.toLowerCase().includes('fail') || email.toLowerCase().includes('error')) {
        setGlobalError(
          'Failed to register. Error: Unable to create online account. For further assistance, please email to membership@safra.sg.'
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Success! Proceed to success screen
      onRegisterSuccess(email, name);
    }, 800);
  };

  const isPasswordInvalid = !!formErrors.password;
  const isConfirmPasswordInvalid = !!formErrors.confirmPassword;

  return (
    <div className="bg-gray-100 flex-1 flex flex-col relative" id="registration-root">
      
      {/* 1. Global Error Alert Banner (at the very top of registration section, sticky/scrolled) */}
      {globalError && (
        <div 
          className="bg-safra-red text-white p-5 flex flex-col md:flex-row items-stretch gap-4 shadow-xl z-30 animate-fade-in relative text-left" 
          id="registration-error-banner"
        >
          <div className="flex gap-3 items-start flex-1">
            <div className="flex-shrink-0 bg-white rounded-full p-1 mt-0.5">
              <AlertCircle className="h-5 w-5 text-safra-red" />
            </div>
            <div className="flex-1 text-xs sm:text-sm">
              <h4 className="font-extrabold tracking-wider uppercase flex items-center gap-2">
                <span>SYSTEM REGISTRATION ERROR</span>
                {uiMode === 'OPTIMIZED' && (
                  <span className="text-[10px] bg-white text-safra-red px-2 py-0.5 rounded font-black uppercase">Guided Assistant Active</span>
                )}
              </h4>
              <div className="font-mono text-[10.5px] mt-1 bg-red-950/45 p-2 rounded border border-red-800 text-red-100 overflow-x-auto break-all">
                {globalError}
              </div>

              {/* FRIENDLY OPTIMIZED ERROR GUIDANCE TRANSLATION */}
              {uiMode === 'OPTIMIZED' && (
                <>
                  {globalError.includes('Password length') && (
                    <div className="mt-4 bg-white text-gray-800 p-4 rounded shadow-md border-l-4 border-emerald-500 animate-scale-up">
                      <div className="font-bold flex items-center gap-1.5 uppercase text-[10px] text-emerald-700">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                        How to Solve This Error:
                      </div>
                      <p className="leading-relaxed text-xs text-gray-600 mt-1">
                        Your password does not satisfy SAFRA's security requirements. Please adjust your password below to meet these 4 rules:
                      </p>
                      <ul className="list-none pl-0 font-semibold space-y-1 text-xs text-gray-700 mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <li className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded border border-gray-100">
                          <span className={`w-2.5 h-2.5 rounded-full ${password.length >= 8 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                          At least 8 characters (Current: {password.length})
                        </li>
                        <li className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded border border-gray-100">
                          <span className={`w-2.5 h-2.5 rounded-full ${/\d/.test(password) ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                          At least one number (0-9)
                        </li>
                        <li className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded border border-gray-100">
                          <span className={`w-2.5 h-2.5 rounded-full ${/[a-z]/.test(password) ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                          At least one lowercase letter (a-z)
                        </li>
                        <li className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded border border-gray-100">
                          <span className={`w-2.5 h-2.5 rounded-full ${/[A-Z]/.test(password) ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                          At least one uppercase letter (A-Z)
                        </li>
                      </ul>
                      <p className="mt-2 text-[10px] text-gray-400 italic">
                        Tip: We have added a real-time complexity visual checklist below the password input field to guide you.
                      </p>
                    </div>
                  )}

                  {globalError.includes('Unable to create online account') && (
                    <div className="mt-4 bg-white text-gray-800 p-4 rounded shadow-md border-l-4 border-amber-500 animate-scale-up">
                      <div className="font-bold flex items-center gap-1.5 uppercase text-[10px] text-amber-700">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                        Why is this occurring & how to resolve:
                      </div>
                      <p className="leading-relaxed text-xs text-gray-600 mt-1">
                        SAFRA requires your entered <strong>Member ID</strong> or <strong>NRIC</strong> to match active SAF NSmen or Life Membership records in our database. Since Member ID is empty or wrong, registration failed.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100 text-xs">
                        <div className="bg-amber-50/40 p-2.5 rounded border border-amber-100 flex flex-col justify-between">
                          <div>
                            <h5 className="font-bold text-amber-800 uppercase text-[10px]">Option A: Retrieve ID</h5>
                            <p className="text-[10px] text-gray-500 mt-0.5">Lookup your Member ID instantly using your NRIC.</p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              setGlobalError(null);
                              setShowLookupModal(true);
                            }}
                            className="mt-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[10px] px-3 py-1.5 rounded cursor-pointer border-none uppercase tracking-wider w-full text-center"
                          >
                            Lookup Member ID Now
                          </button>
                        </div>
                        <div className="bg-indigo-50/40 p-2.5 rounded border border-indigo-100 flex flex-col justify-between">
                          <div>
                            <h5 className="font-bold text-indigo-800 uppercase text-[10px]">Option B: Streamlined Guest</h5>
                            <p className="text-[10px] text-gray-500 mt-0.5">Don't have a membership? Skip Member ID & register a guest account.</p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              setGlobalError(null);
                              setRegFlow('GUEST');
                            }}
                            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] px-3 py-1.5 rounded cursor-pointer border-none uppercase tracking-wider w-full text-center"
                          >
                            Bypass Verification (4 Fields)
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex md:flex-col justify-center items-center border-t md:border-t-0 md:border-l border-white/20 pt-3 md:pt-0 md:pl-4">
            <button 
              onClick={() => setGlobalError(null)} 
              className="text-white hover:text-gray-200 p-2 rounded-full cursor-pointer bg-red-950/20 hover:bg-red-950/40 border-none flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider"
              id="error-banner-close"
            >
              <X className="h-4 w-4" />
              <span>Dismiss</span>
            </button>
          </div>
        </div>
      )}

      {/* Primary Container */}
      <section className="max-w-6xl mx-auto w-full my-8 px-4 sm:px-6 flex-1 flex flex-col justify-center">
        
        {/* Intro header text */}
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 tracking-tight">
            Ready to be part of the SAFRA family? Start your journey by creating a mySAFRA account below.
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            For eligible SAF NSmen, please continue your membership sign up journey by logging in and making a payment.
          </p>
        </div>

        {/* Form Outer Card: 2px RED TOP border as requested */}
        <div className="bg-white shadow-md border-t-2 border-safra-red p-6 sm:p-10 text-left rounded-sm relative">
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-20">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border-4 border-safra-red border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Processing...</span>
              </div>
            </div>
          )}

          {/* STREAMLINED SIGNUP CONTROL PANEL */}
          <div className="mb-8 p-5 bg-gradient-to-r from-slate-50 to-indigo-50/20 border border-slate-200/80 rounded flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 shadow-xs animate-fade-in">
            <div className="space-y-1 md:max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-indigo-600 text-indigo-50 px-2 py-0.5 rounded font-black uppercase tracking-wider">UX Optimization Tool</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">100% Client-Side</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">Configure Your Registration Flow</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We've enhanced the form with a <strong>Streamlined Guest Flow</strong> and an <strong>Optimized UI Mode</strong> to reduce tedious fields and make error validation completely intuitive. Compare them in real-time below!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              {/* Toggle 1: Form Type Scope */}
              <div className="flex flex-col gap-1.5 flex-1 sm:flex-initial">
                <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">1. Select Form Scope</span>
                <div className="inline-flex bg-slate-200 p-1 rounded-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setRegFlow('MEMBER');
                      setFormErrors({});
                      setGlobalError(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xs transition-all border-none cursor-pointer flex items-center gap-1.5 ${
                      regFlow === 'MEMBER' 
                        ? 'bg-white text-slate-900 shadow-sm font-black scale-[1.02]' 
                        : 'bg-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    🎖️ Yes, Existing SAFRA Member
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRegFlow('GUEST');
                      setFormErrors({});
                      setGlobalError(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xs transition-all border-none cursor-pointer flex items-center gap-1.5 ${
                      regFlow === 'GUEST' 
                        ? 'bg-white text-indigo-700 shadow-sm font-black scale-[1.02]' 
                        : 'bg-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    ⚡ No, New Guest Account
                  </button>
                </div>
              </div>

              {/* Toggle 2: UI Style */}
              <div className="flex flex-col gap-1.5 flex-1 sm:flex-initial">
                <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">2. Error & Prompts UI</span>
                <div className="inline-flex bg-slate-200 p-1 rounded-sm">
                  <button
                    type="button"
                    onClick={() => setUiMode('OPTIMIZED')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xs transition-all border-none cursor-pointer flex items-center gap-1 ${
                      uiMode === 'OPTIMIZED' 
                        ? 'bg-emerald-600 text-white shadow-sm font-black' 
                        : 'bg-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    ✨ Optimized UI
                  </button>
                  <button
                    type="button"
                    onClick={() => setUiMode('LEGACY')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xs transition-all border-none cursor-pointer flex items-center gap-1 ${
                      uiMode === 'LEGACY' 
                        ? 'bg-amber-600 text-white shadow-sm font-black' 
                        : 'bg-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    ⚠️ Legacy UI
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STREAMLINED SIGN UP EXPERIENCE PANEL */}
          <div className="mb-8 border-b border-gray-100 pb-8" id="signup-options-container">
            <h3 className="text-xs font-extrabold text-gray-500 tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Choose Your Registration Experience
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Option 1: Digital Shortcut Pre-fill */}
              <div className="lg:col-span-8 bg-gradient-to-r from-red-50/50 to-amber-50/20 border border-red-100/60 rounded p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-safra-red text-white text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded-sm">RECOMMENDED</span>
                    <h4 className="text-sm font-extrabold text-gray-800">Express Digital Retrieval</h4>
                  </div>
                  <p className="text-xs text-gray-500 max-w-md leading-relaxed">
                    Instantly pre-fill NRIC, Name, Date of Birth, Gender, Mobile, and SAFRA status using secure identity providers. No tedious typing required.
                  </p>
                </div>
                
                {/* Shortcut Buttons */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => handleInitiateShortcut('SINGPASS')}
                    className="flex-1 sm:flex-initial bg-red-700 hover:bg-red-800 text-white font-extrabold text-[11px] tracking-wider uppercase px-4 py-2.5 rounded shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none"
                    id="btn-shortcut-singpass"
                  >
                    <span className="bg-white text-red-700 px-1 rounded-sm text-[9px] font-black leading-none py-0.5">singpass</span>
                    Myinfo
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInitiateShortcut('GOOGLE')}
                    className="flex-1 sm:flex-initial bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-extrabold text-[11px] tracking-wider uppercase px-3.5 py-2.5 rounded shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    id="btn-shortcut-google"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.28 1.845 15.53 1 12.24 1 5.65 1 1.3 5.35 1.3 12s4.35 11 10.94 11c6.88 0 11.45-4.83 11.45-11.64 0-.78-.085-1.37-.185-1.785H12.24z"/>
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInitiateShortcut('MICROSOFT')}
                    className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-[11px] tracking-wider uppercase px-3.5 py-2.5 rounded shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none"
                    id="btn-shortcut-microsoft"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M0 0h11v11H0z"/>
                      <path fill="#80bb1a" d="M12 0h11v11H12z"/>
                      <path fill="#00a1f1" d="M0 12h11v11H0z"/>
                      <path fill="#ffb900" d="M12 12h11v11H12z"/>
                    </svg>
                    Microsoft
                  </button>
                </div>
              </div>

              {/* Option 2: Manual Entries */}
              <div className="lg:col-span-4 bg-gray-50 border border-gray-200 rounded p-4 sm:p-5 flex flex-col justify-center text-center lg:text-left">
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">Manual Credentials</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Type everything yourself. Perfect if you do not have social profiles or Singpass on hand.
                  </p>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={handleResetToManual}
                    className="text-xs font-bold text-gray-500 hover:text-safra-red underline cursor-pointer bg-transparent border-none p-0"
                  >
                    Reset and fill manually
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PREFILL SUCCESS NOTIFICATION */}
          {prefillSuccessMsg && (
            <div className="mb-8 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded flex items-start gap-3 animate-fade-in relative shadow-xs">
              <div className="flex-shrink-0 bg-emerald-600 rounded-full p-1 text-white mt-0.5">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1 text-xs sm:text-sm">
                <h4 className="font-extrabold tracking-wider uppercase text-xs">Express Auto-Fill Active</h4>
                <p className="mt-0.5 leading-normal">{prefillSuccessMsg}</p>
              </div>
              <button 
                type="button"
                onClick={() => setPrefillSuccessMsg(null)} 
                className="text-emerald-500 hover:text-emerald-700 p-1 rounded-full cursor-pointer bg-transparent border-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12" id="registration-form">
            
            {/* COLUMN 1: CUSTOMER INFORMATION */}
            <div className="space-y-6" id="column-customer-info">
              <div className="flex justify-between items-end form-section-header">
                <span>CUSTOMER INFORMATION</span>
                <span className="text-[10px] font-normal text-gray-400 lowercase italic">[*] Required fields</span>
              </div>

              <div className="space-y-5">
                {/* Email Field */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="input-label mb-0">Email <span className="required-mark">*</span></label>
                    {prefilledFields.includes('email') && (
                      <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 animate-pulse">
                        <Sparkles className="w-2.5 h-2.5" /> Prefilled ({prefillSource})
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setPrefilledFields(prev => prev.filter(f => f !== 'email'));
                    }}
                    className={`custom-input text-gray-800 text-sm transition-all ${
                      prefilledFields.includes('email') 
                        ? 'border-b-2 border-emerald-500 bg-emerald-50/20 px-2 rounded-t-sm' 
                        : ''
                    }`}
                    placeholder="e.g. jonathan@gmail.com"
                    id="reg-email"
                  />
                  {formErrors.email && <span className="text-red-500 text-[10px] italic">{formErrors.email}</span>}
                </div>

                {/* Password Field */}
                <div>
                  <label className="input-label flex justify-between items-center">
                    <span>Password <span className="required-mark">*</span></span>
                    {prefillSource !== 'NONE' && (
                      <span className="text-[9px] text-amber-600 font-bold flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" /> Create a password
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`custom-input pr-10 text-gray-800 text-sm ${isPasswordInvalid ? 'border-red-500 bg-red-50/50' : ''}`}
                      placeholder="••••••••"
                      id="reg-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none bg-transparent border-none p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {isPasswordInvalid && (
                    <span className="text-red-500 text-[10px] italic mt-1 block">
                      {formErrors.password}
                    </span>
                  )}

                  {/* Live Password Strength Tracker */}
                  {uiMode === 'OPTIMIZED' && password.length > 0 && (
                    <div className="mt-2 bg-slate-50 border border-slate-150 p-2.5 rounded text-[11px] text-slate-600 space-y-1 animate-scale-up">
                      <div className="font-extrabold uppercase text-[9px] text-slate-500 tracking-wider flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-indigo-500" /> Password strength checker
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1 font-medium">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${password.length >= 8 ? 'bg-emerald-500' : 'bg-red-400'}`}></span>
                          <span className={password.length >= 8 ? 'text-emerald-700 font-bold' : 'text-gray-400'}>8+ chars ({password.length})</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${/\d/.test(password) ? 'bg-emerald-500' : 'bg-red-400'}`}></span>
                          <span className={/\d/.test(password) ? 'text-emerald-700 font-bold' : 'text-gray-400'}>one number (0-9)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(password) ? 'bg-emerald-500' : 'bg-red-400'}`}></span>
                          <span className={/[a-z]/.test(password) ? 'text-emerald-700 font-bold' : 'text-gray-400'}>one lowercase</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(password) ? 'bg-emerald-500' : 'bg-red-400'}`}></span>
                          <span className={/[A-Z]/.test(password) ? 'text-emerald-700 font-bold' : 'text-gray-400'}>one uppercase</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Retype Password */}
                <div>
                  <label className="input-label">Retype Password <span className="required-mark">*</span></label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`custom-input pr-10 text-gray-800 text-sm ${isConfirmPasswordInvalid ? 'border-red-500 bg-red-50/50' : ''}`}
                      placeholder="••••••••"
                      id="reg-retype-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none bg-transparent border-none p-1 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {isConfirmPasswordInvalid && (
                    <span className="text-red-500 text-[10px] italic mt-1 block">
                      {formErrors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* COLUMN 2: ABOUT YOU */}
            <div className="space-y-6" id="column-about-you">
              <div className="flex justify-between items-end form-section-header">
                <span>ABOUT YOU</span>
                <span className="text-[10px] font-normal text-gray-400 lowercase italic">[*] Required fields</span>
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="input-label mb-0">Name <span className="required-mark">*</span></label>
                    {prefilledFields.includes('name') && (
                      <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 animate-pulse">
                        <Sparkles className="w-2.5 h-2.5" /> Prefilled ({prefillSource})
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setPrefilledFields(prev => prev.filter(f => f !== 'name'));
                    }}
                    className={`custom-input text-gray-800 text-sm transition-all ${
                      prefilledFields.includes('name') 
                        ? 'border-b-2 border-emerald-500 bg-emerald-50/20 px-2 rounded-t-sm font-bold' 
                        : ''
                    }`}
                    placeholder="Full name as in NRIC"
                    id="reg-name"
                  />
                </div>

                {regFlow === 'MEMBER' ? (
                  <>
                    {/* Nationality */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="input-label mb-0">Nationality <span className="required-mark">*</span></label>
                        {prefilledFields.includes('nationality') && (
                          <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 animate-pulse">
                            <Sparkles className="w-2.5 h-2.5" /> Prefilled ({prefillSource})
                          </span>
                        )}
                      </div>
                      <select
                        required={regFlow === 'MEMBER'}
                        value={nationality}
                        onChange={(e) => {
                          setNationality(e.target.value);
                          setPrefilledFields(prev => prev.filter(f => f !== 'nationality'));
                        }}
                        className={`custom-input text-gray-800 text-sm bg-transparent border-b border-gray-300 py-2 focus:border-safra-red focus:outline-none transition-all ${
                          prefilledFields.includes('nationality') 
                            ? 'border-b-2 border-emerald-500 bg-emerald-50/20 px-2 rounded-t-sm font-bold' 
                            : ''
                        }`}
                        id="reg-nationality"
                      >
                        <option value="">Select Nationality</option>
                        <option value="Singaporean">Singaporean</option>
                        <option value="Permanent Resident">Singapore PR</option>
                        <option value="Other">Foreigner / Employment Pass</option>
                      </select>
                    </div>

                    {/* Member ID */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="input-label block mb-0">Member ID <span className="required-mark">*</span></label>
                        {prefilledFields.includes('memberId') && (
                          <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 animate-pulse">
                            <Sparkles className="w-2.5 h-2.5" /> Prefilled ({prefillSource})
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required={regFlow === 'MEMBER'}
                        value={memberId}
                        onChange={(e) => {
                          setMemberId(e.target.value);
                          setPrefilledFields(prev => prev.filter(f => f !== 'memberId'));
                        }}
                        className={`custom-input text-sm transition-all ${
                          memberId === 'Forgot Member ID?' ? 'text-safra-red font-bold' : 'text-gray-800'
                        } ${
                          prefilledFields.includes('memberId') 
                            ? 'border-b-2 border-emerald-500 bg-emerald-50/20 px-2 rounded-t-sm font-bold' 
                            : ''
                        }`}
                        placeholder="e.g. S1234567A"
                        id="reg-member-id"
                      />
                      <p className="text-[10px] text-gray-500 leading-normal mt-1 bg-slate-50 p-1.5 rounded border border-slate-100">
                        💡 <strong>Where to find your Member ID:</strong> Printed on the front of your SAFRA membership card or in your SAFRA Mobile App e-Card. Matches Singapore NRIC format (e.g. S1234567A).
                      </p>
                      
                      <div className="flex flex-col gap-1 mt-1.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <button
                            type="button"
                            onClick={() => { setMemberId('Forgot Member ID?'); }}
                            className="text-safra-red font-semibold hover:underline cursor-pointer bg-transparent border-none p-0"
                          >
                            Forgot Member ID?
                          </button>
                          
                          {memberId && memberId !== 'Forgot Member ID?' && (
                            <div className="font-semibold">
                              {/^[A-Z]\d{7}[A-Z]$/i.test(memberId.trim()) ? (
                                <span className="text-emerald-600 flex items-center gap-0.5">✓ Standard Format Match</span>
                              ) : (
                                <span className="text-amber-600">Expected format: S1234567A</span>
                              )}
                            </div>
                          )}
                          
                          {memberId === 'S8123456D' && (
                            <span className="text-safra-red font-bold animate-pulse">Target Member ID Found*</span>
                          )}
                        </div>
                        {formErrors.memberId && (
                          <span className="text-red-500 text-[10px] italic font-semibold">{formErrors.memberId}</span>
                        )}
                      </div>
                    </div>

                    {/* NRIC Last 4 Characters */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="input-label mb-0">NRIC/Last 4 Characters Only <span className="required-mark">*</span></label>
                        {prefilledFields.includes('nric') && (
                          <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 animate-pulse">
                            <Sparkles className="w-2.5 h-2.5" /> Prefilled ({prefillSource})
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required={regFlow === 'MEMBER'}
                        maxLength={4}
                        value={nric}
                        onChange={(e) => {
                          setNric(e.target.value.toUpperCase());
                          setPrefilledFields(prev => prev.filter(f => f !== 'nric'));
                        }}
                        className={`custom-input text-gray-800 text-sm uppercase transition-all ${
                          prefilledFields.includes('nric') 
                            ? 'border-b-2 border-emerald-500 bg-emerald-50/20 px-2 rounded-t-sm font-bold' 
                            : ''
                        }`}
                        placeholder="e.g. 123A"
                        id="reg-nric"
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="input-label mb-0">Gender <span className="required-mark">*</span></label>
                        {prefilledFields.includes('gender') && (
                          <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 animate-pulse">
                            <Sparkles className="w-2.5 h-2.5" /> Prefilled ({prefillSource})
                          </span>
                        )}
                      </div>
                      <select
                        required={regFlow === 'MEMBER'}
                        value={gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                          setPrefilledFields(prev => prev.filter(f => f !== 'gender'));
                        }}
                        className={`custom-input text-gray-800 text-sm bg-transparent border-b border-gray-300 py-2 focus:border-safra-red focus:outline-none transition-all ${
                          prefilledFields.includes('gender') 
                            ? 'border-b-2 border-emerald-500 bg-emerald-50/20 px-2 rounded-t-sm font-bold' 
                            : ''
                        }`}
                        id="reg-gender"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="input-label mb-0">Date of Birth <span className="required-mark">*</span></label>
                        {prefilledFields.includes('dob') && (
                          <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 animate-pulse">
                            <Sparkles className="w-2.5 h-2.5" /> Prefilled ({prefillSource})
                          </span>
                        )}
                      </div>
                      <input
                        type="date"
                        required={regFlow === 'MEMBER'}
                        value={dob}
                        onChange={(e) => {
                          setDob(e.target.value);
                          setPrefilledFields(prev => prev.filter(f => f !== 'dob'));
                        }}
                        className={`custom-input text-gray-800 text-sm py-2 border-b border-gray-300 focus:border-safra-red focus:outline-none transition-all ${
                          prefilledFields.includes('dob') 
                            ? 'border-b-2 border-emerald-500 bg-emerald-50/20 px-2 rounded-t-sm font-bold' 
                            : ''
                        }`}
                        id="reg-dob"
                      />
                    </div>
                  </>
                ) : (
                  <div className="bg-indigo-50/50 border border-indigo-150 p-4 rounded text-xs text-indigo-950 space-y-2 animate-scale-up my-3">
                    <div className="font-extrabold flex items-center gap-1.5 text-indigo-800 text-[10px] uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                      Guest Bypass Active
                    </div>
                    <p className="leading-relaxed text-gray-600">
                      You are registering for a <strong>Streamlined Guest Account</strong>. We've bypassed the following SAFRA-specific fields to save your time:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10.5px] font-semibold text-indigo-900 bg-indigo-50 p-2 rounded">
                      <span className="flex items-center gap-1">❌ Nationality</span>
                      <span className="flex items-center gap-1">❌ Member ID</span>
                      <span className="flex items-center gap-1">❌ NRIC/ID</span>
                      <span className="flex items-center gap-1">❌ Gender & DOB</span>
                    </div>
                    <p className="text-[10px] text-indigo-500 font-medium italic">
                      You can toggle back to the full "Member Sign-In" flow at any time in the top panel to enter these fields.
                    </p>
                  </div>
                )}

                {/* Mobile No */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="input-label mb-0">Mobile No <span className="required-mark">*</span></label>
                    {prefilledFields.includes('mobile') && (
                      <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5 animate-pulse">
                        <Sparkles className="w-2.5 h-2.5" /> Prefilled ({prefillSource})
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className="p-2 border-b border-gray-300 text-gray-500 text-sm">+{mobileCountry}</span>
                    <input
                      type="tel"
                      required
                      value={mobileNo}
                      onChange={(e) => {
                        setMobileNo(e.target.value);
                        setPrefilledFields(prev => prev.filter(f => f !== 'mobile'));
                      }}
                      className={`custom-input text-gray-800 text-sm flex-1 transition-all ${
                        prefilledFields.includes('mobile') 
                          ? 'border-b-2 border-emerald-500 bg-emerald-50/20 px-2 rounded-t-sm font-bold' 
                          : ''
                      }`}
                      placeholder="e.g. 92887307"
                      id="reg-mobile"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 3: EMAIL ACKNOWLEDGMENT & TERMS OF USE */}
            <div className="space-y-6 flex flex-col justify-between" id="column-ack-terms">
              
              <div className="space-y-6">
                <div>
                  <div className="form-section-header">EMAIL ACKNOWLEDGEMENT</div>
                  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded border border-gray-100">
                    <input
                      type="checkbox"
                      checked={emailAck}
                      onChange={(e) => setEmailAck(e.target.checked)}
                      className="mt-1 border-gray-300 text-safra-red focus:ring-safra-red rounded"
                      id="reg-email-ack"
                    />
                    <label htmlFor="reg-email-ack" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
                      I understand that the activation email will be sent to my email address.
                    </label>
                  </div>
                </div>

                <div>
                  <div className="form-section-header">TERMS OF USE</div>
                  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded border border-gray-100 mb-6">
                    <input
                      type="checkbox"
                      checked={termsAck}
                      onChange={(e) => setTermsAck(e.target.checked)}
                      className="mt-1 border-gray-300 text-safra-red focus:ring-safra-red rounded"
                      id="reg-terms-ack"
                    />
                    <label htmlFor="reg-terms-ack" className="text-xs text-gray-600 leading-relaxed cursor-pointer select-none">
                      I hereby declare that all information provided by me is true and correct. I give consent of my personal data to be used in accordance with{' '}
                      <button 
                        type="button"
                        onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }} 
                        className="text-safra-red font-semibold underline hover:text-safra-red-dark bg-transparent border-none p-0 inline font-sans cursor-pointer"
                      >
                        SAFRA's Privacy Policy
                      </button>{' '}
                      and I agree to comply with the{' '}
                      <button 
                        type="button"
                        onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }} 
                        className="text-safra-red font-semibold underline hover:text-safra-red-dark bg-transparent border-none p-0 inline font-sans cursor-pointer"
                      >
                        mySAFRA Account Terms of Use
                      </button>.
                    </label>
                  </div>
                </div>
              </div>

              {/* RECAPTCHA BOX matching mock precisely */}
              <div className="bg-gray-50 border border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between rounded shadow-sm gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={captchaAck}
                    onChange={(e) => setCaptchaAck(e.target.checked)}
                    className="w-5 h-5 border-gray-300 text-safra-red focus:ring-safra-red rounded cursor-pointer"
                    id="reg-captcha-checkbox"
                  />
                  <label htmlFor="reg-captcha-checkbox" className="text-xs font-semibold text-gray-700 cursor-pointer select-none">
                    I'm not a robot
                  </label>
                </div>
                
                <div className="text-center flex flex-col items-center flex-shrink-0">
                  <div className="bg-white border border-gray-300 rounded px-3 py-1 text-center font-mono text-sm tracking-wider font-extrabold select-none select-all relative flex items-center gap-2">
                    <span className="text-gray-800 bg-gradient-to-r from-red-100 to-indigo-100 px-1 py-0.5 rounded italic shadow-inner">
                      {captchaCode}
                    </span>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="text-gray-400 hover:text-safra-red cursor-pointer p-0.5"
                      title="Generate new CAPTCHA"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    required={captchaAck}
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                    className="w-24 text-center text-xs border border-gray-300 rounded mt-1.5 p-0.5 uppercase tracking-wider focus:border-safra-red focus:outline-none"
                    placeholder="Enter code"
                    title="Type verification characters"
                    id="reg-captcha-text-input"
                  />
                  <span className="text-[8px] text-gray-400 block mt-1 uppercase font-bold">reCAPTCHA</span>
                </div>
              </div>

            </div>
          </form>

          {/* REGISTER ACTION BUTTON */}
          <div className="mt-12 pt-6 border-t border-gray-100 flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-safra-red hover:bg-safra-red-dark text-white px-12 py-3 uppercase font-extrabold text-xs tracking-widest rounded-sm shadow-md transition-colors cursor-pointer"
              id="registration-submit-btn"
            >
              REGISTER NOW
            </button>
          </div>

        </div>
      </section>

      {/* -------------------- HIGH FIDELITY MOCK AUTOFILL DIALOGS/MODALS -------------------- */}
      
      {/* 1. Singpass Myinfo Authorization Modal */}
      {showModal === 'SINGPASS' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden text-left animate-scale-up">
            <div className="bg-[#ED1C24] text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-sans font-black text-lg tracking-wider">singpass</span>
                <span className="text-[10px] bg-red-800 text-red-100 px-1.5 py-0.5 rounded font-bold uppercase">Myinfo API</span>
              </div>
              <button 
                type="button"
                onClick={() => setShowModal('NONE')}
                className="text-white hover:text-gray-200 cursor-pointer bg-transparent border-none p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-red-50 rounded-full text-red-700">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-base font-extrabold text-gray-800">Secure Profile Retrieval</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong>mySAFRA Portal</strong> is requesting consent to retrieve the following verified details from your government Myinfo profile to auto-complete your registration:
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded p-4 space-y-2.5">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Requested Information</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-700">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> NRIC (Last 4 chars)
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Full Name
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Nationality
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Date of Birth
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Gender
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Mobile Number
                  </div>
                </div>
              </div>

              {/* Mock QR Code Scanner */}
              <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center bg-gray-50/50">
                <div className="relative w-32 h-32 bg-white border border-gray-200 rounded flex items-center justify-center p-2 shadow-inner">
                  {/* Pulsing Scan Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-bounce opacity-80"></div>
                  {/* Simulated QR Code */}
                  <div className="grid grid-cols-6 gap-0.5 w-full h-full opacity-90">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded-xs ${
                          (i % 5 === 0 || i < 6 || i % 6 === 0 || (i > 30 && i < 36)) 
                            ? 'bg-gray-800' 
                            : 'bg-transparent'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 mt-2 font-semibold">Scan QR with Singpass App or click below</span>
              </div>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                Your credentials are authenticated directly by Singpass. SAFRA does not store your Singpass password.
              </p>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleApplyAutofill('SINGPASS')}
                  className="w-full bg-[#ED1C24] hover:bg-[#b71c1c] text-white font-extrabold text-xs tracking-wider uppercase py-3 rounded shadow transition-all cursor-pointer border-none"
                >
                  I Agree & Auto-Fill
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal('NONE')}
                  className="w-full bg-transparent hover:bg-gray-50 border border-gray-300 text-gray-500 font-bold text-xs tracking-wider uppercase py-3 rounded transition-all cursor-pointer"
                >
                  Cancel Retrieval
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Google Identity Modal */}
      {showModal === 'GOOGLE' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full border border-gray-100 overflow-hidden text-left p-6 animate-scale-up animate-fade-in">
            <div className="flex flex-col items-center text-center space-y-4">
              <svg className="w-10 h-10" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.6c-.3 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.08 3.68-5.14 3.68-8.77z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.1C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.29a7.22 7.22 0 0 1 0-4.58V6.6H1.29a11.94 11.94 0 0 0 0 10.8l3.98-3.11z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.6L5.27 9.71c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-800">Sign in with Google</h3>
                <p className="text-xs text-gray-500">to continue to SAFRA Membership Portal</p>
              </div>

              <div className="w-full border border-gray-200 rounded divide-y divide-gray-100 overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => handleApplyAutofill('GOOGLE')}
                  className="w-full p-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left cursor-pointer border-none bg-transparent"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    J
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gray-800">Jonathan Goh</div>
                    <div className="text-[10px] text-gray-500 lowercase">jonathan.goh.google@gmail.com</div>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase">Active</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyAutofill('GOOGLE')}
                  className="w-full p-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left cursor-pointer border-none bg-transparent"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gray-600">Use another account</div>
                  </div>
                </button>
              </div>

              <p className="text-[10px] text-gray-400 leading-relaxed text-center">
                To continue, Google will share your name, email address, language preference, and profile picture with SAFRA.
              </p>

              <div className="w-full pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
                <button 
                  type="button"
                  onClick={() => setShowModal('NONE')} 
                  className="hover:text-gray-700 cursor-pointer bg-transparent border-none"
                >
                  Cancel
                </button>
                <div className="flex gap-2">
                  <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">Privacy Policy</a>
                  <span>•</span>
                  <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">Terms</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Microsoft Identity Modal */}
      {showModal === 'MICROSOFT' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full border border-gray-100 overflow-hidden text-left p-6 animate-scale-up animate-fade-in">
            <div className="flex flex-col items-start space-y-4">
              <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                <div className="bg-[#f25022] w-2.5 h-2.5"></div>
                <div className="bg-[#7fba00] w-2.5 h-2.5"></div>
                <div className="bg-[#00a4ef] w-2.5 h-2.5"></div>
                <div className="bg-[#ffb900] w-2.5 h-2.5"></div>
              </div>

              <div className="space-y-1 w-full">
                <h3 className="text-lg font-bold text-gray-800">Pick an account</h3>
                <p className="text-xs text-gray-500">to continue to mySAFRA Corporate Services</p>
              </div>

              <div className="w-full space-y-2 bg-white">
                <button
                  type="button"
                  onClick={() => handleApplyAutofill('MICROSOFT')}
                  className="w-full p-3 border border-gray-200 rounded flex items-center gap-3 hover:bg-gray-50 transition-colors text-left cursor-pointer bg-transparent"
                >
                  <div className="w-8 h-8 rounded bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-xs border border-gray-200">
                    JG
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gray-800">Jonathan Goh</div>
                    <div className="text-[10px] text-gray-500">jgoh_msft@outlook.com</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyAutofill('MICROSOFT')}
                  className="w-full p-3 border border-gray-200 rounded flex items-center gap-3 hover:bg-gray-50 transition-colors text-left cursor-pointer bg-transparent"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center border border-gray-100">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gray-600">Use another account</div>
                  </div>
                </button>
              </div>

              <p className="text-[10px] text-gray-400 leading-relaxed">
                This sign in retrieves your secure corporate or personal profile credentials from Microsoft Identity Service.
              </p>

              <div className="w-full pt-4 border-t border-gray-100 flex justify-end gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setShowModal('NONE')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded cursor-pointer border-none"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. NRIC Member ID Database Lookup Modal */}
      {showLookupModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden text-left animate-scale-up">
            <div className="bg-safra-red text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-white" />
                <span className="font-extrabold text-sm tracking-wider uppercase">SAFRA Member ID Lookup</span>
              </div>
              <button 
                type="button"
                onClick={() => {
                  setShowLookupModal(false);
                  setLookupNric('');
                  setLookupResult(null);
                  setLookupError(null);
                }}
                className="text-white hover:text-gray-200 cursor-pointer bg-transparent border-none p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-800">Retrieve mySAFRA Member ID</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Enter your NRIC (e.g., S1234567A) or the last 4 characters of your NRIC (e.g., 567A) to check the SAFRA central directory and retrieve your linked Member ID.
                </p>
              </div>

              <div className="space-y-3 p-3 bg-gray-50 rounded border border-gray-150">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-gray-500 font-extrabold uppercase">Enter NRIC / Last 4 Chars</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={lookupNric}
                      onChange={(e) => setLookupNric(e.target.value.toUpperCase())}
                      placeholder="e.g. 567A or 733D"
                      className="flex-1 bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-safra-red uppercase font-semibold font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setLookupError(null);
                        setLookupResult(null);
                        if (!lookupNric.trim()) {
                          setLookupError('Please enter NRIC query.');
                          return;
                        }
                        const cleanNric = lookupNric.trim().toUpperCase();
                        if (cleanNric.includes('733D') || cleanNric.includes('733')) {
                          setLookupResult({ id: 'S8288730D', name: 'Jonathan Goh' });
                        } else if (cleanNric.includes('456D') || cleanNric.includes('456')) {
                          setLookupResult({ id: 'S8123456D', name: 'Jonathan Goh' });
                        } else {
                          setLookupError('No matching membership found for this NRIC. Try using "733D" or "456D" for testing!');
                        }
                      }}
                      className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-3.5 py-1.5 rounded cursor-pointer border-none uppercase tracking-wider"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {lookupError && (
                  <p className="text-[10px] text-red-500 font-semibold bg-red-50 p-2 rounded border border-red-100">
                    ⚠️ {lookupError}
                  </p>
                )}

                {lookupResult && (
                  <div className="bg-emerald-50 border border-emerald-150 p-3 rounded space-y-2 animate-scale-up">
                    <p className="text-[11px] text-emerald-800 font-medium">
                      ✨ <strong>Record Found!</strong> We found a matching SAFRA Membership linked to this NRIC.
                    </p>
                    <div className="bg-white p-2 rounded border border-emerald-100 text-[11px] text-gray-700 font-mono space-y-1">
                      <div><span className="text-[10px] text-gray-400 font-extrabold">MEMBER NAME:</span> <strong className="text-gray-900">{lookupResult.name}</strong></div>
                      <div><span className="text-[10px] text-gray-400 font-extrabold">MEMBER ID:</span> <strong className="text-indigo-700">{lookupResult.id}</strong></div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setMemberId(lookupResult.id);
                        setName(lookupResult.name);
                        setNric(lookupNric.length === 4 ? lookupNric : lookupNric.slice(-4));
                        setShowLookupModal(false);
                        setLookupNric('');
                        setLookupResult(null);
                        setLookupError(null);
                        setPrefillSuccessMsg(`✨ Member ID ${lookupResult.id} retrieved and applied to form!`);
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] py-2 rounded cursor-pointer border-none uppercase tracking-wider text-center"
                    >
                      Apply and Autocomplete Form
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-[10px]">
                <span className="text-slate-400 italic">Simulated Central Directory Lookup</span>
                <button
                  type="button"
                  onClick={() => {
                    setShowLookupModal(false);
                    setLookupNric('');
                    setLookupResult(null);
                    setLookupError(null);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded cursor-pointer border-none uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SAFRA Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full border border-gray-100 overflow-hidden text-left animate-scale-up">
            <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
              <span className="font-extrabold text-xs uppercase tracking-wider">SAFRA's Privacy Policy</span>
              <button 
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="text-white hover:text-gray-200 cursor-pointer bg-transparent border-none p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-xs text-gray-600 max-h-[60vh] overflow-y-auto leading-relaxed">
              <h4 className="font-extrabold text-gray-800 text-sm">Personal Data Protection at SAFRA</h4>
              <p>
                In compliance with the Personal Data Protection Act (PDPA), SAFRA is committed to safeguarding your personal data. The information collected here is purely for membership verification, online account authorization, and updates.
              </p>
              <h5 className="font-bold text-gray-800">1. Collection and Usage</h5>
              <p>
                We collect your Name, NRIC (last 4 characters for security), Mobile, and Email to create a secure login. If you choose our secure express retrieval methods (Singpass, Google, Microsoft), these are governed by secure OAuth guidelines.
              </p>
              <h5 className="font-bold text-gray-800">2. Security Measures</h5>
              <p>
                Your password is salted, hashed, and never shared. We do not sell your personal details to third-party entities.
              </p>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="bg-slate-700 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded cursor-pointer border-none text-[11px] uppercase tracking-wider"
              >
                Close Privacy Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. mySAFRA Terms of Use Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full border border-gray-100 overflow-hidden text-left animate-scale-up">
            <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
              <span className="font-extrabold text-xs uppercase tracking-wider">mySAFRA Account Terms of Use</span>
              <button 
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="text-white hover:text-gray-200 cursor-pointer bg-transparent border-none p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-xs text-gray-600 max-h-[60vh] overflow-y-auto leading-relaxed">
              <h4 className="font-extrabold text-gray-800 text-sm">Terms of Use Agreement</h4>
              <p>
                By creating a mySAFRA online account, you agree to comply with all rules and bylaws set by SAFRA.
              </p>
              <h5 className="font-bold text-gray-800">1. Account Responsibility</h5>
              <p>
                You are responsible for maintaining the confidentiality of your account password. You agree to notify SAFRA immediately of any unauthorized use.
              </p>
              <h5 className="font-bold text-gray-800">2. Accuracy of Information</h5>
              <p>
                All information entered during sign-up must be accurate and authentic. Falsifying details may result in account termination.
              </p>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="bg-slate-700 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded cursor-pointer border-none text-[11px] uppercase tracking-wider"
              >
                I Understand & Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
