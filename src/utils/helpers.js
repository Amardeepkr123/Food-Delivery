// src/utils/adminHelper.js

// ============================================
// ADMIN CREDENTIALS (For Testing)
// ============================================

export const ADMIN_CREDENTIALS = {
  email: 'admin@fooddelivery.com',
  password: 'admin123',
};

// ============================================
// ADMIN CONSTANTS
// ============================================

export const ADMIN_CONSTANTS = {
  // Admin roles with permissions
  ROLES: {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    SUB_ADMIN: 'sub_admin',
    SUPPORT: 'support',
  },

  // Admin permissions
  PERMISSIONS: {
    MANAGE_USERS: 'manage_users',
    MANAGE_RESTAURANTS: 'manage_restaurants',
    MANAGE_ORDERS: 'manage_orders',
    MANAGE_DELIVERY: 'manage_delivery',
    MANAGE_PAYMENTS: 'manage_payments',
    VIEW_ANALYTICS: 'view_analytics',
    MANAGE_SETTINGS: 'manage_settings',
    MANAGE_SUPPORT: 'manage_support',
    EXPORT_DATA: 'export_data',
  },

  // Dashboard stats cards
  DASHBOARD_STATS: [
    { id: 'total_orders', label: 'Total Orders', icon: 'FiPackage', color: 'blue' },
    { id: 'total_revenue', label: 'Total Revenue', icon: 'FiDollarSign', color: 'green' },
    { id: 'total_users', label: 'Total Users', icon: 'FiUsers', color: 'purple' },
    { id: 'total_restaurants', label: 'Restaurants', icon: 'FaUtensils', color: 'orange' },
    { id: 'active_deliveries', label: 'Active Deliveries', icon: 'FiTruck', color: 'red' },
    { id: 'pending_orders', label: 'Pending Orders', icon: 'FiClock', color: 'yellow' },
  ],
};

// ============================================
// ADMIN CHECK FUNCTIONS
// ============================================

/**
 * Check if user is admin
 * @param {Object} user - User object
 * @returns {boolean} True if user is admin
 */
export const isAdmin = (user) => {
  if (!user) return false;
  return user?.role === 'admin' || 
         user?.role === 'super_admin' || 
         user?.isAdmin === true;
};

/**
 * Check if user is super admin
 * @param {Object} user - User object
 * @returns {boolean} True if user is super admin
 */
export const isSuperAdmin = (user) => {
  if (!user) return false;
  return user?.role === 'super_admin';
};

/**
 * Check if user has admin permission
 * @param {Object} user - User object
 * @param {string} permission - Permission to check
 * @returns {boolean} True if user has permission
 */
export const hasAdminPermission = (user, permission) => {
  if (!user) return false;
  
  // Super admin has all permissions
  if (isSuperAdmin(user)) return true;
  
  // Admin has all permissions
  if (isAdmin(user)) return true;
  
  // Check specific permissions
  return user?.permissions?.includes(permission) || false;
};

/**
 * Check if user has multiple admin permissions
 * @param {Object} user - User object
 * @param {string[]} permissions - Permissions to check
 * @returns {boolean} True if user has all permissions
 */
export const hasAdminPermissions = (user, permissions) => {
  if (!user) return false;
  
  // Super admin has all permissions
  if (isSuperAdmin(user)) return true;
  
  // Admin has all permissions
  if (isAdmin(user)) return true;
  
  // Check all permissions
  return permissions.every(permission => 
    user?.permissions?.includes(permission)
  );
};

/**
 * Check if user has any admin permission
 * @param {Object} user - User object
 * @param {string[]} permissions - Permissions to check
 * @returns {boolean} True if user has any permission
 */
export const hasAnyAdminPermission = (user, permissions) => {
  if (!user) return false;
  
  // Super admin has all permissions
  if (isSuperAdmin(user)) return true;
  
  // Admin has all permissions
  if (isAdmin(user)) return true;
  
  // Check any permission
  return permissions.some(permission => 
    user?.permissions?.includes(permission)
  );
};

// ============================================
// ADMIN ROUTES & NAVIGATION
// ============================================

/**
 * Get admin dashboard link
 * @returns {string} Dashboard URL
 */
export const getAdminDashboardLink = () => {
  return '/admin/dashboard';
};

/**
 * Get admin route by path
 * @param {string} path - Route path
 * @returns {Object|null} Route object
 */
export const getAdminRoute = (path) => {
  return ADMIN_ROUTES.find(route => route.path === path) || null;
};

/**
 * Check if path is admin route
 * @param {string} path - Route path
 * @returns {boolean} True if admin route
 */
export const isAdminRoute = (path) => {
  return ADMIN_ROUTES.some(route => route.path === path);
};

