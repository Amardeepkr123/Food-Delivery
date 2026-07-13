// src/pages/checkout/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiHome, FiGrid, FiHash,
  FiMessageSquare, FiCreditCard, FiDollarSign, FiClock, FiTruck,
  FiCheckCircle, FiAlertCircle, FiLock, FiShield, FiArrowRight,
  FiArrowLeft, FiPackage, FiCalendar, FiZap, FiSmartphone,
  FiPlus, FiTag, FiX, FiInfo, FiGift, FiStar, FiAward,
  FiEdit2, FiTrash2, FiHeart, FiLoader,
} from 'react-icons/fi';
import { FaLeaf, FaUtensils, FaWallet, FaGooglePay, FaUniversity } from 'react-icons/fa';
import { toast } from 'react-toastify';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { useCartContext } from '../../context/CartContext';
import { useOrderContext } from '../../context/OrderContext';
import { couponService } from '../../services/couponService';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    cartItems, 
    itemCount, 
    getSubtotal, 
    getTotal, 
    clearCart,
    updateQuantity,
    removeFromCart,
  } = useCartContext();
  const { createOrder } = useOrderContext();

  const [loading, setLoading] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
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
      deliveryType: 'standard',
    }
  });

  const watchedFields = watch();

  // Fetch saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await addressService.getAddresses();
        setSavedAddresses(response.data || []);
        const defaultAddr = response.data?.find(addr => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddress(defaultAddr);
          setIsAddressValid(true);
          setValue('address', defaultAddr.address);
          setValue('city', defaultAddr.city);
          setValue('state', defaultAddr.state);
          setValue('pincode', defaultAddr.pincode);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Calculate delivery fee
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
  const platformFee = 1.99;
  const packagingFee = 0.99;
  const total = subtotal + tax + deliveryFee + platformFee + packagingFee - couponDiscount;
  const grandTotal = total + tipAmount;

  // Get delivery time
  const getDeliveryTime = () => {
    switch(selectedDelivery) {
      case 'express':
        return '15-20 min';
      case 'scheduled':
        return 'Choose time';
      default:
        return '25-35 min';
    }
  };

  // Apply coupon
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    try {
      const response = await couponService.validateCoupon(couponCode, subtotal);
      if (response.success) {
        setAppliedCoupon(response.coupon);
        setCouponDiscount(response.discount);
        toast.success('Coupon applied successfully!');
        setShowCoupon(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid coupon code');
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode('');
  };

  // Select address
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setIsAddressValid(true);
    setValue('address', address.address);
    setValue('city', address.city);
    setValue('state', address.state);
    setValue('pincode', address.pincode);
  };

  // Proceed to payment
  const onSubmit = async (data) => {
    if (!selectedAddress && !data.address) {
      toast.error('Please add a delivery address');
      return;
    }

    setLoading(true);
    try {
      // Prepare order data
      const orderData = {
        ...data,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          customizations: item.customizations || {},
        })),
        subtotal,
        deliveryFee,
        tax,
        platformFee,
        packagingFee,
        couponDiscount,
        tipAmount,
        total: grandTotal,
        deliveryType: selectedDelivery,
        deliveryTime: getDeliveryTime(),
        address: selectedAddress || {
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
        instructions: data.instructions || deliveryInstructions,
        couponCode: appliedCoupon?.code || null,
        paymentMethod: 'pending', // Will be set on payment page
        restaurantId: cartItems[0]?.restaurantId,
        userId: user?.id,
        status: 'pending_payment',
      };

      // Save order data to session storage for payment page
      sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
      sessionStorage.setItem('orderGrandTotal', JSON.stringify(grandTotal));

      // Navigate to payment page
      navigate('/payment');
    } catch (error) {
      console.error('Error preparing order:', error);
      toast.error('Failed to prepare order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deliveryOptions = [
    { id: 'standard', label: 'Standard Delivery', icon: FiTruck, time: '25-35 min', fee: 'Free' },
    { id: 'express', label: 'Express Delivery', icon: FiZap, time: '15-20 min', fee: '$4.99' },
    { id: 'scheduled', label: 'Schedule Delivery', icon: FiCalendar, time: 'Choose time', fee: '$2.99' },
  ];

  const tipOptions = [0, 2, 5, 10, 'Custom'];

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
              Review your order and proceed to payment
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Step 1 of 2</span>
            <div className="flex gap-1">
              <div className="w-8 h-1 rounded-full bg-orange-500" />
              <div className="w-8 h-1 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-6 md:p-8"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Delivery Address */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiMapPin className="text-orange-500" />
                    Delivery Address
                  </h2>

                  {/* Saved Addresses */}
                  {savedAddresses.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {savedAddresses.map((addr) => (
                        <motion.button
                          key={addr.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectAddress(addr)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            selectedAddress?.id === addr.id
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
                              : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {addr.type === 'Home' ? 
                                <FiHome className="text-orange-500" /> : 
                                <FiBriefcase className="text-blue-500" />
                              }
                              <span className="font-semibold text-gray-800 dark:text-white">
                                {addr.type}
                              </span>
                              {addr.isDefault && (
                                <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-medium">
                                  Default
                                </span>
                              )}
                            </div>
                            {selectedAddress?.id === addr.id && (
                              <FiCheckCircle className="text-orange-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {addr.address}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Add New Address Button */}
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1"
                  >
                    <FiPlus className="w-4 h-4" />
                    {showAddAddress ? 'Cancel' : 'Add New Address'}
                  </button>

                  {/* New Address Form */}
                  <AnimatePresence>
                    {showAddAddress && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Address <span className="text-red-500">*</span>
                              </label>
                              <textarea
                                {...register('address', {
                                  required: !selectedAddress ? 'Address is required' : false,
                                  minLength: { value: 10, message: 'Address must be at least 10 characters' }
                                })}
                                className={`w-full px-4 py-3 rounded-xl food-input resize-none ${
                                  errors.address ? 'food-input-error' : ''
                                }`}
                                placeholder="123 Main Street, Apartment 4B"
                                rows="2"
                              />
                              {errors.address && (
                                <p className="error-text mt-1">
                                  <FiAlertCircle className="w-4 h-4" />
                                  {errors.address.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                City <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                {...register('city', {
                                  required: !selectedAddress ? 'City is required' : false,
                                })}
                                className={`w-full px-4 py-3 rounded-xl food-input ${
                                  errors.city ? 'food-input-error' : ''
                                }`}
                                placeholder="New York"
                              />
                              {errors.city && (
                                <p className="error-text mt-1">
                                  <FiAlertCircle className="w-4 h-4" />
                                  {errors.city.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                State <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                {...register('state', {
                                  required: !selectedAddress ? 'State is required' : false,
                                })}
                                className={`w-full px-4 py-3 rounded-xl food-input ${
                                  errors.state ? 'food-input-error' : ''
                                }`}
                                placeholder="NY"
                              />
                              {errors.state && (
                                <p className="error-text mt-1">
                                  <FiAlertCircle className="w-4 h-4" />
                                  {errors.state.message}
                                </p>
                              )}
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Pincode <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                {...register('pincode', {
                                  required: !selectedAddress ? 'Pincode is required' : false,
                                  pattern: {
                                    value: /^[0-9]{5,6}$/,
                                    message: 'Please enter a valid pincode'
                                  }
                                })}
                                className={`w-full px-4 py-3 rounded-xl food-input ${
                                  errors.pincode ? 'food-input-error' : ''
                                }`}
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
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Contact Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${
                            errors.name ? 'food-input-error' : ''
                          }`}
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
                          className={`w-full pl-12 pr-4 py-3.5 rounded-2xl food-input ${
                            errors.phone ? 'food-input-error' : ''
                          }`}
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
                  </div>
                </div>

                {/* Delivery Options */}
                <div>
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
                          className={`p-4 rounded-2xl border-2 transition-all text-left ${
                            isSelected
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
                              : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${
                              isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className={`font-semibold ${
                                isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'
                              }`}>
                                {option.label}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {option.time}
                              </p>
                            </div>
                          </div>
                          <p className={`text-sm font-bold ${
                            isSelected ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300'
                          }`}>
                            {option.fee}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Instructions */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiMessageSquare className="text-orange-500" />
                    Delivery Instructions
                  </h2>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {['Don\'t Ring Bell', 'Call on Arrival', 'Leave at Door', 'Contactless Delivery'].map((instruction) => (
                      <button
                        key={instruction}
                        type="button"
                        onClick={() => setDeliveryInstructions(instruction)}
                        className={`px-4 py-2 rounded-xl transition-colors text-sm ${
                          deliveryInstructions === instruction
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {instruction}
                      </button>
                    ))}
                  </div>
                  <textarea
                    {...register('instructions')}
                    rows="2"
                    className="w-full px-4 py-3 rounded-xl food-input resize-none"
                    placeholder="Gate code, landmark, or special delivery instructions..."
                  />
                </div>
              </form>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Order Summary
              </h3>

              {/* Cart Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-xl flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                      ) : (
                        '🍽️'
                      )}
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

              {/* Bill Summary */}
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
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Platform Fee</span>
                  <span>${platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Packaging Charge</span>
                  <span>${packagingFee.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Coupon Discount</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg text-gray-800 dark:text-white">
                  <span>Total</span>
                  <span className="text-orange-500">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Tip for Rider */}
              <div className="mt-4">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <FiGift className="text-orange-500" />
                  Tip for Rider
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tipOptions.map((tip) => (
                    <button
                      key={tip}
                      type="button"
                      onClick={() => {
                        if (tip === 'Custom') {
                          setTipAmount(0);
                          const custom = prompt('Enter tip amount:');
                          if (custom) {
                            const amount = parseFloat(custom);
                            if (!isNaN(amount) && amount > 0) {
                              setTipAmount(amount);
                            }
                          }
                        } else {
                          setTipAmount(tip);
                        }
                      }}
                      className={`px-4 py-2 rounded-xl transition-colors text-sm ${
                        tipAmount === tip && tip !== 'Custom'
                          ? 'bg-orange-500 text-white'
                          : tip === 'Custom' && tipAmount > 0 && !tipOptions.includes(tipAmount)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {tip === 0 ? 'No Tip' : tip === 'Custom' ? 'Custom' : `$${tip}`}
                    </button>
                  ))}
                </div>
                {tipAmount > 0 && !tipOptions.includes(tipAmount) && (
                  <p className="text-xs text-orange-500 mt-1">
                    Custom tip: ${tipAmount.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Coupon */}
              {!appliedCoupon ? (
                <div className="mt-4">
                  <button
                    type="button"
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
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            placeholder="Enter coupon code"
                            className="flex-1 px-3 py-2 rounded-xl food-input text-sm"
                          />
                          <button
                            type="button"
                            onClick={handleApplyCoupon}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all"
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
                        {appliedCoupon.code}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-300">
                        Saved ${couponDiscount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-green-500 hover:text-green-600 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Grand Total */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Grand Total</span>
                  <span className="text-2xl font-bold text-orange-500">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Including all taxes and fees
                </p>
              </div>

              {/* Proceed Button */}
              <motion.button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FiLoader className="w-5 h-5 animate-spin" />
                    Preparing...
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Security Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FiLock className="w-3 h-3 text-green-500" />
                  Secure Checkout
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
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;