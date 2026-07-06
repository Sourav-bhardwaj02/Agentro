import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="glass-card w-full max-w-md p-8 rounded-2xl animate-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Create an Account</h2>
        {/* Placeholder form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Name</label>
            <input type="text" className="w-full mt-1 bg-white/5 border border-white/10 rounded-md p-2 focus:outline-none focus:border-primary text-white" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <input type="email" className="w-full mt-1 bg-white/5 border border-white/10 rounded-md p-2 focus:outline-none focus:border-primary text-white" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Password</label>
            <input type="password" className="w-full mt-1 bg-white/5 border border-white/10 rounded-md p-2 focus:outline-none focus:border-primary text-white" />
          </div>
          <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors font-medium">
            Register
          </button>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
