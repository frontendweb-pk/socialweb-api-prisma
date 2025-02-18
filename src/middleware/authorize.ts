import { Request, Response, NextFunction } from "express";

import { AuthError } from "../lib/errors";
import { isSuperAdmin } from "./is-super-admin";
import { roleService } from "../services/role";
import { userService } from "../services/user";
import { verifyAccessToken } from "../lib/jwt-jose";

export function authorize(requiredPermissions?: string[] | string | undefined) {
  return async function cb(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await verifyAccessToken(req.cookies["refreshToken"]);

      if (!user) {
        throw new AuthError("Unauthorized access! You must be logged in.");
      }

      console.log("user", user);
      const userRole = roleService.getRoleById(user.role_id!); // session user role
      const userPermission = userService.getUserPermission(user.user_id); // session user permissions

      const [uRole, uPermissions] = await Promise.all([
        userRole,
        userPermission,
      ]);

      if (isSuperAdmin(uRole?.role_name!)) {
        return next();
      }

      const allUserPermissions = new Set([
        ...(uRole?.permissions || []),
        ...(uPermissions || []),
      ]);

      if (Array.isArray(requiredPermissions)) {
        const hasPermission = requiredPermissions.every((p) =>
          allUserPermissions.has(p)
        );

        if (!hasPermission) {
          throw new AuthError(
            "You don't have the necessary permissions to access this resource."
          );
        }
      } else {
        if (!allUserPermissions.has(requiredPermissions!)) {
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
