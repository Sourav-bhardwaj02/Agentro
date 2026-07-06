import React from 'react';
import { Sparkles, Calendar, Landmark, Map, FileSignature, Paperclip, Mic, Send } from 'lucide-react';

const Chat = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto pb-4">
      
      {/* Header title (Specific to this page, since global header has search) */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-white">Advisor Portal</h1>
        <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-2 py-1 rounded border border-white/10 uppercase tracking-wide">
          PRO
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-16">
        
        {/* Welcome Area */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/10">
            <Sparkles size={28} className="text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">How can I help you today?</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Your AI companion for college admissions, scholarships, and career planning.
          </p>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
          {[
            {
              icon: Calendar,
              title: "What are the deadlines for MIT?",
              desc: "Check early and regular admission dates."
            },
            {
              icon: Landmark,
              title: "Find scholarships for CS students.",
              desc: "Browse funding for computer science."
            },
            {
              icon: FileSignature,
              title: "Review my personal statement.",
              desc: "Get AI feedback on your draft."
            },
            {
              icon: Map,
              title: "Recommend liberal arts colleges.",
              desc: "Curated list based on your profile."
            }
          ].map((item, i) => (
            <button key={i} className="glass-card bg-slate-900/40 hover:bg-slate-900/60 transition-colors p-5 rounded-2xl border border-white/10 text-left group">
              <item.icon size={20} className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm font-medium text-slate-200 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="mt-auto w-full max-w-3xl mx-auto">
        <div className="glass-card bg-[#151924] border border-white/10 rounded-2xl p-2 flex items-center gap-2 relative">
          <button className="p-3 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5">
            <Paperclip size={20} />
          </button>
          <button className="p-3 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5">
            <Mic size={20} />
          </button>
          <input 
            type="text" 
            placeholder="Type a message or ask for advice..." 
            className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 text-sm py-3 px-2 placeholder:text-slate-500"
          />
          <button className="p-3 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors rounded-xl border border-indigo-500/30">
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[11px] text-slate-500 mt-3">
          AdmissionAI can make mistakes. Verify critical dates on official university websites.
        </p>
      </div>

    </div>
  );
};

export default Chat;
