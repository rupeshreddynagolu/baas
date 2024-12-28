import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Organization from "./organizationModel.js";

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    organizationId: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure role names are unique
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "roles",
  }
);

Organization.hasMany(Role, { foreignKey: "organizationId" });

export default Role;
