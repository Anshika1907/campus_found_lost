import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Palette, 
  User, 
  Mail, 
  Phone,
  Trash2,
  Check
} from 'lucide-react';
import { CATEGORIES, CAMPUS_LOCATIONS, COLOR_OPTIONS } from '../data/mockData';

export default function ReportModal({ isOpen, onClose, initialType = 'found', onSubmitItem }) {
  if (!isOpen) return null;

  const [type, setType] = useState(initialType); // 'found' or 'lost'
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('electronics');
  const [color, setColor] = useState('Black');
  const [customColor, setCustomColor] = useState('');
  const [location, setLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [customLocation, setCustomLocation] = useState('');
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    // format as YYYY-MM-DDTHH:mm
    const tzOffset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - tzOffset).toISOString().slice(0, 16);
  });
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentLocation, setCurrentLocation] = useState(
    initialType === 'found' ? 'Submitted to Campus Security Desk' : 'With owner searching'
  );
  const [reporterName, setReporterName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [errors, setErrors] = useState({});

  // Handle image upload via FileReader
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseSampleImage = (url) => {
    setImagePreview(url);
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Item name is required';
    if (!description.trim()) newErrors.description = 'Please describe the item';
    if (!reporterName.trim()) newErrors.reporterName = 'Your name is required';
    if (!contactEmail.trim() || !contactEmail.includes('@')) newErrors.contactEmail = 'Valid email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedColorObj = COLOR_OPTIONS.find(c => c.name === color);
    const finalLocation = location === 'Other (Specify below)' ? customLocation || 'Campus Ground' : location;

    const newItem = {
      id: `item-${Date.now()}`,
      type,
      title: title.trim(),
      category,
      color: color === 'Other' ? customColor || 'Custom' : color,
      colorHex: selectedColorObj ? selectedColorObj.hex : '#64748b',
      location: finalLocation,
      dateTime,
      description: description.trim(),
      image: imagePreview || null,
      status: 'active',
      reporterName: reporterName.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      currentLocation: type === 'found' ? currentLocation : 'Searching',
      tags: title.toLowerCase().split(/\s+/),
      createdAt: new Date().toISOString()
    };

    onSubmitItem(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {type === 'found' ? 'Report a Found Product' : 'Report a Lost Product'}
            </h3>
            <p className="text-xs text-slate-500">
              {type === 'found' 
                ? 'Help reunite this item with its rightful owner on campus.' 
                : 'Post details so finders and campus security can reach you.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Type Toggle Switch */}
        <div className="px-6 pt-5">
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => {
                setType('found');
                setCurrentLocation('Submitted to Campus Security Desk');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                type === 'found'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>I Found An Item</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setType('lost');
                setCurrentLocation('Owner searching');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                type === 'lost'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>I Lost An Item</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Item Name / Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Item Name & Model *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={type === 'found' ? "e.g. Blue HydroFlask 750ml with anime sticker" : "e.g. Black Leather Fossil Watch"}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                errors.title ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white focus:border-indigo-500'
              }`}
            />
            {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
          </div>

          {/* Category & Color in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Primary Color Swatch */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Primary Color *
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {COLOR_OPTIONS.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
                <option value="Other">Other / Multicolor</option>
              </select>
              {color === 'Other' && (
                <input
                  type="text"
                  placeholder="Specify color..."
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="mt-2 w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                />
              )}
            </div>

          </div>

          {/* Location & Date/Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Campus Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {type === 'found' ? 'Location Found *' : 'Last Seen Location *'}
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {CAMPUS_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
                <option value="Other (Specify below)">Other (Specify below)</option>
              </select>
              {location === 'Other (Specify below)' && (
                <input
                  type="text"
                  placeholder="Specify exact location or room..."
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  className="mt-2 w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                />
              )}
            </div>

            {/* Date and Time */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Approximate Date & Time *
              </label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Detailed Description & Distinguishing Marks *
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mention brand, scratches, serial numbers, case type, contents inside, stickers or special keychains..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${
                errors.description ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-slate-50/40 focus:bg-white focus:border-indigo-500'
              }`}
            ></textarea>
            {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
          </div>

          {/* Image Upload Box */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Upload Product Photo {type === 'found' ? '(Highly Recommended)' : '(Optional Reference)'}
            </label>
            
            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-56 bg-slate-900 flex items-center justify-center">
                <img src={imagePreview} alt="Preview" className="w-full max-h-56 object-cover" />
                <button
                  type="button"
                  onClick={() => setImagePreview('')}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors shadow-lg"
                  title="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-5 text-center bg-slate-50/50 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 hover:underline">
                    Click to browse or drop an image
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">PNG, JPG or WEBP up to 5MB</span>
                </label>

                {/* Quick Sample Image Shortcuts for quick testing */}
                <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-center gap-2">
                  <span className="text-[10px] text-slate-400">Or use sample photo:</span>
                  <button
                    type="button"
                    onClick={() => handleUseSampleImage('https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80')}
                    className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded hover:bg-indigo-100"
                  >
                    Earbuds
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUseSampleImage('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80')}
                    className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded hover:bg-indigo-100"
                  >
                    Notebook
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUseSampleImage('https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80')}
                    className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded hover:bg-indigo-100"
                  >
                    Wallet
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Current Safe Holding Location (for Found items) */}
          {type === 'found' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Current Possession / Drop-off Location
              </label>
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                placeholder="e.g. Handed to Central Library 1st Floor Desk, or Kept with me"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/40 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          )}

          {/* Contact Details Section */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Your Contact Information (For Verification)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                    errors.reporterName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-white'
                  }`}
                />
                {errors.reporterName && <p className="text-[10px] text-rose-500 mt-0.5">{errors.reporterName}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Campus Email *"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${
                    errors.contactEmail ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 bg-white'
                  }`}
                />
                {errors.contactEmail && <p className="text-[10px] text-rose-500 mt-0.5">{errors.contactEmail}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp (Optional)"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-xl text-white font-semibold text-xs shadow-lg transition-all active:scale-95 ${
                type === 'found'
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
                  : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/20'
              }`}
            >
              {type === 'found' ? 'Publish Found Item' : 'Publish Lost Report'}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
