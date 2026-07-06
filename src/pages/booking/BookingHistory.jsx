import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiUsers, 
  FiMapPin, 
  FiStar, 
  FiCheckCircle,
  FiXCircle,
  FiClock as FiClockIcon,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiDownload,
  FiPrinter,
  FiMessageSquare,
  FiPhone,
  FiMail,
  FiArrowLeft,
  FiArrowRight,
  FiInfo,
  FiAlertCircle,
  FiAward,
  FiGift,
  FiZap,
  FiPlus
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
import { toast } from 'react-toastify';

const BookingHistory = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockBookings = [
          {
            id: 'BK-2024-001',
            restaurant: {
              name: 'The Royal Kitchen',
              cuisine: 'Indian',
              image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
              location: 'Andheri East, Mumbai',
              rating: 4.8
            },
            date: '2024-01-20',
            time: '7:30 PM',
            guests: 4,
            occasion: 'anniversary',
            status: 'confirmed',
            specialRequests: 'Window seat preferred, celebrating 10th anniversary',
            customer: {
              name: 'Amit Sharma',
              phone: '+91 9876543210',
              email: 'amit@example.com'
            },
            table: 'Table 3 (6 seats)',
            createdAt: '2024-01-15T10:30:00Z',
            totalAmount: 0
          },
          {
            id: 'BK-2024-002',
            restaurant: {
              name: 'Pizza Paradise',
              cuisine: 'Italian',
              image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
              location: 'Bandra West, Mumbai',
              rating: 4.6
            },
            date: '2024-01-25',
            time: '8:00 PM',
            guests: 6,
            occasion: 'birthday',
            status: 'pending',
            specialRequests: 'Birthday cake requested, 2 children seats',
            customer: {
              name: 'Priya Patel',
              phone: '+91 9876543211',
              email: 'priya@example.com'
            },
            table: 'Table 2 (4 seats)',
            createdAt: '2024-01-16T14:20:00Z',
            totalAmount: 0
          },
          {
            id: 'BK-2024-003',
            restaurant: {
              name: 'Sushi World',
              cuisine: 'Japanese',
              image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
              location: 'Lower Parel, Mumbai',
              rating: 4.9
            },
            date: '2024-01-18',
            time: '6:30 PM',
            guests: 2,
            occasion: 'romantic',
            status: 'completed',
            specialRequests: 'Candle light dinner, rose petals',
            customer: {
              name: 'Rahul Singh',
              phone: '+91 9876543212',
              email: 'rahul@example.com'
            },
            table: 'Table 1 (2 seats)',
            createdAt: '2024-01-10T09:15:00Z',
            totalAmount: 0
          },
          {
            id: 'BK-2024-004',
            restaurant: {
              name: 'Taco Fiesta',
              cuisine: 'Mexican',
              image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400',
              location: 'Juhu, Mumbai',
              rating: 4.4
            },
            date: '2024-01-15',
            time: '1:00 PM',
            guests: 3,
            occasion: 'family',
            status: 'cancelled',
            specialRequests: 'High chair needed for baby',
            customer: {
              name: 'Sneha Reddy',
              phone: '+91 9876543213',
              email: 'sneha@example.com'
            },
            table: 'Table 2 (4 seats)',
            createdAt: '2024-01-08T11:45:00Z',
            totalAmount: 0
          },
          {
            id: 'BK-2024-005',
            restaurant: {
              name: 'Thai Garden',
              cuisine: 'Thai',
              image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400',
              location: 'Andheri West, Mumbai',
              rating: 4.7
            },
            date: '2024-01-30',
            time: '7:00 PM',
            guests: 8,
            occasion: 'business',
            status: 'pending',
            specialRequests: 'Projector needed, private area',
            customer: {
              name: 'Vikram Singh',
              phone: '+91 9876543214',
              email: 'vikram@example.com'
            },
            table: 'Table 4 (8 seats)',
            createdAt: '2024-01-17T16:30:00Z',
            totalAmount: 0
          },
          {
            id: 'BK-2024-006',
            restaurant: {
              name: 'Pizza Paradise',
              cuisine: 'Italian',
              image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
              location: 'Bandra West, Mumbai',
              rating: 4.6
            },
            date: '2024-01-12',
            time: '8:30 PM',
            guests: 2,
            occasion: 'other',
            status: 'completed',
            specialRequests: 'No special requests',
            customer: {
              name: 'Neha Gupta',
              phone: '+91 9876543215',
              email: 'neha@example.com'
            },
            table: 'Table 1 (2 seats)',
            createdAt: '2024-01-09T09:00:00Z',
            totalAmount: 0
          }
        ];

        setBookings(mockBookings);
        setFilteredBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to load booking history');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle filters and search
  useEffect(() => {
    let filtered = [...bookings];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const weekLater = new Date(today);
      weekLater.setDate(weekLater.getDate() + 7);

      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.date);
        if (dateFilter === 'today') return bookingDate >= today && bookingDate < tomorrow;
        if (dateFilter === 'tomorrow') {
          const tomorrowDate = new Date(today);
          tomorrowDate.setDate(tomorrowDate.getDate() + 1);
          return bookingDate >= tomorrowDate && bookingDate < new Date(tomorrowDate.getTime() + 86400000);
        }
        if (dateFilter === 'week') return bookingDate >= today && bookingDate < weekLater;
        return true;
      });
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'date_asc':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date_desc':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        break;
    }

    setFilteredBookings(filtered);
  }, [searchQuery, statusFilter, dateFilter, sortBy, bookings]);

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

  const getOccasionLabel = (occasion) => {
    const labels = {
      birthday: '🎂 Birthday',
      anniversary: '💝 Anniversary',
      business: '💼 Business Meeting',
      family: '👨‍👩‍👧‍👦 Family Dinner',
      romantic: '❤️ Romantic Dinner',
      other: '✨ Other'
    };
    return labels[occasion] || occasion;
  };

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(booking =>
        booking.id === id ? { ...booking, status: 'cancelled' } : booking
      ));
      toast.success('Booking cancelled successfully');
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    toast.success('Refreshed successfully');
  };

  const handleExport = () => {
    toast.info('Exporting booking history...');
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
              Loading booking history...
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
              Booking History
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              View and manage all your table bookings
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiRefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              <FiDownload className="w-4 h-4" />
              Export
            </motion.button>
            <Link to="/table-booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
              >
                <FiPlus className="w-4 h-4" />
                New Booking
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Bookings', value: bookings.length, icon: FiCalendar, color: 'from-blue-500 to-cyan-500' },
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: FiCheckCircle, color: 'from-green-500 to-emerald-500' },
            { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: FiClockIcon, color: 'from-yellow-500 to-orange-500' },
            { label: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, icon: FiXCircle, color: 'from-red-500 to-rose-500' },
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
                placeholder="Search by booking ID, restaurant, or customer..."
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
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
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
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl food-input min-w-[130px]"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="date_asc">Date (Earliest)</option>
                  <option value="date_desc">Date (Latest)</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredBookings.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Bookings Found</h3>
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
            filteredBookings.map((booking) => {
              const StatusIcon = getStatusIcon(booking.status);
              return (
                <motion.div
                  key={booking.id}
                  variants={itemVariants}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300"
                >
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{booking.restaurant.image ? '🏪' : '🍽️'}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {booking.restaurant.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {booking.id} • {booking.restaurant.cuisine}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(booking.status)} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {getStatusText(booking.status)}
                        </span>
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <FiEye className="w-4 h-4 text-gray-400" />
                        </button>
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4 text-red-400" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FiCalendar className="w-4 h-4 text-orange-500" />
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FiClock className="w-4 h-4 text-orange-500" />
                        {booking.time}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FiUsers className="w-4 h-4 text-orange-500" />
                        {booking.guests} guests
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FiMapPin className="w-4 h-4 text-orange-500" />
                        {booking.restaurant.location}
                      </div>
                    </div>

                    {/* Occasion */}
                    {booking.occasion && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {getOccasionLabel(booking.occasion)}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 text-sm font-medium"
                      >
                        <FiEye className="w-4 h-4" /> View Details
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 text-sm font-medium">
                        <FiMessageSquare className="w-4 h-4" /> Contact
                      </button>
                      {booking.status === 'confirmed' && (
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-300 text-sm font-medium">
                          <FiEdit2 className="w-4 h-4" /> Modify
                        </button>
                      )}
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 text-sm font-medium"
                        >
                          <FiXCircle className="w-4 h-4" /> Cancel
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
          {showDetailsModal && selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedBooking(null);
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
                    Booking Details
                  </h3>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedBooking(null);
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
                      <p className="text-xs text-gray-500 dark:text-gray-400">Booking ID</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{selectedBooking.id}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${getStatusColor(selectedBooking.status)}`}>
                        {getStatusText(selectedBooking.status)}
                      </span>
                    </div>
                  </div>

                  {/* Restaurant Info */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <FaUtensils className="text-orange-500" /> Restaurant Details
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-500">Name:</span> {selectedBooking.restaurant.name}</p>
                      <p><span className="text-gray-500">Cuisine:</span> {selectedBooking.restaurant.cuisine}</p>
                      <p><span className="text-gray-500">Location:</span> {selectedBooking.restaurant.location}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className={`w-3 h-3 ${i < Math.round(selectedBooking.restaurant.rating) ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                        <span className="text-sm">{selectedBooking.restaurant.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <FiCalendar className="text-orange-500" /> Booking Details
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><span className="text-gray-500">Date:</span> {selectedBooking.date}</p>
                      <p><span className="text-gray-500">Time:</span> {selectedBooking.time}</p>
                      <p><span className="text-gray-500">Guests:</span> {selectedBooking.guests}</p>
                      <p><span className="text-gray-500">Table:</span> {selectedBooking.table}</p>
                      <p className="col-span-2"><span className="text-gray-500">Occasion:</span> {getOccasionLabel(selectedBooking.occasion)}</p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <FiUser className="text-orange-500" /> Customer Details
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-500">Name:</span> {selectedBooking.customer.name}</p>
                      <p><span className="text-gray-500">Phone:</span> {selectedBooking.customer.phone}</p>
                      <p><span className="text-gray-500">Email:</span> {selectedBooking.customer.email}</p>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {selectedBooking.specialRequests && (
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
                        <FiMessageSquare className="text-orange-500" /> Special Requests
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedBooking.specialRequests}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setSelectedBooking(null);
                      }}
                      className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                    >
                      Close
                    </button>
                    {selectedBooking.status === 'pending' && (
                      <button
                        onClick={() => {
                          handleCancelBooking(selectedBooking.id);
                          setShowDetailsModal(false);
                          setSelectedBooking(null);
                        }}
                        className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300"
                      >
                        Cancel Booking
                      </button>
                    )}
                    {selectedBooking.status === 'confirmed' && (
                      <button className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-300">
                        Modify Booking
                      </button>
                    )}
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

export default BookingHistory;