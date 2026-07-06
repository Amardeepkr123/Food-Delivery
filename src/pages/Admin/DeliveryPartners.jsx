// src/pages/admin/DeliveryPartners.jsx
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
  FiMapPin,
  FiPhone,
  FiMessageCircle,
  FiUserX,
  FiUserCheck,
  FiTrash2,
  FiStar,
  FiAward,
  FiClock,
  FiTruck,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiMenu,
  FiGrid,
  FiList,
  FiCalendar,
  FiMap,
  FiMail,
  FiSend,
  FiBell,
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
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
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import MainLayout from '../../layouts/MainLayout';

// ============================================
// MOCK DATA
// ============================================
const mockPartners = [
  {
    id: 'DP-001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    profilePhoto: 'https://i.pravatar.cc/150?img=1',
    city: 'Mumbai',
    zone: 'South Mumbai',
    vehicleType: 'Bike',
    vehicleNumber: 'MH-01-AB-1234',
    status: 'online',
    currentOrder: 'ORD-2024-001',
    todayDeliveries: 12,
    totalDeliveries: 1250,
    todayEarnings: 850,
    totalEarnings: 87500,
    rating: 4.8,
    completionRate: 98,
    joiningDate: '2023-01-15',
    verified: true,
    isActive: true,
    currentLocation: {
      lat: 19.0760,
      lng: 72.8777,
    },
    documents: {
      drivingLicense: 'DL-1234567890',
      aadhar: '1234-5678-9012',
      pan: 'ABCDE1234F',
      bank: {
        name: 'State Bank of India',
        accountNumber: '1234567890',
        ifsc: 'SBIN0001234',
      },
    },
    performance: {
      weeklyEarnings: [1200, 1500, 1800, 2100, 1900, 2400, 2800],
      monthlyEarnings: [25000, 32000, 28000, 35000, 42000, 38000],
      ratings: [4.5, 4.7, 4.8, 4.9, 4.8, 4.7, 4.9],
      deliveries: [8, 10, 12, 15, 14, 18, 20],
    },
    reviews: [
      { customer: 'Amit S.', rating: 5, comment: 'Great delivery!', date: '2024-01-15' },
      { customer: 'Priya M.', rating: 4, comment: 'Good service', date: '2024-01-14' },
      { customer: 'Rahul K.', rating: 5, comment: 'Fast and professional', date: '2024-01-13' },
    ],
  },
  {
    id: 'DP-002',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 87654 32109',
    profilePhoto: 'https://i.pravatar.cc/150?img=5',
    city: 'Delhi',
    zone: 'Central Delhi',
    vehicleType: 'Scooter',
    vehicleNumber: 'DL-02-CD-5678',
    status: 'busy',
    currentOrder: 'ORD-2024-002',
    todayDeliveries: 8,
    totalDeliveries: 890,
    todayEarnings: 620,
    totalEarnings: 62300,
    rating: 4.9,
    completionRate: 99,
    joiningDate: '2023-03-20',
    verified: true,
    isActive: true,
    currentLocation: {
      lat: 28.6139,
      lng: 77.2090,
    },
    documents: {
      drivingLicense: 'DL-0987654321',
      aadhar: '5678-1234-9012',
      pan: 'FGHIJ5678K',
      bank: {
        name: 'HDFC Bank',
        accountNumber: '9876543210',
        ifsc: 'HDFC0001234',
      },
    },
    performance: {
      weeklyEarnings: [800, 1000, 1200, 1400, 1600, 1800, 2000],
      monthlyEarnings: [18000, 22000, 26000, 30000, 34000, 38000],
      ratings: [4.6, 4.7, 4.8, 4.9, 4.9, 5.0, 4.9],
      deliveries: [6, 8, 10, 12, 14, 16, 18],
    },
    reviews: [
      { customer: 'Sneha R.', rating: 5, comment: 'Excellent service!', date: '2024-01-15' },
      { customer: 'Vikram S.', rating: 5, comment: 'Very professional', date: '2024-01-14' },
    ],
  },
  {
    id: 'DP-003',
    name: 'Amit Singh',
    email: 'amit.singh@example.com',
    phone: '+91 76543 21098',
    profilePhoto: 'https://i.pravatar.cc/150?img=3',
    city: 'Bangalore',
    zone: 'Electronic City',
    vehicleType: 'Car',
    vehicleNumber: 'KA-03-EF-9012',
    status: 'on_delivery',
    currentOrder: 'ORD-2024-003',
    todayDeliveries: 15,
    totalDeliveries: 2100,
    todayEarnings: 1200,
    totalEarnings: 147000,
    rating: 4.7,
    completionRate: 97,
    joiningDate: '2022-06-10',
    verified: true,
    isActive: true,
    currentLocation: {
      lat: 12.9716,
      lng: 77.5946,
    },
    documents: {
      drivingLicense: 'DL-5678901234',
      aadhar: '9012-3456-7890',
      pan: 'LMNOP9012Q',
      bank: {
        name: 'ICICI Bank',
        accountNumber: '5678901234',
        ifsc: 'ICIC0001234',
      },
    },
    performance: {
      weeklyEarnings: [1500, 1800, 2100, 2400, 2700, 3000, 3300],
      monthlyEarnings: [30000, 35000, 40000, 45000, 50000, 55000],
      ratings: [4.4, 4.5, 4.6, 4.7, 4.8, 4.7, 4.8],
      deliveries: [10, 12, 14, 16, 18, 20, 22],
    },
    reviews: [
      { customer: 'Deepak P.', rating: 5, comment: 'Amazing delivery!', date: '2024-01-15' },
      { customer: 'Kavita R.', rating: 4, comment: 'Good experience', date: '2024-01-14' },
      { customer: 'Suresh K.', rating: 5, comment: 'Highly recommended', date: '2024-01-13' },
    ],
  },
  {
    id: 'DP-004',
    name: 'Sneha Patel',
    email: 'sneha.patel@example.com',
    phone: '+91 65432 10987',
    profilePhoto: 'https://i.pravatar.cc/150?img=10',
    city: 'Hyderabad',
    zone: 'Hi-Tech City',
    vehicleType: 'Bike',
    vehicleNumber: 'TS-04-GH-3456',
    status: 'offline',
    currentOrder: null,
    todayDeliveries: 0,
    totalDeliveries: 560,
    todayEarnings: 0,
    totalEarnings: 39200,
    rating: 4.6,
    completionRate: 95,
    joiningDate: '2023-08-05',
    verified: true,
    isActive: true,
    currentLocation: {
      lat: 17.3850,
      lng: 78.4867,
    },
    documents: {
      drivingLicense: 'DL-3456789012',
      aadhar: '3456-7890-1234',
      pan: 'QRSTU3456V',
      bank: {
        name: 'Axis Bank',
        accountNumber: '2345678901',
        ifsc: 'AXIS0001234',
      },
    },
    performance: {
      weeklyEarnings: [500, 700, 900, 1100, 1300, 1500, 1700],
      monthlyEarnings: [12000, 15000, 18000, 21000, 24000, 27000],
      ratings: [4.3, 4.4, 4.5, 4.6, 4.7, 4.6, 4.7],
      deliveries: [4, 6, 8, 10, 12, 14, 16],
    },
    reviews: [
      { customer: 'Ravi G.', rating: 5, comment: 'Great service!', date: '2024-01-12' },
      { customer: 'Anita D.', rating: 4, comment: 'Good delivery', date: '2024-01-11' },
    ],
  },
  {
    id: 'DP-005',
    name: 'Vikram Reddy',
    email: 'vikram.reddy@example.com',
    phone: '+91 54321 09876',
    profilePhoto: 'https://i.pravatar.cc/150?img=7',
    city: 'Chennai',
    zone: 'T Nagar',
    vehicleType: 'Scooter',
    vehicleNumber: 'TN-05-IJ-7890',
    status: 'suspended',
    currentOrder: null,
    todayDeliveries: 0,
    totalDeliveries: 320,
    todayEarnings: 0,
    totalEarnings: 22400,
    rating: 3.8,
    completionRate: 82,
    joiningDate: '2023-10-01',
    verified: true,
    isActive: false,
    currentLocation: {
      lat: 13.0827,
      lng: 80.2707,
    },
    documents: {
      drivingLicense: 'DL-7890123456',
      aadhar: '7890-1234-5678',
      pan: 'UVWXY7890Z',
      bank: {
        name: 'Kotak Mahindra Bank',
        accountNumber: '3456789012',
        ifsc: 'KOTAK0001234',
      },
    },
    performance: {
      weeklyEarnings: [300, 400, 500, 600, 700, 800, 900],
      monthlyEarnings: [8000, 10000, 12000, 14000, 16000, 18000],
      ratings: [3.5, 3.6, 3.7, 3.8, 3.9, 3.8, 3.9],
      deliveries: [2, 4, 6, 8, 10, 12, 14],
    },
    reviews: [
      { customer: 'Mohan L.', rating: 3, comment: 'Average service', date: '2024-01-10' },
      { customer: 'Seema R.', rating: 4, comment: 'Decent delivery', date: '2024-01-09' },
    ],
  },
];

