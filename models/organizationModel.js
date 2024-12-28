import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./userModel.js";
import permissionModel from "./permissionModel.js";
import apiModel from "./OrganizationApiKeyModel.js";

const Organization = sequelize.define(
  "Organization",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 255],
          msg: "Name must be between 3 and 255 characters",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: { msg: "Logo URL must be a valid URL" },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: { msg: "Contact email must be valid" },
      },
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^\+?[1-9]\d{1,14}$/, // E.164 phone number format
        msg: "Contact phone must be a valid phone number",
      },
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: { msg: "Website must be a valid URL" },
      },
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "organizations",
    indexes: [
      {
        fields: ["name"],
      },
      {
        fields: ["contactEmail"],
      },
    ],
    paranoid: true,
  }
);

export default Organization;
// Then define the association
export function associate(models) {
  Organization.hasMany(models.User);
  Organization.hasMany(models.ApiKey);
  Organization.hasMany(models.Permission);
}
