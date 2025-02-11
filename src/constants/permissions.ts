export const UserPermissions = {
  READ: "user:read",
  CREATE: "user:create",
  UPDATE: "user:update",
  DELETE: "user:delete",
  FOLLOW: "user:follow", // Permission to follow a user
  UNFOLLOW: "user:unfollow", // Permission to unfollow a user
  PROFILE_PICTURE_UPDATE: "user:profile_picture:update", // Update profile picture
  BLOCK: "user:block", // Block another user
  REPORT: "user:report", // Report another user
  ALL: "user:all", // Admin-level permission
  MANAGE: "user:manage", // Admin-level permission
  BAN: "user:ban", // Admin-level permission
} as const;

export const ProfilePermissions = {
  READ: "profile:read",
  CREATE: "profile:create",
  UPDATE: "profile:update",
  DELETE: "profile:delete",
  ALL: "profile:all", // Admin-level permission
  MANAGE: "profile:manage", // Admin-level permission
  BAN: "profile:ban", // Admin-level permission
  PRIVACY_UPDATE: "profile:privacy:update", // Update privacy settings
} as const;

export const PostPermissions = {
  CREATE: "post:create",
  UPDATE: "post:update",
  DELETE: "post:delete",
  VIEW: "post:view",
  COMMENT: "post:comment", // Add a comment to a post
  LIKE: "post:like", // Like a post
  DISLIKE: "post:dislike", // Dislike a post
  SHARE: "post:share", // Share a post
  MANAGE: "post:manage", // Admin-level permission
  REPORT: "post:report", // Moderation permission
  PIN: "post:pin", // Admin-level permission to pin a post
  FEATURE: "post:feature", // Admin-level permission to feature a post
} as const;

export const MessagePermissions = {
  SEND: "message:send",
  READ: "message:read",
  DELETE: "message:delete",
  BLOCK: "message:block",
  REPORT: "message:report",
  EDIT: "message:edit", // Edit a sent message
  FORWARD: "message:forward", // Forward a message to others
} as const;

export const LikePermissions = {
  CREATE: "like:create",
  REMOVE: "like:remove",
  VIEW: "like:view",
  MANAGE: "like:manage", // Admin-level permission
  SHARE_LIKE: "like:share", // Share a like on other platforms
} as const;
