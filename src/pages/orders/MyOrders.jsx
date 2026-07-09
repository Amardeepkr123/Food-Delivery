// src/pages/orders/MyOrders.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiPackage,
  FiSearch,
  FiFilter,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiTruck,
  FiStar,
  FiDollarSign,
  FiCalendar,
  FiMoreVertical,
  FiChevronDown,
  FiChevronUp,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiShoppingBag,
  FiArrowRight,
} from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

const MyOrders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockOrders = [
        {
          id: 'ORD-2024-001',
          restaurant: 'Pizza Palace',
          image: '🍕',
          items: [
            { name: 'Margherita Pizza', quantity: 2, price: 16.99 },
            { name: 'Garlic Bread', quantity: 1, price: 4.99 },
          ],
          total: 46.94,
          status: 'delivered',
          date: '2024-01-15',
          time: '7:30 PM',
          deliveryAddress: '123 Main St, New York, NY 10001',
          rating: 5,
          review: 'Amazing pizza! Best in town.',
          estimatedDelivery: '2024-01-15T11:45:00Z',
        },
        {
          id: 'ORD-2024-002',
          restaurant: 'Burger House',
          image: '🍔',
          items: [
            { name: 'Whopper Meal', quantity: 1, price: 12.99 },
            { name: 'Fries', quantity: 1, price: 3.99 },
          ],
          total: 18.99,
          status: 'in_transit',
          date: '2024-01-14',
          time: '1:15 PM',
          deliveryAddress: '456 Oak Ave, Los Angeles, CA 90001',
          rating: null,
          review: null,
          estimatedDelivery: '2024-01-14T02:00:00Z',
        },
        {
          id: 'ORD-2024-003',
          restaurant: 'Sushi Master',
          image: '🍣',
          items: [
            { name: 'California Roll', quantity: 3, price: 14.99 },
            { name: 'Miso Soup', quantity: 2, price: 4.99 },
          ],
          total: 45.00,
          status: 'preparing',
          date: '2024-01-14',
          time: '11:00 AM',
          deliveryAddress: '789 Pine St, San Francisco, CA 94101',
          rating: null,
          review: null,
          estimatedDelivery: '2024-01-14T12:30:00Z',
        },
        {
          id: 'ORD-2024-004',
          restaurant: 'Thai Garden',
          image: '🥘',
          items: [
            { name: 'Green Curry', quantity: 1, price: 15.99 },
            { name: 'Rice', quantity: 2, price: 4.99 },
          ],
          total: 28.50,
          status: 'cancelled',
          date: '2024-01-13',
          time: '8:45 PM',
          deliveryAddress: '321 Elm St, Chicago, IL 60601',
          rating: null,
          review: null,
          estimatedDelivery: null,
        },
        {
          id: 'ORD-2024-005',
          restaurant: 'Taco Bell',
          image: '🌮',
          items: [
            { name: 'Spicy Tacos', quantity: 3, price: 11.99 },
            { name: 'Nachos', quantity: 1, price: 6.99 },
          ],
          total: 39.88,
          status: 'delivered',
          date: '2024-01-12',
          time: '6:30 PM',
          deliveryAddress: '654 Maple Dr, Miami, FL 33101',
          rating: 4,
          review: 'Good food, fast delivery.',
          estimatedDelivery: '2024-01-12T07:15:00Z',
        },
      ];

      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      in_transit: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      preparing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status] || colors.preparing;
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: FiCheckCircle,
      in_transit: FiTruck,
      preparing: FiClock,
      cancelled: FiXCircle,
    };
    return icons[status] || FiClock;
  };

  const getStatusText = (status) => {
    const texts = {
      delivered: 'Delivered',
      in_transit: 'In Transit',
      preparing: 'Preparing',
      cancelled: 'Cancelled',
    };
    return texts[status] || status;
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    let filtered = orders;
    if (filter !== 'all') {
      filtered = orders.filter(order => order.status === filter);
    }
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredOrders(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    let filtered = orders;
    if (activeFilter !== 'all') {
      filtered = filtered.filter(order => order.status === activeFilter);
    }
    if (term) {
      filtered = filtered.filter(order =>
        order.restaurant.toLowerCase().includes(term.toLowerCase()) ||
        order.id.toLowerCase().includes(term.toLowerCase())
      );
    }
    setFilteredOrders(filtered);
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/tracking/${orderId}`);
  };

  const handleReorder = (order) => {
    navigate('/checkout');
    toast.success('Order added to cart!');
  };

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleRateOrder = (orderId) => {
    navigate(`/orders/review/${orderId}`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium animate-pulse">
              Loading your orders...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const filterOptions = [
    { id: 'all', label: 'All Orders' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'in_transit', label: 'In Transit' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

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
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <FiPackage className="text-orange-500" />
              My Orders
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {filteredOrders.length} orders found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiRefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300">
              <FiDownload className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by restaurant or order ID..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm || activeFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'You haven\'t placed any orders yet'}
            </p>
            {searchTerm || activeFilter !== 'all' ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                  setFilteredOrders(orders);
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all"
              >
                Clear Filters
              </button>
            ) : (
              <Link to="/restaurants">
                <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all">
                  Browse Restaurants
                </button>
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => {
              const StatusIcon = getStatusIcon(order.status);
              const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-2xl p-6 hover:shadow-3xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    {/* Restaurant Image */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-3xl flex-shrink-0">
                      {order.image}
                    </div>

                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {order.restaurant}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {order.id} • {order.date} at {order.time}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {totalItems} items • ${order.total.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs px-3 py-1.5 rounded-full ${getStatusColor(order.status)} font-medium flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="text-xs text-gray-500 dark:text-gray-400">
                            {item.quantity}x {item.name}
                            {idx < order.items.length - 1 && ' • '}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <button
                          onClick={() => handleViewDetails(order.id)}
                          className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
                        >
                          <FiEye className="w-3 h-3" /> View Details
                        </button>

                        {order.status === 'in_transit' && (
                          <button
                            onClick={() => handleTrackOrder(order.id)}
                            className="px-3 py-1.5 rounded-xl bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors flex items-center gap-1"
                          >
                            <FiTruck className="w-3 h-3" /> Track
                          </button>
                        )}

                        {order.status === 'delivered' && (
                          <>
                            <button
                              onClick={() => handleReorder(order)}
                              className="px-3 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-medium hover:bg-orange-600 transition-colors flex items-center gap-1"
                            >
                              <FiShoppingBag className="w-3 h-3" /> Reorder
                            </button>
                            {!order.rating && (
                              <button
                                onClick={() => handleRateOrder(order.id)}
                                className="px-3 py-1.5 rounded-xl bg-purple-500 text-white text-xs font-medium hover:bg-purple-600 transition-colors flex items-center gap-1"
                              >
                                <FiStar className="w-3 h-3" /> Rate
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyOrders;