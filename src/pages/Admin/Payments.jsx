// src/pages/admin/Payments.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiDollarSign,
  FiCreditCard,
  FiSmartphone,
  FiSearch,
  FiEye,
  FiRefreshCw,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiUser,
  FiCalendar,
  FiMoreVertical,
  FiFilter,
} from 'react-icons/fi';
import { FaGooglePay, FaWallet, FaUniversity } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-toastify';

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const payments = [
    {
      id: 'PAY-001',
      transactionId: 'TXN-1234567890',
      customer: 'John Doe',
      customerEmail: 'john@example.com',
      amount: 42.97,
      method: 'card',
      status: 'completed',
      date: '2024-01-15',
      time: '2:30 PM',
      orderId: 'ORD-12345',
      restaurant: 'Pizza Palace',
    },
    {
      id: 'PAY-002',
      transactionId: 'TXN-1234567891',
      customer: 'Jane Smith',
      customerEmail: 'jane@example.com',
      amount: 28.99,
      method: 'upi',
      status: 'completed',
      date: '2024-01-15',
      time: '3:45 PM',
      orderId: 'ORD-12346',
      restaurant: 'Burger House',
    },
    {
      id: 'PAY-003',
      transactionId: 'TXN-1234567892',
      customer: 'Bob Johnson',
      customerEmail: 'bob@example.com',
      amount: 35.50,
      method: 'cod',
      status: 'pending',
      date: '2024-01-14',
      time: '7:30 PM',
      orderId: 'ORD-12347',
      restaurant: 'Sushi Master',
    },
    {
      id: 'PAY-004',
      transactionId: 'TXN-1234567893',
      customer: 'Alice Brown',
      customerEmail: 'alice@example.com',
      amount: 52.00,
      method: 'card',
      status: 'failed',
      date: '2024-01-14',
      time: '8:15 PM',
      orderId: 'ORD-12348',
      restaurant: 'Pasta Paradise',
    },
    {
      id: 'PAY-005',
      transactionId: 'TXN-1234567894',
      customer: 'Charlie Wilson',
      customerEmail: 'charlie@example.com',
      amount: 19.99,
      method: 'wallet',
      status: 'completed',
      date: '2024-01-13',
      time: '12:00 PM',
      orderId: 'ORD-12349',
      restaurant: 'Pizza Palace',
    },
    {
      id: 'PAY-006',
      transactionId: 'TXN-1234567895',
      customer: 'Diana Prince',
      customerEmail: 'diana@example.com',
      amount: 34.50,
      method: 'net_banking',
      status: 'refunded',
      date: '2024-01-13',
      time: '6:20 PM',
      orderId: 'ORD-12350',
      restaurant: 'Burger House',
    },
  ];

  const statuses = [
    { id: 'all', label: 'All', count: payments.length },
    { id: 'completed', label: 'Completed', count: payments.filter(p => p.status === 'completed').length },
    { id: 'pending', label: 'Pending', count: payments.filter(p => p.status === 'pending').length },
    { id: 'failed', label: 'Failed', count: payments.filter(p => p.status === 'failed').length },
    { id: 'refunded', label: 'Refunded', count: payments.filter(p => p.status === 'refunded').length },
  ];

  const methods = [
    { id: 'all', label: 'All Methods' },
    { id: 'card', label: 'Card', icon: FiCreditCard },
    { id: 'upi', label: 'UPI', icon: FaGooglePay },
    { id: 'wallet', label: 'Wallet', icon: FaWallet },
    { id: 'net_banking', label: 'Net Banking', icon: FaUniversity },
    { id: 'cod', label: 'COD', icon: FiDollarSign },
  ];

  const getMethodIcon = (method) => {
    const icons = {
      card: <FiCreditCard className="w-4 h-4" />,
      upi: <FaGooglePay className="w-4 h-4" />,
      wallet: <FaWallet className="w-4 h-4" />,
      net_banking: <FaUniversity className="w-4 h-4" />,
      cod: <FiDollarSign className="w-4 h-4" />,
    };
    return icons[method] || <FiCreditCard className="w-4 h-4" />;
  };

  const getMethodLabel = (method) => {
    const labels = {
      card: 'Card',
      upi: 'UPI',
      wallet: 'Wallet',
      net_banking: 'Net Banking',
      cod: 'Cash on Delivery',
    };
    return labels[method] || method;
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      failed: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
      refunded: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    };
    return badges[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: <FiCheckCircle className="w-4 h-4" />,
      pending: <FiClock className="w-4 h-4" />,
      failed: <FiXCircle className="w-4 h-4" />,
      refunded: <FiCheckCircle className="w-4 h-4" />,
    };
    return icons[status] || null;
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchesMethod = selectedMethod === 'all' || payment.method === selectedMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalPages = Math.ceil(filteredPayments.length / 5);
  const paginatedPayments = filteredPayments.slice((currentPage - 1) * 5, currentPage * 5);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Payments refreshed!');
    }, 1000);
  };

  const handleExport = () => {
    toast.success('Payments exported successfully!');
  };

  const totalRevenue = filteredPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <FiDollarSign className="text-orange-500" />
                Payments
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Manage all payment transactions</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <FiDownload className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-green-500">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{filteredPayments.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Successful</p>
              <p className="text-2xl font-bold text-green-500">
                {filteredPayments.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Failed</p>
              <p className="text-2xl font-bold text-red-500">
                {filteredPayments.filter(p => p.status === 'failed').length}
              </p>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            {statuses.map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedStatus === status.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="font-semibold">{status.count}</span>
                <span className="ml-1 text-sm">{status.label}</span>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search payments..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-gray-600 dark:text-gray-300"
              >
                {methods.map((method) => (
                  <option key={method.id} value={method.id}>{method.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedPayments.map((payment) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{payment.id}</p>
                          <p className="text-xs text-gray-500">{payment.transactionId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{payment.customer}</p>
                          <p className="text-xs text-gray-500">{payment.customerEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getMethodIcon(payment.method)}
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {getMethodLabel(payment.method)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-orange-500">${payment.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(payment.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(payment.status)}`}>
                            {payment.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{payment.date}</div>
                        <div className="text-xs text-gray-400">{payment.time}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="View Details">
                            <FiEye className="w-4 h-4 text-blue-500" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="More">
                            <FiMoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <p>Showing {paginatedPayments.length} of {filteredPayments.length} payments</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      currentPage === i + 1
                        ? 'bg-orange-500 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Payments Found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Payments;