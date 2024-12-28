// config/database.js
import { Sequelize } from "sequelize";
import dbConfig from "./config.js";

const sequelize = new Sequelize(dbConfig.development);

export default sequelize;
