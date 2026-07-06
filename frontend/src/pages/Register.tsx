import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';

const Register = () => {
  const { register: registerForm, handleSubmit, formState: { errors } } = useForm();
  const { register: authRegister, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await authRegister(data);
      navigate('/dashboard');
    } catch (err) {
      // Error handled by store
    }
  };

  React.useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="glass-card w-full max-w-md p-8 rounded-2xl animate-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Create an Account</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Name</label>
            <input 
              type="text" 
              {...registerForm('name', { required: 'Name is required' })}
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-md p-2 focus:outline-none focus:border-primary text-white" 
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message as string}</p>}
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <input 
              type="email" 
              {...registerForm('email', { required: 'Email is required' })}
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-md p-2 focus:outline-none focus:border-primary text-white" 
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message as string}</p>}
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Password</label>
            <input 
              type="password" 
              {...registerForm('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Must be at least 6 characters' }
              })}
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-md p-2 focus:outline-none focus:border-primary text-white" 
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message as string}</p>}
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
