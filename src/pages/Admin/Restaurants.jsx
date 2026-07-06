import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiRefreshCw,
  FiDownload,
  FiMapPin,
  FiStar,
  FiClock,
  FiUser,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiXCircle,
  FiAward,
  FiGift,
  FiZap
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

const Restaurants = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockRestaurants = [
          {
            id: 1,
            name: 'Pizza Palace',
            cuisine: 'Italian',
            rating: 4.8,
            reviews: 1245,
            location: 'Andheri East, Mumbai',
            owner: 'Rajesh Kumar',
            email: 'rajesh@pizzapalace.com',
            phone: '+91 9876543210',
            status: 'active',
            joined: '2024-01-15',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
            isFeatured: true,
            totalOrders: 342
          },
          {
            id: 2,
            name: 'Burger House',
            cuisine: 'American',
            rating: 4.6,
            reviews: 987,
            location: 'Bandra West, Mumbai',
            owner: 'Sanjay Mehta',
            email: 'sanjay@burgerhouse.com',
            phone: '+91 9876543211',
            status: 'active',
            joined: '2024-01-14',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
            isFeatured: true,
            totalOrders: 289
          },
          {
            id: 3,
            name: 'Sushi Master',
            cuisine: 'Japanese',
            rating: 4.9,
            reviews: 2156,
            location: 'Lower Parel, Mumbai',
            owner: 'Kenji Tanaka',
            email: 'kenji@sushimaster.com',
            phone: '+91 9876543212',
            status: 'active',
            joined: '2024-01-13',
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
            isFeatured: true,
            totalOrders: 412
          },
          {
            id: 4,
            name: 'Taco Fiesta',
            cuisine: 'Mexican',
            rating: 4.4,
            reviews: 654,
            location: 'Juhu, Mumbai',
            owner: 'Carlos Lopez',
            email: 'carlos@tacofiesta.com',
            phone: '+91 9876543213',
            status: 'pending',
            joined: '2024-01-12',
            image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400',
            isFeatured: false,
            totalOrders: 0
          },
          {
            id: 5,
            name: 'Thai Garden',
            cuisine: 'Thai',
            rating: 4.7,
            reviews: 876,
            location: 'Andheri West, Mumbai',
            owner: 'Nina Patel',
            email: 'nina@thaigarden.com',
            phone: '+91 9876543214',
            status: 'inactive',
            joined: '2024-01-11',
            image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400',
            isFeatured: false,
            totalOrders: 198
          },
          {
            id: 6,
            name: 'Pasta Paradise',
            cuisine: 'Italian',
            rating: 4.5,
            reviews: 543,
            location: 'BKC, Mumbai',
            owner: 'Maria Rossi',
            email: 'maria@pastaparadise.com',
            phone: '+91 9876543215',
            status: 'pending',
            joined: '2024-01-10',
            image: 'https://images.unsplash.com/photo-1645112411342-4665a10a3a1d?w=400',
            isFeatured: false,
            totalOrders: 0
          }
        ];

        setRestaurants(mockRestaurants);
        setFilteredRestaurants(mockRestaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    let filtered = [...restaurants];

    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.joined) - new Date(a.joined));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.joined) - new Date(b.joined));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'orders':
        filtered.sort((a, b) => b.totalOrders - a.totalOrders);
        break;
      default:
        break;
    }

    setFilteredRestaurants(filtered);
  }, [searchQuery, statusFilter, sortBy, restaurants]);

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
      pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
    };
    return colors[status] || colors.pending;
  };

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
              Loading restaurants...
            </p>
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
              <FaUtensils className="text-orange-500" />
              Restaurants Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage all restaurants on the platform
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiRefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              <FiDownload className="w-4 h-4" />
              Export
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              <FiPlus className="w-4 h-4" />
              Add Restaurant
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Restaurants', value: restaurants.length, icon: FaUtensils, color: 'from-orange-500 to-red-500' },
            { label: 'Active', value: restaurants.filter(r => r.status === 'active').length, icon: FiCheckCircle, color: 'from-green-500 to-emerald-500' },
            { label: 'Pending', value: restaurants.filter(r => r.status === 'pending').length, icon: FiClock, color: 'from-yellow-500 to-orange-500' },
            { label: 'Inactive', value: restaurants.filter(r => r.status === 'inactive').length, icon: FiXCircle, color: 'from-red-500 to-rose-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-4 text-center hover:shadow-3xl transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-lg mx-auto mb-2`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <div className="glass-card rounded-2xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search restaurants by name, cuisine, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl food-input"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  showFilters ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' : 'glass-card hover:shadow-2xl'
                }`}
              >
                <FiFilter className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl food-input min-w-[130px]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl food-input min-w-[130px]"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="rating">Highest Rating</option>
                  <option value="orders">Most Orders</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurants Table */}
        <div className="glass-card rounded-2xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3">Restaurant</th>
                  <th className="pb-3">Cuisine</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Rating</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Orders</th>
                  <th className="pb-3">Owner</th>
                  <th className="pb-3">Joined</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRestaurants.map((restaurant) => (
                  <tr key={restaurant.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30">
                          {restaurant.image ? (
                            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg">🏪</div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{restaurant.name}</p>
                          {restaurant.isFeatured && (
                            <span className="text-[10px] bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-1.5 py-0.5 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">{restaurant.cuisine}</td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <FiMapPin className="w-3 h-3 text-gray-400" />
                      {restaurant.location}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-800 dark:text-white">{restaurant.rating}</span>
                        <span className="text-xs text-gray-400">({restaurant.reviews})</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(restaurant.status)}`}>
                        {restaurant.status}
                      </span>
                    </td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">{restaurant.totalOrders}</td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">{restaurant.owner}</td>
                    <td className="py-3 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(restaurant.joined).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Link to={`/restaurant/${restaurant.id}`}>
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <FiEye className="w-4 h-4 text-gray-400" />
                          </button>
                        </Link>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <FiEdit2 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <FiTrash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No restaurants found</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Restaurants;