import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Plus, 
  Search, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  SlidersHorizontal, 
  HeartHandshake,
  Compass,
  ArrowRight,
  Shield,
  Phone,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';

import { INITIAL_ITEMS } from './data/mockData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ItemCard from './components/ItemCard';
import ItemModal from './components/ItemModal';
import ReportModal from './components/ReportModal';
import ClaimModal from './components/ClaimModal';
import CampusMapGuide from './components/CampusMapGuide';

const STORAGE_KEY = 'campus_lost_found_v1';

export default function App() {
  // Load initial items from localStorage or fallback
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load from localStorage', e);
    }
    return INITIAL_ITEMS;
  });

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [items]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'found' | 'lost' | 'claimed'
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Modal States
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportModalType, setReportModalType] = useState('found'); // 'found' | 'lost'
  const [selectedItemModal, setSelectedItemModal] = useState(null);
  const [claimModalItem, setClaimModalItem] = useState(null);
  const [faqOpen, setFaqOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Open Report Modal
  const handleOpenReport = (type = 'found') => {
    setReportModalType(type);
    setReportModalOpen(true);
  };

  // Submit New Item
  const handleAddSubmitItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    showToast(
      newItem.type === 'found' 
        ? 'Thank you! Your found item report has been published to the campus board.' 
        : 'Your lost item has been registered! You will be notified when matched.',
      'success'
    );
  };

  // Mark an item as reunited
  const handleMarkReunited = (itemId) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, status: 'claimed' } : it))
    );
    
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    if (selectedItemModal && selectedItemModal.id === itemId) {
      setSelectedItemModal((prev) => (prev ? { ...prev, status: 'claimed' } : null));
    }

    showToast('Success! Item has been marked as Reunited with owner 🎉', 'success');
  };

  // Claim Form Submission Success
  const handleClaimSuccess = (itemId, claimDetails) => {
    showToast('Your claim and verification proof have been transmitted!', 'success');
  };

  // Quick reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedLocation('all');
    setSelectedColor('all');
    setSortBy('newest');
  };

  // Computed Stats
  const stats = useMemo(() => {
    const total = items.length;
    const found = items.filter((i) => i.type === 'found' && i.status !== 'claimed').length;
    const lost = items.filter((i) => i.type === 'lost' && i.status !== 'claimed').length;
    const claimed = items.filter((i) => i.status === 'claimed').length;
    return { total, found, lost, claimed };
  }, [items]);

  // Filtered and Sorted Items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Status filter
        if (selectedStatus === 'found' && (item.type !== 'found' || item.status === 'claimed')) return false;
        if (selectedStatus === 'lost' && (item.type !== 'lost' || item.status === 'claimed')) return false;
        if (selectedStatus === 'claimed' && item.status !== 'claimed') return false;

        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

        // Location filter
        if (selectedLocation !== 'all' && item.location !== selectedLocation) return false;

        // Color filter
        if (selectedColor !== 'all' && item.color !== selectedColor) return false;

        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.description?.toLowerCase().includes(q);
          const matchLoc = item.location?.toLowerCase().includes(q);
          const matchColor = item.color?.toLowerCase().includes(q);
          const matchCategory = item.category?.toLowerCase().includes(q);
          const matchReporter = item.reporterName?.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchLoc && !matchColor && !matchCategory && !matchReporter) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.dateTime || b.createdAt) - new Date(a.dateTime || a.createdAt);
        }
        if (sortBy === 'oldest') {
          return new Date(a.dateTime || a.createdAt) - new Date(b.dateTime || b.createdAt);
        }
        if (sortBy === 'alpha') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [items, selectedStatus, selectedCategory, selectedLocation, selectedColor, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-800">
      
      {/* Toast Notification Pill */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl flex items-center gap-3 border border-slate-700 max-w-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        onOpenReport={handleOpenReport}
        onOpenFaq={() => setFaqOpen(true)}
        activeTab={selectedStatus}
        setActiveTab={setSelectedStatus}
      />

      {/* Hero Banner with Stats and Action Cards */}
      <Hero
        stats={stats}
        onOpenReport={handleOpenReport}
        onFilterChange={setSelectedStatus}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Filter and Search Controls */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onResetFilters={handleResetFilters}
          totalResults={filteredItems.length}
        />

        {/* Items Grid or Empty State */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={(it) => setSelectedItemModal(it)}
                onQuickClaim={(it) => setClaimModalItem(it)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No matching items found</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              We couldn't find any belongings matching your specific search query or filter tags.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Clear all filters
              </button>
              <button
                onClick={() => handleOpenReport('lost')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
              >
                Report as missing
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Campus Lost & Found Detailed Modals */}
      <ItemModal
        item={selectedItemModal}
        allItems={items}
        onClose={() => setSelectedItemModal(null)}
        onClaim={(it) => {
          setSelectedItemModal(null);
          setClaimModalItem(it);
        }}
        onMarkReunited={handleMarkReunited}
        onSelectItem={(matchItem) => setSelectedItemModal(matchItem)}
      />

      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        initialType={reportModalType}
        onSubmitItem={handleAddSubmitItem}
      />

      <ClaimModal
        item={claimModalItem}
        isOpen={!!claimModalItem}
        onClose={() => setClaimModalItem(null)}
        onClaimSuccess={handleClaimSuccess}
      />

      <CampusMapGuide
        isOpen={faqOpen}
        onClose={() => setFaqOpen(false)}
      />

      {/* Aesthetic Minimal Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-600/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">CampusFind Lost & Found Portal</div>
                <div className="text-xs text-slate-400">Serving students, faculty & campus visitors</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <button onClick={() => setFaqOpen(true)} className="hover:text-indigo-600 transition-colors">
                Drop-off Desks
              </button>
              <button onClick={() => setFaqOpen(true)} className="hover:text-indigo-600 transition-colors">
                Verification Guidelines
              </button>
              <button onClick={() => handleOpenReport('lost')} className="hover:text-rose-600 transition-colors">
                Report Missing
              </button>
              <button onClick={() => handleOpenReport('found')} className="hover:text-emerald-600 transition-colors">
                Report Found
              </button>
            </div>

            <div className="text-xs text-slate-400 text-center md:text-right">
              Campus Security Helpline: <strong className="text-slate-700">+91 11 2345 6799</strong>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Campus Lost and Found Network. Safe & Verified Campus Handover.
          </div>
        </div>
      </footer>

    </div>
  );
}
