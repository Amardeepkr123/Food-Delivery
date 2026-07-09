// src/pages/booking/BookingSummary.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiInfo,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUsers,
  FiDollarSign,
  FiTag,
  FiCheckCircle,
  FiXCircle,
  FiGift,
  FiAward,
  FiTrendingUp,
  FiClock as FiClockIcon,
  FiUser,
  FiPhone,
  FiMail,
  FiEdit2,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { FaUtensils, FaStar, FaCrown } from 'react-icons/fa';

const BookingSummary = ({
  restaurant,
  selectedTable,
  selectedDate,
  selectedTimeSlot,
  guests,
  bookingFee,
  tax,
  discount,
  grandTotal,
  appliedCoupon,
  customerDetails,
  onEdit,
  className = '',
  variant = 'default', // 'default', 'compact', 'minimal'
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const totalGuests = guests?.adults + guests?.children + guests?.infants || 0;

  // Compact Variant
  if (variant === 'compact') {
    return (
      <div className={`glass-card rounded-2xl p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Total</p>
            <p className="text-2xl font-bold text-orange-500">₹{grandTotal}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">{totalGuests} guests</p>
            <p className="text-xs text-gray-400">{selectedDate}</p>
          </div>
        </div>
      </div>
    );
  }

  // Minimal Variant
  if (variant === 'minimal') {
    return (
      <div className={`glass-card rounded-xl p-3 ${className}`}>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Total</span>
          <span className="font-bold text-orange-500">₹{grandTotal}</span>
        </div>
      </div>
    );
  }

  // Default Variant
  return (
    <div className={`glass-card rounded-3xl p-6 sticky top-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FiInfo className="text-orange-500" />
          Booking Summary
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isExpanded ? <FiChevronUp className="w-4 h-4 text-gray-400" /> : <FiChevronDown className="w-4 h-4 text-gray-400" />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 text-sm">
              {/* Restaurant */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-lg flex-shrink-0">
                  {restaurant?.image || '🍽️'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 dark:text-white truncate">
                    {restaurant?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <FiMapPin className="w-3 h-3" /> {restaurant?.address || 'Restaurant Address'}
                  </p>
                  {restaurant?.rating && (
                    <p className="text-xs text-yellow-500 flex items-center gap-1">
                      <FaStar className="fill-current" /> {restaurant.rating} ({restaurant.reviews} reviews)
                    </p>
                  )}
                </div>
                {restaurant?.isPremium && (
                  <span className="flex items-center gap-0.5 text-[10px] font-semibold text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">
                    <FaCrown className="w-3 h-3" /> Premium
                  </span>
                )}
              </div>

              {/* Table */}
              {selectedTable && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-orange-500 w-4 h-4" />
                    <span className="text-gray-600 dark:text-gray-300">Table</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {selectedTable.name} ({selectedTable.number})
                    </p>
                    <p className="text-xs text-gray-400">{selectedTable.capacity} seats • {selectedTable.type}</p>
                  </div>
                </div>
              )}

              {/* Date & Time */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-orange-500 w-4 h-4" />
                  <span className="text-gray-600 dark:text-gray-300">Date & Time</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 dark:text-white">{selectedDate}</p>
                  <p className="text-xs text-gray-400">{selectedTimeSlot?.label}</p>
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <FiUsers className="text-orange-500 w-4 h-4" />
                  <span className="text-gray-600 dark:text-gray-300">Guests</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 dark:text-white">{totalGuests} guests</p>
                  <p className="text-xs text-gray-400">
                    {guests?.adults} adults{guests?.children > 0 && `, ${guests.children} children`}
                    {guests?.infants > 0 && `, ${guests.infants} infants`}
                  </p>
                </div>
              </div>

              {/* Customer Details */}
              {customerDetails && (
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Customer Details</p>
                    {onEdit && (
                      <button
                        onClick={onEdit}
                        className="text-xs text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1"
                      >
                        <FiEdit2 className="w-3 h-3" /> Edit
                      </button>
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FiUser className="w-4 h-4 text-gray-400" /> {customerDetails.name}
                    </p>
                    <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FiPhone className="w-4 h-4 text-gray-400" /> {customerDetails.phone}
                    </p>
                    {customerDetails.email && (
                      <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FiMail className="w-4 h-4 text-gray-400" /> {customerDetails.email}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div>
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Price Breakdown
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-orange-500">₹{grandTotal}</span>
                    {showBreakdown ? <FiChevronUp className="w-4 h-4 text-gray-400" /> : <FiChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>

                <AnimatePresence>
                  {showBreakdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                          <span>Booking Fee</span>
                          <span>₹{bookingFee}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                          <span>Tax (8%)</span>
                          <span>₹{tax}</span>
                        </div>
                        {appliedCoupon && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span className="flex items-center gap-1">
                              <FiTag className="w-4 h-4" /> Discount
                            </span>
                            <span>-₹{discount}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg">
                          <span className="text-gray-800 dark:text-white">Total</span>
                          <span className="text-orange-500">₹{grandTotal}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Coupon Applied */}
              {appliedCoupon && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-700 dark:text-green-400">
                    Coupon <strong>{appliedCoupon.code}</strong> applied - {appliedCoupon.description}
                  </span>
                </div>
              )}

              {/* Savings */}
              {discount > 0 && (
                <div className="flex items-center gap-2 p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
                  <FiTrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-blue-700 dark:text-blue-400">
                    You saved ₹{discount} on this booking!
                  </span>
                </div>
              )}

              {/* Policies */}
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FiClockIcon className="w-3 h-3" />
                  <span>Free cancellation up to 2 hours before</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <FiGift className="w-3 h-3" />
                  <span>Earn loyalty points on this booking</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingSummary;