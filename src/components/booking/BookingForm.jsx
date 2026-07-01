import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
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
  FiCoffee
} from 'react-icons/fi';
import { 
  FaUtensils, 
  FaBirthdayCake, 
  FaHeart, 
  FaBriefcase, 
  FaUsers,
  FaLeaf
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      restaurantId: '',
      date: '',
      time: '',
      guests: 1,
      seating: 'indoor',
      occasion: 'family-dinner',
      specialInstructions: '',
    },
  });

  const selectedDate = watch('date');
  const selectedGuests = watch('guests');

  useEffect(() => {
    // Mock API call to fetch restaurants
    const fetchRestaurants = async () => {
      try {
        // Simulate API response
        const mockRestaurants = [
          { id: '1', name: 'The Royal Kitchen', cuisine: 'Indian', rating: 4.8, image: '🍛' },
          { id: '2', name: 'Pizza Paradise', cuisine: 'Italian', rating: 4.6, image: '🍕' },
          { id: '3', name: 'Sushi World', cuisine: 'Japanese', rating: 4.9, image: '🍣' },
          { id: '4', name: 'Burger House', cuisine: 'American', rating: 4.5, image: '🍔' },
          { id: '5', name: 'Thai Spice', cuisine: 'Thai', rating: 4.7, image: '🥘' },
          { id: '6', name: 'Mexican Fiesta', cuisine: 'Mexican', rating: 4.4, image: '🌮' },
        ];
        setRestaurants(mockRestaurants);
      } catch (error) {
        toast.error('Failed to load restaurants');
      }
    };
    fetchRestaurants();
  }, []);

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success response
      toast.success('🎉 Table booked successfully!');
      setFormSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        reset();
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
    { value: 'other', label: 'Other', icon: FiStar },
  ];

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden bg-gradient-to-br from-orange-50/50 via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div>
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
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                        maxLength: {
                          value: 50,
                          message: 'Name must be less than 50 characters',
                        },
                      })}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${
                        errors.name ? 'food-input-error' : ''
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="error-text mt-1"
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </motion.p>
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
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${
                        errors.email ? 'food-input-error' : ''
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="error-text mt-1"
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                {/* Mobile Number */}
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
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${
                        errors.phone ? 'food-input-error' : ''
                      }`}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="error-text mt-1"
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.phone.message}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Booking Details Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <FaUtensils className="text-orange-500" />
                Booking Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Restaurant Name */}
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
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input appearance-none ${
                        errors.restaurantId ? 'food-input-error' : ''
                      }`}
                    >
                      <option value="">Select a restaurant</option>
                      {restaurants.map((restaurant) => (
                        <option key={restaurant.id} value={restaurant.id}>
                          {restaurant.image} {restaurant.name} ({restaurant.cuisine}) ⭐ {restaurant.rating}
                        </option>
                      ))}
                    </select>
                    {errors.restaurantId && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="error-text mt-1"
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.restaurantId.message}
                      </motion.p>
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
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${
                        errors.date ? 'food-input-error' : ''
                      }`}
                    />
                    {errors.date && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="error-text mt-1"
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.date.message}
                      </motion.p>
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
                    <input
                      type="time"
                      {...register('time', {
                        required: 'Time is required',
                      })}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${
                        errors.time ? 'food-input-error' : ''
                      }`}
                    />
                    {errors.time && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="error-text mt-1"
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.time.message}
                      </motion.p>
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
                        min: {
                          value: 1,
                          message: 'Minimum 1 guest required',
                        },
                        max: {
                          value: 20,
                          message: 'Maximum 20 guests allowed',
                        },
                        valueAsNumber: true,
                      })}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${
                        errors.guests ? 'food-input-error' : ''
                      }`}
                      placeholder="2"
                      min="1"
                      max="20"
                    />
                    {errors.guests && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="error-text mt-1"
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.guests.message}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Seating & Occasion Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <FiMapPin className="text-orange-500" />
                Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Seating Preference */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Seating Preference <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <select
                      {...register('seating', {
                        required: 'Please select a seating preference',
                      })}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input appearance-none ${
                        errors.seating ? 'food-input-error' : ''
                      }`}
                    >
                      {seatingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.seating && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="error-text mt-1"
                      >
                        <FiAlertCircle className="w-4 h-4" />
                        {errors.seating.message}
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                {/* Special Occasion */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Special Occasion
                  </label>
                  <div className="relative group">
                    <FiStar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <select
                      {...register('occasion')}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl food-input appearance-none"
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
            </div>

            {/* Special Instructions */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Special Instructions
              </label>
              <div className="relative group">
                <FiMessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <textarea
                  {...register('specialInstructions')}
                  rows="4"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl food-input resize-none"
                  placeholder="Any special requests? (e.g., dietary restrictions, allergies, special arrangements...)"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                type="submit"
                disabled={isLoading || !isValid}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-4 rounded-2xl food-gradient-bg text-white font-semibold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    Book Now
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                onClick={() => reset()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold transition-all duration-300"
              >
                Reset
              </motion.button>
            </motion.div>

            {/* Form Status */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700"
            >
              <span>
                {isDirty ? '🟢 Form has changes' : '⚪ No changes'}
              </span>
              <span>
                {isValid ? '✅ All fields valid' : '⚠️ Please fill all required fields'}
              </span>
            </motion.div>
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
    </div>
  );
};

export default BookingForm;