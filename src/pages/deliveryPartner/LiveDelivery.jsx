// src/pages/deliveryPartner/LiveDelivery.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FiMapPin,
  FiPhone,
  FiMessageCircle,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiNavigation,
  FiUser,
  FiHome,
  FiTarget,
  FiStar,
  FiAward,
  FiAlertCircle,
  FiPackage,
  FiSend,
  FiCheck,
} from 'react-icons/fi';
import { FaUtensils, FaStore } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';

const LiveDelivery = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [currentStep, setCurrentStep] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [timer, setTimer] = useState(0);

  // Mock order data
  const orderData = {
    id: orderId || 'ORD-2024-001',
    otp: '2847',
    estimatedArrival: '8 min',
    distanceRemaining: '2.3 km',
    pickupLocation: {
      address: '123 Main Street, Downtown',
      lat: 40.7128,
      lng: -74.006,
    },
    deliveryLocation: {
      address: '456 Park Avenue, Uptown',
      lat: 40.7580,
      lng: -73.9855,
    },
    restaurant: {
      name: 'Pizza Palace',
      address: '123 Main Street, Downtown',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      cuisine: 'Italian',
    },
    customer: {
      name: 'John Doe',
      phone: '+1 (555) 987-6543',
      address: '456 Park Avenue, Uptown',
      note: 'Please ring the doorbell',
    },
    items: [
      { name: 'Margherita Pizza', quantity: 2, price: 16.99 },
      { name: 'Garlic Bread', quantity: 1, price: 4.99 },
    ],
    total: 38.97,
    status: 'on_way',
    timeline: [
      { label: 'Order Accepted', time: '10:30 AM', completed: true },
      { label: 'Reached Restaurant', time: '10:45 AM', completed: true },
      { label: 'Picked Up', time: '11:00 AM', completed: true },
      { label: 'On The Way', time: '11:15 AM', completed: true },
      { label: 'Delivered', time: 'Expected 11:45 AM', completed: false },
    ],
  };

  const timelineSteps = [
    { id: 0, label: 'Order Accepted', icon: FiCheckCircle },
    { id: 1, label: 'Reached Restaurant', icon: FaStore },
    { id: 2, label: 'Picked Up', icon: FiPackage },
    { id: 3, label: 'On The Way', icon: FiTruck },
    { id: 4, label: 'Delivered', icon: FiCheck },
  ];

  useEffect(() => {
    // Simulate timer for estimated arrival
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteDelivery = () => {
    setShowOTP(true);
  };

  const handleVerifyOTP = () => {
    if (otpValue === orderData.otp) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsComplete(true);
        setShowOTP(false);
        setCurrentStep(4);
      }, 1500);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleNavigate = () => {
    alert('Opening navigation...');
  };

  const handleCallCustomer = () => {
    window.location.href = `tel:${orderData.customer.phone}`;
  };

  const handleChatCustomer = () => {
    alert('Opening chat...');
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.1 },
  };

  const stepVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  if (isComplete) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiCheckCircle className="text-5xl text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
              Delivery Complete! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Order #{orderData.id} has been successfully delivered.
            </p>
            <button
              onClick={() => navigate('/delivery/dashboard')}
              className="btn-primary"
            >
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              Live Delivery Tracking
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Order #{orderData.id}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Live
            </span>
            <button
              onClick={() => navigate('/delivery/dashboard')}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ⬅️ Back
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left & Center */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <motion.div
              {...fadeInUp}
              className="glass-card rounded-2xl overflow-hidden h-[300px] md:h-[400px] relative"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative">
                {/* Google Map Placeholder */}
                <div className="text-center">
                  <div className="text-6xl mb-3">🗺️</div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Google Map View
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {orderData.pickupLocation.address}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    → {orderData.deliveryLocation.address}
                  </p>
                </div>

                {/* Map Overlay - ETA */}
                <div className="absolute top-4 left-4 glass-card rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                      <FiClock className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Estimated Arrival
                      </p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">
                        {orderData.estimatedArrival}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Overlay - Distance */}
                <div className="absolute bottom-4 left-4 glass-card rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <FiNavigation className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Distance Remaining
                      </p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">
                        {orderData.distanceRemaining}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timer */}
                <div className="absolute top-4 right-4 glass-card rounded-xl p-3 shadow-lg">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Time Elapsed</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-white">
                      {formatTime(timer)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order Timeline */}
            <motion.div
              {...fadeInUp}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <FiClock className="text-red-500" />
                Order Timeline
              </h3>

              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

                <div className="space-y-6">
                  {orderData.timeline.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-12"
                    >
                      {/* Timeline Dot */}
                      <div
                        className={`absolute left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          step.completed
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400'
                        }`}
                      >
                        {step.completed ? (
                          <FiCheck className="text-sm" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full" />
                        )}
                      </div>

                      <div>
                        <p
                          className={`font-medium ${
                            step.completed
                              ? 'text-gray-800 dark:text-white'
                              : 'text-gray-400 dark:text-gray-500'
                          }`}
                        >
                          {step.label}
                        </p>
                        <p
                          className={`text-sm ${
                            step.completed
                              ? 'text-gray-500 dark:text-gray-400'
                              : 'text-gray-400 dark:text-gray-500'
                          }`}
                        >
                          {step.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              {...fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              <button
                onClick={handleNavigate}
                className="glass-card rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <FiNavigation className="text-2xl text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Navigate
                </span>
              </button>

              <button
                onClick={handleCallCustomer}
                className="glass-card rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <FiPhone className="text-2xl text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Call Customer
                </span>
              </button>

              <button
                onClick={handleChatCustomer}
                className="glass-card rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <FiMessageCircle className="text-2xl text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Chat Customer
                </span>
              </button>

              <button
                onClick={handleCompleteDelivery}
                className="glass-card rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 group bg-gradient-to-r from-green-500 to-green-600 text-white"
              >
                <FiCheckCircle className="text-2xl text-white mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Complete Delivery</span>
              </button>
            </motion.div>
          </div>

          {/* Sidebar - Right */}
          <div className="space-y-6">
            {/* Order Summary */}
            <motion.div
              {...fadeInUp}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiPackage className="text-red-500" />
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Order ID</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {orderData.id}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">OTP</span>
                  <span className="font-bold text-red-500 text-lg tracking-wider">
                    {orderData.otp}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Total</span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    ${orderData.total}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Items</span>
                  <span className="text-gray-800 dark:text-white">
                    {orderData.items.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Items:
                </p>
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-gray-800 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Restaurant Details */}
            <motion.div
              {...fadeInUp}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaUtensils className="text-red-500" />
                Restaurant
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {orderData.restaurant.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <FiStar className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {orderData.restaurant.rating}
                    </span>
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      • {orderData.restaurant.cuisine}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <FiMapPin className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {orderData.restaurant.address}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <FiPhone className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {orderData.restaurant.phone}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Customer Details */}
            <motion.div
              {...fadeInUp}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiUser className="text-blue-500" />
                Customer
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {orderData.customer.name}
                  </p>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <FiMapPin className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {orderData.customer.address}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <FiPhone className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {orderData.customer.phone}
                  </span>
                </div>
                {orderData.customer.note && (
                  <div className="flex items-start gap-2 text-sm bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <FiAlertCircle className="text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">
                      Note: {orderData.customer.note}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Location Details */}
            <motion.div
              {...fadeInUp}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiTarget className="text-purple-500" />
                Locations
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Pickup
                  </p>
                  <div className="flex items-start gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {orderData.pickupLocation.address}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Delivery
                  </p>
                  <div className="flex items-start gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {orderData.deliveryLocation.address}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <AnimatePresence>
        {showOTP && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShield className="text-3xl text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Verify Delivery
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Please enter the 4-digit OTP provided by the customer to complete the delivery.
                </p>

                <div className="flex justify-center gap-3 mb-6">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                      value={otpValue[index] || ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 1) {
                          const newOtp = otpValue.split('');
                          newOtp[index] = value;
                          setOtpValue(newOtp.join(''));
                          // Auto-focus next input
                          if (value && index < 3) {
                            const nextInput = document.querySelectorAll(
                              'input[type="text"]'
                            )[index + 1];
                            if (nextInput) nextInput.focus();
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otpValue[index] && index > 0) {
                          const prevInput = document.querySelectorAll(
                            'input[type="text"]'
                          )[index - 1];
                          if (prevInput) prevInput.focus();
                        }
                      }}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowOTP(false)}
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleVerifyOTP}
                    disabled={otpValue.length !== 4 || isLoading}
                    className="flex-1 px-4 py-3 rounded-xl food-gradient-bg text-white font-medium shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <FiCheckCircle /> Verify
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                  OTP: <span className="font-mono font-bold">{orderData.otp}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default LiveDelivery;