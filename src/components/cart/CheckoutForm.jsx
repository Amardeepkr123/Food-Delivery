import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiHome, 
  FiGrid, 
  FiHash,
  FiMessageSquare,
  FiCreditCard,
  FiDollarSign,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiAlertCircle,
  FiLock,
  FiShield,
  FiArrowRight,
  FiArrowLeft,
  FiPackage,
  FiCalendar,
  FiZap,
  FiSmartphone,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';
import { 
  FaGooglePay, 
  FaApplePay, 
  FaPaypal, 
  FaWallet,
  FaCreditCard,
  FaUniversity
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckoutForm = ({ 
  cartItems = [], 
  subtotal = 0, 
  onSuccess, 
  onBack,
  isLoading: parentLoading = false 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [showCardDetails, setShowCardDetails] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    setValue,
    trigger,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      instructions: '',
      paymentMethod: 'cod',
      deliveryType: 'standard',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardName: ''
    }
  });

  const watchedFields = watch();

  // Auto-calculate delivery fee based on delivery type
  const getDeliveryFee = () => {
    switch(selectedDelivery) {
      case 'express':
        return 4.99;
      case 'scheduled':
        return 2.99;
      default:
        return 0;
    }
  };

  const deliveryFee = getDeliveryFee();
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        ...data,
        items: cartItems,
        subtotal,
        deliveryFee,
        tax,
        total,
        orderDate: new Date().toISOString(),
        orderId: `ORD-${Date.now()}`,
        status: 'confirmed'
      };

      setOrderPlaced(orderData);
      setIsSuccess(true);
      toast.success('🎉 Order placed successfully!');
      
      setTimeout(() => {
        onSuccess?.(orderData);
      }, 2000);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('Order error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deliveryOptions = [
    { 
      id: 'standard', 
      label: 'Standard Delivery', 
      icon: FiTruck, 
      time: '25-35 min',
      fee: '$0.00',
      description: 'Free delivery on all orders'
    },
    { 
      id: 'express', 
      label: 'Express Delivery', 
      icon: FiZap, 
      time: '15-20 min',
      fee: '$4.99',
      description: 'Priority delivery'
    },
    { 
      id: 'scheduled', 
      label: 'Schedule Delivery', 
      icon: FiCalendar, 
      time: 'Choose time',
      fee: '$2.99',
      description: 'Deliver at your convenience'
    }
  ];

  const paymentMethods = [
    { id: 'cod', label: 'Cash on Delivery', icon: FiDollarSign },
    { id: 'upi', label: 'UPI', icon: FaGooglePay },
    { id: 'card', label: 'Credit/Debit Card', icon: FaCreditCard },
    { id: 'netbanking', label: 'Net Banking', icon: FaUniversity },
    { id: 'wallet', label: 'Wallet', icon: FaWallet }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto"
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
          Order Placed Successfully!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          Thank you for your order. We'll notify you when it's ready.
        </p>
        <p className="text-sm font-semibold text-orange-500 mb-6">
          Order ID: {orderPlaced?.orderId}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/orders'}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
          >
            View Orders
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          >
            Continue Shopping
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
              <FiPackage className="text-orange-500" />
              Checkout
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Customer Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  <FiUser className="text-orange-500" />
                  Customer Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          maxLength: { value: 50, message: 'Name must be less than 50 characters' }
                        })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${errors.name ? 'food-input-error' : ''}`}
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
                            message: 'Invalid email address'
                          }
                        })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${errors.email ? 'food-input-error' : ''}`}
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

                  <motion.div variants={itemVariants} className="space-y-1.5 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="tel"
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Please enter a valid 10-digit phone number'
                          }
                        })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${errors.phone ? 'food-input-error' : ''}`}
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

              {/* Delivery Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  <FiMapPin className="text-orange-500" />
                  Delivery Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="space-y-1.5 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <FiHome className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <textarea
                        {...register('address', {
                          required: 'Address is required',
                          minLength: { value: 10, message: 'Address must be at least 10 characters' }
                        })}
                        rows="2"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input resize-none ${errors.address ? 'food-input-error' : ''}`}
                        placeholder="123 Main Street, Apartment 4B"
                      />
                      {errors.address && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="error-text mt-1"
                        >
                          <FiAlertCircle className="w-4 h-4" />
                          {errors.address.message}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <FiGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="text"
                        {...register('city', {
                          required: 'City is required'
                        })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${errors.city ? 'food-input-error' : ''}`}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="error-text mt-1"
                        >
                          <FiAlertCircle className="w-4 h-4" />
                          {errors.city.message}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      State <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <FiGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="text"
                        {...register('state', {
                          required: 'State is required'
                        })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${errors.state ? 'food-input-error' : ''}`}
                        placeholder="NY"
                      />
                      {errors.state && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="error-text mt-1"
                        >
                          <FiAlertCircle className="w-4 h-4" />
                          {errors.state.message}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="text"
                        {...register('pincode', {
                          required: 'Pincode is required',
                          pattern: {
                            value: /^[0-9]{5,6}$/,
                            message: 'Please enter a valid pincode'
                          }
                        })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${errors.pincode ? 'food-input-error' : ''}`}
                        placeholder="10001"
                      />
                      {errors.pincode && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="error-text mt-1"
                        >
                          <FiAlertCircle className="w-4 h-4" />
                          {errors.pincode.message}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Delivery Instructions
                    </label>
                    <div className="relative group">
                      <FiMessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <textarea
                        {...register('instructions')}
                        rows="2"
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl food-input resize-none"
                        placeholder="Gate code, landmark, or special delivery instructions..."
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Delivery Options */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  <FiTruck className="text-orange-500" />
                  Delivery Options
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {deliveryOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedDelivery === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedDelivery(option.id);
                          setValue('deliveryType', option.id);
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
                            : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className={`font-semibold ${isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'}`}>
                              {option.label}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {option.time}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{option.description}</p>
                        <p className={`text-sm font-bold mt-1 ${isSelected ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300'}`}>
                          {option.fee}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  <FiCreditCard className="text-orange-500" />
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedPayment === method.id;
                    return (
                      <motion.button
                        key={method.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedPayment(method.id);
                          setValue('paymentMethod', method.id);
                          if (method.id === 'card') {
                            setShowCardDetails(true);
                          } else {
                            setShowCardDetails(false);
                          }
                        }}
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

                {/* Card Details */}
                <AnimatePresence>
                  {showCardDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              {...register('cardNumber')}
                              className="w-full px-4 py-3 rounded-xl food-input"
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              {...register('cardName')}
                              className="w-full px-4 py-3 rounded-xl food-input"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              {...register('cardExpiry')}
                              className="w-full px-4 py-3 rounded-xl food-input"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              CVV
                            </label>
                            <input
                              type="password"
                              {...register('cardCvv')}
                              className="w-full px-4 py-3 rounded-xl food-input"
                              placeholder="•••"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Order Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-gray-800 dark:text-white">
                    <span>Total</span>
                    <span className="text-orange-500">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBack}
                  className="px-6 py-3.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiArrowLeft className="w-5 h-5" />
                  Back to Cart
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={isLoading || !isValid || parentLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <FiLock className="w-5 h-5" />
                      Place Order
                      <FiArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>

              {/* Security Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FiLock className="w-3 h-3 text-green-500" />
                  Secure Payment
                </span>
                <span className="flex items-center gap-1">
                  <FiShield className="w-3 h-3 text-blue-500" />
                  100% Safe
                </span>
                <span className="flex items-center gap-1">
                  <FiCheckCircle className="w-3 h-3 text-orange-500" />
                  Quality Guaranteed
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-3xl p-6 sticky top-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiShoppingBag className="text-orange-500" />
              Your Order
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-2xl flex-shrink-0">
                    {item.image || '🍽️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.quantity} × ${item.price}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-800 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Delivery</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg text-gray-800 dark:text-white">
                <span>Total</span>
                <span className="text-orange-500">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutForm;