import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, 
  FiTruck, 
  FiStar, 
  FiClock, 
  FiDollarSign, 
  FiPackage, 
  FiCheckCircle,
  FiXCircle,
  FiBell,
  FiSettings,
  FiLogOut,
  FiMapPin,
  FiNavigation,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiMoreVertical,
  FiPhone,
  FiMail,
  FiAward,
  FiGift,
  FiZap,
  FiCoffee,
  FiSun,
  FiMoon,
  FiRefreshCw,
  FiEdit2,
  FiEye,
  FiMessageSquare,
  FiExternalLink
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';

// Reusable Components
const StatCard = ({ icon: Icon, label, value, change, color, trend }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5 }}
    className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        {change && (
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? (
              <FiTrendingUp className="text-green-500 text-sm" />
            ) : (
              <FiTrendingDown className="text-red-500 text-sm" />
            )}
            <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-white text-xl shadow-lg`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </motion.div>
);

const StatusBadge = ({ status }) => {
  const statusConfig = {
    online: { color: 'bg-green-500', text: 'Online' },
    offline: { color: 'bg-gray-500', text: 'Offline' },
    busy: { color: 'bg-orange-500', text: 'Busy' },
    on_delivery: { color: 'bg-blue-500', text: 'On Delivery' },
  };
  const config = statusConfig[status] || statusConfig.offline;
  return (
    <span className={`px-3 py-1 rounded-full ${config.color} text-white text-xs font-semibold flex items-center gap-1`}>
      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
      {config.text}
    </span>
  );
};

const NotificationItem = ({ icon: Icon, message, time, isRead }) => (
  <div className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 ${isRead ? 'opacity-60' : 'bg-white/5'}`}>
    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-white">{message}</p>
      <p className="text-xs text-gray-400 mt-1">{time}</p>
    </div>
    {!isRead && <div className="w-2 h-2 rounded-full bg-orange-500 mt-1" />}
  </div>
);

const DeliveryPartnerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock Data
  const [stats, setStats] = useState({
    todayEarnings: 156.50,
    todayDeliveries: 12,
    rating: 4.8,
    activeOrders: 3,
    totalDeliveries: 342,
    totalEarnings: 4567.50,
    completionRate: 98,
    acceptanceRate: 92,
    onlineHours: '6h 45m',
  });

  const [recentDeliveries, setRecentDeliveries] = useState([
    {
      id: '#ORD-2024-001',
      restaurant: 'Pizza Palace',
      customer: 'Amit Sharma',
      amount: 36.97,
      status: 'delivered',
      time: '7:30 PM',
      distance: '2.3 km',
      earnings: 4.50
    },
    {
      id: '#ORD-2024-002',
      restaurant: 'Burger House',
      customer: 'Priya Patel',
      amount: 18.99,
      status: 'in_transit',
      time: '1:15 PM',
      distance: '1.8 km',
      earnings: 3.50
    },
    {
      id: '#ORD-2024-003',
      restaurant: 'Sushi Master',
      customer: 'Rahul Singh',
      amount: 45.00,
      status: 'preparing',
      time: '11:00 AM',
      distance: '3.5 km',
      earnings: 5.50
    },
    {
      id: '#ORD-2024-004',
      restaurant: 'Thai Garden',
      customer: 'Sneha Reddy',
      amount: 28.50,
      status: 'delivered',
      time: '8:45 PM',
      distance: '2.8 km',
      earnings: 4.00
    },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, icon: FiCheckCircle, message: 'Order #ORD-2024-001 delivered successfully!', time: '2 min ago', isRead: false },
    { id: 2, icon: FiDollarSign, message: 'You earned $4.50 from Pizza Palace delivery', time: '15 min ago', isRead: false },
    { id: 3, icon: FiStar, message: 'You received a 5-star rating from Amit Sharma', time: '1 hour ago', isRead: true },
    { id: 4, icon: FiBell, message: 'New order available #ORD-2024-005', time: '2 hours ago', isRead: true },
  ]);

  const weeklyData = [
    { day: 'Mon', deliveries: 12, earnings: 45 },
    { day: 'Tue', deliveries: 8, earnings: 32 },
    { day: 'Wed', deliveries: 14, earnings: 52 },
    { day: 'Thu', deliveries: 10, earnings: 38 },
    { day: 'Fri', deliveries: 16, earnings: 58 },
    { day: 'Sat', deliveries: 20, earnings: 72 },
    { day: 'Sun', deliveries: 15, earnings: 55 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      in_transit: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      preparing: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.preparing;
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: FiCheckCircle,
      in_transit: FiTruck,
      preparing: FiClock,
      cancelled: FiXCircle
    };
    return icons[status] || FiClock;
  };

  const getStatusText = (status) => {
    const texts = {
      delivered: 'Delivered',
      in_transit: 'In Transit',
      preparing: 'Preparing',
      cancelled: 'Cancelled'
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 animate-pulse border border-white/20 dark:border-gray-700/30">
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
                <div className="h-8 bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-700 rounded w-1/3" />
              </div>
            ))}
          </div>
          <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 animate-pulse border border-white/20 dark:border-gray-700/30">
            <div className="h-10 bg-gray-700 rounded w-full mb-4" />
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-700 rounded w-full mb-2" />
            ))}
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
            <h1 className="text-3xl md:text-4xl font-bold text-white">Delivery Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back, {user?.name || 'Delivery Partner'}!</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:shadow-2xl transition-all duration-300 text-gray-300 hover:text-white"
              >
                <FiBell className="w-5 h-5" />
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 glass-card rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h4 className="font-bold text-white">Notifications</h4>
                      <button className="text-xs text-orange-500 hover:text-orange-400 font-semibold">
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto p-2">
                      {notifications.map(notification => (
                        <NotificationItem key={notification.id} {...notification} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Online Toggle */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/30">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'} animate-pulse`} />
              <span className="text-sm text-white">{isOnline ? 'Online' : 'Offline'}</span>
              <button
                onClick={handleToggleOnline}
                className={`relative w-10 h-5 rounded-full transition-colors ${isOnline ? 'bg-green-500' : 'bg-gray-600'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isOnline ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:shadow-2xl transition-all duration-300 text-gray-300 hover:text-white"
            >
              <FiRefreshCw className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard 
            icon={FiDollarSign} 
            label="Today's Earnings" 
            value={`$${stats.todayEarnings.toFixed(2)}`} 
            color="from-green-500 to-emerald-500"
            trend="up"
            change="+12.5%"
          />
          <StatCard 
            icon={FiPackage} 
            label="Today's Deliveries" 
            value={stats.todayDeliveries} 
            color="from-blue-500 to-cyan-500"
            trend="up"
            change="+8.3%"
          />
          <StatCard 
            icon={FiStar} 
            label="Rating" 
            value={stats.rating} 
            color="from-yellow-500 to-amber-500"
            trend="up"
            change="+0.2"
          />
          <StatCard 
            icon={FiClock} 
            label="Active Orders" 
            value={stats.activeOrders} 
            color="from-orange-500 to-red-500"
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatCard 
            icon={FiTruck} 
            label="Total Deliveries" 
            value={stats.totalDeliveries} 
            color="from-purple-500 to-pink-500"
          />
          <StatCard 
            icon={FiAward} 
            label="Completion Rate" 
            value={`${stats.completionRate}%`} 
            color="from-green-500 to-emerald-500"
          />
          <StatCard 
            icon={FiTrendingUp} 
            label="Acceptance Rate" 
            value={`${stats.acceptanceRate}%`} 
            color="from-blue-500 to-indigo-500"
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'View Orders', icon: FiPackage, color: 'from-blue-500 to-cyan-500' },
            { label: 'Live Delivery', icon: FiNavigation, color: 'from-green-500 to-emerald-500' },
            { label: 'Earnings', icon: FiDollarSign, color: 'from-orange-500 to-red-500' },
            { label: 'Profile', icon: FiUser, color: 'from-purple-500 to-pink-500' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <action.icon className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm font-semibold">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Deliveries */}
          <div className="lg:col-span-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiTruck className="text-orange-500" />
                Recent Deliveries
              </h3>
              <button className="text-sm text-orange-500 hover:text-orange-400 font-semibold">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Restaurant</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Earnings</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDeliveries.map((delivery, index) => {
                    const StatusIcon = getStatusIcon(delivery.status);
                    return (
                      <motion.tr
                        key={delivery.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-700/50 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 text-sm text-gray-300">{delivery.id}</td>
                        <td className="py-3 text-sm text-gray-300">{delivery.restaurant}</td>
                        <td className="py-3 text-sm text-gray-300">{delivery.customer}</td>
                        <td className="py-3 font-semibold text-white">${delivery.amount.toFixed(2)}</td>
                        <td className="py-3 font-semibold text-orange-500">${delivery.earnings.toFixed(2)}</td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(delivery.status)} flex items-center gap-1 w-fit`}>
                            <StatusIcon className="w-3 h-3" />
                            {getStatusText(delivery.status)}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0) || 'D'}
                </div>
                <div>
                  <h4 className="font-bold text-white">{user?.name || 'Delivery Partner'}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={isOnline ? 'online' : 'offline'} />
                    <span className="text-xs text-gray-400">{stats.onlineHours}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Total Earnings</span>
                  <span className="text-white font-semibold">${stats.totalEarnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Today's Deliveries</span>
                  <span className="text-white font-semibold">{stats.todayDeliveries}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Rating</span>
                  <span className="text-yellow-400 font-semibold">{stats.rating} ⭐</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors">
                View Profile
              </button>
            </div>

            {/* Performance Progress */}
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FiTrendingUp className="text-orange-500" />
                Performance
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Completion Rate</span>
                    <span className="text-white font-semibold">{stats.completionRate}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${stats.completionRate}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Acceptance Rate</span>
                    <span className="text-white font-semibold">{stats.acceptanceRate}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: `${stats.acceptanceRate}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">On-Time Delivery</span>
                    <span className="text-white font-semibold">94%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FiCalendar className="text-orange-500" />
            Weekly Statistics
          </h3>
          <div className="grid grid-cols-7 gap-2 h-48 items-end">
            {weeklyData.map((item, index) => {
              const maxDeliveries = Math.max(...weeklyData.map(d => d.deliveries));
              const height = (item.deliveries / maxDeliveries) * 100;
              return (
                <div key={index} className="flex flex-col items-center gap-1 flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg"
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400">{item.day}</span>
                    <span className="text-xs font-semibold text-white">{item.deliveries}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <p className="text-xs text-gray-400">Total Deliveries</p>
              <p className="text-lg font-bold text-white">{weeklyData.reduce((sum, d) => sum + d.deliveries, 0)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Total Earnings</p>
              <p className="text-lg font-bold text-orange-500">${weeklyData.reduce((sum, d) => sum + d.earnings, 0)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Avg Daily</p>
              <p className="text-lg font-bold text-white">
                {(weeklyData.reduce((sum, d) => sum + d.deliveries, 0) / weeklyData.length).toFixed(0)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400">Best Day</p>
              <p className="text-lg font-bold text-green-500">
                {weeklyData.reduce((max, d) => d.deliveries > max.deliveries ? d : max, weeklyData[0]).day}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 FoodDelivery Platform. All rights reserved.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeliveryPartnerDashboard;