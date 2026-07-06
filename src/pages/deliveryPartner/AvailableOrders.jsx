import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter, 
  FiClock, 
  FiMapPin, 
  FiTruck, 
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiStar,
  FiPackage,
  FiUser,
  FiNavigation,
  FiTrendingUp,
  FiTrendingDown,
  FiRefreshCw,
  FiEye,
  FiMessageSquare,
  FiPhone,
  FiMail,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiAward,
  FiGift,
  FiZap,
  FiCoffee,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

// Reusable Components
const StatusBadge = ({ status }) => {
  const statusConfig = {
    available: { color: 'bg-green-500', text: 'Available' },
    assigned: { color: 'bg-blue-500', text: 'Assigned' },
    accepted: { color: 'bg-orange-500', text: 'Accepted' },
    picked: { color: 'bg-purple-500', text: 'Picked Up' },
    delivered: { color: 'bg-gray-500', text: 'Delivered' }
  };
  const config = statusConfig[status] || statusConfig.available;
  return (
    <span className={`px-3 py-1 rounded-full ${config.color} text-white text-xs font-semibold flex items-center gap-1`}>
      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
      {config.text}
    </span>
  );
};

const OrderCard = ({ order, onAccept, onReject, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Order Header */}
      <div className="p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex-shrink-0">
              {order.restaurantImage ? (
                <img src={order.restaurantImage} alt={order.restaurant} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">🏪</div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{order.restaurant}</h3>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <FiUser className="w-3 h-3" />
                {order.customer}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={order.status} />
                <span className="text-xs text-gray-500">{order.orderId}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm font-bold text-orange-500">${order.deliveryFee}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              order.paymentMethod === 'COD' 
                ? 'bg-yellow-500/20 text-yellow-400' 
                : 'bg-green-500/20 text-green-400'
            }`}>
              {order.paymentMethod}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
            >
              {isExpanded ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <FiMapPin className="w-4 h-4 text-orange-500" />
            <span className="truncate">{order.pickupAddress}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FiNavigation className="w-4 h-4 text-orange-500" />
            <span className="truncate">{order.deliveryAddress}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FiTruck className="w-4 h-4 text-orange-500" />
            <span>{order.distance}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FiClock className="w-4 h-4 text-orange-500" />
            <span>{order.estimatedTime}</span>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FiPackage className="w-4 h-4 text-orange-500" />
            <span className="font-medium text-white">{order.items.length} items</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {order.items.slice(0, 3).map((item, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-700/50 text-xs text-gray-300">
                {item.quantity}x {item.name}
              </span>
            ))}
            {order.items.length > 3 && (
              <span className="px-2 py-0.5 rounded-full bg-gray-700/50 text-xs text-gray-400">
                +{order.items.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 mb-2">Customer Details</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p className="flex items-center gap-2">
                      <FiUser className="w-4 h-4 text-gray-500" />
                      {order.customer}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiPhone className="w-4 h-4 text-gray-500" />
                      {order.customerPhone}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMail className="w-4 h-4 text-gray-500" />
                      {order.customerEmail}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 mb-2">Order Summary</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${order.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${order.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${order.tax}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white pt-1 border-t border-gray-700">
                      <span>Total</span>
                      <span className="text-orange-500">${order.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-700">
          <button
            onClick={() => onViewDetails(order)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors text-sm font-medium"
          >
            <FiEye className="w-4 h-4" /> View Details
          </button>
          <button
            onClick={() => onAccept(order)}
            className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors text-sm font-medium"
          >
            <FiCheckCircle className="w-4 h-4" /> Accept
          </button>
          <button
            onClick={() => onReject(order)}
            className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-medium"
          >
            <FiXCircle className="w-4 h-4" /> Reject
          </button>
          <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
            <span>{order.distance}</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>{order.estimatedTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AvailableOrders = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [distanceFilter, setDistanceFilter] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Mock Data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockOrders = [
          {
            orderId: '#ORD-2024-001',
            restaurant: 'Pizza Palace',
            restaurantImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200',
            customer: 'Amit Sharma',
            customerPhone: '+91 9876543210',
            customerEmail: 'amit@example.com',
            pickupAddress: '123 Foodie Street, Andheri East',
            deliveryAddress: '456 Park Avenue, BKC',
            distance: '2.3 km',
            estimatedTime: '25-35 min',
            deliveryFee: 3.99,
            paymentMethod: 'Online',
            status: 'available',
            items: [
              { name: 'Margherita Pizza', quantity: 2 },
              { name: 'Garlic Bread', quantity: 1 },
              { name: 'Coke', quantity: 2 }
            ],
            subtotal: 36.97,
            tax: 2.96,
            total: 43.92
          },
          {
            orderId: '#ORD-2024-002',
            restaurant: 'Burger House',
            restaurantImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
            customer: 'Priya Patel',
            customerPhone: '+91 9876543211',
            customerEmail: 'priya@example.com',
            pickupAddress: '789 Lake View, Bandra West',
            deliveryAddress: '321 Green Valley, Juhu',
            distance: '1.8 km',
            estimatedTime: '20-30 min',
            deliveryFee: 2.99,
            paymentMethod: 'COD',
            status: 'available',
            items: [
              { name: 'Whopper Meal', quantity: 1 },
              { name: 'Fries', quantity: 1 },
              { name: 'Milkshake', quantity: 1 }
            ],
            subtotal: 18.99,
            tax: 1.52,
            total: 23.50
          },
          {
            orderId: '#ORD-2024-003',
            restaurant: 'Sushi Master',
            restaurantImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200',
            customer: 'Rahul Singh',
            customerPhone: '+91 9876543212',
            customerEmail: 'rahul@example.com',
            pickupAddress: '654 Hill Road, Lower Parel',
            deliveryAddress: '987 Garden Colony, Worli',
            distance: '3.5 km',
            estimatedTime: '35-45 min',
            deliveryFee: 4.99,
            paymentMethod: 'Online',
            status: 'available',
            items: [
              { name: 'California Roll', quantity: 3 },
              { name: 'Miso Soup', quantity: 2 },
              { name: 'Edamame', quantity: 1 }
            ],
            subtotal: 45.00,
            tax: 3.60,
            total: 53.59
          },
          {
            orderId: '#ORD-2024-004',
            restaurant: 'Thai Garden',
            restaurantImage: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=200',
            customer: 'Sneha Reddy',
            customerPhone: '+91 9876543213',
            customerEmail: 'sneha@example.com',
            pickupAddress: '321 Green Valley, Andheri West',
            deliveryAddress: '456 Park Avenue, BKC',
            distance: '2.8 km',
            estimatedTime: '30-40 min',
            deliveryFee: 3.49,
            paymentMethod: 'Online',
            status: 'available',
            items: [
              { name: 'Green Curry', quantity: 1 },
              { name: 'Rice', quantity: 2 },
              { name: 'Spring Rolls', quantity: 1 }
            ],
            subtotal: 28.50,
            tax: 2.28,
            total: 34.27
          },
          {
            orderId: '#ORD-2024-005',
            restaurant: 'Taco Fiesta',
            restaurantImage: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=200',
            customer: 'Vikram Singh',
            customerPhone: '+91 9876543214',
            customerEmail: 'vikram@example.com',
            pickupAddress: '987 Garden Colony, Juhu',
            deliveryAddress: '123 Foodie Street, Andheri East',
            distance: '1.5 km',
            estimatedTime: '15-25 min',
            deliveryFee: 2.49,
            paymentMethod: 'COD',
            status: 'available',
            items: [
              { name: 'Spicy Tacos', quantity: 3 },
              { name: 'Guacamole', quantity: 1 },
              { name: 'Nachos', quantity: 1 }
            ],
            subtotal: 26.97,
            tax: 2.16,
            total: 31.62
          },
          {
            orderId: '#ORD-2024-006',
            restaurant: 'Pasta Paradise',
            restaurantImage: 'https://images.unsplash.com/photo-1645112411342-4665a10a3a1d?w=200',
            customer: 'Neha Gupta',
            customerPhone: '+91 9876543215',
            customerEmail: 'neha@example.com',
            pickupAddress: '456 Park Avenue, BKC',
            deliveryAddress: '789 Lake View, Bandra West',
            distance: '2.1 km',
            estimatedTime: '20-30 min',
            deliveryFee: 2.99,
            paymentMethod: 'Online',
            status: 'available',
            items: [
              { name: 'Pasta Alfredo', quantity: 2 },
              { name: 'Garlic Bread', quantity: 2 },
              { name: 'Caesar Salad', quantity: 1 }
            ],
            subtotal: 37.96,
            tax: 3.04,
            total: 43.99
          }
        ];

        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle filters and search
  useEffect(() => {
    let filtered = [...orders];

    if (searchQuery) {
      filtered = filtered.filter(o =>
        o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerPhone.includes(searchQuery)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(o => o.status === statusFilter);
    }

    if (paymentFilter !== 'all') {
      filtered = filtered.filter(o => o.paymentMethod === paymentFilter);
    }

    // Distance filter
    filtered = filtered.filter(o => {
      const dist = parseFloat(o.distance.split(' ')[0]);
      return dist <= distanceFilter;
    });

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.orderId.localeCompare(a.orderId));
        break;
      case 'distance':
        filtered.sort((a, b) => parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0]));
        break;
      case 'fee':
        filtered.sort((a, b) => a.deliveryFee - b.deliveryFee);
        break;
      case 'total':
        filtered.sort((a, b) => b.total - a.total);
        break;
      default:
        break;
    }

    setFilteredOrders(filtered);
  }, [searchQuery, statusFilter, paymentFilter, sortBy, distanceFilter, orders]);

  const handleAcceptOrder = (order) => {
    toast.success(`Order ${order.orderId} accepted successfully! 🎉`);
    setOrders(orders.map(o => 
      o.orderId === order.orderId ? { ...o, status: 'accepted' } : o
    ));
  };

  const handleRejectOrder = (order) => {
    toast.warning(`Order ${order.orderId} rejected`);
    setOrders(orders.filter(o => o.orderId !== order.orderId));
  };

  const handleViewDetails = (order) => {
    toast.info(`Viewing details for ${order.orderId}`);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 animate-pulse border border-white/20 dark:border-gray-700/30">
                <div className="h-20 bg-gray-700 rounded w-full mb-4" />
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
                <div className="h-10 bg-gray-700 rounded w-full" />
              </div>
            ))}
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
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <FiPackage className="text-orange-500" />
              Available Orders
            </h1>
            <p className="text-gray-400 mt-1">
              {filteredOrders.length} orders available for delivery
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2.5 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:shadow-2xl transition-all duration-300 text-gray-300 hover:text-white"
            >
              <FiRefreshCw className="w-5 h-5" />
            </motion.button>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-white/10 dark:bg-gray-800/50 text-gray-400 hover:text-white'
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-white/10 dark:bg-gray-800/50 text-gray-400 hover:text-white'
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-gray-700/30 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search by order ID, restaurant, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  showFilters ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FiFilter className="w-5 h-5" />
              </button>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-orange-500 outline-none transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
                <option value="accepted">Accepted</option>
              </select>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-orange-500 outline-none transition-all duration-300"
              >
                <option value="all">All Payments</option>
                <option value="Online">Online</option>
                <option value="COD">COD</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-orange-500 outline-none transition-all duration-300"
              >
                <option value="newest">Newest</option>
                <option value="distance">Distance</option>
                <option value="fee">Delivery Fee</option>
                <option value="total">Total Amount</option>
              </select>
            </div>
          </div>

          {/* Extended Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Max Distance (km)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={distanceFilter}
                        onChange={(e) => setDistanceFilter(Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-orange-500"
                      />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{distanceFilter} km</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Min Rating</label>
                    <select className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-orange-500 outline-none transition-all duration-300">
                      <option value="0">All Ratings</option>
                      <option value="4.5">4.5+</option>
                      <option value="4.0">4.0+</option>
                      <option value="3.5">3.5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Order Type</label>
                    <select className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-orange-500 outline-none transition-all duration-300">
                      <option value="all">All Types</option>
                      <option value="delivery">Delivery</option>
                      <option value="pickup">Pickup</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Orders Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`grid ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}`}
        >
          {filteredOrders.length === 0 ? (
            <div className="col-span-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-12 text-center border border-white/20 dark:border-gray-700/30">
              <FiPackage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Orders Available</h3>
              <p className="text-gray-400">Check back later for new delivery requests</p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-6 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                Refresh
              </button>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                onAccept={handleAcceptOrder}
                onReject={handleRejectOrder}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default AvailableOrders;