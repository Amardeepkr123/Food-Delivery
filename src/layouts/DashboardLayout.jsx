// src/layouts/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiPackage,
  FiTruck,
  FiDollarSign,
  FiStar,
  FiAward,
  FiBarChart2,
  FiFileText,
  FiBell,
  FiSettings,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiGrid,
  FiClock,
  FiMapPin,
  FiMessageCircle,
  FiTrendingUp,
  FiZap,
  FiShield,
  FiHelpCircle,
  FiMail,
  FiCalendar,
  FiFlag,
  FiTag,
  FiGift,
  FiHeart,
  FiShare2,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { FaUtensils, FaStore, FaMotorcycle, FaCrown } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useNotificationContext } from '../context/NotificationContext';
import ThemeToggle from '../components/common/ThemeToggle';
import NotificationDropdown from '../components/common/NotificationDropdown';
import UserMenu from '../components/common/UserMenu';

// ============================================
// SIDEBAR MENU ITEMS
// ============================================
const getMenuItems = (role) => {
  const baseItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiGrid },
    { path: '/orders', label: 'Orders', icon: FiPackage },
    { path: '/restaurants', label: 'Restaurants', icon: FaStore },
    { path: '/profile', label: 'Profile', icon: FiUser },
  ];

  const roleSpecificItems = {
    admin: [
      { path: '/admin/users', label: 'Users', icon: FiUsers },
      { path: '/admin/restaurants', label: 'Restaurants', icon: FaStore },
      { path: '/admin/delivery-partners', label: 'Delivery Partners', icon: FiTruck },
      { path: '/admin/analytics', label: 'Analytics', icon: FiBarChart2 },
      { path: '/admin/reports', label: 'Reports', icon: FiFileText },
      { path: '/admin/settings', label: 'Settings', icon: FiSettings },
    ],
    restaurant_owner: [
      { path: '/restaurant-owner/dashboard', label: 'Dashboard', icon: FiGrid },
      { path: '/restaurant-owner/menu', label: 'Menu Management', icon: FaUtensils },
      { path: '/restaurant-owner/orders', label: 'Orders', icon: FiPackage },
      { path: '/restaurant-owner/reservations', label: 'Reservations', icon: FiCalendar },
      { path: '/restaurant-owner/analytics', label: 'Analytics', icon: FiBarChart2 },
    ],
    delivery_partner: [
      { path: '/delivery/dashboard', label: 'Dashboard', icon: FiGrid },
      { path: '/delivery/orders', label: 'Available Orders', icon: FiPackage },
      { path: '/delivery/earnings', label: 'Earnings', icon: FiDollarSign },
      { path: '/delivery/live', label: 'Live Tracking', icon: FiMapPin },
    ],
    customer: [
      { path: '/customer/dashboard', label: 'Dashboard', icon: FiGrid },
      { path: '/orders', label: 'My Orders', icon: FiPackage },
      { path: '/bookings', label: 'My Bookings', icon: FiCalendar },
      { path: '/favorites', label: 'Favorites', icon: FiHeart },
      { path: '/reviews', label: 'My Reviews', icon: FiStar },
    ],
  };

  return [...baseItems, ...(roleSpecificItems[role] || roleSpecificItems.customer)];
};

// ============================================
// SIDEBAR COMPONENT
// ============================================
const Sidebar = ({ isOpen, onToggle, menuItems, activePath, role }) => {
  const navigate = useNavigate();

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      transition={{ type: 'spring', damping: 20 }}
      className={`fixed top-0 left-0 h-full w-[280px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 z-50 overflow-y-auto`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="text-xl font-bold food-gradient-text">FoodDelivery</span>
        </Link>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
            {role?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 dark:text-white truncate">
              {role === 'admin' ? 'Admin User' : role === 'restaurant_owner' ? 'Restaurant Owner' : role === 'delivery_partner' ? 'Delivery Partner' : 'Customer'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role || 'user'}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = activePath === item.path || activePath.startsWith(item.path + '/');
          return (
            <motion.button
              key={item.path}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigate(item.path);
                if (window.innerWidth < 1024) onToggle();
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={() => {
            // Logout logic
            navigate('/login');
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};

// ============================================
// HEADER COMPONENT
// ============================================
const Header = ({ onMenuToggle, user, role }) => {
  const location = useLocation();
  const { unreadCount } = useNotificationContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Get page title from path
  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/dashboard': 'Dashboard',
      '/admin/users': 'Users',
      '/admin/restaurants': 'Restaurants',
      '/admin/delivery-partners': 'Delivery Partners',
      '/admin/analytics': 'Analytics',
      '/admin/reports': 'Reports',
      '/admin/settings': 'Settings',
      '/restaurant-owner/dashboard': 'Restaurant Dashboard',
      '/restaurant-owner/menu': 'Menu Management',
      '/restaurant-owner/orders': 'Orders',
      '/restaurant-owner/reservations': 'Reservations',
      '/restaurant-owner/analytics': 'Analytics',
      '/delivery/dashboard': 'Delivery Dashboard',
      '/delivery/orders': 'Available Orders',
      '/delivery/earnings': 'Earnings',
      '/delivery/live': 'Live Tracking',
      '/customer/dashboard': 'Customer Dashboard',
      '/orders': 'My Orders',
      '/bookings': 'My Bookings',
      '/favorites': 'Favorites',
      '/reviews': 'My Reviews',
      '/profile': 'Profile',
    };
    return titles[path] || 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">
              {getPageTitle()}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Panel` : 'Dashboard'}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FiSearch className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            >
              <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <NotificationDropdown
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
            />
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                {role?.charAt(0) || 'U'}
              </div>
              <FiChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <UserMenu
              isOpen={showUserMenu}
              onClose={() => setShowUserMenu(false)}
              user={user}
              role={role}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

// ============================================
// MAIN DASHBOARD LAYOUT
// ============================================
const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const role = user?.role || 'customer';
  const menuItems = getMenuItems(role);

  // Handle responsive
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        menuItems={menuItems}
        activePath={location.pathname}
        role={role}
      />

      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen && !isMobile ? 'ml-[280px]' : 'ml-0'
        }`}
      >
        <Header
          onMenuToggle={toggleSidebar}
          user={user}
          role={role}
        />

        <main className="p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;