// src/pages/orders/OrderSuccess.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiPackage,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiDownload,
  FiShare2,
  FiArrowRight,
  FiCalendar,
  FiUser,
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-hot-toast';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderData = location.state?.order;
    if (orderData) {
      setOrder(orderData);
    } else {
      // Fallback mock data
      setOrder({
        id: 'ORD-2024-001',
        restaurant: 'Pizza Palace',
        total: 49.27,
        estimatedDelivery: '25-35 min',
        deliveryAddress: '123 Main St, New York, NY 10001',
        items: 5,
      });
    }
  }, [location]);

  const handleShare = async () => {
    try {
      await navigator.clipboard?.writeText(`${window.location.origin}/orders/${order?.id}`);
      toast.success('Link copied to clipboard! 📋');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  if (!order) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium animate-pulse">
              Loading order confirmation...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6"
          >
            <FiCheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Order Placed Successfully! 🎉
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Thank you for your order. We'll notify you when it's ready.
          </p>
          <p className="text-sm font-semibold text-orange-500 mb-6">
            Order ID: {order.id}
          </p>

          {/* Order Summary */}
          <div className="glass-card rounded-2xl p-4 text-left mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-400">Restaurant</p>
                <p className="font-semibold text-gray-800 dark:text-white">{order.restaurant}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total</p>
                <p className="font-semibold text-orange-500">${order.total}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Items</p>
                <p className="font-semibold text-gray-800 dark:text-white">{order.items} items</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Delivery Time</p>
                <p className="font-semibold text-gray-800 dark:text-white">{order.estimatedDelivery}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-400">Delivery Address</p>
                <p className="font-semibold text-gray-800 dark:text-white">{order.deliveryAddress}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate(`/tracking/${order.id}`)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center gap-2"
            >
              <FiClock className="w-5 h-5" />
              Track Order
            </button>
            <button
              onClick={() => navigate(`/orders/${order.id}`)}
              className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FiPackage className="w-5 h-5" />
              View Order
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FiShare2 className="w-5 h-5" />
              Share
            </button>
            <button className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2">
              <FiDownload className="w-5 h-5" />
              Download Receipt
            </button>
          </div>

          {/* Continue Shopping */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link to="/restaurants">
              <button className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2 mx-auto">
                Continue Shopping <FiArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

// ✅ MUST HAVE - Default export
export default OrderSuccess;