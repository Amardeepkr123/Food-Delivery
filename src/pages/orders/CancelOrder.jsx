// src/pages/orders/CancelOrder.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiArrowLeft,
  FiSend,
  FiInfo,
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-hot-toast';

const CancelOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const reasons = [
    'Changed my mind',
    'Order took too long',
    'Wrong restaurant selected',
    'Need to change address',
    'Payment issue',
    'Duplicate order',
    'Other',
  ];

  const handleCancel = async () => {
    if (!reason) {
      toast.error('Please select a reason');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      toast.success('Order cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel order');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4">
              <FiXCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Order Cancelled
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Your order #{id} has been cancelled successfully.
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/orders">
                <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all">
                  View My Orders
                </button>
              </Link>
              <Link to="/restaurants">
                <button className="w-full py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                  Browse Restaurants
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Cancel Order
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 mb-6">
            <FiAlertCircle className="w-6 h-6 text-yellow-500" />
            <div>
              <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                Are you sure you want to cancel order #{id}?
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-300">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Reason for cancellation
          </label>
          <div className="space-y-2">
            {reasons.map((r) => (
              <button
                key={r}
                onClick={() => setReason(r)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                  reason === r
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                }`}
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">{r}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              Go Back
            </button>
            <button
              onClick={handleCancel}
              disabled={!reason || isLoading}
              className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  Cancel Order
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default CancelOrder;