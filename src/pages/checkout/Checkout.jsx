import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
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
  FiEyeOff,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiHeart,
  FiStar,
  FiAward,
  FiGift,
  FiTag,
  FiPercent,
  FiRefreshCw,
  FiDownload,
  FiPrinter
} from 'react-icons/fi';
import { 
  FaGooglePay, 
  FaApplePay, 
  FaPaypal, 
  FaWallet,
  FaCreditCard,
  FaUniversity,
  FaUtensils
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, itemCount, getSubtotal, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
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

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !isSuccess) {
      navigate('/cart');
    }
  }, [cartItems, navigate, isSuccess]);

  // Auto-calculate delivery fee
  const getDeliveryFee = () => {
    const subtotal = getSubtotal();
    switch(selectedDelivery) {
      case 'express':
        return 4.99;
      case 'scheduled':
        return 2.99;
      default:
        return subtotal > 50 ? 0 : 3.99;
    }
  };

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const tax = subtotal * 0.08;
  const total = getTotal();

  const onSubmit = async (data) => {
    setLoading(true);
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
        discount,
        couponCode: couponApplied ? couponCode : null,
        orderDate: new Date().toISOString(),
        orderId: `ORD-${Date.now()}`,
        status: 'confirmed'
      };

      setOrderPlaced(orderData);
      setIsSuccess(true);
      clearCart();
      toast.success('🎉 Order placed successfully!');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('Order error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    // Simulate coupon validation
    if (couponCode.toUpperCase() === 'SAVE20') {
      setDiscount(subtotal * 0.2);
      setCouponApplied(true);
      toast.success('Coupon applied successfully!');
    } else if (couponCode.toUpperCase() === 'FIRST10') {
      setDiscount(subtotal * 0.1);
      setCouponApplied(true);
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code');
    }
    setShowCoupon(false);
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setDiscount(0);
    setCouponCode('');
  };

  const deliveryOptions = [
    { 
      id: 'standard', 
      label: 'Standard Delivery', 
      icon: FiTruck, 
      time: '25-35 min',
      fee: 'Free',
      description: 'Free delivery on orders above $50'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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
            Order Placed Successfully!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Thank you for your order. We'll notify you when it's ready.
          </p>
          <p className="text-sm font-semibold text-orange-500 mb-6">
            Order ID: {orderPlaced?.orderId}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/orders">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
              >
                View Orders
              </motion.button>
            </Link>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Continue Shopping
              </motion.button>
            </Link>
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
              <FiPackage className="text-orange-500" />
              Checkout
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Complete your order and enjoy your meal
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep} of 2
            </span>
            <div className="flex gap-1">
              <div className={`w-8 h-1 rounded-full ${currentStep >= 1 ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
              <div className={`w-8 h-1 rounded-full ${currentStep >= 2 ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="glass-card rounded-3xl p-6 md:p-8"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Delivery Details */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiMapPin className="text-orange-500" />
                    Delivery Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="text"
                          {...register('name', {
                            required: 'Full name is required',
                            minLength: { value: 2, message: 'Name must be at least 2 characters' }
                          })}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${errors.name ? 'food-input-error' : ''}`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="error-text mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
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
                          <p className="error-text mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
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
                          <p className="error-text mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Delivery Address <span className="text-red-500">*</span>
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
                          <p className="error-text mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <FiGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="text"
                          {...register('city', { required: 'City is required' })}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${errors.city ? 'food-input-error' : ''}`}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="error-text mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <FiGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                          type="text"
                          {...register('state', { required: 'State is required' })}
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${errors.state ? 'food-input-error' : ''}`}
                          placeholder="NY"
                        />
                        {errors.state && (
                          <p className="error-text mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
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
                          <p className="error-text mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.pincode.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
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
                    </div>
                  </div>
                </motion.div>

                {/* Step 2: Delivery Options */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiTruck className="text-orange-500" />
                    Delivery Options
                  </h2>
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
                </motion.div>

                {/* Step 3: Payment Method */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiCreditCard className="text-orange-500" />
                    Payment Method
                  </h2>
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
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link to="/cart">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FiArrowLeft className="w-5 h-5" />
                      Back to Cart
                    </motion.button>
                  </Link>
                  <motion.button
                    type="submit"
                    disabled={loading || !isValid}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
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
                </motion.div>

                {/* Security Badges */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
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
                </motion.div>
              </form>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-xl flex-shrink-0">
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
                    <span className="text-sm font-bold text-orange-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg text-gray-800 dark:text-white">
                  <span>Total</span>
                  <span className="text-orange-500">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon */}
              {!couponApplied ? (
                <div className="mt-4">
                  <button
                    onClick={() => setShowCoupon(!showCoupon)}
                    className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1"
                  >
                    <FiTag className="w-4 h-4" />
                    Apply Coupon
                  </button>
                  <AnimatePresence>
                    {showCoupon && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-2"
                      >
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className="flex-1 px-3 py-2 rounded-xl food-input text-sm"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                          >
                            Apply
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30">
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />
                    <div>
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                        Coupon Applied!
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-300">
                        Saved ${discount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-green-500 hover:text-green-600 transition-colors"
                  >
                    <FiXCircle className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;