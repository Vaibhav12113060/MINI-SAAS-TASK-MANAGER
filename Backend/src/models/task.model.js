const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }, // Extra validation for production-ready code
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Completed"),
    defaultValue: "Pending",
  },
});

module.exports = Task;
