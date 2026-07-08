// src/components/map/LiveMap.jsx
import React, { useState, useEffect, useRef } from 'react';
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
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';

// ============================================
// MOCK DATA
// ============================================
const mockLocations = {
  restaurant: { lat: 19.0760, lng: 72.8777, name: 'Pizza Palace' },
  customer: { lat: 28.6139, lng: 77.2090, name: 'Amit Kumar' },
  deliveryPartner: { lat: 28.6000, lng: 77.2000, name: 'Rajesh Singh' },
};

// ============================================
// SUB-COMPONENTS
// ============================================

// Location Marker
const LocationMarker = ({ type, label, isActive, isAnimated }) => {
  const colors = {
    restaurant: 'bg-red-500',
    customer: 'bg-blue-500',
    delivery: 'bg-orange-500',
    default: 'bg-gray-500',
  };

  const icons = {
    restaurant: FiHome,
    customer: FiUser,
    delivery: FiTruck,
    default: FiMapPin,
  };

  const Icon = icons[type] || icons.default;
  const color = colors[type] || colors.default;

  return (
    <div className="relative flex items-center gap-2">
      <div className={`relative ${isAnimated ? 'animate-pulse' : ''}`}>
        <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-white shadow-lg`}>
          <Icon className="w-3 h-3" />
        </div>
        {isActive && (
          <div className="absolute inset-0 -m-1 rounded-full border-2 border-orange-400 animate-ping" />
        )}
      </div>
      {label && (
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-0.5 rounded-lg shadow-sm">
          {label}
        </span>
      )}
    </div>
  );
};

// Route Path (SVG)
const RoutePath = ({ path, color = '#f97316', isActive }) => {
  if (!path || path.length < 2) return null;

  const points = path.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray={isActive ? '8,4' : '0'}
        className={isActive ? 'animate-dash' : ''}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <style>
          {`
            @keyframes dash {
              to {
                stroke-dashoffset: -24;
              }
            }
            .animate-dash {
              animation: dash 1s linear infinite;
            }
          `}
        </style>
      </defs>
    </svg>
  );
};

// Info Card
const InfoCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className="glass-card rounded-xl p-3 text-center flex-1"
    >
      <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white mx-auto mb-1.5`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-sm font-semibold text-gray-800 dark:text-white">{value}</p>
    </motion.div>
  );
};

