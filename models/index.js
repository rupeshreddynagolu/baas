import sequelize from "../config/database.js";
import organization from "./organizationModel.js";
import roleModel from "./roleModel.js";
import resource from "./resourceModel.js";
import permission from "./permissionModel.js";
import OrganizationApiKey from "./OrganizationApiKeyModel.js";
import user from "./userModel.js";

async function dropAllTables() {
  try {
    await sequelize.drop();
    console.log("All tables have been dropped successfully.");
  } catch (error) {
    console.error("Error dropping tables:", error);
    throw error;
  }
}
// dropAllTables();

// Load all models
const models = {
  Organizations: organization,
  Roles: roleModel,
  Resources: resource,
  Permissions: permission,
  ApiKeys: OrganizationApiKey,
  Users: user,
};

// Call associate functions
Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

async function createAllTables() {
  try {
    await sequelize.sync({ force: true });
    console.log("All tables have been created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
}

// createAllTables();

// createAllTables();

export { dropAllTables, createAllTables };
