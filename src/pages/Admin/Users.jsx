// src/pages/admin/Users.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiUsers,
  FiUserPlus,
  FiRefreshCw,
  FiDownload,
  FiUpload,
  FiSearch,
  FiFilter,
  FiX,
  FiEdit2,
  FiEye,
  FiUserX,
  FiUserCheck,
  FiTrash2,
  FiMail,
  FiPhone,
  FiTrendingUp,
  FiTrendingDown,
  FiCheckCircle,
  FiAlertCircle,
  FiDollarSign,
  FiClock,
  FiCalendar,
  FiMapPin,
  FiStar,
  FiAward,
  FiPackage,
  FiShoppingBag,
  FiCreditCard,
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
  Area,
  AreaChart,
} from 'recharts';
import MainLayout from '../../layouts/MainLayout';

// ============================================
// MOCK DATA
// ============================================
const mockUsers = [
  {
    id: 'USR-001',
    name: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    phone: '+91 98765 43210',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    role: 'customer',
    status: 'active',
    city: 'Mumbai',
    address: '123, Marine Drive, Mumbai',
    walletBalance: 250,
    totalSpent: 12500,
    orders: 45,
    bookings: 12,
    reviews: 28,
    payments: 45,
    rating: 4.8,
    verification: 'verified',
    lastLogin: '2024-01-15 14:30',
    createdAt: '2023-01-15',
    gender: 'Male',
    dob: '1990-05-15',
    deliveryHistory: [
      { date: '2024-01-15', amount: 450, status: 'completed' },
      { date: '2024-01-14', amount: 320, status: 'completed' },
    ],
  },
  {
    id: 'USR-002',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 87654 32109',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    role: 'restaurant_owner',
    status: 'active',
    city: 'Delhi',
    address: '456, Connaught Place, Delhi',
    walletBalance: 1500,
    totalSpent: 0,
    orders: 0,
    bookings: 0,
    reviews: 15,
    payments: 0,
    rating: 4.9,
    verification: 'verified',
    lastLogin: '2024-01-15 12:00',
    createdAt: '2023-03-20',
    gender: 'Female',
    dob: '1988-08-22',
    deliveryHistory: [],
  },
  {
    id: 'USR-003',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91 76543 21098',
    profileImage: 'https://i.pravatar.cc/150?img=3',
    role: 'delivery_partner',
    status: 'pending',
    city: 'Bangalore',
    address: '789, Electronic City, Bangalore',
    walletBalance: 3200,
    totalSpent: 0,
    orders: 0,
    bookings: 0,
    reviews: 8,
    payments: 0,
    rating: 4.7,
    verification: 'pending',
    lastLogin: '2024-01-14 18:45',
    createdAt: '2023-06-10',
    gender: 'Male',
    dob: '1992-11-03',
    deliveryHistory: [],
  },
  {
    id: 'USR-004',
    name: 'Sneha Patel',
    email: 'sneha.patel@example.com',
    phone: '+91 65432 10987',
    profileImage: 'https://i.pravatar.cc/150?img=10',
    role: 'customer',
    status: 'blocked',
    city: 'Hyderabad',
    address: '321, Hi-Tech City, Hyderabad',
    walletBalance: 0,
    totalSpent: 8500,
    orders: 28,
    bookings: 6,
    reviews: 18,
    payments: 28,
    rating: 3.8,
    verification: 'verified',
    lastLogin: '2024-01-10 09:20',
    createdAt: '2023-08-05',
    gender: 'Female',
    dob: '1995-03-12',
    deliveryHistory: [],
  },
  {
    id: 'USR-005',
    name: 'Rajesh Reddy',
    email: 'rajesh.reddy@example.com',
    phone: '+91 54321 09876',
    profileImage: 'https://i.pravatar.cc/150?img=7',
    role: 'restaurant_owner',
    status: 'active',
    city: 'Chennai',
    address: '654, T Nagar, Chennai',
    walletBalance: 2800,
    totalSpent: 0,
    orders: 0,
    bookings: 0,
    reviews: 22,
    payments: 0,
    rating: 4.6,
    verification: 'verified',
    lastLogin: '2024-01-15 11:30',
    createdAt: '2023-10-01',
    gender: 'Male',
    dob: '1985-07-19',
    deliveryHistory: [],
  },
  {
    id: 'USR-006',
    name: 'Ananya Gupta',
    email: 'ananya.gupta@example.com',
    phone: '+91 98765 12345',
    profileImage: 'https://i.pravatar.cc/150?img=9',
    role: 'delivery_partner',
    status: 'suspended',
    city: 'Pune',
    address: '987, FC Road, Pune',
    walletBalance: 1200,
    totalSpent: 0,
    orders: 0,
    bookings: 0,
    reviews: 5,
    payments: 0,
    rating: 3.5,
    verification: 'verified',
    lastLogin: '2024-01-12 16:00',
    createdAt: '2023-09-15',
    gender: 'Female',
    dob: '1993-12-25',
    deliveryHistory: [],
  },
  {
    id: 'USR-007',
    name: 'Deepak Verma',
    email: 'deepak.verma@example.com',
    phone: '+91 87654 98765',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    role: 'admin',
    status: 'active',
    city: 'Mumbai',
    address: '456, Andheri East, Mumbai',
    walletBalance: 5000,
    totalSpent: 0,
    orders: 0,
    bookings: 0,
    reviews: 0,
    payments: 0,
    rating: 0,
    verification: 'verified',
    lastLogin: '2024-01-15 09:00',
    createdAt: '2022-01-01',
    gender: 'Male',
    dob: '1980-01-01',
    deliveryHistory: [],
  },
];

