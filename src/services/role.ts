import { Role } from "@prisma/client";
import prisma from "../lib/prisma-client";

class RoleService {
  private constructor() {}

  private static _instance: RoleService;

  // get all roles
  async getRoles() {
    const roles = await prisma.role.findMany({
      select: {
        active: true,
        role_id: true,
        role_name: true,
        permissions: true,
      },
    });
    return roles;
  }

  // create role

  // update role
  async updatePermissions({
    role_id,
    permissions,
  }: {
    role_id: number;
    permissions: string[];
  }) {
    const role = await prisma.role.update({
      where: { role_id },
      data: {
        permissions: {
          set: permissions,
        },
      },
      select: {
        role_id: true,
        role_name: true,
        permissions: true,
      },
    });
    return role;
  }

  // Get user role
  async deleteRole(role_id: number) {
    const role = await prisma.role.delete({
      where: { role_id },
      select: {
        role_id: true,
        role_name: true,
        permissions: true,
      },
    });

    return role;
  }

  // Get role permission
}
