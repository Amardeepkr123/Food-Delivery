// src/pages/admin/Restaurants.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiShoppingBag,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiUpload,
  FiSearch,
  FiFilter,
  FiX,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiStar,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiTrendingUp,
  FiTrendingDown,
  FiCheckCircle,
  FiAlertCircle,
  FiUsers,
  FiPackage,
  FiDollarSign,
  FiAward,
  FiCalendar,
  FiUser,
  FiInfo,
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiMenu,
  FiBarChart2,
  FiCheck,
  FiXCircle,
  FiClock as FiTime,
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
const mockRestaurants = [
  {
    id: 'RES-001',
    name: 'Pizza Palace',
    owner: 'Amit Kumar',
    email: 'amit@pizzapalace.com',
    phone: '+91 98765 43210',
    cuisine: 'Italian',
    city: 'Mumbai',
    address: '123, Marine Drive, Mumbai',
    rating: 4.8,
    reviews: 1245,
    orders: 2300,
    revenue: 1250000,
    avgDeliveryTime: 25,
    status: 'active',
    verification: 'verified',
    joinedDate: '2023-01-15',
    featured: true,
    openingHours: '10:00 AM',
    closingHours: '11:00 PM',
    deliveryRadius: 5,
    gstNumber: 'GST123456789',
    fssaiLicense: 'FSSAI-123456',
    bankDetails: {
      name: 'State Bank of India',
      accountNumber: '1234567890',
      ifsc: 'SBIN0001234',
    },
    popularFoods: [
      { name: 'Margherita Pizza', price: 16.99, isVeg: true, sold: 450 },
      { name: 'Pepperoni Pizza', price: 19.99, isVeg: false, sold: 380 },
      { name: 'Garlic Bread', price: 4.99, isVeg: true, sold: 520 },
    ],
    recentOrders: [
      { id: 'ORD-001', customer: 'John Doe', amount: 47.07, status: 'delivered' },
      { id: 'ORD-002', customer: 'Jane Smith', amount: 35.66, status: 'preparing' },
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 85000, orders: 180 },
      { month: 'Feb', revenue: 92000, orders: 195 },
      { month: 'Mar', revenue: 105000, orders: 220 },
      { month: 'Apr', revenue: 98000, orders: 210 },
      { month: 'May', revenue: 115000, orders: 245 },
      { month: 'Jun', revenue: 125000, orders: 260 },
    ],
    topSellingFoods: [
      { name: 'Margherita Pizza', sales: 450 },
      { name: 'Garlic Bread', sales: 520 },
      { name: 'Pepperoni Pizza', sales: 380 },
    ],
    orderStatus: [
      { status: 'Delivered', count: 1800 },
      { status: 'Pending', count: 200 },
      { status: 'Preparing', count: 150 },
      { status: 'Cancelled', count: 150 },
    ],
  },
  {
    id: 'RES-002',
    name: 'Burger King',
    owner: 'Priya Sharma',
    email: 'priya@burgerking.com',
    phone: '+91 87654 32109',
    cuisine: 'American',
    city: 'Delhi',
    address: '456, Connaught Place, Delhi',
    rating: 4.6,
    reviews: 987,
    orders: 1800,
    revenue: 980000,
    avgDeliveryTime: 20,
    status: 'active',
    verification: 'verified',
    joinedDate: '2023-03-20',
    featured: false,
    openingHours: '11:00 AM',
    closingHours: '10:00 PM',
    deliveryRadius: 4,
    gstNumber: 'GST987654321',
    fssaiLicense: 'FSSAI-654321',
    bankDetails: {
      name: 'HDFC Bank',
      accountNumber: '9876543210',
      ifsc: 'HDFC0001234',
    },
    popularFoods: [
      { name: 'Classic Burger', price: 12.99, isVeg: false, sold: 600 },
      { name: 'Fries', price: 3.99, isVeg: true, sold: 750 },
      { name: 'Chicken Burger', price: 14.99, isVeg: false, sold: 420 },
    ],
    recentOrders: [
      { id: 'ORD-003', customer: 'Vikram Singh', amount: 35.66, status: 'delivered' },
      { id: 'ORD-004', customer: 'Sneha Patel', amount: 39.88, status: 'cancelled' },
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 65000, orders: 140 },
      { month: 'Feb', revenue: 72000, orders: 155 },
      { month: 'Mar', revenue: 78000, orders: 170 },
      { month: 'Apr', revenue: 85000, orders: 185 },
      { month: 'May', revenue: 92000, orders: 200 },
      { month: 'Jun', revenue: 98000, orders: 215 },
    ],
    topSellingFoods: [
      { name: 'Fries', sales: 750 },
      { name: 'Classic Burger', sales: 600 },
      { name: 'Chicken Burger', sales: 420 },
    ],
    orderStatus: [
      { status: 'Delivered', count: 1400 },
      { status: 'Pending', count: 150 },
      { status: 'Preparing', count: 120 },
      { status: 'Cancelled', count: 130 },
    ],
  },
  {
    id: 'RES-003',
    name: 'Sushi Master',
    owner: 'Vikram Singh',
    email: 'vikram@sushimaster.com',
    phone: '+91 76543 21098',
    cuisine: 'Japanese',
    city: 'Bangalore',
    address: '789, Electronic City, Bangalore',
    rating: 4.9,
    reviews: 2156,
    orders: 1500,
    revenue: 850000,
    avgDeliveryTime: 30,
    status: 'pending',
    verification: 'pending',
    joinedDate: '2023-06-10',
    featured: true,
    openingHours: '12:00 PM',
    closingHours: '10:30 PM',
    deliveryRadius: 3,
    gstNumber: 'GST456789123',
    fssaiLicense: 'FSSAI-789012',
    bankDetails: {
      name: 'ICICI Bank',
      accountNumber: '5678901234',
      ifsc: 'ICIC0001234',
    },
    popularFoods: [
      { name: 'California Roll', price: 14.99, isVeg: true, sold: 350 },
      { name: 'Salmon Nigiri', price: 16.99, isVeg: false, sold: 280 },
      { name: 'Miso Soup', price: 4.99, isVeg: true, sold: 320 },
    ],
    recentOrders: [
      { id: 'ORD-005', customer: 'Rajesh Reddy', amount: 54.55, status: 'preparing' },
      { id: 'ORD-006', customer: 'Ananya Gupta', amount: 37.35, status: 'pending' },
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 55000, orders: 110 },
      { month: 'Feb', revenue: 62000, orders: 125 },
      { month: 'Mar', revenue: 68000, orders: 140 },
      { month: 'Apr', revenue: 72000, orders: 150 },
      { month: 'May', revenue: 78000, orders: 165 },
      { month: 'Jun', revenue: 85000, orders: 180 },
    ],
    topSellingFoods: [
      { name: 'California Roll', sales: 350 },
      { name: 'Miso Soup', sales: 320 },
      { name: 'Salmon Nigiri', sales: 280 },
    ],
    orderStatus: [
      { status: 'Delivered', count: 1100 },
      { status: 'Pending', count: 180 },
      { status: 'Preparing', count: 120 },
      { status: 'Cancelled', count: 100 },
    ],
  },
  {
    id: 'RES-004',
    name: 'Taco Bell',
    owner: 'Sneha Patel',
    email: 'sneha@tacobell.com',
    phone: '+91 65432 10987',
    cuisine: 'Mexican',
    city: 'Hyderabad',
    address: '321, Hi-Tech City, Hyderabad',
    rating: 4.4,
    reviews: 654,
    orders: 1300,
    revenue: 720000,
    avgDeliveryTime: 18,
    status: 'suspended',
    verification: 'verified',
    joinedDate: '2023-08-05',
    featured: false,
    openingHours: '11:30 AM',
    closingHours: '10:00 PM',
    deliveryRadius: 4,
    gstNumber: 'GST321654987',
    fssaiLicense: 'FSSAI-345678',
    bankDetails: {
      name: 'Axis Bank',
      accountNumber: '2345678901',
      ifsc: 'AXIS0001234',
    },
    popularFoods: [
      { name: 'Spicy Tacos', price: 11.99, isVeg: false, sold: 500 },
      { name: 'Nachos', price: 6.99, isVeg: true, sold: 420 },
      { name: 'Burrito', price: 13.99, isVeg: true, sold: 350 },
    ],
    recentOrders: [
      { id: 'ORD-007', customer: 'Deepak Reddy', amount: 39.88, status: 'cancelled' },
      { id: 'ORD-008', customer: 'Ananya Gupta', amount: 49.80, status: 'delivered' },
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 48000, orders: 100 },
      { month: 'Feb', revenue: 52000, orders: 115 },
      { month: 'Mar', revenue: 58000, orders: 125 },
      { month: 'Apr', revenue: 62000, orders: 135 },
      { month: 'May', revenue: 68000, orders: 145 },
      { month: 'Jun', revenue: 72000, orders: 160 },
    ],
    topSellingFoods: [
      { name: 'Spicy Tacos', sales: 500 },
      { name: 'Nachos', sales: 420 },
      { name: 'Burrito', sales: 350 },
    ],
    orderStatus: [
      { status: 'Delivered', count: 950 },
      { status: 'Pending', count: 120 },
      { status: 'Preparing', count: 80 },
      { status: 'Cancelled', count: 150 },
    ],
  },
  {
    id: 'RES-005',
    name: 'Thai Garden',
    owner: 'Rajesh Reddy',
    email: 'rajesh@thaigarden.com',
    phone: '+91 54321 09876',
    cuisine: 'Thai',
    city: 'Chennai',
    address: '654, T Nagar, Chennai',
    rating: 4.7,
    reviews: 876,
    orders: 1200,
    revenue: 680000,
    avgDeliveryTime: 28,
    status: 'active',
    verification: 'verified',
    joinedDate: '2023-10-01',
    featured: true,
    openingHours: '10:30 AM',
    closingHours: '11:00 PM',
    deliveryRadius: 5,
    gstNumber: 'GST789654321',
    fssaiLicense: 'FSSAI-901234',
    bankDetails: {
      name: 'Kotak Mahindra Bank',
      accountNumber: '4567890123',
      ifsc: 'KOTAK0001234',
    },
    popularFoods: [
      { name: 'Green Curry', price: 15.99, isVeg: true, sold: 380 },
      { name: 'Pad Thai', price: 12.99, isVeg: true, sold: 340 },
      { name: 'Tom Yum Soup', price: 8.99, isVeg: true, sold: 290 },
    ],
    recentOrders: [
      { id: 'ORD-009', customer: 'Rajesh Reddy', amount: 49.80, status: 'delivered' },
      { id: 'ORD-010', customer: 'Priya Sharma', amount: 54.55, status: 'preparing' },
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 45000, orders: 95 },
      { month: 'Feb', revenue: 52000, orders: 110 },
      { month: 'Mar', revenue: 56000, orders: 120 },
      { month: 'Apr', revenue: 60000, orders: 130 },
      { month: 'May', revenue: 65000, orders: 140 },
      { month: 'Jun', revenue: 68000, orders: 150 },
    ],
    topSellingFoods: [
      { name: 'Green Curry', sales: 380 },
      { name: 'Pad Thai', sales: 340 },
      { name: 'Tom Yum Soup', sales: 290 },
    ],
    orderStatus: [
      { status: 'Delivered', count: 900 },
      { status: 'Pending', count: 100 },
      { status: 'Preparing', count: 90 },
      { status: 'Cancelled', count: 110 },
    ],
  },
];

