// src/pages/booking/BookingForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiClock,
  FiUsers,
  FiMapPin,
  FiGift,
  FiTag,
  FiCreditCard,
  FiDollarSign,
  FiLock,
  FiShield,
  FiSend,
  FiArrowRight,
  FiArrowLeft,
} from 'react-icons/fi';
import { FaBirthdayCake, FaHeart, FaBriefcase, FaUsers, FaStar } from 'react-icons/fa';

// ============================================
// SUB-COMPONENTS
// ============================================

const FormInput = ({ icon: Icon, label, name, register, errors, placeholder, type = 'text', required = false, className = '' }) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
        <input
          type={type}
          {...register(name, { required: required ? `${label} is required` : false })}
          className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${
            errors[name] ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
          } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
          placeholder={placeholder}
        />
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-500 mt-1 flex items-center gap-1"
          >
            <FiAlertCircle className="w-3 h-3" /> {errors[name].message}
          </motion.p>
        )}
      </div>
    </div>
  );
};

const FormSelect = ({ icon: Icon, label, name, register, errors, options, required = false }) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
        <select
          {...register(name, { required: required ? `${label} is required` : false })}
          className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${
            errors[name] ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
          } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300 appearance-none`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-500 mt-1 flex items-center gap-1"
          >
            <FiAlertCircle className="w-3 h-3" /> {errors[name].message}
          </motion.p>
        )}
      </div>
    </div>
  );
};

const FormTextArea = ({ icon: Icon, label, name, register, errors, placeholder, rows = 3 }) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
        <textarea
          {...register(name)}
          rows={rows}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300 resize-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

// ============================================
// MAIN BOOKING FORM
// ============================================
const BookingForm = ({ 
  onSubmit, 
  isLoading = false,
  onBack,
  step = 1,
  totalSteps = 3,
}) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('card');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      occasion: '',
      specialRequests: '',
      dietaryPreferences: '',
      allergyInfo: '',
      paymentMethod: 'card',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
    },
  });

  const watchedFields = watch();

  const occasionOptions = [
    { value: 'birthday', label: '🎂 Birthday' },
    { value: 'anniversary', label: '❤️ Anniversary' },
    { value: 'date-night', label: '💕 Date Night' },
    { value: 'family-dinner', label: '👨‍👩‍👧‍👦 Family Dinner' },
    { value: 'business', label: '💼 Business Meeting' },
    { value: 'friends', label: '👥 Friends Gathering' },
    { value: 'celebration', label: '🎉 Celebration' },
    { value: 'other', label: '⭐ Other' },
  ];

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: FiCreditCard },
    { id: 'upi', label: 'UPI', icon: FiDollarSign },
    { id: 'wallet', label: 'Wallet', icon: FiTag },
    { id: 'cod', label: 'Pay at Restaurant', icon: FiDollarSign },
  ];

  const handleNext = async () => {
    const fields = ['name', 'phone'];
    const isValid = await trigger(fields);
    if (isValid) {
      setShowPayment(true);
    }
  };

  const handleBack = () => {
    setShowPayment(false);
    if (onBack) onBack();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Step 1: Personal Information */}
      {!showPayment && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 font-bold text-sm">
              1
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              icon={FiUser}
              label="Full Name"
              name="name"
              register={register}
              errors={errors}
              placeholder="John Doe"
              required={true}
            />

            <FormInput
              icon={FiMail}
              label="Email Address"
              name="email"
              register={register}
              errors={errors}
              placeholder="you@example.com"
              type="email"
            />

            <FormInput
              icon={FiPhone}
              label="Phone Number"
              name="phone"
              register={register}
              errors={errors}
              placeholder="9876543210"
              type="tel"
              required={true}
              className="md:col-span-2"
            />
          </div>

          <FormSelect
            icon={FaStar}
            label="Occasion"
            name="occasion"
            register={register}
            errors={errors}
            options={occasionOptions}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormTextArea
              icon={FiMessageSquare}
              label="Special Requests"
              name="specialRequests"
              register={register}
              errors={errors}
              placeholder="Any special requests?"
              rows={2}
            />

            <FormTextArea
              icon={FiAlertCircle}
              label="Dietary Preferences / Allergies"
              name="dietaryPreferences"
              register={register}
              errors={errors}
              placeholder="Any dietary restrictions or allergies?"
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <FiArrowLeft className="inline mr-2" /> Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
            >
              Continue <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Payment */}
      {showPayment && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 font-bold text-sm">
              2
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Payment Details
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedPayment === method.id;
              return (
                <motion.button
                  key={method.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`p-3 rounded-2xl border-2 transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-orange-500' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium ${isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-600 dark:text-gray-300'}`}>
                    {method.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {selectedPayment === 'card' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="relative">
                    <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      {...register('cardNumber')}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        {...register('cardExpiry')}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        {...register('cardCvv')}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300"
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <FiArrowLeft className="inline mr-2" /> Back
            </button>
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FiLock className="w-5 h-5" />
                  Confirm Booking
                  <FiSend className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <FiShield className="w-3 h-3 text-green-500" />
              Secure Payment
            </span>
            <span className="flex items-center gap-1">
              <FiLock className="w-3 h-3 text-blue-500" />
              100% Safe
            </span>
          </div>
        </motion.div>
      )}
    </form>
  );
};

export default BookingForm;