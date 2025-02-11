// src/constants/roles.ts

import { RoleEnum } from "@prisma/client"; // Assuming you have a RoleEnum in Prisma
import {
  UserPermissions,
  PostPermissions,
  MessagePermissions,
  LikePermissions,
} from "./permissions";

export const RolePermissions = {
  [RoleEnum.USER]: [
    UserPermissions.READ,
    UserPermissions.UPDATE,
    PostPermissions.CREATE,
    PostPermissions.UPDATE,
    PostPermissions.VIEW,
    LikePermissions.CREATE,
    LikePermissions.REMOVE,
  ],
  [RoleEnum.MODERATOR]: [
    UserPermissions.READ,
    UserPermissions.UPDATE,
    PostPermissions.CREATE,
    PostPermissions.UPDATE,
    PostPermissions.DELETE,
    PostPermissions.VIEW,
    MessagePermissions.READ,
    MessagePermissions.BLOCK,
    LikePermissions.CREATE,
    LikePermissions.REMOVE,
  ],
  [RoleEnum.ADMIN]: [
    UserPermissions.READ,
    UserPermissions.UPDATE,
    UserPermissions.CREATE,
    UserPermissions.DELETE,
    PostPermissions.CREATE,
    PostPermissions.UPDATE,
    PostPermissions.DELETE,
    PostPermissions.VIEW,
    MessagePermissions.SEND,
    MessagePermissions.READ,
    MessagePermissions.DELETE,
    LikePermissions.CREATE,
    LikePermissions.REMOVE,
    UserPermissions.MANAGE,
    UserPermissions.BAN,
    PostPermissions.MANAGE,
    MessagePermissions.MANAGE,
    LikePermissions.MANAGE,
  ],
  [RoleEnum.SUPERADMIN]: [
    UserPermissions.READ,
    UserPermissions.UPDATE,
    UserPermissions.CREATE,
    UserPermissions.DELETE,
    PostPermissions.CREATE,
    PostPermissions.UPDATE,
    PostPermissions.DELETE,
    PostPermissions.VIEW,
    MessagePermissions.SEND,
    MessagePermissions.READ,
    MessagePermissions.DELETE,
    LikePermissions.CREATE,
    LikePermissions.REMOVE,
    UserPermissions.MANAGE,
    UserPermissions.BAN,
    PostPermissions.MANAGE,
    MessagePermissions.MANAGE,
    LikePermissions.MANAGE,
  ],
};
