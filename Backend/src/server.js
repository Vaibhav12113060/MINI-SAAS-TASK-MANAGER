const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const { connectDB, sequelize } = require("./config/db");
require("./models/index");
const errorHandler = require("./middlewares/error.middleware");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

// Middlewares - Isko aise hi rehne de, bas origin check kar le
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Startup Error:", error);
  }
};

start();
