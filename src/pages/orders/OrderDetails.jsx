// src/pages/orders/OrderDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiPackage,
  FiClock,
  FiMapPin,
  FiPhone,
  FiMail,
  FiDollarSign,
  FiCalendar,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiStar,
  FiShoppingBag,
  FiDownload,
  FiShare2,
  FiUser,
  FiHome,
  FiInfo,
  FiAlertCircle,
} from 'react-icons/fi';
import { FaUtensils, FaLeaf } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockOrder = {
          id: 'ORD-2024-001',
          restaurant: {
            name: 'Pizza Palace',
            image: '🍕',
            address: '123, Marine Drive, Mumbai - 400001',
            phone: '+91 98765 43211',
            email: 'info@pizzapalace.com',
          },
          items: [
            { name: 'Margherita Pizza', quantity: 2, price: 16.99, isVeg: true },
            { name: 'Garlic Bread', quantity: 1, price: 4.99, isVeg: true },
            { name: 'Coca-Cola', quantity: 2, price: 2.49, isVeg: true },
          ],
          subtotal: 46.94,
          deliveryFee: 2.99,
          platformFee: 1.99,
          gst: 2.35,
          discount: 5.00,
          total: 49.27,
          status: 'delivered',
          paymentMethod: 'Credit Card',
          paymentStatus: 'paid',
          date: '2024-01-15',
          time: '7:30 PM',
          deliveryAddress: '456, Connaught Place, Delhi - 110001',
          deliveryInstructions: 'Ring the doorbell, leave at reception',
          estimatedDelivery: '2024-01-15T11:45:00Z',
          actualDelivery: '2024-01-15T11:40:00Z',
          rating: 5,
          review: 'Amazing pizza! Best in town. Highly recommended!',
          timeline: [
            { status: 'Order Placed', time: '10:30 AM', completed: true },
            { status: 'Restaurant Accepted', time: '10:35 AM', completed: true },
            { status: 'Food Preparing', time: '10:45 AM', completed: true },
            { status: 'Food Ready', time: '11:00 AM', completed: true },
            { status: 'Rider Assigned', time: '11:05 AM', completed: true },
            { status: 'Picked Up', time: '11:10 AM', completed: true },
            { status: 'On The Way', time: '11:15 AM', completed: true },
            { status: 'Delivered', time: '11:40 AM', completed: true },
          ],
          deliveryPartner: {
            name: 'Rajesh Singh',
            phone: '+91 87654 32109',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            rating: 4.9,
          },
        };

        setOrder(mockOrder);
      } catch (error) {
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'text-green-500',
      cancelled: 'text-red-500',
      in_transit: 'text-blue-500',
      preparing: 'text-yellow-500',
    };
    return colors[status] || 'text-gray-500';
  };

  const getStatusText = (status) => {
    const texts = {
      delivered: 'Delivered',
      in_transit: 'In Transit',
      preparing: 'Preparing',
      cancelled: 'Cancelled',
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium animate-pulse">
              Loading order details...
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
            <div className="text-6xl mb-4">😅</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Order Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">The order you're looking for doesn't exist.</p>
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Order Details
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{order.id}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300">
              <FiDownload className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300">
              <FiShare2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </motion.div>

        {/* Order Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${getStatusColor(order.status)} bg-opacity-10 flex items-center justify-center`}>
              <FiPackage className={`w-6 h-6 ${getStatusColor(order.status)}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {getStatusText(order.status)}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {order.status === 'delivered' 
                  ? `Delivered on ${order.actualDelivery}`
                  : `Estimated delivery: ${order.estimatedDelivery}`
                }
              </p>
            </div>
            <span className={`ml-auto text-sm font-semibold ${getStatusColor(order.status)}`}>
              {order.status === 'delivered' ? '✅ Completed' : '⏳ In Progress'}
            </span>
          </div>
        </motion.div>

        {/* Restaurant Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-4xl">
              {order.restaurant.image}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {order.restaurant.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{order.restaurant.address}</p>
            </div>
            <Link to={`/restaurant/${order.restaurant.name.toLowerCase().replace(/\s/g, '-')}`}>
              <button className="px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors">
                View Restaurant
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FiShoppingBag className="text-orange-500" />
            Order Items
          </h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-lg">
                    {item.isVeg ? '🥬' : '🍖'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">x{item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-gray-800 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FiDollarSign className="text-orange-500" />
            Payment Summary
          </h3>
          <div className="space-y-2 text-sm">
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
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg">
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
        </motion.div>

        {/* Delivery Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FiMapPin className="text-orange-500" />
            Delivery Address
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{order.deliveryAddress}</p>
          {order.deliveryInstructions && (
            <div className="mt-2 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 text-sm text-yellow-700 dark:text-yellow-400">
              <span className="font-semibold">Instructions:</span> {order.deliveryInstructions}
            </div>
          )}
        </motion.div>

        {/* Delivery Partner */}
        {order.deliveryPartner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6 mb-6"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiTruck className="text-orange-500" />
              Delivery Partner
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={order.deliveryPartner.image}
                alt={order.deliveryPartner.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-white">
                  {order.deliveryPartner.name}
                </p>
                <div className="flex items-center gap-2 text-sm text-yellow-500">
                  <FiStar className="fill-current" /> {order.deliveryPartner.rating}
                </div>
              </div>
              <button
                onClick={() => window.location.href = `tel:${order.deliveryPartner.phone}`}
                className="p-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <FiPhone className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3"
        >
          {order.status === 'delivered' && (
            <>
              <button
                onClick={() => navigate('/checkout')}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
              >
                <FiShoppingBag className="w-5 h-5" />
                Reorder
              </button>
              <button className="flex-1 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                <FiStar className="w-5 h-5" />
                Rate Order
              </button>
            </>
          )}
          {order.status === 'in_transit' && (
            <button
              onClick={() => navigate(`/tracking/${order.id}`)}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2"
            >
              <FiTruck className="w-5 h-5" />
              Track Order
            </button>
          )}
          <button
            onClick={() => navigate('/support')}
            className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
          >
            <FiInfo className="w-5 h-5" />
            Need Help?
          </button>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default OrderDetails;