// ============================================
// MAIN LIVEMAP COMPONENT
// ============================================
const LiveMap = ({
  restaurantLocation,
  customerLocation,
  deliveryLocation,
  status = 'on_the_way',
  eta = '8 min',
  distance = '2.3 km',
  zoom = 14,
  isFullscreen = false,
  onFullscreenToggle,
  onRefresh,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreenState, setIsFullscreenState] = useState(isFullscreen);
  const [deliveryPartnerLocation, setDeliveryPartnerLocation] = useState(
    deliveryLocation || mockLocations.deliveryPartner
  );
  const [showInfo, setShowInfo] = useState(true);
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef(null);

  // Simulate real-time movement
  useEffect(() => {
    if (status === 'delivered') return;

    const interval = setInterval(() => {
      setDeliveryPartnerLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [status]);

  // Handle refresh
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDeliveryPartnerLocation(deliveryLocation || mockLocations.deliveryPartner);
      toast.success('Location refreshed');
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error('Failed to refresh location');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    const newState = !isFullscreenState;
    setIsFullscreenState(newState);
    if (onFullscreenToggle) {
      onFullscreenToggle(newState);
    }
  };

  // Get status color
  const getStatusColor = () => {
    const colors = {
      placed: 'text-blue-500',
      accepted: 'text-indigo-500',
      preparing: 'text-purple-500',
      ready: 'text-cyan-500',
      picked_up: 'text-orange-500',
      on_the_way: 'text-orange-500',
      nearby: 'text-green-500',
      delivered: 'text-green-500',
    };
    return colors[status] || 'text-gray-500';
  };

  // Get status label
  const getStatusLabel = () => {
    const labels = {
      placed: 'Order Placed',
      accepted: 'Restaurant Accepted',
      preparing: 'Food Preparing',
      ready: 'Food Ready',
      picked_up: 'Picked Up',
      on_the_way: 'On the Way',
      nearby: 'Near Your Location',
      delivered: 'Delivered',
    };
    return labels[status] || status;
  };

  // Calculate route path (mock)
  const routePath = [
    { x: 10, y: 80 },
    { x: 20, y: 60 },
    { x: 35, y: 50 },
    { x: 50, y: 45 },
    { x: 65, y: 40 },
    { x: 80, y: 30 },
    { x: 90, y: 20 },
  ];

  // Map markers positions (percentage-based for mock map)
  const markers = {
    restaurant: { x: 10, y: 80, label: restaurantLocation?.name || 'Restaurant' },
    customer: { x: 90, y: 20, label: customerLocation?.name || 'You' },
    delivery: { x: 50, y: 45, label: deliveryPartnerLocation?.name || 'Delivery Partner' },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative ${isFullscreenState ? 'fixed inset-0 z-50' : ''} ${className}`}
    >
      {/* Map Container */}
      <div
        ref={mapRef}
        className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 ${
          isFullscreenState ? 'h-screen rounded-none' : 'h-64 md:h-80 lg:h-96'
        }`}
      >
        {/* Map Background (Mock) */}
        <div className="absolute inset-0">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(10)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-gray-600 dark:bg-gray-400"
                style={{ top: `${i * 10}%` }}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px bg-gray-600 dark:bg-gray-400"
                style={{ left: `${i * 10}%` }}
              />
            ))}
          </div>

          {/* Route Path */}
          <RoutePath path={routePath} color="#f97316" isActive={status !== 'delivered'} />

          {/* Markers */}
          <div className="absolute inset-0">
            {/* Restaurant Marker */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${markers.restaurant.x}%`, top: `${markers.restaurant.y}%` }}
            >
              <LocationMarker
                type="restaurant"
                label={markers.restaurant.label}
                isActive={false}
                isAnimated={false}
              />
            </div>

            {/* Customer Marker */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${markers.customer.x}%`, top: `${markers.customer.y}%` }}
            >
              <LocationMarker
                type="customer"
                label={markers.customer.label}
                isActive={false}
                isAnimated={false}
              />
            </div>

            {/* Delivery Partner Marker */}
            {status !== 'delivered' && (
              <motion.div
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${markers.delivery.x}%`, top: `${markers.delivery.y}%` }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <LocationMarker
                  type="delivery"
                  label={markers.delivery.label}
                  isActive={true}
                  isAnimated={true}
                />
              </motion.div>
            )}
          </div>

          {/* Status Overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`} />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {getStatusLabel()}
            </span>
          </div>

          {/* Map Controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              <FiRefreshCw className={`w-4 h-4 text-gray-600 dark:text-gray-300 ${isLoading ? 'animate-spin' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFullscreenToggle}
              className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            >
              {isFullscreenState ? (
                <FiMinimize className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <FiMaximize className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            >
              <FiInfo className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            >
              <FiZap className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>

          {/* Info Cards */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2"
              >
                <InfoCard
                  title="ETA"
                  value={eta}
                  icon={FiClock}
                  color="bg-orange-500"
                />
                <InfoCard
                  title="Distance"
                  value={distance}
                  icon={FiNavigation}
                  color="bg-blue-500"
                />
                <InfoCard
                  title="Status"
                  value={getStatusLabel()}
                  icon={status === 'delivered' ? FiCheckCircle : FiAlertCircle}
                  color={status === 'delivered' ? 'bg-green-500' : 'bg-yellow-500'}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Close Button */}
      {isFullscreenState && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleFullscreenToggle}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
        >
          <FiXCircle className="w-6 h-6" />
        </motion.button>
      )}
    </motion.div>
  );
};

// ============================================
// EXPORTS
// ============================================
export default LiveMap;