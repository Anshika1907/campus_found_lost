import React from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Tag, 
  ArrowUpRight,
  ShieldCheck,
  Eye
} from 'lucide-react';

export default function ItemCard({ item, onClick, onQuickClaim }) {
  const isFound = item.type === 'found';
  const isClaimed = item.status === 'claimed';

  // Format date readable
  const formattedDate = new Date(item.dateTime || item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div 
      onClick={() => onClick(item)}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Image Preview Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Fallback image if broken url
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
            <Tag className="w-8 h-8 stroke-[1.5] mb-1" />
            <span className="text-xs font-medium">No photo provided</span>
          </div>
        )}

        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {isClaimed ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Reunited
            </span>
          ) : isFound ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              FOUND
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-md">
              <AlertTriangle className="w-3.5 h-3.5" />
              LOST
            </span>
          )}
        </div>

        {/* Color Badge Pill */}
        {item.color && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-slate-800 shadow-sm border border-slate-200/50">
            <span 
              className="w-2.5 h-2.5 rounded-full border border-slate-300"
              style={{ backgroundColor: item.colorHex || '#94a3b8' }}
            ></span>
            <span>{item.color}</span>
          </div>
        )}

        {/* Bottom Bar overlay: Date / Time */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white/95 text-xs font-medium drop-shadow-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-white/80" />
            <span>{formattedDate}</span>
          </div>
          <span className="capitalize text-[11px] bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-white/90">
            {item.category?.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {item.title}
          </h3>

          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Location & Meta */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-center text-xs text-slate-600 gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          {/* Quick Action Footer */}
          <div className="mt-1 flex items-center justify-between">
            <div className="text-[11px] text-slate-400">
              By <span className="font-medium text-slate-700">{item.reporterName}</span>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
