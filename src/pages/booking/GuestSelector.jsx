// src/pages/booking/GuestSelector.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiUsers, FiUser, FiInfo, FiAlertCircle } from 'react-icons/fi';
import { FaChild, FaBaby, FaUserFriends, FaUsers as FaUsersIcon } from 'react-icons/fa';

const GuestSelector = ({ 
  guests, 
  onGuestChange, 
  maxGuests = 10,
  minGuests = 1,
  variant = 'default', // 'default', 'compact', 'detailed'
  showAgeGroups = false,
  className = '',
}) => {
  const [selectedType, setSelectedType] = useState('adults');
  const [showAgeInput, setShowAgeInput] = useState(false);

  const totalGuests = guests.adults + guests.children + guests.infants;

  const guestTypes = [
    { 
      key: 'adults', 
      label: 'Adults', 
      icon: FiUsers, 
      min: 1, 
      max: maxGuests,
      description: 'Ages 13 and above',
      ageRange: '13+',
    },
    { 
      key: 'children', 
      label: 'Children', 
      icon: FaChild, 
      min: 0, 
      max: maxGuests,
      description: 'Ages 2-12',
      ageRange: '2-12',
    },
    { 
      key: 'infants', 
      label: 'Infants', 
      icon: FaBaby, 
      min: 0, 
      max: maxGuests,
      description: 'Under 2 years',
      ageRange: '0-2',
    },
  ];

  const getGuestTypeIcon = (key) => {
    const types = {
      adults: FiUsers,
      children: FaChild,
      infants: FaBaby,
    };
    return types[key] || FiUser;
  };

  const handleChange = (type, amount) => {
    const newValue = guests[type] + amount;
    if (newValue >= 0 && totalGuests + amount <= maxGuests) {
      onGuestChange(type, amount);
    }
  };

  // Compact Variant
  if (variant === 'compact') {
    return (
      <div className={`glass-card rounded-2xl p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-orange-500">
              <FiUsers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {totalGuests} Guests
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {guests.adults} adults{guests.children > 0 && `, ${guests.children} children`}
                {guests.infants > 0 && `, ${guests.infants} infants`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAgeInput(!showAgeInput)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiInfo className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <AnimatePresence>
          {showAgeInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="grid grid-cols-3 gap-2">
                {guestTypes.map((type) => {
                  const Icon = type.icon;
                  const value = guests[type.key] || 0;
                  return (
                    <div key={type.key} className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{type.label}</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <button
                          onClick={() => handleChange(type.key, -1)}
                          disabled={value <= type.min}
                          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiMinus className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                        </button>
                        <span className="w-6 text-center font-bold text-gray-800 dark:text-white text-sm">
                          {value}
                        </span>
                        <button
                          onClick={() => handleChange(type.key, 1)}
                          disabled={totalGuests >= maxGuests}
                          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiPlus className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {totalGuests >= maxGuests && (
                <p className="text-xs text-yellow-500 text-center mt-2">Maximum guests reached</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Detailed Variant
  if (variant === 'detailed') {
    return (
      <div className={`glass-card rounded-2xl p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FaUserFriends className="text-orange-500" />
            Guest Selection
          </h3>
          <span className="text-sm font-semibold text-orange-500">
            {totalGuests} guests
          </span>
        </div>

        <div className="space-y-4">
          {guestTypes.map((type) => {
            const Icon = type.icon;
            const value = guests[type.key] || 0;
            const isMin = value <= type.min;
            const isMax = value >= type.max || totalGuests >= maxGuests;

            return (
              <motion.div
                key={type.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-orange-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{type.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{type.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleChange(type.key, -1)}
                    disabled={isMin}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isMin
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-800 dark:text-white text-lg">
                    {value}
                  </span>
                  <button
                    onClick={() => handleChange(type.key, 1)}
                    disabled={isMax}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isMax
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all'
                    }`}
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {showAgeGroups && (
          <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30">
            <p className="text-xs text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <FiInfo className="w-4 h-4" />
              Age Groups: Adults (13+), Children (2-12), Infants (0-2)
            </p>
          </div>
        )}

        {totalGuests >= maxGuests && (
          <p className="text-xs text-yellow-500 text-center mt-3 flex items-center justify-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            Maximum guest limit reached
          </p>
        )}

        {totalGuests < minGuests && (
          <p className="text-xs text-red-500 text-center mt-3 flex items-center justify-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            Minimum {minGuests} guest required
          </p>
        )}
      </div>
    );
  }

  // Default Variant
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiUsers className="text-orange-500 w-5 h-5" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Total Guests: <span className="text-orange-500">{totalGuests}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {maxGuests && (
            <p className="text-xs text-gray-400">Maximum {maxGuests} guests</p>
          )}
          {showAgeGroups && (
            <button
              onClick={() => setShowAgeInput(!showAgeInput)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FiInfo className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Guest Type Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {guestTypes.map((type) => {
          const Icon = type.icon;
          const value = guests[type.key] || 0;
          const isMax = value >= type.max || totalGuests >= maxGuests;
          const isMin = value <= type.min;

          return (
            <motion.div
              key={type.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  {type.label}
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => handleChange(type.key, -1)}
                  disabled={isMin}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isMin
                      ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <motion.span
                  key={value}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-8 text-center font-bold text-gray-800 dark:text-white text-lg"
                >
                  {value}
                </motion.span>
                <button
                  onClick={() => handleChange(type.key, 1)}
                  disabled={isMax}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isMax
                      ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              {type.ageRange && (
                <p className="text-[10px] text-gray-400 mt-1">Age {type.ageRange}</p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Age Info */}
      <AnimatePresence>
        {showAgeGroups && showAgeInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 text-xs text-blue-700 dark:text-blue-400">
              <p className="flex items-center gap-2">
                <FiInfo className="w-4 h-4" />
                Age Groups: Adults (13+), Children (2-12), Infants (0-2)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Warnings */}
      {totalGuests >= maxGuests && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-yellow-500 text-center flex items-center justify-center gap-1"
        >
          <FiAlertCircle className="w-4 h-4" />
          Maximum guest limit reached ({maxGuests} guests)
        </motion.p>
      )}

      {totalGuests < minGuests && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 text-center flex items-center justify-center gap-1"
        >
          <FiAlertCircle className="w-4 h-4" />
          Minimum {minGuests} guest required
        </motion.p>
      )}
    </div>
  );
};

export default GuestSelector;