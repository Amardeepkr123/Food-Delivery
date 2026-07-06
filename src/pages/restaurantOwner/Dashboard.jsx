import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome,
  FiShoppingBag,
  FiUsers,
  FiStar,
  FiDollarSign,
  FiClock,
  FiTruck,
  FiPackage,
  FiCheckCircle,
  FiXCircle,
  FiClock as FiClockIcon,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowUp,
  FiArrowDown,
  FiCalendar,
  FiDownload,
  FiRefreshCw,
  FiBarChart2,
  FiPieChart,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiEdit2,
  FiEye,
  FiHeart,
  FiMessageSquare,
  FiAward,
  FiGift,
  FiZap,
  FiCoffee,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import { 
  FaUtensils, 
  FaPizzaSlice, 
  FaHamburger, 
  FaIceCream, 
  FaCoffee,
  FaLeaf,
  FaPepperHot,
  FaFish,
  FaBirthdayCake
} from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [topItems, setTopItems] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockStats = {
          totalRevenue: 24580.50,
          totalOrders: 342,
          totalCustomers: 156,
          averageRating: 4.7,
          revenueGrowth: 12.5,
          ordersGrowth: 8.3,
          customersGrowth: 5.2,
          ratingGrowth: 0.3,
          pendingOrders: 42,
          inTransit: 32,
          completedOrders: 245,
          cancelledOrders: 23
        };

        const mockRecentOrders = [
          {
            id: '#ORD-2024-001',
            customer: 'Amit Sharma',
            items: '2x Margherita Pizza, 1x Garlic Bread',
            total: 36.97,
            status: 'delivered',
            date: '2024-01-15',
            time: '7:30 PM',
          },
          {
            id: '#ORD-2024-002',
            customer: 'Priya Patel',
            items: '1x Whopper Meal, 1x Fries',
            total: 18.99,
            status: 'in_transit',
            date: '2024-01-15',
            time: '1:15 PM',
          },
          {
            id: '#ORD-2024-003',
            customer: 'Rahul Singh',
            items: '3x California Roll, 2x Miso Soup',
            total: 45.00,
            status: 'preparing',
            date: '2024-01-15',
            time: '11:00 AM',
          },
          {
            id: '#ORD-2024-004',
            customer: 'Sneha Reddy',
            items: '1x Green Curry, 2x Rice',
            total: 28.50,
            status: 'cancelled',
            date: '2024-01-14',
            time: '8:45 PM',
          },
          {
            id: '#ORD-2024-005',
            customer: 'Vikram Singh',
            items: '2x Pepperoni Pizza, 1x Coke',
            total: 42.99,
            status: 'delivered',
            date: '2024-01-14',
            time: '6:30 PM',
          },
        ];

        const mockTopItems = [
          { name: 'Margherita Pizza', orders: 89, revenue: 1511.11, growth: 12 },
          { name: 'Pepperoni Pizza', orders: 76, revenue: 1519.24, growth: 8 },
          { name: 'Pasta Alfredo', orders: 54, revenue: 1025.46, growth: -3 },
          { name: 'Caesar Salad', orders: 48, revenue: 719.52, growth: 5 },
          { name: 'Tiramisu', orders: 42, revenue: 377.58, growth: 15 },
        ];

        const mockReviews = [
          {
            id: 1,
            customer: 'Amit Sharma',
            rating: 5,
            comment: 'Amazing pizza! Best in town. Highly recommend!',
            date: '2024-01-15',
            time: '2 hours ago',
          },
          {
            id: 2,
            customer: 'Priya Patel',
            rating: 4,
            comment: 'Good food, fast delivery. Will order again.',
            date: '2024-01-14',
            time: '1 day ago',
          },
          {
            id: 3,
            customer: 'Rahul Singh',
            rating: 5,
            comment: 'The sushi was fresh and delicious!',
            date: '2024-01-13',
            time: '2 days ago',
          },
          {
            id: 4,
            customer: 'Sneha Reddy',
            rating: 3,
            comment: 'Food was good but delivery took longer than expected.',
            date: '2024-01-12',
            time: '3 days ago',
          },
        ];

        setStats(mockStats);
        setRecentOrders(mockRecentOrders);
        setTopItems(mockTopItems);
        setReviews(mockReviews);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedPeriod]);

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      in_transit: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      preparing: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      pending: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: FiCheckCircle,
      in_transit: FiTruck,
      preparing: FiClockIcon,
      cancelled: FiXCircle,
      pending: FiClockIcon
    };
    return icons[status] || FiClockIcon;
  };

  const getStatusText = (status) => {
    const texts = {
      delivered: 'Delivered',
      in_transit: 'In Transit',
      preparing: 'Preparing',
      cancelled: 'Cancelled',
      pending: 'Pending'
    };
    return texts[status] || status;
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleExport = () => {
    alert('Exporting dashboard data...');
  };

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
              <FiHome className="text-orange-500" />
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back, {user?.name || 'Restaurant Owner'}! Here's your restaurant overview
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-2">
              {['day', 'week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 capitalize ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiRefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              <FiDownload className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { 
              label: 'Total Revenue', 
              value: `$${stats.totalRevenue.toLocaleString()}`, 
              icon: FiDollarSign, 
              change: `+${stats.revenueGrowth}%`,
              trend: 'up',
              color: 'from-green-500 to-emerald-500'
            },
            { 
              label: 'Total Orders', 
              value: stats.totalOrders, 
              icon: FiShoppingBag, 
              change: `+${stats.ordersGrowth}%`,
              trend: 'up',
              color: 'from-blue-500 to-blue-600'
            },
            { 
              label: 'Total Customers', 
              value: stats.totalCustomers, 
              icon: FiUsers, 
              change: `+${stats.customersGrowth}%`,
              trend: 'up',
              color: 'from-purple-500 to-pink-500'
            },
            { 
              label: 'Average Rating', 
              value: stats.averageRating, 
              icon: FiStar, 
              change: `+${stats.ratingGrowth}`,
              trend: 'up',
              color: 'from-yellow-500 to-yellow-600'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 hover:shadow-3xl transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <FiArrowUp className="text-green-500" />
                    ) : (
                      <FiArrowDown className="text-red-500" />
                    )}
                    <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-400">vs last {selectedPeriod}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl`}>
                  <stat.icon />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          {[
            { label: 'Pending Orders', value: stats.pendingOrders, icon: FiClock, color: 'from-orange-500 to-yellow-500' },
            { label: 'In Transit', value: stats.inTransit, icon: FiTruck, color: 'from-blue-500 to-cyan-500' },
            { label: 'Completed', value: stats.completedOrders, icon: FiCheckCircle, color: 'from-green-500 to-emerald-500' },
            { label: 'Cancelled', value: stats.cancelledOrders, icon: FiXCircle, color: 'from-red-500 to-rose-500' },
            { label: 'Rating', value: `${stats.averageRating}⭐`, icon: FiStar, color: 'from-yellow-500 to-amber-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card rounded-2xl p-4 text-center hover:shadow-3xl transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-lg mx-auto mb-2`}>
                <stat.icon />
              </div>
              <p className="text-xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            {['overview', 'orders', 'menu', 'reviews', 'analytics'].map((tab) => (
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <FiPackage className="text-orange-500" />
                      Recent Orders
                    </h3>
                    <Link to="/restaurant-owner/orders" className="text-sm text-orange-500 hover:text-orange-600 font-semibold">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {recentOrders.slice(0, 4).map((order) => {
                      const StatusIcon = getStatusIcon(order.status);
                      return (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors gap-2"
                        >
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{order.id}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer}</p>
                            <p className="text-xs text-gray-400">{order.items}</p>
                          </div>
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <span className="text-sm font-bold text-gray-800 dark:text-white">${order.total}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)} flex items-center gap-1`}>
                              <StatusIcon className="w-3 h-3" />
                              {getStatusText(order.status)}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Top Items & Reviews Summary */}
                <div className="space-y-6">
                  {/* Top Items */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <FaUtensils className="text-orange-500" />
                      Top Items
                    </h3>
                    <div className="space-y-3">
                      {topItems.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-800 dark:text-white">{item.name}</span>
                            <span className="text-xs text-gray-400">{item.orders} orders</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-orange-500">${item.revenue}</span>
                            <span className={`text-xs ${item.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {item.growth >= 0 ? '↑' : '↓'} {Math.abs(item.growth)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link to="/restaurant-owner/menu" className="mt-4 text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1">
                      Manage Menu <FiEdit2 className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Recent Reviews */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <FiMessageSquare className="text-orange-500" />
                      Recent Reviews
                    </h3>
                    <div className="space-y-3">
                      {reviews.slice(0, 2).map((review) => (
                        <div key={review.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-800 dark:text-white">{review.customer}</p>
                              <div className="flex text-yellow-400 text-sm">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar key={i} className={`${i < review.rating ? 'fill-current' : ''}`} />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">{review.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{review.comment}</p>
                        </div>
                      ))}
                    </div>
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
                    All Orders
                  </h3>
                  <div className="flex gap-2">
                    <select className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>Preparing</option>
                      <option>In Transit</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                    <button className="px-3 py-1.5 rounded-xl bg-orange-500 text-white text-sm font-semibold">
                      <FiPlus className="inline mr-1" /> New Order
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Items</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => {
                        const StatusIcon = getStatusIcon(order.status);
                        return (
                          <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="py-3 font-semibold text-gray-800 dark:text-white">{order.id}</td>
                            <td className="py-3 text-gray-600 dark:text-gray-300">{order.customer}</td>
                            <td className="py-3 text-sm text-gray-500 dark:text-gray-400">{order.items}</td>
                            <td className="py-3 font-bold text-gray-800 dark:text-white">${order.total}</td>
                            <td className="py-3">
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)} flex items-center gap-1 w-fit`}>
                                <StatusIcon className="w-3 h-3" />
                                {getStatusText(order.status)}
                              </span>
                            </td>
                            <td className="py-3 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                            <td className="py-3">
                              <button className="text-orange-500 hover:text-orange-600 text-sm font-semibold">
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Menu Tab */}
            {activeTab === 'menu' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <FaUtensils className="text-orange-500" />
                      Menu Items
                    </h3>
                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 flex items-center gap-2">
                      <FiPlus className="w-4 h-4" /> Add Item
                    </button>
                  </div>
                  <div className="space-y-3">
                    {topItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.orders} orders</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-orange-500">${item.revenue}</span>
                          <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <FiEdit2 className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiTrendingUp className="text-orange-500" />
                    Category Performance
                  </h3>
                  <div className="space-y-3">
                    {['Pizza', 'Pasta', 'Salads', 'Desserts', 'Beverages'].map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">{category}</span>
                          <span className="text-gray-600 dark:text-gray-300">{Math.floor(Math.random() * 30) + 10}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                            style={{ width: `${Math.floor(Math.random() * 30) + 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="glass-card rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiMessageSquare className="text-orange-500" />
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Average Rating: </span>
                    <span className="text-lg font-bold text-yellow-500">{stats.averageRating} ⭐</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{review.customer}</p>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <FiStar key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{review.time}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                      <div className="mt-2 flex gap-2">
                        <button className="text-sm text-orange-500 hover:text-orange-600 font-semibold">Reply</button>
                        <button className="text-sm text-gray-400 hover:text-gray-600 font-semibold">Report</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiBarChart2 className="text-orange-500" />
                    Revenue Trend
                  </h3>
                  <div className="h-48 flex items-end gap-2">
                    {[3200, 2800, 3500, 4100, 5200, 3800, 2980].map((value, index) => {
                      const max = 5200;
                      const height = (value / max) * 100;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.8, delay: index * 0.05 }}
                            className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg"
                            style={{ height: `${height}%`, minHeight: '4px' }}
                          />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiPieChart className="text-orange-500" />
                    Order Distribution
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Dine-in', value: 35 },
                      { label: 'Takeaway', value: 25 },
                      { label: 'Delivery', value: 40 },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                          <span className="text-gray-600 dark:text-gray-300">{item.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Add Menu Item', icon: FiPlus, color: 'from-green-500 to-emerald-500' },
            { label: 'View Orders', icon: FiPackage, color: 'from-blue-500 to-cyan-500' },
            { label: 'Manage Staff', icon: FiUsers, color: 'from-purple-500 to-pink-500' },
            { label: 'Settings', icon: FiSettings, color: 'from-gray-500 to-gray-600' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <action.icon className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm font-semibold">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;