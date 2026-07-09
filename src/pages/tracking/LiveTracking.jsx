// src/pages/tracking/LiveTracking.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMapPin,
  FiTarget,
  FiNavigation,
  FiClock,
  FiTruck,
  FiUser,
  FiHome,
  FiStar,
  FiInfo,
  FiMaximize,
  FiMinimize,
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiZap,
  FiPackage,
  FiDollarSign,
  FiCalendar,
  FiPhone,
  FiMessageCircle,
  FiShare2,
  FiDownload,
  FiHeart,
  FiAward,
  FiTrendingUp,
  FiClock as FiClockIcon,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiX,
  FiMoreVertical,
  FiEye,
  FiSend,
  FiSmile,
  FiThumbsUp,
  FiThumbsDown,
  FiLoader,
} from 'react-icons/fi';
import { FaMotorcycle, FaUtensils, FaLeaf } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

// ============================================
// MOCK DATA
// ============================================
const mockOrderData = {
  id: 'ORD-2024-001',
  restaurant: {
    id: 'RES-001',
    name: 'Pizza Palace',
    address: '123, Marine Drive, Mumbai - 400001',
    phone: '+91 98765 43211',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    rating: 4.8,
    location: { lat: 19.0760, lng: 72.8777 },
  },
  customer: {
    id: 'CUS-001',
    name: 'Amit Kumar',
    phone: '+91 98765 43210',
    address: '456, Connaught Place, Delhi - 110001',
    location: { lat: 28.6139, lng: 77.2090 },
    deliveryInstructions: 'Ring the doorbell, leave at reception',
  },
  deliveryPartner: {
    id: 'DP-001',
    name: 'Rajesh Singh',
    phone: '+91 87654 32109',
    vehicle: 'Honda Activa',
    vehicleNumber: 'MH-01-AB-1234',
    rating: 4.9,
    completedOrders: 2450,
    experience: '3 years',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    location: { lat: 28.6000, lng: 77.2000 },
  },
  items: [
    { name: 'Margherita Pizza', quantity: 2, price: 16.99, image: '🍕', isVeg: true },
    { name: 'Garlic Bread', quantity: 1, price: 4.99, image: '🍞', isVeg: true },
    { name: 'Coca-Cola', quantity: 2, price: 2.49, image: '🥤', isVeg: true },
  ],
  subtotal: 46.94,
  deliveryFee: 2.99,
  platformFee: 1.99,
  gst: 2.35,
  discount: 5.00,
  total: 49.27,
  paymentMethod: 'Credit Card',
  paymentStatus: 'paid',
  status: 'on_the_way',
  createdAt: '2024-01-15T10:30:00Z',
  estimatedDelivery: '2024-01-15T11:45:00Z',
  distance: '3.2 km',
  duration: '15 min',
  tip: 0,
  isRated: false,
};

const statusFlow = [
  { key: 'placed', label: 'Order Placed', icon: FiPackage, time: '10:30 AM', completed: true },
  { key: 'accepted', label: 'Restaurant Accepted', icon: FiCheckCircle, time: '10:35 AM', completed: true },
  { key: 'preparing', label: 'Preparing Food', icon: FaUtensils, time: '10:45 AM', completed: true },
  { key: 'ready', label: 'Food Ready', icon: FiCheck, time: '11:00 AM', completed: true },
  { key: 'assigned', label: 'Rider Assigned', icon: FiUser, time: '11:05 AM', completed: true },
  { key: 'picked_up', label: 'Picked Up', icon: FiTruck, time: '11:10 AM', completed: true },
  { key: 'on_the_way', label: 'On the Way', icon: FiMapPin, time: '11:15 AM', completed: true },
  { key: 'nearby', label: 'Near Your Location', icon: FiTarget, time: '11:30 AM', completed: false },
  { key: 'delivered', label: 'Delivered', icon: FiCheckCircle, time: 'Expected 11:45 AM', completed: false },
];

const statusColors = {
  placed: 'bg-blue-500',
  accepted: 'bg-indigo-500',
  preparing: 'bg-purple-500',
  ready: 'bg-cyan-500',
  assigned: 'bg-pink-500',
  picked_up: 'bg-orange-500',
  on_the_way: 'bg-orange-500',
  nearby: 'bg-green-500',
  delivered: 'bg-green-500',
};

// ============================================
// COMPONENTS
// ============================================

// Status Timeline Item
const StatusItem = ({ status, isCompleted, isActive, isLast, label, icon: Icon, time }) => {
  return (
    <div className="relative flex items-start gap-4">
      {!isLast && (
        <div className={`absolute left-4 top-8 w-0.5 h-12 ${
          isCompleted ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
        }`} />
      )}

      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isCompleted || isActive ? 'bg-orange-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
      } ${isActive ? 'animate-pulse ring-4 ring-orange-500/30' : ''}`}>
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 pb-6">
        <div className="flex items-center justify-between">
          <p className={`font-medium ${isCompleted || isActive ? 'text-gray-800 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
            {label}
          </p>
          {time && (
            <span className={`text-xs ${isCompleted || isActive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>
              {time}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Delivery Partner Card
const DeliveryPartnerCard = ({ partner, onCall, onChat, onTip }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={partner.image}
            alt={partner.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-800 dark:text-white">
              {partner.name}
            </h4>
            <span className="flex items-center gap-0.5 text-xs text-yellow-500">
              <FiStar className="fill-current" /> {partner.rating}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <FiAward className="w-3 h-3" />
              {partner.completedOrders} deliveries
            </span>
            <span className="flex items-center gap-1">
              <FaMotorcycle className="w-3 h-3" />
              {partner.vehicle}
            </span>
            <span className="text-gray-400">{partner.vehicleNumber}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onCall}
          className="flex-1 py-2 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <FiPhone className="w-4 h-4" /> Call
        </button>
        <button
          onClick={onChat}
          className="flex-1 py-2 rounded-xl bg-purple-500 text-white font-semibold text-sm hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
        >
          <FiMessageCircle className="w-4 h-4" /> Chat
        </button>
        <button
          onClick={onTip}
          className="flex-1 py-2 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
          <FiDollarSign className="w-4 h-4" /> Tip
        </button>
      </div>
    </motion.div>
  );
};

// ETA Display
const ETADisplay = ({ eta, distance, duration }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-4 text-center"
    >
      <div className="flex items-center justify-center gap-6">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Arrival</p>
          <p className="text-2xl font-bold text-orange-500">{eta}</p>
        </div>
        <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">{distance}</p>
        </div>
        <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">{duration}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Map Placeholder with Live Tracking
const MapPlaceholder = ({ restaurant, customer, deliveryPartner, status, isFullscreen, onFullscreenToggle }) => {
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 ${
      isFullscreen ? 'h-screen rounded-none' : 'h-64 md:h-80 lg:h-96'
    }`}>
      {/* Map Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Live Tracking</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Google Maps Integration</p>
        </div>
      </div>

      {/* Location Markers */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {restaurant.name}
        </span>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {status !== 'delivered' ? 'Live' : 'Delivered'}
        </span>
      </div>

      {/* Delivery Partner Marker */}
      {status !== 'delivered' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl shadow-lg shadow-orange-500/50"
          >
            🛵
          </motion.div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button
          onClick={onFullscreenToggle}
          className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
        >
          {isFullscreen ? (
            <FiMinimize className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <FiMaximize className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
};

// Order Item Component
const OrderItem = ({ item }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-2xl flex-shrink-0">
        {item.image || '🍽️'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-800 dark:text-white text-sm truncate">
            {item.name}
          </p>
          {item.isVeg && <FaLeaf className="w-3 h-3 text-green-500" />}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {item.quantity} × ${item.price}
        </p>
      </div>
      <span className="font-bold text-gray-800 dark:text-white text-sm">
        ${(item.price * item.quantity).toFixed(2)}
      </span>
    </div>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const LiveTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState('placed');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Mock loading data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setOrder(mockOrderData);
        setCurrentStatus(mockOrderData.status);
      } catch (error) {
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  // Simulate real-time updates
  useEffect(() => {
    if (!order) return;

    const statuses = ['placed', 'accepted', 'preparing', 'ready', 'assigned', 'picked_up', 'on_the_way', 'nearby'];
    let index = statuses.indexOf(currentStatus);

    const interval = setInterval(() => {
      if (index < statuses.length - 1 && currentStatus !== 'delivered') {
        index++;
        setCurrentStatus(statuses[index]);
        toast.success(`Order ${statuses[index].replace('_', ' ')}!`);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [order, currentStatus]);

  const handleTip = async () => {
    if (tipAmount <= 0) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`$${tipAmount} tip added!`);
      setShowTipModal(false);
      setTipAmount(0);
    } catch (error) {
      toast.error('Failed to add tip');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRating = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Thank you for your rating! ⭐');
      setShowRatingModal(false);
      setRating(0);
      setReview('');
    } catch (error) {
      toast.error('Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelOrder = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Order cancelled successfully');
      setShowCancelConfirm(false);
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to cancel order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard?.writeText(`${window.location.origin}/tracking/${orderId}`);
      toast.success('Tracking link copied! 📋');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-48" />
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!order) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="text-6xl mb-4">😅</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Order Not Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              The order you're looking for doesn't exist.
            </p>
            <Link to="/orders">
              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all">
                View All Orders
              </button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const statusIndex = statusFlow.findIndex(s => s.key === currentStatus);
  const currentStatusData = statusFlow[statusIndex] || statusFlow[0];
  const isDelivered = currentStatus === 'delivered';
  const canCancel = ['placed', 'accepted'].includes(currentStatus);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Live Tracking
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {order.id}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FiShare2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <FiDownload className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </motion.div>

          {/* Status Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-3 h-3 rounded-full ${statusColors[currentStatus] || 'bg-gray-400'} animate-pulse`} />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {currentStatusData.label}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isDelivered ? 'Order delivered successfully! 🎉' : 'Your order is on its way'}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((statusIndex + 1) / statusFlow.length) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
              />
            </div>

            {/* Status Timeline */}
            <div className="mt-6">
              {statusFlow.map((status, index) => {
                const isCompleted = index <= statusIndex;
                const isActive = index === statusIndex;
                return (
                  <StatusItem
                    key={status.key}
                    status={status}
                    isCompleted={isCompleted}
                    isActive={isActive}
                    isLast={index === statusFlow.length - 1}
                    label={status.label}
                    icon={status.icon}
                    time={status.time}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* ETA */}
          {!isDelivered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <ETADisplay
                eta={order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '11:45 AM'}
                distance={order.distance || '3.2 km'}
                duration={order.duration || '15 min'}
              />
            </motion.div>
          )}

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <MapPlaceholder
              restaurant={order.restaurant}
              customer={order.customer}
              deliveryPartner={order.deliveryPartner}
              status={currentStatus}
              isFullscreen={isFullscreen}
              onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
            />
          </motion.div>

          {/* Delivery Partner */}
          {!isDelivered && order.deliveryPartner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <DeliveryPartnerCard
                partner={order.deliveryPartner}
                onCall={() => window.location.href = `tel:${order.deliveryPartner.phone}`}
                onChat={() => toast.info('Chat feature coming soon!')}
                onTip={() => setShowTipModal(true)}
              />
            </motion.div>
          )}

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6 mb-6"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FaUtensils className="text-orange-500" />
              Order Details
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={order.restaurant.image}
                  alt={order.restaurant.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {order.restaurant.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.restaurant.address}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <OrderItem key={index} item={item} />
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-800 dark:text-white">${order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
                  <span className="text-gray-800 dark:text-white">${order.deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Platform Fee</span>
                  <span className="text-gray-800 dark:text-white">${order.platformFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">GST</span>
                  <span className="text-gray-800 dark:text-white">${order.gst}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-800 dark:text-white">Total</span>
                  <span className="text-orange-500">${order.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Payment Method</span>
                  <span className="text-gray-800 dark:text-white">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Payment Status</span>
                  <span className="text-green-600 font-medium">{order.paymentStatus}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {isDelivered ? (
              <>
                <button
                  onClick={() => setShowRatingModal(true)}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/40 transition-all flex items-center justify-center gap-2"
                >
                  <FiStar className="w-5 h-5" />
                  Rate & Review
                </button>
                <button className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2">
                  <FiPackage className="w-5 h-5" />
                  Reorder
                </button>
              </>
            ) : (
              <>
                {canCancel && (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="px-6 py-3 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <FiX className="w-5 h-5" />
                    Cancel Order
                  </button>
                )}
                <button
                  onClick={() => toast.info('Support contacted!')}
                  className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <FiInfo className="w-5 h-5" />
                  Need Help?
                </button>
              </>
            )}
          </motion.div>
        </div>

        {/* Tip Modal */}
        <AnimatePresence>
          {showTipModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowTipModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card rounded-3xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                  💰 Tip Your Delivery Partner
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                  Show your appreciation for great service!
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[2, 3, 5, 7, 10, 15].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTipAmount(amount)}
                      className={`py-3 rounded-xl font-semibold transition-all ${
                        tipAmount === amount
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={tipAmount || ''}
                    onChange={(e) => setTipAmount(parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  />
                  <button
                    onClick={handleTip}
                    disabled={tipAmount <= 0 || isSubmitting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Send'
                    )}
                  </button>
                </div>

                <button
                  onClick={() => setShowTipModal(false)}
                  className="w-full mt-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  Skip
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rating Modal */}
        <AnimatePresence>
          {showRatingModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowRatingModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card rounded-3xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                  ⭐ Rate Your Experience
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                  How was your delivery experience?
                </p>

                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-3xl transition-transform hover:scale-110"
                    >
                      <FiStar
                        className={`${
                          star <= rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder="Share your experience (optional)"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                />

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setShowRatingModal(false)}
                    className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleRating}
                    disabled={rating === 0 || isSubmitting}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cancel Confirmation Modal */}
        <AnimatePresence>
          {showCancelConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card rounded-3xl max-w-md w-full p-6 text-center"
              >
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Cancel Order?
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Are you sure you want to cancel this order? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Keep Order
                  </button>
                  <button
                    onClick={handleCancelOrder}
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                      'Yes, Cancel'
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default LiveTracking;