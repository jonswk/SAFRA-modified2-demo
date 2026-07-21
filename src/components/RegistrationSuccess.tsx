import React from 'react';
import { CheckCircle, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { ViewState } from '../types';

interface RegistrationSuccessProps {
  email: string;
  name: string;
  onNavigate: (view: ViewState) => void;
  onActivate: () => void;
}

export default function RegistrationSuccess({ email, name, onNavigate, onActivate }: RegistrationSuccessProps) {
  return (
    <div className="bg-gray-100 flex-1 flex flex-col py-12 px-4 text-left" id="reg-success-root">
      <div className="max-w-3xl mx-auto w-full bg-white shadow-lg rounded-sm overflow-hidden border-t-4 border-emerald-500">
        
        {/* Main Banner */}
        <div className="p-8 sm:p-10 text-center bg-emerald-50 border-b border-emerald-100">
          <div className="mx-auto w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-4 shadow-sm animate-bounce">
            <CheckCircle className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
            Account Created Successfully!
          </h2>
          <p className="text-sm text-gray-600 mt-2 max-w-lg mx-auto">
            Welcome to the SAFRA family, <span className="font-bold text-gray-800 capitalize">{name || 'Jonathan'}</span>. Your temporary membership profile has been generated in the system.
          </p>
        </div>

        {/* Informative Instructions */}
        <div className="p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded border border-gray-200">
              <h3 className="font-bold text-sm text-gray-800 uppercase mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-safra-red" />
                <span>Next Step: Activation</span>
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We have dispatched an activation link to <span className="font-semibold text-gray-800">{email || 'jonathang@gmail.com'}</span>. Please open the email and click the confirmation button within 24 hours to active your credentials.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded border border-gray-200">
              <h3 className="font-bold text-sm text-gray-800 uppercase mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Make Payment later</span>
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                If you are signing up for a paid SAFRA NSman or Associate Membership, you can make safe cashless payments later by logging into your dashboard after activation.
              </p>
            </div>
          </div>

          {/* Interactive Simulation Panel */}
          <div className="bg-slate-900 text-slate-100 p-6 rounded shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                <span className="text-[10px] text-slate-400 font-mono ml-2 uppercase font-bold tracking-wider">Simulated mySAFRA Mailbox</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">1 minute ago</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <div><span className="text-slate-400 font-bold">From:</span> membership@safra.sg</div>
                <div><span className="text-slate-400 font-bold">To:</span> {email || 'jonathang@gmail.com'}</div>
                <div><span className="text-slate-400 font-bold">Subject:</span> Action Required: Activate your mySAFRA Portal Account</div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-3 leading-relaxed text-slate-300">
                <p>Dear {name || 'Jonathan'},</p>
                <p>
                  Thank you for registering a mySAFRA account online. Please click the button below to confirm your email and activate your account:
                </p>

                {/* Simulated confirmation button */}
                <div className="py-2 text-center sm:text-left">
                  <button
                    onClick={onActivate}
                    className="bg-safra-red hover:bg-safra-red-dark text-white font-black px-6 py-2.5 rounded-sm shadow hover:shadow-lg transition-all inline-flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
                    id="activation-email-btn"
                  >
                    <span>Activate mySAFRA Account</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[10px] text-slate-400">
                  If the button above does not work, copy and paste this activation link in your web browser: <br />
                  <span className="underline break-all text-indigo-400">https://safra.sg/activate?token=9d9a0acb5fc74fde&email={encodeURIComponent(email || 'jonathang@gmail.com')}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Fallback navigation option */}
          <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>Didn't receive the activation email? Check your junk folder or contact us.</span>
            <button
              onClick={() => onNavigate('LANDING')}
              className="text-safra-red font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              id="back-to-home-link"
            >
              <span>Back to SAFRA Homepage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
