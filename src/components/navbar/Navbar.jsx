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
  FiUsers  // Added this import
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
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => navigate('/restaurants')}
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
                      className="absolute right-0 mt-2 w-64 glass-card rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full food-gradient-bg flex items-center justify-center text-white font-bold text-sm">
                            {user?.name?.charAt(0) || 'U'}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 dark:text-white">{user?.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                          </div>
                          {/* Admin Badge */}
                          {isAdmin && (
                            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold shadow-lg flex items-center gap-1">
                              <FiShield className="w-3 h-3" />
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiUser className="text-sm" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to={getRoleBasedLink()}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiSettings className="text-sm" />
                          <span>Dashboard</span>
                        </Link>
                        {isAdmin && (
                          <>
                            <Link
                              to="/admin/users"
                              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <FiUsers className="text-sm" />
                              <span>Manage Users</span>
                            </Link>
                            <Link
                              to="/admin/restaurants"
                              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <FaUtensils className="text-sm" />
                              <span>Manage Restaurants</span>
                            </Link>
                          </>
                        )}
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiClock className="text-sm" />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          to="/favorites"
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiHeart className="text-sm" />
                          <span>Favorites</span>
                        </Link>
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
                {isAuthenticated && isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiShield className="text-sm" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;