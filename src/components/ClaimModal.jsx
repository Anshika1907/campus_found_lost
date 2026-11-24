import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  HeartHandshake, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Lock,
  Phone,
  Mail,
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ClaimModal({ item, isOpen, onClose, onClaimSuccess }) {
  if (!isOpen || !item) return null;

  const isFound = item.type === 'found';
  const [claimantName, setClaimantName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [proofDetail, setProofDetail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claimantName.trim() || !proofDetail.trim()) {
      alert('Please fill out your name and verification proof details.');
      return;
    }

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    setTimeout(() => {
      onClaimSuccess(item.id, {
        claimantName,
        studentId,
        contactPhone,
        proofDetail
      });
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isFound ? 'Claim Ownership of Item' : 'I Found This Missing Item!'}
              </h3>
              <p className="text-xs text-slate-500">
                {isFound ? 'Verify your identity to claim this product.' : 'Connect with the owner to return it.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item mini banner */}
        <div className="px-6 py-3 bg-slate-100/70 border-b border-slate-200/60 flex items-center gap-3">
          {item.image && (
            <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0" />
          )}
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-slate-900 truncate">{item.title}</div>
            <div className="text-[11px] text-slate-500 truncate">Reported at {item.location}</div>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Claim Request Dispatched!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your verification proof has been transmitted to the finder and campus security desk.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Ownership Proof / Identification Question */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                {isFound 
                  ? 'Proof of Ownership (Identifying details not in photo) *' 
                  : 'Message / Handover location details *'}
              </label>
              <textarea
                rows="3"
                required
                value={proofDetail}
                onChange={(e) => setProofDetail(e.target.value)}
                placeholder={
                  isFound 
                    ? "e.g., Wallpaper on phone, specific keychain, card numbers inside wallet, scratches on underside, serial number..."
                    : "e.g., I have kept this with the librarian on 2nd floor, or call me to collect."
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50 focus:bg-white"
              ></textarea>
            </div>

            {/* Claimant Details */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={claimantName}
                  onChange={(e) => setClaimantName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Student / Staff ID
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. CS2024098"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Campus Safety Tip */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-2.5 text-[11px] text-amber-800">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Safety Policy:</strong> Handover should take place at official campus help desks, library counters, or main security gates for mutual verification.
              </span>
            </div>

            {/* Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20"
              >
                Submit Claim Verification
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
