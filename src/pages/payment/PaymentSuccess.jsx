// src/pages/payment/PaymentSuccess.jsx
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight, FiHome, FiPackage, FiMapPin, FiClock } from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { useOrderContext } from '../../context/OrderContext';
import { useNotificationContext } from '../../context/NotificationContext';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getOrderDetails } = useOrderContext();
  const { addNotification } = useNotificationContext();

  const { orderId, transactionId, amount, paymentMethod } = location.state || {};

  // Redirect if no order data
  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  // Fetch order details
  useEffect(() => {
    if (orderId) {
      getOrderDetails(orderId).catch(console.error);
    }
  }, [orderId, getOrderDetails]);

  // Add notification
  useEffect(() => {
    if (orderId) {
      addNotification({
        id: Date.now(),
        type: 'success',
        title: 'Order Placed!',
        message: `Your order #${orderId} has been placed successfully.`,
        read: false,
        createdAt: new Date().toISOString(),
      });
    }
  }, [orderId, addNotification]);

  if (!orderId) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Success Card */}
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
            {/* Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="relative mx-auto w-24 h-24 mb-6"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-500 opacity-20 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FiCheckCircle className="w-16 h-16 text-green-500" />
              </div>
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Payment Successful! 🎉
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Your order has been placed successfully.
            </p>

            {/* Order Details */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 mb-6 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Order ID</p>
                  <p className="font-semibold text-gray-800 dark:text-white">#{orderId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Amount Paid</p>
                  <p className="font-semibold text-orange-500">${amount?.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Payment Method</p>
                  <p className="font-semibold text-gray-800 dark:text-white uppercase">{paymentMethod}</p>
                </div>
                {transactionId && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Transaction ID</p>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">{transactionId}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Status Timeline Preview */}
            <div className="mb-6 text-left">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Order Status
              </p>
              <div className="flex items-center gap-2">
                {['Order Placed', 'Restaurant Accepted', 'Preparing', 'Out for Delivery', 'Delivered'].map((status, index) => (
                  <div key={index} className="flex items-center flex-1">
                    <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                    {index < 4 && <div className={`h-0.5 flex-1 ${index === 0 ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`} />}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Your order has been placed and is being processed.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={`/order-tracking/${orderId}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
                >
                  <FiMapPin className="w-5 h-5" />
                  Track Order
                </motion.button>
              </Link>
              <Link to={`/order-confirmation/${orderId}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                >
                  <FiPackage className="w-5 h-5" />
                  View Order
                </motion.button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-3">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                  <FiHome className="w-5 h-5" />
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccess;