import TaskCard from '../tasks/TaskCard';
const TaskGrid = ({ tasks, onEdit, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {tasks.map((task) => (
      <TaskCard key={task.id || task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);
export default TaskGrid;