// ============================================
// STATS COMPONENT
// ============================================
const StatsCard = ({ icon: Icon, title, value, subtext, color, trend, trendValue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
          {subtext && (
            <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
              {trendValue}
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl shadow-lg`}>
          <Icon />
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// STATUS BADGE
// ============================================
const StatusBadge = ({ status }) => {
  const statusMap = {
    online: { label: 'Online', color: 'bg-green-500', textColor: 'text-green-600' },
    offline: { label: 'Offline', color: 'bg-gray-400', textColor: 'text-gray-500' },
    busy: { label: 'Busy', color: 'bg-orange-500', textColor: 'text-orange-600' },
    on_delivery: { label: 'On Delivery', color: 'bg-blue-500', textColor: 'text-blue-600' },
    suspended: { label: 'Suspended', color: 'bg-red-500', textColor: 'text-red-600' },
  };

  const { label, color, textColor } = statusMap[status] || statusMap.offline;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${textColor} bg-opacity-10`}>
      <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
      {label}
    </span>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const DeliveryPartners = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState(mockPartners);
  const [filteredPartners, setFilteredPartners] = useState(mockPartners);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('all');

  // Stats calculations
  const stats = {
    total: partners.length,
    online: partners.filter(p => p.status === 'online').length,
    offline: partners.filter(p => p.status === 'offline').length,
    busy: partners.filter(p => p.status === 'busy').length,
    onDelivery: partners.filter(p => p.status === 'on_delivery').length,
    suspended: partners.filter(p => p.status === 'suspended').length,
    todayDeliveries: partners.reduce((acc, p) => acc + p.todayDeliveries, 0),
    todayEarnings: partners.reduce((acc, p) => acc + p.todayEarnings, 0),
    avgRating: (partners.reduce((acc, p) => acc + p.rating, 0) / partners.length).toFixed(1),
    completionRate: (partners.reduce((acc, p) => acc + p.completionRate, 0) / partners.length).toFixed(0),
  };

  // Filter partners
  useEffect(() => {
    let filtered = partners;

    if (activeTab !== 'all') {
      filtered = filtered.filter(p => p.status === activeTab);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term) ||
        p.email.toLowerCase().includes(term) ||
        p.phone.includes(term) ||
        p.vehicleNumber.toLowerCase().includes(term)
      );
    }

    setFilteredPartners(filtered);
  }, [partners, searchTerm, activeTab]);

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setPartners([...mockPartners]);
      setLoading(false);
    }, 1000);
  };

  // Handle delete
  const handleDelete = () => {
    setPartners(partners.filter(p => p.id !== selectedPartner?.id));
    setShowDeleteConfirm(false);
    setSelectedPartner(null);
  };

  // Handle suspend/activate
  const handleToggleStatus = (partner) => {
    setPartners(partners.map(p =>
      p.id === partner.id
        ? { ...p, isActive: !p.isActive, status: p.isActive ? 'suspended' : 'online' }
        : p
    ));
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'Vehicle Type', 'Status', 'Total Deliveries', 'Rating'];
    const rows = partners.map(p => [
      p.id, p.name, p.email, p.phone, p.city, p.vehicleType, p.status,
      p.totalDeliveries, p.rating
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `delivery_partners_${Date.now()}.csv`;
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
              Delivery Partners
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage all delivery partners across your platform
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
              <FiUpload /> Import
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl food-gradient-bg text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              <FiUserPlus /> Add Partner
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
          <StatsCard
            icon={FiUsers}
            title="Total Partners"
            value={stats.total}
            color="from-purple-500 to-pink-500"
          />
          <StatsCard
            icon={FiCheckCircle}
            title="Online"
            value={stats.online}
            subtext={`${stats.busy} busy, ${stats.onDelivery} on delivery`}
            color="from-green-500 to-green-600"
            trend="up"
            trendValue="12%"
          />
          <StatsCard
            icon={FiClock}
            title="Offline"
            value={stats.offline}
            subtext={`${stats.suspended} suspended`}
            color="from-gray-500 to-gray-600"
            trend="down"
            trendValue="3%"
          />
          <StatsCard
            icon={FiTruck}
            title="Today's Deliveries"
            value={stats.todayDeliveries}
            color="from-blue-500 to-blue-600"
            trend="up"
            trendValue="8%"
          />
          <StatsCard
            icon={FiDollarSign}
            title="Today's Earnings"
            value={`₹${stats.todayEarnings}`}
            color="from-green-500 to-emerald-600"
            trend="up"
            trendValue="15%"
          />
          <StatsCard
            icon={FiStar}
            title="Avg Rating"
            value={stats.avgRating}
            subtext="⭐"
            color="from-yellow-500 to-yellow-600"
          />
          <StatsCard
            icon={FiAward}
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            color="from-orange-500 to-red-500"
            trend="up"
            trendValue="2%"
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
                placeholder="Search by name, ID, email, phone or vehicle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card text-sm font-medium text-gray-600 dark:text-gray-300 hover:shadow-lg transition-all">
                <FiFilter /> Filters
              </button>
              <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'all'
                      ? 'bg-white dark:bg-gray-700 shadow-md text-gray-800 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('online')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'online'
                      ? 'bg-white dark:bg-gray-700 shadow-md text-green-600'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Online
                </button>
                <button
                  onClick={() => setActiveTab('busy')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'busy'
                      ? 'bg-white dark:bg-gray-700 shadow-md text-orange-600'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Busy
                </button>
                <button
                  onClick={() => setActiveTab('on_delivery')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'on_delivery'
                      ? 'bg-white dark:bg-gray-700 shadow-md text-blue-600'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  On Delivery
                </button>
                <button
                  onClick={() => setActiveTab('offline')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'offline'
                      ? 'bg-white dark:bg-gray-700 shadow-md text-gray-600'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Offline
                </button>
                <button
                  onClick={() => setActiveTab('suspended')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'suspended'
                      ? 'bg-white dark:bg-gray-700 shadow-md text-red-600'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Suspended
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partners Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Partner</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Vehicle</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">City</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Deliveries</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Earnings</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Rating</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredPartners.map((partner, index) => (
                  <motion.tr
                    key={partner.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={partner.profilePhoto}
                          alt={partner.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                            {partner.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {partner.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <p>{partner.vehicleType}</p>
                        <p className="text-xs text-gray-400">{partner.vehicleNumber}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{partner.city}</span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={partner.status} />
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {partner.todayDeliveries}
                      </div>
                      <div className="text-xs text-gray-400">{partner.totalDeliveries} total</div>
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        ₹{partner.todayEarnings}
                      </div>
                      <div className="text-xs text-gray-400">₹{partner.totalEarnings} total</div>
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        <FiStar className="text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {partner.rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">{partner.completionRate}% completion</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedPartner(partner);
                            setShowProfileModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="View Profile"
                        >
                          <FiEye className="text-gray-500 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPartner(partner);
                            setShowEditModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 className="text-gray-500 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(partner)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title={partner.isActive ? 'Suspend' : 'Activate'}
                        >
                          {partner.isActive ? (
                            <FiUserX className="text-red-500" />
                          ) : (
                            <FiUserCheck className="text-green-500" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPartner(partner);
                            setShowDeleteConfirm(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 className="text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPartners.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Partners Found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && selectedPartner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedPartner.profilePhoto}
                    alt={selectedPartner.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-orange-500"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {selectedPartner.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedPartner.id}</p>
                    <StatusBadge status={selectedPartner.status} />
                  </div>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiUserCheck /> Personal Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Email</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Phone</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">City</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Zone</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.zone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Joined</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.joiningDate}</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiTruck /> Vehicle Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Type</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Number</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.vehicleNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">License</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.documents.drivingLicense}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Aadhar</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.documents.aadhar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">PAN</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.documents.pan}</span>
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiTrendingUp /> Performance
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Today's Deliveries</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.todayDeliveries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Total Deliveries</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.totalDeliveries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Today's Earnings</span>
                      <span className="text-gray-800 dark:text-white">₹{selectedPartner.todayEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Total Earnings</span>
                      <span className="text-gray-800 dark:text-white">₹{selectedPartner.totalEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Rating</span>
                      <span className="text-gray-800 dark:text-white flex items-center gap-1">
                        <FiStar className="text-yellow-400 fill-current" />
                        {selectedPartner.rating}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Completion Rate</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.completionRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiDollarSign /> Bank Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Bank</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.documents.bank.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Account</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.documents.bank.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">IFSC</span>
                      <span className="text-gray-800 dark:text-white">{selectedPartner.documents.bank.ifsc}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                  <FiMapPin /> Track Location
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors">
                  <FiPhone /> Call
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 text-white hover:bg-purple-600 transition-colors">
                  <FiMessageCircle /> Chat
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors">
                  <FiSend /> Assign Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && selectedPartner && (
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
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Delete Partner
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Are you sure you want to delete <strong>{selectedPartner.name}</strong>? This action cannot be undone.
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

      {/* Add Partner Modal - Simplified */}
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
                  Add Delivery Partner
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vehicle Type *
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all">
                    <option value="">Select vehicle type</option>
                    <option value="Bike">Bike</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vehicle Number *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter vehicle number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Zone
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter zone"
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
                <button className="px-6 py-2.5 rounded-xl food-gradient-bg text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all">
                  Add Partner
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default DeliveryPartners;