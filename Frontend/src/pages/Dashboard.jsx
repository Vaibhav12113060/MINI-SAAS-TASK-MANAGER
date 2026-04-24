import { useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import StatsGrid from '../components/dashboard/StatsGrid';
import TaskGrid from '../components/dashboard/TaskGrid';
import TaskModal from '../components/tasks/TaskModal';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext); // ERROR YAHAN THA - FIXED
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchData = async () => {
    try {
      const [t, s] = await Promise.all([api.get('/tasks'), api.get('/tasks/stats')]);
      setTasks(t.data); 
      setStats(s.data);
    } catch (err) { console.error("Fetch error"); }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar fixed hai isliye pt-24 space dega */}
      <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">DASHBOARD</h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mt-1">
              Welcome back, {user?.name || 'User'}
            </p>
          </div>
          <Button 
            onClick={() => { setSelectedTask(null); setIsModalOpen(true); }} 
            className="w-full sm:w-auto shadow-xl shadow-blue-200/50 px-8 py-4 rounded-2xl text-sm font-black"
          >
            + CREATE NEW TASK
          </Button>
        </header>

        <StatsGrid stats={stats} />

        <div className="mt-16">
          <h2 className="text-lg font-black text-slate-800 mb-8 uppercase tracking-widest border-l-4 border-blue-600 pl-4">
            Active Tasks
          </h2>
          
          {tasks.length > 0 ? (
            <TaskGrid 
              tasks={tasks} 
              onEdit={(t) => { setSelectedTask(t); setIsModalOpen(true); }} 
              onDelete={async (id) => { 
                if(window.confirm("Delete task?")) {
                  await api.delete(`/tasks/${id}`); 
                  fetchData(); 
                }
              }} 
            />
          ) : (
            <div className="bg-white border border-slate-200 rounded-[3rem] p-20 text-center shadow-sm">
              <p className="text-slate-300 font-bold text-xl uppercase tracking-widest">Workspace is Empty</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <TaskModal 
          task={selectedTask} 
          onClose={() => setIsModalOpen(false)} 
          refreshData={fetchData} 
        />
      )}
    </div>
  );
};

export default Dashboard;