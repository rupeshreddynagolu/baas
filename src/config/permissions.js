import { AccessControl } from "accesscontrol";
import User from "../../models/userModel.js";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // Fetch permissions for a user (this will be fetched from your database)
// export async function getUserPermissions(userId) {
//   const userWithPermissions = await prisma.user.findUnique({
//     where: { id: userId },
//     include: {
//       role: {
//         include: {
//           permissions: {
//             include: {
//               resource: true, // Resource name, e.g., 'restaurant'
//             },
//           },
//         },
//       },
//     },
//   });

//   // Create a list of grants for AccessControl
//   const grants =
//     userWithPermissions?.role.permissions.map((permission) => ({
//       role: userWithPermissions.role.name, // Example: 'admin', 'user'
//       resource: permission.resource.name,
//       action: permission.actions,
//       attributes: permission.attributes,
//     })) || [];

//   const ac = new AccessControl(grants); // Initialize AccessControl with the permissions

//   return ac;
// }

// // Check if the user can perform a certain action on a resource
// export function canPerformAction(ac, userRole, resource, action) {
//   const permission = ac.can(userRole)[action](resource);
//   return permission.granted;
// }

// Fetch permissions for a user (this will be fetched from your database)
export async function getUserPermissions(userId) {
  try {
    const userWithPermissions = await User.findOne({
      where: { id: userId },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                resource: true, // Assuming you have a "resource" model/table
              },
            },
          },
        },
      },
    });

    if (!userWithPermissions) {
      throw new Error("User not found");
    }

    // Create a list of grants for AccessControl
    const grants =
      userWithPermissions?.role.permissions.map((permission) => ({
        role: userWithPermissions.role.name, // Example: 'admin', 'user'
        resource: permission.resource.name, // Resource like 'restaurant'
        action: permission.actions,
        attributes: permission.attributes,
      })) || [];

    const ac = new AccessControl(grants); // Initialize AccessControl with the permissions
    return ac;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user permissions");
  }
}

// Check if the user can perform a certain action on a resource
export function canPerformAction(ac, userRole, resource, action) {
  try {
    const permission = ac.can(userRole)[action](resource);
    return permission.granted;
  } catch (error) {
    console.error(error);
    return false; // If there's an error, we assume the action is not allowed
  }
}