/**
 * Get admin breadcrumbs for path
 * @param {string} path - Current path
 * @returns {Array} Breadcrumb array
 */
export const getAdminBreadcrumbs = (path) => {
  const route = getAdminRoute(path);
  if (!route) return [];
  
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Admin', path: '/admin/dashboard' },
  ];
  
  if (route) {
    breadcrumbs.push({ label: route.label, path: route.path });
  }
  
  return breadcrumbs;
};

// ============================================
// ADMIN ROUTES LIST
// ============================================

export const ADMIN_ROUTES = [
  { 
    path: '/admin/dashboard', 
    label: 'Dashboard', 
    icon: 'FiHome',
    description: 'Overview of platform metrics',
    permission: 'view_analytics',
    order: 1,
  },
  { 
    path: '/admin/users', 
    label: 'Users', 
    icon: 'FiUsers',
    description: 'Manage all platform users',
    permission: 'manage_users',
    order: 2,
  },
  { 
    path: '/admin/restaurants', 
    label: 'Restaurants', 
    icon: 'FaUtensils',
    description: 'Manage restaurants and menus',
    permission: 'manage_restaurants',
    order: 3,
  },
  { 
    path: '/admin/orders', 
    label: 'Orders', 
    icon: 'FiPackage',
    description: 'View and manage orders',
    permission: 'manage_orders',
    order: 4,
  },
  { 
    path: '/admin/delivery-partners', 
    label: 'Delivery', 
    icon: 'FiTruck',
    description: 'Manage delivery partners',
    permission: 'manage_delivery',
    order: 5,
  },
  { 
    path: '/admin/payments', 
    label: 'Payments', 
    icon: 'FiCreditCard',
    description: 'Manage payments and transactions',
    permission: 'manage_payments',
    order: 6,
  },
  { 
    path: '/admin/analytics', 
    label: 'Analytics', 
    icon: 'FiBarChart2',
    description: 'Platform analytics and reports',
    permission: 'view_analytics',
    order: 7,
  },
  { 
    path: '/admin/settings', 
    label: 'Settings', 
    icon: 'FiSettings',
    description: 'Platform settings',
    permission: 'manage_settings',
    order: 8,
  },
  { 
    path: '/admin/support', 
    label: 'Support', 
    icon: 'FiHelpCircle',
    description: 'Support tickets and queries',
    permission: 'manage_support',
    order: 9,
  },
  { 
    path: '/admin/logs', 
    label: 'Logs', 
    icon: 'FiFileText',
    description: 'Platform activity logs',
    permission: 'view_analytics',
    order: 10,
  },
];

// ============================================
// ADMIN SIDEBAR GROUPS
// ============================================

export const ADMIN_SIDEBAR_GROUPS = [
  {
    id: 'main',
    label: 'Main',
    icon: 'FiGrid',
    routes: ['/admin/dashboard', '/admin/analytics'],
  },
  {
    id: 'management',
    label: 'Management',
    icon: 'FiBriefcase',
    routes: ['/admin/users', '/admin/restaurants', '/admin/orders', '/admin/delivery-partners'],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: 'FiDollarSign',
    routes: ['/admin/payments'],
  },
  {
    id: 'system',
    label: 'System',
    icon: 'FiSettings',
    routes: ['/admin/settings', '/admin/support', '/admin/logs'],
  },
];

// ============================================
// ROLE DISPLAY FUNCTIONS
// ============================================

/**
 * Get user role display name
 * @param {string} role - User role
 * @returns {string} Display name
 */
export const getRoleDisplay = (role) => {
  const roles = {
    admin: 'Administrator',
    super_admin: 'Super Administrator',
    sub_admin: 'Sub Administrator',
    support: 'Support Staff',
    customer: 'Customer',
    restaurant_owner: 'Restaurant Owner',
    delivery_partner: 'Delivery Partner',
  };
  return roles[role] || role || 'Unknown';
};

/**
 * Get role color for badges
 * @param {string} role - User role
 * @returns {string} Color class
 */
export const getRoleColor = (role) => {
  const colors = {
    admin: 'red',
    super_admin: 'purple',
    sub_admin: 'blue',
    support: 'green',
    customer: 'gray',
    restaurant_owner: 'orange',
    delivery_partner: 'teal',
  };
  return colors[role] || 'gray';
};

/**
 * Get role badge variant
 * @param {string} role - User role
 * @returns {string} Badge variant
 */
export const getRoleBadgeVariant = (role) => {
  const variants = {
    admin: 'danger',
    super_admin: 'dark',
    sub_admin: 'primary',
    support: 'success',
    customer: 'secondary',
    restaurant_owner: 'warning',
    delivery_partner: 'info',
  };
  return variants[role] || 'secondary';
};

