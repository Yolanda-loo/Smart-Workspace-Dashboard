import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, CheckCircle, AlertTriangle, BarChart3 } from 'lucide-react';
import TaskList from './components/TaskList';
import StatCard from './components/StatCard';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, performance: 0, urgent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        // Fetching both stats and tasks simultaneously for speed
        const [statsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/dashboard-stats'),
        ]);
        
        setStats(statsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading workspace data", err);
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  if (loading) return <div className="p-10 text-center font-medium">Loading Workspace...</div>;

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Navigation Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10 text-blue-600 font-bold text-xl">
          <LayoutDashboard size={28} />
          <span>SmartNode</span>
        </div>
        <nav className="space-y-2">
          <button className="w-full text-left p-3 rounded-lg bg-blue-50 text-blue-700 font-medium">Overview</button>
          <button className="w-full text-left p-3 rounded-lg text-slate-500 hover:bg-slate-50">Team Hub</button>
          <button className="w-full text-left p-3 rounded-lg text-slate-500 hover:bg-slate-50">Analytics</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Good Morning, Team</h1>
            <p className="text-slate-500">Here is what's happening in your workspace today.</p>
          </div>
          <div className="text-right">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Status</span>
             <div className="flex items-center gap-2 text-emerald-500 font-medium">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
               Operational
             </div>
          </div>
        </header>

        {/* Dynamic Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Workforce Efficiency" 
            value={`${stats.performance}%`} 
            icon={<BarChart3 className="text-blue-600" />}
            trend={`${stats.completed}/${stats.total} Tasks`}
          />
          <StatCard 
            title="Critical Actions" 
            value={stats.urgent} 
            icon={<AlertTriangle className="text-amber-500" />}
            trend="Immediate Attention"
            urgent={stats.urgent > 0}
          />
          <StatCard 
            title="Completed Goal" 
            value={stats.completed} 
            icon={<CheckCircle className="text-emerald-500" />}
            trend="View History"
          />
        </div>

        {/* Task Section */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <TaskList />
          </div>
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
              <h4 className="font-bold text-lg mb-2">Upgrade to Pro</h4>
              <p className="text-blue-100 text-sm mb-4">Get unlimited AI task insights and team collaboration tools.</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-xl font-bold text-sm">Upgrade Now</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;