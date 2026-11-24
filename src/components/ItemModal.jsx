import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Share2, 
  ShieldCheck, 
  HeartHandshake, 
  HelpCircle,
  Tag,
  ArrowRight
} from 'lucide-react';

export default function ItemModal({
  item,
  onClose,
  onClaim,
  onMarkReunited,
  allItems = [],
  onSelectItem
}) {
  if (!item) return null;

  const isFound = item.type === 'found';
  const isClaimed = item.status === 'claimed';

  // Find smart potential matches
  const potentialMatches = allItems.filter(other => {
    if (other.id === item.id) return false;
    // Look for opposite type (Lost vs Found)
    if (other.type === item.type) return false;
    // Check category match or color match or title word match
    const sameCategory = other.category === item.category;
    const sameColor = other.color && item.color && other.color === item.color;
    
    // Quick keyword overlap
    const itemWords = item.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const otherWords = other.title.toLowerCase();
    const hasWordMatch = itemWords.some(w => otherWords.includes(w));

    return sameCategory || sameColor || hasWordMatch;
  }).slice(0, 3);

  const formattedDate = new Date(item.dateTime || item.createdAt).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Campus Lost & Found: [${item.type.toUpperCase()}] ${item.title} at ${item.location}. Contact: ${item.contactEmail}`
      );
      alert('Item details copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-white flex items-center justify-center transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-800">
              <Tag className="w-12 h-12 stroke-[1.5] mb-2" />
              <span className="text-sm">No photo provided for this listing</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>

          {/* Type Badge & Status */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isClaimed ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500 text-white shadow-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  Item Reunited
                </span>
              ) : isFound ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  Found Item Report
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-lg">
                  <AlertTriangle className="w-4 h-4" />
                  Lost Item Report
                </span>
              )}

              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md text-white border border-white/20 capitalize">
                {item.category?.replace('-', ' ')}
              </span>
            </div>

            <button
              onClick={handleShare}
              title="Copy share link"
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Title & Color */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {item.title}
              </h2>

              {item.color && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                  <span
                    className="w-3 h-3 rounded-full border border-slate-300"
                    style={{ backgroundColor: item.colorHex || '#94a3b8' }}
                  ></span>
                  <span>{item.color}</span>
                </div>
              )}
            </div>

            <p className="mt-2 text-xs sm:text-sm text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Reported on {formattedDate}</span>
            </p>
          </div>

          {/* Location & Drop-off Info */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {isFound ? 'Location Where Found' : 'Last Known Location'}
                </div>
                <div className="text-sm font-medium text-slate-800">{item.location}</div>
              </div>
            </div>

            {item.currentLocation && (
              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Current Possession / Safe Drop-off
                  </div>
                  <div className="text-sm font-medium text-slate-800">{item.currentLocation}</div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Description & Identifying Marks
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-100">
              {item.description}
            </p>
          </div>

          {/* Contact Details Card */}
          <div className="border border-indigo-100 bg-indigo-50/50 rounded-2xl p-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center justify-between">
              <span>Reported By</span>
              <span className="text-[11px] font-normal text-indigo-600">Verified Campus Affiliate</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <User className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="font-semibold truncate">{item.reporterName}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <a href={`mailto:${item.contactEmail}`} className="hover:underline text-indigo-700 truncate">
                  {item.contactEmail}
                </a>
              </div>
              {item.contactPhone && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <a href={`tel:${item.contactPhone}`} className="hover:underline text-indigo-700 truncate">
                    {item.contactPhone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Smart Match Recommendations */}
          {potentialMatches.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Potential Matching Reports ({potentialMatches.length})
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {potentialMatches.map(match => (
                  <div
                    key={match.id}
                    onClick={() => onSelectItem(match)}
                    className="p-3 rounded-xl border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50 cursor-pointer transition-all flex items-center justify-between text-left group"
                  >
                    <div className="overflow-hidden pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          match.type === 'found' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {match.type.toUpperCase()}
                        </span>
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {match.title}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {match.location}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {!isClaimed && (
              <button
                onClick={() => onMarkReunited(item.id)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mark as Reunited</span>
              </button>
            )}

            <div className="flex items-center gap-2.5 w-full sm:w-auto ml-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all"
              >
                Close
              </button>

              {!isClaimed && (
                <button
                  onClick={() => onClaim(item)}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-white font-semibold text-xs bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>{isFound ? 'Claim This Item' : 'I Found This Item!'}</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
