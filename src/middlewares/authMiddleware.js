import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { redisClient } from "../config/database";
// Create a rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const auth = (req, res, next) => {
  try {
    // Apply rate limiting
    limiter(req, res, () => {
      // Extract the user token from the request headers
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");

      // Check if user details are cached in Redis
      redisClient.get(token, (err, cachedUser) => {
        if (err) throw err;

        if (cachedUser) {
          req.user = JSON.parse(cachedUser);
          return next();
        }

        // Verify token
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user) throw new Error("Unauthorized");

        // Store user details in Redis
        redisClient.setex(token, 3600, JSON.stringify(user)); // Cache for 1 hour

        req.user = user;
        next();
      });
    });
  } catch (error) {
    // Handle errors using a custom error handling middleware
    next(error);
  }
};

const refresh = (req, res, next) => {
  try {
    // Extract the refresh token from the request headers
    const refreshToken = req.headers.authorization?.split(" ")[1];
    if (!refreshToken) throw new Error("Unauthorized");
    // Verify refresh token
    const user = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (!user) throw new Error("Unauthorized");
    // Generate new access token
    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    // Generate new refresh token
    const newRefreshToken = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // Store new refresh token in Redis
    redisClient.setex(newRefreshToken, 604800, JSON.stringify(user)); // Cache for 7 days
    res.json({ accessToken, refreshToken: newRefreshToken });
    next();
    // Delete old refresh token from Redis
    redisClient.del(refreshToken);
  } catch (error) {
    // Handle errors using a custom error handling middleware
    next(error);
  }
};

// // Refresh token endpoint
// app.post("/api/refresh-token", (req, res) => {
//   const refreshToken = req.body.refreshToken;

//   // Verify refresh token
//   redisClient.get(refreshToken, (err, cachedUser) => {
//     if (err) throw err;

//     if (!cachedUser) {
//       return res.status(401).json({ message: "Invalid refresh token" });
//     }

//     // Generate new access token and refresh token
//     const accessToken = jwt.sign(
//       { userId: JSON.parse(cachedUser).userId },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );
//     const newRefreshToken = jwt.sign(
//       { userId: JSON.parse(cachedUser).userId },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // Store new refresh token in Redis
//     redisClient.setex(newRefreshToken, 604800, JSON.stringify(cachedUser)); // Cache for 7 days

//     res.json({ accessToken, refreshToken: newRefreshToken });
//   });
// });

export { auth, refresh };
