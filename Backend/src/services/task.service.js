const Task = require("../models/task.model");
const { Op } = require("sequelize");

// Helper to calculate days between two dates
const getDaysDiff = (start, end) => {
  const diffTime = Math.abs(new Date(end) - new Date(start));
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const createTask = async (taskData, userId) => {
  return await Task.create({ ...taskData, userId });
};

const getTasks = async (userId, query = {}) => {
  const { search, status } = query;
  let whereClause = { userId };

  if (search) {
    whereClause[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
    ];
  }
  if (status) whereClause.status = status;

  const tasks = await Task.findAll({
    where: whereClause,
    order: [["createdAt", "DESC"]],
  });

  // Calculate dynamic fields for Frontend
  return tasks.map((task) => {
    const t = task.toJSON();
    if (t.status === "Pending") {
      t.daysPending = getDaysDiff(t.createdAt, new Date());
      t.completionDuration = null;
    } else {
      t.daysPending = 0;
      t.completionDuration = t.completedAt
        ? getDaysDiff(t.createdAt, t.completedAt)
        : "N/A";
    }
    return t;
  });
};

const getTaskStats = async (userId) => {
  const [total, completed, pending] = await Promise.all([
    Task.count({ where: { userId } }),
    Task.count({ where: { userId, status: "Completed" } }),
    Task.count({ where: { userId, status: "Pending" } }),
  ]);
  return { total, completed, pending };
};

const updateTask = async (taskId, userId, updateData) => {
  const task = await Task.findOne({ where: { id: taskId, userId } });
  if (!task) throw new Error("Task not found");

  // Automatic timestamp for completion
  if (updateData.status === "Completed" && task.status !== "Completed") {
    updateData.completedAt = new Date();
  } else if (updateData.status === "Pending") {
    updateData.completedAt = null;
  }

  return await task.update(updateData);
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOne({ where: { id: taskId, userId } });
  if (!task) throw new Error("Task not found");
  await task.destroy();
  return { message: "Task removed" };
};

module.exports = { createTask, getTasks, updateTask, deleteTask, getTaskStats };