// ============================================
// PERMISSION HELPERS
// ============================================

/**
 * Get all permissions for a role
 * @param {string} role - User role
 * @returns {string[]} Array of permissions
 */
export const getRolePermissions = (role) => {
  const permissionsMap = {
    super_admin: Object.values(ADMIN_CONSTANTS.PERMISSIONS),
    admin: Object.values(ADMIN_CONSTANTS.PERMISSIONS),
    sub_admin: [
      ADMIN_CONSTANTS.PERMISSIONS.VIEW_ANALYTICS,
      ADMIN_CONSTANTS.PERMISSIONS.MANAGE_USERS,
      ADMIN_CONSTANTS.PERMISSIONS.MANAGE_ORDERS,
    ],
    support: [
      ADMIN_CONSTANTS.PERMISSIONS.MANAGE_SUPPORT,
      ADMIN_CONSTANTS.PERMISSIONS.VIEW_ANALYTICS,
    ],
    customer: [],
    restaurant_owner: [],
    delivery_partner: [],
  };
  return permissionsMap[role] || [];
};

/**
 * Check if user can access admin route
 * @param {Object} user - User object
 * @param {Object} route - Route object
 * @returns {boolean} True if can access
 */
export const canAccessAdminRoute = (user, route) => {
  if (!user) return false;
  
  // Super admin and admin can access all routes
  if (isSuperAdmin(user) || isAdmin(user)) return true;
  
  // Check route permission
  if (route.permission) {
    return hasAdminPermission(user, route.permission);
  }
  
  return false;
};

/**
 * Get accessible admin routes for user
 * @param {Object} user - User object
 * @returns {Array} Accessible routes
 */
export const getAccessibleAdminRoutes = (user) => {
  if (!user) return [];
  
  return ADMIN_ROUTES.filter(route => canAccessAdminRoute(user, route));
};

/**
 * Get admin routes by group for user
 * @param {Object} user - User object
 * @returns {Object} Grouped routes
 */
export const getGroupedAdminRoutes = (user) => {
  const accessibleRoutes = getAccessibleAdminRoutes(user);
  
  return ADMIN_SIDEBAR_GROUPS.map(group => ({
    ...group,
    routes: group.routes
      .filter(path => accessibleRoutes.some(route => route.path === path))
      .map(path => accessibleRoutes.find(route => route.path === path))
      .filter(Boolean),
  })).filter(group => group.routes.length > 0);
};

// ============================================
// MISC ADMIN HELPERS
// ============================================

/**
 * Generate admin stats for dashboard
 * @param {Object} data - Stats data
 * @returns {Array} Formatted stats
 */
export const getDashboardStats = (data = {}) => {
  return ADMIN_CONSTANTS.DASHBOARD_STATS.map(stat => ({
    ...stat,
    value: data[stat.id] || 0,
  }));
};

/**
 * Format admin error message
 * @param {Error} error - Error object
 * @returns {string} Formatted error message
 */
export const formatAdminError = (error) => {
  if (!error) return 'An unknown error occurred';
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unknown error occurred';
};

/**
 * Check if admin dashboard should show maintenance
 * @returns {boolean} True if maintenance mode
 */
export const isMaintenanceMode = () => {
  return process.env.REACT_APP_MAINTENANCE_MODE === 'true';
};

/**
 * Get admin theme preference
 * @param {string} userPreference - User theme preference
 * @returns {string} Theme to use
 */
export const getAdminTheme = (userPreference) => {
  // Admin can override theme preference
  const adminTheme = localStorage.getItem('food_delivery_admin_theme');
  return adminTheme || userPreference || 'light';
};

// ============================================
// EXPORT ALL FUNCTIONS
// ============================================

const adminHelper = {
  // Credentials
  ADMIN_CREDENTIALS,
  ADMIN_CONSTANTS,
  
  // Check functions
  isAdmin,
  isSuperAdmin,
  hasAdminPermission,
  hasAdminPermissions,
  hasAnyAdminPermission,
  
  // Routes & Navigation
  ADMIN_ROUTES,
  ADMIN_SIDEBAR_GROUPS,
  getAdminDashboardLink,
  getAdminRoute,
  isAdminRoute,
  getAdminBreadcrumbs,
  getAccessibleAdminRoutes,
  getGroupedAdminRoutes,
  canAccessAdminRoute,
  
  // Role helpers
  getRoleDisplay,
  getRoleColor,
  getRoleBadgeVariant,
  getRolePermissions,
  
  // Misc helpers
  getDashboardStats,
  formatAdminError,
  isMaintenanceMode,
  getAdminTheme,
};

export default adminHelper;