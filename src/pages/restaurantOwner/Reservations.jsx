import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar,
  FiClock,
  FiUser,
  FiUsers,
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiCheckCircle,
  FiXCircle,
  FiClock as FiClockIcon,
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiDownload,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiStar,
  FiGift,
  FiCoffee,
  FiSun,
  FiMoon,
  FiGrid,
  FiList,
  FiPrinter,
  FiShare2
} from 'react-icons/fi';
import { 
  FaUtensils, 
  FaBirthdayCake, 
  FaHeart, 
  FaBriefcase, 
  FaUsers,
  FaLeaf,
  FaPepperHot,
  FaFish,
  FaBirthdayCake as FaCake,
  FaChair,
  FaWifi,
  FaParking,
  FaWheelchair,
  FaChild
} from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';

const Reservations = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    table: '',
    occasion: '',
    specialRequests: '',
    status: 'pending'
  });
  const [tableOptions, setTableOptions] = useState([
    'Table 1 (2 seats)',
    'Table 2 (4 seats)',
    'Table 3 (6 seats)',
    'Table 4 (8 seats)',
    'Table 5 (2 seats)',
    'Table 6 (4 seats)'
  ]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockReservations = [
          {
            id: 'RES-2024-001',
            customerName: 'Amit Sharma',
            email: 'amit@example.com',
            phone: '+91 9876543210',
            date: '2024-01-20',
            time: '7:30 PM',
            guests: 4,
            table: 'Table 3 (6 seats)',
            occasion: 'Anniversary',
            specialRequests: 'Window seat preferred, celebrating 10th anniversary',
            status: 'confirmed',
            createdAt: '2024-01-15T10:30:00Z',
            preferences: ['Window Seat', 'Non-smoking'],
            dietary: ['Vegetarian']
          },
          {
            id: 'RES-2024-002',
            customerName: 'Priya Patel',
            email: 'priya@example.com',
            phone: '+91 9876543211',
            date: '2024-01-20',
            time: '8:00 PM',
            guests: 6,
            table: 'Table 4 (8 seats)',
            occasion: 'Birthday',
            specialRequests: 'Birthday cake requested, 2 children seats',
            status: 'pending',
            createdAt: '2024-01-16T14:20:00Z',
            preferences: ['High Chair', 'Kids Menu'],
            dietary: ['Vegetarian', 'No Nuts']
          },
          {
            id: 'RES-2024-003',
            customerName: 'Rahul Singh',
            email: 'rahul@example.com',
            phone: '+91 9876543212',
            date: '2024-01-18',
            time: '6:30 PM',
            guests: 2,
            table: 'Table 1 (2 seats)',
            occasion: 'Business Meeting',
            specialRequests: 'Need quiet corner, projector for presentation',
            status: 'completed',
            createdAt: '2024-01-10T09:15:00Z',
            preferences: ['Quiet Area', 'Wi-Fi'],
            dietary: ['Non-Vegetarian']
          },
          {
            id: 'RES-2024-004',
            customerName: 'Sneha Reddy',
            email: 'sneha@example.com',
            phone: '+91 9876543213',
            date: '2024-01-15',
            time: '1:00 PM',
            guests: 3,
            table: 'Table 2 (4 seats)',
            occasion: 'Family Dinner',
            specialRequests: 'Baby high chair needed',
            status: 'cancelled',
            createdAt: '2024-01-08T11:45:00Z',
            preferences: ['High Chair', 'Near Exit'],
            dietary: ['Vegetarian']
          },
          {
            id: 'RES-2024-005',
            customerName: 'Vikram Singh',
            email: 'vikram@example.com',
            phone: '+91 9876543214',
            date: '2024-01-22',
            time: '7:00 PM',
            guests: 8,
            table: 'Table 4 (8 seats)',
            occasion: 'Office Party',
            specialRequests: 'Special vegetarian menu, 1 gluten-free meal',
            status: 'confirmed',
            createdAt: '2024-01-17T16:30:00Z',
            preferences: ['Private Area', 'Vegetarian Menu'],
            dietary: ['Vegetarian', 'Gluten-Free']
          },
          {
            id: 'RES-2024-006',
            customerName: 'Neha Gupta',
            email: 'neha@example.com',
            phone: '+91 9876543215',
            date: '2024-01-19',
            time: '8:30 PM',
            guests: 2,
            table: 'Table 5 (2 seats)',
            occasion: 'Romantic Dinner',
            specialRequests: 'Rose petals on table, candle light',
            status: 'pending',
            createdAt: '2024-01-18T09:00:00Z',
            preferences: ['Candle Light', 'Romantic Setting'],
            dietary: ['Vegetarian']
          }
        ];

        setReservations(mockReservations);
        setFilteredReservations(mockReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Handle filters and search
  useEffect(() => {
    let filtered = [...reservations];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(res =>
        res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.phone.includes(searchQuery)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(res => res.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const weekLater = new Date(today);
      weekLater.setDate(weekLater.getDate() + 7);

      filtered = filtered.filter(res => {
        const resDate = new Date(res.date);
        if (dateFilter === 'today') return resDate >= today && resDate < tomorrow;
        if (dateFilter === 'tomorrow') {
          const tomorrowDate = new Date(today);
          tomorrowDate.setDate(tomorrowDate.getDate() + 1);
          return resDate >= tomorrowDate && resDate < new Date(tomorrowDate.getTime() + 86400000);
        }
        if (dateFilter === 'week') return resDate >= today && resDate < weekLater;
        return true;
      });
    }

    setFilteredReservations(filtered);
  }, [searchQuery, statusFilter, dateFilter, reservations]);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      completed: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: FiCheckCircle,
      pending: FiClockIcon,
      completed: FiCheckCircle,
      cancelled: FiXCircle
    };
    return icons[status] || FiClockIcon;
  };

  const getStatusText = (status) => {
    const texts = {
      confirmed: 'Confirmed',
      pending: 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return texts[status] || status;
  };

  const getOccasionIcon = (occasion) => {
    const icons = {
      'Birthday': FaBirthdayCake,
      'Anniversary': FaHeart,
      'Business Meeting': FaBriefcase,
      'Family Dinner': FaUsers,
      'Romantic Dinner': FaHeart,
      'Office Party': FaUsers,
      'Other': FiStar
    };
    return icons[occasion] || FiStar;
  };

  const handleAddReservation = () => {
    // Validate form
    if (!formData.customerName || !formData.email || !formData.phone || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    const newReservation = {
      id: `RES-2024-00${reservations.length + 1}`,
      ...formData,
      createdAt: new Date().toISOString(),
      preferences: [],
      dietary: []
    };

    setReservations([newReservation, ...reservations]);
    setShowAddModal(false);
    resetForm();
    alert('Reservation added successfully!');
  };

  const handleEditReservation = () => {
    setReservations(reservations.map(res =>
      res.id === selectedReservation.id ? { ...selectedReservation, ...formData } : res
    ));
    setShowEditModal(false);
    setSelectedReservation(null);
    resetForm();
    alert('Reservation updated successfully!');
  };

  const handleDeleteReservation = (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      setReservations(reservations.filter(res => res.id !== id));
      alert('Reservation deleted successfully!');
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    setReservations(reservations.map(res =>
      res.id === id ? { ...res, status: newStatus } : res
    ));
    alert(`Reservation ${newStatus} successfully!`);
  };

  const handleCheckIn = (id) => {
    handleStatusUpdate(id, 'completed');
  };

  const openEditModal = (reservation) => {
    setSelectedReservation(reservation);
    setFormData({
      customerName: reservation.customerName,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      table: reservation.table,
      occasion: reservation.occasion || '',
      specialRequests: reservation.specialRequests || '',
      status: reservation.status
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 1,
      table: '',
      occasion: '',
      specialRequests: '',
      status: 'pending'
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDateStatus = (date) => {
    const today = new Date();
    const resDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    resDate.setHours(0, 0, 0, 0);
    
    if (resDate < today) return 'past';
    if (resDate.getTime() === today.getTime()) return 'today';
    return 'upcoming';
  };

  // Navigation functions for calendar
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Calendar days
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Start from Sunday
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const hasReservationsOnDate = (date) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return reservations.some(res => res.date === dateStr);
  };

  const getReservationsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return reservations.filter(res => res.date === dateStr);
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
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    pending: reservations.filter(r => r.status === 'pending').length,
    completed: reservations.filter(r => r.status === 'completed').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
    today: reservations.filter(r => r.date === new Date().toISOString().split('T')[0]).length
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
              Loading reservations...
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
              <FiCalendar className="text-orange-500" />
              Reservations
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage all table reservations
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              <FiPlus className="w-4 h-4" />
              Add Reservation
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
            { label: 'Total Reservations', value: stats.total, icon: FiCalendar, color: 'from-blue-500 to-cyan-500' },
            { label: 'Pending', value: stats.pending, icon: FiClock, color: 'from-orange-500 to-yellow-500' },
            { label: 'Confirmed', value: stats.confirmed, icon: FiCheckCircle, color: 'from-green-500 to-emerald-500' },
            { label: 'Today', value: stats.today, icon: FiSun, color: 'from-purple-500 to-pink-500' },
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
                placeholder="Search by name, phone, or reservation ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl food-input"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl food-input min-w-[130px]"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl food-input min-w-[130px]"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="week">This Week</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' : 'glass-card hover:shadow-2xl'
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' : 'glass-card hover:shadow-2xl'
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reservations Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }
        >
          {filteredReservations.length === 0 ? (
            <div className="col-span-full glass-card rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Reservations Found</h3>
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
            filteredReservations.map((reservation) => {
              const StatusIcon = getStatusIcon(reservation.status);
              const OccasionIcon = getOccasionIcon(reservation.occasion);
              return (
                <motion.div
                  key={reservation.id}
                  variants={itemVariants}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300"
                >
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{reservation.customerName}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(reservation.status)} flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {getStatusText(reservation.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{reservation.id}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEditModal(reservation)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <FiEdit2 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteReservation(reservation.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FiCalendar className="w-4 h-4 text-orange-500" />
                        {formatDate(reservation.date)}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FiClock className="w-4 h-4 text-orange-500" />
                        {reservation.time}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FiUsers className="w-4 h-4 text-orange-500" />
                        {reservation.guests} guests
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FaChair className="w-4 h-4 text-orange-500" />
                        {reservation.table}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 col-span-2">
                        <FiPhone className="w-4 h-4 text-orange-500" />
                        {reservation.phone}
                      </div>
                    </div>

                    {/* Occasion */}
                    <div className="mt-2 flex items-center gap-2">
                      <OccasionIcon className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{reservation.occasion || 'No occasion'}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => {
                          setSelectedReservation(reservation);
                          setShowDetailsModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 text-sm font-medium"
                      >
                        <FiEye className="w-4 h-4" /> View
                      </button>
                      {reservation.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(reservation.id, 'confirmed')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 text-sm font-medium"
                          >
                            <FiCheckCircle className="w-4 h-4" /> Confirm
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(reservation.id, 'cancelled')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 text-sm font-medium"
                          >
                            <FiXCircle className="w-4 h-4" /> Cancel
                          </button>
                        </>
                      )}
                      {reservation.status === 'confirmed' && (
                        <button
                          onClick={() => handleCheckIn(reservation.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 text-sm font-medium"
                        >
                          <FiCheckCircle className="w-4 h-4" /> Check In
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Details Modal */}
        <AnimatePresence>
          {showDetailsModal && selectedReservation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedReservation(null);
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
                    Reservation Details
                  </h3>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedReservation(null);
                    }}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiXCircle className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Header Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Reservation ID</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{selectedReservation.id}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${getStatusColor(selectedReservation.status)}`}>
                        {getStatusText(selectedReservation.status)}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <FiUser className="text-orange-500" /> Customer Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p><span className="text-gray-500">Name:</span> {selectedReservation.customerName}</p>
                      <p><span className="text-gray-500">Phone:</span> {selectedReservation.phone}</p>
                      <p className="md:col-span-2"><span className="text-gray-500">Email:</span> {selectedReservation.email}</p>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <FiCalendar className="text-orange-500" /> Booking Details
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><span className="text-gray-500">Date:</span> {formatDate(selectedReservation.date)}</p>
                      <p><span className="text-gray-500">Time:</span> {selectedReservation.time}</p>
                      <p><span className="text-gray-500">Guests:</span> {selectedReservation.guests}</p>
                      <p><span className="text-gray-500">Table:</span> {selectedReservation.table}</p>
                      <p className="col-span-2"><span className="text-gray-500">Occasion:</span> {selectedReservation.occasion || 'None'}</p>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {selectedReservation.specialRequests && (
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
                        <FiMessageSquare className="text-orange-500" /> Special Requests
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedReservation.specialRequests}</p>
                    </div>
                  )}

                  {/* Preferences */}
                  {(selectedReservation.preferences?.length > 0 || selectedReservation.dietary?.length > 0) && (
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                        <FiStar className="text-orange-500" /> Preferences & Dietary
                      </h4>
                      {selectedReservation.preferences?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {selectedReservation.preferences.map((pref, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-xs">
                              {pref}
                            </span>
                          ))}
                        </div>
                      )}
                      {selectedReservation.dietary?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {selectedReservation.dietary.map((diet, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-xs">
                              {diet}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {(showAddModal || showEditModal) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setSelectedReservation(null);
                resetForm();
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
                    {showAddModal ? 'New Reservation' : 'Edit Reservation'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setSelectedReservation(null);
                      resetForm();
                    }}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiX className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Customer Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl food-input"
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl food-input"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl food-input"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl food-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl food-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Number of Guests <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl food-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Table
                      </label>
                      <select
                        value={formData.table}
                        onChange={(e) => setFormData({ ...formData, table: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl food-input"
                      >
                        <option value="">Select table</option>
                        {tableOptions.map((table) => (
                          <option key={table} value={table}>{table}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl food-input"
                    >
                      <option value="">Select occasion</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Business Meeting">Business Meeting</option>
                      <option value="Family Dinner">Family Dinner</option>
                      <option value="Romantic Dinner">Romantic Dinner</option>
                      <option value="Office Party">Office Party</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Special Requests
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl food-input resize-none"
                      rows="2"
                      placeholder="Any special requests..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl food-input"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                        setSelectedReservation(null);
                        resetForm();
                      }}
                      className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={showAddModal ? handleAddReservation : handleEditReservation}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FiSave className="w-4 h-4" />
                      {showAddModal ? 'Add Reservation' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default Reservations;