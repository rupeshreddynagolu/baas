import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Organization from "./organizationModel.js";

const OrganizationApiKey = sequelize.define(
  "OrganizationApiKey",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "apiKeys",
  }
);



export default OrganizationApiKey;
