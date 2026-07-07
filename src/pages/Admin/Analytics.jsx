// src/pages/admin/Analytics.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiUser,
  FiShoppingBag,
  FiTruck,
  FiStar,
  FiMapPin,
  FiClock,
  FiCalendar,
  FiDownload,
  FiRefreshCw,
  FiFilter,
  FiSearch,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiZap,
  FiAward,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiClock as FiTime,
  FiEye,
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical,
  FiChevronDown,
  FiChevronUp,
  FiGlobe,
  FiCreditCard,
  FiSmartphone,
  FiCpu,
  FiDatabase,
  FiServer,
  FiInfo, // ✅ ADDED - Was missing
} from 'react-icons/fi';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Treemap,
} from 'recharts';
import MainLayout from '../../layouts/MainLayout';

// ============================================
// MOCK DATA
// ============================================

// Revenue Data
const revenueData = [
  { date: '2024-01', revenue: 180000, orders: 3200, profit: 54000, refunds: 4500 },
  { date: '2024-02', revenue: 210000, orders: 3800, profit: 63000, refunds: 5200 },
  { date: '2024-03', revenue: 190000, orders: 3500, profit: 57000, refunds: 4800 },
  { date: '2024-04', revenue: 250000, orders: 4200, profit: 75000, refunds: 6100 },
  { date: '2024-05', revenue: 280000, orders: 4800, profit: 84000, refunds: 7200 },
  { date: '2024-06', revenue: 300000, orders: 5200, profit: 90000, refunds: 8100 },
  { date: '2024-07', revenue: 270000, orders: 4900, profit: 81000, refunds: 6900 },
  { date: '2024-08', revenue: 320000, orders: 5600, profit: 96000, refunds: 8500 },
  { date: '2024-09', revenue: 350000, orders: 6000, profit: 105000, refunds: 9200 },
  { date: '2024-10', revenue: 380000, orders: 6500, profit: 114000, refunds: 10100 },
  { date: '2024-11', revenue: 350000, orders: 6200, profit: 105000, refunds: 9300 },
  { date: '2024-12', revenue: 420000, orders: 7200, profit: 126000, refunds: 11200 },
];

// Order Status Data
const orderStatusData = [
  { name: 'Preparing', value: 15, color: '#8b5cf6' },
  { name: 'Accepted', value: 20, color: '#3b82f6' },
  { name: 'Cooking', value: 25, color: '#06b6d4' },
  { name: 'Picked Up', value: 18, color: '#22c55e' },
  { name: 'On The Way', value: 12, color: '#f97316' },
  { name: 'Delivered', value: 65, color: '#10b981' },
  { name: 'Cancelled', value: 8, color: '#ef4444' },
  { name: 'Refunded', value: 5, color: '#ec4899' },
];

// Hourly Orders Heatmap
const hourlyOrdersData = [
  { hour: '00', orders: 120 },
  { hour: '01', orders: 80 },
  { hour: '02', orders: 45 },
  { hour: '03', orders: 30 },
  { hour: '04', orders: 20 },
  { hour: '05', orders: 35 },
  { hour: '06', orders: 80 },
  { hour: '07', orders: 150 },
  { hour: '08', orders: 320 },
  { hour: '09', orders: 480 },
  { hour: '10', orders: 620 },
  { hour: '11', orders: 780 },
  { hour: '12', orders: 920 },
  { hour: '13', orders: 850 },
  { hour: '14', orders: 720 },
  { hour: '15', orders: 680 },
  { hour: '16', orders: 750 },
  { hour: '17', orders: 890 },
  { hour: '18', orders: 1050 },
  { hour: '19', orders: 1200 },
  { hour: '20', orders: 1350 },
  { hour: '21', orders: 1450 },
  { hour: '22', orders: 980 },
  { hour: '23', orders: 560 },
];

// Geographical Data
const geoData = [
  { state: 'Maharashtra', orders: 12500, revenue: 875000, growth: 12.5 },
  { state: 'Delhi', orders: 10800, revenue: 756000, growth: 10.8 },
  { state: 'Karnataka', orders: 9500, revenue: 665000, growth: 9.5 },
  { state: 'Tamil Nadu', orders: 8200, revenue: 574000, growth: 8.2 },
  { state: 'Telangana', orders: 7200, revenue: 504000, growth: 7.2 },
  { state: 'Uttar Pradesh', orders: 6500, revenue: 455000, growth: 6.5 },
  { state: 'West Bengal', orders: 5800, revenue: 406000, growth: 5.8 },
  { state: 'Rajasthan', orders: 5100, revenue: 357000, growth: 5.1 },
];

