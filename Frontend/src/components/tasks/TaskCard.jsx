import { Edit2, Trash2, Clock, CheckCircle2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group min-h-[280px]">
      <div>
        <span className={`flex items-center w-fit gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 ${isCompleted ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
          {isCompleted ? <CheckCircle2 size={12} /> : <Clock size={12} />} {task.status}
        </span>
        <h3 className={`text-xl font-black text-slate-800 leading-tight ${isCompleted ? 'line-through opacity-50' : ''}`}>{task.title}</h3>
        <p className="text-slate-500 text-sm mt-3 font-medium line-clamp-3">{task.description || "No description provided."}</p>
      </div>
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-50">
        {/* String conversion fix here */}
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            ID: {task.id ? String(task.id).slice(-4) : 'NEW'}
        </span>
        <div className="flex gap-1">
          <button onClick={() => onEdit(task)} className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={18}/></button>
          <button onClick={() => onDelete(task.id || task._id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={18}/></button>
        </div>
      </div>
    </div>
  );
};
export default TaskCard;