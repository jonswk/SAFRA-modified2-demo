import React from 'react';
import { Layers, CheckCircle2, ShieldAlert, FileText, Landmark, UserCheck } from 'lucide-react';
import { ViewState } from '../types';

interface DemoToolbarProps {
  currentView: ViewState;
  onSelectView: (view: ViewState) => void;
}

export default function DemoToolbar({ currentView, onSelectView }: DemoToolbarProps) {
  const options: { value: ViewState; label: string; icon: any; color: string; desc: string }[] = [
    {
      value: 'LANDING',
      label: '1. Landing / Login Page',
      icon: Landmark,
      color: 'bg-slate-800 text-white hover:bg-slate-700',
      desc: 'Hero slider, login panel & lifestyle grid'
    },
    {
      value: 'REGISTER_EMPTY',
      label: '2. Register Form',
      icon: FileText,
      color: 'bg-blue-600 text-white hover:bg-blue-500',
      desc: 'Interactive blank 3-column registration'
    },
    {
      value: 'REGISTER_PW_ERROR',
      label: '3. Password Error State',
      icon: ShieldAlert,
      color: 'bg-amber-600 text-white hover:bg-amber-500',
      desc: 'Mockup 3: Detailed complexity error guidelines'
    },
    {
      value: 'REGISTER_SYS_ERROR',
      label: '4. System Error State',
      icon: ShieldAlert,
      color: 'bg-rose-700 text-white hover:bg-rose-600',
      desc: 'Mockup 1: "Unable to create online account" top banner'
    },
    {
      value: 'REGISTER_SUCCESS',
      label: '5. Success Screen',
      icon: CheckCircle2,
      color: 'bg-emerald-600 text-white hover:bg-emerald-500',
      desc: 'Clean signup success, instructions & mock email'
    },
    {
      value: 'MEMBER_PORTAL',
      label: '6. Member Dashboard',
      icon: UserCheck,
      color: 'bg-purple-600 text-white hover:bg-purple-500',
      desc: 'Virtual card, membership details, facility booking'
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-100 border-b border-slate-800 py-3 px-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Left Side: Title */}
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-safra-red animate-pulse" />
          <div>
            <h4 className="text-sm font-black tracking-wider uppercase text-white flex items-center gap-2">
              SAFRA Portal Simulator
            </h4>
            <p className="text-[10px] text-slate-400">Toggle between the visual mockups requested in the prompt</p>
          </div>
        </div>

        {/* Right Side: Quick Select Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:flex flex-wrap items-center gap-2">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isActive = currentView === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onSelectView(opt.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  isActive
                    ? 'ring-2 ring-safra-red bg-white text-slate-900 border-none'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                title={opt.desc}
                id={`demo-btn-${opt.value.toLowerCase()}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-safra-red' : 'text-slate-400'}`} />
                <span className="truncate">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
