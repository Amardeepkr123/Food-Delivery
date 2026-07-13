// src/pages/payment/Payment.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FiCreditCard, FiDollarSign, FiSmartphone, FiLock, 
  FiShield, FiCheckCircle, FiAlertCircle, FiArrowLeft,
  FiArrowRight, FiLoader, FiZap, FiInfo, FiEye, FiEyeOff,
  FiHome, FiBriefcase, FiMapPin, FiUser, FiMail, FiPhone,
  FiClock, FiTruck, FiPackage, FiGift, FiTag, FiX,
} from 'react-icons/fi';
import { 
  FaGooglePay, FaWallet, FaUniversity, FaCreditCard,
  FaPaypal, FaApplePay, FaAmazonPay,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import MainLayout from '../../layouts/MainLayout';
import { useCartContext } from '../../context/CartContext';
import { useOrderContext } from '../../context/OrderContext';
import { usePaymentContext } from '../../context/PaymentContext';
import { useAuth } from '../../hooks/useAuth';
import { paymentService } from '../../services/paymentService';

const Payment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems } = useCartContext();
  const { createOrder } = useOrderContext();
  const {
    selectedMethod,
    setSelectedMethod,
    paymentStatus,
    processPayment,
    validatePaymentMethod,
    resetPayment,
    loading: paymentLoading,
  } = usePaymentContext();

  const [orderData, setOrderData] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      paymentMethod: 'cod',
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCvv: '',
      upiId: '',
      walletPin: '',
      bankName: '',
    }
  });

  const watchedFields = watch();

  // Load order data from session storage
  useEffect(() => {
    const pendingOrder = sessionStorage.getItem('pendingOrder');
    const orderGrandTotal = sessionStorage.getItem('orderGrandTotal');
    
    if (pendingOrder) {
      try {
        setOrderData(JSON.parse(pendingOrder));
        setGrandTotal(parseFloat(orderGrandTotal) || 0);
      } catch (error) {
        console.error('Error parsing order data:', error);
        navigate('/cart');
      }
    } else {
      navigate('/cart');
    }
  }, [navigate]);

  // Redirect if no items
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Handle payment method selection
  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setValue('paymentMethod', method);
    setPaymentError(null);
    trigger();
  };

  // Process payment
  const onSubmit = async (data) => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    // Validate payment data
    const validation = validatePaymentMethod(selectedMethod, data);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setProcessing(true);
    setPaymentError(null);

    try {
      const paymentData = {
        method: selectedMethod,
        amount: grandTotal,
        orderId: orderData?.orderId || `ORD-${Date.now()}`,
        userId: user?.id,
        ...data,
      };

      // Process payment
      const result = await processPayment(paymentData);

      if (result.success) {
        // Create order in database
        const orderPayload = {
          ...orderData,
          orderId: result.data?.orderId || paymentData.orderId,
          transactionId: result.data?.transactionId,
          paymentMethod: selectedMethod,
          paymentStatus: 'paid',
          status: 'placed',
          paymentDetails: result.data,
        };

        const createdOrder = await createOrder(orderPayload);
        
        // Clear session storage
        sessionStorage.removeItem('pendingOrder');
        sessionStorage.removeItem('orderGrandTotal');
        sessionStorage.removeItem('orderItems');

        // Navigate to success page
        navigate(`/payment/success`, {
          state: {
            orderId: createdOrder.id,
            transactionId: result.data?.transactionId,
            amount: grandTotal,
            paymentMethod: selectedMethod,
          }
        });
      } else {
        setPaymentError(result.error || 'Payment failed');
        navigate('/payment/failed', {
          state: {
            error: result.error,
            orderId: paymentData.orderId,
          }
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error.message || 'Payment processing failed');
      navigate('/payment/failed', {
        state: {
          error: error.message,
        }
      });
    } finally {
      setProcessing(false);
    }
  };

  // Payment methods configuration
  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: FaGooglePay, color: 'from-blue-500 to-indigo-600' },
    { id: 'card', label: 'Credit/Debit Card', icon: FaCreditCard, color: 'from-purple-500 to-pink-600' },
    { id: 'wallet', label: 'Wallet', icon: FaWallet, color: 'from-green-500 to-teal-600' },
    { id: 'cod', label: 'Cash on Delivery', icon: FiDollarSign, color: 'from-orange-500 to-red-500' },
    { id: 'netbanking', label: 'Net Banking', icon: FaUniversity, color: 'from-cyan-500 to-blue-600' },
  ];

  const formatCardNumber = (value) => {
    const v = value.replace(/\s/g, '').replace(/\D/g, '');
    const matches = v.match(/(\d{1,4})/g);
    return matches ? matches.join(' ') : '';
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

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
              <FiCreditCard className="text-orange-500" />
              Payment
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Complete your payment to confirm the order
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Step 2 of 2</span>
            <div className="flex gap-1">
              <div className="w-8 h-1 rounded-full bg-orange-500" />
              <div className="w-8 h-1 rounded-full bg-orange-500" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-6 md:p-8"
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Select Payment Method
              </h2>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  return (
                    <motion.button
                      key={method.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectMethod(method.id)}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? `border-orange-500 bg-gradient-to-br ${method.color} text-white shadow-lg shadow-orange-500/20`
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                      }`} />
                      <p className={`text-sm font-semibold ${
                        isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {method.label}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Payment Forms */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <AnimatePresence mode="wait">
                  {/* UPI Form */}
                  {selectedMethod === 'upi' && (
                    <motion.div
                      key="upi"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <FaGooglePay className="text-blue-500" />
                        UPI Payment
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          UPI ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register('upiId', {
                            required: selectedMethod === 'upi' ? 'UPI ID is required' : false,
                            pattern: {
                              value: /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/,
                              message: 'Invalid UPI ID (e.g., name@upi)'
                            }
                          })}
                          className={`w-full px-4 py-3 rounded-xl food-input ${
                            errors.upiId ? 'food-input-error' : ''
                          }`}
                          placeholder="yourname@upi"
                        />
                        {errors.upiId && (
                          <p className="error-text mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.upiId.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300">
                          Google Pay
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300">
                          PhonePe
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300">
                          Paytm
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300">
                          Amazon Pay
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Card Form */}
                  {selectedMethod === 'card' && (
                    <motion.div
                      key="card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <FaCreditCard className="text-purple-500" />
                        Card Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Card Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              {...register('cardNumber', {
                                required: selectedMethod === 'card' ? 'Card number is required' : false,
                                pattern: {
                                  value: /^[0-9\s]{16,19}$/,
                                  message: 'Invalid card number'
                                }
                              })}
                              className={`w-full px-4 py-3 rounded-xl food-input ${
                                errors.cardNumber ? 'food-input-error' : ''
                              }`}
                              placeholder="1234 5678 9012 3456"
                              onChange={(e) => {
                                const formatted = formatCardNumber(e.target.value);
                                e.target.value = formatted;
                              }}
                              maxLength={19}
                            />
                            <button
                              type="button"
                              onClick={() => setShowCardNumber(!showCardNumber)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showCardNumber ? <FiEyeOff /> : <FiEye />}
                            </button>
                          </div>
                          {errors.cardNumber && (
                            <p className="error-text mt-1">
                              <FiAlertCircle className="w-4 h-4" />
                              {errors.cardNumber.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Cardholder Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            {...register('cardName', {
                              required: selectedMethod === 'card' ? 'Cardholder name is required' : false,
                            })}
                            className={`w-full px-4 py-3 rounded-xl food-input ${
                              errors.cardName ? 'food-input-error' : ''
                            }`}
                            placeholder="John Doe"
                          />
                          {errors.cardName && (
                            <p className="error-text mt-1">
                              <FiAlertCircle className="w-4 h-4" />
                              {errors.cardName.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Expiry Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              {...register('cardExpiry', {
                                required: selectedMethod === 'card' ? 'Expiry date is required' : false,
                                pattern: {
                                  value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                                  message: 'Invalid expiry date (MM/YY)'
                                }
                              })}
                              className={`w-full px-4 py-3 rounded-xl food-input ${
                                errors.cardExpiry ? 'food-input-error' : ''
                              }`}
                              placeholder="MM/YY"
                              onChange={(e) => {
                                const formatted = formatExpiry(e.target.value);
                                e.target.value = formatted;
                              }}
                              maxLength={5}
                            />
                            {errors.cardExpiry && (
                              <p className="error-text mt-1">
                                <FiAlertCircle className="w-4 h-4" />
                                {errors.cardExpiry.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              CVV <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="password"
                              {...register('cardCvv', {
                                required: selectedMethod === 'card' ? 'CVV is required' : false,
                                pattern: {
                                  value: /^[0-9]{3,4}$/,
                                  message: 'Invalid CVV'
                                }
                              })}
                              className={`w-full px-4 py-3 rounded-xl food-input ${
                                errors.cardCvv ? 'food-input-error' : ''
                              }`}
                              placeholder="•••"
                              maxLength={4}
                            />
                            {errors.cardCvv && (
                              <p className="error-text mt-1">
                                <FiAlertCircle className="w-4 h-4" />
                                {errors.cardCvv.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
                        <FiLock className="w-3 h-3 text-green-500" />
                        Your card details are secure and encrypted
                      </div>
                    </motion.div>
                  )}

                  {/* Wallet Form */}
                  {selectedMethod === 'wallet' && (
                    <motion.div
                      key="wallet"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <FaWallet className="text-green-500" />
                        Wallet Payment
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Wallet Balance</p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">$150.00</p>
                        </div>
                        <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          <FaWallet className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Wallet PIN <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          {...register('walletPin', {
                            required: selectedMethod === 'wallet' ? 'Wallet PIN is required' : false,
                            pattern: {
                              value: /^[0-9]{4}$/,
                              message: 'Invalid wallet PIN (4 digits required)'
                            }
                          })}
                          className={`w-full px-4 py-3 rounded-xl food-input ${
                            errors.walletPin ? 'food-input-error' : ''
                          }`}
                          placeholder="••••"
                          maxLength={4}
                        />
                        {errors.walletPin && (
                          <p className="error-text mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.walletPin.message}
                          </p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                        Amount to be deducted: <span className="font-bold text-gray-700 dark:text-white">${grandTotal.toFixed(2)}</span>
                      </p>
                    </motion.div>
                  )}

                  {/* Net Banking Form */}
                  {selectedMethod === 'netbanking' && (
                    <motion.div
                      key="netbanking"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <FaUniversity className="text-cyan-500" />
                        Net Banking
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Select Bank <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register('bankName', {
                            required: selectedMethod === 'netbanking' ? 'Please select a bank' : false,
                          })}
                          className={`w-full px-4 py-3 rounded-xl food-input appearance-none ${
                            errors.bankName ? 'food-input-error' : ''
                          }`}
                        >
                          <option value="">Select your bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                          <option value="yes">Yes Bank</option>
                          <option value="pnb">Punjab National Bank</option>
                          <option value="canara">Canara Bank</option>
                          <option value="bob">Bank of Baroda</option>
                          <option value="idfc">IDFC First Bank</option>
                        </select>
                        {errors.bankName && (
                          <p className="error-text mt-1">
                            <FiAlertCircle className="w-4 h-4" />
                            {errors.bankName.message}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-xs font-medium text-green-600 dark:text-green-400">
                          Secure Banking
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-xs font-medium text-blue-600 dark:text-blue-400">
                          SSL Encrypted
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* COD Form */}
                  {selectedMethod === 'cod' && (
                    <motion.div
                      key="cod"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                        <FiDollarSign className="text-orange-500" />
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Pay with cash when your order arrives. You'll need to have the exact amount ready.
                      </p>
                      <div className="flex items-center gap-2 mt-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30">
                        <FiInfo className="text-yellow-500" />
                        <p className="text-xs text-yellow-600 dark:text-yellow-400">
                          Please keep exact cash ready for delivery
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Payment Error */}
                {paymentError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 flex items-center gap-2"
                  >
                    <FiAlertCircle className="w-5 h-5" />
                    {paymentError}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/checkout')}
                    className="px-6 py-3.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                  >
                    <FiArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <motion.button
                    type="submit"
                    disabled={processing || paymentLoading || !selectedMethod}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing || paymentLoading ? (
                      <>
                        <FiLoader className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiLock className="w-5 h-5" />
                        Pay ${grandTotal.toFixed(2)}
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
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Order Summary
              </h3>

              {/* Order Items */}
              <div className="space-y-3 max-h-40 overflow-y-auto mb-4">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-sm flex-shrink-0">
                      🍽️
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
                {cartItems.length > 3 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    +{cartItems.length - 3} more items
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
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

              {/* Delivery Info */}
              <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2 text-sm">
                  <FiTruck className="text-orange-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {orderData?.deliveryTime || '25-35 min'} delivery
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <FiMapPin className="text-orange-500" />
                  <span className="text-gray-600 dark:text-gray-300 truncate">
                    {orderData?.address?.address || 'Delivery address'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payment;