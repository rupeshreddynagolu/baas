import app from "./app.js";
import sequelize from "../config/database.js";
import { createAllTables, dropAllTables } from "../models/index.js";
import redisClient from "./config/redis.js";
import logger from "./utils/logger.js";

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:");
//   });

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Database synced");
//   })
//   .catch((err) => {
//     console.error("Database sync failed");
//   });

redisClient.on("connect", () => {
  logger.info("Connected to Redis");
});

redisClient.on("error", (err) => {
  logger.error("Error connecting to Redis:", err);
});

redisClient.on("ready", () => {
  logger.info("Redis is ready");
});

redisClient.on("end", () => {
  logger.info("Disconnected from Redis");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`, {
    stack: error.stack,
  });
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
