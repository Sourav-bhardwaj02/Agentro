import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, GraduationCap, MapPin, Star, Award, DollarSign } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface College {
  name: string;
  rating: number;
  state: string;
  placement: number;
}

interface Analytics {
  totalColleges: number;
  averageRating: string;
  averagePlacement: string;
  averageAcademic: string;
  stateDistribution: Record<string, number>;
  streamDistribution: Record<string, number>;
  ratingDistribution: Record<string, number>;
  feeRanges: Record<string, number>;
  topRatedColleges: College[];
  bestPlacementColleges: College[];
}

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const { data: analyticsData, isLoading, error } = useQuery({
    queryKey: ['collegeAnalytics'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/colleges/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    },
  });

  const stats = [
    { 
      title: 'Total Colleges', 
      value: analyticsData?.analytics?.totalColleges || 0, 
      icon: GraduationCap, 
      color: 'text-indigo-400', 
      bgColor: 'bg-indigo-500/10' 
    },
    { 
      title: 'Average Rating', 
      value: analyticsData?.analytics?.averageRating || '0', 
      icon: Star, 
      color: 'text-yellow-400', 
      bgColor: 'bg-yellow-500/10' 
    },
    { 
      title: 'Avg Placement Score', 
      value: analyticsData?.analytics?.averagePlacement || '0', 
      icon: Award, 
      color: 'text-emerald-400', 
      bgColor: 'bg-emerald-500/10' 
    },
    { 
      title: 'Avg Academic Score', 
      value: analyticsData?.analytics?.averageAcademic || '0', 
      icon: Users, 
      color: 'text-cyan-400', 
      bgColor: 'bg-cyan-500/10' 
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
        <div className="glass-card p-8 rounded-xl text-center">
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
        <div className="glass-card p-8 rounded-xl text-center">
          <p className="text-red-400">Error loading analytics data. Please try again.</p>
        </div>
      </div>
    );
  }

  const analytics = analyticsData?.analytics || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-slate-400 mt-1">College data insights and statistics</p>
        </div>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500/50"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                +12.5%
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* State Distribution */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin size={20} className="text-indigo-400" />
              Colleges by State
            </h3>
          </div>
          <div className="space-y-4">
            {Object.entries(analytics.stateDistribution || {}).slice(0, 6).map(([state, count]) => (
              <div key={state}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">{state}</span>
                  <span className="text-white font-medium">{count as number}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-500" 
                    style={{ width: `${((count as number) / analytics.totalColleges) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stream Distribution */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 size={20} className="text-cyan-400" />
              Colleges by Stream
            </h3>
          </div>
          <div className="space-y-4">
            {Object.entries(analytics.streamDistribution || {}).map(([stream, count]) => (
              <div key={stream}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">{stream}</span>
                  <span className="text-white font-medium">{count as number}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 transition-all duration-500" 
                    style={{ width: `${((count as number) / analytics.totalColleges) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rating and Fee Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Star size={20} className="text-yellow-400" />
              Rating Distribution
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(analytics.ratingDistribution || {}).map(([range, count]) => (
              <div key={range} className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-1">{count as number}</div>
                <div className="text-sm text-slate-400">{range}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Range Distribution */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign size={20} className="text-emerald-400" />
              UG Fee Range Distribution
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(analytics.feeRanges || {}).map(([range, count]) => (
              <div key={range} className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-1">{count as number}</div>
                <div className="text-sm text-slate-400">{range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Colleges Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Rated Colleges */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-400" />
              Top Rated Colleges
            </h3>
          </div>
          <div className="space-y-3">
            {analytics.topRatedColleges?.slice(0, 5).map((college: College, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-medium text-white truncate">{college.name}</div>
                  <div className="text-xs text-slate-400">{college.state}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-yellow-400 fill-yellow-400/50" />
                  <span className="text-sm font-bold text-white">{college.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Placement Colleges */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award size={20} className="text-emerald-400" />
              Best Placement Records
            </h3>
          </div>
          <div className="space-y-3">
            {analytics.bestPlacementColleges?.slice(0, 5).map((college: College, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-medium text-white truncate">{college.name}</div>
                  <div className="text-xs text-slate-400">{college.state}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-emerald-400" />
                  <span className="text-sm font-bold text-white">{college.placement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
