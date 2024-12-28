import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Resource = sequelize.define(
  "Resource",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "resources",
    timestamps: true,
  }
);

// Export the model first
export default Resource;

// Then define the association
export function associate(models) {
  Resource.belongsTo(models.Organization, { foreignKey: "organizationId" });
}