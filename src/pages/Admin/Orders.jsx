// src/pages/admin/Orders.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiTruck,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,        // ✅ ADDED - Was missing
  FiSearch,
  FiFilter,
  FiDownload,
  FiPrinter,
  FiEdit2,
  FiEye,
  FiUser,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiStar,
  FiAward,
  FiCreditCard,
  FiFileText,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiUsers,
  FiShoppingBag,
  FiClock as FiTime,
  FiArrowRight,
} from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import MainLayout from '../../layouts/MainLayout';

// ============================================
// MOCK DATA
// ============================================
const mockOrders = [
  {
    id: 'ORD-2024-0001',
    customer: {
      name: 'Amit Kumar',
      phone: '+91 98765 43210',
      email: 'amit@example.com',
      address: '123, Marine Drive, Mumbai',
    },
    restaurant: {
      name: 'Pizza Palace',
      phone: '+91 98765 43211',
      address: '456, Restaurant Road, Mumbai',
    },
    rider: {
      name: 'Rajesh Singh',
      phone: '+91 87654 32109',
      id: 'RID-001',
    },
    items: [
      { name: 'Margherita Pizza', quantity: 2, price: 16.99 },
      { name: 'Garlic Bread', quantity: 1, price: 4.99 },
    ],
    subtotal: 38.97,
    gst: 3.12,
    couponDiscount: 0,
    deliveryCharge: 2.99,
    platformFee: 1.99,
    grandTotal: 47.07,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-2024-001',
    rating: 4.8,
    createdAt: '2024-01-15 10:30',
    deliveredAt: '2024-01-15 11:45',
    city: 'Mumbai',
    timeline: [
      { status: 'Order Placed', time: '10:30 AM', completed: true },
      { status: 'Accepted', time: '10:35 AM', completed: true },
      { status: 'Preparing', time: '10:45 AM', completed: true },
      { status: 'Ready', time: '11:00 AM', completed: true },
      { status: 'Picked Up', time: '11:10 AM', completed: true },
      { status: 'Out for Delivery', time: '11:15 AM', completed: true },
      { status: 'Delivered', time: '11:45 AM', completed: true },
    ],
    notes: 'Please ring the doorbell',
  },
  {
    id: 'ORD-2024-0002',
    customer: {
      name: 'Priya Sharma',
      phone: '+91 87654 32109',
      email: 'priya@example.com',
      address: '456, Connaught Place, Delhi',
    },
    restaurant: {
      name: 'Burger King',
      phone: '+91 87654 32110',
      address: '789, Fast Food Street, Delhi',
    },
    rider: {
      name: 'Vikram Singh',
      phone: '+91 76543 21098',
      id: 'RID-002',
    },
    items: [
      { name: 'Classic Burger', quantity: 2, price: 12.99 },
      { name: 'Fries', quantity: 2, price: 3.99 },
    ],
    subtotal: 33.96,
    gst: 2.72,
    couponDiscount: 5.00,
    deliveryCharge: 1.99,
    platformFee: 1.99,
    grandTotal: 35.66,
    status: 'out_for_delivery',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    transactionId: 'TXN-2024-002',
    rating: 0,
    createdAt: '2024-01-15 12:00',
    deliveredAt: null,
    city: 'Delhi',
    timeline: [
      { status: 'Order Placed', time: '12:00 PM', completed: true },
      { status: 'Accepted', time: '12:05 PM', completed: true },
      { status: 'Preparing', time: '12:15 PM', completed: true },
      { status: 'Ready', time: '12:30 PM', completed: true },
      { status: 'Picked Up', time: '12:40 PM', completed: true },
      { status: 'Out for Delivery', time: '12:45 PM', completed: true },
      { status: 'Delivered', time: 'Expected 1:15 PM', completed: false },
    ],
    notes: '',
  },
  {
    id: 'ORD-2024-0003',
    customer: {
      name: 'Vikram Singh',
      phone: '+91 76543 21098',
      email: 'vikram@example.com',
      address: '789, Electronic City, Bangalore',
    },
    restaurant: {
      name: 'Sushi Master',
      phone: '+91 76543 21099',
      address: '321, Japanese Street, Bangalore',
    },
    rider: null,
    items: [
      { name: 'California Roll', quantity: 3, price: 14.99 },
    ],
    subtotal: 44.97,
    gst: 3.60,
    couponDiscount: 0,
    deliveryCharge: 3.99,
    platformFee: 1.99,
    grandTotal: 54.55,
    status: 'preparing',
    paymentStatus: 'pending',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-2024-003',
    rating: 0,
    createdAt: '2024-01-15 13:00',
    deliveredAt: null,
    city: 'Bangalore',
    timeline: [
      { status: 'Order Placed', time: '1:00 PM', completed: true },
      { status: 'Accepted', time: '1:05 PM', completed: true },
      { status: 'Preparing', time: '1:15 PM', completed: true },
      { status: 'Ready', time: 'Expected 1:45 PM', completed: false },
      { status: 'Picked Up', time: '', completed: false },
      { status: 'Out for Delivery', time: '', completed: false },
      { status: 'Delivered', time: '', completed: false },
    ],
    notes: 'Extra wasabi please',
  },
  {
    id: 'ORD-2024-0004',
    customer: {
      name: 'Sneha Patel',
      phone: '+91 65432 10987',
      email: 'sneha@example.com',
      address: '321, Hi-Tech City, Hyderabad',
    },
    restaurant: {
      name: 'Taco Bell',
      phone: '+91 65432 10988',
      address: '654, Mexican Street, Hyderabad',
    },
    rider: {
      name: 'Deepak Reddy',
      phone: '+91 54321 09876',
      id: 'RID-003',
    },
    items: [
      { name: 'Spicy Tacos', quantity: 3, price: 11.99 },
      { name: 'Nachos', quantity: 1, price: 6.99 },
    ],
    subtotal: 42.96,
    gst: 3.44,
    couponDiscount: 10.00,
    deliveryCharge: 1.49,
    platformFee: 1.99,
    grandTotal: 39.88,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-2024-004',
    rating: 0,
    createdAt: '2024-01-15 14:00',
    deliveredAt: null,
    city: 'Hyderabad',
    timeline: [
      { status: 'Order Placed', time: '2:00 PM', completed: true },
      { status: 'Accepted', time: '2:05 PM', completed: true },
      { status: 'Preparing', time: '2:15 PM', completed: true },
      { status: 'Cancelled', time: '2:30 PM', completed: true },
    ],
    notes: 'Cancel due to delay',
  },
  {
    id: 'ORD-2024-0005',
    customer: {
      name: 'Rajesh Reddy',
      phone: '+91 54321 09876',
      email: 'rajesh@example.com',
      address: '654, T Nagar, Chennai',
    },
    restaurant: {
      name: 'Thai Garden',
      phone: '+91 54321 09877',
      address: '987, Thai Street, Chennai',
    },
    rider: {
      name: 'Ananya Gupta',
      phone: '+91 98765 12345',
      id: 'RID-004',
    },
    items: [
      { name: 'Green Curry', quantity: 2, price: 15.99 },
      { name: 'Thai Rice', quantity: 2, price: 4.99 },
    ],
    subtotal: 41.96,
    gst: 3.36,
    couponDiscount: 0,
    deliveryCharge: 2.49,
    platformFee: 1.99,
    grandTotal: 49.80,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    transactionId: 'TXN-2024-005',
    rating: 4.9,
    createdAt: '2024-01-15 15:30',
    deliveredAt: '2024-01-15 16:45',
    city: 'Chennai',
    timeline: [
      { status: 'Order Placed', time: '3:30 PM', completed: true },
      { status: 'Accepted', time: '3:35 PM', completed: true },
      { status: 'Preparing', time: '3:45 PM', completed: true },
      { status: 'Ready', time: '4:00 PM', completed: true },
      { status: 'Picked Up', time: '4:10 PM', completed: true },
      { status: 'Out for Delivery', time: '4:15 PM', completed: true },
      { status: 'Delivered', time: '4:45 PM', completed: true },
    ],
    notes: 'Leave at reception',
  },
  {
    id: 'ORD-2024-0006',
    customer: {
      name: 'Ananya Gupta',
      phone: '+91 98765 12345',
      email: 'ananya@example.com',
      address: '987, FC Road, Pune',
    },
    restaurant: {
      name: 'Pizza Palace',
      phone: '+91 98765 43211',
      address: '456, Restaurant Road, Mumbai',
    },
    rider: null,
    items: [
      { name: 'Pepperoni Pizza', quantity: 1, price: 19.99 },
      { name: 'Garlic Bread', quantity: 2, price: 4.99 },
    ],
    subtotal: 29.97,
    gst: 2.40,
    couponDiscount: 0,
    deliveryCharge: 2.99,
    platformFee: 1.99,
    grandTotal: 37.35,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'Cash on Delivery',
    transactionId: 'TXN-2024-006',
    rating: 0,
    createdAt: '2024-01-15 17:00',
    deliveredAt: null,
    city: 'Pune',
    timeline: [
      { status: 'Order Placed', time: '5:00 PM', completed: true },
      { status: 'Accepted', time: '', completed: false },
      { status: 'Preparing', time: '', completed: false },
      { status: 'Ready', time: '', completed: false },
      { status: 'Picked Up', time: '', completed: false },
      { status: 'Out for Delivery', time: '', completed: false },
      { status: 'Delivered', time: '', completed: false },
    ],
    notes: 'New customer',
  },
];

const mockStats = {
  total: 1245,
  pending: 89,
  preparing: 45,
  outForDelivery: 67,
  delivered: 956,
  cancelled: 88,
  revenue: 58745,
  avgOrderValue: 47.19,
};

const statusColors = {
  pending: 'bg-yellow-500',
  accepted: 'bg-blue-500',
  preparing: 'bg-purple-500',
  ready: 'bg-indigo-500',
  picked_up: 'bg-cyan-500',
  out_for_delivery: 'bg-orange-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500',
  refunded: 'bg-pink-500',
};

// ============================================
// STATS CARD COMPONENT
// ============================================
const StatsCard = ({ icon: Icon, title, value, subtext, color, trend, trendValue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-5 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
          {subtext && <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl shadow-lg`}>
          <Icon />
        </div>
      </div>
      {trend && (
        <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
          {trendValue}
        </div>
      )}
    </motion.div>
  );
};

// ============================================
// STATUS BADGE
// ============================================
const StatusBadge = ({ status }) => {
  const labels = {
    pending: 'Pending',
    accepted: 'Accepted',
    preparing: 'Preparing',
    ready: 'Ready',
    picked_up: 'Picked Up',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
  };

  const label = labels[status] || status;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${statusColors[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'delivered' ? 'bg-white' : 'animate-pulse'}`} />
      {label}
    </span>
  );
};

