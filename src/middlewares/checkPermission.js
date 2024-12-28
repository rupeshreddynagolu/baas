import { getUserPermissions, canPerformAction } from "../config/permissions.js";

// export async function checkPermission(resource, action) {
//   return async (req, res, next) => {
//     const userId = req.user.id;

//     const userPermissions = await getUserPermissions(userId);

//     if (!canPerformAction(userPermissions, resource, action)) {
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     next();
//   };
// }

// export async function checkPermission(resource, action) {
//   return async (req, res, next) => {
//     const userId = req.user.id;
//     const ac = await getUserPermissions(userId);
//     const userRole = req.user.role;
//     const permission = ac.can(userRole)[action](resource);
//     if (!permission.granted) {
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     next();
//   };
// }

//try catch exceptions for checking permissions
export  async function checkPermission(action) {
  return async (req, res, next) => {
    const userId = req.user.id;
    const { resource } = req.params;
    const ac = await getUserPermissions(userId);
    const userRole = req.user.role;
    try {
      const permission = ac.can(userRole)[action](resource);
      if (!permission.granted) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

