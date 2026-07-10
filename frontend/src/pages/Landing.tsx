import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, GraduationCap, ArrowRight, ShieldCheck, Zap, Users, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '../components/common/Button';

const Landing = () => {
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/chat');
  };

  return (
    <div className="w-full flex flex-col font-sans">
      
      {/* Hero Section - Dark */}
      <section className="relative w-full overflow-hidden bg-[#070b19] pt-12 pb-40">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent -z-10" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-12">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 space-y-8 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 backdrop-blur-sm shadow-sm">
              <Bot size={16} className="text-indigo-400" />
              <span>Powered by IBM Granite AI</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Your Intelligent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                College Admission Guide
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
              Navigate your higher education journey with precision. Find the best courses, track scholarships, and check your eligibility instantly with our advanced AI assistant.
            </p>
            
            {/* Search / Chat Input */}
            <form onSubmit={handleSearch} className="relative w-full max-w-xl flex items-center bg-white/5 border border-white/10 rounded-full p-2 backdrop-blur-md shadow-lg transition-all focus-within:border-primary/50 focus-within:bg-white/10">
              <div className="pl-4 pr-3 text-indigo-400">
                <Bot size={24} />
              </div>
              <input 
                type="text" 
                placeholder="Ask anything about colleges, courses, admissions..." 
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-base py-3"
              />
              <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                <ArrowRight size={20} className="-rotate-45" />
              </button>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-2">
              <Button size="lg" asChild className="rounded-full px-8 py-6 h-auto text-base gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none shadow-lg shadow-indigo-500/25 text-white">
                <Link to="/chat" className="flex items-center gap-2">
                  Start Chatting <ArrowRight size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 py-6 h-auto text-base gap-2 border-white/20 hover:bg-white/5 text-white bg-transparent">
                <Link to="/courses" className="flex items-center gap-2">
                  <BookOpen size={18} /> Explore Courses
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative hidden md:block"
          >
            {/* The main image container */}
            <div className="relative w-full aspect-[4/3] max-w-[600px] ml-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[40px] lg:rounded-tl-[200px] lg:rounded-br-[200px] lg:rounded-tr-[40px] lg:rounded-bl-[40px] transform rotate-3 scale-105 -z-10"></div>
              <img 
                src="/college_building.png" 
                alt="Beautiful College Campus" 
                className="w-full h-full object-cover rounded-[40px] lg:rounded-tl-[200px] lg:rounded-br-[200px] lg:rounded-tr-[40px] lg:rounded-bl-[40px] shadow-2xl border-2 border-white/10"
              />
              
              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 -right-4 lg:-right-8 glass-card bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center gap-4 shadow-xl z-20"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">5000+</div>
                  <div className="text-xs text-gray-300">Colleges<br/>Listed</div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -left-8 lg:-left-12 -translate-y-1/2 glass-card bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center gap-4 shadow-xl z-20"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">100%</div>
                  <div className="text-xs text-gray-300">Verified<br/>Information</div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 right-8 lg:right-16 glass-card bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center gap-4 shadow-xl z-20"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Users size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">10K+</div>
                  <div className="text-xs text-gray-300">Students<br/>Guided</div>
                </div>
              </motion.div>
              
            </div>
          </motion.div>

        </div>
        
        {/* Custom SVG Wave for bottom transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[80px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Features & Stats Section - White Background */}
      <section className="bg-white w-full py-16 px-4 md:px-6 lg:px-8 text-slate-900 relative z-20">
        <div className="max-w-[1400px] mx-auto">
          
          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 md:-mt-32 relative z-30 mb-16">
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6">
                <Bot size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">AI Answers</h3>
              <p className="text-slate-500 mb-6 flex-1 leading-relaxed">
                Get instant, accurate answers about admission processes and deadlines.
              </p>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 self-end transition-colors hover:bg-purple-100 hover:text-purple-600 cursor-pointer">
                <ArrowRight size={20} />
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Smart Matching</h3>
              <p className="text-slate-500 mb-6 flex-1 leading-relaxed">
                Find the perfect college and course based on your academic profile.
              </p>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 self-end transition-colors hover:bg-emerald-100 hover:text-emerald-600 cursor-pointer">
                <ArrowRight size={20} />
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Verified Data</h3>
              <p className="text-slate-500 mb-6 flex-1 leading-relaxed">
                All information is regularly synced directly from official college websites.
              </p>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 self-end transition-colors hover:bg-blue-100 hover:text-blue-600 cursor-pointer">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>

          {/* Stats Footer */}
          <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-100 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <GraduationCap className="text-purple-600" size={32} />
              <div>
                <div className="font-bold text-2xl text-slate-800">5000+</div>
                <div className="text-sm font-medium text-slate-500">Colleges</div>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-slate-200"></div>

            <div className="flex items-center gap-4">
              <BookOpen className="text-blue-500" size={32} />
              <div>
                <div className="font-bold text-2xl text-slate-800">15K+</div>
                <div className="text-sm font-medium text-slate-500">Courses</div>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200"></div>

            <div className="flex items-center gap-4">
              <Users className="text-indigo-500" size={32} />
              <div>
                <div className="font-bold text-2xl text-slate-800">10K+</div>
                <div className="text-sm font-medium text-slate-500">Students Helped</div>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-200"></div>

            <div className="flex items-center gap-4">
              <CheckCircle className="text-emerald-500" size={32} />
              <div>
                <div className="font-bold text-2xl text-slate-800">100%</div>
                <div className="text-sm font-medium text-slate-500">Verified</div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Landing;
