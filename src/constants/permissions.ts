export const UserPermissions = {
  READ: "user:read",
  UPDATE: "user:update",
  DELETE: "user:delete",
  CREATE: "user:create",
  MANAGE: "user:manage", // Admin-level permission
  BAN: "user:ban", // Admin-level permission
} as const;

export const PostPermissions = {
  CREATE: "post:create",
  UPDATE: "post:update",
  DELETE: "post:delete",
  VIEW: "post:view",
  MANAGE: "post:manage", // Admin-level permission
  REPORT: "post:report", // Moderation permission
} as const;

export const MessagePermissions = {
  CREATE: "message:create",
  SEND: "message:send",
  READ: "message:read",
  DELETE: "message:delete",
  BLOCK: "message:block",
  REPORT: "message:report",
} as const;

export const LikePermissions = {
  CREATE: "like:create",
  REMOVE: "like:remove",
  VIEW: "like:view",
  MANAGE: "like:manage", // Admin-level permission
} as const;
