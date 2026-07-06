import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground">Total Colleges</h3>
          <p className="text-3xl font-bold text-white mt-2">156</p>
        </div>
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
          <p className="text-3xl font-bold text-white mt-2">2,405</p>
        </div>
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground">Documents Indexed</h3>
          <p className="text-3xl font-bold text-white mt-2">892</p>
        </div>
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-sm font-medium text-muted-foreground">AI Queries (Today)</h3>
          <p className="text-3xl font-bold text-white mt-2">12,450</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
