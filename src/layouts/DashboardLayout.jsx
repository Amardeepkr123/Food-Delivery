// src/layouts/DashboardLayout.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiPackage,
  FiUsers,
  FiTruck,
  FiDollarSign,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiUser,
  FiGrid,
  FiBarChart2,
  FiCalendar,
  FiTag,
  FiStar,
  FiFileText,
} from 'react-icons/fi';
import { useAuthContext } from '../context/AuthContext';
import { useNotificationContext } from '../context/NotificationContext';
import ThemeToggle from '../components/common/ThemeToggle';
import { toast } from 'react-toastify';

// ============================================
// NOTIFICATION DROPDOWN COMPONENT
// ============================================
const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead } = useNotificationContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleMarkAsRead = (id) => {
    markAsRead(id);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <FiBell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={() => {
                  notifications.forEach(n => !n.read && handleMarkAsRead(n.id));
                }}
                className="text-xs text-orange-500 hover:text-orange-600"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            ) : (
              notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    !notification.read ? 'bg-orange-50 dark:bg-orange-900/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-xs text-orange-500 hover:text-orange-600"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/admin/notifications"
              className="block text-center text-sm text-orange-500 hover:text-orange-600"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// USER MENU COMPONENT
// ============================================
const UserMenu = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const menuItems = [
    { label: 'Profile', icon: FiUser, path: '/profile' },
    { label: 'My Orders', icon: FiPackage, path: '/my-orders' },
    { label: 'Settings', icon: FiSettings, path: '/settings' },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <span className="hidden md:block text-sm text-gray-700 dark:text-gray-300">
          {user?.name || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-800 dark:text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
          <div className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// SIDEBAR MENU ITEMS
// ============================================
const getMenuItems = (role) => {
  const baseItems = [
    { label: 'Dashboard', icon: FiGrid, path: '/dashboard', roles: ['admin', 'restaurant_owner', 'delivery_partner'] },
  ];

  const roleSpecificItems = {
    admin: [
      { label: 'Orders', icon: FiPackage, path: '/admin/orders' },
      { label: 'Restaurants', icon: FiGrid, path: '/admin/restaurants' },
      { label: 'Users', icon: FiUsers, path: '/admin/users' },
      { label: 'Delivery Partners', icon: FiTruck, path: '/admin/delivery-partners' },
      { label: 'Bookings', icon: FiCalendar, path: '/admin/bookings' },
      { label: 'Payments', icon: FiDollarSign, path: '/admin/payments' },
      { label: 'Coupons', icon: FiTag, path: '/admin/coupons' },
      { label: 'Reviews', icon: FiStar, path: '/admin/reviews' },
      { label: 'Reports', icon: FiFileText, path: '/admin/reports' },
      { label: 'Analytics', icon: FiBarChart2, path: '/admin/analytics' },
      { label: 'Settings', icon: FiSettings, path: '/admin/settings' },
    ],
    restaurant_owner: [
      { label: 'Menu', icon: FiGrid, path: '/restaurant-owner/menu' },
      { label: 'Orders', icon: FiPackage, path: '/restaurant-owner/orders' },
      { label: 'Reservations', icon: FiCalendar, path: '/restaurant-owner/reservations' },
      { label: 'Analytics', icon: FiBarChart2, path: '/restaurant-owner/analytics' },
    ],
    delivery_partner: [
      { label: 'Available Orders', icon: FiPackage, path: '/delivery/available' },
      { label: 'Accepted Orders', icon: FiTruck, path: '/delivery/accepted' },
      { label: 'Live Delivery', icon: FiGrid, path: '/delivery/live' },
      { label: 'Earnings', icon: FiDollarSign, path: '/delivery/earnings' },
    ],
    customer: [
      { label: 'My Orders', icon: FiPackage, path: '/my-orders' },
      { label: 'Favorites', icon: FiStar, path: '/favorites' },
    ],
  };

  return [...baseItems, ...(roleSpecificItems[role] || roleSpecificItems.customer)];
};

// ============================================
// DASHBOARD LAYOUT
// ============================================
const DashboardLayout = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = getMenuItems(user?.role || 'customer');

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-40 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FoodDelivery
            </span>
          </Link>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`lg:ml-64 transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                {menuItems.find(item => isActive(item.path))?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <NotificationDropdown />
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;