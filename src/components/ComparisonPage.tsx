import React, { useState } from 'react';
import { 
  ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, 
  Eye, EyeOff, User, Lock, HelpCircle, ArrowLeftRight, Landmark,
  Smartphone, BadgeInfo, Info, Zap, ChevronRight
} from 'lucide-react';
import { ViewState } from '../types';

interface ComparisonPageProps {
  onNavigate: (view: ViewState) => void;
}

export default function ComparisonPage({ onNavigate }: ComparisonPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'tedious' | 'password' | 'memberid'>('all');

  return (
    <div className="bg-slate-50 flex-1 py-8 px-4 sm:px-6 lg:px-8 text-left" id="comparison-page-root">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <span className="cursor-pointer hover:text-safra-red" onClick={() => onNavigate('LANDING')}>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-safra-red">UX Audit & Comparison</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
              <span className="p-1.5 bg-safra-red text-white rounded">
                <ArrowLeftRight className="w-6 h-6" />
              </span>
              UX Audit: Legacy vs. Upgraded Portal
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Applying Nielsen's Usability Heuristics to resolve friction, eliminate registration traps, and streamline Singaporean citizen onboarding.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('REGISTER_EMPTY')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded shadow-sm transition-all"
            >
              Try Empty Form
            </button>
            <button
              onClick={() => onNavigate('REGISTER_SINGPASS')}
              className="bg-safra-red hover:bg-safra-red-dark text-white font-bold text-xs uppercase px-4 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-white" /> Try Singpass
            </button>
          </div>
        </div>

        {/* Executive Overview Panel (Preserved Context) */}
        <div className="bg-slate-900 text-slate-100 rounded-lg p-6 shadow-md border-l-4 border-safra-red">
          <h2 className="text-lg font-black uppercase tracking-wider text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" /> Executive Design Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-5xl">
            Our redesigned SAFRA registration system addresses long-standing citizen onboarding issues by implementing highly secure Singpass authorization, decoupling unnecessary legacy validation rules, and giving clear visual guidance to the end user. Below is an exhaustive heuristic teardown pairing side-by-side screen mockups with specific recommendations mapped to Nielsen's 10 Usability Heuristics.
          </p>
        </div>

        {/* View Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-1">
          {[
            { id: 'all', label: '🔎 View All Issues' },
            { id: 'tedious', label: '1. Tedious Form' },
            { id: 'password', label: '2. Password Requirements' },
            { id: 'memberid', label: '3. Optional Member ID Trap' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-t-md transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white border-t-2 border-safra-red text-safra-red shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ISSUE 1: Tedious Sign-Up Process */}
        {(activeTab === 'all' || activeTab === 'tedious') && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden space-y-6 p-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-extrabold bg-red-100 text-red-800 px-2 py-0.5 rounded uppercase tracking-wider">Issue #1</span>
              <h3 className="text-lg font-black text-slate-900 mt-2 uppercase tracking-tight">
                Tedious Sign-Up & Extensive Manual Onboarding
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Users are required to manually fill in dozens of private registry fields, resulting in fatigue and incorrect submissions.
              </p>
            </div>

            {/* Heuristic Explanation Card */}
            <div className="bg-amber-50/40 border border-amber-200 rounded p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-amber-800 font-extrabold uppercase tracking-wide text-[11px]">
                <BadgeInfo className="w-4 h-4 text-amber-700" />
                Heuristic Application: Heuristic #7 - Flexibility & Efficiency of Use
              </div>
              <p className="text-slate-700 leading-relaxed">
                By integrating a simulated <strong className="text-amber-950">Singpass 1-Click Prefill</strong>, the system dramatically optimizes the workflow for expert and novice citizens alike. With a single authentication tap, we auto-retrieve and validate 7 core registry fields securely (Email, Name, Nationality, NRIC last 4, Gender, DOB, Mobile). We also applied <strong className="text-amber-950">Heuristic #8: Aesthetic & Minimalist Design</strong>, splitting the layout into a clean 3-column wizard and introducing distinct "Existing SAFRA Member" vs "New Guest Account" tabs to hide unnecessary inputs.
              </p>
            </div>

            {/* Side by Side Renders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              
              {/* OLD MOCKUP - Screen Capture */}
              <div className="border border-red-200 rounded-lg overflow-hidden bg-red-50/10 shadow-sm relative">
                <div className="bg-red-950 text-white text-xs font-black px-4 py-2.5 uppercase tracking-wide flex justify-between items-center">
                  <span>❌ Legacy Portal: Manual Nightmare</span>
                  <span className="bg-red-800 text-[10px] px-2 py-0.5 rounded">No Prefill</span>
                </div>
                
                {/* Visual mockup representation */}
                <div className="p-4 space-y-4 opacity-75 select-none pointer-events-none">
                  <div className="border border-red-200 rounded p-3 bg-red-50/50 space-y-1.5 text-red-900 text-[10px]">
                    <p className="font-bold">🚨 Issues Highlighted:</p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>Total manual keyboard entry required for 12 separate inputs.</li>
                      <li>No central identity gateway resulting in heavy manual spelling mistakes.</li>
                      <li>Inconvenient country and area code dropdowns are easy to misclick.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="w-20 h-3 bg-red-200 rounded mb-1"></div>
                      <div className="w-full h-8 bg-red-50 border border-red-200 rounded text-xs px-2 flex items-center text-red-900">
                        [Keyboard Entry Required] Enter Full Name...
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="w-24 h-3 bg-red-200 rounded mb-1"></div>
                        <div className="w-full h-8 bg-red-50 border border-red-200 rounded text-xs px-2 flex items-center text-red-900">
                          [Keyboard Entry] NRIC...
                        </div>
                      </div>
                      <div>
                        <div className="w-20 h-3 bg-red-200 rounded mb-1"></div>
                        <div className="w-full h-8 bg-red-50 border border-red-200 rounded text-xs px-2 flex items-center text-red-900">
                          [Manual Date Select]
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="w-16 h-3 bg-red-200 rounded mb-1"></div>
                        <div className="w-full h-8 bg-red-50 border border-red-200 rounded text-xs px-2 flex items-center text-red-900">
                          [Keyboard Entry] Email...
                        </div>
                      </div>
                      <div>
                        <div className="w-20 h-3 bg-red-200 rounded mb-1"></div>
                        <div className="w-full h-8 bg-red-50 border border-red-200 rounded text-xs px-2 flex items-center text-red-900">
                          [Keyboard Entry] Mobile No...
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full py-2.5 bg-red-200 text-red-800 text-center font-bold rounded-sm text-xs mt-4">
                    SUBMIT REGISTRATION (Manual Verification Pending)
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 border-4 border-red-600 bg-white/95 text-red-600 font-black px-4 py-2 rounded text-sm tracking-wider uppercase shadow-lg select-none">
                  Friction-Heavy (100% Manual)
                </div>
              </div>

              {/* NEW IMPROVED MOCKUP - Screen Capture */}
              <div className="border border-emerald-200 rounded-lg overflow-hidden bg-emerald-50/10 shadow-sm relative">
                <div className="bg-emerald-950 text-white text-xs font-black px-4 py-2.5 uppercase tracking-wide flex justify-between items-center">
                  <span>🚀 Upgraded Portal: 1-Click Singpass</span>
                  <span className="bg-emerald-600 text-[10px] px-2 py-0.5 rounded flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5 text-yellow-300" /> Active Simulation
                  </span>
                </div>

                {/* Visual mockup representation */}
                <div className="p-4 space-y-4">
                  <div className="border border-emerald-200 rounded p-3 bg-emerald-50/50 space-y-1 text-emerald-900 text-[10px]">
                    <p className="font-bold text-emerald-950 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" /> Redesigned Experience Features:
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>Singpass authorization button pulls all 7 verified registry fields instantly.</li>
                      <li>Spacious 3-column layout provides visual compartmentalization.</li>
                      <li>Toggle tabs instantly hide/display fields relevant to member vs guest paths.</li>
                    </ul>
                  </div>

                  <div className="bg-slate-900 rounded p-3 flex flex-col items-center justify-between gap-2 border border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-16 bg-red-600 rounded flex items-center justify-center text-[10px] text-white font-black">
                        singpass
                      </div>
                      <span className="text-[10px] text-slate-300 font-semibold">Retrieve Verified Personal Details</span>
                    </div>
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-900/50 animate-pulse">
                      ⚡ Simulated Active Session
                    </span>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[9px] font-bold uppercase">Name (From Singpass)</span>
                        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded px-2.5 py-1.5 font-bold flex items-center justify-between">
                          <span>JONATHAN GOH WEI JIE</span>
                          <span className="text-[9px] bg-emerald-200 text-emerald-800 px-1 rounded">Prefilled</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] font-bold uppercase">Nationality</span>
                        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded px-2.5 py-1.5 font-bold flex items-center justify-between">
                          <span>Singaporean</span>
                          <span className="text-[9px] bg-emerald-200 text-emerald-800 px-1 rounded">Prefilled</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[9px] font-bold uppercase">NRIC Last 4</span>
                        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded px-2.5 py-1.5 font-bold flex items-center justify-between">
                          <span>567A</span>
                          <span className="text-[9px] bg-emerald-200 text-emerald-800 px-1 rounded">Prefilled</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] font-bold uppercase">Mobile Number</span>
                        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded px-2.5 py-1.5 font-bold flex items-center justify-between">
                          <span>+65 91234567</span>
                          <span className="text-[9px] bg-emerald-200 text-emerald-800 px-1 rounded">Prefilled</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-emerald-600 text-white font-black text-[10px] px-2.5 py-1 rounded shadow uppercase tracking-wider">
                  Saves 3.5 Minutes
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ISSUE 2: Password Requirements Inconsistency */}
        {(activeTab === 'all' || activeTab === 'password') && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden space-y-6 p-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-extrabold bg-red-100 text-red-800 px-2 py-0.5 rounded uppercase tracking-wider">Issue #2</span>
              <h3 className="text-lg font-black text-slate-900 mt-2 uppercase tracking-tight">
                Inconsistent Password Requirements & Lack of Visibility
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                The legacy portal prompt claimed passwords require 6 characters, but the backend linter failed unless 8 characters were typed. No eye icon was provided to review typos.
              </p>
            </div>

            {/* Heuristic Explanation Card */}
            <div className="bg-amber-50/40 border border-amber-200 rounded p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-amber-800 font-extrabold uppercase tracking-wide text-[11px]">
                <BadgeInfo className="w-4 h-4 text-amber-700" />
                Heuristic Application: Heuristic #5 - Error Prevention & Heuristic #10 - Help and Documentation
              </div>
              <p className="text-slate-700 leading-relaxed">
                We resolved this critical friction point by enforcing the <strong className="text-amber-950">standardized 8-character rule</strong> across all UI text blocks, eliminating conflicting instruction states. In addition, we introduced an <strong className="text-amber-950">Interactive Password Strength Checklist</strong> (<strong className="text-amber-950">Heuristic #10</strong>) that validates requirements in real-time as the user types, and incorporated <strong className="text-amber-950">Password Eye Toggles (Show/Hide)</strong> to prevent accidental registration submission failure.
              </p>
            </div>

            {/* Side by Side Renders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              
              {/* OLD MOCKUP - Screen Capture */}
              <div className="border border-red-200 rounded-lg overflow-hidden bg-red-50/10 shadow-sm relative">
                <div className="bg-red-950 text-white text-xs font-black px-4 py-2.5 uppercase tracking-wide flex justify-between items-center">
                  <span>❌ Legacy Portal: Inconsistent Prompt & Hidden Characters</span>
                  <span className="bg-red-800 text-[10px] px-2 py-0.5 rounded">No Feedback</span>
                </div>
                
                {/* Visual mockup representation */}
                <div className="p-4 space-y-4 opacity-75 select-none pointer-events-none text-left">
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-1">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="w-full h-8 bg-red-50 border border-red-300 rounded text-xs px-2 flex items-center text-slate-800">
                          ••••••
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-500 mt-1 block">
                        (Minimum 6 characters required)
                      </span>
                    </div>

                    <div className="p-2.5 bg-red-50 border-l-4 border-red-500 text-red-900 text-[10px] font-bold rounded">
                      ⚠️ Registration Failed: Password must be at least 8 characters long and contain at least 1 number, 1 uppercase, and 1 special symbol.
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 border-4 border-red-600 bg-white/95 text-red-600 font-black px-4 py-2 rounded text-sm tracking-wider uppercase shadow-lg select-none">
                  Conflicting Instructions
                </div>
              </div>

              {/* NEW IMPROVED MOCKUP - Screen Capture */}
              <div className="border border-emerald-200 rounded-lg overflow-hidden bg-emerald-50/10 shadow-sm relative">
                <div className="bg-emerald-950 text-white text-xs font-black px-4 py-2.5 uppercase tracking-wide flex justify-between items-center">
                  <span>🚀 Upgraded Portal: Real-Time Verification Checklist</span>
                  <span className="bg-emerald-600 text-[10px] px-2 py-0.5 rounded flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5 text-white" /> Checked
                  </span>
                </div>

                {/* Visual mockup representation */}
                <div className="p-4 space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">
                      Choose Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="w-full h-8 bg-white border border-emerald-500 rounded text-xs px-2.5 flex items-center justify-between text-slate-800">
                        <span className="font-mono font-bold tracking-widest text-emerald-800 text-xs">Jg#912345</span>
                        <Eye className="w-4 h-4 text-emerald-600 cursor-pointer" />
                      </div>
                    </div>

                    {/* Interactive Indicators */}
                    <div className="mt-2.5 bg-emerald-50/50 rounded border border-emerald-100 p-2.5 space-y-1.5 text-[10px]">
                      <p className="font-extrabold text-emerald-900">Password Requirements Checklist:</p>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                        <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ✓ Min 8 Characters
                        </span>
                        <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ✓ Contains Capital Letter
                        </span>
                        <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ✓ Contains Number (0-9)
                        </span>
                        <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ✓ Special Character (#$@)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-2 right-2 bg-emerald-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded">
                  Active Validator
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ISSUE 3: Optional Member ID Validation Trap */}
        {(activeTab === 'all' || activeTab === 'memberid') && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden space-y-6 p-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-extrabold bg-red-100 text-red-800 px-2 py-0.5 rounded uppercase tracking-wider">Issue #3</span>
              <h3 className="text-lg font-black text-slate-900 mt-2 uppercase tracking-tight">
                Optional Member ID Validation Trap & Cryptic System Crash Banners
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                The input was labeled "Optional", but submitting the form without it resulted in an error instructing users to "Contact the administrator" due to hidden backend requirements.
              </p>
            </div>

            {/* Heuristic Explanation Card */}
            <div className="bg-amber-50/40 border border-amber-200 rounded p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-amber-800 font-extrabold uppercase tracking-wide text-[11px]">
                <BadgeInfo className="w-4 h-4 text-amber-700" />
                Heuristic Application: Heuristic #9 - Help Users Recognize, Diagnose, and Recover from Errors
              </div>
              <p className="text-slate-700 leading-relaxed">
                We resolved this trap using three steps to honor <strong className="text-amber-950">Heuristic #9</strong> and <strong className="text-amber-950">Heuristic #1: Visibility of System Status</strong>: (a) We decoupled the validation in the form processor so the Member ID is <strong className="text-amber-950">truly optional</strong> for guests, preventing cryptic registration blocks; (b) We added a clear and distinctive <strong className="text-amber-950">"(Optional)" subtitle label</strong> instead of confusing asterisks; and (c) If a system error ever actually occurs, the top warning banner explicitly diagnoses the cause and directs the user to help resources instead of triggering a dead-end loop.
              </p>
            </div>

            {/* Side by Side Renders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              
              {/* OLD MOCKUP - Screen Capture */}
              <div className="border border-red-200 rounded-lg overflow-hidden bg-red-50/10 shadow-sm relative">
                <div className="bg-red-950 text-white text-xs font-black px-4 py-2.5 uppercase tracking-wide flex justify-between items-center">
                  <span>❌ Legacy Portal: Optional Label with Hidden Blocks</span>
                  <span className="bg-red-800 text-[10px] px-2 py-0.5 rounded">Validation Trap</span>
                </div>
                
                {/* Visual mockup representation */}
                <div className="p-4 space-y-4 opacity-75 select-none pointer-events-none text-left">
                  {/* Cryptic Global Banner */}
                  <div className="bg-red-600 text-white p-3 rounded text-[11px] font-bold leading-normal shadow">
                    ❌ Failed to register. Error: Unable to create online account. For further assistance, please email to membership@safra.sg.
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">
                      Member ID <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="w-full h-8 bg-red-50 border border-slate-300 rounded text-xs px-2 flex items-center text-slate-400 italic">
                      [Left Blank by User]
                    </div>
                  </div>

                  <p className="text-[10px] text-red-600 font-bold italic">
                    ⚠️ Fatal System Crash: User is trapped. Under-the-hood validation requires a Member ID even though labeled "Optional"!
                  </p>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 border-4 border-red-600 bg-white/95 text-red-600 font-black px-4 py-2 rounded text-sm tracking-wider uppercase shadow-lg select-none">
                  Hidden Validation Rule
                </div>
              </div>

              {/* NEW IMPROVED MOCKUP - Screen Capture */}
              <div className="border border-emerald-200 rounded-lg overflow-hidden bg-emerald-50/10 shadow-sm relative">
                <div className="bg-emerald-950 text-white text-xs font-black px-4 py-2.5 uppercase tracking-wide flex justify-between items-center">
                  <span>🚀 Upgraded Portal: Transparent Validation & Choice</span>
                  <span className="bg-emerald-600 text-[10px] px-2 py-0.5 rounded flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5 text-white" /> Honest UX
                  </span>
                </div>

                {/* Visual mockup representation */}
                <div className="p-4 space-y-4">
                  {/* Dynamic Tabs represent user choices */}
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded border border-slate-200">
                    <div className="text-[10px] text-center font-bold bg-white text-slate-800 p-1.5 rounded shadow-sm">
                      🎖️ Existing SAFRA Member
                    </div>
                    <div className="text-[10px] text-center font-bold text-slate-500 p-1.5">
                      ⚡ New Guest Account
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-bold text-slate-700 block mb-0">
                        Member ID <span className="text-gray-400 font-normal text-[9px]">(Optional for Guests)</span>
                      </label>
                      <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        ✓ Bypasses Backend Validation
                      </span>
                    </div>
                    <div className="w-full h-8 bg-white border border-slate-300 rounded text-xs px-2.5 flex items-center text-slate-800">
                      <span className="text-slate-400">e.g. S1234567A (Bypassed if guest)</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-2 rounded text-[10px] text-slate-600 leading-normal">
                    💡 <strong>Where to find:</strong> Printed on your membership card or SAFRA Mobile App e-Card. Left blank? No problem! Registered as a guest account successfully.
                  </div>
                </div>

                <div className="absolute top-2 right-2 bg-emerald-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded">
                  Trap Fixed
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Back to Home Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => onNavigate('LANDING')}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase px-8 py-3.5 rounded-sm tracking-wide shadow transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Landmark className="w-4 h-4" /> Return to SAFRA Portal Landing Page
          </button>
        </div>

      </div>
    </div>
  );
}
