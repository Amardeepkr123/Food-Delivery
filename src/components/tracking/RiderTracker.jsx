// src/pages/deliveryPartner/RiderTracker.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiPhone,
  FiMessageCircle,
  FiMapPin,
  FiNavigation,
  FiClock,
  FiTruck,
  FiStar,
  FiAward,
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiMaximize,
  FiMinimize,
  FiZap,
  FiBattery,
  FiWifi,
  FiSignal,
  FiShare2,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiInfo,
  FiSend,
  FiEdit2,
  FiTrash2,
  FiLoader,
  FiTarget,
  FiHome,
  FiShoppingBag,
  FiPackage,
  FiSmile,
  FiThumbsUp,
  FiThumbsDown,
  FiExternalLink,
  FiCopy,
  FiCheck,
  FiX,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { FaMotorcycle, FaUtensils, FaLeaf, FaCamera } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';

// ============================================
// MOCK DATA
// ============================================
const mockRiderProfile = {
  id: 'RID-001',
  name: 'Rajesh Singh',
  email: 'rajesh@delivery.com',
  phone: '+91 98765 43210',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  employeeId: 'EMP-2024-001',
  isOnline: true,
  isVerified: true,
  rating: 4.9,
  totalDeliveries: 2450,
  experience: '3 years',
  vehicleType: 'Honda Activa 6G',
  vehicleNumber: 'MH-01-AB-1234',
  currentLocation: { lat: 28.6000, lng: 77.2000 },
  batteryStatus: 78,
  networkStatus: 'strong',
  gpsStatus: 'active',
};

const mockOrderData = {
  id: 'ORD-2024-001',
  restaurant: {
    id: 'RES-001',
    name: 'Pizza Palace',
    logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200',
    address: '123, Marine Drive, Mumbai - 400001',
    phone: '+91 98765 43211',
    location: { lat: 19.0760, lng: 72.8777 },
  },
  customer: {
    id: 'CUS-001',
    name: 'Amit Kumar',
    phone: '+91 98765 43212',
    address: '456, Connaught Place, Delhi - 110001',
    location: { lat: 28.6139, lng: 77.2090 },
    deliveryInstructions: 'Ring the doorbell, leave at reception',
    gateNumber: 'Gate No. 3',
    landmark: 'Near City Center Mall',
  },
  orderTime: '10:30 AM',
  pickupTime: '10:35 AM',
  deliveryTime: '11:45 AM',
  paymentMethod: 'Credit Card',
  paymentStatus: 'paid',
  totalAmount: 54.27,
  status: 'on_the_way',
  distance: 3.2,
  duration: 15,
};

const mockTimeline = [
  { status: 'placed', label: 'Order Placed', time: '10:30 AM', completed: true },
  { status: 'accepted', label: 'Restaurant Accepted', time: '10:35 AM', completed: true },
  { status: 'preparing', label: 'Preparing Food', time: '10:45 AM', completed: true },
  { status: 'ready', label: 'Food Ready', time: '11:00 AM', completed: true },
  { status: 'assigned', label: 'Rider Assigned', time: '11:05 AM', completed: true },
  { status: 'reached_restaurant', label: 'Rider Reached Restaurant', time: '11:10 AM', completed: true },
  { status: 'picked_up', label: 'Picked Up', time: '11:15 AM', completed: true },
  { status: 'on_the_way', label: 'On The Way', time: '11:20 AM', completed: true },
  { status: 'near_customer', label: 'Near Customer', time: 'Expected 11:40 AM', completed: false },
  { status: 'delivered', label: 'Delivered', time: 'Expected 11:45 AM', completed: false },
];

const mockHistory = [
  { id: 'ORD-2024-005', restaurant: 'Burger King', customer: 'Priya Sharma', distance: '2.1 km', time: '12:30 PM', rating: 4.8, earnings: 85, status: 'completed' },
  { id: 'ORD-2024-004', restaurant: 'Sushi Master', customer: 'Vikram Singh', distance: '3.5 km', time: '11:30 AM', rating: 4.9, earnings: 120, status: 'completed' },
  { id: 'ORD-2024-003', restaurant: 'Taco Bell', customer: 'Sneha Patel', distance: '1.8 km', time: '10:30 AM', rating: 4.5, earnings: 70, status: 'completed' },
];

const mockNotifications = [
  { id: 1, message: 'Order #ORD-2024-006 assigned to you', time: '2 mins ago', type: 'info' },
  { id: 2, message: 'Food is ready for pickup at Pizza Palace', time: '5 mins ago', type: 'success' },
  { id: 3, message: 'Traffic congestion on Main Street, alternate route suggested', time: '10 mins ago', type: 'warning' },
];

// ============================================
// COMPONENTS
// ============================================

// Status Badge
const StatusBadge = ({ status }) => {
  const statusMap = {
    completed: { label: 'Completed', color: 'bg-green-500' },
    pending: { label: 'Pending', color: 'bg-yellow-500' },
    cancelled: { label: 'Cancelled', color: 'bg-red-500' },
    on_the_way: { label: 'On The Way', color: 'bg-orange-500' },
    delivered: { label: 'Delivered', color: 'bg-green-500' },
  };

  const { label, color } = statusMap[status] || statusMap.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      {label}
    </span>
  );
};

