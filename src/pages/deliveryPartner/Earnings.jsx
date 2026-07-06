// src/pages/deliveryPartner/Earnings.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiDollarSign,        // ✅ Fixed - Was FiWallet
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiClock,
  FiTruck,
  FiStar,
  FiAward,
  FiCreditCard,        // ✅ Added alternative
  FiDownload,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiEye,
  FiInfo,
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';

// Mock earnings data
const mockEarnings = {
  today: 850,
  week: 4850,
  month: 18500,
  year: 87500,
  total: 87500,
  pending: 1200,
  completed: 86300,
  upcoming: 1500,
};

const mockTransactions = [
  { id: 1, date: '2024-01-15', amount: 850, status: 'completed', type: 'delivery', orderId: 'ORD-2024-001' },
  { id: 2, date: '2024-01-14', amount: 620, status: 'completed', type: 'delivery', orderId: 'ORD-2024-002' },
  { id: 3, date: '2024-01-14', amount: 120, status: 'completed', type: 'bonus', orderId: 'ORD-2024-002' },
  { id: 4, date: '2024-01-13', amount: 750, status: 'completed', type: 'delivery', orderId: 'ORD-2024-003' },
  { id: 5, date: '2024-01-12', amount: 500, status: 'pending', type: 'delivery', orderId: 'ORD-2024-004' },
  { id: 6, date: '2024-01-11', amount: 680, status: 'completed', type: 'delivery', orderId: 'ORD-2024-005' },
  { id: 7, date: '2024-01-10', amount: 200, status: 'completed', type: 'bonus', orderId: 'ORD-2024-006' },
  { id: 8, date: '2024-01-09', amount: 920, status: 'failed', type: 'delivery', orderId: 'ORD-2024-007' },
];

const weeklyData = [
  { day: 'Mon', amount: 1200 },
  { day: 'Tue', amount: 1500 },
  { day: 'Wed', amount: 1800 },
  { day: 'Thu', amount: 2100 },
  { day: 'Fri', amount: 1900 },
  { day: 'Sat', amount: 2400 },
  { day: 'Sun', amount: 2800 },
];

const monthlyData = [
  { month: 'Jan', amount: 25000 },
  { month: 'Feb', amount: 32000 },
  { month: 'Mar', amount: 28000 },
  { month: 'Apr', amount: 35000 },
  { month: 'May', amount: 42000 },
  { month: 'Jun', amount: 38000 },
];

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, subtext, color, trend, trendValue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            ₹{value.toLocaleString()}
          </p>
          {subtext && (
            <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
              {trendValue}
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl shadow-lg`}>
          <Icon />
        </div>
      </div>
    </motion.div>
  );
};

// Transaction Status Badge
const StatusBadge = ({ status }) => {
  const statusMap = {
    completed: { label: 'Completed', color: 'bg-green-500' },
    pending: { label: 'Pending', color: 'bg-yellow-500' },
    failed: { label: 'Failed', color: 'bg-red-500' },
  };

  const { label, color } = statusMap[status] || statusMap.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${color}`}>
      {label}
    </span>
  );
};

const Earnings = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [viewMode, setViewMode] = useState('list');

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
              <FiDollarSign className="text-green-500" />
              Earnings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Track your delivery earnings and performance
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FiDownload /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FiFilter /> Filter
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <StatsCard
            icon={FiDollarSign}
            title="Today's Earnings"
            value={mockEarnings.today}
            color="from-green-500 to-green-600"
            trend="up"
            trendValue="+12%"
          />
          <StatsCard
            icon={FiCreditCard}
            title="This Week"
            value={mockEarnings.week}
            color="from-blue-500 to-blue-600"
            trend="up"
            trendValue="+8%"
          />
          <StatsCard
            icon={FiTrendingUp}
            title="This Month"
            value={mockEarnings.month}
            color="from-purple-500 to-purple-600"
            trend="up"
            trendValue="+15%"
          />
          <StatsCard
            icon={FiAward}
            title="Total Earnings"
            value={mockEarnings.total}
            color="from-orange-500 to-red-500"
            trend="up"
            trendValue="+22%"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
            <p className="text-xl font-bold text-yellow-500">₹{mockEarnings.pending}</p>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
            <p className="text-xl font-bold text-green-500">₹{mockEarnings.completed}</p>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Upcoming</p>
            <p className="text-xl font-bold text-blue-500">₹{mockEarnings.upcoming}</p>
          </div>
        </div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <FiClock className="text-gray-500" />
              Recent Transactions
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange('day')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  timeRange === 'day'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  timeRange === 'week'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  timeRange === 'month'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                Month
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {mockTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {transaction.orderId}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {transaction.date}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm capitalize text-gray-600 dark:text-gray-300">
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-semibold ${
                        transaction.status === 'failed'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }`}>
                        ₹{transaction.amount}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Earnings;