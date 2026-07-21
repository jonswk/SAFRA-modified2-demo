import React, { useState, useEffect } from 'react';
import { ShieldCheck, HelpCircle, AlertCircle, X, RefreshCw } from 'lucide-react';
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

  // When view changes from Demo toolbar, populate appropriate mock values
  useEffect(() => {
    setGlobalError(null);
    setFormErrors({});
    
    if (currentView === 'REGISTER_PW_ERROR') {
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
        password: 'Minimum 6 characters',
        confirmPassword: 'Password not matched'
      });
      setGlobalError(
        'Failed to register. Error: Password length is at least 8, contains at least one digit and contains at least one lower case and one upper case alphabet - at LogicLayer.PortalSubsystem.PortalUserRegistration.Register(UserInfo user, SAFRAMemberService.SOL.RegisterUserRequest request)'
      );
    } else if (currentView === 'REGISTER_SYS_ERROR') {
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
      if (!nationality) errors.nationality = 'Nationality is required';
      if (!nric) errors.nric = 'NRIC last 4 chars is required';
      if (!gender) errors.gender = 'Gender is required';
      if (!dob) errors.dob = 'Date of birth is required';
      if (!mobileNo) errors.mobile = 'Mobile number is required';

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setGlobalError('Please fill out all the required fields indicated with a red asterisk (*)');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Check if membership ID is empty/not entered
      if (!memberId || !memberId.trim()) {
        setGlobalError(
          'Failed to register. Error: Unable to create online account. For further assistance, please email to membership@safra.sg.'
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 2. Complex Password validation
      const hasDigit = /\d/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const isLengthValid = password.length >= 6;

      if (!isLengthValid || !hasDigit || !hasLower || !hasUpper) {
        errors.password = 'Minimum 6 characters';
        setFormErrors(errors);
        setGlobalError(
          'Failed to register. Error: Password length is at least 8, contains at least one digit and contains at least one lower case and one upper case alphabet - at LogicLayer.PortalSubsystem.PortalUserRegistration.Register(UserInfo user, SAFRAMemberService.SOL.RegisterUserRequest request)'
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 3. Confirm Password Match check
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Password not matched';
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
          className="bg-safra-red text-white p-4 flex items-start gap-3 shadow-lg z-30 animate-fade-in relative text-left" 
          id="registration-error-banner"
        >
          <div className="flex-shrink-0 bg-white rounded-full p-1 mt-0.5">
            <AlertCircle className="h-5 w-5 text-safra-red" />
          </div>
          <div className="flex-1 text-xs sm:text-sm">
            <h4 className="font-extrabold tracking-wider uppercase">ERROR</h4>
            <p className="leading-relaxed leading-normal mt-0.5">
              {globalError}
            </p>
          </div>
          <button 
            onClick={() => setGlobalError(null)} 
            className="text-white hover:text-gray-200 p-1 rounded-full cursor-pointer"
            id="error-banner-close"
          >
            <X className="h-5 w-5" />
          </button>
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
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Processing Registration...</span>
              </div>
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
                  <label className="input-label">Email <span className="required-mark">*</span></label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="custom-input text-gray-800 text-sm"
                    placeholder="e.g. jonathan@gmail.com"
                    id="reg-email"
                  />
                  {formErrors.email && <span className="text-red-500 text-[10px] italic">{formErrors.email}</span>}
                </div>

                {/* Password Field */}
                <div>
                  <label className="input-label">Password <span className="required-mark">*</span></label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`custom-input text-gray-800 text-sm ${isPasswordInvalid ? 'border-red-500 bg-red-50/50' : ''}`}
                    placeholder="••••••••"
                    id="reg-password"
                  />
                  {isPasswordInvalid && (
                    <span className="text-red-500 text-[10px] italic mt-1 block">
                      {formErrors.password}
                    </span>
                  )}
                </div>

                {/* Retype Password */}
                <div>
                  <label className="input-label">Retype Password <span className="required-mark">*</span></label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`custom-input text-gray-800 text-sm ${isConfirmPasswordInvalid ? 'border-red-500 bg-red-50/50' : ''}`}
                    placeholder="••••••••"
                    id="reg-retype-password"
                  />
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
                  <label className="input-label">Name <span className="required-mark">*</span></label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="custom-input text-gray-800 text-sm"
                    placeholder="Full name as in NRIC"
                    id="reg-name"
                  />
                </div>

                {/* Nationality */}
                <div>
                  <label className="input-label">Nationality <span className="required-mark">*</span></label>
                  <select
                    required
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="custom-input text-gray-800 text-sm bg-transparent border-b border-gray-300 py-2 focus:border-safra-red focus:outline-none"
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
                  <label className="input-label block">Member ID (For SAFRA Members Only)</label>
                  <input
                    type="text"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className={`custom-input text-sm ${memberId === 'Forgot Member ID?' ? 'text-safra-red font-bold' : 'text-gray-800'}`}
                    placeholder="Enter SAFRA Member ID (optional)"
                    id="reg-member-id"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <button
                      type="button"
                      onClick={() => { setMemberId('Forgot Member ID?'); }}
                      className="text-[10px] text-safra-red font-semibold hover:underline block"
                    >
                      Forgot Member ID?
                    </button>
                    {memberId === 'S8123456D' && (
                      <span className="text-[10px] text-safra-red font-bold">Target Member ID*</span>
                    )}
                  </div>
                </div>

                {/* NRIC Last 4 Characters */}
                <div>
                  <label className="input-label">NRIC/Last 4 Characters Only <span className="required-mark">*</span></label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={nric}
                    onChange={(e) => setNric(e.target.value.toUpperCase())}
                    className="custom-input text-gray-800 text-sm uppercase"
                    placeholder="e.g. 123A"
                    id="reg-nric"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="input-label">Gender <span className="required-mark">*</span></label>
                  <select
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="custom-input text-gray-800 text-sm bg-transparent border-b border-gray-300 py-2 focus:border-safra-red focus:outline-none"
                    id="reg-gender"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="input-label">Date of Birth <span className="required-mark">*</span></label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="custom-input text-gray-800 text-sm py-2 border-b border-gray-300 focus:border-safra-red focus:outline-none"
                    id="reg-dob"
                  />
                </div>

                {/* Mobile No */}
                <div>
                  <label className="input-label">Mobile No <span className="required-mark">*</span></label>
                  <div className="flex gap-2">
                    <span className="p-2 border-b border-gray-300 text-gray-500 text-sm">+{mobileCountry}</span>
                    <input
                      type="tel"
                      required
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                      className="custom-input text-gray-800 text-sm flex-1"
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
                      <a 
                        href="#privacy" 
                        onClick={(e) => { e.preventDefault(); alert("SAFRA Privacy Policy Details..."); }} 
                        className="text-safra-red font-semibold underline hover:text-safra-red-dark"
                      >
                        SAFRA's Privacy Policy
                      </a>{' '}
                      and I agree to comply with the{' '}
                      <a 
                        href="#terms" 
                        onClick={(e) => { e.preventDefault(); alert("mySAFRA Account Terms..."); }} 
                        className="text-safra-red font-semibold underline hover:text-safra-red-dark"
                      >
                        mySAFRA Account Terms of Use
                      </a>.
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
    </div>
  );
}
