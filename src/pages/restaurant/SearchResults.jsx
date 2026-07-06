import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiMapPin, 
  FiClock, 
  FiStar, 
  FiTruck, 
  FiHeart,
  FiShare2,
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiX,
  FiSliders,
  FiArrowRight,
  FiAward,
  FiGift,
  FiZap,
  FiTrendingUp,
  FiCoffee,
  FiSun,
  FiMoon,
  FiPackage,
  FiUsers,
  FiUser
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

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQueryParam = queryParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState(60);
  const [isOpenOnly, setIsOpenOnly] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState([
    'Pizza', 'Burger', 'Sushi', 'Italian', 'Mexican'
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock data - same as restaurants
  const allRestaurants = [
    { 
      id: 1, 
      name: 'Pizza Palace', 
      cuisine: 'Italian', 
      rating: 4.8, 
      reviews: 1245,
      deliveryTime: '25-35', 
      deliveryFee: 2.99, 
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800', 
      logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200',
      isOpen: true,
      distance: '1.2 km',
      discount: '20% OFF',
      priceLevel: 2,
      features: ['Free Delivery', 'Outdoor Seating'],
      minOrder: 15,
      isFeatured: true,
      isPopular: true,
      description: 'Authentic Italian pizza made with love'
    },
    { 
      id: 2, 
      name: 'Burger House', 
      cuisine: 'American', 
      rating: 4.6, 
      reviews: 987,
      deliveryTime: '20-30', 
      deliveryFee: 1.99, 
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', 
      logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
      isOpen: true,
      distance: '0.8 km',
      discount: 'Free Delivery',
      priceLevel: 1,
      features: ['Drive Thru', 'Kids Menu'],
      minOrder: 10,
      isFeatured: true,
      isPopular: true,
      description: 'Juicy burgers with premium ingredients'
    },
    { 
      id: 3, 
      name: 'Sushi Master', 
      cuisine: 'Japanese', 
      rating: 4.9, 
      reviews: 2156,
      deliveryTime: '30-40', 
      deliveryFee: 3.99, 
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800', 
      logo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200',
      isOpen: true,
      distance: '2.3 km',
      discount: '15% OFF',
      priceLevel: 3,
      features: ['Vegetarian Options', 'Gluten Free'],
      minOrder: 20,
      isFeatured: true,
      isPopular: false,
      description: 'Fresh Japanese cuisine delivered to you'
    },
    { 
      id: 4, 
      name: 'Taco Fiesta', 
      cuisine: 'Mexican', 
      rating: 4.4, 
      reviews: 654,
      deliveryTime: '15-25', 
      deliveryFee: 1.49, 
      image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800', 
      logo: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=200',
      isOpen: true,
      distance: '1.8 km',
      discount: '25% OFF',
      priceLevel: 1,
      features: ['Vegan Options', 'Halal'],
      minOrder: 12,
      isFeatured: false,
      isPopular: true,
      description: 'Authentic Mexican flavors'
    },
    { 
      id: 5, 
      name: 'Thai Garden', 
      cuisine: 'Thai', 
      rating: 4.7, 
      reviews: 876,
      deliveryTime: '35-45', 
      deliveryFee: 2.49, 
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800', 
      logo: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=200',
      isOpen: false,
      distance: '3.1 km',
      discount: null,
      priceLevel: 2,
      features: ['Spicy Options', 'Vegetarian'],
      minOrder: 18,
      isFeatured: false,
      isPopular: false,
      description: 'Authentic Thai cuisine'
    },
    { 
      id: 6, 
      name: 'Pasta Paradise', 
      cuisine: 'Italian', 
      rating: 4.5, 
      reviews: 543,
      deliveryTime: '25-35', 
      deliveryFee: 2.99, 
      image: 'https://images.unsplash.com/photo-1645112411342-4665a10a3a1d?w=800', 
      logo: 'https://images.unsplash.com/photo-1645112411342-4665a10a3a1d?w=200',
      isOpen: true,
      distance: '2.5 km',
      discount: '10% OFF',
      priceLevel: 2,
      features: ['Family Friendly', 'Takeaway'],
      minOrder: 15,
      isFeatured: false,
      isPopular: false,
      description: 'Creamy pasta with authentic Italian flavors'
    },
    { 
      id: 7, 
      name: 'Dim Sum House', 
      cuisine: 'Chinese', 
      rating: 4.3, 
      reviews: 432,
      deliveryTime: '30-40', 
      deliveryFee: 2.99, 
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800', 
      logo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200',
      isOpen: true,
      distance: '1.9 km',
      discount: 'Buy 1 Get 1',
      priceLevel: 2,
      features: ['Dim Sum', 'Noodle Bar'],
      minOrder: 15,
      isFeatured: false,
      isPopular: false,
      description: 'Authentic Chinese dim sum'
    },
    { 
      id: 8, 
      name: 'Grill House', 
      cuisine: 'American', 
      rating: 4.6, 
      reviews: 765,
      deliveryTime: '20-30', 
      deliveryFee: 1.99, 
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800', 
      logo: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=200',
      isOpen: true,
      distance: '1.5 km',
      discount: '20% OFF',
      priceLevel: 2,
      features: ['BBQ', 'Smoke House'],
      minOrder: 20,
      isFeatured: false,
      isPopular: true,
      description: 'Premium grilled meats'
    },
    { 
      id: 9, 
      name: 'Café Delight', 
      cuisine: 'Cafe', 
      rating: 4.2, 
      reviews: 321,
      deliveryTime: '15-20', 
      deliveryFee: 0.99, 
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800', 
      logo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200',
      isOpen: true,
      distance: '0.6 km',
      discount: 'Free Coffee',
      priceLevel: 1,
      features: ['Coffee', 'Pastries'],
      minOrder: 5,
      isFeatured: false,
      isPopular: false,
      description: 'Fresh coffee and pastries'
    },
    { 
      id: 10, 
      name: 'Biryani House', 
      cuisine: 'Indian', 
      rating: 4.9, 
      reviews: 1890,
      deliveryTime: '35-45', 
      deliveryFee: 2.99, 
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800', 
      logo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200',
      isOpen: true,
      distance: '2.8 km',
      discount: '20% OFF',
      priceLevel: 2,
      features: ['Authentic', 'Spicy'],
      minOrder: 20,
      isFeatured: true,
      isPopular: true,
      description: 'Aromatic biryani made with love'
    }
  ];

  // Get unique cuisines
  const cuisines = ['all', ...new Set(allRestaurants.map(r => r.cuisine))];

  useEffect(() => {
    if (searchQueryParam) {
      performSearch(searchQueryParam);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [searchQueryParam]);

  const performSearch = (query) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = allRestaurants.filter(r => 
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
      
      // Update search history
      if (query && !searchHistory.includes(query)) {
        setSearchHistory(prev => [query, ...prev].slice(0, 5));
      }
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 1) {
      const suggestions = allRestaurants
        .filter(r => r.name.toLowerCase().includes(value.toLowerCase()) ||
                    r.cuisine.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5)
        .map(r => r.name);
      setSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    performSearch(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setShowSuggestions(false);
  };

  const handleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const getCuisineIcon = (cuisine) => {
    const icons = {
      'Italian': FaPizzaSlice,
      'American': FaHamburger,
      'Japanese': FaFish,
      'Mexican': FaPepperHot,
      'Thai': FaUtensils,
      'Chinese': FaUtensils,
      'Cafe': FaCoffee,
      'Indian': FaUtensils,
    };
    return icons[cuisine] || FaUtensils;
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
              Searching for restaurants...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FiSearch className="text-red-500" />
              Search Results
            </h1>
            <div className="flex-1 w-full md:max-w-xl relative">
              <form onSubmit={handleSearch} className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                  placeholder="Search for restaurants, cuisines..."
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl glass-card focus:ring-2 focus:ring-red-400 outline-none transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl p-2 shadow-2xl z-10"
                  >
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-4 py-2.5 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-3"
                      >
                        <FiSearch className="text-gray-400 w-4 h-4" />
                        <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Search Stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {results.length > 0 ? (
                <>Found <span className="font-semibold text-gray-700 dark:text-gray-300">{results.length}</span> restaurants for "<span className="font-semibold text-gray-700 dark:text-gray-300">{searchQuery}</span>"</>
              ) : searchQuery ? (
                <>No results found for "<span className="font-semibold text-gray-700 dark:text-gray-300">{searchQuery}</span>"</>
              ) : (
                <>Enter a search term to find restaurants</>
              )}
            </p>
          </div>
          {results.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30' : 'glass-card hover:shadow-2xl'
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30' : 'glass-card hover:shadow-2xl'
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Search History */}
        {!searchQuery && searchHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3 flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((term, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(term);
                    performSearch(term);
                  }}
                  className="px-4 py-2 rounded-full glass-card text-sm text-gray-600 dark:text-gray-300 hover:shadow-2xl transition-all duration-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results */}
        {results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <div className="text-6xl mb-4">
              {searchQuery ? '😅' : '🔍'}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {searchQuery ? 'No Restaurants Found' : 'Search for Restaurants'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery 
                ? `We couldn't find any restaurants matching "${searchQuery}". Try searching for something else.`
                : 'Enter a restaurant name, cuisine, or dish to get started'}
            </p>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {results.map((restaurant, index) => {
              const Icon = getCuisineIcon(restaurant.cuisine);
              return (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className={`glass-card rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-3xl ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  }`}
                >
                  <Link to={`/restaurant/${restaurant.id}`} className="flex-1">
                    <div className={`relative ${viewMode === 'list' ? 'md:w-64 h-48 md:h-auto' : 'h-56'} overflow-hidden`}>
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {restaurant.isFeatured && (
                          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1">
                            <FiAward className="w-3 h-3" /> Featured
                          </span>
                        )}
                        {restaurant.discount && (
                          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1">
                            <FiGift className="w-3 h-3" /> {restaurant.discount}
                          </span>
                        )}
                        {restaurant.isPopular && (
                          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1">
                            <FiZap className="w-3 h-3" /> Popular
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-semibold shadow-lg`}>
                          {restaurant.isOpen ? '✓ Open' : '✗ Closed'}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleFavorite(restaurant.id);
                          }}
                          className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all duration-300"
                        >
                          <FiHeart className={`w-4 h-4 ${favorites.includes(restaurant.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
                        </button>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all duration-300"
                        >
                          <FiShare2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                            {restaurant.name}
                          </h3>
                          <p className="text-sm text-white/80 flex items-center gap-1">
                            <Icon className="w-4 h-4" /> {restaurant.cuisine}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          <FiStar className="text-white fill-current" />
                          <span className="text-sm font-semibold text-white">
                            {restaurant.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className={`p-5 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''}`}>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" /> {restaurant.deliveryTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin className="w-4 h-4" /> {restaurant.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiTruck className="w-4 h-4" /> ${restaurant.deliveryFee}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {restaurant.reviews} reviews
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <span className="text-xs text-gray-400">
                        Min. ${restaurant.minOrder}
                      </span>
                      {restaurant.features && restaurant.features.length > 0 && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            {restaurant.features.slice(0, 2).map((feature, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
                                {feature}
                              </span>
                            ))}
                          </span>
                        </>
                      )}
                    </div>
                    <Link to={`/restaurant/${restaurant.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        View Menu <FiArrowRight />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SearchResults;