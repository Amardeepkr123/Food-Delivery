// src/pages/customer/CustomerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiStar,
  FiShoppingBag,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiEdit2,
  FiCamera,
  FiTruck,
  FiPackage,
  FiCheckCircle,
  FiXCircle,
  FiClock as FiClockIcon,
  FiHome,
  FiBriefcase,
  FiPlus,
  FiTrash2,
  FiCreditCard,
  FiDollarSign,
  FiBell,
  FiMail as FiMailIcon,
  FiSmartphone,
  FiGlobe,
  FiMoon,
  FiSun,
  FiAlertCircle,
  FiChevronRight,
  FiX,
  FiAward,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiGift,
  FiZap,
  FiCoffee,
  FiLock,          // ✅ ADDED - Was missing
  FiShield,        // ✅ ADDED - For security
  FiEye,           // ✅ ADDED - For password visibility
  FiEyeOff,        // ✅ ADDED - For password visibility
} from 'react-icons/fi';
import { 
  FaUtensils, 
  FaPizzaSlice, 
  FaHamburger, 
  FaIceCream, 
  FaCoffee as FaCoffeeIcon,
  FaLeaf,
  FaPepperHot,
  FaFish,
  FaBirthdayCake
} from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

// ============================================
// SUB-COMPONENTS
// ============================================

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color, subtitle }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-5 text-center hover:shadow-3xl transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-white text-xl mx-auto mb-3`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>}
    </motion.div>
  );
};

// Order Card Component
const OrderCard = ({ order, onTrack, onReorder, onRate }) => {
  const StatusIcon = getStatusIcon(order.status);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors gap-3"
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{order.image}</span>
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">{order.restaurant}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{order.items}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
            <span>{order.date}</span>
            <span>•</span>
            <span>{order.time}</span>
            <span>•</span>
            <span className="font-medium text-gray-600 dark:text-gray-300">${order.total}</span>
          </div>
          {order.rating && (
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={`w-3 h-3 ${i < order.rating ? 'fill-current text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
              ))}
              <span className="text-xs text-gray-500 ml-1">{order.review}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <span className={`text-xs px-3 py-1.5 rounded-full ${getStatusColor(order.status)} font-medium flex items-center gap-1`}>
          <StatusIcon className="w-3 h-3" />
          {getStatusText(order.status)}
        </span>
        {order.status === 'in_transit' && (
          <button
            onClick={() => onTrack(order.id)}
            className="text-xs px-3 py-1.5 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          >
            Track
          </button>
        )}
        {order.status === 'delivered' && (
          <button
            onClick={() => onReorder(order.id)}
            className="text-xs px-3 py-1.5 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
          >
            Reorder
          </button>
        )}
        {order.status === 'delivered' && !order.rating && (
          <button
            onClick={() => onRate(order.id)}
            className="text-xs px-3 py-1.5 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-colors"
          >
            Rate
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Activity Item Component
const ActivityItem = ({ activity }) => {
  const Icon = activity.icon;
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800 dark:text-white">{activity.action}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
      </div>
    </div>
  );
};

// Notification Item Component
const NotificationItem = ({ notification, onMarkRead }) => {
  const typeColors = {
    success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    promo: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  };

  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${!notification.read ? 'bg-orange-50/50 dark:bg-orange-900/10' : 'hover:bg-gray-50/50 dark:hover:bg-gray-800/50'}`}>
      <div className={`w-8 h-8 rounded-full ${typeColors[notification.type]} flex items-center justify-center flex-shrink-0`}>
        {notification.type === 'success' && <FiCheckCircle className="w-4 h-4" />}
        {notification.type === 'promo' && <FiGift className="w-4 h-4" />}
        {notification.type === 'info' && <FiInfo className="w-4 h-4" />}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800 dark:text-white">{notification.message}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
      </div>
      {!notification.read && (
        <button
          onClick={() => onMarkRead(notification.id)}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <FiCheck className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const getStatusColor = (status) => {
  const colors = {
    delivered: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    in_transit: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    preparing: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };
  return colors[status] || colors.preparing;
};

const getStatusIcon = (status) => {
  const icons = {
    delivered: FiCheckCircle,
    in_transit: FiTruck,
    preparing: FiClockIcon,
    cancelled: FiXCircle,
  };
  return icons[status] || FiClockIcon;
};

const getStatusText = (status) => {
  const texts = {
    delivered: 'Delivered',
    in_transit: 'In Transit',
    preparing: 'Preparing',
    cancelled: 'Cancelled',
  };
  return texts[status] || status;
};

// ============================================
// MAIN CUSTOMER DASHBOARD
// ============================================
const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockOrders = [
          {
            id: '#ORD-2024-001',
            restaurant: 'Pizza Palace',
            items: '2x Margherita Pizza, 1x Garlic Bread',
            total: 36.97,
            status: 'delivered',
            date: '2024-01-15',
            time: '7:30 PM',
            image: '🍕',
            rating: 5,
            review: 'Amazing pizza! Best in town.'
          },
          {
            id: '#ORD-2024-002',
            restaurant: 'Burger House',
            items: '1x Whopper Meal, 1x Fries',
            total: 18.99,
            status: 'in_transit',
            date: '2024-01-14',
            time: '1:15 PM',
            image: '🍔',
            rating: null,
            review: null
          },
          {
            id: '#ORD-2024-003',
            restaurant: 'Sushi Master',
            items: '3x California Roll, 2x Miso Soup',
            total: 45.00,
            status: 'preparing',
            date: '2024-01-14',
            time: '11:00 AM',
            image: '🍣',
            rating: null,
            review: null
          },
          {
            id: '#ORD-2024-004',
            restaurant: 'Thai Garden',
            items: '1x Green Curry, 2x Rice',
            total: 28.50,
            status: 'cancelled',
            date: '2024-01-13',
            time: '8:45 PM',
            image: '🥘',
            rating: null,
            review: null
          }
        ];

        const mockFavorites = [
          { id: 1, name: 'Margherita Pizza', restaurant: 'Pizza Palace', price: 16.99, image: '🍕', rating: 4.8 },
          { id: 2, name: 'Classic Burger', restaurant: 'Burger House', price: 12.99, image: '🍔', rating: 4.5 },
          { id: 3, name: 'California Roll', restaurant: 'Sushi Master', price: 14.99, image: '🍣', rating: 4.9 },
          { id: 4, name: 'Tiramisu', restaurant: 'Pizza Palace', price: 8.99, image: '🍰', rating: 4.7 }
        ];

        const mockStats = {
          totalOrders: 24,
          totalSpent: 156.49,
          favorites: 12,
          reviews: 8,
          loyaltyPoints: 450,
          loyaltyLevel: 'Gold'
        };

        const mockRecentActivity = [
          { action: 'Ordered from Pizza Palace', time: '2 hours ago', icon: FiShoppingBag },
          { action: 'Added Margherita Pizza to favorites', time: '1 day ago', icon: FiHeart },
          { action: 'Reviewed Sushi Master', time: '3 days ago', icon: FiStar },
          { action: 'Earned 50 loyalty points', time: '5 days ago', icon: FiAward }
        ];

        const mockNotifications = [
          { id: 1, message: 'Your order #ORD-2024-001 has been delivered!', time: '2 hours ago', read: false, type: 'success' },
          { id: 2, message: 'Special offer: 20% off on your next order!', time: '1 day ago', read: false, type: 'promo' },
          { id: 3, message: 'Your order #ORD-2024-002 is out for delivery', time: '3 hours ago', read: true, type: 'info' }
        ];

        setOrders(mockOrders);
        setFavorites(mockFavorites);
        setStats(mockStats);
        setRecentActivity(mockRecentActivity);
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleRepeatOrder = (orderId) => {
    navigate('/checkout');
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/tracking/${orderId}`);
  };

  const handleViewRestaurant = (restaurant) => {
    navigate(`/restaurant/${restaurant.toLowerCase().replace(/\s/g, '-')}`);
  };

  const handleRateOrder = (orderId) => {
    toast.success('Rating feature coming soon! ⭐');
  };

  const handleMarkNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    toast.success('All notifications marked as read');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium animate-pulse">
              Loading dashboard...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <FiUser className="text-orange-500" />
              My Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back, {user?.name || 'Customer'}!
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300 relative"
              >
                <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
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
                    className="absolute right-0 top-full mt-2 w-80 glass-card rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                      <h4 className="font-semibold text-gray-800 dark:text-white">Notifications</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs text-orange-500 hover:text-orange-600 transition-colors"
                        >
                          Mark all read
                        </button>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <FiX className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <div className="p-2">
                      {notifications.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <FiBell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkRead={handleMarkNotificationRead}
                          />
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiRefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatsCard
            icon={FiShoppingBag}
            label="Total Orders"
            value={stats.totalOrders}
            color="from-blue-500 to-cyan-500"
          />
          <StatsCard
            icon={FiDollarSign}
            label="Total Spent"
            value={`$${stats.totalSpent.toFixed(2)}`}
            color="from-green-500 to-emerald-500"
          />
          <StatsCard
            icon={FiHeart}
            label="Favorites"
            value={stats.favorites}
            color="from-red-500 to-pink-500"
          />
          <StatsCard
            icon={FiStar}
            label="Reviews"
            value={stats.reviews}
            color="from-yellow-500 to-yellow-600"
          />
        </motion.div>

        {/* Loyalty Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-3xl shadow-lg">
                🏆
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {stats.loyaltyLevel} Member
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {stats.loyaltyPoints} points earned
                </p>
                <div className="mt-1 w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-semibold flex items-center gap-1">
                <FiAward className="w-4 h-4" />
                {stats.loyaltyPoints} pts
              </span>
              <span className="px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-semibold flex items-center gap-1">
                <FiGift className="w-4 h-4" />
                {Math.floor(stats.loyaltyPoints / 50)} rewards
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            {['overview', 'orders', 'favorites', 'profile', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <FiPackage className="text-orange-500" />
                      Recent Orders
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-sm text-orange-500 hover:text-orange-600 font-semibold"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {orders.slice(0, 3).map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onTrack={handleTrackOrder}
                        onReorder={handleRepeatOrder}
                        onRate={handleRateOrder}
                      />
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiClock className="text-orange-500" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <ActivityItem key={index} activity={activity} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="glass-card rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiPackage className="text-orange-500" />
                    Order History
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="px-4 py-2 rounded-xl food-input text-sm"
                    />
                    <button className="p-2 rounded-xl glass-card hover:shadow-2xl transition-all duration-300">
                      <FiFilter className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onTrack={handleTrackOrder}
                      onReorder={handleRepeatOrder}
                      onRate={handleRateOrder}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FiHeart className="text-orange-500" />
                  Your Favorites
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -5 }}
                      className="glass-card rounded-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300"
                    >
                      <div className="relative h-32 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-5xl">
                        {item.image}
                        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                          <FiTrash2 className="w-3 h-3 text-red-400" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{item.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.restaurant}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-orange-500">${item.price}</span>
                          <div className="flex items-center gap-1">
                            <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 dark:text-gray-300">{item.rating}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewRestaurant(item.restaurant)}
                          className="w-full mt-2 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                        >
                          Order Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="glass-card rounded-2xl p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-3xl font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-colors">
                      <FiCamera className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.name || 'Customer'}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FiMail className="w-4 h-4" /> {user?.email || 'email@example.com'}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiPhone className="w-4 h-4" /> {user?.phone || 'Not provided'}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" /> Member since Jan 2024
                      </span>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300">
                        <FiEdit2 className="inline mr-2" /> Edit Profile
                      </button>
                      <button className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
                        <FiMapPin className="inline mr-2" /> Manage Addresses
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiSettings className="text-orange-500" />
                    Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                      <button className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors">
                        <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform translate-x-1" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">Language</span>
                      <select className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="es">Spanish</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">Currency</span>
                      <select className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm">
                        <option value="usd">USD ($)</option>
                        <option value="inr">INR (₹)</option>
                        <option value="eur">EUR (€)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                      <div className="flex items-center gap-2">
                        <button className="relative w-12 h-6 rounded-full bg-orange-500 transition-colors">
                          <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform translate-x-7" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <span className="text-gray-700 dark:text-gray-300">SMS Notifications</span>
                      <div className="flex items-center gap-2">
                        <button className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors">
                          <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiAlertCircle className="text-orange-500" />
                    Account Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FiLock className="text-orange-500" />
                        Change Password
                      </span>
                      <FiChevronRight className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FiShield className="text-orange-500" />
                        Security Settings
                      </span>
                      <FiChevronRight className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FiCreditCard className="text-orange-500" />
                        Payment Methods
                      </span>
                      <FiChevronRight className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FiMapPin className="text-orange-500" />
                        Saved Addresses
                      </span>
                      <FiChevronRight className="text-gray-400" />
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <span className="text-red-600 dark:text-red-400 flex items-center gap-2">
                        <FiLogOut className="w-4 h-4" />
                        Logout
                      </span>
                      <FiChevronRight className="text-red-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                      <span className="text-red-600 dark:text-red-400 flex items-center gap-2">
                        <FiAlertCircle className="w-4 h-4" />
                        Delete Account
                      </span>
                      <FiChevronRight className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default CustomerDashboard;