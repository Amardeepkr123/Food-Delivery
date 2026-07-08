// src/components/restaurant/RestaurantCard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiStar,
  FiHeart,
  FiShare2,
  FiClock,
  FiMapPin,
  FiTruck,
  FiDollarSign,
  FiAward,
  FiTag,
  FiGift,
  FiCheckCircle,
  FiXCircle,
  FiUsers,
  FiCoffee,
  FiSun,
  FiMoon,
  FiWind,
  FiMusic,
  FiParking,
  FiHeart as FiHeartSolid,
  FiEye,
  FiShoppingBag,
  FiCalendar,
  FiArrowRight,
  FiInfo,
  FiLoader,
  FiTrendingUp,
  FiZap,
  FiLeaf,
  FiShield,
  FiAward as FiAwardSolid,
} from 'react-icons/fi';
import { FaUtensils, FaPizzaSlice, FaHamburger, FaFish, FaBirthdayCake } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useCartContext } from '../../context/CartContext';
import { toast } from 'react-hot-toast';

// ============================================
// SUB-COMPONENTS
// ============================================

// Status Badge
const StatusBadge = ({ status, closingTime }) => {
  const isOpen = status === 'open';
  const isClosingSoon = status === 'closing_soon';

  return (
    <div className="flex items-center gap-2">
      {isOpen ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500 text-white text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Open Now
        </span>
      ) : isClosingSoon ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-500 text-white text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Closing Soon
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500 text-white text-xs font-semibold">
          <FiXCircle className="w-3 h-3" />
          Closed
        </span>
      )}
      {closingTime && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Closes at {closingTime}
        </span>
      )}
    </div>
  );
};

