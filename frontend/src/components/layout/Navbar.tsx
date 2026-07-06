import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <div className="flex h-16 items-center px-4 md:px-6 lg:px-8 max-w-7xl mx-auto justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight text-white">College<span className="text-primary">Agent</span></span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">About</Link>
          <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Login</Link>
          <Link to="/register" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
