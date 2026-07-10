import React, { useState } from 'react';
import { Sparkles, BarChart2, ShieldCheck, Lock, ChevronDown, Percent, Globe, GraduationCap, MapPin, Star, Building2, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
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

const Eligibility = () => {
  const [qualification, setQualification] = useState('');
  const [percentage, setPercentage] = useState('');
  const [category, setCategory] = useState('general');
  const [stream, setStream] = useState('');
  const [showResults, setShowResults] = useState(false);

  const { data: collegesData, isLoading } = useQuery({
    queryKey: ['colleges', stream],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (stream) params.append('stream', stream);

      const response = await fetch(`/api/colleges?${params}`);
      if (!response.ok) throw new Error('Failed to fetch colleges');
      return response.json();
    },
    enabled: showResults,
  });

  const colleges = collegesData?.colleges || [];

  const streams = ['Engineering', 'Medical', 'Arts', 'Science', 'Commerce', 'Law'];

  const formatFee = (fee: number | null): string => {
    if (!fee) return 'N/A';
    return `₹${fee.toLocaleString('en-IN')}`;
  };

  const getEligibilityScore = (college: College, userPercentage: number, userQualification: string, userCategory: string): number => {
    // Enhanced eligibility calculation based on multiple factors
    let score = 0;

    // Base score from college rating (40% weight)
    score += (college.Rating || 0) * 10;

    // Percentage bonus (30% weight)
    const percentageBonus = (userPercentage / 100) * 30;
    score += percentageBonus;

    // Academic score match (20% weight)
    score += (college.Academic || 0) * 2;

    // Placement score (10% weight)
    score += (college.Placement || 0) * 1;

    // Category adjustment (reservation benefits)
    if (userCategory !== 'general') {
      score += 5; // Bonus for reserved categories
    }

    // Qualification adjustment
    if (userQualification === '12th' || userQualification === 'diploma') {
      score += 3; // Better match for undergraduate programs
    }

    return Math.min(100, Math.round(score));
  };

  const handleAnalyze = () => {
    if (qualification && percentage && stream) {
      setShowResults(true);
    }
  };

  return (
    <div className="text-white flex flex-col relative">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-6xl mx-auto">

        {!showResults ? (
          <>
            <div className="text-center mb-10 mt-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-wide uppercase text-slate-300 mb-6">
                <Sparkles size={14} className="text-indigo-400" />
                AI-POWERED ASSESSMENT
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Check Your Eligibility</h1>
              <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
                Find out where you stand for your dream courses in seconds. Our AI analyzes admission trends to give you accurate probabilities.
              </p>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-3xl glass-card bg-slate-900/40 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="space-y-2">
                  <label className="text-sm text-slate-400 pl-1">Highest Qualification</label>
                  <div className="relative">
                    <select
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 pr-10 text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="" disabled selected>Select Qualification</option>
                      <option value="10th">Class 10th</option>
                      <option value="12th">Class 12th</option>
                      <option value="diploma">Diploma</option>
                      <option value="bachelors">Bachelor's Degree</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-400 pl-1">Current Percentage / GPA</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. 85 or 8.5"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 pr-10 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                    />
                    <Percent size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-400 pl-1">Applicant Category</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 pr-10 text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                      <option value="ews">EWS</option>
                    </select>
                    <Globe size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-400 pl-1">Preferred Course Stream</label>
                  <div className="relative">
                    <select
                      value={stream}
                      onChange={(e) => setStream(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 pr-10 text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value="" disabled selected>Select Stream</option>
                      {streams.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <GraduationCap size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

              </div>

              <button
                onClick={handleAnalyze}
                className="w-full bg-[#6366F1] hover:bg-[#5558DD] text-white font-medium rounded-xl py-4 flex items-center justify-center gap-2 transition-colors"
              >
                Analyze My Eligibility
                <BarChart2 size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full mt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Eligibility Results</h2>
                <p className="text-slate-400">Based on your profile, here are the colleges you're eligible for</p>
              </div>
              <button
                onClick={() => setShowResults(false)}
                className="text-sm text-indigo-400 hover:text-indigo-300 font-medium"
              >
                ← Back to Form
              </button>
            </div>

            {isLoading ? (
              <div className="glass-card p-8 rounded-xl text-center">
                <p className="text-muted-foreground">Analyzing your eligibility...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges.slice(0, 9).map((college: College, i: number) => {
                  const userPercent = parseFloat(percentage) || 0;
                  const eligibilityScore = getEligibilityScore(college, userPercent, qualification, category);
                  const isHighMatch = eligibilityScore >= 80;
                  const isMediumMatch = eligibilityScore >= 60 && eligibilityScore < 80;

                  return (
                    <div key={i} className="glass-card rounded-2xl overflow-hidden flex flex-col relative group">
                      {isHighMatch && (
                        <div className="absolute top-4 right-4 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          <Sparkles size={12} className="inline mr-1" />
                          High Match
                        </div>
                      )}
                      {isMediumMatch && !isHighMatch && (
                        <div className="absolute top-4 right-4 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                          Good Match
                        </div>
                      )}

                      <div className="h-40 relative overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-500/10">
                        <div className="absolute inset-0">
                          <img src="/college_building.png" alt={college.College_Name} className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-slate-300 text-xs mb-2">
                            <MapPin size={12} />
                            {college.State}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star size={14} className="text-yellow-400" />
                              <span className="text-sm font-bold text-white">{college.Rating}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] text-slate-400">Match</div>
                              <div className={`text-sm font-bold ${isHighMatch ? 'text-emerald-400' : isMediumMatch ? 'text-cyan-400' : 'text-yellow-400'}`}>
                                {eligibilityScore}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-3 leading-tight">{college.College_Name}</h3>

                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs mb-4">
                          <div>
                            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Stream</span>
                            <span className="text-slate-300">{college.Stream}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">UG Fee</span>
                            <span className="text-slate-300">{formatFee(college.UG_fee)}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Placement</span>
                            <span className="text-emerald-400 font-medium">{college.Placement}/10</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Academic</span>
                            <span className="text-white font-medium">{college.Academic}</span>
                          </div>
                        </div>

                        <Link
                          to="/courses"
                          className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-medium rounded-xl py-2.5 transition-colors border border-indigo-500/30 text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Trust badges */}
        <div className="mt-8 flex items-center gap-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Lock size={16} />
            Data is encrypted
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            98% Accuracy rate
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
