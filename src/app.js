import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import router from "./routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes with authentication
app.use("/api/v0/:organization",router);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

export default app;
