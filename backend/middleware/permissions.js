// middleware/permissions.js

export const permissions = {
  admin: {
    canCreateCommunity: true,
    canDeleteCommunity: true,
    canManageRoles: true,
    canManageMembers: true,
    canAccessDashboard: true,
    canEditCommunity: true,
    canViewAnalytics: true,
  },
  moderator: {
    canCreateCommunity: false,
    canDeleteCommunity: false,
    canManageRoles: false,
    canManageMembers: true,
    canAccessDashboard: true,
    canEditCommunity: true,
    canViewAnalytics: true,
  },
  member: {
    canCreateCommunity: false,
    canDeleteCommunity: false,
    canManageRoles: false,
    canManageMembers: false,
    canAccessDashboard: false,
    canEditCommunity: false,
    canViewAnalytics: false,
  },
};
