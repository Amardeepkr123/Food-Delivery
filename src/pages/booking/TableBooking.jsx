import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiUsers, 
  FiMapPin, 
  FiStar, 
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiArrowLeft,
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiHeart,
  FiShare2,
  FiClock as FiClockIcon,
  FiMessageSquare,
  FiPhone,
  FiMail,
  FiGlobe,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiPlus,
  FiMinus,
  FiX,
  FiRefreshCw,
  FiDownload,
  FiPrinter,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
  FiChevronDown,
  FiChevronUp
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
  FaBirthdayCake,
  FaWifi,
  FaParking,
  FaWheelchair,
  FaChild
} from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const TableBooking = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [occasions, setOccasions] = useState([
    { id: 'birthday', label: 'Birthday', icon: '🎂' },
    { id: 'anniversary', label: 'Anniversary', icon: '💝' },
    { id: 'business', label: 'Business Meeting', icon: '💼' },
    { id: 'family', label: 'Family Dinner', icon: '👨‍👩‍👧‍👦' },
    { id: 'romantic', label: 'Romantic Dinner', icon: '❤️' },
    { id: 'other', label: 'Other', icon: '✨' },
  ]);
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockRestaurants = [
          {
            id: 1,
            name: 'The Royal Kitchen',
            cuisine: 'Indian',
            rating: 4.8,
            reviews: 1245,
            image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
            location: 'Andheri East, Mumbai',
            priceLevel: 3,
            features: ['Fine Dining', 'Outdoor Seating', 'Valet Parking'],
            isOpen: true,
            tables: [
              { id: 't1', name: 'Table 1', capacity: 2, available: true },
              { id: 't2', name: 'Table 2', capacity: 4, available: true },
              { id: 't3', name: 'Table 3', capacity: 6, available: false },
              { id: 't4', name: 'Table 4', capacity: 8, available: true },
            ],
            openingHours: '11:00 AM - 11:00 PM'
          },
          {
            id: 2,
            name: 'Pizza Paradise',
            cuisine: 'Italian',
            rating: 4.6,
            reviews: 987,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
            location: 'Bandra West, Mumbai',
            priceLevel: 2,
            features: ['Casual Dining', 'Takeaway', 'Kids Menu'],
            isOpen: true,
            tables: [
              { id: 't1', name: 'Table 1', capacity: 2, available: true },
              { id: 't2', name: 'Table 2', capacity: 4, available: true },
              { id: 't3', name: 'Table 3', capacity: 6, available: true },
            ],
            openingHours: '10:00 AM - 12:00 AM'
          },
          {
            id: 3,
            name: 'Sushi World',
            cuisine: 'Japanese',
            rating: 4.9,
            reviews: 2156,
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
            location: 'Lower Parel, Mumbai',
            priceLevel: 3,
            features: ['Sushi Bar', 'Private Dining', 'Sake Selection'],
            isOpen: true,
            tables: [
              { id: 't1', name: 'Table 1', capacity: 2, available: true },
              { id: 't2', name: 'Table 2', capacity: 4, available: false },
              { id: 't3', name: 'Table 3', capacity: 6, available: true },
              { id: 't4', name: 'Table 4', capacity: 10, available: true },
            ],
            openingHours: '12:00 PM - 11:30 PM'
          },
          {
            id: 4,
            name: 'Taco Fiesta',
            cuisine: 'Mexican',
            rating: 4.4,
            reviews: 654,
            image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800',
            location: 'Juhu, Mumbai',
            priceLevel: 1,
            features: ['Outdoor Seating', 'Happy Hour', 'Live Music'],
            isOpen: true,
            tables: [
              { id: 't1', name: 'Table 1', capacity: 2, available: true },
              { id: 't2', name: 'Table 2', capacity: 4, available: true },
            ],
            openingHours: '11:00 AM - 10:00 PM'
          },
          {
            id: 5,
            name: 'Thai Garden',
            cuisine: 'Thai',
            rating: 4.7,
            reviews: 876,
            image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
            location: 'Andheri West, Mumbai',
            priceLevel: 2,
            features: ['Vegetarian Options', 'Spicy Food', 'Outdoor Seating'],
            isOpen: false,
            tables: [
              { id: 't1', name: 'Table 1', capacity: 2, available: true },
              { id: 't2', name: 'Table 2', capacity: 4, available: true },
              { id: 't3', name: 'Table 3', capacity: 8, available: true },
            ],
            openingHours: '12:00 PM - 10:00 PM'
          },
        ];

        setRestaurants(mockRestaurants);
        setFilteredRestaurants(mockRestaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        toast.error('Failed to load restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Filter restaurants based on search
  useEffect(() => {
    let filtered = [...restaurants];
    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredRestaurants(filtered);
  }, [searchQuery, restaurants]);

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setStep(2);
  };

  const handleBookingSubmit = () => {
    // Validate
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }

    const bookingData = {
      restaurant: selectedRestaurant,
      date: selectedDate,
      time: selectedTime,
      guests: guests,
      occasion: selectedOccasion,
      specialRequests: specialRequests,
      customer: user,
      bookingId: `BK-${Date.now()}`,
      status: 'confirmed'
    };

    setBookingDetails(bookingData);
    setBookingSuccess(true);
    toast.success('🎉 Table booked successfully!');
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedRestaurant(null);
    setSelectedDate('');
    setSelectedTime('');
    setGuests(2);
    setSelectedOccasion('');
    setSpecialRequests('');
    setBookingSuccess(false);
    setBookingDetails(null);
  };

  const getPriceLevel = (level) => {
    return '•'.repeat(level);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium animate-pulse">
              Loading restaurants...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (bookingSuccess) {
    return (
      <MainLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto mt-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Table Booked Successfully!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Your table has been reserved at {bookingDetails?.restaurant?.name}
          </p>
          <p className="text-sm font-semibold text-orange-500 mb-6">
            Booking ID: {bookingDetails?.bookingId}
          </p>
          <div className="grid grid-cols-2 gap-3 text-left mb-6">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-semibold text-gray-800 dark:text-white">{bookingDetails?.date}</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
              <p className="font-semibold text-gray-800 dark:text-white">{bookingDetails?.time}</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">Guests</p>
              <p className="font-semibold text-gray-800 dark:text-white">{bookingDetails?.guests}</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">Occasion</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {occasions.find(o => o.id === bookingDetails?.occasion)?.label || 'None'}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/booking-history">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
              >
                View My Bookings
              </motion.button>
            </Link>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Book Another Table
            </button>
          </div>
        </motion.div>
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
              Table Booking
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Reserve your table at the best restaurants
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Step {step} of 2</span>
              <div className="flex gap-1">
                <div className={`w-8 h-1 rounded-full ${step >= 1 ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                <div className={`w-8 h-1 rounded-full ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiRefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 1 ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              1
            </div>
            <span className={`text-sm font-semibold ${step >= 1 ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`}>
              Select Restaurant
            </span>
          </div>
          <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 2 ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              2
            </div>
            <span className={`text-sm font-semibold ${step >= 2 ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`}>
              Book Table
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: step === 2 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step === 2 ? -50 : 50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Select Restaurant */}
            {step === 1 && (
              <div>
                {/* Search and Filters */}
                <div className="glass-card rounded-2xl p-4 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search restaurants by name, cuisine, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl food-input"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 rounded-xl glass-card hover:shadow-2xl transition-all duration-300">
                        <FiFilter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          viewMode === 'grid' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' : 'glass-card hover:shadow-2xl'
                        }`}
                      >
                        <FiGrid className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          viewMode === 'list' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' : 'glass-card hover:shadow-2xl'
                        }`}
                      >
                        <FiList className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Restaurant Grid */}
                {filteredRestaurants.length === 0 ? (
                  <div className="glass-card rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Restaurants Found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms</p>
                  </div>
                ) : (
                  <div className={viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                    : 'space-y-4'
                  }>
                    {filteredRestaurants.map((restaurant, index) => (
                      <motion.div
                        key={restaurant.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -5 }}
                        className={`glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 cursor-pointer ${
                          viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                        }`}
                        onClick={() => handleRestaurantSelect(restaurant)}
                      >
                        <div className={`relative ${viewMode === 'list' ? 'md:w-48 h-48 md:h-auto' : 'h-48'} overflow-hidden`}>
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3 flex gap-1">
                            <span className={`px-2 py-0.5 rounded-full ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-semibold shadow-lg`}>
                              {restaurant.isOpen ? 'Open Now' : 'Closed'}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3 flex gap-1">
                            <button className="p-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all duration-300">
                              <FiHeart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            </button>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                            <div>
                              <h3 className="text-lg font-bold text-white">{restaurant.name}</h3>
                              <p className="text-sm text-white/80">{restaurant.cuisine}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                              <FiStar className="text-yellow-400 fill-current" />
                              <span className="text-sm font-semibold text-white">{restaurant.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-5 flex-1">
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <FiMapPin className="w-4 h-4" />
                            <span>{restaurant.location}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <FiClockIcon className="w-4 h-4" />
                            <span>{restaurant.openingHours}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="text-orange-500">{getPriceLevel(restaurant.priceLevel)}</span>
                            <span className="text-gray-400">•</span>
                            <span>{restaurant.reviews} reviews</span>
                          </div>
                          {restaurant.features.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {restaurant.features.slice(0, 2).map((feature, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-600 dark:text-gray-300">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full mt-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300"
                          >
                            Select Table
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Book Table */}
            {step === 2 && selectedRestaurant && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Booking Form */}
                <div className="lg:col-span-2">
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <button
                        onClick={handleBack}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <FiArrowLeft className="w-5 h-5 text-gray-500" />
                      </button>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        Book a Table at {selectedRestaurant.name}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {/* Date Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Select Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl food-input"
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>

                      {/* Time Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Select Time <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl food-input"
                          />
                        </div>
                      </div>

                      {/* Number of Guests */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Number of Guests <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                          >
                            <FiMinus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                          </button>
                          <span className="text-2xl font-bold text-gray-800 dark:text-white min-w-[40px] text-center">
                            {guests}
                          </span>
                          <button
                            onClick={() => setGuests(prev => Math.min(20, prev + 1))}
                            className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 transition-all duration-300"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                          <span className="text-sm text-gray-500 dark:text-gray-400">max 20 guests</span>
                        </div>
                      </div>

                      {/* Occasion */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Occasion (Optional)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {occasions.map((occasion) => (
                            <button
                              key={occasion.id}
                              onClick={() => setSelectedOccasion(occasion.id)}
                              className={`p-2 rounded-xl border-2 transition-all duration-300 flex items-center gap-2 ${
                                selectedOccasion === occasion.id
                                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                              }`}
                            >
                              <span>{occasion.icon}</span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {occasion.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Special Requests
                        </label>
                        <div className="relative">
                          <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                          <textarea
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            rows="3"
                            className="w-full pl-12 pr-4 py-3 rounded-xl food-input resize-none"
                            placeholder="Any special requests? (e.g., dietary restrictions, allergies, special arrangements...)"
                          />
                        </div>
                      </div>

                      {/* Booking Summary */}
                      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Booking Summary</h4>
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex justify-between">
                            <span>Restaurant</span>
                            <span className="font-semibold">{selectedRestaurant.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date</span>
                            <span className="font-semibold">{selectedDate || 'Not selected'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time</span>
                            <span className="font-semibold">{selectedTime || 'Not selected'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Guests</span>
                            <span className="font-semibold">{guests}</span>
                          </div>
                          {selectedOccasion && (
                            <div className="flex justify-between">
                              <span>Occasion</span>
                              <span className="font-semibold">
                                {occasions.find(o => o.id === selectedOccasion)?.label}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={handleBack}
                          className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleBookingSubmit}
                          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <FiCheckCircle className="w-5 h-5" />
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Restaurant Info Sidebar */}
                <div className="lg:col-span-1">
                  <div className="glass-card rounded-2xl p-6 sticky top-4">
                    <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                      <img
                        src={selectedRestaurant.image}
                        alt={selectedRestaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {selectedRestaurant.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FiMapPin className="w-4 h-4" /> {selectedRestaurant.location}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                        <FiStar className="text-green-500 fill-current" />
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {selectedRestaurant.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">({selectedRestaurant.reviews} reviews)</span>
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <FiClockIcon className="w-4 h-4" />
                        <span>{selectedRestaurant.openingHours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiUsers className="w-4 h-4" />
                        <span>Tables available for {guests} guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-500">{getPriceLevel(selectedRestaurant.priceLevel)}</span>
                      </div>
                    </div>
                    {selectedRestaurant.features.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedRestaurant.features.map((feature, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-600 dark:text-gray-300">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default TableBooking;