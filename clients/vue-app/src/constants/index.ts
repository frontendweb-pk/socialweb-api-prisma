export const routes = [
  {
    label: 'Role',
    value: 'role',
  },
  { label: 'Post', value: 'post' },
  { label: 'User', value: 'user' },
  { label: 'Permission', value: 'permission' },
  { label: 'Comment', value: 'comment' },
  { label: 'Like', value: 'like' },
  { label: 'Profile', value: 'profile' },
  { label: 'Skill', value: 'skill' },
];

export const CRUD = ['read', 'create', 'update', 'delete'];

export type RolePermission = {
  label?: string;
  value: string;
  permissions: { label: string; value: string }[];
};
export const ROLE_PERMISSIONS = [
  {
    label: 'Role Management',
    value: 'role',
    permissions: [
      { label: 'Read', value: 'read' },
      { label: 'Create', value: 'create' },
      { label: 'Update', value: 'update' },
      { label: 'Delete', value: 'delete' },
    ],
  },
  {
    label: 'User Management',
    value: 'user',
    permissions: [
      { label: 'Read', value: 'read' },
      { label: 'Create', value: 'create' },
      { label: 'Update', value: 'update' },
      { label: 'Delete', value: 'delete' },
      // { label: 'Suspend', value: 'suspend' },
      // { label: 'Ban', value: 'ban' },
      // { label: 'Reactivate', value: 'reactivate' },
      // { label: 'Assign Role', value: 'assign-role' },
      // { label: 'View Analytics', value: 'view-analytics' },
    ],
  },
  {
    label: 'Profile Management',
    value: 'profile',
    permissions: [
      { label: 'Read', value: 'read' },
      { label: 'Create', value: 'create' },
      { label: 'Update', value: 'update' },
      { label: 'Delete', value: 'delete' },
    ],
  },
  {
    label: 'Post Management',
    value: 'post',
    permissions: [
      { label: 'Read', value: 'read' },
      { label: 'Create', value: 'create' },
      { label: 'Update', value: 'update' },
      { label: 'Delete', value: 'delete' },
      // { label: 'Promote', value: 'promote' },
      // { label: 'Pin', value: 'pin' },
      // { label: 'Schedule', value: 'schedule' },
      // { label: 'Boost', value: 'boost' },
      // { label: 'Tag', value: 'tag' },
    ],
  },
  {
    label: 'Comment Management',
    value: 'comment',
    permissions: [
      { label: 'Read', value: 'read' },
      { label: 'Create', value: 'create' },
      { label: 'Update', value: 'update' },
      { label: 'Delete', value: 'delete' },
      // { label: 'Report', value: 'report' },
      // { label: 'Flag as inappropriate', value: 'flag' },
      // { label: 'Pin', value: 'pin' },
    ],
  },
  {
    label: 'Like Management',
    value: 'Like',
    permissions: [
      { label: 'Read', value: 'read' },
      { label: 'Create', value: 'create' },
      { label: 'Update', value: 'update' },
      { label: 'Delete', value: 'delete' },
    ],
  },
  {
    label: 'Address Management',
    value: 'address',
    permissions: [
      { label: 'Read', value: 'read' },
      { label: 'Create', value: 'create' },
      { label: 'Update', value: 'update' },
      { label: 'Delete', value: 'delete' },
    ],
  },
  {
    label: 'Permission Management',
    value: 'permission',
    permissions: [
      { label: 'Read', value: 'read' },
      { label: 'Create', value: 'create' },
      { label: 'Update', value: 'update' },
      { label: 'Delete', value: 'delete' },
    ],
  },
  {
    label: 'Skill Management',
    value: 'skill',
    permissions: [
      { label: 'Read', value: 'read' },
      { label: 'Create', value: 'create' },
      { label: 'Update', value: 'update' },
      { label: 'Delete', value: 'delete' },
    ],
  },
  {
    label: 'Platform Settings',
    value: 'platform-settings',
    permissions: [
      { label: 'Manage Privacy Settings', value: 'manage-privacy' },
      { label: 'Modify API Access', value: 'modify-api-access' },
      { label: 'Adjust Notification Settings', value: 'adjust-notifications' },
      { label: 'Manage Integrations', value: 'manage-integrations' },
      // { label: 'Change Platform Theme', value: 'change-theme' },
    ],
  },

  {
    label: 'Moderation',
    value: 'moderation',
    permissions: [
      { label: 'View Reports', value: 'view-reports' },
      { label: 'Review Content', value: 'review-content' },
      { label: 'Approve', value: 'approve' },
      { label: 'Reject', value: 'reject' },
      // { label: 'Mute', value: 'mute' },
      // { label: 'Block', value: 'block' },
      // { label: 'Escalate Issue', value: 'escalate' },
    ],
  },

  {
    label: 'Analytics & Insights',
    value: 'analytics',
    permissions: [
      { label: 'View Engagement', value: 'view-engagement' },
      { label: 'View User Growth', value: 'view-user-growth' },
      { label: 'View Content Performance', value: 'view-content-performance' },
      { label: 'Export Data', value: 'export-data' },
      // { label: 'Create Report', value: 'create-report' },
      // { label: 'Customize Dashboard', value: 'customize-dashboard' },
    ],
  },

  {
    label: 'Advertising & Promotions',
    value: 'advertising',
    permissions: [
      { label: 'Create Campaign', value: 'create-campaign' },
      { label: 'Manage Campaign', value: 'manage-campaign' },
      { label: 'Monitor Ad Performance', value: 'monitor-ad-performance' },
      { label: 'Create Ad', value: 'create-ad' },
      // { label: 'Target Audience', value: 'target-audience' },
      // { label: 'Allocate Budget', value: 'allocate-budget' },
      // { label: 'Pause/Stop Campaign', value: 'pause-stop-campaign' },
    ],
  },

  {
    label: 'Content Creation Tools',
    value: 'content-creation',
    permissions: [
      { label: 'Create Story', value: 'create-story' },
      { label: 'Create Reel', value: 'create-reel' },
      { label: 'Create Video', value: 'create-video' },
      { label: 'Edit Media', value: 'edit-media' },
      // { label: 'Publish Content', value: 'publish-content' },
      // { label: 'Add Filters', value: 'add-filters' },
      // { label: 'Create Polls', value: 'create-polls' },
      // { label: 'Add Location', value: 'add-location' },
    ],
  },
  {
    label: 'Internal Team Management',
    value: 'internal-team',
    permissions: [
      { label: 'Create Team', value: 'create-team' },
      { label: 'Assign Team Roles', value: 'assign-team-roles' },
      { label: 'View Team Analytics', value: 'view-team-analytics' },
      { label: 'Manage Team Performance', value: 'manage-team-performance' },
      // { label: 'Access Internal Documentation', value: 'access-internal-docs' },
      // { label: 'Invite Team Members', value: 'invite-team-members' },
    ],
  },
];
