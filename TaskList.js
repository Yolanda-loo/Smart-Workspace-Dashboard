import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TaskList = () => {
  const [filter, setFilter] = useState('all');

  // Mock data - eventually fetched from your PostgreSQL DB
  const tasks = [
    { id: 1, title: 'Update security patches', priority: 'high', status: 'pending' },
    { id: 2, title: 'Refactor Tailwind components', priority: 'medium', status: 'completed' },
    { id: 3, title: 'Client presentation', priority: 'high', status: 'pending' },
    { id: 4, title: 'Database migration', priority: 'low', status: 'pending' },
  ];

  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : task.priority === filter
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Today's Focus</h3>
        
        {/* Priority Filter Tabs */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-md text-xs font-medium">
          {['all', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1 rounded capitalize transition ${
                filter === p ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {filteredTasks.map(task => (
          <div key={task.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
            <div className="flex items-center gap-4">
              <PriorityIcon priority={task.priority} />
              <div>
                <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
                  {task.title}
                </p>
                <span className="text-xs text-slate-500 capitalize">{task.priority} Priority</span>
              </div>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper component for clean UI
const PriorityIcon = ({ priority }) => {
  if (priority === 'high') return <AlertCircle className="text-red-500 w-5 h-5" />;
  if (priority === 'medium') return <Clock className="text-amber-500 w-5 h-5" />;
  return <CheckCircle className="text-emerald-500 w-5 h-5" />;
};

export default TaskList;
