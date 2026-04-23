const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");

const { connectDB, sequelize } = require("./config/db");
// CRITICAL: Relations load karne ke liye index.js ko import karna zaroori hai
require("./models/index");

const errorHandler = require("./middlewares/error.middleware");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error Handler (Hamesha routes ke baad)
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();

    // sync() database tables create/update karta hai
    // Development mein aap { alter: true } use kar sakte hain agar model change kiya ho
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

start();
