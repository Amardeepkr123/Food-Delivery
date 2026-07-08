// src/components/checkout/CheckoutForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  FiShoppingBag,
  FiGift,
  FiTag,
  FiAward,
  FiTrendingUp,
  FiLoader,
  FiInfo,
  FiX,
} from 'react-icons/fi';
import { 
  FaGooglePay, 
  FaApplePay, 
  FaPaypal, 
  FaWallet,
  FaCreditCard,
  FaUniversity,
  FaAmazonPay,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useCartContext } from '../../context/CartContext';

// ============================================
// SUB-COMPONENTS
// ============================================

// Success Screen
const SuccessScreen = ({ orderData, onContinue }) => {
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
        Order ID: {orderData?.orderId}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onContinue('/orders')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
        >
          View Orders
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onContinue('/')}
          className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
        >
          Continue Shopping
        </motion.button>
      </div>
    </motion.div>
  );
};

// Card Details Form
const CardDetails = ({ register, errors }) => {
  return (
    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Card Number
          </label>
          <input
            type="text"
            {...register('cardNumber', {
              required: 'Card number is required',
              pattern: {
                value: /^[0-9]{16}$/,
                message: 'Please enter a valid 16-digit card number',
              },
            })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.cardNumber ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
            } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          {errors.cardNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.cardNumber.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            {...register('cardName', {
              required: 'Cardholder name is required',
            })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.cardName ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
            } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
            placeholder="John Doe"
          />
          {errors.cardName && (
            <p className="text-xs text-red-500 mt-1">{errors.cardName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            {...register('cardExpiry', {
              required: 'Expiry date is required',
              pattern: {
                value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                message: 'Please enter a valid expiry date (MM/YY)',
              },
            })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.cardExpiry ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
            } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
            placeholder="MM/YY"
            maxLength={5}
          />
          {errors.cardExpiry && (
            <p className="text-xs text-red-500 mt-1">{errors.cardExpiry.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            CVV
          </label>
          <input
            type="password"
            {...register('cardCvv', {
              required: 'CVV is required',
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: 'Please enter a valid CVV',
              },
            })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.cardCvv ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
            } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
            placeholder="•••"
            maxLength={4}
          />
          {errors.cardCvv && (
            <p className="text-xs text-red-500 mt-1">{errors.cardCvv.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Delivery Option Card
const DeliveryOption = ({ option, isSelected, onSelect }) => {
  const Icon = option.icon;
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(option.id)}
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
          <p className="text-xs text-gray-500 dark:text-gray-400">{option.time}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{option.description}</p>
      <p className={`text-sm font-bold mt-1 ${isSelected ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300'}`}>
        {option.fee}
      </p>
    </motion.button>
  );
};

// Payment Method Button
const PaymentMethodButton = ({ method, isSelected, onSelect }) => {
  const Icon = method.icon;
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(method.id)}
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
};

// ============================================
// MAIN CHECKOUT FORM
// ============================================
const CheckoutForm = ({ 
  cartItems = [], 
  subtotal = 0, 
  onSuccess, 
  onBack,
  isLoading: parentLoading = false,
  className = '',
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
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
      cardName: '',
    },
  });

  // Auto-fill user data
  useEffect(() => {
    if (user) {
      setValue('name', user.name || '');
      setValue('email', user.email || '');
    }
  }, [user, setValue]);

  // Calculate delivery fee
  const getDeliveryFee = () => {
    switch (selectedDelivery) {
      case 'express':
        return 4.99;
      case 'scheduled':
        return 2.99;
      default:
        return subtotal > 50 ? 0 : 2.99;
    }
  };

  const deliveryFee = getDeliveryFee();
  const tax = subtotal * 0.08;
  const total = subtotal - discount + deliveryFee + tax;

  const deliveryOptions = [
    { 
      id: 'standard', 
      label: 'Standard Delivery', 
      icon: FiTruck, 
      time: '25-35 min',
      fee: subtotal > 50 ? '$0.00' : '$2.99',
      description: subtotal > 50 ? 'Free delivery' : 'Standard delivery fee'
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
    { id: 'wallet', label: 'Wallet', icon: FaWallet },
    { id: 'amazon', label: 'Amazon Pay', icon: FaAmazonPay },
  ];

  // Handle coupon apply
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE20') {
      setDiscount(subtotal * 0.2);
      toast.success('Coupon applied! You saved 20% 🎉');
    } else if (couponCode.toUpperCase() === 'FIRST10') {
      setDiscount(subtotal * 0.1);
      toast.success('Coupon applied! You saved 10% 🎉');
    } else if (couponCode.toUpperCase() === 'FREE50') {
      if (subtotal >= 100) {
        setDiscount(50);
        toast.success('Coupon applied! You saved $50 🎉');
      } else {
        toast.error('Minimum order of $100 required');
      }
    } else {
      toast.error('Invalid coupon code');
    }
    setCouponCode('');
  };

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setDiscount(0);
    toast.info('Coupon removed');
  };

  // Handle form submit
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const order = {
        ...data,
        items: cartItems,
        subtotal,
        deliveryFee,
        tax,
        discount,
        total,
        orderDate: new Date().toISOString(),
        orderId: `ORD-${Date.now()}`,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 1800000).toISOString(),
      };

      setOrderData(order);
      setIsSuccess(true);
      
      // Clear cart after success
      if (clearCart) {
        clearCart();
      }
      
      toast.success('🎉 Order placed successfully!');
      
      if (onSuccess) {
        setTimeout(() => onSuccess(order), 2000);
      }
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('Order error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle continue
  const handleContinue = (path) => {
    navigate(path);
  };

  // Container variants
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

  // Success state
  if (isSuccess) {
    return <SuccessScreen orderData={orderData} onContinue={handleContinue} />;
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Add some items to your cart before checking out.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
        >
          Browse Restaurants
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full max-w-6xl mx-auto ${className}`}
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
                        })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${
                          errors.name ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                        } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" /> {errors.name.message}
                        </p>
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
                            message: 'Invalid email address',
                          },
                        })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${
                          errors.email ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                        } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" /> {errors.email.message}
                        </p>
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
                            message: 'Please enter a valid 10-digit phone number',
                          },
                        })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${
                          errors.phone ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                        } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
                        placeholder="9876543210"
                        maxLength={10}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" /> {errors.phone.message}
                        </p>
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
                          minLength: { value: 10, message: 'Address must be at least 10 characters' },
                        })}
                        rows="2"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${
                          errors.address ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                        } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300 resize-none`}
                        placeholder="123 Main Street, Apartment 4B"
                      />
                      {errors.address && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" /> {errors.address.message}
                        </p>
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
                        {...register('city', { required: 'City is required' })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${
                          errors.city ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                        } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" /> {errors.city.message}
                        </p>
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
                        {...register('state', { required: 'State is required' })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${
                          errors.state ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                        } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
                        placeholder="NY"
                      />
                      {errors.state && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" /> {errors.state.message}
                        </p>
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
                            message: 'Please enter a valid pincode',
                          },
                        })}
                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border ${
                          errors.pincode ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                        } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
                        placeholder="10001"
                      />
                      {errors.pincode && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" /> {errors.pincode.message}
                        </p>
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
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300 resize-none"
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
                  {deliveryOptions.map((option) => (
                    <DeliveryOption
                      key={option.id}
                      option={option}
                      isSelected={selectedDelivery === option.id}
                      onSelect={(id) => {
                        setSelectedDelivery(id);
                        setValue('deliveryType', id);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  <FiCreditCard className="text-orange-500" />
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <PaymentMethodButton
                      key={method.id}
                      method={method}
                      isSelected={selectedPayment === method.id}
                      onSelect={(id) => {
                        setSelectedPayment(id);
                        setValue('paymentMethod', id);
                        setShowCardDetails(id === 'card');
                      }}
                    />
                  ))}
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
                      <CardDetails register={register} errors={errors} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Coupon Section */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowCouponInput(!showCouponInput)}
                  className="flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <FiTag className="w-4 h-4" />
                  {showCouponInput ? 'Hide coupon' : 'Apply coupon'}
                </button>

                <AnimatePresence>
                  {showCouponInput && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-2"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Enter coupon code"
                          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300 text-sm"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={handleApplyCoupon}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                        >
                          Apply
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {discount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-2 flex items-center gap-2 p-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30"
                  >
                    <FiCheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-700 dark:text-green-400">
                      Coupon applied! You saved ${discount.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="ml-auto p-1 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                    >
                      <FiX className="w-4 h-4 text-green-500" />
                    </button>
                  </motion.div>
                )}
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
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
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
                      <FiLoader className="w-5 h-5 animate-spin" />
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
                      {item.quantity} × ${item.price.toFixed(2)}
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
              {discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
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

            {/* Estimated delivery */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FiClock className="w-4 h-4 text-orange-500" />
                <span>Estimated delivery: {selectedDelivery === 'express' ? '15-20 min' : '25-35 min'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutForm;