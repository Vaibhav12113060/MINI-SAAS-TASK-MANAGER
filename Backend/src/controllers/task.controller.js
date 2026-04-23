const taskService = require("../services/task.service");

exports.getTasks = async (req, res, next) => {
  try {
    // req.query bhejna zaroori hai search params ke liye
    const tasks = await taskService.getTasks(req.user.id, req.query);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user.id);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.user.id,
      req.body,
    );
    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const result = await taskService.deleteTask(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
