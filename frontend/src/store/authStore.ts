import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: '1',
    name: 'John Doe',
    email: 'student@example.com',
    role: 'student', // Mock user for now
  },
  isAuthenticated: true, 
  isLoading: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
