// src/pages/admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiUsers,
  FiUser,
  FiUserCheck,
  FiTruck,
  FiShoppingBag,
  FiPackage,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiXCircle,
  FiRefreshCw,
  FiStar,
  FiMapPin,
  FiAward,
  FiEye,
  FiEdit2,
  FiPrinter,
  FiSearch,
  FiFilter,
  FiDownload,
  FiPlus,
  FiCalendar,
  FiSettings,
  FiBell,
  FiMessageCircle,
  FiSun,
  FiMoon,
  FiLogOut,
  FiHome,
  FiGrid,
  FiList,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiUserPlus,
  FiUsers as FiUsersIcon,
  FiTruck as FiTruckIcon,
  FiStar as FiStarIcon,
  FiAward as FiAwardIcon,
  FiMapPin as FiMapPinIcon,
  FiDollarSign as FiDollarSignIcon,
  FiPackage as FiPackageIcon,
  FiClock as FiClockIcon,
  FiXCircle as FiXCircleIcon,
} from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
} from 'recharts';
import MainLayout from '../../layouts/MainLayout';

// ============================================
// MOCK DATA
// ============================================
const mockStats = {
  totalUsers: 12450,
  customers: 9850,
  restaurantOwners: 1800,
  deliveryPartners: 800,
  totalRestaurants: 4500,
  totalOrders: 45670,
  totalRevenue: 2456780,
  todayRevenue: 48500,
  pendingOrders: 234,
  cancelledOrders: 456,
  refundRequests: 78,
  averageRating: 4.7,
};

const revenueData = [
  { name: 'Jan', revenue: 180000, orders: 3200 },
  { name: 'Feb', revenue: 210000, orders: 3800 },
  { name: 'Mar', revenue: 190000, orders: 3500 },
  { name: 'Apr', revenue: 250000, orders: 4200 },
  { name: 'May', revenue: 280000, orders: 4800 },
  { name: 'Jun', revenue: 300000, orders: 5200 },
  { name: 'Jul', revenue: 270000, orders: 4900 },
  { name: 'Aug', revenue: 320000, orders: 5600 },
  { name: 'Sep', revenue: 350000, orders: 6000 },
  { name: 'Oct', revenue: 380000, orders: 6500 },
  { name: 'Nov', revenue: 350000, orders: 6200 },
  { name: 'Dec', revenue: 420000, orders: 7200 },
];

const orderStatusData = [
  { name: 'Delivered', value: 65, color: '#22c55e' },
  { name: 'Pending', value: 15, color: '#eab308' },
  { name: 'Preparing', value: 10, color: '#8b5cf6' },
  { name: 'Out for Delivery', value: 5, color: '#f97316' },
  { name: 'Cancelled', value: 5, color: '#ef4444' },
];

const paymentMethodData = [
  { name: 'UPI', value: 40, color: '#3b82f6' },
  { name: 'Credit Card', value: 30, color: '#8b5cf6' },
  { name: 'Cash on Delivery', value: 20, color: '#22c55e' },
  { name: 'Debit Card', value: 10, color: '#f97316' },
];

const topCitiesData = [
  { name: 'Mumbai', value: 850 },
  { name: 'Delhi', value: 720 },
  { name: 'Bangalore', value: 680 },
  { name: 'Chennai', value: 520 },
  { name: 'Hyderabad', value: 480 },
];

const recentOrders = [
  { id: 'ORD-2024-001', customer: 'Amit Kumar', restaurant: 'Pizza Palace', rider: 'Rajesh Singh', amount: 47.07, payment: 'Paid', status: 'delivered', time: '10:30 AM' },
  { id: 'ORD-2024-002', customer: 'Priya Sharma', restaurant: 'Burger King', rider: 'Vikram Singh', amount: 35.66, payment: 'Paid', status: 'out_for_delivery', time: '12:00 PM' },
  { id: 'ORD-2024-003', customer: 'Vikram Singh', restaurant: 'Sushi Master', rider: 'N/A', amount: 54.55, payment: 'Pending', status: 'preparing', time: '1:00 PM' },
  { id: 'ORD-2024-004', customer: 'Sneha Patel', restaurant: 'Taco Bell', rider: 'Deepak Reddy', amount: 39.88, payment: 'Refunded', status: 'cancelled', time: '2:00 PM' },
  { id: 'ORD-2024-005', customer: 'Rajesh Reddy', restaurant: 'Thai Garden', rider: 'Ananya Gupta', amount: 49.80, payment: 'Paid', status: 'delivered', time: '3:30 PM' },
];