// ============================================
// PAYMENT STATUS BADGE
// ============================================
const PaymentStatusBadge = ({ status }) => {
  const statusMap = {
    paid: { label: 'Paid', color: 'bg-green-500' },
    pending: { label: 'Pending', color: 'bg-yellow-500' },
    refunded: { label: 'Refunded', color: 'bg-pink-500' },
    failed: { label: 'Failed', color: 'bg-red-500' },
  };

  const { label, color } = statusMap[status] || statusMap.pending;

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold text-white ${color}`}>
      {label}
    </span>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    city: '',
    dateRange: '',
  });

  // Filter orders
  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.id.toLowerCase().includes(term) ||
          o.customer.name.toLowerCase().includes(term) ||
          o.restaurant.name.toLowerCase().includes(term) ||
          (o.rider && o.rider.name.toLowerCase().includes(term))
      );
    }

    if (filters.status) {
      filtered = filtered.filter((o) => o.status === filters.status);
    }

    if (filters.paymentStatus) {
      filtered = filtered.filter((o) => o.paymentStatus === filters.paymentStatus);
    }

    if (filters.city) {
      filtered = filtered.filter((o) => o.city === filters.city);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, filters]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setOrders([...mockOrders]);
      setLoading(false);
    }, 1000);
  };

  // Handle toggle select
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Handle toggle select all
  const toggleSelectAll = () => {
    if (selectedIds.length === currentOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentOrders.map((o) => o.id));
    }
  };

  // Handle delete
  const handleDelete = () => {
    setOrders(orders.filter((o) => o.id !== selectedOrder?.id));
    setShowDrawer(false);
    setSelectedOrder(null);
  };

  // Handle export
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Customer', 'Restaurant', 'Amount', 'Status', 'Payment', 'Date'];
    const rows = filteredOrders.map((o) => [
      o.id,
      o.customer.name,
      o.restaurant.name,
      o.grandTotal,
      o.status,
      o.paymentStatus,
      o.createdAt,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
              <FiPackage className="text-orange-500" />
              Order Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage all orders across your platform
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300"
              title="Refresh"
            >
              <FiRefreshCw className={`text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <FiDownload /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FiPrinter /> Print
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <StatsCard
            icon={FiPackage}
            title="Total Orders"
            value={mockStats.total}
            subtext="All time orders"
            color="from-purple-500 to-pink-500"
            trend="up"
            trendValue="+12.5%"
          />
          <StatsCard
            icon={FiClock}
            title="Pending"
            value={mockStats.pending}
            subtext="Awaiting action"
            color="from-yellow-500 to-yellow-600"
            trend="down"
            trendValue="-2.1%"
          />
          <StatsCard
            icon={FiTruck}
            title="Out for Delivery"
            value={mockStats.outForDelivery}
            subtext="Currently on the way"
            color="from-orange-500 to-red-500"
            trend="up"
            trendValue="+8.3%"
          />
          <StatsCard
            icon={FiCheckCircle}
            title="Delivered"
            value={mockStats.delivered}
            subtext="Completed orders"
            color="from-green-500 to-green-600"
            trend="up"
            trendValue="+15.2%"
          />
          <StatsCard
            icon={FiDollarSign}
            title="Revenue"
            value={`₹${mockStats.revenue.toLocaleString()}`}
            subtext="Total earnings"
            color="from-blue-500 to-cyan-500"
            trend="up"
            trendValue="+18.7%"
          />
          <StatsCard
            icon={FiTrendingUp}
            title="Avg Order Value"
            value={`₹${mockStats.avgOrderValue}`}
            subtext="Per order average"
            color="from-green-500 to-emerald-500"
            trend="up"
            trendValue="+5.3%"
          />
          <StatsCard
            icon={FiUsers}
            title="Preparing"
            value={mockStats.preparing}
            subtext="Being prepared"
            color="from-purple-500 to-indigo-500"
            trend="down"
            trendValue="-3.8%"
          />
          <StatsCard
            icon={FiXCircle}
            title="Cancelled"
            value={mockStats.cancelled}
            subtext="Cancelled orders"
            color="from-red-500 to-pink-500"
            trend="down"
            trendValue="-1.2%"
          />
        </div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-4 md:p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID, customer, restaurant, rider..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="picked_up">Picked Up</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={filters.paymentStatus}
                onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
                className="px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
              >
                <option value="">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
                <option value="failed">Failed</option>
              </select>
              <button
                onClick={() => setFilters({ status: '', paymentStatus: '', city: '', dateRange: '' })}
                className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                <FiXCircle className="inline mr-1" /> Reset
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-3 mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedIds.length} selected
            </span>
            <button className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">
              Delete
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors">
              Assign Rider
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors">
              Mark Delivered
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-colors">
              <FiDownload className="inline mr-1" /> Export
            </button>
          </motion.div>
        )}

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Orders Found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 w-10">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === currentOrders.length && currentOrders.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300 dark:border-gray-600"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                        Restaurant
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                        Payment
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {currentOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(order.id)}
                            onChange={() => toggleSelect(order.id)}
                            className="rounded border-gray-300 dark:border-gray-600"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-semibold text-gray-800 dark:text-white">
                            {order.id}
                          </span>
                          <p className="text-xs text-gray-400">{order.createdAt}</p>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              {order.customer.name}
                            </p>
                            <p className="text-xs text-gray-400">{order.customer.phone}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              {order.restaurant.name}
                            </p>
                            <p className="text-xs text-gray-400">{order.city}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-sm font-bold text-gray-800 dark:text-white">
                            ₹{order.grandTotal.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <PaymentStatusBadge status={order.paymentStatus} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowDrawer(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              title="View Details"
                            >
                              <FiEye className="text-gray-500 dark:text-gray-400" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowAssignModal(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              title="Assign Rider"
                            >
                              <FiUser className="text-gray-500 dark:text-gray-400" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowInvoiceModal(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              title="Invoice"
                            >
                              <FiFileText className="text-gray-500 dark:text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Order Details Drawer */}
      <AnimatePresence>
        {showDrawer && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowDrawer(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      {selectedOrder.id}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedOrder.createdAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedOrder.status} />
                    <button
                      onClick={() => setShowDrawer(false)}
                      className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <FiXCircle className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="glass-card rounded-xl p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <FiUser /> Customer Information
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-400">Name</p>
                      <p className="font-medium text-gray-800 dark:text-white">{selectedOrder.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Phone</p>
                      <p className="font-medium text-gray-800 dark:text-white">{selectedOrder.customer.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-400">Address</p>
                      <p className="font-medium text-gray-800 dark:text-white">{selectedOrder.customer.address}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="glass-card rounded-xl p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <FiShoppingBag /> Order Items
                  </h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-gray-800">
                        <span className="text-gray-700 dark:text-gray-300">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-800 dark:text-white">${selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">GST</span>
                      <span className="text-gray-800 dark:text-white">${selectedOrder.gst.toFixed(2)}</span>
                    </div>
                    {selectedOrder.couponDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount</span>
                        <span>-${selectedOrder.couponDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Delivery Charge</span>
                      <span className="text-gray-800 dark:text-white">${selectedOrder.deliveryCharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Platform Fee</span>
                      <span className="text-gray-800 dark:text-white">${selectedOrder.platformFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-gray-800 dark:text-white">Grand Total</span>
                      <span className="text-gray-900 dark:text-white">${selectedOrder.grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="glass-card rounded-xl p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <FiCreditCard /> Payment Information
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-400">Status</p>
                      <PaymentStatusBadge status={selectedOrder.paymentStatus} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Method</p>
                      <p className="font-medium text-gray-800 dark:text-white">{selectedOrder.paymentMethod}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-400">Transaction ID</p>
                      <p className="font-medium text-gray-800 dark:text-white">{selectedOrder.transactionId}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="glass-card rounded-xl p-4 mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <FiTime /> Delivery Timeline
                  </h3>
                  <div className="relative">
                    {selectedOrder.timeline.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 mb-4 last:mb-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                        }`}>
                          {step.completed ? <FiCheckCircle /> : <FiClock />}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${step.completed ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`}>
                            {step.status}
                          </p>
                          <p className="text-xs text-gray-400">{step.time || 'Pending'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                    <FiPhone /> Call Customer
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 text-white hover:bg-purple-600 transition-colors">
                    <FiPrinter /> Print Receipt
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors">
                    <FiXCircle /> Cancel
                  </button>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      <span className="font-semibold">Note:</span> {selectedOrder.notes}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assign Rider Modal */}
      <AnimatePresence>
        {showAssignModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Assign Rider</h3>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiXCircle className="text-xl" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Rider</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all">
                    <option value="">Select a rider</option>
                    <option value="RID-001">Rajesh Singh</option>
                    <option value="RID-002">Vikram Singh</option>
                    <option value="RID-003">Deepak Reddy</option>
                    <option value="RID-004">Ananya Gupta</option>
                  </select>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert(`Rider assigned to order ${selectedOrder.id}`);
                      setShowAssignModal(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all"
                  >
                    Assign
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invoice Modal */}
      <AnimatePresence>
        {showInvoiceModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl max-w-2xl w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Invoice</h3>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiXCircle className="text-xl" />
                </button>
              </div>

              {/* Invoice Content */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">INVOICE</h2>
                  <p className="text-sm text-gray-500">{selectedOrder.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <p className="text-xs text-gray-400">Customer</p>
                    <p className="font-medium text-gray-800 dark:text-white">{selectedOrder.customer.name}</p>
                    <p className="text-xs text-gray-400">{selectedOrder.customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="font-medium text-gray-800 dark:text-white">{selectedOrder.createdAt}</p>
                  </div>
                </div>

                <table className="w-full text-sm mb-4">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Item</th>
                      <th className="px-4 py-2 text-center">Qty</th>
                      <th className="px-4 py-2 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2 text-center">{item.quantity}</td>
                        <td className="px-4 py-2 text-right">${item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2" className="px-4 py-2 text-right font-bold">Grand Total</td>
                      <td className="px-4 py-2 text-right font-bold">${selectedOrder.grandTotal.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowInvoiceModal(false)}
                    className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center gap-2">
                    <FiPrinter /> Print
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Orders;