const mockStats = {
  total: 4500,
  active: 3200,
  pendingApproval: 450,
  suspended: 250,
  verified: 3800,
  topRated: 120,
  monthlyRevenue: 2456780,
  monthlyOrders: 45670,
};

// ============================================
// STATS CARD COMPONENT
// ============================================
const StatsCard = ({ icon: Icon, title, value, subtext, color, trend, trendValue, progress }) => {
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
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtext && <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl shadow-lg`}>
          <Icon />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
            {trendValue}
          </div>
        )}
        {progress !== undefined && (
          <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================
// STATUS BADGE
// ============================================
const StatusBadge = ({ status }) => {
  const statusMap = {
    active: { label: 'Active', color: 'bg-green-500' },
    pending: { label: 'Pending', color: 'bg-yellow-500' },
    suspended: { label: 'Suspended', color: 'bg-red-500' },
    inactive: { label: 'Inactive', color: 'bg-gray-500' },
  };

  const { label, color } = statusMap[status] || statusMap.inactive;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-white' : 'animate-pulse'}`} />
      {label}
    </span>
  );
};

// ============================================
// VERIFICATION BADGE
// ============================================
const VerificationBadge = ({ status }) => {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${
      status === 'verified' ? 'text-green-500' : 'text-yellow-500'
    }`}>
      {status === 'verified' ? <FiCheckCircle /> : <FiAlertCircle />}
      {status === 'verified' ? 'Verified' : 'Pending'}
    </span>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const Restaurants = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: '',
    cuisine: '',
    city: '',
    verification: '',
  });

  // Filter restaurants
  useEffect(() => {
    let filtered = restaurants;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.id.toLowerCase().includes(term) ||
          r.owner.toLowerCase().includes(term) ||
          r.email.toLowerCase().includes(term) ||
          r.phone.includes(term) ||
          r.cuisine.toLowerCase().includes(term) ||
          r.city.toLowerCase().includes(term)
      );
    }

    if (filters.status) {
      filtered = filtered.filter((r) => r.status === filters.status);
    }

    if (filters.cuisine) {
      filtered = filtered.filter((r) => r.cuisine === filters.cuisine);
    }

    if (filters.city) {
      filtered = filtered.filter((r) => r.city === filters.city);
    }

    if (filters.verification) {
      filtered = filtered.filter((r) => r.verification === filters.verification);
    }

    setFilteredRestaurants(filtered);
  }, [restaurants, searchTerm, filters]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRestaurants = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setRestaurants([...mockRestaurants]);
      setLoading(false);
    }, 1000);
  };

  // Handle delete
  const handleDelete = () => {
    setRestaurants(restaurants.filter((r) => r.id !== selectedRestaurant?.id));
    setShowDeleteConfirm(false);
    setSelectedRestaurant(null);
  };

  // Handle toggle select
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Handle toggle select all
  const toggleSelectAll = () => {
    if (selectedIds.length === currentRestaurants.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentRestaurants.map((r) => r.id));
    }
  };

  // Handle export
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Owner', 'Email', 'Phone', 'Cuisine', 'City', 'Rating', 'Orders', 'Revenue', 'Status'];
    const rows = filteredRestaurants.map((r) => [
      r.id,
      r.name,
      r.owner,
      r.email,
      r.phone,
      r.cuisine,
      r.city,
      r.rating,
      r.orders,
      r.revenue,
      r.status,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `restaurants_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const cuisineOptions = ['Italian', 'American', 'Japanese', 'Mexican', 'Thai', 'Chinese', 'Indian'];
  const cityOptions = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];
  const statusOptions = ['active', 'pending', 'suspended'];

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
              <FiShoppingBag className="text-orange-500" />
              Restaurants Management
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>Admin</span>
              <span className="text-gray-300">›</span>
              <span className="text-gray-700 dark:text-gray-300">Restaurants</span>
            </div>
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
              <FiUpload /> Import
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              <FiPlus /> Add Restaurant
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <StatsCard
            icon={FiShoppingBag}
            title="Total Restaurants"
            value={mockStats.total}
            subtext="All restaurants"
            color="from-purple-500 to-pink-500"
            trend="up"
            trendValue="+12.5%"
            progress={75}
          />
          <StatsCard
            icon={FiCheckCircle}
            title="Active Restaurants"
            value={mockStats.active}
            subtext="Currently active"
            color="from-green-500 to-green-600"
            trend="up"
            trendValue="+8.3%"
            progress={80}
          />
          <StatsCard
            icon={FiAlertCircle}
            title="Pending Approval"
            value={mockStats.pendingApproval}
            subtext="Awaiting verification"
            color="from-yellow-500 to-yellow-600"
            trend="down"
            trendValue="-2.1%"
            progress={30}
          />
          <StatsCard
            icon={FiXCircle}
            title="Suspended"
            value={mockStats.suspended}
            subtext="Suspended accounts"
            color="from-red-500 to-red-600"
            trend="down"
            trendValue="-1.8%"
            progress={15}
          />
          <StatsCard
            icon={FiCheckCircle}
            title="Verified"
            value={mockStats.verified}
            subtext="Verified restaurants"
            color="from-blue-500 to-cyan-500"
            trend="up"
            trendValue="+15.2%"
            progress={85}
          />
          <StatsCard
            icon={FiStar}
            title="Top Rated"
            value={mockStats.topRated}
            subtext="4.5+ star rating"
            color="from-yellow-500 to-amber-500"
            trend="up"
            trendValue="+5.3%"
            progress={60}
          />
          <StatsCard
            icon={FiDollarSign}
            title="Monthly Revenue"
            value={`₹${mockStats.monthlyRevenue.toLocaleString()}`}
            subtext="Total earnings"
            color="from-green-500 to-emerald-500"
            trend="up"
            trendValue="+18.7%"
            progress={90}
          />
          <StatsCard
            icon={FiPackage}
            title="Monthly Orders"
            value={mockStats.monthlyOrders}
            subtext="Total orders"
            color="from-orange-500 to-red-500"
            trend="up"
            trendValue="+10.1%"
            progress={70}
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
                placeholder="Search by name, ID, owner, email, phone, cuisine or city..."
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
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
              <select
                value={filters.cuisine}
                onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                className="px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
              >
                <option value="">All Cuisine</option>
                {cuisineOptions.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
              >
                <option value="">All Cities</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <select
                value={filters.verification}
                onChange={(e) => setFilters({ ...filters, verification: e.target.value })}
                className="px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
              >
                <option value="">All Verification</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
              </select>
              <button
                onClick={() => setFilters({ status: '', cuisine: '', city: '', verification: '' })}
                className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                <FiX className="inline mr-1" /> Reset
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
            <button className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors">
              Verify
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600 transition-colors">
              Suspend
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors">
              <FiDownload className="inline mr-1" /> Export
            </button>
          </motion.div>
        )}

        {/* Restaurants Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Loading restaurants...</p>
            </div>
          ) : filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Restaurants Found</h3>
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
                          checked={selectedIds.length === currentRestaurants.length && currentRestaurants.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300 dark:border-gray-600"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Restaurant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                        Owner
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                        Cuisine
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                        City
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                        Rating
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                        Orders
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                        Revenue
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {currentRestaurants.map((restaurant, index) => (
                      <motion.tr
                        key={restaurant.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(restaurant.id)}
                            onChange={() => toggleSelect(restaurant.id)}
                            className="rounded border-gray-300 dark:border-gray-600"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                              {restaurant.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                                {restaurant.name}
                              </p>
                              <p className="text-xs text-gray-400 truncate">{restaurant.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              {restaurant.owner}
                            </p>
                            <p className="text-xs text-gray-400">{restaurant.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-300">{restaurant.cuisine}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-300">{restaurant.city}</span>
                        </td>
                        <td className="px-4 py-3 text-center hidden sm:table-cell">
                          <div className="flex items-center justify-center gap-1">
                            <FiStar className="text-yellow-400 fill-current" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {restaurant.rating}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center hidden sm:table-cell">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {restaurant.orders}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right hidden lg:table-cell">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            ₹{restaurant.revenue.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                            <StatusBadge status={restaurant.status} />
                            <VerificationBadge status={restaurant.verification} />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedRestaurant(restaurant);
                                setShowDrawer(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              title="View Details"
                            >
                              <FiEye className="text-gray-500 dark:text-gray-400" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRestaurant(restaurant);
                                setShowEditModal(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 className="text-gray-500 dark:text-gray-400" />
                            </button>
                            <button
                              onClick={() => navigate(`/admin/restaurants/${restaurant.id}/menu`)}
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              title="Menu"
                            >
                              <FiMenu className="text-gray-500 dark:text-gray-400" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRestaurant(restaurant);
                                setShowDeleteConfirm(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 className="text-red-500" />
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
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRestaurants.length)} of {filteredRestaurants.length} restaurants
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

      {/* Restaurant Details Drawer */}
      <AnimatePresence>
        {showDrawer && selectedRestaurant && (
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
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                      {selectedRestaurant.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {selectedRestaurant.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedRestaurant.id}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusBadge status={selectedRestaurant.status} />
                        <VerificationBadge status={selectedRestaurant.verification} />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDrawer(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-400">Owner</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedRestaurant.owner}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedRestaurant.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedRestaurant.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Cuisine</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedRestaurant.cuisine}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">Address</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedRestaurant.address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Opening Hours</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedRestaurant.openingHours}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Closing Hours</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedRestaurant.closingHours}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Delivery Radius</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedRestaurant.deliveryRadius} km</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">GST Number</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedRestaurant.gstNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">FSSAI License</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedRestaurant.fssaiLicense}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Joined Date</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedRestaurant.joinedDate}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="glass-card rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Rating</p>
                    <p className="text-lg font-bold text-yellow-500">⭐ {selectedRestaurant.rating}</p>
                  </div>
                  <div className="glass-card rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Reviews</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{selectedRestaurant.reviews}</p>
                  </div>
                  <div className="glass-card rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Orders</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{selectedRestaurant.orders}</p>
                  </div>
                  <div className="glass-card rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Revenue</p>
                    <p className="text-lg font-bold text-green-500">₹{selectedRestaurant.revenue.toLocaleString()}</p>
                  </div>
                </div>

                {/* Popular Foods */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Popular Foods</h3>
                  <div className="space-y-2">
                    {selectedRestaurant.popularFoods.map((food, index) => (
                      <div key={index} className="flex justify-between items-center p-3 glass-card rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className={`w-2 h-2 rounded-full ${food.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="text-sm font-medium text-gray-800 dark:text-white">{food.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500">${food.price}</span>
                          <span className="text-gray-400">{food.sold} sold</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                    <FiEye /> View Orders
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 text-white hover:bg-purple-600 transition-colors">
                    <FiBarChart2 /> Analytics
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors">
                    <FiCheck /> Verify
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition-colors">
                    <FiStar /> Feature
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && selectedRestaurant && (
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
              className="glass-card rounded-2xl max-w-md w-full p-6 text-center"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Delete Restaurant</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Are you sure you want to delete <strong>{selectedRestaurant.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Restaurant Modal - Simplified */}
      <AnimatePresence>
        {showAddModal && (
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
              className="glass-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <FiPlus className="text-orange-500" />
                  Add Restaurant
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Restaurant Name *</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Owner Name *</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" placeholder="Enter owner name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                  <input type="email" className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" placeholder="Enter email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
                  <input type="tel" className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" placeholder="Enter phone" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cuisine *</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all">
                    <option value="">Select cuisine</option>
                    {cuisineOptions.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City *</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all">
                    <option value="">Select city</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address *</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all" placeholder="Enter address" />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all">
                  Add Restaurant
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Restaurants;