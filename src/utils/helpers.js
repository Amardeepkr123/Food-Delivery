// src/utils/adminHelper.js

// Admin credentials for testing
export const ADMIN_CREDENTIALS = {
  email: 'admin@fooddelivery.com',
  password: 'admin123',
};

// Check if user is admin
export const isAdmin = (user) => {
  if (!user) return false;
  return user?.role === 'admin' || user?.isAdmin === true;
};

// Get admin dashboard link
export const getAdminDashboardLink = () => {
  return '/admin/dashboard';
};

// Admin routes list
export const ADMIN_ROUTES = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: 'FiHome' },
  { path: '/admin/users', label: 'Users', icon: 'FiUsers' },
  { path: '/admin/restaurants', label: 'Restaurants', icon: 'FaUtensils' },
  { path: '/admin/orders', label: 'Orders', icon: 'FiPackage' },
  { path: '/admin/delivery-partners', label: 'Delivery', icon: 'FiTruck' },
  { path: '/admin/analytics', label: 'Analytics', icon: 'FiBarChart2' },
];

// Get user role display name
export const getRoleDisplay = (role) => {
  const roles = {
    admin: 'Administrator',
    customer: 'Customer',
    restaurant_owner: 'Restaurant Owner',
    delivery_partner: 'Delivery Partner',
  };
  return roles[role] || role;
};