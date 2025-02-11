import { Request, Response, NextFunction } from "express";

import { AuthError } from "../lib/errors";
import { isSuperAdmin } from "./is-super-admin";
import { roleService } from "../services/role";
import { userService } from "../services/user";

enum PermissionGranularity {
  GLOBAL,
  RESOURCE,
  INSTANCE,
}

interface PermissionDefinition {
  name: string;
  granularity: PermissionGranularity;
  resource?: string; // Optional resource type
  instanceId?: number | string; // Optional instance ID
}

export function authorize(
  requiredPermissions?: string[] | string | PermissionDefinition[] | undefined
) {
  return async function cb(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.session.user; // session

      const userRole = roleService.getRoleById(user.role_id); // role permission
      const userPermission = userService.getUserPermission(user.user_id); // user specific permission

      const [uRole, uPermissions] = await Promise.all([
        userRole,
        userPermission,
      ]);

      if (isSuperAdmin(uRole?.role_name!) || !requiredPermissions) {
        return next();
      }

      const allUserPermissions = [
        ...(uRole?.permissions || []),
        ...(uPermissions || []),
      ];

      if (typeof requiredPermissions === "string") {
        requiredPermissions = [requiredPermissions];
      }

      if (Array.isArray(requiredPermissions)) {
        const hasPermission = requiredPermissions.every(
          (requiredPermission) => {
            if (typeof requiredPermission === "string") {
              return allUserPermissions.includes(requiredPermission);
            }
            return checkPermission(allUserPermissions, requiredPermission, req);
          }
        );

        if (!hasPermission) {
          throw new AuthError(
            "You don't have the necessary permissions to access this resource."
          );
        }
      } else {
        if (!allUserPermissions.includes(requiredPermissions!)) {
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
function checkPermission(
  userPermissions: string[],
  requiredPermission: PermissionDefinition,
  req: Request
): boolean {
  const { name, granularity, resource, instanceId } = requiredPermission;

  if (!userPermissions.includes(name)) {
    return false;
  }

  if (granularity === PermissionGranularity.RESOURCE) {
    // Check if the permission applies to the requested resource type
    if (!resource || !req.originalUrl.includes(`/${resource}`)) {
      // Example: check URL for resource string
      return false;
    }
  } else if (granularity === PermissionGranularity.INSTANCE) {
    // Check if the permission applies to the specific resource instance
    if (!resource || !instanceId) {
      return false;
    }
    // Example: extract resource ID from URL and compare
    const resourceIdFromUrl = extractResourceIdFromUrl(
      req.originalUrl,
      resource
    ); // Implement this function
    if (resourceIdFromUrl !== instanceId) {
      return false;
    }
  }

  return true;
}

function extractResourceIdFromUrl(
  url: string,
  resource: string
): string | number | null {
  // Implement logic to extract resource ID from URL based on your URL structure
  // Example:  /roles/123 -> returns 123
  const regex = new RegExp(`/${resource}/(\\d+)`);
  const match = url.match(regex);
  if (match && match[1]) {
    const id = Number(match[1]);
    return isNaN(id) ? match[1] : id;
  }
  return null;
}
