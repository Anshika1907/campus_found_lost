import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal, 
  MapPin, 
  Palette, 
  Layers, 
  Laptop, 
  CreditCard, 
  Key, 
  Backpack, 
  BookOpen, 
  Shirt, 
  Coffee, 
  Box,
  RotateCcw
} from 'lucide-react';
import { CATEGORIES, CAMPUS_LOCATIONS, COLOR_OPTIONS } from '../data/mockData';

const categoryIcons = {
  Layers,
  Laptop,
  CreditCard,
  Key,
  Backpack,
  BookOpen,
  Shirt,
  Coffee,
  Box
};

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedLocation,
  setSelectedLocation,
  selectedColor,
  setSelectedColor,
  sortBy,
  setSortBy,
  onResetFilters,
  totalResults
}) {
  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedCategory !== 'all' || 
    selectedStatus !== 'all' || 
    selectedLocation !== 'all' || 
    selectedColor !== 'all';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 mb-8">
      
      {/* Top Search & Status Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        
        {/* Search Input Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by name, color, keywords, or location (e.g. 'AirPods', 'blue wallet', 'library')..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70 text-xs font-medium self-start md:self-auto overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              selectedStatus === 'all'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Status
          </button>
          <button
            onClick={() => setSelectedStatus('found')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedStatus === 'found'
                ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Found
          </button>
          <button
            onClick={() => setSelectedStatus('lost')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedStatus === 'lost'
                ? 'bg-rose-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-rose-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            Lost
          </button>
          <button
            onClick={() => setSelectedStatus('claimed')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              selectedStatus === 'claimed'
                ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-indigo-700'
            }`}
          >
            Reunited
          </button>
        </div>

      </div>

      {/* Category Pills Slider */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const IconComp = categoryIcons[cat.icon] || Box;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-300' : 'text-slate-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Row: Location, Color & Sort Filters */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100/80">
        
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Location Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent text-xs text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Campus Locations</option>
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Color Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <Palette className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="bg-transparent text-xs text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Colors</option>
              {COLOR_OPTIONS.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{totalResults}</strong> items
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
