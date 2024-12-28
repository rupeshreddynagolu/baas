import { resolve } from "path";

export default {
  config: resolve("config", "config.js"),
  "models-path": resolve("models"),
  "seeders-path": resolve("seeders"),
  "migrations-path": resolve("migrations"),
};
