// src/pages/deliveryPartner/DeliveryHistory.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPackage,
  FiMapPin,
  FiClock,
  FiUser,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiStar,
  FiRefreshCw,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiTruck,
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-toastify';

const DeliveryHistory = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchDeliveryHistory();
  }, []);

  const fetchDeliveryHistory = () => {
    setLoading(true);
    // Mock data - replace with actual API call
    setTimeout(() => {
      const mockDeliveries = [
        {
          id: 'DEL-001',
          orderId: 'ORD-12345',
          restaurant: 'Pizza Palace',
          customer: 'John Doe',
          total: 42.97,
          earnings: 5.50,
          status: 'delivered',
          distance: '2.5 km',
          date: '2024-01-15',
          time: '3:15 PM',
          rating: 5,
          deliveryTime: '25 min',
          tip: 2.00,
        },
        {
          id: 'DEL-002',
          orderId: 'ORD-12346',
          restaurant: 'Burger House',
          customer: 'Jane Smith',
          total: 28.99,
          earnings: 4.50,
          status: 'delivered',
          distance: '3.2 km',
          date: '2024-01-14',
          time: '4:30 PM',
          rating: 4,
          deliveryTime: '30 min',
          tip: 0,
        },
        {
          id: 'DEL-003',
          orderId: 'ORD-12347',
          restaurant: 'Sushi Master',
          customer: 'Bob Johnson',
          total: 35.50,
          earnings: 4.00,
          status: 'delivered',
          distance: '1.8 km',
          date: '2024-01-13',
          time: '6:45 PM',
          rating: 5,
          deliveryTime: '20 min',
          tip: 3.00,
        },
        {
          id: 'DEL-004',
          orderId: 'ORD-12348',
          restaurant: 'Pasta Paradise',
          customer: 'Alice Brown',
          total: 52.00,
          earnings: 6.50,
          status: 'delivered',
          distance: '4.0 km',
          date: '2024-01-12',
          time: '8:15 PM',
          rating: 3,
          deliveryTime: '35 min',
          tip: 0,
        },
        {
          id: 'DEL-005',
          orderId: 'ORD-12349',
          restaurant: 'Taco Bell',
          customer: 'Charlie Wilson',
          total: 19.99,
          earnings: 3.50,
          status: 'cancelled',
          distance: '2.0 km',
          date: '2024-01-11',
          time: '12:30 PM',
          rating: null,
          deliveryTime: 'N/A',
          tip: 0,
        },
        {
          id: 'DEL-006',
          orderId: 'ORD-12350',
          restaurant: 'Sweet Treats',
          customer: 'Diana Prince',
          total: 34.50,
          earnings: 4.00,
          status: 'delivered',
          distance: '1.5 km',
          date: '2024-01-10',
          time: '9:00 PM',
          rating: 5,
          deliveryTime: '15 min',
          tip: 4.00,
        },
      ];
      setDeliveries(mockDeliveries);
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const badges = {
      delivered: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
      returned: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    };
    return badges[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusLabel = (status) => {
    const labels = {
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      returned: 'Returned',
    };
    return labels[status] || status;
  };

  const renderStars = (rating) => {
    if (!rating) return 'No rating';
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const periods = [
    { id: 'all', label: 'All' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
  ];

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          delivery.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          delivery.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterPeriod === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return matchesSearch && delivery.date === today;
    }
    if (filterPeriod === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return matchesSearch && new Date(delivery.date) >= weekAgo;
    }
    if (filterPeriod === 'month') {
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      return matchesSearch && new Date(delivery.date) >= monthAgo;
    }
    return matchesSearch;
  });

  const stats = {
    total: deliveries.length,
    delivered: deliveries.filter(d => d.status === 'delivered').length,
    totalEarnings: deliveries.reduce((sum, d) => sum + d.earnings, 0),
    avgRating: deliveries.filter(d => d.rating).reduce((sum, d) => sum + d.rating, 0) / 
               deliveries.filter(d => d.rating).length || 0,
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading delivery history...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <FiPackage className="text-orange-500" />
                Delivery History
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {deliveries.length} total deliveries
              </p>
            </div>
            <button
              onClick={fetchDeliveryHistory}
              className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FiRefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Total Deliveries</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-500">{stats.delivered}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-orange-500">${stats.totalEarnings.toFixed(2)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Avg Rating</p>
              <p className="text-2xl font-bold text-yellow-500">{stats.avgRating.toFixed(1)} ★</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, restaurant, or customer..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setFilterPeriod(period.id)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                    filterPeriod === period.id
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Deliveries List */}
          {filteredDeliveries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                No Deliveries Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery || filterPeriod !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'You haven\'t completed any deliveries yet'}
              </p>
              <Link to="/delivery/available">
                <button className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                  Find Available Orders
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDeliveries.map((delivery, index) => (
                <motion.div
                  key={delivery.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    {/* Left Side */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {delivery.restaurant}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(delivery.status)}`}>
                          {getStatusLabel(delivery.status)}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <FiUser className="w-4 h-4" />
                          {delivery.customer}
                          <span className="text-gray-400">•</span>
                          <FiCalendar className="w-4 h-4" />
                          {delivery.date} at {delivery.time}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <FiMapPin className="w-4 h-4" />
                          {delivery.distance}
                          <span className="text-gray-400">•</span>
                          <FiClock className="w-4 h-4" />
                          {delivery.deliveryTime}
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-500">
                          ${delivery.earnings.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Total: ${delivery.total.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {delivery.tip > 0 && (
                          <span className="text-sm text-green-500">
                            💰 Tip: ${delivery.tip.toFixed(2)}
                          </span>
                        )}
                        {delivery.rating && renderStars(delivery.rating)}
                      </div>
                      <Link to={`/delivery/${delivery.id}`}>
                        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2">
                          View Details
                          <FiArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

// ✅ THIS IS THE FIX - DEFAULT EXPORT MUST BE PRESENT
export default DeliveryHistory;