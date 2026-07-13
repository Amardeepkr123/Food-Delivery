// src/pages/deliveryPartner/AcceptedOrders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPackage,
  FiMapPin,
  FiClock,
  FiUser,
  FiPhone,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiTruck,
  FiStar,
  FiRefreshCw,
  FiSearch,
  FiFilter,
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-toastify';

const AcceptedOrders = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  useEffect(() => {
    fetchAcceptedOrders();
  }, []);

  const fetchAcceptedOrders = () => {
    setLoading(true);
    // Mock data - replace with actual API call
    setTimeout(() => {
      const mockOrders = [
        {
          id: 'ORD-12345',
          restaurant: 'Pizza Palace',
          customer: 'John Doe',
          customerPhone: '+1 234 567 890',
          deliveryAddress: '123 Main St, Apt 4B, New York',
          items: ['Margherita Pizza x2', 'Garlic Bread x1'],
          total: 42.97,
          pickupTime: '2:30 PM',
          deliveryTime: '3:15 PM',
          status: 'picked_up',
          distance: '2.5 km',
          earnings: 5.50,
          restaurantAddress: '456 Food St, Downtown',
          customerNote: 'Please ring the doorbell',
          acceptedAt: '2024-01-15T14:00:00',
          estimatedDelivery: '2024-01-15T15:00:00',
        },
        {
          id: 'ORD-12346',
          restaurant: 'Burger House',
          customer: 'Jane Smith',
          customerPhone: '+1 234 567 891',
          deliveryAddress: '456 Oak Ave, Los Angeles',
          items: ['Classic Burger x2', 'Fries x1', 'Milkshake x1'],
          total: 28.99,
          pickupTime: '3:45 PM',
          deliveryTime: '4:30 PM',
          status: 'delivering',
          distance: '3.2 km',
          earnings: 4.50,
          restaurantAddress: '789 Burger Ln, Midtown',
          customerNote: '',
          acceptedAt: '2024-01-15T14:30:00',
          estimatedDelivery: '2024-01-15T16:00:00',
        },
        {
          id: 'ORD-12347',
          restaurant: 'Sushi Master',
          customer: 'Bob Johnson',
          customerPhone: '+1 234 567 892',
          deliveryAddress: '789 Pine St, San Francisco',
          items: ['California Roll x2', 'Miso Soup x1', 'Sashimi x1'],
          total: 35.50,
          pickupTime: '6:00 PM',
          deliveryTime: '6:45 PM',
          status: 'picked_up',
          distance: '1.8 km',
          earnings: 4.00,
          restaurantAddress: '321 Sushi Ave, Uptown',
          customerNote: 'Leave at front desk',
          acceptedAt: '2024-01-15T15:00:00',
          estimatedDelivery: '2024-01-15T19:00:00',
        },
        {
          id: 'ORD-12348',
          restaurant: 'Pasta Paradise',
          customer: 'Alice Brown',
          customerPhone: '+1 234 567 893',
          deliveryAddress: '321 Elm Blvd, Chicago',
          items: ['Pasta Alfredo x2', 'Caesar Salad x1', 'Garlic Bread x1'],
          total: 52.00,
          pickupTime: '7:30 PM',
          deliveryTime: '8:15 PM',
          status: 'delivered',
          distance: '4.0 km',
          earnings: 6.50,
          restaurantAddress: '555 Pasta Rd, Eastside',
          customerNote: '',
          acceptedAt: '2024-01-15T16:00:00',
          estimatedDelivery: '2024-01-15T20:00:00',
        },
      ];
      setAcceptedOrders(mockOrders);
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const badges = {
      picked_up: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      delivering: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
      delivered: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    };
    return badges[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusLabel = (status) => {
    const labels = {
      picked_up: 'Picked Up',
      delivering: 'Delivering',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      picked_up: <FiCheckCircle className="w-4 h-4" />,
      delivering: <FiTruck className="w-4 h-4" />,
      delivered: <FiCheckCircle className="w-4 h-4" />,
      cancelled: <FiXCircle className="w-4 h-4" />,
    };
    return icons[status] || null;
  };

  const statuses = [
    { id: 'all', label: 'All' },
    { id: 'picked_up', label: 'Picked Up' },
    { id: 'delivering', label: 'Delivering' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filteredOrders = acceptedOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Accepted', value: acceptedOrders.length, color: 'blue' },
    { label: 'In Progress', value: acceptedOrders.filter(o => o.status === 'picked_up' || o.status === 'delivering').length, color: 'orange' },
    { label: 'Delivered', value: acceptedOrders.filter(o => o.status === 'delivered').length, color: 'green' },
    { label: 'Total Earnings', value: `$${acceptedOrders.reduce((sum, o) => sum + o.earnings, 0).toFixed(2)}`, color: 'green' },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading accepted orders...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <FiPackage className="text-orange-500" />
                Accepted Orders
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {acceptedOrders.length} orders accepted
              </p>
            </div>
            <button
              onClick={fetchAcceptedOrders}
              className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FiRefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg`}
              >
                <p className={`text-2xl font-bold text-${stat.color}-500`}>{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
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
                placeholder="Search by order ID, customer, or restaurant..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {statuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setFilterStatus(status.id)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                    filterStatus === status.id
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'You haven\'t accepted any orders yet'}
              </p>
              <Link to="/delivery/available">
                <button className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                  Find Available Orders
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {order.restaurant}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusBadge(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Order #{order.id}
                      </p>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <FiUser className="w-4 h-4" />
                          {order.customer}
                          <span className="text-gray-400">•</span>
                          <FiPhone className="w-4 h-4" />
                          {order.customerPhone}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <FiMapPin className="w-4 h-4" />
                          {order.deliveryAddress}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <FiClock className="w-4 h-4" />
                          Pickup: {order.pickupTime} • Delivery: {order.deliveryTime}
                        </div>
                        {order.customerNote && (
                          <div className="text-sm text-yellow-600 dark:text-yellow-400">
                            📝 {order.customerNote}
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Items:
                        </p>
                        <ul className="text-sm text-gray-500 dark:text-gray-400">
                          {order.items.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-500">
                          ${order.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Earnings: ${order.earnings.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FiMapPin className="w-4 h-4" />
                        {order.distance}
                      </div>
                      <Link to={`/delivery/${order.id}`}>
                        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2">
                          {order.status === 'delivered' ? 'View Details' : 'Track Delivery'}
                          <FiArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

// ✅ THIS IS THE FIX - DEFAULT EXPORT MUST BE PRESENT
export default AcceptedOrders;