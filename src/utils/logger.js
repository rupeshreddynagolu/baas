import winston from "winston";
import chalk from "chalk";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.printf(({ level, message, timestamp }) => {
        let color;
        switch (level) {
          case "error":
            color = chalk.red;
            break;
          case "warn":
            color = chalk.yellow;
            break;
          case "info":
            color = chalk.green;
            break;
          case "debug":
            color = chalk.blue;
            break;
          default:
            color = chalk.white;
        }
        return `${color(timestamp)} ${color(level.toUpperCase())}: ${message}`;
      }),
    }),
    new winston.transports.File({ filename: "log/error.log", level: "error" }),
    new winston.transports.File({ filename: "log/combined.log" }),
  ],
});

export default logger;
