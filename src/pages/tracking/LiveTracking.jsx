import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, 
  FiTruck, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle,
  FiUser,
  FiPhone,
  FiMessageSquare,
  FiNavigation,
  FiRefreshCw,
  FiZoomIn,
  FiZoomOut,
  FiMaximize,
  FiMinimize,
  FiStar,
  FiAward,
  FiTrendingUp,
  FiDollarSign,
  FiPackage,
  FiHome,
  FiFlag,
  FiInfo,
  FiAlertCircle,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX
} from 'react-icons/fi';
import { 
  FaUtensils, 
  FaPizzaSlice, 
  FaHamburger, 
  FaIceCream, 
  FaCoffee,
  FaLeaf,
  FaPepperHot,
  FaFish,
  FaBirthdayCake
} from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';

const LiveTracking = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [isTracking, setIsTracking] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockOrder = {
          id: '#ORD-2024-001',
          restaurant: 'Pizza Palace',
          customer: {
            name: 'Amit Sharma',
            phone: '+91 9876543210',
            address: '123 Foodie Street, Mumbai'
          },
          items: [
            { name: 'Margherita Pizza', quantity: 2, price: 16.99 },
            { name: 'Garlic Bread', quantity: 1, price: 4.99 }
          ],
          total: 36.97,
          deliveryPartner: {
            name: 'Rajesh Kumar',
            phone: '+91 9876543215',
            vehicle: 'Bike - MH-01-AB-1234',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
          },
          status: 'in_transit',
          orderTime: '2024-01-15T19:30:00Z',
          estimatedDelivery: '2024-01-15T20:05:00Z',
          deliveryAddress: {
            lat: 19.0760,
            lng: 72.8777,
            label: 'Delivery Location'
          },
          restaurantAddress: {
            lat: 19.0780,
            lng: 72.8750,
            label: 'Restaurant'
          },
          currentLocation: {
            lat: 19.0770,
            lng: 72.8760,
            label: 'Current Location'
          }
        };

        setOrder(mockOrder);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  // Simulate delivery progress
  useEffect(() => {
    if (!order) return;

    let interval;
    if (isTracking && deliveryProgress < 100) {
      interval = setInterval(() => {
        setDeliveryProgress(prev => {
          const newProgress = prev + Math.random() * 2;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isTracking, deliveryProgress, order]);

  const getStatusColor = (status) => {
    const colors = {
      'order_placed': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      'confirmed': 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      'preparing': 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      'ready': 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      'in_transit': 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
      'delivered': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
    };
    return colors[status] || colors.order_placed;
  };

  const getStatusIcon = (status) => {
    const icons = {
      'order_placed': FiPackage,
      'confirmed': FiCheckCircle,
      'preparing': FiClock,
      'ready': FiFlag,
      'in_transit': FiTruck,
      'delivered': FiCheckCircle
    };
    return icons[status] || FiPackage;
  };

  const getStatusText = (status) => {
    const texts = {
      'order_placed': 'Order Placed',
      'confirmed': 'Confirmed',
      'preparing': 'Preparing',
      'ready': 'Ready for Delivery',
      'in_transit': 'In Transit',
      'delivered': 'Delivered'
    };
    return texts[status] || status;
  };

  const deliverySteps = [
    { status: 'order_placed', label: 'Order Placed', time: '7:30 PM' },
    { status: 'confirmed', label: 'Confirmed', time: '7:35 PM' },
    { status: 'preparing', label: 'Preparing', time: '7:40 PM' },
    { status: 'ready', label: 'Ready', time: '7:50 PM' },
    { status: 'in_transit', label: 'In Transit', time: '8:00 PM' },
    { status: 'delivered', label: 'Delivered', time: '8:15 PM' },
  ];

  const getActiveStep = () => {
    const progress = deliveryProgress;
    if (progress < 20) return 0;
    if (progress < 40) return 1;
    if (progress < 60) return 2;
    if (progress < 80) return 3;
    if (progress < 100) return 4;
    return 5;
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const estimatedTime = order?.estimatedDelivery ? formatTime(order.estimatedDelivery) : '--:--';

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium animate-pulse">
              Loading tracking details...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!order) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">📍</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Order Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">No active order found to track.</p>
            <Link to="/orders">
              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300">
                View Orders
              </button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

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
              <FiNavigation className="text-orange-500" />
              Live Tracking
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Track your order in real-time
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Order ID: <span className="font-semibold text-gray-800 dark:text-white">{order.id}</span>
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiRefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>
        </motion.div>

        {/* Main Tracking Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl overflow-hidden relative" style={{ height: '500px' }}>
              {/* Map Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 relative">
                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button
                    onClick={handleZoomIn}
                    className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <FiZoomIn className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <FiZoomOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    {isFullscreen ? (
                      <FiMinimize className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <FiMaximize className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    )}
                  </button>
                </div>

                {/* Map Content */}
                <div className="w-full h-full flex items-center justify-center relative" style={{ transform: `scale(${zoom})` }}>
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 20px 20px, ${'#000'} 1px, transparent 1px)`,
                      backgroundSize: '40px 40px'
                    }} />
                  </div>

                  {/* Route Line */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 100 400 Q 300 300, 500 200 Q 700 100, 900 150"
                      stroke="#f97316"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="10 10"
                      className="animate-shimmer"
                    />
                    <circle cx="100" cy="400" r="8" fill="#ef4444" />
                    <circle cx="900" cy="150" r="8" fill="#22c55e" />
                    <circle
                      cx={100 + (800 * (deliveryProgress / 100))}
                      cy={400 - (250 * (deliveryProgress / 100))}
                      r="12"
                      fill="#f97316"
                      className="animate-pulse"
                    />
                  </svg>

                  {/* Location Markers */}
                  <div className="absolute bottom-10 left-10 flex items-center gap-3 bg-white/90 dark:bg-gray-800/90 p-3 rounded-xl shadow-lg">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">
                      {deliveryProgress < 100 ? 'In Transit' : 'Delivered'}
                    </span>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="text-6xl"
                    >
                      {deliveryProgress < 100 ? '🚚' : '✅'}
                    </motion.div>
                  </div>
                </div>

                {/* Progress Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-white mb-1">
                        <span>Order Progress</span>
                        <span>{Math.round(deliveryProgress)}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${deliveryProgress}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => setIsTracking(!isTracking)}
                      className="p-2 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
                    >
                      {isTracking ? <FiPause className="w-5 h-5" /> : <FiPlay className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Info Sidebar */}
          <div className="space-y-4">
            {/* Delivery Status */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiClock className="text-orange-500" />
                Delivery Status
              </h3>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{estimatedTime}</p>
                </div>
                <div className={`px-3 py-1 rounded-full ${getStatusColor(order.status)} text-sm font-semibold flex items-center gap-1`}>
                  {deliveryProgress < 100 ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      {getStatusText(order.status)}
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="w-4 h-4" />
                      Delivered
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {deliverySteps.map((step, index) => {
                  const isActive = index <= getActiveStep();
                  const isCurrent = index === getActiveStep();
                  const Icon = getStatusIcon(step.status);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 ${
                        isActive ? 'bg-gray-50 dark:bg-gray-800/50' : 'opacity-50'
                      } ${isCurrent ? 'border-2 border-orange-500' : ''}`}
                      onClick={() => setSelectedStep(index === selectedStep ? null : index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isActive ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className={`font-semibold ${isActive ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`}>
                            {step.label}
                          </span>
                          <span className="text-xs text-gray-400">{step.time}</span>
                        </div>
                        {isCurrent && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-orange-500 font-medium mt-1"
                          >
                            In Progress...
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Partner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiTruck className="text-orange-500" />
                Delivery Partner
              </h3>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  <img
                    src={order.deliveryPartner.image}
                    alt={order.deliveryPartner.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.textContent = order.deliveryPartner.name.charAt(0);
                    }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {order.deliveryPartner.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiStar className="text-yellow-400 fill-current" />
                    <span>{order.deliveryPartner.rating}</span>
                    <span>•</span>
                    <span>{order.deliveryPartner.vehicle}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center gap-2">
                  <FiPhone className="w-4 h-4" />
                  Call
                </button>
                <button className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2">
                  <FiMessageSquare className="w-4 h-4" />
                  Message
                </button>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FiPackage className="text-orange-500" />
                Order Summary
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Restaurant</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{order.restaurant}</span>
                </div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-gray-800 dark:text-white">
                  <span>Total</span>
                  <span className="text-orange-500">${order.total}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <FiMapPin className="text-orange-500" />
                <span>Delivering to: {order.customer.address}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LiveTracking;