// Timeline Item
const TimelineItem = ({ item, index, isLast }) => {
  return (
    <div className="relative flex items-start gap-4">
      {/* Line */}
      {!isLast && (
        <div className={`absolute left-4 top-8 w-0.5 h-12 ${
          item.completed ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
        }`} />
      )}

      {/* Icon */}
      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        item.completed ? 'bg-orange-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
      }`}>
        {item.completed ? (
          <FiCheckCircle className="w-4 h-4" />
        ) : (
          <FiClock className="w-4 h-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-center justify-between">
          <p className={`font-medium ${item.completed ? 'text-gray-800 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
            {item.label}
          </p>
          <span className={`text-xs ${item.completed ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}`}>
            {item.time}
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const RiderTracker = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rider, setRider] = useState(mockRiderProfile);
  const [order, setOrder] = useState(mockOrderData);
  const [timeline, setTimeline] = useState(mockTimeline);
  const [history, setHistory] = useState(mockHistory);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOnline, setIsOnline] = useState(rider.isOnline);
  const [currentStatus, setCurrentStatus] = useState('on_the_way');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isTracking, setIsTracking] = useState(true);
  const [progress, setProgress] = useState(75);
  const [speed, setSpeed] = useState(32);
  const [distanceCovered, setDistanceCovered] = useState(1.8);
  const [remainingDistance, setRemainingDistance] = useState(1.4);
  const [eta, setEta] = useState('8 min');
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('live');

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      // Update progress
      setProgress(prev => Math.min(prev + 0.5, 100));
      
      // Update distance
      setDistanceCovered(prev => Math.min(prev + 0.05, 3.2));
      setRemainingDistance(prev => Math.max(prev - 0.05, 0));
      
      // Update ETA
      if (remainingDistance > 0) {
        const mins = Math.ceil(remainingDistance * 4);
        setEta(`${mins} min`);
      } else {
        setEta('Arriving now');
      }

      // Update speed
      setSpeed(prev => Math.floor(25 + Math.random() * 15));

      // Auto-complete timeline
      const currentIndex = timeline.findIndex(t => !t.completed);
      if (currentIndex > 0 && currentIndex < timeline.length) {
        if (Math.random() > 0.7) {
          setTimeline(prev => {
            const updated = [...prev];
            updated[currentIndex - 1].completed = true;
            if (currentIndex < updated.length) {
              updated[currentIndex].time = dayjs().format('h:mm A');
            }
            return updated;
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [loading, remainingDistance, timeline]);

  // Handle status toggle
  const handleToggleStatus = () => {
    setIsOnline(!isOnline);
    toast.success(isOnline ? 'You are now offline' : 'You are now online');
  };

  // Handle navigation
  const handleNavigate = () => {
    toast.info('Opening Google Maps navigation...');
  };

  // Handle call
  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  // Handle chat
  const handleChat = () => {
    toast.info('Opening chat...');
  };

  // Handle refresh
  const handleRefresh = () => {
    toast.success('Location refreshed');
  };

  // Handle SOS
  const handleSOS = () => {
    if (window.confirm('Are you sure you want to trigger SOS alert?')) {
      toast.error('🚨 SOS Alert sent to emergency contacts!');
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-48" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                  <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
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
                  Rider Tracker
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {order.id} • {order.restaurant.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl glass-card hover:shadow-lg transition-all"
              >
                <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button className="p-2.5 rounded-xl glass-card hover:shadow-lg transition-all">
                <FiRefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-4">
              {/* Rider Profile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={rider.image}
                      alt={rider.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-orange-500"
                    />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                      isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        {rider.name}
                      </h3>
                      {rider.isVerified && (
                        <FiCheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {rider.employeeId}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-0.5 text-sm text-yellow-500">
                        <FiStar className="fill-current" /> {rider.rating}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {rider.totalDeliveries} deliveries
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-400">Vehicle</p>
                      <p className="font-medium text-gray-800 dark:text-white">{rider.vehicleType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Vehicle No.</p>
                      <p className="font-medium text-gray-800 dark:text-white">{rider.vehicleNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Experience</p>
                      <p className="font-medium text-gray-800 dark:text-white">{rider.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Phone</p>
                      <p className="font-medium text-gray-800 dark:text-white">{rider.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleCall(rider.phone)}
                    className="flex-1 py-2.5 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiPhone className="w-4 h-4" /> Call
                  </button>
                  <button
                    onClick={handleChat}
                    className="flex-1 py-2.5 rounded-xl bg-purple-500 text-white font-semibold text-sm hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiMessageCircle className="w-4 h-4" /> Chat
                  </button>
                  <button
                    onClick={() => toast.info('Location shared!')}
                    className="flex-1 py-2.5 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiShare2 className="w-4 h-4" /> Share
                  </button>
                </div>

                <button
                  onClick={handleToggleStatus}
                  className={`w-full mt-2 py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isOnline
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isOnline ? (
                    <>
                      <FiXCircle className="w-4 h-4" /> Go Offline
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="w-4 h-4" /> Go Online
                    </>
                  )}
                </button>
              </motion.div>

              {/* Live Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-4"
              >
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <FiZap className="text-orange-500" />
                  Live Stats
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-400">Speed</p>
                    <p className="text-lg font-bold text-orange-500">{speed} km/h</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-400">Distance</p>
                    <p className="text-lg font-bold text-blue-500">{distanceCovered.toFixed(1)} km</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-400">Remaining</p>
                    <p className="text-lg font-bold text-green-500">{remainingDistance.toFixed(1)} km</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-400">ETA</p>
                    <p className="text-lg font-bold text-purple-500">{eta}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs">
                  <span className="flex items-center gap-1 text-gray-500">
                    <FiBattery className={`${rider.batteryStatus > 50 ? 'text-green-500' : 'text-yellow-500'}`} />
                    {rider.batteryStatus}%
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <FiWifi className={`${rider.networkStatus === 'strong' ? 'text-green-500' : 'text-yellow-500'}`} />
                    {rider.networkStatus}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <FiSignal className="text-green-500" />
                    GPS {rider.gpsStatus}
                  </span>
                </div>
              </motion.div>

              {/* Emergency Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-4 border-2 border-red-500/20"
              >
                <h4 className="text-sm font-semibold text-red-500 mb-3 flex items-center gap-2">
                  <FiAlertCircle className="w-4 h-4" />
                  Emergency
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={handleSOS}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    🚨 SOS
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    <FiMessageCircle className="w-4 h-4" /> Support
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    <FiInfo className="w-4 h-4" /> Report
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative glass-card rounded-2xl overflow-hidden"
              >
                <div className="relative w-full h-80 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                  {/* Map Mock */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🗺️</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Live Tracking</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">Google Maps Integration</p>
                      <button
                        onClick={handleNavigate}
                        className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center gap-2 mx-auto"
                      >
                        <FiNavigation className="w-4 h-4" /> Open Navigation
                      </button>
                    </div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                      <FiMaximize className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                      <FiRefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                      <FiTarget className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>

                  {/* Status Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        Live Tracking
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                        <FiZap className="w-3 h-3" /> {eta}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                {['live', 'timeline', 'history'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 capitalize ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Live Tab */}
                  {activeTab === 'live' && (
                    <div className="space-y-4">
                      {/* Order Info */}
                      <div className="glass-card rounded-2xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Restaurant */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                              <FaUtensils className="text-orange-500" />
                              Restaurant
                            </h4>
                            <div className="flex items-center gap-3">
                              <img
                                src={order.restaurant.logo}
                                alt={order.restaurant.name}
                                className="w-12 h-12 rounded-xl object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white">
                                  {order.restaurant.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {order.restaurant.address}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleCall(order.restaurant.phone)}
                                className="px-3 py-1.5 rounded-xl bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition-colors flex items-center gap-1"
                              >
                                <FiPhone className="w-3 h-3" /> Call
                              </button>
                              <button className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1">
                                <FiMapPin className="w-3 h-3" /> Navigate
                              </button>
                            </div>
                          </div>

                          {/* Customer */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                              <FiUser className="text-blue-500" />
                              Customer
                            </h4>
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white">
                                {order.customer.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {order.customer.address}
                              </p>
                              {order.customer.deliveryInstructions && (
                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                  <FiInfo className="w-3 h-3" />
                                  {order.customer.deliveryInstructions}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleCall(order.customer.phone)}
                                className="px-3 py-1.5 rounded-xl bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition-colors flex items-center gap-1"
                              >
                                <FiPhone className="w-3 h-3" /> Call
                              </button>
                              <button className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1">
                                <FiMapPin className="w-3 h-3" /> Navigate
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Delivery Progress
                          </span>
                          <span className="text-sm font-bold text-orange-500">
                            {Math.round(progress)}%
                          </span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                          <span>{order.pickupTime}</span>
                          <span>ETA: {eta}</span>
                          <span>{order.deliveryTime}</span>
                        </div>
                      </div>

                      {/* Delivery Controls */}
                      <div className="flex flex-wrap gap-3">
                        <button className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2">
                          <FiNavigation className="w-5 h-5" />
                          Start Navigation
                        </button>
                        <button className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                          <FiTruck className="w-5 h-5" />
                          Pause
                        </button>
                        <button className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                          <FiRefreshCw className="w-5 h-5" />
                          Refresh
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Timeline Tab */}
                  {activeTab === 'timeline' && (
                    <div className="glass-card rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <FiClock className="text-orange-500" />
                        Delivery Timeline
                      </h3>
                      <div>
                        {timeline.map((item, index) => (
                          <TimelineItem
                            key={index}
                            item={item}
                            index={index}
                            isLast={index === timeline.length - 1}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* History Tab */}
                  {activeTab === 'history' && (
                    <div className="glass-card rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <FiPackage className="text-orange-500" />
                        Delivery History
                      </h3>
                      <div className="space-y-3">
                        {history.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                            <div>
                              <p className="font-medium text-gray-800 dark:text-white text-sm">
                                {item.restaurant}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {item.customer} • {item.distance} • {item.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="flex items-center gap-0.5 text-xs text-yellow-500">
                                  <FiStar className="fill-current" /> {item.rating}
                                </span>
                                <StatusBadge status={item.status} />
                              </div>
                              <p className="text-xs font-bold text-green-500">+₹{item.earnings}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RiderTracker;