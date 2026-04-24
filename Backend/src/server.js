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

// Middlewares - Backend deploy hone ke baad yahan frontend ka Render URL bhi add kar dena
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.FRONTEND_URL,
    ],
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
    // '0.0.0.0' zaroori hai Render connectivity ke liye
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is LIVE on port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup Error:", error);
  }
};

start();
