import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPackage,
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiDownload,
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiUser,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiClock as FiClockIcon,
  FiTruck,
  FiAward,
  FiGift,
  FiZap
} from 'react-icons/fi';
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
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockOrders = [
          {
            id: '#ORD-2024-001',
            customer: 'Amit Sharma',
            restaurant: 'Pizza Palace',
            items: '2x Margherita Pizza, 1x Garlic Bread',
            total: 36.97,
            status: 'delivered',
            date: '2024-01-15',
            time: '7:30 PM',
            paymentMethod: 'Online',
            deliveryAddress: '456 Park Avenue, BKC'
          },
          {
            id: '#ORD-2024-002',
            customer: 'Priya Patel',
            restaurant: 'Burger House',
            items: '1x Whopper Meal, 1x Fries',
            total: 18.99,
            status: 'in_transit',
            date: '2024-01-15',
            time: '1:15 PM',
            paymentMethod: 'Cash on Delivery',
            deliveryAddress: '321 Green Valley, Juhu'
          },
          {
            id: '#ORD-2024-003',
            customer: 'Rahul Singh',
            restaurant: 'Sushi Master',
            items: '3x California Roll, 2x Miso Soup',
            total: 45.00,
            status: 'preparing',
            date: '2024-01-15',
            time: '11:00 AM',
            paymentMethod: 'Online',
            deliveryAddress: '987 Garden Colony, Worli'
          },
          {
            id: '#ORD-2024-004',
            customer: 'Sneha Reddy',
            restaurant: 'Thai Garden',
            items: '1x Green Curry, 2x Rice',
            total: 28.50,
            status: 'cancelled',
            date: '2024-01-14',
            time: '8:45 PM',
            paymentMethod: 'Online',
            deliveryAddress: '456 Park Avenue, BKC'
          },
          {
            id: '#ORD-2024-005',
            customer: 'Vikram Singh',
            restaurant: 'Taco Fiesta',
            items: '3x Spicy Tacos, 1x Guacamole',
            total: 26.97,
            status: 'delivered',
            date: '2024-01-14',
            time: '6:30 PM',
            paymentMethod: 'Cash on Delivery',
            deliveryAddress: '123 Foodie Street, Andheri East'
          },
          {
            id: '#ORD-2024-006',
            customer: 'Neha Gupta',
            restaurant: 'Pasta Paradise',
            items: '2x Pasta Alfredo, 1x Garlic Bread',
            total: 37.96,
            status: 'pending',
            date: '2024-01-15',
            time: '9:30 AM',
            paymentMethod: 'Online',
            deliveryAddress: '789 Lake View, Bandra West'
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

  useEffect(() => {
    let filtered = [...orders];

    if (searchQuery) {
      filtered = filtered.filter(o =>
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(o => o.status === statusFilter);
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      filtered = filtered.filter(o => {
        const orderDate = new Date(o.date);
        if (dateFilter === 'today') return orderDate >= today;
        if (dateFilter === 'week') return orderDate >= weekAgo;
        if (dateFilter === 'month') return orderDate >= monthAgo;
        return true;
      });
    }

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
              Orders Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage all orders on the platform
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
            { label: 'Total Orders', value: orders.length, icon: FiPackage, color: 'from-blue-500 to-cyan-500' },
            { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, icon: FiClock, color: 'from-orange-500 to-yellow-500' },
            { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, icon: FiCheckCircle, color: 'from-green-500 to-emerald-500' },
            { label: 'Revenue', value: `$${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`, icon: FiDollarSign, color: 'from-purple-500 to-pink-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
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
        <div className="glass-card rounded-2xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID, customer, or restaurant..."
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
        </div>

        {/* Orders Table */}
        <div className="glass-card rounded-2xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Restaurant</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 font-semibold text-gray-800 dark:text-white">{order.id}</td>
                      <td className="py-3 text-gray-600 dark:text-gray-300">{order.customer}</td>
                      <td className="py-3 text-gray-600 dark:text-gray-300">{order.restaurant}</td>
                      <td className="py-3 text-sm text-gray-500 dark:text-gray-400">{order.items}</td>
                      <td className="py-3 font-bold text-gray-800 dark:text-white">${order.total}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)} flex items-center gap-1 w-fit`}>
                          <StatusIcon className="w-3 h-3" />
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <FiEye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <FiEdit2 className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            <FiTrash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Orders;