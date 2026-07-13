// src/pages/admin/Coupons.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTag,
  FiPlus,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiMoreVertical,
  FiClock,
  FiCalendar,
  FiDollarSign,
  FiPercent,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiUsers,
  FiShoppingBag,
  FiTrendingUp,
  FiCopy,
  FiSend,
  FiFilter,
  FiToggleLeft,
  FiToggleRight,
} from 'react-icons/fi';
import { FaGift, FaTicketAlt } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-toastify';

const Coupons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const coupons = [
    {
      id: 1,
      code: 'SAVE20',
      name: '20% Off First Order',
      description: 'Get 20% off on your first order. Maximum discount $20.',
      type: 'percentage',
      value: 20,
      maxDiscount: 20,
      minOrder: 50,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      usageLimit: 100,
      usedCount: 45,
      status: 'active',
      createdAt: '2024-01-01T00:00:00',
      applicableTo: 'all',
      categories: ['all'],
      restaurants: [],
      isStackable: false,
      freeDelivery: false,
    },
    {
      id: 2,
      code: 'FREEDEL',
      name: 'Free Delivery',
      description: 'Free delivery on orders above $30. No minimum order restriction.',
      type: 'free_delivery',
      value: 0,
      maxDiscount: 0,
      minOrder: 30,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      usageLimit: 200,
      usedCount: 78,
      status: 'active',
      createdAt: '2024-01-15T00:00:00',
      applicableTo: 'all',
      categories: ['all'],
      restaurants: [],
      isStackable: false,
      freeDelivery: true,
    },
    {
      id: 3,
      code: 'SAVE50',
      name: '$50 Off on $200',
      description: 'Get $50 off on orders above $200. Perfect for large orders.',
      type: 'fixed',
      value: 50,
      maxDiscount: 50,
      minOrder: 200,
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      usageLimit: 50,
      usedCount: 12,
      status: 'active',
      createdAt: '2024-02-01T00:00:00',
      applicableTo: 'all',
      categories: ['all'],
      restaurants: [],
      isStackable: false,
      freeDelivery: false,
    },
    {
      id: 4,
      code: 'PIZZA30',
      name: '30% Off Pizza',
      description: 'Get 30% off on all pizza orders. Valid on all pizza items.',
      type: 'percentage',
      value: 30,
      maxDiscount: 15,
      minOrder: 25,
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      usageLimit: 150,
      usedCount: 89,
      status: 'active',
      createdAt: '2024-01-20T00:00:00',
      applicableTo: 'category',
      categories: ['pizza'],
      restaurants: [],
      isStackable: false,
      freeDelivery: false,
    },
    {
      id: 5,
      code: 'WELCOME10',
      name: 'Welcome 10% Off',
      description: 'Welcome offer for new users. 10% off on first order.',
      type: 'percentage',
      value: 10,
      maxDiscount: 10,
      minOrder: 0,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      usageLimit: 500,
      usedCount: 234,
      status: 'active',
      createdAt: '2024-01-01T00:00:00',
      applicableTo: 'new_users',
      categories: ['all'],
      restaurants: [],
      isStackable: false,
      freeDelivery: false,
    },
    {
      id: 6,
      code: 'BURGER15',
      name: '15% Off Burgers',
      description: 'Get 15% off on all burger orders. Minimum order $20.',
      type: 'percentage',
      value: 15,
      maxDiscount: 10,
      minOrder: 20,
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      usageLimit: 100,
      usedCount: 34,
      status: 'expired',
      createdAt: '2024-01-01T00:00:00',
      applicableTo: 'category',
      categories: ['burgers'],
      restaurants: [],
      isStackable: false,
      freeDelivery: false,
    },
    {
      id: 7,
      code: 'FLASH25',
      name: 'Flash Sale 25% Off',
      description: 'Flash sale: 25% off on all orders above $40. Limited time offer.',
      type: 'percentage',
      value: 25,
      maxDiscount: 25,
      minOrder: 40,
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      usageLimit: 300,
      usedCount: 156,
      status: 'active',
      createdAt: '2024-02-10T00:00:00',
      applicableTo: 'all',
      categories: ['all'],
      restaurants: [],
      isStackable: false,
      freeDelivery: false,
    },
    {
      id: 8,
      code: 'LOYALTY50',
      name: 'Loyalty Reward $50',
      description: 'Loyalty reward for frequent customers. $50 off on orders above $100.',
      type: 'fixed',
      value: 50,
      maxDiscount: 50,
      minOrder: 100,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      usageLimit: 25,
      usedCount: 8,
      status: 'inactive',
      createdAt: '2024-01-01T00:00:00',
      applicableTo: 'specific_users',
      categories: ['all'],
      restaurants: [],
      isStackable: false,
      freeDelivery: false,
    },
  ];

  const statuses = [
    { id: 'all', label: 'All', count: coupons.length },
    { id: 'active', label: 'Active', count: coupons.filter(c => c.status === 'active').length },
    { id: 'expired', label: 'Expired', count: coupons.filter(c => c.status === 'expired').length },
    { id: 'inactive', label: 'Inactive', count: coupons.filter(c => c.status === 'inactive').length },
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'percentage', label: 'Percentage' },
    { id: 'fixed', label: 'Fixed Amount' },
    { id: 'free_delivery', label: 'Free Delivery' },
  ];

  const getTypeLabel = (type) => {
    const labels = {
      percentage: 'Percentage',
      fixed: 'Fixed Amount',
      free_delivery: 'Free Delivery',
    };
    return labels[type] || type;
  };

  const getTypeIcon = (type) => {
    const icons = {
      percentage: <FiPercent className="w-4 h-4" />,
      fixed: <FiDollarSign className="w-4 h-4" />,
      free_delivery: <FiTag className="w-4 h-4" />,
    };
    return icons[type] || <FiTag className="w-4 h-4" />;
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      expired: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
      inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400',
    };
    return badges[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusLabel = (status) => {
    const labels = {
      active: 'Active',
      expired: 'Expired',
      inactive: 'Inactive',
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: <FiCheckCircle className="w-4 h-4" />,
      expired: <FiXCircle className="w-4 h-4" />,
      inactive: <FiAlertCircle className="w-4 h-4" />,
    };
    return icons[status] || null;
  };

  const getApplicableLabel = (type) => {
    const labels = {
      all: 'All Users',
      new_users: 'New Users',
      category: 'Specific Categories',
      restaurant: 'Specific Restaurants',
      specific_users: 'Specific Users',
    };
    return labels[type] || type;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const getUsagePercentage = (used, limit) => {
    return Math.min((used / limit) * 100, 100);
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          coupon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          coupon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || coupon.status === selectedStatus;
    const matchesType = selectedType === 'all' || coupon.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPages = Math.ceil(filteredCoupons.length / 4);
  const paginatedCoupons = filteredCoupons.slice((currentPage - 1) * 4, currentPage * 4);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Coupons refreshed!');
    }, 1000);
  };

  const handleExport = () => {
    toast.success('Coupons exported successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      toast.success('Coupon deleted successfully');
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast.success(`Coupon ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied to clipboard!');
  };

  const handleSend = (id) => {
    toast.info('Send coupon feature coming soon');
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setShowCreateModal(true);
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    toast.success(editingCoupon ? 'Coupon updated successfully!' : 'Coupon created successfully!');
    setShowCreateModal(false);
    setEditingCoupon(null);
  };

  // Stats
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter(c => c.status === 'active').length;
  const totalUsed = coupons.reduce((sum, c) => sum + c.usedCount, 0);
  const totalUsageLimit = coupons.reduce((sum, c) => sum + c.usageLimit, 0);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <FiTag className="text-orange-500" />
                Coupons
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Manage discounts and promotional offers</p>
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
              <button
                onClick={() => {
                  setEditingCoupon(null);
                  setShowCreateModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center gap-2"
              >
                <FiPlus className="w-5 h-5" />
                Create Coupon
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Total Coupons</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalCoupons}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Active Coupons</p>
              <p className="text-2xl font-bold text-green-500">{activeCoupons}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Total Used</p>
              <p className="text-2xl font-bold text-orange-500">{totalUsed}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Usage Rate</p>
              <p className="text-2xl font-bold text-blue-500">
                {totalUsageLimit > 0 ? Math.round((totalUsed / totalUsageLimit) * 100) : 0}%
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
                placeholder="Search by code, name, or description..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-gray-600 dark:text-gray-300"
              >
                {types.map((type) => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Coupons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedCoupons.map((coupon, index) => (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all relative"
              >
                {/* Status Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusBadge(coupon.status)}`}>
                  {getStatusIcon(coupon.status)}
                  {getStatusLabel(coupon.status)}
                </div>

                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/20">
                      {getTypeIcon(coupon.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">{coupon.code}</h3>
                      <p className="text-sm text-gray-500">{coupon.name}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {coupon.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Discount</p>
                      {coupon.type === 'percentage' && (
                        <p className="text-xl font-bold text-orange-500">{coupon.value}%</p>
                      )}
                      {coupon.type === 'fixed' && (
                        <p className="text-xl font-bold text-orange-500">${coupon.value}</p>
                      )}
                      {coupon.type === 'free_delivery' && (
                        <p className="text-xl font-bold text-green-500">Free Delivery</p>
                      )}
                      {coupon.maxDiscount > 0 && coupon.type === 'percentage' && (
                        <p className="text-xs text-gray-400">Max ${coupon.maxDiscount} off</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Min Order</p>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {coupon.minOrder > 0 ? `$${coupon.minOrder}` : 'No min'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Applicable To</p>
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        {getApplicableLabel(coupon.applicableTo)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Usage</p>
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        {coupon.usedCount} / {coupon.usageLimit}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        getUsagePercentage(coupon.usedCount, coupon.usageLimit) > 80
                          ? 'bg-red-500'
                          : getUsagePercentage(coupon.usedCount, coupon.usageLimit) > 50
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${getUsagePercentage(coupon.usedCount, coupon.usageLimit)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-3 h-3" />
                      {formatDate(coupon.startDate)} - {formatDate(coupon.endDate)}
                    </span>
                    {isExpired(coupon.endDate) && coupon.status === 'active' && (
                      <span className="text-red-500 font-semibold">Expired</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopyCode(coupon.code)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Copy code"
                      >
                        <FiCopy className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleSend(coupon.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Send to users"
                      >
                        <FiSend className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleStatus(coupon.id, coupon.status)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title={coupon.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        {coupon.status === 'active' ? (
                          <FiToggleRight className="w-5 h-5 text-green-500" />
                        ) : (
                          <FiToggleLeft className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(coupon)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Edit"
                      >
                        <FiEdit2 className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(coupon.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4 text-red-500" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="More">
                        <FiMoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <p>Showing {paginatedCoupons.length} of {filteredCoupons.length} coupons</p>
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
          {filteredCoupons.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏷️</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Coupons Found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Coupon Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowCreateModal(false);
              setEditingCoupon(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <FaTicketAlt className="text-orange-500" />
                  {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingCoupon(null);
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiXCircle className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleCreateCoupon} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Coupon Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={editingCoupon?.code || ''}
                      placeholder="e.g., SAVE20"
                      className="w-full px-4 py-3 rounded-2xl food-input uppercase"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Coupon Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={editingCoupon?.name || ''}
                      placeholder="e.g., 20% Off First Order"
                      className="w-full px-4 py-3 rounded-2xl food-input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="2"
                    defaultValue={editingCoupon?.description || ''}
                    placeholder="Describe your coupon..."
                    className="w-full px-4 py-3 rounded-2xl food-input resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      defaultValue={editingCoupon?.type || 'percentage'}
                      className="w-full px-4 py-3 rounded-2xl food-input"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                      <option value="free_delivery">Free Delivery</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Value <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      defaultValue={editingCoupon?.value || 0}
                      placeholder="e.g., 20"
                      className="w-full px-4 py-3 rounded-2xl food-input"
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Max Discount
                    </label>
                    <input
                      type="number"
                      defaultValue={editingCoupon?.maxDiscount || 0}
                      placeholder="e.g., 20"
                      className="w-full px-4 py-3 rounded-2xl food-input"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Min Order Amount
                    </label>
                    <input
                      type="number"
                      defaultValue={editingCoupon?.minOrder || 0}
                      placeholder="e.g., 50"
                      className="w-full px-4 py-3 rounded-2xl food-input"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Usage Limit
                    </label>
                    <input
                      type="number"
                      defaultValue={editingCoupon?.usageLimit || 100}
                      placeholder="e.g., 100"
                      className="w-full px-4 py-3 rounded-2xl food-input"
                      min="1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      defaultValue={editingCoupon?.startDate || ''}
                      className="w-full px-4 py-3 rounded-2xl food-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      defaultValue={editingCoupon?.endDate || ''}
                      className="w-full px-4 py-3 rounded-2xl food-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Applicable To
                    </label>
                    <select
                      defaultValue={editingCoupon?.applicableTo || 'all'}
                      className="w-full px-4 py-3 rounded-2xl food-input"
                    >
                      <option value="all">All Users</option>
                      <option value="new_users">New Users</option>
                      <option value="category">Specific Categories</option>
                      <option value="restaurant">Specific Restaurants</option>
                      <option value="specific_users">Specific Users</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      defaultValue={editingCoupon?.status || 'active'}
                      className="w-full px-4 py-3 rounded-2xl food-input"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <input
                      type="checkbox"
                      defaultChecked={editingCoupon?.freeDelivery || false}
                      className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    Free Delivery
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <input
                      type="checkbox"
                      defaultChecked={editingCoupon?.isStackable || false}
                      className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    Stackable with other offers
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingCoupon(null);
                    }}
                    className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
                  >
                    <FaGift className="w-5 h-5" />
                    {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Coupons;