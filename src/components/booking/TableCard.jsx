import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUsers, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiMapPin,
  FiStar,
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiCalendar,
  FiUser,
  FiMessageSquare,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiMoreVertical
} from 'react-icons/fi';
import { FaUtensils, FaWifi, FaParking, FaWheelchair, FaChild } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TableCard = ({ 
  table, 
  onBook, 
  onViewDetails, 
  onEdit, 
  onDelete,
  isSelected = false,
  variant = 'default' // 'default', 'compact', 'detailed'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const {
    id,
    name,
    capacity,
    location,
    status,
    image,
    rating,
    reviews,
    price,
    features = [],
    description,
    availability,
    isVeg,
    isPremium,
    isOutdoor,
    isRooftop,
    isWindowSeat,
    specialOffer
  } = table;

  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      booked: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      reserved: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      occupied: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      maintenance: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400',
    };
    return colors[status] || colors.available;
  };

  const getStatusIcon = (status) => {
    const icons = {
      available: FiCheckCircle,
      booked: FiXCircle,
      reserved: FiClock,
      occupied: FiUsers,
      maintenance: FiXCircle,
    };
    return icons[status] || FiCheckCircle;
  };

  const getStatusText = (status) => {
    const texts = {
      available: 'Available Now',
      booked: 'Booked',
      reserved: 'Reserved',
      occupied: 'Occupied',
      maintenance: 'Under Maintenance',
    };
    return texts[status] || status;
  };

  const StatusIcon = getStatusIcon(status);

  const renderFeatures = () => {
    const featureIcons = {
      wifi: FaWifi,
      parking: FaParking,
      wheelchair: FaWheelchair,
      'kid-friendly': FaChild,
    };

    return features.slice(0, 3).map((feature, index) => {
      const Icon = featureIcons[feature] || FaUtensils;
      return (
        <span key={index} className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400" title={feature}>
          <Icon className="w-3 h-3" />
        </span>
      );
    });
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites ❤️');
  };

  const handleShare = (e) => {
    e.stopPropagation();
    toast.info('Share link copied to clipboard!');
  };

  const handleBook = (e) => {
    e.stopPropagation();
    if (onBook) {
      onBook(table);
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(table);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(table);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(table);
    }
  };

  // Compact Variant
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -4 }}
        className="glass-card rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleViewDetails}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-3xl">
              {image || '🍽️'}
            </div>
            {isPremium && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-[8px] font-bold text-white shadow-lg">
                ★
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-800 dark:text-white truncate">
                {name}
              </h4>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(status)} flex items-center gap-1`}>
                <StatusIcon className="w-3 h-3" />
                {getStatusText(status)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="flex items-center gap-1">
                <FiUsers className="w-3 h-3" /> {capacity} guests
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin className="w-3 h-3" /> {location}
              </span>
              {rating && (
                <span className="flex items-center gap-1 text-yellow-500">
                  <FiStar className="w-3 h-3 fill-current" /> {rating}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {status === 'available' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBook}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
              >
                Book
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default Variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className={`glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 ${
        isSelected ? 'ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-gray-900' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
          {image || '🍽️'}
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isPremium && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1">
              <FiStar className="w-3 h-3 fill-current" /> Premium
            </span>
          )}
          {isVeg && (
            <span className="px-2.5 py-0.5 rounded-full bg-green-500 text-white text-xs font-semibold shadow-lg">
              🥬 Pure Veg
            </span>
          )}
          {isOutdoor && (
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white text-xs font-semibold shadow-lg">
              🌤️ Outdoor
            </span>
          )}
          {isRooftop && (
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500 text-white text-xs font-semibold shadow-lg">
              🌙 Rooftop
            </span>
          )}
          {isWindowSeat && (
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500 text-white text-xs font-semibold shadow-lg">
              🪟 Window Seat
            </span>
          )}
          {specialOffer && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold shadow-lg animate-pulse">
              🎉 {specialOffer}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FiShare2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowActions(!showActions)}
            className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FiMoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </motion.button>

          {/* Actions Dropdown */}
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="absolute right-0 top-full mt-2 w-48 glass-card rounded-2xl p-2 shadow-2xl z-10"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(e);
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-sm text-gray-700 dark:text-gray-300"
                >
                  <FiEye className="w-4 h-4" /> View Details
                </button>
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(e);
                      setShowActions(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <FiEdit2 className="w-4 h-4" /> Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(e);
                      setShowActions(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 text-sm text-red-500"
                  >
                    <FiTrash2 className="w-4 h-4" /> Delete
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status Badge */}
        <div className={`absolute bottom-3 left-3 px-3 py-1.5 rounded-full ${getStatusColor(status)} flex items-center gap-1.5 shadow-lg backdrop-blur-sm`}>
          <StatusIcon className="w-4 h-4" />
          <span className="text-xs font-semibold">{getStatusText(status)}</span>
        </div>

        {/* Price */}
        {price && (
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-bold shadow-lg">
            ${price}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
              <FiMapPin className="w-3 h-3" /> {location}
            </p>
          </div>
          {rating && (
            <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2.5 py-1 rounded-full">
              <FiStar className="text-yellow-500 fill-current w-4 h-4" />
              <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">{rating}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">({reviews})</span>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Features */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
            <FiUsers className="w-4 h-4 text-gray-400" />
            <span>{capacity} guests</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
            <FiClock className="w-4 h-4 text-gray-400" />
            <span>{availability || 'Available now'}</span>
          </div>
          {features.length > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-1">
                {renderFeatures()}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewDetails}
            className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiEye className="w-4 h-4" />
            Details
          </motion.button>
          {status === 'available' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBook}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiCalendar className="w-4 h-4" />
              Book Now
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TableCard;