import React from 'react';
import { Search, Plus, Sparkles, CheckCircle, AlertTriangle, ArrowRight, MapPin } from 'lucide-react';

export default function Hero({ stats, onOpenReport, onFilterChange }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-indigo-50/50 via-slate-50 to-slate-50">
      {/* Decorative ambient background blur lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-12 left-1/4 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-teal-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Tag */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/90 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span>
            <span className="font-semibold text-indigo-700">Campus Security & Help Desk Integrated</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">24/7 Verified Returns</span>
          </div>
        </div>

        {/* Hero Title & Subtext */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Lost Something on Campus? <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-transparent">
              Let's Find It Together.
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Report items you've found to help a fellow student, or post details of what you lost. 
            Upload photos, specify colors, timestamps, and exact campus locations for instant matching.
          </p>
        </div>

        {/* Two Interactive Hero Cards (Lost vs Found) */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          
          {/* Found An Item Action Box */}
          <div 
            onClick={() => onOpenReport('found')}
            className="group relative p-5 sm:p-6 rounded-2xl bg-white/90 border border-emerald-200/80 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all cursor-pointer overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-200/60 transition-all"></div>
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Found It
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              I Found Someone's Belonging
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Upload a picture, describe color, location & drop-off desk so the true owner can claim it safely.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Submit found item details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Lost An Item Action Box */}
          <div 
            onClick={() => onOpenReport('lost')}
            className="group relative p-5 sm:p-6 rounded-2xl bg-white/90 border border-rose-200/80 shadow-sm hover:shadow-xl hover:border-rose-400 transition-all cursor-pointer overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-rose-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-rose-200/60 transition-all"></div>
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                Lost It
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
              I Lost Something Valuable
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Post missing details, color, last seen location, and contact information to be notified on match.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-rose-600 group-hover:translate-x-1 transition-transform">
              <span>Post missing report</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* Live Metrics / Trust Bar */}
        <div className="mt-10 sm:mt-12 max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-slate-200/70 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-center">
            
            <div className="pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.total}</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Total Records</div>
            </div>

            <div className="pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{stats.found}</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Found & Waiting</div>
            </div>

            <div className="pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-600">{stats.lost}</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Reported Lost</div>
            </div>

            <div className="pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">{stats.claimed}</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Reunited with Owners 🎉</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
