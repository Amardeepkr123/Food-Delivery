// src/pages/payment/PaymentFailed.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiArrowLeft, FiRefreshCw, FiHelpCircle, FiMail } from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { error, orderId } = location.state || {};

  const handleRetry = () => {
    navigate('/payment');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="relative mx-auto w-24 h-24 mb-6"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-red-500 opacity-20 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FiAlertCircle className="w-16 h-16 text-red-500" />
              </div>
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Payment Failed ❌
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              We couldn't process your payment. Please try again.
            </p>

            {/* Error Details */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-2xl p-4 mb-6 text-left">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            {orderId && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Order ID: <span className="font-semibold">{orderId}</span>
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
              >
                <FiRefreshCw className="w-5 h-5" />
                Try Again
              </button>
              <Link to="/checkout">
                <button className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                  <FiArrowLeft className="w-5 h-5" />
                  Go Back
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-gray-500 dark:text-gray-400">
              <Link to="/help" className="hover:text-orange-500 transition-colors flex items-center gap-1">
                <FiHelpCircle className="w-4 h-4" />
                Need Help?
              </Link>
              <Link to="/contact" className="hover:text-orange-500 transition-colors flex items-center gap-1">
                <FiMail className="w-4 h-4" />
                Contact Support
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default PaymentFailed;