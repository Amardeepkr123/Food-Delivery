// src/pages/booking/BookingForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiCalendar, 
  FiClock, 
  FiUsers, 
  FiMessageSquare,
  FiCheckCircle,
  FiAlertCircle,
  FiSend,
  FiMapPin,
  FiHome,
  FiSun,
  FiMoon,
  FiStar,
  FiCoffee,
  FiArrowLeft,
  FiGift,
  FiTag,
  FiCreditCard,
  FiSmartphone,
  FiDollarSign,
  FiDownload,
  FiShare2,
  FiCalendar as FiCalendarIcon,
  FiClock as FiClockIcon,
  FiX,
  FiCheck,
} from 'react-icons/fi';
import { 
  FaUtensils, 
  FaBirthdayCake, 
  FaHeart, 
  FaBriefcase, 
  FaUsers,
  FaLeaf,
  FaPizzaSlice,
  FaHamburger,
  FaFish,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import MainLayout from '../../layouts/MainLayout';

// ============================================
// MOCK DATA
// ============================================
const mockRestaurants = [
  { id: '1', name: 'The Royal Kitchen', cuisine: 'Indian', rating: 4.8, image: '🍛', priceRange: '₹₹', location: 'Mumbai', tables: 12 },
  { id: '2', name: 'Pizza Paradise', cuisine: 'Italian', rating: 4.6, image: '🍕', priceRange: '₹₹', location: 'Delhi', tables: 8 },
  { id: '3', name: 'Sushi World', cuisine: 'Japanese', rating: 4.9, image: '🍣', priceRange: '₹₹₹', location: 'Bangalore', tables: 6 },
  { id: '4', name: 'Burger House', cuisine: 'American', rating: 4.5, image: '🍔', priceRange: '₹', location: 'Chennai', tables: 10 },
  { id: '5', name: 'Thai Spice', cuisine: 'Thai', rating: 4.7, image: '🥘', priceRange: '₹₹', location: 'Hyderabad', tables: 7 },
  { id: '6', name: 'Mexican Fiesta', cuisine: 'Mexican', rating: 4.4, image: '🌮', priceRange: '₹', location: 'Pune', tables: 9 },
];

const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM',
  '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM',
  '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM',
  '09:00 PM', '09:30 PM', '10:00 PM',
];

const seatingOptions = [
  { value: 'indoor', label: 'Indoor', icon: FiHome },
  { value: 'outdoor', label: 'Outdoor', icon: FiSun },
  { value: 'rooftop', label: 'Rooftop', icon: FiMoon },
  { value: 'window', label: 'Window Seat', icon: FiMapPin },
];

const occasionOptions = [
  { value: 'birthday', label: 'Birthday', icon: FaBirthdayCake },
  { value: 'anniversary', label: 'Anniversary', icon: FaHeart },
  { value: 'business', label: 'Business Meeting', icon: FaBriefcase },
  { value: 'family-dinner', label: 'Family Dinner', icon: FaUsers },
  { value: 'date-night', label: 'Date Night', icon: FaHeart },
  { value: 'friends', label: 'Friends Gathering', icon: FaUsers },
  { value: 'celebration', label: 'Celebration', icon: FiStar },
  { value: 'other', label: 'Other', icon: FiStar },
];

// ============================================
// COMPONENTS
// ============================================

const BookingForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
    setValue,
    trigger,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      restaurantId: '',
      date: '',
      time: '',
      guests: 2,
      seating: 'indoor',
      occasion: 'family-dinner',
      specialInstructions: '',
      tableNumber: '',
    },
  });

  const selectedDate = watch('date');
  const selectedGuests = watch('guests');
  const restaurantId = watch('restaurantId');

  // Get today's date
  const today = new Date().toISOString().split('T')[0];

  // Fetch restaurant details when selected
  useEffect(() => {
    if (restaurantId) {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      setSelectedRestaurant(restaurant);
      
      // Generate available tables based on guests
      const tables = [];
      const tableCount = Math.min(restaurant?.tables || 5, 10);
      for (let i = 1; i <= tableCount; i++) {
        const capacity = Math.ceil(selectedGuests / 2) + (i % 3);
        tables.push({
          id: `T-${String(i).padStart(2, '0')}`,
          number: `T-${String(i).padStart(2, '0')}`,
          capacity: Math.min(capacity, 8),
          status: i % 4 === 0 ? 'reserved' : 'available',
          type: i % 3 === 0 ? 'VIP' : 'Standard',
        });
      }
      setAvailableTables(tables);
    }
  }, [restaurantId, selectedGuests]);

  // Check if time slot is available
  const isTimeSlotAvailable = (slot) => {
    // Mock availability - some slots are unavailable
    const unavailableSlots = ['03:30 PM', '04:00 PM', '07:30 PM', '08:00 PM'];
    return !unavailableSlots.includes(slot);
  };

  // Handle table selection
  const handleTableSelect = (table) => {
    if (table.status === 'available') {
      setSelectedTable(table);
      setValue('tableNumber', table.number);
      trigger('tableNumber');
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!selectedTable) {
      toast.error('Please select a table');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const booking = {
        id: `BK-${Date.now()}`,
        ...data,
        tableNumber: selectedTable.number,
        restaurantName: selectedRestaurant?.name,
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
        amount: 99 + 49,
      };
      
      setBookingData(booking);
      setShowConfirmation(true);
      setFormSubmitted(true);
      
      toast.success('🎉 Table booked successfully!');
      
      // Reset form after 5 seconds
      setTimeout(() => {
        reset();
        setFormSubmitted(false);
        setSelectedTable(null);
        setStep(1);
      }, 5000);
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back
  const handleBack = () => {
    navigate('/restaurants');
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <MainLayout>
      <div className="min-h-screen py-8 px-4 relative overflow-hidden bg-gradient-to-br from-orange-50/50 via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
          
          {/* Floating Food Icons */}
          {['🍕', '🍔', '🍣', '🌮', '🍝', '🥘'].map((emoji, index) => (
            <motion.div
              key={index}
              className="absolute text-6xl opacity-10 dark:opacity-5"
              style={{
                top: `${10 + (index * 15)}%`,
                left: `${5 + (index % 3) * 40}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6 + index,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all"
        >
          <FiArrowLeft className="w-6 h-6" />
        </motion.button>

        {/* Main Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto relative z-10"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-6xl mb-4 block">🍽️</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-3">
              Book a Table
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Reserve your perfect dining experience at the finest restaurants
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl"
          >
            {/* Success Message */}
            <AnimatePresence>
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mb-6 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 flex items-center gap-3"
                >
                  <FiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      Table Booked Successfully!
                    </p>
                    <p className="text-green-500 dark:text-green-300 text-sm">
                      We'll send you a confirmation shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step Indicator */}
            <div className="flex items-center gap-3 mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= s
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`w-12 h-0.5 ${
                      step > s ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                    <FiUser className="text-orange-500" />
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="text"
                          {...register('name', {
                            required: 'Full name is required',
                            minLength: { value: 2, message: 'Name must be at least 2 characters' },
                          })}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 border ${
                            errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                          } focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle /> {errors.name.message}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 border ${
                            errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                          } focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all`}
                          placeholder="you@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle /> {errors.email.message}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Phone */}
                    <motion.div variants={itemVariants} className="space-y-1.5 md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="tel"
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: 'Please enter a valid 10-digit phone number',
                            },
                          })}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 border ${
                            errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                          } focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all`}
                          placeholder="9876543210"
                          maxLength={10}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle /> {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      trigger(['name', 'email', 'phone']);
                      if (!errors.name && !errors.email && !errors.phone) {
                        setStep(2);
                      }
                    }}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all"
                  >
                    Next Step →
                  </button>
                </motion.div>
              )}

              {/* Step 2: Booking Details */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                    <FaUtensils className="text-orange-500" />
                    Booking Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Restaurant */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Restaurant <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <FaUtensils className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <select
                          {...register('restaurantId', {
                            required: 'Please select a restaurant',
                          })}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 border ${
                            errors.restaurantId ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                          } focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all appearance-none`}
                        >
                          <option value="">Select a restaurant</option>
                          {restaurants.map((restaurant) => (
                            <option key={restaurant.id} value={restaurant.id}>
                              {restaurant.image} {restaurant.name} ({restaurant.cuisine}) ⭐ {restaurant.rating}
                            </option>
                          ))}
                        </select>
                        {errors.restaurantId && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle /> {errors.restaurantId.message}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Date */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="date"
                          {...register('date', {
                            required: 'Date is required',
                            validate: (value) => {
                              const selected = new Date(value);
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return selected >= today || 'Date cannot be in the past';
                            },
                          })}
                          min={today}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 border ${
                            errors.date ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                          } focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all`}
                        />
                        {errors.date && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle /> {errors.date.message}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Time */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Time <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <select
                          {...register('time', {
                            required: 'Time is required',
                          })}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 border ${
                            errors.time ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                          } focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all appearance-none`}
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot} disabled={!isTimeSlotAvailable(slot)}>
                              {slot} {!isTimeSlotAvailable(slot) && '(Unavailable)'}
                            </option>
                          ))}
                        </select>
                        {errors.time && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle /> {errors.time.message}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Guests */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Number of Guests <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="number"
                          {...register('guests', {
                            required: 'Number of guests is required',
                            min: { value: 1, message: 'Minimum 1 guest' },
                            max: { value: 20, message: 'Maximum 20 guests' },
                            valueAsNumber: true,
                          })}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 border ${
                            errors.guests ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                          } focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all`}
                          min="1"
                          max="20"
                        />
                        {errors.guests && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle /> {errors.guests.message}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Seating */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Seating Preference <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <select
                          {...register('seating', {
                            required: 'Please select seating preference',
                          })}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 border ${
                            errors.seating ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                          } focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all appearance-none`}
                        >
                          {seatingOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.seating && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <FiAlertCircle /> {errors.seating.message}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Occasion */}
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Special Occasion
                      </label>
                      <div className="relative group">
                        <FiStar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <select
                          {...register('occasion')}
                          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all appearance-none"
                        >
                          {occasionOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        trigger(['restaurantId', 'date', 'time', 'guests', 'seating']);
                        if (!errors.restaurantId && !errors.date && !errors.time && !errors.guests && !errors.seating) {
                          setStep(3);
                        }
                      }}
                      className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all"
                    >
                      Next Step →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Table Selection & Confirm */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                    <FiCheck className="text-orange-500" />
                    Select Table & Confirm
                  </h2>

                  {/* Table Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Available Tables
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availableTables.map((table) => (
                        <motion.div
                          key={table.id}
                          whileHover={table.status === 'available' ? { scale: 1.02 } : {}}
                          onClick={() => handleTableSelect(table)}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedTable?.id === table.id
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/20'
                              : table.status === 'available'
                              ? 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                              : 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-center">
                            <p className="font-bold text-gray-800 dark:text-white">{table.number}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {table.capacity} guests
                            </p>
                            {table.type === 'VIP' && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold">
                                VIP
                              </span>
                            )}
                            <p className={`text-xs font-medium ${
                              table.status === 'available' ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {table.status === 'available' ? 'Available' : 'Reserved'}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    {!selectedTable && (
                      <p className="text-sm text-yellow-500 mt-2">Please select a table</p>
                    )}
                  </div>

                  {/* Special Instructions */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Special Instructions
                    </label>
                    <div className="relative group">
                      <FiMessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <textarea
                        {...register('specialInstructions')}
                        rows="3"
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                        placeholder="Any special requests? (e.g., dietary restrictions, allergies, special arrangements...)"
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !selectedTable}
                      className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Booking...
                        </>
                      ) : (
                        <>
                          <FiSend className="w-5 h-5" />
                          Confirm Booking
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400"
          >
            <p>By booking, you agree to our Terms of Service and Privacy Policy</p>
            <p className="mt-1">© 2024 FoodDelivery. All rights reserved.</p>
          </motion.div>
        </motion.div>

        {/* Booking Confirmation Modal */}
        <AnimatePresence>
          {showConfirmation && bookingData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4"
                  >
                    <FiCheckCircle className="text-4xl text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Booking Confirmed! 🎉
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Your table has been booked successfully
                  </p>

                  <div className="glass-card rounded-2xl p-4 text-left mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Booking ID</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {bookingData.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Status</p>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-semibold">
                          <FiCheckCircle className="w-3 h-3" /> Confirmed
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Table</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {bookingData.tableNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Guests</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {bookingData.guests}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Date</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {bookingData.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Time</p>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {bookingData.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center">
                    <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all">
                      <FiDownload className="inline mr-2" /> Download Receipt
                    </button>
                    <button
                      onClick={() => {
                        setShowConfirmation(false);
                        navigate('/bookings');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      View Bookings
                    </button>
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="px-6 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
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
    </MainLayout>
  );
};

export default BookingForm;