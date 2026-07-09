// src/pages/booking/TimeSlot.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiClock, 
  FiCheck, 
  FiX, 
  FiAlertCircle,
  FiSun,
  FiMoon,
  FiSunrise,
  FiSunset,
  FiCoffee,
  FiZap,
} from 'react-icons/fi';
import { FaUtensils, FaClock, FaCalendar } from 'react-icons/fa';

const TimeSlot = ({ 
  slot, 
  isSelected, 
  onSelect,
  variant = 'default', // 'default', 'compact', 'detailed'
  showAvailability = true,
  showTimeRange = true,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTimeIcon = (label) => {
    const icons = {
      breakfast: FiSunrise,
      lunch: FiSun,
      evening: FiSunset,
      dinner: FiMoon,
      night: FiMoon,
    };
    return icons[label?.toLowerCase()] || FiClock;
  };

  const getTimeColor = (label) => {
    const colors = {
      breakfast: 'from-yellow-400 to-orange-400',
      lunch: 'from-orange-400 to-red-400',
      evening: 'from-purple-400 to-pink-400',
      dinner: 'from-indigo-400 to-purple-400',
      night: 'from-blue-400 to-indigo-400',
    };
    return colors[label?.toLowerCase()] || 'from-orange-400 to-red-400';
  };

  const getTimeEmoji = (label) => {
    const emojis = {
      breakfast: '🌅',
      lunch: '☀️',
      evening: '🌇',
      dinner: '🌙',
      night: '🌃',
    };
    return emojis[label?.toLowerCase()] || '🕐';
  };

  const Icon = getTimeIcon(slot.label);
  const timeColor = getTimeColor(slot.label);
  const emoji = getTimeEmoji(slot.label);

  // Compact Variant
  if (variant === 'compact') {
    return (
      <motion.button
        whileHover={slot.available ? { scale: 1.02 } : {}}
        whileTap={slot.available ? { scale: 0.98 } : {}}
        onClick={() => slot.available && onSelect(slot)}
        disabled={!slot.available}
        className={`relative p-3 rounded-2xl border-2 transition-all duration-300 text-center ${
          isSelected
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
            : slot.available
            ? 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
            : 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
        } ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`text-lg ${isSelected ? 'text-orange-500' : 'text-gray-500'}`}>
          {emoji}
        </div>
        <p className={`text-xs font-semibold mt-1 ${
          isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'
        }`}>
          {slot.label}
        </p>
        {showTimeRange && (
          <p className="text-[10px] text-gray-400">{slot.time}</p>
        )}
        {isSelected && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
            <FiCheck className="w-3 h-3 text-white" />
          </div>
        )}
        {!slot.available && (
          <div className="absolute inset-0 bg-black/10 dark:bg-white/5 rounded-2xl flex items-center justify-center">
            <FiX className="w-4 h-4 text-red-400" />
          </div>
        )}
      </motion.button>
    );
  }

  // Detailed Variant
  if (variant === 'detailed') {
    return (
      <motion.button
        whileHover={slot.available ? { scale: 1.02 } : {}}
        whileTap={slot.available ? { scale: 0.98 } : {}}
        onClick={() => slot.available && onSelect(slot)}
        disabled={!slot.available}
        className={`relative p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
          isSelected
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
            : slot.available
            ? 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
            : 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
        } ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${timeColor} flex items-center justify-center text-2xl text-white shadow-lg`}>
            {emoji}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className={`font-bold text-lg ${
                isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-800 dark:text-white'
              }`}>
                {slot.label}
              </p>
              {slot.available && (
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                  Available
                </span>
              )}
              {!slot.available && (
                <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                  Unavailable
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{slot.time}</p>
            {slot.description && (
              <p className="text-xs text-gray-400 mt-1">{slot.description}</p>
            )}
            {slot.capacity && (
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <FiUsers className="w-3 h-3" /> {slot.capacity} seats available
              </p>
            )}
          </div>

          {/* Status */}
          {isSelected && (
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <FiCheck className="w-5 h-5 text-white" />
            </div>
          )}
          {!slot.available && (
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <FiX className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>

        {isHovered && slot.available && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold shadow-lg"
          >
            Click to select
          </motion.div>
        )}
      </motion.button>
    );
  }

  // Default Variant
  return (
    <motion.button
      whileHover={slot.available ? { scale: 1.02 } : {}}
      whileTap={slot.available ? { scale: 0.98 } : {}}
      onClick={() => slot.available && onSelect(slot)}
      disabled={!slot.available}
      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left relative ${
        isSelected
          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
          : slot.available
          ? 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
          : 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className={`p-2 rounded-lg ${
          isSelected 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
        }`}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className={`font-semibold ${
              isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {slot.label}
            </p>
            {showAvailability && slot.available && (
              <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded-full">
                ✓ Open
              </span>
            )}
          </div>
          {showTimeRange && (
            <p className="text-xs text-gray-500 dark:text-gray-400">{slot.time}</p>
          )}
        </div>

        {/* Status Indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30"
          >
            <FiCheck className="w-4 h-4 text-white" />
          </motion.div>
        )}
        {!slot.available && (
          <span className="text-xs text-red-500 font-medium">Unavailable</span>
        )}
      </div>

      {/* Hover Effect */}
      {isHovered && slot.available && !isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-orange-500/5 rounded-2xl"
        />
      )}
    </motion.button>
  );
};

export default TimeSlot;