// Payment Analytics
const paymentData = [
  { name: 'UPI', value: 40, color: '#8b5cf6' },
  { name: 'Credit Card', value: 25, color: '#3b82f6' },
  { name: 'Debit Card', value: 15, color: '#06b6d4' },
  { name: 'Wallet', value: 12, color: '#22c55e' },
  { name: 'Net Banking', value: 5, color: '#f97316' },
  { name: 'Cash', value: 3, color: '#ec4899' },
];

// Top Foods
const topFoods = [
  { name: 'Margherita Pizza', sales: 1250, revenue: 21250, category: 'Pizza' },
  { name: 'Classic Burger', sales: 980, revenue: 12740, category: 'Burger' },
  { name: 'California Roll', sales: 870, revenue: 13050, category: 'Sushi' },
  { name: 'Green Curry', sales: 760, revenue: 12160, category: 'Thai' },
  { name: 'Spicy Tacos', sales: 650, revenue: 7800, category: 'Mexican' },
  { name: 'Pad Thai', sales: 590, revenue: 7670, category: 'Thai' },
  { name: 'Chicken Burger', sales: 540, revenue: 8100, category: 'Burger' },
  { name: 'Pepperoni Pizza', sales: 480, revenue: 9600, category: 'Pizza' },
];

// Restaurant Analytics
const restaurantAnalytics = {
  topRestaurants: [
    { name: 'Pizza Palace', revenue: 125000, orders: 2300, rating: 4.8, growth: 12.5 },
    { name: 'Burger King', revenue: 98000, orders: 1800, rating: 4.6, growth: 8.3 },
    { name: 'Sushi Master', revenue: 85000, orders: 1500, rating: 4.9, growth: 15.2 },
    { name: 'Taco Bell', revenue: 72000, orders: 1300, rating: 4.4, growth: 5.8 },
    { name: 'Thai Garden', revenue: 68000, orders: 1200, rating: 4.7, growth: 10.1 },
  ],
  pendingApproval: 45,
  blocked: 25,
  growth: 8.5,
};

// Delivery Analytics
const deliveryAnalytics = {
  online: 320,
  offline: 80,
  busy: 150,
  averageDeliveryTime: 28,
  lateDeliveries: 45,
  partnerRating: 4.7,
  topPartner: { name: 'Rajesh Singh', completed: 2450, rating: 4.9 },
  bottomPartner: { name: 'Suresh Kumar', completed: 320, rating: 3.2 },
};

// Customer Analytics
const customerAnalytics = {
  newCustomers: 1250,
  returningCustomers: 6800,
  inactiveUsers: 2450,
  topCustomers: [
    { name: 'Amit Kumar', orders: 145, spend: 12500 },
    { name: 'Priya Sharma', orders: 128, spend: 11200 },
    { name: 'Vikram Singh', orders: 112, spend: 9800 },
  ],
  averageSpend: 850,
  retentionRate: 68.5,
  repeatOrders: 78.2,
};

// AI Insights
const insights = [
  { title: 'Revenue Growth', description: 'Revenue increased by 18% this month', type: 'positive', action: 'View Details' },
  { title: 'Delivery Delays', description: 'Delivery delays reported in Delhi region', type: 'warning', action: 'Investigate' },
  { title: 'Restaurant Approval', description: '45 restaurants pending approval', type: 'info', action: 'Review' },
  { title: 'Customer Retention', description: 'Customer retention improved by 5%', type: 'positive', action: 'View Report' },
  { title: 'Weekend Orders', description: 'Weekend orders are 45% higher than weekdays', type: 'info', action: 'Plan Strategy' },
  { title: 'Payment Issues', description: 'Payment failures increased by 3%', type: 'warning', action: 'Check System' },
];

// Activity Feed
const activities = [
  { user: 'Rahul Kumar', action: 'placed a new order', time: '2 mins ago', type: 'order' },
  { user: 'Pizza Palace', action: 'joined the platform', time: '5 mins ago', type: 'restaurant' },
  { user: 'Priya Sharma', action: 'registered as customer', time: '8 mins ago', type: 'customer' },
  { user: 'System', action: 'payment successful - ₹1,250', time: '12 mins ago', type: 'payment' },
  { user: 'Sneha Patel', action: 'payment failed - ₹450', time: '15 mins ago', type: 'payment' },
  { user: 'Rajesh Singh', action: 'requested a refund', time: '18 mins ago', type: 'refund' },
  { user: 'Vikram Singh', action: 'came online', time: '22 mins ago', type: 'partner' },
  { user: 'Deepak Reddy', action: 'went offline', time: '25 mins ago', type: 'partner' },
];