const topRestaurants = [
  { name: 'Pizza Palace', rating: 4.8, revenue: 125000, orders: 2300, growth: 12.5 },
  { name: 'Burger King', rating: 4.6, revenue: 98000, orders: 1800, growth: 8.3 },
  { name: 'Sushi Master', rating: 4.9, revenue: 85000, orders: 1500, growth: 15.2 },
  { name: 'Taco Bell', rating: 4.4, revenue: 72000, orders: 1300, growth: 5.8 },
  { name: 'Thai Garden', rating: 4.7, revenue: 68000, orders: 1200, growth: 10.1 },
];

const topDeliveryPartners = [
  { name: 'Rajesh Singh', rating: 4.9, completedOrders: 2450, revenue: 175000, status: 'online' },
  { name: 'Vikram Singh', rating: 4.8, completedOrders: 2100, revenue: 150000, status: 'online' },
  { name: 'Deepak Reddy', rating: 4.7, completedOrders: 1800, revenue: 125000, status: 'busy' },
  { name: 'Ananya Gupta', rating: 4.9, completedOrders: 1600, revenue: 110000, status: 'offline' },
  { name: 'Priya Sharma', rating: 4.6, completedOrders: 1400, revenue: 95000, status: 'online' },
];

const topCustomers = [
  { name: 'Amit Kumar', orders: 145, totalSpending: 12500, rewardPoints: 2500 },
  { name: 'Priya Sharma', orders: 128, totalSpending: 11200, rewardPoints: 2200 },
  { name: 'Vikram Singh', orders: 112, totalSpending: 9800, rewardPoints: 1900 },
  { name: 'Sneha Patel', orders: 98, totalSpending: 8500, rewardPoints: 1600 },
  { name: 'Rajesh Reddy', orders: 85, totalSpending: 7400, rewardPoints: 1400 },
];

const recentActivities = [
  { user: 'Rahul Kumar', action: 'New User Registered', time: '5 mins ago', icon: '👤' },
  { user: 'Pizza Palace', action: 'Restaurant Approved', time: '15 mins ago', icon: '🏪' },
  { user: 'Amit Kumar', action: 'Order Delivered', time: '30 mins ago', icon: '📦' },
  { user: 'Sneha Patel', action: 'Refund Requested', time: '1 hour ago', icon: '↩️' },
  { user: 'Burger King', action: 'Payment Received', time: '2 hours ago', icon: '💰' },
  { user: 'Rajesh Reddy', action: 'Review Submitted', time: '3 hours ago', icon: '⭐' },
];

const notifications = [
  { id: 1, title: 'New Order #ORD-2024-007', message: 'Order placed by Amit Kumar', time: '5 mins ago', read: false },
  { id: 2, title: 'Restaurant Approved', message: 'Pizza Palace has been approved', time: '15 mins ago', read: false },
  { id: 3, title: 'Delivery Completed', message: 'Order #ORD-2024-005 delivered', time: '30 mins ago', read: true },
  { id: 4, title: 'Refund Request', message: 'Sneha Patel requested a refund', time: '1 hour ago', read: true },
  { id: 5, title: 'Payment Received', message: 'Payment of ₹5,000 received', time: '2 hours ago', read: true },
];

const systemStatus = {
  api: 'online',
  database: 'online',
  server: 'online',
  storage: 78,
  memory: 65,
  cpu: 45,
};

