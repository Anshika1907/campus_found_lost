import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

const DESKS = [
  {
    name: 'Central Library Help Desk',
    location: 'Ground Floor, Main Entrance',
    hours: '08:00 AM – 10:00 PM',
    phone: '+91 11 2345 6701',
    types: 'Electronics, Books, Laptops, Notebooks',
  },
  {
    name: 'Student Welfare & Proctor Office',
    location: 'Student Affairs Complex, Room 104',
    hours: '09:30 AM – 05:30 PM',
    phone: '+91 11 2345 6702',
    types: 'IDs, Cards, Wallets, Valuables & Jewelry',
  },
  {
    name: 'Campus Main Gate 1 Security',
    location: 'Gate 1 Guard Post',
    hours: '24 / 7 Operating',
    phone: '+91 11 2345 6799',
    types: 'Keys, Vehicles, Helmets, Urgent Items',
  },
  {
    name: 'Sports Complex Equipment Counter',
    location: 'Indoor Gymnasium Lobby',
    hours: '06:00 AM – 09:00 PM',
    phone: '+91 11 2345 6705',
    types: 'Water Bottles, Gym Wear, Sports Gear',
  },
];

const FAQS = [
  {
    q: 'How does ownership verification work?',
    a: 'When claiming an item, you will be prompted to provide identifying details that are deliberately not revealed in the public post (e.g. phone lock screen wallpaper, specific cards inside a wallet, unique scratch marks, or serial numbers). The finder or desk staff will verify this before handing over the item.'
  },
  {
    q: 'Can I directly hand an item to the security desk instead of holding it?',
    a: 'Yes, absolutely! We highly encourage anyone who finds a valuable item to submit it to the nearest designated Campus Desk (Library, Security Gate, or Student Welfare). When reporting the item on this portal, simply state which desk you dropped it at.'
  },
  {
    q: 'What if someone falsely claims my lost item?',
    a: 'Every claim requires campus identification and answering specific verification questions. Handovers are recorded and monitored under CCTV at official campus desks.'
  },
  {
    q: 'How long are items retained at campus desks?',
    a: 'Items are securely retained at campus desks for 90 days. Unclaimed non-valuable items are subsequently donated to student charity drives.'
  }
];

export default function CampusMapGuide({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Campus Lost & Found Guide</h3>
              <p className="text-xs text-slate-500">Official drop-off desks, hours & claim process</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          
          {/* 3 Step Workflow */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              How The Process Works
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mb-2">1</span>
                <h5 className="font-bold text-xs text-slate-900 mb-1">Post Item Details</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Upload photos, color, location & exact time found or lost.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mb-2">2</span>
                <h5 className="font-bold text-xs text-slate-900 mb-1">Match & Locate</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Automatic similarity matching pairs lost queries with found goods.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mb-2">3</span>
                <h5 className="font-bold text-xs text-slate-900 mb-1">Safe Handover</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Answer secret verification details and claim at campus desks.
                </p>
              </div>
            </div>
          </div>

          {/* Official Campus Desks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Designated Campus Handover Desks
            </h4>
            <div className="space-y-2.5">
              {DESKS.map((d, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-slate-200/80 bg-white hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-xs text-slate-900">{d.name}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{d.location}</span>
                    </div>
                    <div className="text-[11px] text-indigo-600 font-medium mt-0.5">
                      Accepts: {d.types}
                    </div>
                  </div>

                  <div className="text-right sm:text-right text-[11px] text-slate-500 border-t sm:border-t-0 pt-1.5 sm:pt-0 border-slate-100">
                    <div className="flex items-center sm:justify-end gap-1 text-slate-600 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{d.hours}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1 text-slate-400 mt-0.5">
                      <Phone className="w-3 h-3" />
                      <span>{d.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Frequently Asked Questions
            </h4>
            <div className="space-y-2">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-4 py-3 text-left font-semibold text-xs text-slate-800 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 py-3 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all"
          >
            Got it, thanks!
          </button>
        </div>

      </div>

    </div>
  );
}
