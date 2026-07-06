import React from 'react';
import { Sparkles, Calendar, Heart, GraduationCap, Clock, CheckCircle2, TrendingUp, History, Link as LinkIcon, Download, Globe, Star, Send, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-8 pb-12 relative">
      {/* Top Section - Welcome & Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 opacity-50 transition-opacity group-hover:opacity-100"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome back, Alex.</h1>
            <p className="text-slate-300 text-lg mb-8 max-w-xl">
              Your application to <span className="text-white font-semibold">Stanford University</span> is 85% complete. 2 tasks require your attention this week.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#A5B4FC] hover:bg-[#93A5F8] text-slate-900 font-semibold py-3 px-6 rounded-xl transition-colors">
                Resume Application
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-xl transition-colors border border-white/10">
                View Progress
              </button>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Academic Profile</h3>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Star size={16} className="text-emerald-400 fill-emerald-400/50" />
            </div>
          </div>
          <div className="mb-6">
            <div className="text-sm text-slate-400 mb-1">GPA: <span className="text-3xl font-bold text-white ml-2">3.96</span></div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">SAT Score</span>
                <span className="text-white font-medium">1540 / 1600</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[96%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Extracurriculars</span>
                <span className="text-white font-medium">Top 5%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[95%]"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center border-t border-white/10 pt-4">
            <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">Update Transcripts</button>
          </div>
        </div>
      </div>

      {/* Middle Section - AI Advisor & Recent Queries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles size={20} className="text-indigo-400" />
              AI Admissions Advisor
            </h3>
            <span className="text-xs font-medium bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> Online
            </span>
          </div>
          
          <div className="flex-1 bg-black/20 rounded-xl p-4 mb-4 space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex-shrink-0 flex items-center justify-center">
                <Sparkles size={16} className="text-indigo-400" />
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-200">
                Hello Alex! I've analyzed your latest practice essay. Your narrative flow is strong, but we could strengthen the "Personal Growth" section. Would you like to review my suggestions?
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Alex" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
              <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tr-sm p-4 text-sm text-white">
                Yes, please! Show me how to improve that section.
              </div>
            </div>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask anything about your applications..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-4 pr-16 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-[#A5B4FC] hover:bg-[#93A5F8] text-slate-900 rounded-lg w-10 flex items-center justify-center transition-colors">
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Queries</h3>
            <History size={18} className="text-slate-400" />
          </div>
          <div className="space-y-3">
            {[
              { q: 'How to apply for financial aid at Stanford', time: '2 hours ago' },
              { q: 'Average SAT for UPenn Wharton?', time: 'Yesterday' },
              { q: 'Early Decision vs Early Action deadlines', time: '3 days ago' }
            ].map((query, i) => (
              <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors">
                <p className="text-sm text-slate-200 mb-1 truncate">{query.q}</p>
                <p className="text-[10px] text-slate-500">{query.time}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-slate-400 hover:text-white transition-colors border border-white/10 rounded-lg hover:bg-white/5">
            View All History
          </button>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Upcoming Deadlines</h3>
            <p className="text-sm text-slate-400">Critical dates for your selected colleges.</p>
          </div>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
            Full Calendar <TrendingUp size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { uni: 'Stanford University', type: 'Early Decision Deadline', date: 'Nov 1, 2024', in: 'IN 3 DAYS', color: 'border-rose-500/50', badge: 'text-rose-400 bg-rose-500/10' },
            { uni: 'MIT Application', type: 'Submission Portfolio', date: 'Nov 10, 2024', in: 'IN 12 DAYS', color: 'border-indigo-500/50', badge: 'text-indigo-400 bg-indigo-500/10' },
            { uni: 'Harvard Financial', type: 'CSS Profile Filing', date: 'Nov 22, 2024', in: 'IN 24 DAYS', color: 'border-emerald-500/50', badge: 'text-emerald-400 bg-emerald-500/10' },
            { uni: 'UCLA Common App', type: 'Regular Decision', date: 'Dec 15, 2024', in: 'NEXT MONTH', color: 'border-slate-700', badge: 'text-slate-400 bg-slate-800' }
          ].map((dl, i) => (
            <div key={i} className={`glass-card rounded-xl p-5 border-l-2 ${dl.color} hover:bg-white/[0.03] transition-colors cursor-pointer`}>
              <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full mb-3 inline-block ${dl.badge}`}>
                {dl.in}
              </span>
              <h4 className="font-bold text-white mb-1 leading-tight">{dl.uni}</h4>
              <p className="text-xs text-slate-400 mb-4">{dl.type}</p>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <Calendar size={14} className="text-slate-500" />
                {dl.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended for You */}
      <div>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white">Recommended for You</h3>
          <p className="text-sm text-slate-400">AI-curated based on your interests, GPA, and extracurricular activity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Stanford University', loc: 'Palo Alto, California', img: 'https://images.unsplash.com/photo-1590483866164-9fb6784d5dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', match: '98%', tags: ['Computer Science', 'AI Focus'] },
            { name: 'Harvard University', loc: 'Cambridge, Massachusetts', img: 'https://images.unsplash.com/photo-1558025213-31745421df6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', match: '92%', tags: ['Mathematics', 'Liberal Arts'] },
            { name: 'MIT', loc: 'Cambridge, Massachusetts', img: 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', match: '91%', tags: ['Robotics', 'Engineering'] }
          ].map((college, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden group">
              <div className="h-40 relative">
                <img src={college.img} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={12} /> {college.match} Match
                </div>
                <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <Heart size={14} />
                </button>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg text-white mb-1">{college.name}</h4>
                <p className="text-xs text-slate-400 mb-4">{college.loc}</p>
                <div className="flex gap-2 mb-6">
                  {college.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <button className="w-full py-2 bg-transparent border border-white/10 hover:bg-white/5 text-white text-sm font-medium rounded-xl transition-colors">
                  Explore Program
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Scholarships */}
      <div>
        <div className="flex items-end justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Available Scholarships</h3>
          <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">See all 42 matches</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'National Merit Scholar', amount: '$25,000', desc: 'Academic excellence for top 1% PSAT scores.', dl: 'Dec 15, 2024', elig: 'GPA 3.8+', icon: GraduationCap },
            { name: 'STEM Innovation Fund', amount: '$10,000', desc: 'Awarded for research in AI and clean energy.', dl: 'Jan 30, 2025', elig: 'Project Portfolio', icon: Globe },
            { name: 'Global Leader Grant', amount: '$15,000', desc: 'Focus on community service and leadership.', dl: 'Nov 30, 2024', elig: 'Volunteer Hrs', icon: Heart }
          ].map((schol, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <schol.icon size={20} className="text-cyan-400" />
                </div>
                <span className="text-2xl font-bold text-cyan-400">{schol.amount}</span>
              </div>
              <h4 className="font-bold text-white mb-2">{schol.name}</h4>
              <p className="text-sm text-slate-400 mb-6 h-10">{schol.desc}</p>
              
              <div className="flex justify-between text-xs text-slate-300 mb-6 border-t border-white/10 pt-4">
                <div>
                  <span className="block text-slate-500 mb-1">Deadline:</span>
                  <span className="font-medium text-white">{schol.dl}</span>
                </div>
                <div className="text-right">
                  <span className="block text-slate-500 mb-1">Eligibility:</span>
                  <span className="font-medium text-white">{schol.elig}</span>
                </div>
              </div>
              
              <button className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold rounded-xl transition-colors border-none">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <div>
          <span className="font-bold text-slate-300">Agentro</span> - © 2024 Agentro. Advanced College Intelligence.
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">API Status</a>
          <a href="#" className="hover:text-slate-300">Contact</a>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button className="fixed right-8 bottom-8 w-14 h-14 bg-[#A5B4FC] hover:bg-[#93A5F8] rounded-full flex items-center justify-center text-slate-900 shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105 z-50">
        <MessageCircle size={24} className="fill-slate-900/10" />
      </button>
    </div>
  );
};

export default Home;
