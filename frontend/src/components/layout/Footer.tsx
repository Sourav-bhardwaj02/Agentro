import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-sm py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} College Agent. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
