import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user";
import { RoleEnum } from "@prisma/client";
import { AuthError } from "../lib/errors";
import { isSuperAdmin } from "./is-super-admin";

export function authorize(
  permissions: string[] | string,
  requiredRole: RoleEnum[]
) {
  return async function cb(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.session.user;
      const userRole = await userService.getLoggedInRole(user.user_id);

      // If the user is a super admin, allow access to all routes
      if (isSuperAdmin(userRole?.role_name!)) next();

      if (requiredRole.includes(userRole?.role_name as RoleEnum)) {
        throw new AuthError(
          "You ton't have the necessary role to access this resource!"
        );
      }

      // If checking for permissions, validate if the user has the required permissions
      const userPermissions = userRole?.permissions || [];

      if (Array.isArray(permissions)) {
        const hasPermission = permissions.every((p) =>
          userPermissions.includes(p)
        );
        if (!hasPermission) {
          throw new AuthError(
            "You don't have the necessary permissions to access this resource."
          );
        }
      } else {
        // If only one permission is required, check if user has it
        if (!userPermissions.includes(permissions)) {
          throw new AuthError(
            "You don't have the necessary permission to access this resource."
          );
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