// Feature Badge
const FeatureBadge = ({ icon: Icon, label, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};

// Offer Badge
const OfferBadge = ({ offer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 dark:from-orange-500/10 dark:to-red-500/10 border border-orange-200/50 dark:border-orange-800/30"
    >
      <FiTag className="w-4 h-4 text-orange-500" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {offer}
      </span>
    </motion.div>
  );
};

// Popular Dish Item
const PopularDish = ({ dish }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
          {dish.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          ${dish.price}
        </p>
      </div>
      <span className={`w-1.5 h-1.5 rounded-full ${dish.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
    </div>
  );
};

// ============================================
// MAIN RESTAURANT CARD COMPONENT
// ============================================
const RestaurantCard = ({
  restaurant,
  variant = 'default', // 'default', 'compact', 'featured'
  onFavorite,
  onShare,
  onViewDetails,
  onOrderNow,
  onBookTable,
  className = '',
  showPopularDishes = true,
  showOffers = true,
  showFeatures = true,
  showActions = true,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCartContext();

  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Handle favorite toggle
  const handleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const newState = !isFavorited;
    setIsFavorited(newState);
    if (onFavorite) {
      onFavorite(restaurant, newState);
    }
    toast.success(newState ? 'Added to favorites ❤️' : 'Removed from favorites');
  };

  // Handle share
  const handleShare = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard?.writeText(
        `${window.location.origin}/restaurant/${restaurant.id}`
      );
      toast.success('Link copied to clipboard! 📋');
    } catch {
      toast.error('Failed to copy link');
    }
    if (onShare) {
      onShare(restaurant);
    }
  };

  // Handle navigation
  const handleViewDetails = (e) => {
    if (e) e.preventDefault();
    if (onViewDetails) {
      onViewDetails(restaurant);
    } else {
      navigate(`/restaurant/${restaurant.id}`);
    }
  };

  const handleOrderNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onOrderNow) {
      onOrderNow(restaurant);
    } else {
      navigate(`/restaurant/${restaurant.id}/menu`);
    }
  };

  const handleBookTable = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onBookTable) {
      onBookTable(restaurant);
    } else {
      navigate(`/restaurant/${restaurant.id}/book`);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return <RestaurantCardSkeleton variant={variant} />;
  }

  // Destructure restaurant data with fallbacks
  const {
    id,
    name,
    logo,
    coverImage,
    cuisine = [],
    description,
    rating = 0,
    totalReviews = 0,
    totalOrders = 0,
    isVerified = false,
    isTopRated = false,
    deliveryTime = '25-35',
    distance = '1.2 km',
    deliveryFee = 2.99,
    isFreeDelivery = false,
    minOrder = 10,
    avgCostForTwo = 500,
    platformFee = 1.99,
    offers = [],
    status = 'open',
    closingTime,
    isPureVeg = false,
    isBestseller = false,
    isTrending = false,
    isNew = false,
    isHygienic = true,
    features = [],
    popularDishes = [],
    openingHours,
  } = restaurant;

  // Get cuisine display
  const cuisineDisplay = Array.isArray(cuisine) ? cuisine.join(' • ') : cuisine;

  // Render rating stars
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FiStar key={`full-${i}`} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && (
          <FiStar className="w-3.5 h-3.5 text-yellow-400 fill-current" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FiStar key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
        ))}
      </div>
    );
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className={`glass-card rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 cursor-pointer ${className}`}
        onClick={handleViewDetails}
        role="article"
        aria-label={`${name} restaurant`}
      >
        <div className="flex gap-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <img
              src={logo || coverImage}
              alt={name}
              className="w-full h-full rounded-xl object-cover"
              loading="lazy"
            />
            {isVerified && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                <FiCheckCircle className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white truncate">
                  {name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {cuisineDisplay}
                </p>
              </div>
              {rating > 0 && (
                <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full">
                  <FiStar className="w-3 h-3 text-green-600 dark:text-green-400 fill-current" />
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                    {rating}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-0.5">
                <FiClock className="w-3 h-3" />
                {deliveryTime} min
              </span>
              <span className="flex items-center gap-0.5">
                <FiMapPin className="w-3 h-3" />
                {distance}
              </span>
              {isFreeDelivery && (
                <span className="text-green-500 font-semibold">Free Delivery</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Featured variant
  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -6 }}
        className={`glass-card rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-300 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="article"
        aria-label={`${name} featured restaurant`}
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={coverImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {isPureVeg && (
              <span className="px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
                <FiLeaf className="w-3 h-3" /> Pure Veg
              </span>
            )}
            {isBestseller && (
              <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
                <FiAwardSolid className="w-3 h-3" /> Bestseller
              </span>
            )}
            {isTrending && (
              <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
                <FiTrendingUp className="w-3 h-3" /> Trending
              </span>
            )}
            {isNew && (
              <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
                <FiZap className="w-3 h-3" /> New
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavorite}
              className="p-2.5 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all"
              aria-label="Add to favorites"
            >
              <FiHeart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all"
              aria-label="Share restaurant"
            >
              <FiShare2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{name}</h3>
                  {isVerified && (
                    <FiCheckCircle className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <p className="text-sm text-white/80 mt-1">{cuisineDisplay}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-white/70">
                  {rating > 0 && (
                    <span className="flex items-center gap-1">
                      <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                      {rating} ({totalReviews} reviews)
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {deliveryTime} min
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {distance}
                  </span>
                </div>
              </div>
              <StatusBadge status={status} closingTime={closingTime} />
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOrderNow}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
            >
              <FiShoppingBag className="w-4 h-4" />
              Order Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookTable}
              className="flex-1 py-2.5 rounded-xl bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2"
            >
              <FiCalendar className="w-4 h-4" />
              Book Table
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewDetails}
              className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <FiEye className="w-4 h-4" />
              Details
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className={`glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`${name} restaurant`}
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={handleViewDetails}>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        <img
          src={coverImage}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {isPureVeg && (
            <span className="px-2.5 py-0.5 rounded-full bg-green-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
              <FiLeaf className="w-3 h-3" /> Pure Veg
            </span>
          )}
          {isBestseller && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
              <FiAwardSolid className="w-3 h-3" /> Bestseller
            </span>
          )}
          {isTrending && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
              <FiTrendingUp className="w-3 h-3" /> Trending
            </span>
          )}
          {isNew && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
              <FiZap className="w-3 h-3" /> New
            </span>
          )}
          {isHygienic && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
              <FiShield className="w-3 h-3" /> Hygienic
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavorite}
            className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
            aria-label="Add to favorites"
          >
            <FiHeart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
            aria-label="Share restaurant"
          >
            <FiShare2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <StatusBadge status={status} closingTime={closingTime} />
        </div>

        {/* Logo */}
        {logo && (
          <div className="absolute -bottom-6 left-4 w-14 h-14 rounded-xl border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
            <img src={logo} alt={name} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 pt-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors truncate">
                {name}
              </h3>
              {isVerified && (
                <FiCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
              )}
              {isTopRated && (
                <span className="px-1.5 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-[10px] font-bold flex items-center gap-0.5">
                  <FiAwardSolid className="w-3 h-3" /> Top Rated
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {cuisineDisplay}
            </p>
          </div>
          {rating > 0 && (
            <div className="flex flex-col items-end ml-2 flex-shrink-0">
              <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                <FiStar className="w-3.5 h-3.5 text-green-600 dark:text-green-400 fill-current" />
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {rating}
                </span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {totalReviews} reviews
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
            {description}
          </p>
        )}

        {/* Delivery Info */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <FiClock className="w-4 h-4 text-orange-500" />
            {deliveryTime} min
          </span>
          <span className="flex items-center gap-1">
            <FiMapPin className="w-4 h-4 text-orange-500" />
            {distance}
          </span>
          <span className="flex items-center gap-1">
            <FiTruck className="w-4 h-4 text-orange-500" />
            ${deliveryFee} delivery
          </span>
          {isFreeDelivery && (
            <span className="text-green-500 font-semibold text-xs">Free Delivery</span>
          )}
          <span className="flex items-center gap-1">
            <FiDollarSign className="w-4 h-4 text-orange-500" />
            ₹{avgCostForTwo} for two
          </span>
        </div>

        {/* Offers */}
        {showOffers && offers.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {offers.slice(0, 2).map((offer, index) => (
              <OfferBadge key={index} offer={offer} />
            ))}
            {offers.length > 2 && (
              <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center">
                +{offers.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Features */}
        {showFeatures && features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {features.slice(0, 4).map((feature, index) => {
              const iconMap = {
                'Outdoor Seating': FiSun,
                'Rooftop': FiMoon,
                'Live Music': FiMusic,
                'Parking': FiParking,
                'Pet Friendly': FiHeart,
                'Air Conditioned': FiWind,
                'Wi-Fi': FiCoffee,
              };
              const Icon = iconMap[feature] || FiCoffee;
              return (
                <FeatureBadge
                  key={index}
                  icon={Icon}
                  label={feature}
                  color="blue"
                />
              );
            })}
          </div>
        )}

        {/* Popular Dishes */}
        {showPopularDishes && popularDishes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Popular Dishes
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {popularDishes.slice(0, 4).map((dish, index) => (
                <PopularDish key={index} dish={dish} />
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOrderNow}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <FiShoppingBag className="w-4 h-4" />
              Order Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookTable}
              className="flex-1 py-2.5 rounded-xl bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <FiCalendar className="w-4 h-4" />
              Book Table
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleViewDetails}
              className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2 text-sm"
            >
              <FiEye className="w-4 h-4" />
              View
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================
// SKELETON LOADER
// ============================================
export const RestaurantCardSkeleton = ({ variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <div className="glass-card rounded-2xl p-4 animate-pulse">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className="glass-card rounded-3xl overflow-hidden animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-gray-700" />
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="flex gap-3">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl flex-1" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl flex-1" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="flex gap-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        </div>
        <div className="flex gap-2 pt-3">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl flex-1" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl flex-1" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-12" />
        </div>
      </div>
    </div>
  );
};

// ============================================
// EXPORTS
// ============================================
export default RestaurantCard;