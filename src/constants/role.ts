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
    PostPermissions.DELETE,
    PostPermissions.VIEW,
    LikePermissions.CREATE,
    LikePermissions.REMOVE,
    MessagePermissions.SEND, // Allow users to send messages
    MessagePermissions.READ, // Allow users to read messages
  ],

  [RoleEnum.MODERATOR]: [
    UserPermissions.READ,
    UserPermissions.UPDATE,
    PostPermissions.CREATE,
    PostPermissions.UPDATE,
    PostPermissions.DELETE,
    PostPermissions.VIEW,
    PostPermissions.REPORT, // Allow moderators to report posts
    MessagePermissions.READ,
    MessagePermissions.DELETE, // Allow moderators to delete messages
    MessagePermissions.BLOCK, // Moderators can block users
    LikePermissions.CREATE,
    LikePermissions.REMOVE,
    UserPermissions.READ, // Moderators can view user profiles
    UserPermissions.BAN, // Moderators can ban users
    PostPermissions.MANAGE, // Moderators can manage content like pinning posts
    LikePermissions.MANAGE, // Moderators can view/manage likes
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
    PostPermissions.REPORT, // Admin can report posts
    MessagePermissions.SEND,
    MessagePermissions.READ,
    MessagePermissions.DELETE,
    LikePermissions.CREATE,
    LikePermissions.REMOVE,
    UserPermissions.MANAGE,
    UserPermissions.BAN,
    PostPermissions.MANAGE,
    LikePermissions.MANAGE,
    UserPermissions.BLOCK, // Admins can block users
    PostPermissions.PIN, // Admins can pin posts
    PostPermissions.FEATURE, // Admins can feature posts
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
    LikePermissions.MANAGE,
    UserPermissions.BLOCK, // Superadmin can block users
    PostPermissions.PIN, // Superadmin can pin posts
    PostPermissions.FEATURE, // Superadmin can feature posts
    // Add other superadmin-specific permissions as necessary (e.g., viewing logs, managing site-wide settings)
    "admin:manageSettings", // Superadmin can manage app-wide settings
    "admin:viewLogs", // Superadmin can view system logs
    "admin:manageUsers", // Superadmin can manage user roles and privileges
  ],
};