// ============================================
// STATS CARD COMPONENT
// ============================================
const StatsCard = ({ icon: Icon, title, value, subtext, color, trend, trendValue, progress, miniChart }) => {
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
      {miniChart && (
        <div className="mt-2 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={miniChart}>
              <Area type="monotone" dataKey="value" stroke="#f97316" fill="url(#colorGradient)" strokeWidth={2} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
};

// ============================================
// STATUS BADGE
// ============================================
const StatusBadge = ({ status }) => {
  const statusMap = {
    preparing: { label: 'Preparing', color: 'bg-purple-500' },
    accepted: { label: 'Accepted', color: 'bg-blue-500' },
    cooking: { label: 'Cooking', color: 'bg-cyan-500' },
    picked_up: { label: 'Picked Up', color: 'bg-green-500' },
    on_the_way: { label: 'On The Way', color: 'bg-orange-500' },
    delivered: { label: 'Delivered', color: 'bg-emerald-500' },
    cancelled: { label: 'Cancelled', color: 'bg-red-500' },
    refunded: { label: 'Refunded', color: 'bg-pink-500' },
  };

  const { label, color } = statusMap[status] || statusMap.delivered;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      {label}
    </span>
  );
};

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================
const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Refresh handler
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  // Export handlers
  const handleExport = (format) => {
    alert(`Exporting as ${format}...`);
  };

  // Date range options
  const dateOptions = ['Today', 'Yesterday', '7 Days', '30 Days', 'Month', 'Year', 'Custom'];

  // Mini chart data for cards
  const miniChartData = [
    { value: 1200 },
    { value: 1500 },
    { value: 1800 },
    { value: 1400 },
    { value: 2100 },
    { value: 2500 },
    { value: 2300 },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FiBarChart2 className="text-orange-500" />
              Analytics
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Platform Intelligence Center
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-white/60 dark:bg-gray-800/60 rounded-xl p-1">
              {dateOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setDateRange(option.toLowerCase().replace(' ', ''))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    dateRange === option.toLowerCase().replace(' ', '')
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300"
            >
              <FiRefreshCw className={`text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => handleExport('PDF')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <FiDownload /> PDF
            </button>
            <button
              onClick={() => handleExport('Excel')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <FiDownload /> Excel
            </button>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-4 md:p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search analytics data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select className="px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm">
                <option value="">All Cities</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
              </select>
              <select className="px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <button className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm">
                <FiFilter className="inline mr-1" /> Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards - Row 1 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <StatsCard
            icon={FiDollarSign}
            title="Total Revenue"
            value={2456780}
            subtext="All time"
            color="from-green-500 to-emerald-500"
            trend="up"
            trendValue="+18.7%"
            progress={90}
            miniChart={miniChartData}
          />
          <StatsCard
            icon={FiTrendingUp}
            title="Today's Revenue"
            value={48500}
            subtext="+12.5% from yesterday"
            color="from-blue-500 to-cyan-500"
            trend="up"
            trendValue="+12.5%"
            progress={75}
            miniChart={miniChartData}
          />
          <StatsCard
            icon={FiCalendar}
            title="Weekly Revenue"
            value={328000}
            subtext="This week"
            color="from-purple-500 to-pink-500"
            trend="up"
            trendValue="+8.3%"
            progress={80}
            miniChart={miniChartData}
          />
          <StatsCard
            icon={FiBarChart2}
            title="Monthly Revenue"
            value={1420000}
            subtext="This month"
            color="from-orange-500 to-red-500"
            trend="up"
            trendValue="+15.2%"
            progress={85}
            miniChart={miniChartData}
          />
          <StatsCard
            icon={FiAward}
            title="Yearly Revenue"
            value={2456780}
            subtext="This year"
            color="from-yellow-500 to-amber-500"
            trend="up"
            trendValue="+22.3%"
            progress={70}
            miniChart={miniChartData}
          />
          <StatsCard
            icon={FiPackage}
            title="Total Orders"
            value={45670}
            subtext="All time orders"
            color="from-indigo-500 to-purple-500"
            trend="up"
            trendValue="+12.5%"
            progress={85}
            miniChart={miniChartData}
          />
          <StatsCard
            icon={FiCheckCircle}
            title="Completed Orders"
            value={38920}
            subtext="Successfully delivered"
            color="from-green-500 to-green-600"
            trend="up"
            trendValue="+10.8%"
            progress={88}
            miniChart={miniChartData}
          />
          <StatsCard
            icon={FiXCircle}
            title="Cancelled Orders"
            value={4560}
            subtext="Cancelled orders"
            color="from-red-500 to-rose-500"
            trend="down"
            trendValue="-3.2%"
            progress={15}
            miniChart={miniChartData}
          />
          <StatsCard
            icon={FiRefreshCw}
            title="Refunded Orders"
            value={2190}
            subtext="Refunded orders"
            color="from-pink-500 to-rose-500"
            trend="down"
            trendValue="-1.8%"
            progress={10}
            miniChart={miniChartData}
          />
          <StatsCard
            icon={FiTrendingUp}
            title="Average Order Value"
            value={53.78}
            subtext="₹53.78 per order"
            color="from-cyan-500 to-blue-500"
            trend="up"
            trendValue="+5.3%"
            progress={65}
            miniChart={miniChartData}
          />
          <StatsCard
            icon={FiUsers}
            title="Total Customers"
            value={12450}
            subtext="Registered customers"
            color="from-blue-500 to-indigo-500"
            trend="up"
            trendValue="+8.5%"
            progress={78}
            miniChart={miniChartData}
          />
          <StatsCard
            icon={FiTrendingUp}
            title="Growth Rate"
            value={18.5}
            subtext="Overall growth"
            color="from-green-500 to-teal-500"
            trend="up"
            trendValue="+2.4%"
            progress={92}
            miniChart={miniChartData}
          />
        </div>

        {/* Revenue Analytics Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <FiTrendingUp className="text-green-500" />
                Revenue Analytics
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg bg-orange-500 text-white text-xs font-medium">Revenue</button>
                <button className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium">Orders</button>
                <button className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium">Profit</button>
                <button className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium">Refunds</button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
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
                  <Area type="monotone" dataKey="revenue" fill="#f97316" stroke="#f97316" fillOpacity={0.2} />
                  <Bar dataKey="orders" barSize={20} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="refunds" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Order Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiPieChart className="text-purple-500" />
              Order Status
            </h3>
            <div className="space-y-4">
              {orderStatusData.map((status, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">{status.name}</span>
                    <span className="text-gray-800 dark:text-white font-medium">{status.value}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(status.value / 168) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Orders Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <FiClock className="text-orange-500" />
              Orders Heatmap - Hourly Distribution
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Peak Hours: 7-9 PM</span>
              <span>Avg Delivery Time: 28 min</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="hour" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar dataKey="orders" fill="#f97316" radius={[4, 4, 0, 0]}>
                  {hourlyOrdersData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.orders > 1000 ? '#ef4444' : entry.orders > 500 ? '#f97316' : entry.orders > 200 ? '#fb923c' : '#fdba74'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Restaurant Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FiShoppingBag className="text-purple-500" />
            Restaurant Analytics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400">Top Revenue</p>
              <p className="text-sm font-bold text-gray-800 dark:text-white">Pizza Palace</p>
              <p className="text-sm text-green-500">₹125,000</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400">Highest Orders</p>
              <p className="text-sm font-bold text-gray-800 dark:text-white">Pizza Palace</p>
              <p className="text-sm text-blue-500">2,300 orders</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400">Pending Approval</p>
              <p className="text-sm font-bold text-yellow-500">{restaurantAnalytics.pendingApproval}</p>
              <p className="text-sm text-gray-400">Restaurants</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400">Growth</p>
              <p className="text-sm font-bold text-green-500">+{restaurantAnalytics.growth}%</p>
              <p className="text-sm text-gray-400">This month</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Restaurant</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase">Orders</th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-gray-500 uppercase">Rating</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase">Growth</th>
                </tr>
              </thead>
              <tbody>
                {restaurantAnalytics.topRestaurants.map((restaurant, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-white">{restaurant.name}</td>
                    <td className="px-4 py-2 text-sm text-right text-gray-600 dark:text-gray-300">₹{restaurant.revenue.toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-center text-gray-600 dark:text-gray-300">{restaurant.orders}</td>
                    <td className="px-4 py-2 text-sm text-center text-yellow-500">⭐ {restaurant.rating}</td>
                    <td className={`px-4 py-2 text-sm text-right font-medium ${restaurant.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {restaurant.growth > 0 ? '+' : ''}{restaurant.growth}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Delivery & Customer Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiTruck className="text-orange-500" />
              Delivery Partner Analytics
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="glass-card rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Online</p>
                <p className="text-xl font-bold text-green-500">{deliveryAnalytics.online}</p>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Busy</p>
                <p className="text-xl font-bold text-orange-500">{deliveryAnalytics.busy}</p>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Offline</p>
                <p className="text-xl font-bold text-gray-400">{deliveryAnalytics.offline}</p>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Avg Delivery</p>
                <p className="text-xl font-bold text-blue-500">{deliveryAnalytics.averageDeliveryTime} min</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Top Partner</p>
                <p className="font-medium text-gray-800 dark:text-white">{deliveryAnalytics.topPartner.name}</p>
                <p className="text-xs text-gray-400">⭐ {deliveryAnalytics.topPartner.rating} • {deliveryAnalytics.topPartner.completed} deliveries</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Late Deliveries</p>
                <p className="font-medium text-red-500">{deliveryAnalytics.lateDeliveries}</p>
                <p className="text-xs text-gray-400">This month</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiUsers className="text-blue-500" />
              Customer Analytics
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="glass-card rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">New Customers</p>
                <p className="text-xl font-bold text-green-500">{customerAnalytics.newCustomers}</p>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Returning</p>
                <p className="text-xl font-bold text-blue-500">{customerAnalytics.returningCustomers}</p>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Inactive</p>
                <p className="text-xl font-bold text-gray-400">{customerAnalytics.inactiveUsers}</p>
              </div>
              <div className="glass-card rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Retention</p>
                <p className="text-xl font-bold text-purple-500">{customerAnalytics.retentionRate}%</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Top Customer</p>
                <p className="font-medium text-gray-800 dark:text-white">{customerAnalytics.topCustomers[0].name}</p>
                <p className="text-xs text-gray-400">{customerAnalytics.topCustomers[0].orders} orders • ₹{customerAnalytics.topCustomers[0].spend}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Avg Spend</p>
                <p className="font-medium text-green-500">₹{customerAnalytics.averageSpend}</p>
                <p className="text-xs text-gray-400">Repeat orders: {customerAnalytics.repeatOrders}%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Geographical & Payment Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiGlobe className="text-green-500" />
              Geographical Analytics
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={geoData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis type="number" stroke="#6b7280" fontSize={11} />
                  <YAxis dataKey="state" type="category" stroke="#6b7280" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(255,255,255,0.9)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Bar dataKey="revenue" fill="#f97316" radius={[0, 4, 4, 0]}>
                    {geoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.growth > 10 ? '#22c55e' : '#f97316'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Most Active: Maharashtra</span>
              <span>Revenue: ₹875,000</span>
              <span>Growth: +12.5%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiCreditCard className="text-purple-500" />
              Payment Analytics
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
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
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>UPI: 40%</span>
              <span>Cards: 40%</span>
              <span>Wallet: 12%</span>
              <span>Refund Rate: 2.5%</span>
            </div>
          </motion.div>
        </div>

        {/* Food Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FiStar className="text-yellow-500" />
            Food Analytics - Top Selling Items
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topFoods.slice(0, 4).map((food, index) => (
              <div key={index} className="glass-card rounded-xl p-4 text-center">
                <p className="text-sm font-bold text-gray-800 dark:text-white">{food.name}</p>
                <p className="text-xs text-gray-500">{food.category}</p>
                <div className="flex justify-center gap-4 text-xs mt-2">
                  <span className="text-blue-500">{food.sales} sold</span>
                  <span className="text-green-500">₹{food.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <FiZap className="text-yellow-500" />
              AI Insights
            </h3>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all">
              Generate New Insights
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card rounded-xl p-4 border-l-4 ${
                  insight.type === 'positive' ? 'border-green-500' :
                  insight.type === 'warning' ? 'border-yellow-500' :
                  'border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{insight.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{insight.description}</p>
                  </div>
                  {insight.type === 'positive' && <FiCheckCircle className="text-green-500" />}
                  {insight.type === 'warning' && <FiAlertCircle className="text-yellow-500" />}
                  {insight.type === 'info' && <FiInfo className="text-blue-500" />}
                </div>
                <button className="mt-2 text-xs font-medium text-orange-500 hover:text-orange-600">
                  {insight.action} →
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FiActivity className="text-green-500" />
            Real Time Activity Feed
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'order' ? 'bg-blue-500' :
                  activity.type === 'restaurant' ? 'bg-purple-500' :
                  activity.type === 'customer' ? 'bg-green-500' :
                  activity.type === 'payment' ? 'bg-yellow-500' :
                  activity.type === 'refund' ? 'bg-red-500' :
                  activity.type === 'partner' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-gray-800 dark:text-white">{activity.user}</span>
                    <span className="text-gray-500 dark:text-gray-400"> {activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Analytics;