const mockStats = {
  total: 1245,
  active: 892,
  pending: 156,
  blocked: 197,
  restaurantOwners: 245,
  deliveryPartners: 389,
  customers: 589,
  monthlyGrowth: 12.5,
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
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
          {subtext && <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl shadow-lg`}>
          <Icon />
        </div>
      </div>
      {(trend || progress !== undefined) && (
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
      )}
    </motion.div>
  );
};

// ============================================
// STATUS BADGE
// ============================================
const StatusBadge = ({ status }) => {
  const statusMap = {
    active: { label: 'Active', color: 'bg-green-500', textColor: 'text-green-600' },
    pending: { label: 'Pending', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    blocked: { label: 'Blocked', color: 'bg-red-500', textColor: 'text-red-600' },
    suspended: { label: 'Suspended', color: 'bg-orange-500', textColor: 'text-orange-600' },
    inactive: { label: 'Inactive', color: 'bg-gray-400', textColor: 'text-gray-500' },
  };

  const { label, color, textColor } = statusMap[status] || statusMap.inactive;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${textColor} bg-opacity-10`}>
      <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
      {label}
    </span>
  );
};

// ============================================
// ROLE BADGE
// ============================================
const RoleBadge = ({ role }) => {
  const roleMap = {
    customer: { label: 'Customer', color: 'bg-blue-500' },
    restaurant_owner: { label: 'Restaurant Owner', color: 'bg-purple-500' },
    delivery_partner: { label: 'Delivery Partner', color: 'bg-orange-500' },
    admin: { label: 'Admin', color: 'bg-red-500' },
  };

  const { label, color } = roleMap[role] || roleMap.customer;

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold text-white ${color}`}>
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
const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    city: '',
    verification: '',
  });

  // Filter users
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.phone.includes(term) ||
          u.id.toLowerCase().includes(term)
      );
    }

    if (filters.role) {
      filtered = filtered.filter((u) => u.role === filters.role);
    }

    if (filters.status) {
      filtered = filtered.filter((u) => u.status === filters.status);
    }

    if (filters.city) {
      filtered = filtered.filter((u) => u.city === filters.city);
    }

    if (filters.verification) {
      filtered = filtered.filter((u) => u.verification === filters.verification);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filters]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers([...mockUsers]);
      setLoading(false);
    }, 1000);
  };

  // Handle delete
  const handleDelete = () => {
    setUsers(users.filter((u) => u.id !== selectedUser?.id));
    setShowDeleteConfirm(false);
    setSelectedUser(null);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    setUsers(users.filter((u) => !selectedIds.includes(u.id)));
    setSelectedIds([]);
  };

  // Handle toggle select all
  const toggleSelectAll = () => {
    if (selectedIds.length === currentUsers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentUsers.map((u) => u.id));
    }
  };

  // Handle toggle select
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Role', 'Status', 'City', 'Orders', 'Total Spent'];
    const rows = users.map((u) => [
      u.id,
      u.name,
      u.email,
      u.phone,
      u.role,
      u.status,
      u.city,
      u.orders || 0,
      u.totalSpent || 0,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_${Date.now()}.csv`;
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
              <FiUsers className="text-orange-500" />
              Users Management
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <span>Admin</span>
              <span className="text-gray-300">›</span>
              <span className="text-gray-700 dark:text-gray-300">Users</span>
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
              <FiUserPlus /> Add User
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <StatsCard
            icon={FiUsers}
            title="Total Users"
            value={mockStats.total}
            subtext="All registered users"
            color="from-purple-500 to-pink-500"
            trend="up"
            trendValue="+8.5%"
            progress={75}
          />
          <StatsCard
            icon={FiUserCheck}
            title="Active Users"
            value={mockStats.active}
            subtext="Currently active"
            color="from-green-500 to-green-600"
            trend="up"
            trendValue="+5.2%"
            progress={72}
          />
          <StatsCard
            icon={FiAlertCircle}
            title="Pending Users"
            value={mockStats.pending}
            subtext="Awaiting verification"
            color="from-yellow-500 to-yellow-600"
            trend="down"
            trendValue="-2.1%"
            progress={12}
          />
          <StatsCard
            icon={FiUserX}
            title="Blocked Users"
            value={mockStats.blocked}
            subtext="Suspended accounts"
            color="from-red-500 to-red-600"
            trend="down"
            trendValue="-1.8%"
            progress={15}
          />
          <StatsCard
            icon={FiShoppingBag}
            title="Restaurant Owners"
            value={mockStats.restaurantOwners}
            subtext="Business partners"
            color="from-purple-500 to-blue-500"
            trend="up"
            trendValue="+12.3%"
            progress={20}
          />
          <StatsCard
            icon={FiPackage}
            title="Delivery Partners"
            value={mockStats.deliveryPartners}
            subtext="Active delivery agents"
            color="from-orange-500 to-red-500"
            trend="up"
            trendValue="+15.7%"
            progress={31}
          />
          <StatsCard
            icon={FiUsers}
            title="Customers"
            value={mockStats.customers}
            subtext="Registered customers"
            color="from-blue-500 to-cyan-500"
            trend="up"
            trendValue="+6.8%"
            progress={47}
          />
          <StatsCard
            icon={FiTrendingUp}
            title="Monthly Growth"
            value={`${mockStats.monthlyGrowth}%`}
            subtext="vs last month"
            color="from-green-500 to-emerald-500"
            trend="up"
            trendValue="+2.4%"
            progress={85}
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
                placeholder="Search by name, email, phone or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className="px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
              >
                <option value="">All Roles</option>
                <option value="customer">Customer</option>
                <option value="restaurant_owner">Restaurant Owner</option>
                <option value="delivery_partner">Delivery Partner</option>
                <option value="admin">Admin</option>
              </select>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="blocked">Blocked</option>
                <option value="suspended">Suspended</option>
              </select>
              <button
                onClick={() => setFilters({ role: '', status: '', city: '', verification: '' })}
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
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Delete Selected
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors">
              Activate
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600 transition-colors">
              Deactivate
            </button>
          </motion.div>
        )}

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Users Found</h3>
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
                          checked={selectedIds.length === currentUsers.length && currentUsers.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300 dark:border-gray-600"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                        City
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                        Status
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                        Orders
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                        Spent
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {currentUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(user.id)}
                            onChange={() => toggleSelect(user.id)}
                            className="rounded border-gray-300 dark:border-gray-600"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.profileImage}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <RoleBadge role={user.role} />
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-300">{user.city}</span>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <StatusBadge status={user.status} />
                        </td>
                        <td className="px-4 py-3 text-center hidden sm:table-cell">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {user.orders || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right hidden md:table-cell">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            ₹{user.totalSpent || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowDetailsDrawer(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              title="View Details"
                            >
                              <FiEye className="text-gray-500 dark:text-gray-400" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowEditModal(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 className="text-gray-500 dark:text-gray-400" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(user);
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
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} users
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

      {/* User Details Drawer */}
      <AnimatePresence>
        {showDetailsDrawer && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowDetailsDrawer(false)}
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
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedUser.profileImage}
                      alt={selectedUser.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-orange-500"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        {selectedUser.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedUser.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailsDrawer(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
                      <RoleBadge role={selectedUser.role} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <StatusBadge status={selectedUser.status} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">City</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedUser.city}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Wallet Balance</p>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        ₹{selectedUser.walletBalance || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Orders</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedUser.orders || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Spent</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        ₹{selectedUser.totalSpent || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedUser.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last Login</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedUser.lastLogin}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Activity Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-gray-600 dark:text-gray-300">Order #1234 completed</span>
                        <span className="text-xs text-gray-400">2 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-gray-600 dark:text-gray-300">Logged in</span>
                        <span className="text-xs text-gray-400">3 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span className="text-gray-600 dark:text-gray-300">Payment received</span>
                        <span className="text-xs text-gray-400">1 day ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                      <FiMail /> Send Email
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors">
                      <FiPhone /> Call
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && selectedUser && (
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
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Delete User</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Are you sure you want to delete <strong>{selectedUser.name}</strong>? This action cannot be undone.
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

      {/* Add User Modal - Simplified for brevity */}
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
                  <FiUserPlus className="text-orange-500" />
                  Add New User
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role *</label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all">
                    <option value="">Select role</option>
                    <option value="customer">Customer</option>
                    <option value="restaurant_owner">Restaurant Owner</option>
                    <option value="delivery_partner">Delivery Partner</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password *</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter city"
                  />
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
                  Add User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Users;