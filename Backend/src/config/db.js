const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: 5432,
    logging: false,
    dialectOptions: {
      ssl:
        process.env.DB_HOST === "localhost"
          ? false // Localhost pe SSL band rahega
          : {
              require: true,
              rejectUnauthorized: false, // Cloud (Neon/Render) pe SSL on rahega
            },
    },
  },
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connected Successfully");
  } catch (err) {
    console.log("❌ DB Error:", err);
  }
};

module.exports = { sequelize, connectDB };
