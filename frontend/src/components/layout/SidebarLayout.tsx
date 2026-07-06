import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  FileText, 
  GraduationCap, 
  FolderOpen, 
  BarChart2, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Plus
} from 'lucide-react';

const SidebarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Advisor', path: '/chat', icon: Sparkles },
    { name: 'Applications', path: '/eligibility', icon: FileText }, // Assuming eligibility is linked to apps or check eligibility
    { name: 'Scholarships', path: '/scholarships', icon: GraduationCap },
    { name: 'Documents', path: '/documents', icon: FolderOpen },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  ];

  return (
    <div className="flex h-screen bg-[#090C15] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B0F19] border-r border-white/5 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 pb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">AdmissionAI</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Premium Assistant</p>
            </div>
          </div>

          <nav className="px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? 'bg-white/10 text-white font-medium' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 space-y-4">
          <button className="w-full bg-[#A5B4FC] hover:bg-[#93A5F8] text-slate-900 rounded-lg py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-semibold transition-colors">
            <Plus size={16} />
            New Application
          </button>
          
          <div className="space-y-1">
            <Link to="/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <Settings size={18} />
              Settings
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-left">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 px-8 flex items-center justify-between bg-transparent">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search scholarships, colleges..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-white/20 text-white placeholder:text-slate-500"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#090C15]"></span>
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <Settings size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium">Alex Rivers</span>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-8 pt-0">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;
