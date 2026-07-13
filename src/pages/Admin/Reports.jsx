// src/pages/admin/Reports.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiFileText,
  FiDownload,
  FiRefreshCw,
  FiCalendar,
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiTruck,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowUp,
  FiArrowDown,
  FiPieChart,
  FiBarChart2,
  FiActivity,
  FiClock,
  FiStar,
  FiMapPin,
  FiShoppingCart,
  FiCreditCard,
  FiTag,
  FiBox,
  FiPrinter,
  FiMail,
  FiShare2,
  FiEye,
  FiFilter,
  FiSearch,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiPlus,
  FiMinus,
  FiMenu,
  FiGrid,
  FiList,
} from 'react-icons/fi';
import { FaFileExcel, FaFilePdf, FaFileCsv, FaFileAlt } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-toastify';

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('chart');
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  // Report Types
  const reportTypes = [
    {
      id: 'sales',
      name: 'Sales Report',
      icon: FiDollarSign,
      description: 'Track revenue, orders, and sales performance',
      color: 'green',
    },
    {
      id: 'orders',
      name: 'Orders Report',
      icon: FiPackage,
      description: 'Order volume, status distribution, and trends',
      color: 'blue',
    },
    {
      id: 'customers',
      name: 'Customer Report',
      icon: FiUsers,
      description: 'Customer acquisition, retention, and demographics',
      color: 'purple',
    },
    {
      id: 'delivery',
      name: 'Delivery Report',
      icon: FiTruck,
      description: 'Delivery performance, partner metrics, and efficiency',
      color: 'orange',
    },
    {
      id: 'payment',
      name: 'Payment Report',
      icon: FiCreditCard,
      description: 'Payment methods, transaction success, and refunds',
      color: 'teal',
    },
    {
      id: 'inventory',
      name: 'Inventory Report',
      icon: FiBox,
      description: 'Stock levels, popular items, and wastage',
      color: 'indigo',
    },
    {
      id: 'restaurant',
      name: 'Restaurant Report',
      icon: FiMapPin,
      description: 'Restaurant performance, ratings, and revenue',
      color: 'rose',
    },
    {
      id: 'coupon',
      name: 'Coupon Report',
      icon: FiTag,
      description: 'Coupon usage, redemption rates, and effectiveness',
      color: 'yellow',
    },
  ];

  // Metrics Options
  const metricOptions = [
    { id: 'revenue', label: 'Revenue', icon: FiDollarSign },
    { id: 'orders', label: 'Orders', icon: FiPackage },
    { id: 'customers', label: 'Customers', icon: FiUsers },
    { id: 'deliveries', label: 'Deliveries', icon: FiTruck },
    { id: 'ratings', label: 'Ratings', icon: FiStar },
    { id: 'conversion', label: 'Conversion Rate', icon: FiTrendingUp },
  ];

  // Mock Data - Sales Report
  const salesData = {
    summary: {
      totalRevenue: 45230.50,
      totalOrders: 1245,
      avgOrderValue: 36.33,
      growth: 12.5,
      comparedTo: 'previous month',
    },
    daily: [
      { date: '2024-01-01', revenue: 1250, orders: 34 },
      { date: '2024-01-02', revenue: 1420, orders: 38 },
      { date: '2024-01-03', revenue: 980, orders: 26 },
      { date: '2024-01-04', revenue: 1650, orders: 45 },
      { date: '2024-01-05', revenue: 1890, orders: 52 },
      { date: '2024-01-06', revenue: 2100, orders: 58 },
      { date: '2024-01-07', revenue: 1750, orders: 48 },
      { date: '2024-01-08', revenue: 1340, orders: 37 },
      { date: '2024-01-09', revenue: 1560, orders: 42 },
      { date: '2024-01-10', revenue: 1980, orders: 54 },
    ],
    categories: [
      { name: 'Pizza', revenue: 12450, orders: 342 },
      { name: 'Burgers', revenue: 8750, orders: 256 },
      { name: 'Sushi', revenue: 15200, orders: 189 },
      { name: 'Pasta', revenue: 18900, orders: 423 },
      { name: 'Desserts', revenue: 21000, orders: 567 },
    ],
    topRestaurants: [
      { name: 'Pizza Palace', revenue: 12450, orders: 342, rating: 4.8 },
      { name: 'Sushi Master', revenue: 15200, orders: 189, rating: 4.9 },
      { name: 'Pasta Paradise', revenue: 18900, orders: 423, rating: 4.7 },
      { name: 'Burger House', revenue: 8750, orders: 256, rating: 4.6 },
      { name: 'Sweet Treats', revenue: 21000, orders: 567, rating: 4.9 },
    ],
  };

  // Mock Data - Orders Report
  const ordersData = {
    summary: {
      totalOrders: 1245,
      completed: 1023,
      pending: 89,
      cancelled: 78,
      preparing: 55,
    },
    statusDistribution: [
      { status: 'Delivered', count: 1023, percentage: 82.2 },
      { status: 'Pending', count: 89, percentage: 7.2 },
      { status: 'Cancelled', count: 78, percentage: 6.3 },
      { status: 'Preparing', count: 55, percentage: 4.3 },
    ],
  };

  // Mock Data - Customers Report
  const customersData = {
    summary: {
      totalCustomers: 3200,
      newCustomers: 456,
      returningCustomers: 2744,
      avgOrderPerCustomer: 3.8,
    },
    customerSegments: [
      { segment: 'New', count: 456, percentage: 14.3 },
      { segment: 'Returning', count: 1800, percentage: 56.3 },
      { segment: 'Loyal', count: 944, percentage: 29.4 },
    ],
  };

  // Mock Data - Delivery Report
  const deliveryData = {
    summary: {
      totalDeliveries: 1023,
      onTime: 890,
      late: 133,
      avgDeliveryTime: 28.5,
      avgDistance: 3.2,
    },
    partnerPerformance: [
      { name: 'John Doe', deliveries: 145, rating: 4.8, onTime: 95 },
      { name: 'Mike Smith', deliveries: 98, rating: 4.6, onTime: 92 },
      { name: 'Sarah Johnson', deliveries: 210, rating: 4.9, onTime: 98 },
      { name: 'David Wilson', deliveries: 167, rating: 4.7, onTime: 93 },
    ],
  };

  const getReportData = () => {
    switch (selectedReport) {
      case 'sales':
        return salesData;
      case 'orders':
        return ordersData;
      case 'customers':
        return customersData;
      case 'delivery':
        return deliveryData;
      default:
        return salesData;
    }
  };

  const reportData = getReportData();

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Report generated successfully!`);
    }, 2000);
  };

  const handleDownload = () => {
    toast.success(`Report downloaded as ${selectedFormat.toUpperCase()}`);
  };

  const handleExport = () => {
    toast.success('Report exported successfully');
  };

  const handleShare = () => {
    toast.success('Report link copied to clipboard');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getReportIcon = (id) => {
    const report = reportTypes.find(r => r.id === id);
    return report ? report.icon : FiFileText;
  };

  const renderSummaryCards = () => {
    const data = reportData.summary;
    if (!data) return null;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(data).map(([key, value], index) => {
          let icon = FiActivity;
          let color = 'blue';
          let label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

          if (key === 'totalRevenue' || key === 'revenue') {
            icon = FiDollarSign;
            color = 'green';
            value = formatCurrency(value);
          } else if (key === 'growth' || key === 'onTime' || key === 'percentage') {
            icon = FiTrendingUp;
            color = 'green';
            value = `${value}%`;
          } else if (key === 'avgOrderValue' || key === 'avgOrderPerCustomer' || key === 'avgDeliveryTime') {
            icon = FiClock;
            color = 'orange';
            value = typeof value === 'number' ? value.toFixed(1) : value;
          } else {
            icon = FiActivity;
            color = 'blue';
            value = typeof value === 'number' ? formatNumber(value) : value;
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-${color}-100 dark:bg-${color}-900/20`}>
                  {React.createElement(icon, { className: `w-5 h-5 text-${color}-500` })}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">{label}</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-white">{value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderChart = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} Overview
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('chart')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'chart'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <FiBarChart2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-500 dark:text-gray-400">
              {selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} chart will be displayed here
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Data for {dateRange.start} to {dateRange.end}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    const data = reportData;
    if (!data || !data.topRestaurants) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
          Top Performing Restaurants
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Restaurant</th>
                <th className="pb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Revenue</th>
                <th className="pb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Orders</th>
                <th className="pb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Rating</th>
              </tr>
            </thead>
            <tbody>
              {data.topRestaurants.map((restaurant, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <td className="py-3 font-medium text-gray-800 dark:text-white">{restaurant.name}</td>
                  <td className="py-3 font-semibold text-orange-500">{formatCurrency(restaurant.revenue)}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{formatNumber(restaurant.orders)}</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 text-yellow-500">
                      <FiStar className="fill-current" /> {restaurant.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <FiFileText className="text-orange-500" />
                Reports
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Generate and download platform reports</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <FiFilter className="w-4 h-4" />
                Filters
              </button>
              <button
                onClick={handleGenerateReport}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center gap-2"
              >
                <FiDownload className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          {/* Report Type Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {reportTypes.map((type) => {
              const Icon = type.icon;
              const isActive = selectedReport === type.id;
              return (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedReport(type.id)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    isActive
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 ${isActive ? 'text-orange-500' : 'text-gray-400'}`} />
                  <p className={`font-semibold text-sm ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {type.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {type.description}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Date Range
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          value={dateRange.start}
                          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                          className="px-4 py-2 rounded-xl food-input"
                        />
                        <input
                          type="date"
                          value={dateRange.end}
                          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                          className="px-4 py-2 rounded-xl food-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Download Format
                      </label>
                      <div className="flex gap-2">
                        {['pdf', 'excel', 'csv'].map((format) => (
                          <button
                            key={format}
                            onClick={() => setSelectedFormat(format)}
                            className={`px-4 py-2 rounded-xl flex-1 transition-all ${
                              selectedFormat === format
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {format.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Metrics
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {metricOptions.map((metric) => (
                          <button
                            key={metric.id}
                            onClick={() => {
                              setSelectedMetrics(prev =>
                                prev.includes(metric.id)
                                  ? prev.filter(m => m !== metric.id)
                                  : [...prev, metric.id]
                              );
                            }}
                            className={`px-3 py-1 rounded-lg text-xs transition-all ${
                              selectedMetrics.includes(metric.id)
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {metric.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Summary Cards */}
          {renderSummaryCards()}

          {/* Chart */}
          {renderChart()}

          {/* Table */}
          {renderTable()}

          {/* Export Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleDownload}
              className="px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FiDownload className="w-5 h-5 text-orange-500" />
              Download Report
            </button>
            <button
              onClick={handleExport}
              className="px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FiShare2 className="w-5 h-5 text-blue-500" />
              Share Report
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FiPrinter className="w-5 h-5 text-gray-500" />
              Print
            </button>
            <button
              onClick={() => toast.info('Email report feature coming soon')}
              className="px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FiMail className="w-5 h-5 text-green-500" />
              Email Report
            </button>
          </div>

          {/* Report Legend */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Legend:</span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Revenue
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Orders
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                Customers
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                Deliveries
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                Ratings
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;