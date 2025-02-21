import { BadRequestError } from "../lib/errors";
import prisma from "../lib/prisma-client";
import { QueryString } from "../types";
import { parsedQuery } from "../utils/parsed-query";

const ALLOWED_ATTRIBUTES = ["role_name"];

/**
 * Check role exist
 * @param role_name
 * @returns
 */
export const roleExist = async (role_name: string) => {
  const role = await prisma.role.findUnique({ where: { role_name } });
  if (role) throw new BadRequestError("Role already existed", "role_name", 409);
  return role;
};

/**
 * Get all roles
 * @param query
 */
export const getRoles = async (query: QueryString) => {
  const { limit, order, page, search, sort, where } = parsedQuery(
    query,
    ALLOWED_ATTRIBUTES,
  );

  const [roles, totalCount] = await prisma.$transaction([
    prisma.role.findMany({
      where: where,
      orderBy: { [sort]: order },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        active: true,
        role_id: true,
        role_name: true,
        permissions: true,
        created_at: true,
        updated_at: true,
      },
    }),
    prisma.role.count({ where }),
  ]);
  return { roles, totalCount, totalPages: Math.ceil(totalCount / limit) };
};
/**
 *
 * @param role_id
 * @returns
 */
export const getRoleById = async (role_id: number) => {
  const role = await prisma.role.findUnique({
    where: { role_id },
  });

  if (!role) throw new BadRequestError("Role not found!");
  return role;
};

export const deleteRole = async (role_id: number) => {
  const role = await getRoleById(role_id);
  return role?.permissions;
};

// create role
export const addNewRole = async ({
  role_name,
  permissions = [],
}: {
  role_name: string;
  permissions: string[];
}) => {
  await roleExist(role_name);

  // Convert role name to lowercase to maintain consistency
  role_name = role_name.toLowerCase();

  const role = await prisma.role.create({
    data: { role_name },
  });

  return role;
};

class RoleService {
  private constructor() {}

  private static _instance: RoleService;

  /**
   * Get the singleton instance of RoleService.
   * @returns {RoleService} The instance of RoleService.
   */
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

  async getRoles(query: QueryString) {
    const { limit, order, page, search, sort, where } = parsedQuery(
      query,
      ALLOWED_ATTRIBUTES,
    );

    const [roles, totalCount] = await prisma.$transaction([
      prisma.role.findMany({
        where: where,
        orderBy: { [sort]: order },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          active: true,
          role_id: true,
          role_name: true,
          permissions: true,
          created_at: true,
          updated_at: true,
        },
      }),
      prisma.role.count({ where }),
    ]);
    return { roles, totalCount, totalPages: Math.ceil(totalCount / limit) };
  }

  // check role exists
  async roleExist(role_name: string) {
    const role = await prisma.role.findUnique({
      where: { role_name },
    });

    if (role) throw new BadRequestError("Role already existed");
    return role;
  }

  /**
   * Get role by id
   * @param role_id
   * @returns Role
   */
  async getRoleById(role_id: number) {
    const role = await prisma.role.findUnique({
      where: { role_id },
    });

    if (!role) throw new BadRequestError("Role not found!");
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
    await this.getRoleById(role_id);

    const updatedRole = await prisma.role.update({
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
    return updatedRole;
  }

  // Get user role
  async deleteRole(role_id: number) {
    await this.getRoleById(role_id);

    const deletedRole = await prisma.role.delete({
      where: { role_id },
      select: {
        role_id: true,
        role_name: true,
        permissions: true,
      },
    });

    return deletedRole;
  }

  // Get role permission
  async getRolePermissions(role_id: number) {
    const role = await this.getRoleById(role_id);
    return role?.permissions;
  }
}

const roleService = RoleService.getInstance();
export { roleService };
