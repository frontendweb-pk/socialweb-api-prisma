import { Request, Response, NextFunction } from "express";

import { AuthError } from "../lib/errors";
import { isSuperAdmin } from "./is-super-admin";
import { roleService } from "../services/role";
import { userService } from "../services/user";

export function authorize(permissions?: string[] | string | undefined) {
  return async function cb(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.session.user;

      const userRole = roleService.getRoleById(user.role_id);
      const userPermission = userService.getUserPermission(user.user_id);

      const [uRole, uPermissions] = await Promise.all([
        userRole,
        userPermission,
      ]);
      console.log("user", uRole, uPermissions);

      const permissions = [
        ...uRole.permissions, // assuming uRole.permissions is already an array of strings
      ];
      // If the user is a super admin, allow access to all routes
      if (isSuperAdmin(uRole?.role_name!)) {
        return next();
      }

      // if (requiredRole.includes(userRole?.role_name as RoleEnum)) {
      //   throw new AuthError(
      //     "You ton't have the necessary role to access this resource!"
      //   );
      // }

      // If checking for permissions, validate if the user has the required permissions
      const userPermissions = uRole?.permissions || [];

      if (Array.isArray(permissions)) {
        const hasPermission = permissions.every((p) => {
          return userPermissions.includes(p);
        });

        if (!hasPermission) {
          throw new AuthError(
            "You don't have the necessary permissions to access this resource."
          );
        }
      } else {
        if (!userPermissions.includes(permissions!)) {
          throw new AuthError(
            "You don't have the necessary permission to access this resource."
          );
        }
      }

      console.log("HI");
      next();
    } catch (error) {
      next(error);
    }
  };
}
