import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiMapPin, 
  FiStar, 
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiFilter,
  FiX,
  FiCheckCircle,
  FiClock as FiClockIcon,
  FiAlertCircle,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiMessageSquare,
  FiUsers,
  FiHome,
  FiSun,
  FiMoon,
  FiExternalLink
} from 'react-icons/fi';
import { FaUtensils, FaBirthdayCake, FaHeart, FaBriefcase } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  // Mock booking data
  const mockBookings = [
    {
      id: 'BK-2024-001',
      restaurant: 'The Royal Kitchen',
      cuisine: 'Indian',
      rating: 4.8,
      image: '🍛',
      date: '2024-01-15',
      time: '7:30 PM',
      guests: 4,
      seating: 'indoor',
      occasion: 'anniversary',
      status: 'confirmed',
      specialInstructions: 'Window seat preferred, celebrating anniversary',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      createdAt: '2024-01-10T10:30:00Z',
    },
    {
      id: 'BK-2024-002',
      restaurant: 'Pizza Paradise',
      cuisine: 'Italian',
      rating: 4.6,
      image: '🍕',
      date: '2024-01-20',
      time: '8:00 PM',
      guests: 6,
      seating: 'outdoor',
      occasion: 'birthday',
      status: 'pending',
      specialInstructions: 'Birthday cake requested',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543211',
      createdAt: '2024-01-12T14:20:00Z',
    },
    {
      id: 'BK-2024-003',
      restaurant: 'Sushi World',
      cuisine: 'Japanese',
      rating: 4.9,
      image: '🍣',
      date: '2024-01-10',
      time: '6:30 PM',
      guests: 2,
      seating: 'window',
      occasion: 'family-dinner',
      status: 'completed',
      specialInstructions: 'Vegetarian options needed',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '9876543212',
      createdAt: '2024-01-08T09:15:00Z',
    },
    {
      id: 'BK-2024-004',
      restaurant: 'Burger House',
      cuisine: 'American',
      rating: 4.5,
      image: '🍔',
      date: '2024-01-05',
      time: '1:00 PM',
      guests: 3,
      seating: 'rooftop',
      occasion: 'business',
      status: 'cancelled',
      specialInstructions: 'Business meeting, need quiet area',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '9876543213',
      createdAt: '2024-01-03T11:45:00Z',
    },
    {
      id: 'BK-2024-005',
      restaurant: 'Thai Spice',
      cuisine: 'Thai',
      rating: 4.7,
      image: '🥘',
      date: '2024-01-25',
      time: '7:00 PM',
      guests: 8,
      seating: 'indoor',
      occasion: 'family-dinner',
      status: 'confirmed',
      specialInstructions: 'Spicy food preference, 2 kids meals',
      name: 'David Brown',
      email: 'david@example.com',
      phone: '9876543214',
      createdAt: '2024-01-18T16:30:00Z',
    },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setBookings(mockBookings);
      } catch (error) {
        toast.error('Failed to load booking history');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: FiCheckCircle,
      pending: FiClockIcon,
      completed: FiCheckCircle,
      cancelled: FiAlertCircle,
    };
    return icons[status] || FiClockIcon;
  };

  const getStatusText = (status) => {
    const texts = {
      confirmed: 'Confirmed',
      pending: 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return texts[status] || status;
  };

  const getSeatingLabel = (seating) => {
    const labels = {
      indoor: 'Indoor',
      outdoor: 'Outdoor',
      rooftop: 'Rooftop',
      window: 'Window Seat',
    };
    return labels[seating] || seating;
  };

  const getSeatingIcon = (seating) => {
    const icons = {
      indoor: FiHome,
      outdoor: FiSun,
      rooftop: FiMoon,
      window: FiMapPin,
    };
    return icons[seating] || FiMapPin;
  };

  const getOccasionLabel = (occasion) => {
    const labels = {
      birthday: '🎂 Birthday',
      anniversary: '❤️ Anniversary',
      business: '💼 Business Meeting',
      'family-dinner': '👨‍👩‍👧‍👦 Family Dinner',
      other: '⭐ Other',
    };
    return labels[occasion] || occasion;
  };

  const getOccasionIcon = (occasion) => {
    const icons = {
      birthday: FaBirthdayCake,
      anniversary: FaHeart,
      business: FaBriefcase,
      'family-dinner': FiUsers,
      other: FiStar,
    };
    return icons[occasion] || FiStar;
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = 
      booking.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBookings(prev =>
          prev.map(booking =>
            booking.id === id
              ? { ...booking, status: 'cancelled' }
              : booking
          )
        );
        toast.success('Booking cancelled successfully');
      } catch (error) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBookings(mockBookings);
      toast.success('Refreshed successfully');
    } catch (error) {
      toast.error('Failed to refresh');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    toast.info('Exporting booking history...');
    // Implement export logic
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
            <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-orange-500 border-r-orange-400 border-b-orange-300 border-l-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium animate-pulse">
            Loading booking history...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <span className="text-4xl">📋</span>
              Booking History
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              View and manage all your restaurant bookings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
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
            { label: 'Total Bookings', value: bookings.length, icon: '📊', color: 'from-blue-500 to-blue-600' },
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: '✅', color: 'from-green-500 to-green-600' },
            { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: '⏳', color: 'from-yellow-500 to-yellow-600' },
            { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, icon: '🎉', color: 'from-purple-500 to-purple-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card rounded-2xl p-4 text-center"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-2xl mx-auto mb-2`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
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
                placeholder="Search by restaurant, booking ID, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <FiFilter className="w-4 h-4" />
                Filters
                {filter !== 'all' && (
                  <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                    1
                  </span>
                )}
              </button>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-wrap gap-2">
                  {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        filter === status
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Booking List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredBookings.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-12 text-center"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                No bookings found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start booking your favorite restaurants today!'}
              </p>
            </motion.div>
          ) : (
            filteredBookings.map((booking) => {
              const StatusIcon = getStatusIcon(booking.status);
              const SeatingIcon = getSeatingIcon(booking.seating);
              const OccasionIcon = getOccasionIcon(booking.occasion);
              const isExpanded = expandedId === booking.id;

              return (
                <motion.div
                  key={booking.id}
                  variants={itemVariants}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Left Section */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-4xl">{booking.image}</div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                              {booking.restaurant}
                            </h3>
                            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                              <FiStar className="text-yellow-400 fill-current" />
                              {booking.rating}
                            </span>
                            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                              {booking.cuisine}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <FiCalendar className="w-4 h-4" />
                              {new Date(booking.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiClock className="w-4 h-4" />
                              {booking.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiUsers className="w-4 h-4" />
                              {booking.guests} guests
                            </span>
                            <span className="flex items-center gap-1">
                              <SeatingIcon className="w-4 h-4" />
                              {getSeatingLabel(booking.seating)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2 text-xs">
                            <span className={`px-2.5 py-1 rounded-full ${getStatusColor(booking.status)} flex items-center gap-1`}>
                              <StatusIcon className="w-3 h-3" />
                              {getStatusText(booking.status)}
                            </span>
                            <span className="flex items-center gap-1 text-gray-400">
                              <OccasionIcon className="w-3 h-3" />
                              {getOccasionLabel(booking.occasion)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Section */}
                      <div className="flex items-center gap-2 w-full md:w-auto">
                        <span className="text-xs text-gray-400">
                          Booking ID: {booking.id}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleViewDetails(booking)}
                          className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-all duration-300"
                        >
                          <FiEye className="w-4 h-4" />
                        </motion.button>
                        {booking.status === 'pending' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCancelBooking(booking.id)}
                            className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300"
                          >
                            <FiX className="w-4 h-4" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleExpand(booking.id)}
                          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                          {isExpanded ? (
                            <FiChevronUp className="w-4 h-4" />
                          ) : (
                            <FiChevronDown className="w-4 h-4" />
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Customer Details
                              </h4>
                              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <p className="flex items-center gap-2">
                                  <FiUser className="w-4 h-4 text-gray-400" />
                                  {booking.name}
                                </p>
                                <p className="flex items-center gap-2">
                                  <FiMail className="w-4 h-4 text-gray-400" />
                                  {booking.email}
                                </p>
                                <p className="flex items-center gap-2">
                                  <FiPhone className="w-4 h-4 text-gray-400" />
                                  {booking.phone}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Booking Details
                              </h4>
                              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <p className="flex items-center gap-2">
                                  <FiCalendar className="w-4 h-4 text-gray-400" />
                                  {new Date(booking.createdAt).toLocaleString()}
                                </p>
                                <p className="flex items-center gap-2">
                                  <FiMessageSquare className="w-4 h-4 text-gray-400" />
                                  {booking.specialInstructions || 'No special instructions'}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-3">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              <FiExternalLink className="w-4 h-4" />
                              View Restaurant
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
                            >
                              <FiMessageSquare className="w-4 h-4" />
                              Contact
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-2 mt-8"
          >
            <button className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold shadow-lg shadow-orange-500/30">
              1
            </button>
            <button className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
              2
            </button>
            <button className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
              3
            </button>
            <button className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300">
              Next
            </button>
          </motion.div>
        )}

        {/* Booking Details Modal */}
        <AnimatePresence>
          {selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedBooking(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Booking Details
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedBooking.id}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <FiX className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-4xl">{selectedBooking.image}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {selectedBooking.restaurant}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedBooking.cuisine} • ⭐ {selectedBooking.rating}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {new Date(selectedBooking.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{selectedBooking.time}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Guests</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{selectedBooking.guests}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getStatusColor(selectedBooking.status)}`}>
                        {getStatusText(selectedBooking.status)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Customer Information
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-500">Name:</span> {selectedBooking.name}</p>
                      <p><span className="text-gray-500">Email:</span> {selectedBooking.email}</p>
                      <p><span className="text-gray-500">Phone:</span> {selectedBooking.phone}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Additional Details
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-gray-500">Seating:</span> {getSeatingLabel(selectedBooking.seating)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-gray-500">Occasion:</span> {getOccasionLabel(selectedBooking.occasion)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <span className="text-gray-500">Special Instructions:</span><br />
                      {selectedBooking.specialInstructions || 'None'}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {selectedBooking.status === 'pending' && (
                      <button
                        onClick={() => {
                          handleCancelBooking(selectedBooking.id);
                          setSelectedBooking(null);
                        }}
                        className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300"
                      >
                        Cancel Booking
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingHistory;