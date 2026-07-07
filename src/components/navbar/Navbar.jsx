// src/components/navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../common/ThemeToggle';
import { 
  FiHome, 
  FiSearch, 
  FiShoppingBag, 
  FiUser, 
  FiMenu, 
  FiX,
  FiChevronDown,
  FiLogOut,
  FiSettings,
  FiHeart,
  FiClock,
  FiShield,
  FiUsers,
  FiPackage,
  FiTruck,
  FiStar,
  FiAward,
  FiBarChart2,
  FiBell,
  FiMessageCircle,
} from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order received', read: false, time: '5 mins ago' },
    { id: 2, message: 'Payment successful', read: false, time: '10 mins ago' },
    { id: 3, message: 'Restaurant approved', read: true, time: '1 hour ago' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if user is admin
  const isAdmin = user?.role === 'admin' || user?.isAdmin === true;

  const navLinks = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/restaurants', label: 'Restaurants', icon: FaUtensils },
    { path: '/table-booking', label: 'Book Table', icon: FiClock },
    { path: '/profile', label: 'Profile', icon: FiUser },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  const getRoleBasedLink = () => {
    if (!user) return '/login';
    if (isAdmin) return '/admin/dashboard';
    switch (user.role) {
      case 'restaurant_owner':
        return '/restaurant-owner/dashboard';
      case 'delivery_partner':
        return '/delivery/dashboard';
      default:
        return '/customer/dashboard';
    }
  };

  const getRoleBadge = () => {
    if (isAdmin) return 'Admin';
    switch (user?.role) {
      case 'restaurant_owner': return 'Restaurant Owner';
      case 'delivery_partner': return 'Delivery Partner';
      default: return 'Customer';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  // Admin links for dropdown
  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FiBarChart2 },
    { path: '/admin/users', label: 'Users', icon: FiUsers },
    { path: '/admin/restaurants', label: 'Restaurants', icon: FaUtensils },
    { path: '/admin/orders', label: 'Orders', icon: FiPackage },
    { path: '/admin/delivery-partners', label: 'Delivery Partners', icon: FiTruck },
    { path: '/admin/analytics', label: 'Analytics', icon: FiBarChart2 },
    { path: '/admin/reports', label: 'Reports', icon: FiAward },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-card shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.span
              whileHover={{ rotate: 20 }}
              className="text-3xl"
            >
              🍽️
            </motion.span>
            <span className="text-xl font-bold food-gradient-text hidden sm:block">
              FoodDelivery
            </span>
            {isAdmin && (
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold shadow-lg hidden sm:inline-flex items-center gap-1">
                <FiShield className="w-3 h-3" />
                Admin
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  location.pathname === link.path
                    ? 'food-gradient-bg text-white shadow-lg shadow-red-500/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <link.icon className="text-sm" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FiSearch className="text-xl text-gray-600 dark:text-gray-300" />
            </motion.button>

            {/* Cart */}
            <Link to="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FiShoppingBag className="text-xl text-gray-600 dark:text-gray-300" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full food-gradient-bg text-white text-xs font-bold flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FiBell className="text-xl text-gray-600 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 glass-card rounded-2xl overflow-hidden shadow-2xl z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h4 className="font-semibold text-gray-800 dark:text-white">Notifications</h4>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs text-orange-500 hover:text-orange-600 transition-colors"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <button
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification.id)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                              !notification.read ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-1.5 ${!notification.read ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                              <div>
                                <p className="text-sm text-gray-800 dark:text-white">{notification.message}</p>
                                <p className="text-xs text-gray-400">{notification.time}</p>
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Profile / Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full food-gradient-bg flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <FiChevronDown className={`text-gray-600 dark:text-gray-300 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-72 glass-card rounded-2xl overflow-hidden shadow-2xl z-50"
                    >
                      {/* User Info */}
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full food-gradient-bg flex items-center justify-center text-white font-bold text-lg">
                            {user?.name?.charAt(0) || 'U'}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 dark:text-white">{user?.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                            <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 mt-1">
                              {getRoleBadge()}
                            </span>
                          </div>
                          {isAdmin && (
                            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold shadow-lg flex items-center gap-1">
                              <FiShield className="w-3 h-3" />
                              Admin
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {/* Profile */}
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiUser className="text-sm" />
                          <span>Profile</span>
                        </Link>

                        {/* Dashboard */}
                        <Link
                          to={getRoleBasedLink()}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiSettings className="text-sm" />
                          <span>Dashboard</span>
                        </Link>

                        {/* Admin Links */}
                        {isAdmin && (
                          <>
                            <div className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wider font-semibold">
                              Admin Panel
                            </div>
                            {adminLinks.map((link) => (
                              <Link
                                key={link.path}
                                to={link.path}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                                onClick={() => setIsProfileOpen(false)}
                              >
                                <link.icon className="text-sm" />
                                <span>{link.label}</span>
                              </Link>
                            ))}
                          </>
                        )}

                        {/* Orders */}
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiPackage className="text-sm" />
                          <span>My Orders</span>
                        </Link>

                        {/* Favorites */}
                        <Link
                          to="/favorites"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiHeart className="text-sm" />
                          <span>Favorites</span>
                        </Link>

                        {/* Chat Support */}
                        <Link
                          to="/support"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiMessageCircle className="text-sm" />
                          <span>Support</span>
                        </Link>

                        {/* Logout */}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500 mt-2 border-t border-gray-200 dark:border-gray-700 pt-2"
                        >
                          <FiLogOut className="text-sm" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl food-gradient-bg text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300"
                  >
                    Sign In
                  </motion.button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'food-gradient-bg text-white shadow-lg shadow-red-500/30'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="text-sm" />
                    <span>{link.label}</span>
                  </Link>
                ))}

                {/* Admin Mobile Links */}
                {isAuthenticated && isAdmin && (
                  <>
                    <div className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wider font-semibold">
                      Admin Panel
                    </div>
                    {adminLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 dark:text-orange-400 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        <link.icon className="text-sm" />
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </>
                )}

                {/* Auth Mobile Links */}
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl food-gradient-bg text-white shadow-lg shadow-red-500/30"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiUser className="text-sm" />
                    <span>Sign In</span>
                  </Link>
                )}

                {/* Cart Mobile */}
                <Link
                  to="/cart"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiShoppingBag className="text-sm" />
                  <span>Cart</span>
                  {itemCount > 0 && (
                    <span className="ml-auto px-2 py-0.5 rounded-full food-gradient-bg text-white text-xs font-bold">
                      {itemCount}
                    </span>
                  )}
                </Link>

                {/* Logout Mobile */}
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-2 border-t border-gray-200 dark:border-gray-700 pt-3"
                  >
                    <FiLogOut className="text-sm" />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 right-0 top-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-4 border-b border-gray-200 dark:border-gray-700 shadow-xl"
            >
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
                <input
                  type="text"
                  placeholder="Search restaurants, dishes, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 focus:outline-none transition-all"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl food-gradient-bg text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all"
                >
                  <FiSearch className="text-xl" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;