// ============================================
// STATS CARD COMPONENT
// ============================================
const StatCard = ({ icon: Icon, title, value, subtext, color, trend, trendValue, progress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-5 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtext && <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl shadow-lg`}>
          <Icon />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
            {trendValue}
          </div>
        )}
        {progress !== undefined && (
          <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================
// STATUS BADGE
// ============================================
const StatusBadge = ({ status }) => {
  const statusMap = {
    delivered: { label: 'Delivered', color: 'bg-green-500' },
    pending: { label: 'Pending', color: 'bg-yellow-500' },
    preparing: { label: 'Preparing', color: 'bg-purple-500' },
    out_for_delivery: { label: 'Out for Delivery', color: 'bg-orange-500' },
    cancelled: { label: 'Cancelled', color: 'bg-red-500' },
    online: { label: 'Online', color: 'bg-green-500' },
    busy: { label: 'Busy', color: 'bg-orange-500' },
    offline: { label: 'Offline', color: 'bg-gray-500' },
  };

  const { label, color } = statusMap[status] || statusMap.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'delivered' || status === 'online' ? 'bg-white' : 'animate-pulse'}`} />
      {label}
    </span>
  );
};

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================
const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  // Handle mark all read
  const handleMarkAllRead = () => {
    setUnreadCount(0);
    notifications.forEach(n => n.read = true);
  };

  // Handle delete notification
  const handleDeleteNotification = (id) => {
    const index = notifications.findIndex(n => n.id === id);
    if (index > -1) {
      notifications.splice(index, 1);
      setUnreadCount(notifications.filter(n => !n.read).length);
    }
  };

  // Quick Actions
  const quickActions = [
    { icon: FiUserPlus, label: 'Add User', color: 'from-blue-500 to-blue-600', onClick: () => navigate('/admin/users') },
    { icon: FiShoppingBag, label: 'Add Restaurant', color: 'from-purple-500 to-purple-600', onClick: () => navigate('/admin/restaurants') },
    { icon: FiTruck, label: 'Add Delivery Partner', color: 'from-orange-500 to-orange-600', onClick: () => navigate('/admin/delivery-partners') },
    { icon: FiAward, label: 'Create Coupon', color: 'from-pink-500 to-pink-600', onClick: () => alert('Create Coupon') },
    { icon: FiTrendingUp, label: 'Generate Report', color: 'from-green-500 to-green-600', onClick: () => alert('Generate Report') },
    { icon: FiDownload, label: 'Export Data', color: 'from-cyan-500 to-cyan-600', onClick: () => alert('Export Data') },
  ];

  const statusColors = {
    api: { online: 'bg-green-500', offline: 'bg-red-500' },
    database: { online: 'bg-green-500', offline: 'bg-red-500' },
    server: { online: 'bg-green-500', offline: 'bg-red-500' },
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FiGrid className="text-orange-500" />
              Dashboard
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>Admin</span>
              <span className="text-gray-300">›</span>
              <span className="text-gray-700 dark:text-gray-300">Dashboard</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300"
              title="Refresh"
            >
              <FiRefreshCw className={`text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl glass-card focus:ring-2 focus:ring-orange-500 outline-none text-sm w-48 md:w-64"
              />
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <StatCard
            icon={FiUsers}
            title="Total Users"
            value={mockStats.totalUsers}
            subtext="All registered users"
            color="from-purple-500 to-pink-500"
            trend="up"
            trendValue="+12.5%"
            progress={75}
          />
          <StatCard
            icon={FiUser}
            title="Customers"
            value={mockStats.customers}
            subtext="Registered customers"
            color="from-blue-500 to-cyan-500"
            trend="up"
            trendValue="+8.3%"
            progress={80}
          />
          <StatCard
            icon={FiUserCheck}
            title="Restaurant Owners"
            value={mockStats.restaurantOwners}
            subtext="Business partners"
            color="from-purple-500 to-indigo-500"
            trend="up"
            trendValue="+15.2%"
            progress={60}
          />
          <StatCard
            icon={FiTruck}
            title="Delivery Partners"
            value={mockStats.deliveryPartners}
            subtext="Active delivery agents"
            color="from-orange-500 to-red-500"
            trend="up"
            trendValue="+10.1%"
            progress={65}
          />
          <StatCard
            icon={FiShoppingBag}
            title="Restaurants"
            value={mockStats.totalRestaurants}
            subtext="Total restaurants"
            color="from-green-500 to-emerald-500"
            trend="up"
            trendValue="+9.8%"
            progress={70}
          />
          <StatCard
            icon={FiPackage}
            title="Total Orders"
            value={mockStats.totalOrders}
            subtext="All time orders"
            color="from-blue-500 to-indigo-500"
            trend="up"
            trendValue="+18.7%"
            progress={85}
          />
          <StatCard
            icon={FiDollarSign}
            title="Total Revenue"
            value={`₹${mockStats.totalRevenue.toLocaleString()}`}
            subtext="All time earnings"
            color="from-green-500 to-teal-500"
            trend="up"
            trendValue="+22.3%"
            progress={90}
          />
          <StatCard
            icon={FiTrendingUp}
            title="Today's Revenue"
            value={`₹${mockStats.todayRevenue.toLocaleString()}`}
            subtext="Today's earnings"
            color="from-yellow-500 to-orange-500"
            trend="up"
            trendValue="+5.3%"
            progress={45}
          />
          <StatCard
            icon={FiClock}
            title="Pending Orders"
            value={mockStats.pendingOrders}
            subtext="Awaiting action"
            color="from-yellow-500 to-amber-500"
            trend="down"
            trendValue="-2.1%"
            progress={30}
          />
          <StatCard
            icon={FiXCircle}
            title="Cancelled Orders"
            value={mockStats.cancelledOrders}
            subtext="Cancelled orders"
            color="from-red-500 to-rose-500"
            trend="down"
            trendValue="-1.8%"
            progress={25}
          />
          <StatCard
            icon={FiRefreshCw}
            title="Refund Requests"
            value={mockStats.refundRequests}
            subtext="Pending refunds"
            color="from-pink-500 to-rose-500"
            trend="down"
            trendValue="-0.5%"
            progress={15}
          />
          <StatCard
            icon={FiStar}
            title="Average Rating"
            value={mockStats.averageRating}
            subtext="⭐ Overall rating"
            color="from-yellow-500 to-amber-500"
            trend="up"
            trendValue="+0.2%"
            progress={95}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-green-500" />
              Revenue Overview
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" barSize={20} fill="#f97316" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Order Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiPackage className="text-purple-500" />
              Order Status Distribution
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden mb-6"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <FiPackage className="text-orange-500" />
              Recent Orders
            </h3>
            <button onClick={() => navigate('/admin/orders')} className="text-sm text-orange-500 hover:text-orange-600">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Restaurant</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Time</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">{order.id}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{order.customer}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{order.restaurant}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-bold text-gray-800 dark:text-white">₹{order.amount}</span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{order.time}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="View">
                          <FiEye className="text-gray-500 dark:text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Edit">
                          <FiEdit2 className="text-gray-500 dark:text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Print Invoice">
                          <FiPrinter className="text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6"
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className={`glass-card rounded-2xl p-4 text-center hover:shadow-2xl transition-all duration-300 group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white text-xl mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                <action.icon />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Top Restaurants & Delivery Partners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Restaurants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiStar className="text-yellow-500" />
              Top Restaurants
            </h3>
            <div className="space-y-3">
              {topRestaurants.map((restaurant, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                      {restaurant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white text-sm">{restaurant.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>⭐ {restaurant.rating}</span>
                        <span>•</span>
                        <span>{restaurant.orders} orders</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 dark:text-white text-sm">₹{restaurant.revenue.toLocaleString()}</p>
                    <p className={`text-xs font-medium ${restaurant.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {restaurant.growth > 0 ? '+' : ''}{restaurant.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Delivery Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiTruck className="text-orange-500" />
              Top Delivery Partners
            </h3>
            <div className="space-y-3">
              {topDeliveryPartners.map((partner, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                      {partner.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white text-sm">{partner.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>⭐ {partner.rating}</span>
                        <span>•</span>
                        <span>{partner.completedOrders} orders</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={partner.status} />
                    <p className="text-xs font-bold text-gray-800 dark:text-white mt-1">₹{partner.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activities & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiClock className="text-blue-500" />
              Recent Activities
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-10 pb-6 last:pb-0"
                >
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-sm">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{activity.user}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.action}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <FiBell className="text-yellow-500" />
                Notifications
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h3>
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-orange-500 hover:text-orange-600"
              >
                Mark All Read
              </button>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-xl transition-colors ${notification.read ? 'bg-transparent' : 'bg-orange-50/50 dark:bg-orange-900/10'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{notification.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{notification.message}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{notification.time}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <FiXCircle className="text-xs text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;