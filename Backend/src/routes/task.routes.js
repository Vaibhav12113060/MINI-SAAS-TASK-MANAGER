const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const taskService = require("../services/task.service");
const { protect } = require("../middlewares/auth.middleware");
const { taskValidator } = require("../validators/task.validator");

// Apply protection to all task routes
router.use(protect);

router.get("/stats", async (req, res, next) => {
  try {
    const stats = await taskService.getTaskStats(req.user.id);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

router
  .route("/")
  .get(getTasks) // Controller ab req.query handle kar raha hai
  .post(taskValidator, createTask);

router.route("/:id").put(taskValidator, updateTask).delete(deleteTask);

module.exports = router;
