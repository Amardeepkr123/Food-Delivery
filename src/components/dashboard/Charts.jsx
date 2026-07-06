import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign, 
  FiUsers, 
  FiShoppingBag, 
  FiStar,
  FiCalendar,
  FiClock,
  FiBarChart2,
  FiPieChart,
  FiDownload,
  FiRefreshCw,
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical
} from 'react-icons/fi';
import { 
  FaUtensils, 
  FaPizzaSlice, 
  FaHamburger, 
  FaIceCream, 
  FaCoffee
} from 'react-icons/fa';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = {
          overview: {
            totalRevenue: 24580.50,
            totalOrders: 342,
            totalCustomers: 156,
            averageRating: 4.7,
            revenueGrowth: 12.5,
            ordersGrowth: 8.3,
            customersGrowth: 5.2,
            ratingGrowth: 0.3
          },
          revenueData: [
            { day: 'Mon', revenue: 3200, orders: 45 },
            { day: 'Tue', revenue: 2800, orders: 38 },
            { day: 'Wed', revenue: 3500, orders: 52 },
            { day: 'Thu', revenue: 4100, orders: 58 },
            { day: 'Fri', revenue: 5200, orders: 72 },
            { day: 'Sat', revenue: 3800, orders: 48 },
            { day: 'Sun', revenue: 2980, orders: 42 },
          ],
          popularItems: [
            { name: 'Margherita Pizza', orders: 89, revenue: 1511.11, percentage: 18 },
            { name: 'Pepperoni Pizza', orders: 76, revenue: 1519.24, percentage: 16 },
            { name: 'Pasta Alfredo', orders: 54, revenue: 1025.46, percentage: 12 },
            { name: 'Caesar Salad', orders: 48, revenue: 719.52, percentage: 10 },
            { name: 'Tiramisu', orders: 42, revenue: 377.58, percentage: 9 },
          ],
          customerStats: {
            newCustomers: 23,
            returningCustomers: 78,
            topCustomers: [
              { name: 'Amit Sharma', orders: 12, spent: 456.50 },
              { name: 'Priya Patel', orders: 9, spent: 324.75 },
              { name: 'Rahul Singh', orders: 8, spent: 298.00 },
            ]
          },
          orderStatus: {
            delivered: 245,
            inTransit: 32,
            preparing: 42,
            cancelled: 23
          },
          ratingDistribution: {
            '5': 156,
            '4': 89,
            '3': 45,
            '2': 23,
            '1': 12
          }
        };
        
        setAnalyticsData(mockData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedPeriod]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleExport = () => {
    alert('Exporting analytics data...');
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      inTransit: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      preparing: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.preparing;
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
            <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium animate-pulse">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FiBarChart2 className="text-orange-500" />
            Analytics Dashboard
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Track your restaurant performance and insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {['day', 'week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 capitalize ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
          >
            <FiRefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
          >
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${analyticsData.overview.totalRevenue.toLocaleString()}`, icon: FiDollarSign, change: `+${analyticsData.overview.revenueGrowth}%`, trend: 'up', color: 'from-green-500 to-emerald-500' },
          { label: 'Total Orders', value: analyticsData.overview.totalOrders, icon: FiShoppingBag, change: `+${analyticsData.overview.ordersGrowth}%`, trend: 'up', color: 'from-blue-500 to-blue-600' },
          { label: 'Total Customers', value: analyticsData.overview.totalCustomers, icon: FiUsers, change: `+${analyticsData.overview.customersGrowth}%`, trend: 'up', color: 'from-purple-500 to-pink-500' },
          { label: 'Average Rating', value: analyticsData.overview.averageRating, icon: FiStar, change: `+${analyticsData.overview.ratingGrowth}`, trend: 'up', color: 'from-yellow-500 to-yellow-600' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-4 hover:shadow-3xl transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === 'up' ? <FiArrowUp className="text-green-500 text-sm" /> : <FiArrowDown className="text-red-500 text-sm" />}
                  <span className={`text-xs font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-lg`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FiTrendingUp className="text-orange-500" />
              Revenue Overview
            </h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-gray-600 dark:text-gray-300">Revenue</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-600 dark:text-gray-300">Orders</span>
              </div>
            </div>
          </div>
          <div className="h-48 flex items-end gap-2">
            {analyticsData.revenueData.map((item, index) => {
              const maxRevenue = Math.max(...analyticsData.revenueData.map(d => d.revenue));
              const maxOrders = Math.max(...analyticsData.revenueData.map(d => d.orders));
              const revenueHeight = (item.revenue / maxRevenue) * 100;
              const ordersHeight = (item.orders / maxOrders) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center gap-0.5">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${revenueHeight}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                      className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t"
                      style={{ height: `${revenueHeight}%`, minHeight: '2px' }}
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${ordersHeight}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 + 0.1 }}
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                      style={{ height: `${ordersHeight}%`, minHeight: '2px' }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Status */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FiPieChart className="text-orange-500" />
            Order Status
          </h3>
          <div className="space-y-3">
            {Object.entries(analyticsData.orderStatus).map(([status, count]) => {
              const total = Object.values(analyticsData.orderStatus).reduce((a, b) => a + b, 0);
              const percentage = (count / total) * 100;
              return (
                <div key={status}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-300 capitalize">{status}</span>
                    <span className="text-gray-600 dark:text-gray-300">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${getStatusColor(status)}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popular Items & Customer Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Items */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FaUtensils className="text-orange-500" />
            Popular Items
          </h3>
          <div className="space-y-3">
            {analyticsData.popularItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 flex items-center justify-center text-sm font-bold">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && `#${index + 1}`}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-gray-800 dark:text-white">{item.name}</span>
                    <span className="text-gray-600 dark:text-gray-300">${item.revenue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{item.orders} orders</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Stats */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FiUsers className="text-orange-500" />
            Customer Insights
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center">
              <p className="text-xl font-bold text-green-500">{analyticsData.customerStats.newCustomers}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">New Customers</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center">
              <p className="text-xl font-bold text-blue-500">{analyticsData.customerStats.returningCustomers}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Returning Customers</p>
            </div>
          </div>
          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Top Customers</h4>
          <div className="space-y-2">
            {analyticsData.customerStats.topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-[10px] font-bold">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{customer.name}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{customer.orders} orders</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-orange-500">${customer.spent.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <FiStar className="text-orange-500" />
          Rating Distribution
        </h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = analyticsData.ratingDistribution[rating] || 0;
            const total = Object.values(analyticsData.ratingDistribution).reduce((a, b) => a + b, 0);
            const percentage = (count / total) * 100;
            return (
              <div key={rating}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 min-w-[50px]">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{rating}</span>
                    <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                    />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[30px]">{count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;