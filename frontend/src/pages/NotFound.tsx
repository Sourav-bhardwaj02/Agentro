import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-4">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
      <p className="text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
