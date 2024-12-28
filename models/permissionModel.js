// In permissionModel.js

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    resourceId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attributes: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "permissions",
    timestamps: true,
  }
);

// Export the model first
export default Permission;

// Then define the association
export function associate(models) {
  Permission.belongsTo(models.Organization, { foreignKey: "organizationId" });
  Permission.belongsTo(models.Resource, { foreignKey: "resourceId" });
  Permission.belongsTo(models.Role, { foreignKey: "roleId" });
}