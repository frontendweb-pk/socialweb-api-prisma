import { Request, Response, NextFunction } from "express";

import { AuthError } from "../lib/errors";
import { isSuperAdmin } from "./is-super-admin";
import { RoleEnum } from "../utils/enum";
import { roleService } from "../services/role";

export function authorize(
  requiredRole: RoleEnum[],
  permissions?: string[] | string | undefined
) {
  return async function cb(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.session.user;

      const userRole = await roleService.getRoleById(user.role_id);

      // If the user is a super admin, allow access to all routes
      if (isSuperAdmin(userRole?.role_name!)) {
        return next();
      }

      if (requiredRole.includes(userRole?.role_name as RoleEnum)) {
        throw new AuthError(
          "You ton't have the necessary role to access this resource!"
        );
      }

      // If checking for permissions, validate if the user has the required permissions
      const userPermissions = userRole?.permissions || [];

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
