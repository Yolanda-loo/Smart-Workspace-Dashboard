import React from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import TaskList from './components/TaskList';
import CalendarWidget from './components/CalendarWidget';
import Announcements from './components/Announcements';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Workspace Overview</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + New Task
          </button>
        </header>

        {/* 3. Performance Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Tasks Completed" value="12/15" change="+2 from yesterday" />
          <StatCard title="Team Velocity" value="84%" change="-3% this week" />
          <StatCard title="Upcoming Deadlines" value="3" urgent />
        </div>

        {/* 4. Main Grid: Calendar & Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CalendarWidget />
            <TaskList />
          </div>
          
          <div className="lg:col-span-1">
            <Announcements />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
