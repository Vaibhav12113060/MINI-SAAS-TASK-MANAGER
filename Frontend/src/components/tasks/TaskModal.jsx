import { useState, useEffect } from 'react';
import api from '../../api/api';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { X } from 'lucide-react';

const TaskModal = ({ task, onClose, refreshData }) => {
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending' });
  useEffect(() => { if (task) setFormData({ title: task.title, description: task.description, status: task.status }); }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskId = task?.id || task?._id;
      taskId ? await api.put(`/tasks/${taskId}`, formData) : await api.post('/tasks', formData);
      refreshData(); onClose();
    } catch (err) { alert("Error saving task!"); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white p-8 md:p-10 rounded-[3rem] w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute right-8 top-8 text-slate-400 hover:text-slate-600"><X size={24}/></button>
        <h2 className="text-2xl font-black mb-6 text-slate-800">{task ? 'Edit Task' : 'New Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" value={formData.title} onChange={(e)=>setFormData({...formData, title: e.target.value})} required />
          <textarea className="w-full bg-slate-50 rounded-2xl p-4 outline-none resize-none h-32" placeholder="Description" value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} />
          <div>
            <label className="text-xs font-black text-slate-400 ml-2 uppercase tracking-widest">Status</label>
            <select className="w-full mt-1 bg-slate-50 rounded-2xl p-4 outline-none font-bold text-slate-700" value={formData.status} onChange={(e)=>setFormData({...formData, status: e.target.value})}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Save Task</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TaskModal;