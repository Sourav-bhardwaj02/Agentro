import React from 'react';
import { Sparkles, BarChart2, ShieldCheck, Lock, ChevronDown, Percent, Globe, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Eligibility = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] -translate-y-1/2"></div>
      
      {/* Header (Standalone page) */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <Link to="/dashboard" className="font-bold text-lg leading-tight">
          AdmissionAI
        </Link>
        <Link to="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">
          Exit
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 w-full max-w-3xl mx-auto">
        
        <div className="text-center mb-10 mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-wide uppercase text-slate-300 mb-6">
            <Sparkles size={14} className="text-indigo-400" />
            AI-POWERED ASSESSMENT
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Check Your Eligibility</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
            Find out where you stand for your dream courses in seconds. Our AI analyzes global admission trends to give you accurate probabilities.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full glass-card bg-slate-900/40 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            <div className="space-y-2">
              <label className="text-sm text-slate-400 pl-1">Highest Qualification</label>
              <div className="relative">
                <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 pr-10 text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors">
                  <option value="" disabled selected>Select Qualification</option>
                  <option value="high_school">High School Diploma</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400 pl-1">Current Percentage / GPA</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. 3.8 or 85%"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 pr-10 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                />
                <Percent size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400 pl-1">Applicant Category</label>
              <div className="relative">
                <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 pr-10 text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors">
                  <option value="domestic">General / Domestic</option>
                  <option value="international">International</option>
                </select>
                <Globe size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400 pl-1">Preferred Course Field</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Computer Science"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 pr-10 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-500"
                />
                <GraduationCap size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

          </div>

          <button className="w-full bg-[#6366F1] hover:bg-[#5558DD] text-white font-medium rounded-xl py-4 flex items-center justify-center gap-2 transition-colors">
            Analyze My Eligibility
            <BarChart2 size={18} />
          </button>
        </div>

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
      
      {/* Footer minimal */}
      <footer className="w-full p-6 text-xs text-slate-500 flex justify-between z-10 absolute bottom-0">
        <div>© 2024 AdmissionAI. Advanced College Intelligence.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default Eligibility;
