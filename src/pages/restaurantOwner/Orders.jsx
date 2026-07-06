import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch,
  FiFilter,
  FiClock,
  FiTruck,
  FiPackage,
  FiCheckCircle,
  FiXCircle,
  FiClock as FiClockIcon,
  FiEye,
  FiEdit2,
  FiDownload,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
  FiArrowUp,
  FiArrowDown,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPrinter,
  FiShare2,
  FiMoreVertical,
  FiPlus,
  FiMinus
} from 'react-icons/fi';
import { 
  FaUtensils, 
  FaPizzaSlice, 
  FaHamburger, 
  FaIceCream, 
  FaCoffee,
  FaLeaf,
  FaPepperHot,
  FaFish,
  FaBirthdayCake
} from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';

const Orders = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockOrders = [
          {
            id: '#ORD-2024-001',
            customer: {
              name: 'Amit Sharma',
              email: 'amit@example.com',
              phone: '+91 9876543210',
              address: '123 Foodie Street, Mumbai'
            },
            items: [
              { name: 'Margherita Pizza', quantity: 2, price: 16.99 },
              { name: 'Garlic Bread', quantity: 1, price: 4.99 },
              { name: 'Coke', quantity: 2, price: 2.99 }
            ],
            total: 36.97,
            status: 'delivered',
            paymentMethod: 'Online',
            orderType: 'Delivery',
            date: '2024-01-15',
            time: '7:30 PM',
            deliveryTime: '25 min',
            specialInstructions: 'Call before delivery',
            rating: 5,
            review: 'Amazing food! Best pizza in town.'
          },
          {
            id: '#ORD-2024-002',
            customer: {
              name: 'Priya Patel',
              email: 'priya@example.com',
              phone: '+91 9876543211',
              address: '456 Park Avenue, Mumbai'
            },
            items: [
              { name: 'Whopper Meal', quantity: 1, price: 12.99 },
              { name: 'Fries', quantity: 1, price: 4.99 },
              { name: 'Milkshake', quantity: 1, price: 3.99 }
            ],
            total: 18.99,
            status: 'in_transit',
            paymentMethod: 'Cash on Delivery',
            orderType: 'Delivery',
            date: '2024-01-15',
            time: '1:15 PM',
            deliveryTime: '15 min',
            specialInstructions: 'Leave at door',
            rating: null,
            review: null
          },
          {
            id: '#ORD-2024-003',
            customer: {
              name: 'Rahul Singh',
              email: 'rahul@example.com',
              phone: '+91 9876543212',
              address: '789 Lake View, Mumbai'
            },
            items: [
              { name: 'California Roll', quantity: 3, price: 14.99 },
              { name: 'Miso Soup', quantity: 2, price: 5.99 }
            ],
            total: 45.00,
            status: 'preparing',
            paymentMethod: 'Online',
            orderType: 'Dine-in',
            date: '2024-01-15',
            time: '11:00 AM',
            deliveryTime: '30 min',
            specialInstructions: 'Extra ginger',
            rating: null,
            review: null
          },
          {
            id: '#ORD-2024-004',
            customer: {
              name: 'Sneha Reddy',
              email: 'sneha@example.com',
              phone: '+91 9876543213',
              address: '321 Green Valley, Mumbai'
            },
            items: [
              { name: 'Green Curry', quantity: 1, price: 15.99 },
              { name: 'Rice', quantity: 2, price: 3.99 }
            ],
            total: 28.50,
            status: 'cancelled',
            paymentMethod: 'Online',
            orderType: 'Delivery',
            date: '2024-01-14',
            time: '8:45 PM',
            deliveryTime: 'N/A',
            specialInstructions: 'Spicy level: high',
            rating: null,
            review: null
          },
          {
            id: '#ORD-2024-005',
            customer: {
              name: 'Vikram Singh',
              email: 'vikram@example.com',
              phone: '+91 9876543214',
              address: '654 Hill Road, Mumbai'
            },
            items: [
              { name: 'Pepperoni Pizza', quantity: 2, price: 19.99 },
              { name: 'Coke', quantity: 3, price: 2.99 }
            ],
            total: 42.99,
            status: 'delivered',
            paymentMethod: 'Cash on Delivery',
            orderType: 'Delivery',
            date: '2024-01-14',
            time: '6:30 PM',
            deliveryTime: '30 min',
            specialInstructions: 'Extra pepperoni',
            rating: 4,
            review: 'Good food, fast delivery.'
          },
          {
            id: '#ORD-2024-006',
            customer: {
              name: 'Neha Gupta',
              email: 'neha@example.com',
              phone: '+91 9876543215',
              address: '987 Garden Colony, Mumbai'
            },
            items: [
              { name: 'Pasta Alfredo', quantity: 2, price: 18.99 },
              { name: 'Garlic Bread', quantity: 2, price: 4.99 }
            ],
            total: 37.96,
            status: 'pending',
            paymentMethod: 'Online',
            orderType: 'Takeaway',
            date: '2024-01-15',
            time: '9:30 AM',
            deliveryTime: '20 min',
            specialInstructions: 'Pasta well done',
            rating: null,
            review: null
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

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.phone.includes(searchQuery)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      filtered = filtered.filter(order => {
        const orderDate = new Date(order.date);
        if (dateFilter === 'today') return orderDate >= today;
        if (dateFilter === 'week') return orderDate >= weekAgo;
        if (dateFilter === 'month') return orderDate >= monthAgo;
        return true;
      });
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest':
        filtered.sort((a, b) => b.total - a.total);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.total - b.total);
        break;
      default:
        break;
    }

    setFilteredOrders(filtered);
  }, [searchQuery, statusFilter, dateFilter, sortBy, orders]);

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      in_transit: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      preparing: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      pending: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: FiCheckCircle,
      in_transit: FiTruck,
      preparing: FiClockIcon,
      cancelled: FiXCircle,
      pending: FiClockIcon
    };
    return icons[status] || FiClockIcon;
  };

  const getStatusText = (status) => {
    const texts = {
      delivered: 'Delivered',
      in_transit: 'In Transit',
      preparing: 'Preparing',
      cancelled: 'Cancelled',
      pending: 'Pending'
    };
    return texts[status] || status;
  };

  const getStatusOptions = () => {
    return ['pending', 'preparing', 'in_transit', 'delivered', 'cancelled'];
  };

  const handleStatusUpdate = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setShowStatusUpdate(false);
    setNewStatus('');
    alert('Order status updated successfully!');
  };

  const handlePrintOrder = (order) => {
    alert(`Printing order ${order.id}`);
  };

  const handleShareOrder = (order) => {
    alert(`Sharing order ${order.id}`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    inTransit: orders.filter(o => o.status === 'in_transit').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
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
              Loading orders...
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
              <FiPackage className="text-orange-500" />
              Orders
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage and track all orders
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiRefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              <FiDownload className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Orders', value: stats.total, icon: FiPackage, color: 'from-blue-500 to-cyan-500' },
            { label: 'Pending', value: stats.pending, icon: FiClock, color: 'from-orange-500 to-yellow-500' },
            { label: 'In Transit', value: stats.inTransit, icon: FiTruck, color: 'from-purple-500 to-pink-500' },
            { label: 'Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: FiTrendingUp, color: 'from-green-500 to-emerald-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card rounded-2xl p-4 text-center hover:shadow-3xl transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-lg mx-auto mb-2`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID, customer name, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl food-input"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  showFilters ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' : 'glass-card hover:shadow-2xl'
                }`}
              >
                <FiFilter className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl food-input min-w-[130px]"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl food-input min-w-[130px]"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl food-input min-w-[130px]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Amount</option>
                  <option value="lowest">Lowest Amount</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredOrders.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Orders Found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setDateFilter('all');
                }}
                className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredOrders.map((order, index) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <motion.div
                  key={order.id}
                  variants={itemVariants}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300"
                >
                  <div className="p-5">
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{order.id}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {getStatusText(order.status)}
                        </span>
                        <span className="text-xs text-gray-400">{order.orderType}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-orange-500">${order.total}</span>
                        <span className="text-xs text-gray-400">{order.date} {order.time}</span>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Customer</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{order.customer.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Items</p>
                        <div className="flex flex-wrap gap-1">
                          {order.items.map((item, idx) => (
                            <span key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                              {item.quantity}x {item.name}
                              {idx < order.items.length - 1 && ', '}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Delivery</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{order.deliveryTime}</p>
                        <p className="text-xs text-gray-400">{order.paymentMethod}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderDetails(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 text-sm font-medium"
                      >
                        <FiEye className="w-4 h-4" /> View Details
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setNewStatus(order.status);
                          setShowStatusUpdate(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 text-sm font-medium"
                      >
                        <FiEdit2 className="w-4 h-4" /> Update Status
                      </button>
                      <button
                        onClick={() => handlePrintOrder(order)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 text-sm font-medium"
                      >
                        <FiPrinter className="w-4 h-4" /> Print
                      </button>
                      <button
                        onClick={() => handleShareOrder(order)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-300 text-sm font-medium"
                      >
                        <FiShare2 className="w-4 h-4" /> Share
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Order Details Modal */}
        <AnimatePresence>
          {showOrderDetails && selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowOrderDetails(false);
                setSelectedOrder(null);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Order Details
                  </h3>
                  <button
                    onClick={() => {
                      setShowOrderDetails(false);
                      setSelectedOrder(null);
                    }}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiXCircle className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Order Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Order ID</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{selectedOrder.id}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusText(selectedOrder.status)}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Date & Time</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{formatDate(selectedOrder.date)} at {selectedOrder.time}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Amount</p>
                      <p className="font-semibold text-orange-500">${selectedOrder.total}</p>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <FiUser className="text-orange-500" /> Customer Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p><span className="text-gray-500">Name:</span> {selectedOrder.customer.name}</p>
                      <p><span className="text-gray-500">Phone:</span> {selectedOrder.customer.phone}</p>
                      <p className="md:col-span-2"><span className="text-gray-500">Email:</span> {selectedOrder.customer.email}</p>
                      <p className="md:col-span-2"><span className="text-gray-500">Address:</span> {selectedOrder.customer.address}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <FaUtensils className="text-orange-500" /> Order Items
                    </h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold text-gray-800 dark:text-white pt-2">
                        <span>Total</span>
                        <span className="text-orange-500">${selectedOrder.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {selectedOrder.specialInstructions && (
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
                        <FiMessageSquare className="text-orange-500" /> Special Instructions
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedOrder.specialInstructions}</p>
                    </div>
                  )}

                  {selectedOrder.review && (
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
                        <FiStar className="text-yellow-400" /> Customer Review
                      </h4>
                      <div className="flex items-center gap-2 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className={`${i < selectedOrder.rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedOrder.review}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Update Status Modal */}
        <AnimatePresence>
          {showStatusUpdate && selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowStatusUpdate(false);
                setSelectedOrder(null);
                setNewStatus('');
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card rounded-3xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Update Order Status
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Order: <span className="font-semibold">{selectedOrder.id}</span>
                </p>
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    New Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl food-input"
                  >
                    {getStatusOptions().map((status) => (
                      <option key={status} value={status}>
                        {getStatusText(status)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowStatusUpdate(false);
                      setSelectedOrder(null);
                      setNewStatus('');
                    }}
                    className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedOrder.id)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    Update Status
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default Orders;