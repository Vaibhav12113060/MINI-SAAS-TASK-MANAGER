const User = require("./user.model");
const Task = require("./task.model");

// Relations define kar rahe hain
// onDelete: "CASCADE" ka matlab hai agar user delete hua, toh uske saare tasks bhi delete ho jayenge
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Task };
