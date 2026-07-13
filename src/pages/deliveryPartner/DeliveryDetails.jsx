// src/pages/deliveryPartner/DeliveryDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiPackage,
  FiMapPin,
  FiClock,
  FiUser,
  FiPhone,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiTruck,
  FiStar,
  FiMessageSquare,
  FiPhoneCall,
  FiNavigation,
  FiRefreshCw,
  FiHome,
  FiBriefcase,
  FiAlertCircle,
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-toastify';

const DeliveryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    fetchDeliveryDetails();
  }, [id]);

  const fetchDeliveryDetails = () => {
    setLoading(true);
    // Mock data - replace with actual API call
    setTimeout(() => {
      const mockDelivery = {
        id: id || 'DEL-12345',
        orderId: 'ORD-12345',
        restaurant: 'Pizza Palace',
        restaurantAddress: '456 Food St, Downtown',
        restaurantPhone: '+1 234 567 890',
        customer: 'John Doe',
        customerPhone: '+1 234 567 891',
        customerAddress: '123 Main St, Apt 4B, New York',
        items: ['Margherita Pizza x2', 'Garlic Bread x1'],
        total: 42.97,
        earnings: 5.50,
        status: 'in_progress',
        distance: '2.5 km',
        estimatedTime: '15 min',
        pickupTime: '2:30 PM',
        deliveryTime: '3:15 PM',
        acceptedAt: '2024-01-15T14:00:00',
        customerNote: 'Please ring the doorbell',
        deliveryInstructions: 'Leave at front desk if no answer',
        currentLocation: {
          lat: 40.7128,
          lng: -74.0060,
          address: '456 Food St, Downtown',
        },
        timeline: [
          { status: 'accepted', time: '2:00 PM', label: 'Order Accepted' },
          { status: 'picked_up', time: '2:30 PM', label: 'Picked Up from Restaurant' },
          { status: 'in_progress', time: '2:45 PM', label: 'In Progress' },
          { status: 'delivered', time: null, label: 'Delivered' },
        ],
        paymentMethod: 'Credit Card',
        tip: 2.00,
      };
      setDelivery(mockDelivery);
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const badges = {
      accepted: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      picked_up: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      in_progress: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
      delivered: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    };
    return badges[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusLabel = (status) => {
    const labels = {
      accepted: 'Accepted',
      picked_up: 'Picked Up',
      in_progress: 'In Progress',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      accepted: <FiCheckCircle className="w-4 h-4" />,
      picked_up: <FiTruck className="w-4 h-4" />,
      in_progress: <FiNavigation className="w-4 h-4" />,
      delivered: <FiCheckCircle className="w-4 h-4" />,
      cancelled: <FiXCircle className="w-4 h-4" />,
    };
    return icons[status] || null;
  };

  const handleCompleteDelivery = () => {
    if (window.confirm('Mark this delivery as completed?')) {
      toast.success('Delivery marked as completed!');
      navigate('/delivery/history');
    }
  };

  const handleContactCustomer = () => {
    setShowContact(true);
    toast.info('Connecting to customer...');
    // In real app, this would open a chat or call
  };

  const handleNavigate = () => {
    toast.info('Opening navigation...');
    // In real app, this would open Google Maps
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading delivery details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!delivery) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Delivery Not Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              The delivery you're looking for doesn't exist.
            </p>
            <Link to="/delivery/dashboard">
              <button className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Delivery Details
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {delivery.id} • {delivery.orderId}
                </p>
              </div>
            </div>
            <button
              onClick={fetchDeliveryDetails}
              className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FiRefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Current Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(delivery.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(delivery.status)}`}>
                        {getStatusLabel(delivery.status)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Estimated Time</p>
                    <p className="text-lg font-bold text-orange-500">{delivery.estimatedTime}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Delivery Timeline
                </h3>
                <div className="space-y-4">
                  {delivery.timeline.map((item, index) => {
                    const isCompleted = item.time !== null;
                    const isCurrent = index === delivery.timeline.length - 1 && !isCompleted;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-green-500' : isCurrent ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'
                          }`}>
                            {isCompleted ? (
                              <FiCheckCircle className="w-5 h-5 text-white" />
                            ) : isCurrent ? (
                              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                            ) : (
                              <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full" />
                            )}
                          </div>
                          {index < delivery.timeline.length - 1 && (
                            <div className={`w-0.5 h-8 ${
                              isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className={`font-medium ${
                            isCompleted ? 'text-gray-800 dark:text-white' : 'text-gray-400'
                          }`}>
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.time || 'In progress...'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Delivery Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Restaurant</p>
                      <p className="text-gray-500">{delivery.restaurant}</p>
                      <p className="text-gray-400 text-xs">{delivery.restaurantAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiHome className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Delivery Address</p>
                      <p className="text-gray-500">{delivery.customerAddress}</p>
                      {delivery.deliveryInstructions && (
                        <p className="text-gray-400 text-xs">{delivery.deliveryInstructions}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiUser className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-700 dark:text-gray-300">Customer</p>
                      <p className="text-gray-500">{delivery.customer}</p>
                      <p className="text-gray-400 text-xs">{delivery.customerPhone}</p>
                    </div>
                  </div>
                  {delivery.customerNote && (
                    <div className="flex items-start gap-3">
                      <FiMessageSquare className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">Customer Note</p>
                        <p className="text-gray-500 text-sm">{delivery.customerNote}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={handleNavigate}
                    className="w-full py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiNavigation className="w-5 h-5" />
                    Navigate
                  </button>
                  <button
                    onClick={handleContactCustomer}
                    className="w-full py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiPhoneCall className="w-5 h-5" />
                    Contact Customer
                  </button>
                  {delivery.status !== 'delivered' && (
                    <button
                      onClick={handleCompleteDelivery}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
                    >
                      <FiCheckCircle className="w-5 h-5" />
                      Complete Delivery
                    </button>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Order Total</span>
                    <span className="font-semibold text-gray-800 dark:text-white">${delivery.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Earnings</span>
                    <span className="font-semibold text-orange-500">${delivery.earnings.toFixed(2)}</span>
                  </div>
                  {delivery.tip > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tip</span>
                      <span className="font-semibold text-green-500">${delivery.tip.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Method</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{delivery.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Distance</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{delivery.distance}</span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Order Items
                </h3>
                <ul className="space-y-2 text-sm">
                  {delivery.items.map((item, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// ✅ THIS IS THE FIX - DEFAULT EXPORT MUST BE PRESENT
export default DeliveryDetails;