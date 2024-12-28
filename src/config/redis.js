import Redis from "ioredis";

// Create a Redis client
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || null, // Optional, if Redis requires a password
});

// redisClient.on("connect", () => console.log("Connected to Redis!"));
// redisClient.on("error", (err) => console.error("Redis connection error:", err));

export default redisClient;
