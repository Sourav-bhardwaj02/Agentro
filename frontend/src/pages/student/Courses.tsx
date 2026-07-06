import React from 'react';
import { Search, ChevronDown, Bookmark, Sparkles, Building2 } from 'lucide-react';

const Courses = () => {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Explore Your Future</h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Find the perfect academic path tailored by AI-driven insights and real-time admission data.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider pl-1">Quick Search</label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search courses, ma..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
        
        <div className="w-full md:w-40 space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider pl-1">Duration</label>
          <div className="relative">
            <select className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 pr-10 text-sm text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors">
              <option value="">Any Duration</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="4">4 Years</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="w-full md:w-40 space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider pl-1">Max Fees</label>
          <div className="relative">
            <select className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 pr-10 text-sm text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors">
              <option value="">No Limit</option>
              <option value="50000">Under $50,000</option>
              <option value="100000">Under $100,000</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="w-full md:w-40 space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider pl-1">Eligibility</label>
          <div className="relative">
            <select className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 pr-10 text-sm text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors">
              <option value="">All Backgrounds</option>
              <option value="stem">STEM</option>
              <option value="arts">Arts / Humanities</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-end">
          <button className="w-full md:w-auto bg-[#6366F1] hover:bg-[#5558DD] text-white text-sm font-medium rounded-xl py-2.5 px-8 transition-colors">
            Filter Results
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            uni: 'Stanford AI Institute',
            title: 'B.Sc. Machine Learning & Ethics',
            dur: '4 Years Full-time',
            fees: '$45,000 /yr',
            elig: 'GPA 3.8+ / STEM',
            seats: '12 Remaining',
            img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: { text: 'High Demand', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' }
          },
          {
            uni: 'MIT Tech Lab',
            title: 'Quantum Computing M.Eng',
            dur: '2 Years Full-time',
            fees: '$38,500 /yr',
            elig: 'B.S. Physics/CS',
            seats: '8 Remaining',
            img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: { text: 'New Program', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' }
          },
          {
            uni: 'London Business School',
            title: 'MBA Global Strategy & AI',
            dur: '1 Year Intensive',
            fees: '$62,000 /yr',
            elig: '3+ Exp / GMAT 720',
            seats: '24 Remaining',
            img: 'https://images.unsplash.com/photo-1577415124269-f1122a9f1a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            uni: 'UPenn Design School',
            title: 'B.Arch Environmental Engineering',
            dur: '5 Years Full-time',
            fees: '$52,000 /yr',
            elig: 'Math/Physics/Portfolio',
            seats: '15 Remaining',
            img: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            uni: 'Johns Hopkins Medicine',
            title: 'M.S. Bioinformatics & AI',
            dur: '1.5 Years Full-time',
            fees: '$29,000 /yr',
            elig: 'B.S. Biology/Math',
            seats: '15 Remaining',
            img: 'https://images.unsplash.com/photo-1576091160550-2173ff9e8eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            badge: { text: 'Best Value', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
          },
          {
            uni: 'Harvard Law School',
            title: 'LL.M. Technology Law',
            dur: '1 Year Full-time',
            fees: '$72,000 /yr',
            elig: 'Juris Doctor (JD)',
            seats: '3 Remaining',
            img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }
        ].map((course, i) => (
          <div key={i} className="glass-card rounded-2xl overflow-hidden flex flex-col relative group">
            {course.badge && (
              <div className={`absolute top-4 right-4 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${course.badge.color}`}>
                <Sparkles size={12} className="inline mr-1" />
                {course.badge.text}
              </div>
            )}
            
            <div className="h-48 relative overflow-hidden">
              <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-slate-300 text-xs">
                <div className="w-6 h-6 rounded bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <Building2 size={12} />
                </div>
                {course.uni}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-6 leading-tight flex-1">{course.title}</h3>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs mb-6">
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Duration</span>
                  <span className="text-slate-300">{course.dur}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Fees</span>
                  <span className="text-slate-300">{course.fees}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Eligibility</span>
                  <span className="text-slate-300">{course.elig}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Seats Left</span>
                  <span className="text-emerald-400 font-medium">{course.seats}</span>
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

      <div className="flex justify-center mt-8">
        <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
          Load More Courses
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default Courses;
