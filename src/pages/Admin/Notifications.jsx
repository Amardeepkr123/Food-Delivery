// src/pages/admin/Notifications.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBell,
  FiSend,
  FiRefreshCw,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiUser,
  FiUsers,
  FiMail,
  FiMessageSquare,
  FiAlertCircle,
  FiInfo,
  FiCheck,
  FiFilter,
  FiSearch,
  FiMoreVertical,
  FiEdit2,
  FiEye,
  FiCalendar,
  FiTag,
  FiSettings,
  // ✅ FIX: Replace FiBellOn with FiBell
  // FiBellOn, // ❌ REMOVED - Doesn't exist
  // FiBellOff, // ❌ REMOVED - Doesn't exist
  FiTrendingUp,
  FiPackage,
  FiTruck,
  FiStar,
  FiDollarSign,
  FiX,
} from 'react-icons/fi';
// ✅ ADD: Alternative bell icons from Font Awesome
import { FaBell, FaBellSlash } from 'react-icons/fa';
import { FaUtensils, FaUserFriends } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-toastify';

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New Order #ORD-12345',
      message: 'John Doe placed a new order for $42.97 at Pizza Palace',
      type: 'order',
      status: 'unread',
      priority: 'high',
      createdAt: '2024-01-15T14:30:00',
      readAt: null,
      recipient: {
        type: 'restaurant',
        id: 1,
        name: 'Pizza Palace',
      },
      actions: ['view_order'],
      metadata: {
        orderId: 'ORD-12345',
        amount: 42.97,
      },
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'Payment of $28.99 received for order #ORD-12346 from Jane Smith',
      type: 'payment',
      status: 'read',
      priority: 'medium',
      createdAt: '2024-01-15T14:35:00',
      readAt: '2024-01-15T14:40:00',
      recipient: {
        type: 'admin',
        id: 0,
        name: 'Admin',
      },
      actions: ['view_payment'],
      metadata: {
        orderId: 'ORD-12346',
        amount: 28.99,
        transactionId: 'TXN-1234567891',
      },
    },
    {
      id: 3,
      title: 'Delivery Partner Assigned',
      message: 'John Doe assigned as delivery partner for order #ORD-12347',
      type: 'delivery',
      status: 'unread',
      priority: 'high',
      createdAt: '2024-01-15T15:00:00',
      readAt: null,
      recipient: {
        type: 'customer',
        id: 3,
        name: 'Bob Johnson',
      },
      actions: ['track_order'],
      metadata: {
        orderId: 'ORD-12347',
        partner: 'John Doe',
      },
    },
    {
      id: 4,
      title: 'New Restaurant Registered',
      message: 'Taco Bell has registered as a new restaurant on the platform',
      type: 'system',
      status: 'read',
      priority: 'low',
      createdAt: '2024-01-15T10:00:00',
      readAt: '2024-01-15T11:00:00',
      recipient: {
        type: 'admin',
        id: 0,
        name: 'Admin',
      },
      actions: ['view_restaurant'],
      metadata: {
        restaurantId: 5,
        name: 'Taco Bell',
      },
    },
    {
      id: 5,
      title: '5-Star Review Received',
      message: 'Alice Brown gave a 5-star review to Pasta Paradise',
      type: 'review',
      status: 'unread',
      priority: 'medium',
      createdAt: '2024-01-14T19:45:00',
      readAt: null,
      recipient: {
        type: 'restaurant',
        id: 4,
        name: 'Pasta Paradise',
      },
      actions: ['view_review'],
      metadata: {
        reviewId: 4,
        rating: 5,
      },
    },
    {
      id: 6,
      title: 'Order Cancelled #ORD-12350',
      message: 'Diana Prince cancelled order #ORD-12350 from Burger House',
      type: 'order',
      status: 'read',
      priority: 'high',
      createdAt: '2024-01-14T18:20:00',
      readAt: '2024-01-14T18:25:00',
      recipient: {
        type: 'restaurant',
        id: 2,
        name: 'Burger House',
      },
      actions: ['view_order'],
      metadata: {
        orderId: 'ORD-12350',
        reason: 'Customer cancelled',
      },
    },
    {
      id: 7,
      title: 'New User Registered',
      message: 'Eva Martinez has created a new customer account',
      type: 'system',
      status: 'read',
      priority: 'low',
      createdAt: '2024-01-14T16:00:00',
      readAt: '2024-01-14T16:30:00',
      recipient: {
        type: 'admin',
        id: 0,
        name: 'Admin',
      },
      actions: ['view_user'],
      metadata: {
        userId: 7,
        name: 'Eva Martinez',
      },
    },
    {
      id: 8,
      title: 'Promotion: Weekend Special',
      message: 'Weekend special offer: 20% off on all orders above $50',
      type: 'promotion',
      status: 'unread',
      priority: 'medium',
      createdAt: '2024-01-14T09:00:00',
      readAt: null,
      recipient: {
        type: 'all_customers',
        id: null,
        name: 'All Customers',
      },
      actions: ['view_promotion'],
      metadata: {
        discount: 20,
        minOrder: 50,
      },
    },
    {
      id: 9,
      title: 'Delivery Completed',
      message: 'Delivery for order #ORD-12348 has been completed by John Doe',
      type: 'delivery',
      status: 'read',
      priority: 'medium',
      createdAt: '2024-01-13T21:00:00',
      readAt: '2024-01-13T21:15:00',
      recipient: {
        type: 'customer',
        id: 4,
        name: 'Alice Brown',
      },
      actions: ['rate_delivery'],
      metadata: {
        orderId: 'ORD-12348',
        partner: 'John Doe',
        deliveryTime: '8:15 PM',
      },
    },
    {
      id: 10,
      title: 'New Offer: Free Delivery',
      message: 'Free delivery on all orders over $30 for the next 3 days!',
      type: 'promotion',
      status: 'unread',
      priority: 'high',
      createdAt: '2024-01-13T08:00:00',
      readAt: null,
      recipient: {
        type: 'all_users',
        id: null,
        name: 'All Users',
      },
      actions: ['view_offer'],
      metadata: {
        offer: 'Free Delivery',
        minOrder: 30,
        duration: '3 days',
      },
    },
  ];

  const types = [
    { id: 'all', label: 'All', icon: FiBell, count: notifications.length },
    { id: 'order', label: 'Orders', icon: FiPackage, count: notifications.filter(n => n.type === 'order').length },
    { id: 'payment', label: 'Payments', icon: FiDollarSign, count: notifications.filter(n => n.type === 'payment').length },
    { id: 'delivery', label: 'Delivery', icon: FiTruck, count: notifications.filter(n => n.type === 'delivery').length },
    { id: 'review', label: 'Reviews', icon: FiStar, count: notifications.filter(n => n.type === 'review').length },
    { id: 'system', label: 'System', icon: FiSettings, count: notifications.filter(n => n.type === 'system').length },
    { id: 'promotion', label: 'Promotions', icon: FiTag, count: notifications.filter(n => n.type === 'promotion').length },
  ];

  const statuses = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'read', label: 'Read' },
  ];

  const priorityColors = {
    high: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    low: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  };

  const typeIcons = {
    order: <FiPackage className="w-5 h-5" />,
    payment: <FiDollarSign className="w-5 h-5" />,
    delivery: <FiTruck className="w-5 h-5" />,
    review: <FiStar className="w-5 h-5" />,
    system: <FiSettings className="w-5 h-5" />,
    promotion: <FiTag className="w-5 h-5" />,
  };

  const typeColors = {
    order: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    payment: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    delivery: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    review: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    system: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    promotion: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
  };

  const getTypeLabel = (type) => {
    const labels = {
      order: 'Order',
      payment: 'Payment',
      delivery: 'Delivery',
      review: 'Review',
      system: 'System',
      promotion: 'Promotion',
    };
    return labels[type] || type;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    };
    return labels[priority] || priority;
  };

  const formatTime = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || notification.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredNotifications.length / 5);
  const paginatedNotifications = filteredNotifications.slice((currentPage - 1) * 5, currentPage * 5);

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Notifications refreshed!');
    }, 1000);
  };

  const handleMarkAsRead = (id) => {
    toast.success('Notification marked as read');
  };

  const handleMarkAllAsRead = () => {
    toast.success('All notifications marked as read');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      toast.success('Notification deleted successfully');
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all notifications?')) {
      toast.success('All notifications deleted successfully');
    }
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    toast.success('Notification sent successfully!');
    setShowSendModal(false);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedNotifications(paginatedNotifications.map(n => n.id));
    } else {
      setSelectedNotifications([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedNotifications(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
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
                {/* ✅ FIX: Use FiBell instead of FiBellOn */}
                <FiBell className="text-orange-500" />
                Notifications
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {unreadCount} unread notifications • {notifications.length} total
              </p>
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
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <FiCheck className="w-4 h-4" />
                Mark All Read
              </button>
              <button
                onClick={() => setShowSendModal(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center gap-2"
              >
                <FiSend className="w-4 h-4" />
                Send Notification
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Total Notifications</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{notifications.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Unread</p>
              <p className="text-2xl font-bold text-orange-500">{unreadCount}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">High Priority</p>
              <p className="text-2xl font-bold text-red-500">
                {notifications.filter(n => n.priority === 'high').length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-2xl font-bold text-blue-500">
                {notifications.filter(n => new Date(n.createdAt).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            {types.map((type) => {
              const Icon = type.icon;
              const isActive = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                  <span className="font-semibold">{type.count}</span>
                  <span className="text-sm">{type.label}</span>
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-gray-600 dark:text-gray-300"
              >
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>{status.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg mb-4 flex items-center justify-between"
            >
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {selectedNotifications.length} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    selectedNotifications.forEach(id => handleMarkAsRead(id));
                    setSelectedNotifications([]);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
                >
                  Mark Read
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Delete selected notifications?')) {
                      toast.success('Selected notifications deleted');
                      setSelectedNotifications([]);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedNotifications([])}
                  className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Notifications List */}
          <div className="space-y-3">
            {paginatedNotifications.map((notification, index) => {
              const Icon = typeIcons[notification.type] || FiBell;
              const typeColor = typeColors[notification.type] || 'bg-gray-100 text-gray-600';
              const priorityColor = priorityColors[notification.priority] || 'bg-gray-100 text-gray-600';
              const isSelected = selectedNotifications.includes(notification.id);

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all ${
                    notification.status === 'unread' ? 'border-l-4 border-orange-500' : ''
                  } ${isSelected ? 'ring-2 ring-orange-500' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <div className="pt-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelect(notification.id)}
                        className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                    </div>

                    {/* Icon */}
                    <div className={`p-2 rounded-xl ${typeColor}`}>
                      {Icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {notification.title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${priorityColor}`}>
                          {getPriorityLabel(notification.priority)}
                        </span>
                        {notification.status === 'unread' && (
                          <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          {formatTime(notification.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiUser className="w-3 h-3" />
                          To: {notification.recipient.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiTag className="w-3 h-3" />
                          {getTypeLabel(notification.type)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      {notification.status === 'unread' && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          title="Mark as read"
                        >
                          <FiCheck className="w-4 h-4 text-blue-500" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4 text-red-500" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="More">
                        <FiMoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <p>Showing {paginatedNotifications.length} of {filteredNotifications.length} notifications</p>
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
          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Notifications Found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Send Notification Modal */}
      <AnimatePresence>
        {showSendModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSendModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <FiSend className="text-orange-500" />
                  Send Notification
                </h2>
                <button
                  onClick={() => setShowSendModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiX className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSendNotification} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Recipient <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 rounded-2xl food-input">
                    <option value="all">All Users</option>
                    <option value="customers">All Customers</option>
                    <option value="restaurants">All Restaurants</option>
                    <option value="delivery">All Delivery Partners</option>
                    <option value="admin">Admins Only</option>
                    <option value="specific">Specific User</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Notification Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 rounded-2xl food-input">
                    <option value="general">General</option>
                    <option value="order">Order Update</option>
                    <option value="promotion">Promotion</option>
                    <option value="delivery">Delivery Update</option>
                    <option value="payment">Payment Update</option>
                    <option value="system">System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 rounded-2xl food-input">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Notification title"
                    className="w-full px-4 py-3 rounded-2xl food-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Type your notification message here..."
                    className="w-full px-4 py-3 rounded-2xl food-input resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Actions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      View Order
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Track Order
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Rate Delivery
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      View Promotion
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowSendModal(false)}
                    className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
                  >
                    <FiSend className="w-5 h-5" />
                    Send
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

export default Notifications;