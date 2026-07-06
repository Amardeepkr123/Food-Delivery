import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBarChart2,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiUsers,
  FiShoppingBag,
  FiStar,
  FiCalendar,
  FiClock,
  FiPieChart,
  FiDownload,
  FiRefreshCw,
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical,
  FiAward,
  FiGift,
  FiZap
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';

const Analytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = {
          overview: {
            totalRevenue: 84560.50,
            totalOrders: 5678,
            totalUsers: 1256,
            totalRestaurants: 342,
            revenueGrowth: 18.7,
            ordersGrowth: 15.2,
            usersGrowth: 12.5,
            restaurantsGrowth: 8.3
          },
          revenueData: [
            { month: 'Jan', revenue: 3200, orders: 45 },
            { month: 'Feb', revenue: 2800, orders: 38 },
            { month: 'Mar', revenue: 3500, orders: 52 },
            { month: 'Apr', revenue: 4100, orders: 58 },
            { month: 'May', revenue: 5200, orders: 72 },
            { month: 'Jun', revenue: 3800, orders: 48 },
            { month: 'Jul', revenue: 4500, orders: 62 },
            { month: 'Aug', revenue: 4900, orders: 68 },
            { month: 'Sep', revenue: 5600, orders: 78 },
            { month: 'Oct', revenue: 6100, orders: 85 },
            { month: 'Nov', revenue: 6800, orders: 92 },
            { month: 'Dec', revenue: 7200, orders: 98 },
          ],
          topRestaurants: [
            { name: 'Pizza Palace', orders: 342, revenue: 4567.50 },
            { name: 'Burger House', orders: 289, revenue: 3245.75 },
            { name: 'Sushi Master', orders: 412, revenue: 5678.25 },
            { name: 'Taco Fiesta', orders: 198, revenue: 2345.00 },
            { name: 'Thai Garden', orders: 156, revenue: 1890.50 },
          ],
          userStats: {
            newUsers: 89,
            activeUsers: 892,
            returnUsers: 234,
            topUsers: [
              { name: 'Amit Sharma', orders: 12, spent: 456.50 },
              { name: 'Priya Patel', orders: 9, spent: 324.75 },
              { name: 'Rahul Singh', orders: 8, spent: 298.00 },
              { name: 'Sneha Reddy', orders: 7, spent: 267.25 },
            ]
          },
          orderStatus: {
            delivered: 3456,
            inTransit: 456,
            preparing: 567,
            cancelled: 234
          },
          ratingDistribution: {
            '5': 456,
            '4': 234,
            '3': 123,
            '2': 56,
            '1': 23
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
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium animate-pulse">
              Loading analytics...
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
              <FiBarChart2 className="text-orange-500" />
              Analytics
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Platform performance and insights
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

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Revenue', value: `$${analyticsData.overview.totalRevenue.toLocaleString()}`, icon: FiDollarSign, change: `+${analyticsData.overview.revenueGrowth}%`, trend: 'up', color: 'from-green-500 to-emerald-500' },
            { label: 'Total Orders', value: analyticsData.overview.totalOrders, icon: FiShoppingBag, change: `+${analyticsData.overview.ordersGrowth}%`, trend: 'up', color: 'from-blue-500 to-cyan-500' },
            { label: 'Total Users', value: analyticsData.overview.totalUsers, icon: FiUsers, change: `+${analyticsData.overview.usersGrowth}%`, trend: 'up', color: 'from-purple-500 to-pink-500' },
            { label: 'Restaurants', value: analyticsData.overview.totalRestaurants, icon: FiAward, change: `+${analyticsData.overview.restaurantsGrowth}%`, trend: 'up', color: 'from-orange-500 to-red-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
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
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Revenue Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <FiTrendingUp className="text-orange-500" />
                Revenue Trend
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-gray-600 dark:text-gray-300">Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300">Orders</span>
                </div>
              </div>
            </div>
            <div className="h-64 flex items-end gap-1">
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
                        className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg"
                        style={{ height: `${revenueHeight}%`, minHeight: '4px' }}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${ordersHeight}%` }}
                        transition={{ duration: 0.8, delay: index * 0.05 + 0.1 }}
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
                        style={{ height: `${ordersHeight}%`, minHeight: '4px' }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.month}</span>
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
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300 capitalize">{status}</span>
                      <span className="text-gray-600 dark:text-gray-300">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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

        {/* Top Restaurants & User Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiAward className="text-orange-500" />
              Top Restaurants
            </h3>
            <div className="space-y-3">
              {analyticsData.topRestaurants.map((restaurant, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 flex items-center justify-center text-sm font-bold">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${index + 1}`}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{restaurant.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{restaurant.orders} orders</p>
                    </div>
                  </div>
                  <span className="font-bold text-orange-500">${restaurant.revenue.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiUsers className="text-orange-500" />
              User Insights
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center">
                <p className="text-xl font-bold text-green-500">{analyticsData.userStats.newUsers}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">New Users</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center">
                <p className="text-xl font-bold text-blue-500">{analyticsData.userStats.activeUsers}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Active Users</p>
              </div>
            </div>
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Top Customers</h4>
            <div className="space-y-2">
              {analyticsData.userStats.topUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-[10px] font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{user.name}</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">{user.orders} orders</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-orange-500">${user.spent.toFixed(2)}</span>
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
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = analyticsData.ratingDistribution[rating] || 0;
              const total = Object.values(analyticsData.ratingDistribution).reduce((a, b) => a + b, 0);
              const percentage = (count / total) * 100;
              return (
                <div key={rating}>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 min-w-[60px]">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{rating}</span>
                      <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[40px]">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;