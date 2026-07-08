import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Building2, Calendar, FileText, ChevronRight, Loader2 } from 'lucide-react';
import api from '../../api/axios';

interface Application {
  _id: string;
  universityName: string;
  program: string;
  deadline: string;
  status: 'draft' | 'in_progress' | 'submitted' | 'accepted' | 'rejected' | 'waitlisted';
  progress: number;
  type: string;
}

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get('/applications');
        if (data.success) {
          setApplications(data.applications);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'submitted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'waitlisted': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'in_progress': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getStatusText = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
          <p className="text-muted-foreground">Track and manage your college applications.</p>
        </div>
        <Link 
          to="/applications/new" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
        >
          <Plus size={18} />
          New Application
        </Link>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      {applications.length === 0 && !error ? (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center rounded-xl border border-white/5">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <FileText size={32} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No applications yet</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            You haven't started any college applications. Click the button below to add your first one.
          </p>
          <Link 
            to="/applications/new" 
            className="bg-white/10 hover:bg-white/15 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Start an Application
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div key={app._id} className="glass-card p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {app.universityName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={16} />
                      <span>{app.program}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      <span>Deadline: {new Date(app.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded-md">
                      <span className="capitalize">{app.type.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:w-64 shrink-0">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-white font-medium">{app.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500" 
                        style={{ width: `${app.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-slate-400 hover:text-white shrink-0">
                    <ChevronRight size={20} />
                  </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
