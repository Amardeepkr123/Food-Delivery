// src/pages/orders/OrderTracking.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiMapPin,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiPackage,
  FiUser,
  FiPhone,
  FiStar,
  FiShare2,
} from 'react-icons/fi';
import { FaMotorcycle } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-hot-toast';

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockOrder = {
          id: 'ORD-2024-001',
          restaurant: 'Pizza Palace',
          status: 'on_the_way',
          estimatedDelivery: '11:45 AM',
          distance: '2.3 km',
          duration: '8 min',
          deliveryPartner: {
            name: 'Rajesh Singh',
            phone: '+91 87654 32109',
            rating: 4.9,
            vehicle: 'Honda Activa',
          },
          timeline: [
            { label: 'Order Placed', time: '10:30 AM', completed: true },
            { label: 'Restaurant Accepted', time: '10:35 AM', completed: true },
            { label: 'Preparing Food', time: '10:45 AM', completed: true },
            { label: 'Food Ready', time: '11:00 AM', completed: true },
            { label: 'Rider Assigned', time: '11:05 AM', completed: true },
            { label: 'Picked Up', time: '11:10 AM', completed: true },
            { label: 'On The Way', time: '11:15 AM', completed: true },
            { label: 'Near Your Location', time: 'Expected 11:35 AM', completed: false },
            { label: 'Delivered', time: 'Expected 11:45 AM', completed: false },
          ],
        };

        setOrder(mockOrder);
        setCurrentStatus(6);
      } catch (error) {
        toast.error('Failed to load tracking data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Simulate real-time updates
  useEffect(() => {
    if (!order) return;

    const interval = setInterval(() => {
      setCurrentStatus(prev => Math.min(prev + 1, 8));
    }, 5000);

    return () => clearInterval(interval);
  }, [order]);

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
              Loading tracking...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Order Tracking
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{order.id}</p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="glass-card rounded-2xl p-4 mb-6">
          <div className="relative w-full h-48 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Live Tracking</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Google Maps Integration</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
              <button className="p-1.5 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-lg">
                <FiShare2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-xl shadow-lg text-xs font-medium text-gray-700">
              🛵 {order.deliveryPartner.vehicle}
            </div>
          </div>
        </div>

        {/* ETA */}
        <div className="glass-card rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Arrival</p>
              <p className="text-2xl font-bold text-orange-500">{order.estimatedDelivery}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">{order.distance}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">{order.duration}</p>
            </div>
          </div>
        </div>

        {/* Delivery Partner */}
        <div className="glass-card rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white text-2xl font-bold">
              RS
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800 dark:text-white">
                  {order.deliveryPartner.name}
                </p>
                <span className="flex items-center gap-0.5 text-xs text-yellow-500">
                  <FiStar className="fill-current" /> {order.deliveryPartner.rating}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <FaMotorcycle className="w-3 h-3" />
                {order.deliveryPartner.vehicle}
              </div>
            </div>
            <button
              onClick={() => window.location.href = `tel:${order.deliveryPartner.phone}`}
              className="p-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <FiPhone className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-card rounded-2xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Delivery Timeline
          </h3>
          <div className="space-y-4">
            {order.timeline.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.completed ? 'bg-green-500 text-white' : index === currentStatus ? 'bg-orange-500 text-white animate-pulse' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                }`}>
                  {step.completed ? (
                    <FiCheckCircle className="w-4 h-4" />
                  ) : index === currentStatus ? (
                    <FiClock className="w-4 h-4" />
                  ) : (
                    <FiClock className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    step.completed ? 'text-gray-800 dark:text-white' : index === currentStatus ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-400">{step.time}</p>
                </div>
                {step.completed && (
                  <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderTracking;