// src/pages/restaurants/RestaurantList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiMapPin, 
  FiStar, 
  FiClock, 
  FiFilter,
  FiX,
  FiGrid,
  FiList,
  FiChevronDown,
  FiHeart,
  FiTruck,
  FiDollarSign,
} from 'react-icons/fi';
import { FaLeaf, FaUtensils } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { restaurantService } from '../../services/restaurantService';
import { useCartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: 0,
    deliveryTime: 0,
    priceRange: 'all',
    isVeg: false,
    isOpen: false,
  });

  const { addToCart } = useCartContext();

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'pizza', label: 'Pizza', icon: '🍕' },
    { id: 'burger', label: 'Burgers', icon: '🍔' },
    { id: 'sushi', label: 'Sushi', icon: '🍣' },
    { id: 'pasta', label: 'Pasta', icon: '🍝' },
    { id: 'indian', label: 'Indian', icon: '🍛' },
    { id: 'chinese', label: 'Chinese', icon: '🥡' },
    { id: 'mexican', label: 'Mexican', icon: '🌮' },
    { id: 'dessert', label: 'Desserts', icon: '🍰' },
    { id: 'healthy', label: 'Healthy', icon: '🥗' },
  ];

  // Price ranges
  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'low', label: '$ - Budget' },
    { id: 'medium', label: '$$ - Moderate' },
    { id: 'high', label: '$$$ - Premium' },
  ];

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual API call
      const mockRestaurants = [
        {
          id: 1,
          name: 'Pizza Palace',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
          cuisine: 'Italian, Pizza',
          rating: 4.8,
          reviews: 1245,
          deliveryTime: '25-35 min',
          distance: '1.2 km',
          priceRange: 'medium',
          isVeg: true,
          isOpen: true,
          isFavorite: false,
          discount: '20% OFF',
          minOrder: 10,
          deliveryFee: 'FREE',
        },
        {
          id: 2,
          name: 'Burger House',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
          cuisine: 'American, Fast Food',
          rating: 4.6,
          reviews: 890,
          deliveryTime: '20-30 min',
          distance: '2.5 km',
          priceRange: 'low',
          isVeg: false,
          isOpen: true,
          isFavorite: false,
          discount: '15% OFF',
          minOrder: 8,
          deliveryFee: '$2.99',
        },
        {
          id: 3,
          name: 'Sushi Master',
          image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
          cuisine: 'Japanese, Sushi',
          rating: 4.9,
          reviews: 2100,
          deliveryTime: '30-40 min',
          distance: '3.1 km',
          priceRange: 'high',
          isVeg: false,
          isOpen: true,
          isFavorite: false,
          discount: '10% OFF',
          minOrder: 15,
          deliveryFee: '$1.99',
        },
        {
          id: 4,
          name: 'Pasta Paradise',
          image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400',
          cuisine: 'Italian, Pasta',
          rating: 4.7,
          reviews: 1567,
          deliveryTime: '25-35 min',
          distance: '1.8 km',
          priceRange: 'medium',
          isVeg: true,
          isOpen: true,
          isFavorite: false,
          discount: '25% OFF',
          minOrder: 12,
          deliveryFee: 'FREE',
        },
        {
          id: 5,
          name: 'Spice Garden',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
          cuisine: 'Indian, Tandoori',
          rating: 4.5,
          reviews: 980,
          deliveryTime: '35-45 min',
          distance: '4.2 km',
          priceRange: 'medium',
          isVeg: true,
          isOpen: false,
          isFavorite: false,
          discount: '30% OFF',
          minOrder: 10,
          deliveryFee: '$3.99',
        },
        {
          id: 6,
          name: 'Taco Bell',
          image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400',
          cuisine: 'Mexican, Fast Food',
          rating: 4.4,
          reviews: 750,
          deliveryTime: '20-30 min',
          distance: '2.0 km',
          priceRange: 'low',
          isVeg: false,
          isOpen: true,
          isFavorite: false,
          discount: '10% OFF',
          minOrder: 6,
          deliveryFee: '$1.99',
        },
        {
          id: 7,
          name: 'Sweet Treats',
          image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
          cuisine: 'Desserts, Bakery',
          rating: 4.9,
          reviews: 2100,
          deliveryTime: '15-25 min',
          distance: '0.8 km',
          priceRange: 'low',
          isVeg: true,
          isOpen: true,
          isFavorite: false,
          discount: '20% OFF',
          minOrder: 5,
          deliveryFee: 'FREE',
        },
        {
          id: 8,
          name: 'Healthy Bites',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
          cuisine: 'Healthy, Salads',
          rating: 4.6,
          reviews: 890,
          deliveryTime: '20-30 min',
          distance: '2.7 km',
          priceRange: 'medium',
          isVeg: true,
          isOpen: true,
          isFavorite: false,
          discount: '15% OFF',
          minOrder: 10,
          deliveryFee: '$2.99',
        },
      ];

      setRestaurants(mockRestaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      toast.error('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic
    fetchRestaurants();
  };

  const toggleFavorite = (id) => {
    setRestaurants(prev =>
      prev.map(rest =>
        rest.id === id ? { ...rest, isFavorite: !rest.isFavorite } : rest
      )
    );
  };

  const handleAddToCart = (restaurant) => {
    toast.success(`Added ${restaurant.name} to cart!`);
    // Add to cart logic
  };

  const filteredRestaurants = restaurants.filter(rest => {
    // Search filter
    if (searchQuery && !rest.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !rest.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== 'all' && !rest.cuisine.toLowerCase().includes(selectedCategory)) {
      return false;
    }
    
    // Rating filter
    if (filters.rating > 0 && rest.rating < filters.rating) {
      return false;
    }
    
    // Price range filter
    if (filters.priceRange !== 'all' && rest.priceRange !== filters.priceRange) {
      return false;
    }
    
    // Veg filter
    if (filters.isVeg && !rest.isVeg) {
      return false;
    }
    
    // Open filter
    if (filters.isOpen && !rest.isOpen) {
      return false;
    }
    
    return true;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Find Restaurants
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Discover the best food near you
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="mb-6">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for restaurants, cuisines..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl food-input"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <FiFilter className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all"
              >
                Search
              </button>
            </form>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  {/* Rating Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Rating:</span>
                    {[0, 3, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({ ...filters, rating })}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          filters.rating === rating
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {rating === 0 ? 'All' : `${rating}+`}
                      </button>
                    ))}
                  </div>

                  {/* Price Range */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Price:</span>
                    {priceRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setFilters({ ...filters, priceRange: range.id })}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          filters.priceRange === range.id
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={filters.isVeg}
                      onChange={(e) => setFilters({ ...filters, isVeg: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    Pure Veg
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={filters.isOpen}
                      onChange={(e) => setFilters({ ...filters, isOpen: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    Open Now
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredRestaurants.length} restaurants found
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200'
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200'
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Restaurant Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="flex gap-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                No restaurants found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  }`}
                >
                  {/* Image */}
                  <Link to={`/restaurant/${restaurant.id}`}>
                    <div className={`relative ${viewMode === 'list' ? 'md:w-64 h-48 md:h-auto' : 'w-full h-48'} overflow-hidden`}>
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {restaurant.discount && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold">
                          {restaurant.discount}
                        </div>
                      )}
                      {!restaurant.isOpen && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Closed</span>
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(restaurant.id);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
                      >
                        <FiHeart
                          className={`w-5 h-5 ${
                            restaurant.isFavorite
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                        />
                      </button>
                    </div>
                  </Link>

                  {/* Details */}
                  <div className={`p-4 flex-1 flex flex-col ${
                    viewMode === 'list' ? 'md:p-6' : ''
                  }`}>
                    <Link to={`/restaurant/${restaurant.id}`}>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white hover:text-orange-500 transition-colors">
                        {restaurant.name}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {restaurant.cuisine}
                    </p>

                    <div className="flex items-center gap-4 text-sm mb-3">
                      <span className="flex items-center gap-1 text-yellow-500">
                        <FiStar className="fill-current w-4 h-4" />
                        {restaurant.rating}
                        <span className="text-gray-400">({restaurant.reviews})</span>
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FiClock className="w-4 h-4" />
                        {restaurant.deliveryTime}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FiMapPin className="w-4 h-4" />
                        {restaurant.distance}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {restaurant.isVeg && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium">
                          <FaLeaf className="w-3 h-3" />
                          Pure Veg
                        </span>
                      )}
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium">
                        <FiTruck className="w-3 h-3" />
                        {restaurant.deliveryFee}
                      </span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-medium">
                        <FiDollarSign className="w-3 h-3" />
                        Min ${restaurant.minOrder}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-1">
                        {restaurant.isOpen ? (
                          <span className="flex items-center gap-1 text-green-500 text-xs">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Open Now
                          </span>
                        ) : (
                          <span className="text-red-500 text-xs flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            Closed
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(restaurant)}
                        className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                          restaurant.isOpen
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!restaurant.isOpen}
                      >
                        {restaurant.isOpen ? 'Order Now' : 'Unavailable'}
                      </button>
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

export default RestaurantList;