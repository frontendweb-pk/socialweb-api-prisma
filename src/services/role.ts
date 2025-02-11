import { BadRequestError } from "../lib/errors";
import prisma from "../lib/prisma-client";

class RoleService {
  private constructor() {}

  private static _instance: RoleService;

  // Make the instance available
  public static getInstance(): RoleService {
    if (!RoleService._instance) {
      RoleService._instance = new RoleService();
    }
    return RoleService._instance;
  }

  /**
   * Get all roles
   * access by role : admin
   * @returns
   */
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

  // check role exists
  async roleExist(role_name: string) {
    const role = await prisma.role.findUnique({
      where: { role_name },
    });

    if (role) throw new BadRequestError("Role already existed");
    return role;
  }

  // create role
  async createRole({
    role_name,
    permissions = [],
  }: {
    role_name: string;
    permissions: string[];
  }) {
    await this.roleExist(role_name);

    role_name = role_name.toLowerCase();
    const role = await prisma.role.create({
      data: { role_name, permissions },
    });

    return role;
  }

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
  async getRolePermissions(role_id: number) {
    const role = await prisma.role.findUnique({ where: { role_id } });
    return role?.permissions;
  }
}

const roleService = RoleService.getInstance();
export { roleService };
