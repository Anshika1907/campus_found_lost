import React from 'react';
import { Search, PlusCircle, Compass, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

export default function Navbar({ onOpenReport, onOpenFaq, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 ring-4 ring-indigo-50">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 font-sans">
                  Campus<span className="text-indigo-600">Find</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                  Live Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Campus Community Lost & Found Network</p>
            </div>
          </div>

          {/* Center Tabs for Quick Nav */}
          <div className="hidden md:flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 text-xs font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'found'
                  ? 'bg-emerald-500 text-white shadow-sm font-semibold'
                  : 'hover:text-emerald-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
              Found Items
            </button>
            <button
              onClick={() => setActiveTab('lost')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'lost'
                  ? 'bg-rose-500 text-white shadow-sm font-semibold'
                  : 'hover:text-rose-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-300"></span>
              Lost Items
            </button>
            <button
              onClick={() => setActiveTab('claimed')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'claimed'
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'hover:text-indigo-700'
              }`}
            >
              Reunited ✨
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenFaq}
              title="How it works & Campus Desks"
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium transition-all flex items-center gap-1.5 border border-slate-200"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Guide</span>
            </button>

            {/* Report Lost Button */}
            <button
              onClick={() => onOpenReport('lost')}
              className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
            >
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>Report Lost</span>
            </button>

            {/* Report Found Button */}
            <button
              onClick={() => onOpenReport('found')}
              className="px-3.5 sm:px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 active:scale-95 hover:shadow-lg"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Found</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
