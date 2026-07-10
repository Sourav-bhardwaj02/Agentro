import React, { useState, useEffect } from 'react';
import { GraduationCap, Globe, Heart, Search, Filter, Calendar, DollarSign, ArrowRight, CheckCircle2, LucideIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Scholarship {
  _id: string;
  name: string;
  amount: number;
  description: string;
  deadline: string;
  eligibility: string;
  minGPA?: number;
  category: string;
  applyUrl?: string;
  isActive: boolean;
  educationQualification?: string;
  gender?: string;
  community?: string;
  religion?: string;
  income?: string;
  exserviceMen?: boolean;
  disability?: boolean;
  sports?: boolean;
  annualPercentage?: string;
}

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minGPA, setMinGPA] = useState('');
  const [page, setPage] = useState(1);
  const limit = 12;

  // Debounce the search term to prevent input focus loss and excess API requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to page 1 when search changes
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Reset page when category or minGPA changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, minGPA]);

  const { data: scholarshipsData, isLoading, error } = useQuery({
    queryKey: ['scholarships', debouncedSearch, selectedCategory, minGPA, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (minGPA) params.append('minGPA', minGPA);
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await fetch(`/api/scholarships?${params}`);
      if (!response.ok) throw new Error('Failed to fetch scholarships');
      return response.json();
    },
  });

  const categories = ['all', 'merit', 'need', 'stem', 'arts', 'community', 'other'];

  const scholarships = scholarshipsData?.scholarships || [];
  const totalCount = scholarshipsData?.total || 0;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  const getIconForCategory = (category: string): LucideIcon => {
    switch (category) {
      case 'stem': return Globe;
      case 'community': return Heart;
      default: return GraduationCap;
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'merit': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'need': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'stem': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'arts': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'community': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Scholarships</h1>
          <p className="text-slate-400 mt-1">Find financial aid opportunities for your education</p>
        </div>
        <div className="text-sm text-slate-400">
          {totalCount} scholarships available
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-card rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-slate-900">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min GPA"
            value={minGPA}
            onChange={(e) => setMinGPA(e.target.value)}
            step="0.1"
            min="0"
            max="4"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50"
          />
        </div>
      </div>

      {/* Scholarships Grid */}
      {isLoading && scholarships.length === 0 ? (
        <div className="glass-card p-12 rounded-xl text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading scholarships...</p>
        </div>
      ) : error ? (
        <div className="glass-card p-8 rounded-xl text-center">
          <p className="text-red-400">Error loading scholarships. Please try again.</p>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="glass-card p-8 rounded-xl text-center">
          <GraduationCap size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No scholarships found matching your criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setMinGPA(''); }}
            className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((scholarship: Scholarship) => {
              const Icon = getIconForCategory(scholarship.category);
              
              return (
                <div key={scholarship._id} className="glass-card rounded-2xl p-6 hover:bg-white/[0.03] transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-xl ${getCategoryColor(scholarship.category).split(' ').slice(1).join(' ')} flex items-center justify-center border ${getCategoryColor(scholarship.category).split(' ').slice(3).join(' ')}`}>
                      <Icon size={24} className={getCategoryColor(scholarship.category).split(' ')[0]} />
                    </div>
                    <span className={`text-2xl font-bold text-cyan-400`}>
                      ₹{scholarship.amount?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full ${getCategoryColor(scholarship.category)}`}>
                      {scholarship.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-lg text-white mb-2 line-clamp-1">{scholarship.name}</h4>
                  <p className="text-sm text-slate-400 mb-6 h-10 line-clamp-2">{scholarship.description}</p>
                  
                  <div className="flex justify-between text-xs text-slate-300 mb-6 border-t border-white/10 pt-4">
                    <div>
                      <span className="block text-slate-500 mb-1">Income:</span>
                      <span className="font-medium text-white">{scholarship.income || 'N/A'}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-slate-500 mb-1">Community:</span>
                      <span className="font-medium text-white">{scholarship.community || 'General'}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {scholarship.disability && (
                      <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded-full border border-purple-500/20">
                        Disability
                      </span>
                    )}
                    {scholarship.exserviceMen && (
                      <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full border border-cyan-500/20">
                        Ex-Servicemen
                      </span>
                    )}
                    {scholarship.sports && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">
                        Sports
                      </span>
                    )}
                  </div>
                  
                  <button className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold rounded-xl transition-colors border-none flex items-center justify-center gap-2">
                    Apply Now <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              <span className="text-sm text-slate-400">
                Page <span className="text-white font-semibold">{page}</span> of <span className="text-white font-semibold">{totalPages}</span>
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Scholarships;
