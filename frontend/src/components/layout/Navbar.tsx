import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <div className="flex h-16 items-center px-4 md:px-6 lg:px-8 max-w-[1400px] mx-auto justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <span className="font-bold text-xl tracking-tight text-white">Agentro</span>
        </Link>
        <div className="hidden md:flex gap-8 items-center justify-center">
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">About</Link>
          <Link to="/features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Features</Link>
          <Link to="/courses" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Courses</Link>
          <Link to="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">How It Works</Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Login</Link>
          <Link to="/register" className="text-sm font-medium bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
