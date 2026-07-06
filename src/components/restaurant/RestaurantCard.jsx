import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiStar, 
  FiClock, 
  FiMapPin, 
  FiTruck, 
  FiHeart, 
  FiShare2,
  FiChevronRight,
  FiGift,
  FiAward,
  FiZap
} from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';

const RestaurantCard = ({
  restaurant,
  index = 0,
  variant = 'default',
  onFavorite,
  onShare,
  className = '',
  ...props
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    name,
    cuisine,
    rating,
    reviews,
    deliveryTime,
    deliveryFee,
    image,
    logo,
    isOpen,
    distance,
    discount,
    isFeatured,
    isPopular,
    features = [],
    minOrder,
    priceLevel
  } = restaurant;

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (onFavorite) onFavorite(id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShare) onShare(id);
  };

  const getPriceLevel = () => {
    return '•'.repeat(priceLevel || 1);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
      },
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
  };

  // Compact Variant
  if (variant === 'compact') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4 }}
        className={`glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 ${className}`}
        {...props}
      >
        <Link to={`/restaurant/${id}`}>
          <div className="flex items-center gap-4 p-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-3xl">
              {image || '🏪'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-800 dark:text-white truncate">
                  {name}
                </h4>
                {isFeatured && (
                  <span className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-[8px] font-bold">
                    ★
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{cuisine}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span className="flex items-center gap-0.5">
                  <FiStar className="text-yellow-400 fill-current w-3 h-3" />
                  {rating}
                </span>
                <span>•</span>
                <span>{deliveryTime}</span>
                <span>•</span>
                <span>{distance}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-orange-500">${deliveryFee}</span>
              {discount && (
                <p className="text-[10px] text-green-500 font-semibold">{discount}</p>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // List Variant
  if (variant === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4 }}
        className={`glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 ${className}`}
        {...props}
      >
        <Link to={`/restaurant/${id}`} className="flex flex-col md:flex-row">
          <div className="relative md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
            <motion.img
              variants={imageVariants}
              initial="initial"
              whileHover="hover"
              src={image || '/images/restaurant-placeholder.jpg'}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f3f4f6"/%3E%3Ctext x="100" y="120" text-anchor="middle" font-size="60" dy=".3em"%3E🏪%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {isFeatured && (
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-[10px] font-bold shadow-lg flex items-center gap-0.5">
                  <FiAward className="w-3 h-3" /> Featured
                </span>
              )}
              {discount && (
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold shadow-lg flex items-center gap-0.5">
                  <FiGift className="w-3 h-3" /> {discount}
                </span>
              )}
            </div>
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={handleFavorite}
                className="p-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all duration-300"
              >
                <FiHeart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all duration-300"
              >
                <FiShare2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'} text-white text-[10px] font-bold shadow-lg`}>
              {isOpen ? 'Open Now' : 'Closed'}
            </div>
          </div>
          <div className="flex-1 p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <FaUtensils className="w-3 h-3" /> {cuisine}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                <FiStar className="text-green-500 fill-current w-3 h-3" />
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {rating}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">({reviews})</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <FiClock className="w-4 h-4" /> {deliveryTime}
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin className="w-4 h-4" /> {distance}
              </span>
              <span className="flex items-center gap-1">
                <FiTruck className="w-4 h-4" /> ${deliveryFee}
              </span>
              <span className="flex items-center gap-1">
                {getPriceLevel()}
              </span>
            </div>

            {features.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {features.slice(0, 3).map((feature, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-600 dark:text-gray-300">
                    {feature}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                {discount && (
                  <span className="text-sm font-bold text-green-500">{discount}</span>
                )}
                <span className="text-xs text-gray-400">Min. ${minOrder}</span>
              </div>
              <Link to={`/restaurant/${id}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 flex items-center gap-1"
                >
                  View Menu <FiChevronRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default Grid Variant
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 ${className}`}
      {...props}
    >
      <Link to={`/restaurant/${id}`}>
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <motion.img
            variants={imageVariants}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            src={image || '/images/restaurant-placeholder.jpg'}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f3f4f6"/%3E%3Ctext x="100" y="120" text-anchor="middle" font-size="60" dy=".3em"%3E🏪%3C/text%3E%3C/svg%3E';
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isFeatured && (
              <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                <FiAward className="w-3 h-3" /> Featured
              </span>
            )}
            {discount && (
              <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                <FiGift className="w-3 h-3" /> {discount}
              </span>
            )}
            {isPopular && (
              <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                <FiZap className="w-3 h-3" /> Popular
              </span>
            )}
            <span className={`px-2.5 py-1 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-bold shadow-lg`}>
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavorite}
              className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all duration-300"
            >
              <FiHeart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all duration-300"
            >
              <FiShare2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2.5 py-1 rounded-full">
              <FiStar className="text-green-500 fill-current w-3 h-3" />
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                {rating}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <FaUtensils className="w-3 h-3" /> {cuisine}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <FiClock className="w-4 h-4" /> {deliveryTime}
            </span>
            <span className="flex items-center gap-1">
              <FiMapPin className="w-4 h-4" /> {distance}
            </span>
            <span className="flex items-center gap-1">
              <FiTruck className="w-4 h-4" /> ${deliveryFee}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-400">{reviews} reviews</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="text-xs text-gray-400">{getPriceLevel()}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-1"
          >
            View Menu <FiChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;