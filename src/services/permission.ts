import { Permission } from "@prisma/client";

import prisma from "../lib/prisma-client";

/**
 * Create permissions
 * @param body Array of permissions
 * @returns
 */
export const addPermissions = async (body: Permission[]) => {
  const permissions = await prisma.permission.createMany({
    data: body,
    skipDuplicates: true,
  });
  return permissions;
};
