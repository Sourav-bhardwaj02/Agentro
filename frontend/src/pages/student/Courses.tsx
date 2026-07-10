import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Bookmark, Sparkles, Building2, MapPin, Star, GraduationCap, IndianRupee } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface College {
  College_Name: string;
  State: string;
  Stream: string;
  UG_fee: number | null;
  PG_fee: number | null;
  Rating: number;
  Academic: number;
  Accommodation: number;
  Faculty: number;
  Infrastructure: number;
  Placement: number;
  Social_Life: number;
}

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [maxFee, setMaxFee] = useState('');
  const [minRating, setMinRating] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  // Debounce the search term to prevent excessive API requests and losing input focus
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data: collegesData, isLoading, error } = useQuery({
    queryKey: ['colleges', debouncedSearch, selectedState, selectedStream, maxFee, minRating],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (selectedState !== 'all') params.append('state', selectedState);
      if (selectedStream !== 'all') params.append('stream', selectedStream);
      if (maxFee) params.append('maxFee', maxFee);
      if (minRating) params.append('minRating', minRating);
      
      const response = await fetch(`/api/colleges?${params}`);
      if (!response.ok) throw new Error('Failed to fetch colleges');
      return response.json();
    },
  });

  const colleges = collegesData?.colleges || [];

  const states = ['all', 'Tamil nadu', 'Maharashtra', 'Karnataka', 'Delhi', 'Kerala', 'Telangana', 'Andhra Pradesh', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'Madhya Pradesh', 'West Bengal', 'Punjab', 'Haryana', 'Odisha', 'Bihar', 'Jharkhand', 'Assam', 'Uttarakhand', 'Himachal Pradesh', 'Jammu and Kashmir', 'Goa', 'Chhattisgarh', 'Chandigarh', 'Puducherry'];
  const streams = ['all', 'Engineering', 'Medical', 'Arts', 'Science', 'Commerce', 'Law'];

  const formatFee = (fee: number | null): string => {
    if (!fee) return 'N/A';
    return `₹${fee.toLocaleString('en-IN')}`;
  };

  const getRatingColor = (rating: number): string => {
    if (rating >= 9) return 'text-emerald-400';
    if (rating >= 8) return 'text-cyan-400';
    if (rating >= 7) return 'text-yellow-400';
    return 'text-slate-400';
  };


  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Explore Indian Colleges</h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Find the perfect college from India's premier institutions with AI-driven recommendations.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider pl-1">Search Colleges</label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by college name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
        
        <div className="w-full md:w-40 space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider pl-1">State</label>
          <div className="relative">
            <select 
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 pr-10 text-sm text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {states.map(state => (
                <option key={state} value={state} className="bg-slate-900">
                  {state === 'all' ? 'All States' : state}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="w-full md:w-40 space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider pl-1">Stream</label>
          <div className="relative">
            <select 
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 pr-10 text-sm text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {streams.map(stream => (
                <option key={stream} value={stream} className="bg-slate-900">
                  {stream === 'all' ? 'All Streams' : stream}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="w-full md:w-40 space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider pl-1">Max Fee (₹)</label>
          <div className="relative">
            <input
              type="number"
              placeholder="Max fee"
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div className="w-full md:w-40 space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider pl-1">Min Rating</label>
          <div className="relative">
            <select 
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 pr-10 text-sm text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="">Any Rating</option>
              <option value="9">9+ Excellent</option>
              <option value="8">8+ Very Good</option>
              <option value="7">7+ Good</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Colleges Grid */}
      {isLoading && colleges.length === 0 ? (
        <div className="glass-card p-12 rounded-xl text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading colleges...</p>
        </div>
      ) : error ? (
        <div className="glass-card p-8 rounded-xl text-center">
          <p className="text-red-400">Error loading colleges. Please try again.</p>
        </div>
      ) : colleges.length === 0 ? (
        <div className="glass-card p-8 rounded-xl text-center">
          <GraduationCap size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No colleges found matching your criteria.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedState('all'); setSelectedStream('all'); setMaxFee(''); setMinRating(''); }}
            className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.slice(0, visibleCount).map((college: College, i: number) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden flex flex-col relative group">
              {college.Rating >= 9 && (
                <div className="absolute top-4 right-4 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  <Sparkles size={12} className="inline mr-1" />
                  Top Rated
                </div>
              )}
              
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-500/10">
                <div className="absolute inset-0">
                  <img src="/college_building.png" alt={college.College_Name} className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-slate-300 text-xs mb-2">
                    <MapPin size={12} />
                    {college.State}
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={14} className={getRatingColor(college.Rating)} />
                    <span className={`text-sm font-bold ${getRatingColor(college.Rating)}`}>{college.Rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">{college.College_Name}</h3>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs mb-6">
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Stream</span>
                    <span className="text-slate-300">{college.Stream}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">UG Fee</span>
                    <span className="text-slate-300">{formatFee(college.UG_fee)}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">PG Fee</span>
                    <span className="text-slate-300">{formatFee(college.PG_fee)}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Placement</span>
                    <span className="text-emerald-400 font-medium">{college.Placement}/10</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs mb-6">
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-slate-500 mb-1">Academic</div>
                    <div className="text-white font-medium">{college.Academic}</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-slate-500 mb-1">Faculty</div>
                    <div className="text-white font-medium">{college.Faculty}</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-slate-500 mb-1">Infrastructure</div>
                    <div className="text-white font-medium">{college.Infrastructure}</div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-medium rounded-xl py-2.5 transition-colors border border-indigo-500/30">
                    Apply Now
                  </button>
                  <button className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {colleges.length > visibleCount && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
          >
            Load More Colleges
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Courses;
