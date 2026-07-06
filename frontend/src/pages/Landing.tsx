import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, GraduationCap, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../components/common/Button';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 backdrop-blur-sm mb-4">
          <Bot size={16} className="text-primary" />
          <span>Powered by IBM Granite AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Your Intelligent <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            College Admission Guide
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Navigate your higher education journey with precision. Find the best courses, track scholarships, and check your eligibility instantly using our advanced AI assistant.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button size="lg" asChild className="rounded-full px-8 gap-2">
            <Link to="/chat">
              Start Chatting <ArrowRight size={18} />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="rounded-full px-8 gap-2">
            <Link to="/courses">
              <GraduationCap size={18} /> Explore Courses
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full"
      >
        {[
          { icon: <Bot className="text-primary mb-4" size={32}/>, title: 'AI Answers', desc: 'Get instant, accurate answers about admission processes and deadlines.' },
          { icon: <Zap className="text-secondary mb-4" size={32}/>, title: 'Smart Matching', desc: 'Find the perfect college and course based on your academic profile.' },
          { icon: <ShieldCheck className="text-primary mb-4" size={32}/>, title: 'Verified Data', desc: 'All information is regularly synced directly from official college websites.' }
        ].map((feature, i) => (
          <div key={i} className="glass-card p-8 rounded-2xl text-left border border-white/5 hover:border-white/10 transition-colors">
            {feature.icon}
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Landing;
