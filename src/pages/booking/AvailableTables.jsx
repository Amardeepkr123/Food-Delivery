// src/pages/booking/AvailableTables.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUsers, 
  FiCheck, 
  FiX, 
  FiMapPin, 
  FiStar, 
  FiClock,
  FiInfo,
  FiMoreVertical,
  FiEye,
  FiHeart,
  FiShare2,
} from 'react-icons/fi';
import { 
  FaCrown, 
  FaChair, 
  FaChild, 
  FaSun, 
  FaMoon, 
  FaWind,
  FaHeart,
  FaUtensils,
  FaWifi,
  FaParking,
} from 'react-icons/fa';

const AvailableTables = ({ 
  tables, 
  selectedTable, 
  onSelectTable,
  variant = 'default', // 'default', 'compact', 'detailed'
  showFeatures = true,
  showStatus = true,
  showPricing = true,
  className = '',
}) => {
  const [hoveredTable, setHoveredTable] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const typeIcons = {
    vip: FaCrown,
    window: FiSun,
    rooftop: FiMoon,
    family: FaChild,
    couple: FaHeart,
    outdoor: FaWind,
    'private-cabin': FiUsers,
    standard: FaChair,
  };

  const typeLabels = {
    vip: 'VIP',
    window: 'Window',
    rooftop: 'Rooftop',
    family: 'Family',
    couple: 'Couple',
    outdoor: 'Outdoor',
    'private-cabin': 'Private Cabin',
    standard: 'Standard',
  };

  const typeColors = {
    vip: 'from-yellow-400 to-yellow-500',
    window: 'from-blue-400 to-blue-500',
    rooftop: 'from-purple-400 to-purple-500',
    family: 'from-green-400 to-green-500',
    couple: 'from-pink-400 to-pink-500',
    outdoor: 'from-emerald-400 to-emerald-500',
    'private-cabin': 'from-indigo-400 to-indigo-500',
    standard: 'from-gray-400 to-gray-500',
  };

  const statusColors = {
    available: 'bg-green-500',
    reserved: 'bg-yellow-500',
    occupied: 'bg-red-500',
    cleaning: 'bg-blue-500',
    'out-of-service': 'bg-gray-500',
  };

  const statusLabels = {
    available: 'Available',
    reserved: 'Reserved',
    occupied: 'Occupied',
    cleaning: 'Cleaning',
    'out-of-service': 'Out of Service',
  };

  const handleSelect = (table) => {
    if (table.status === 'available') {
      onSelectTable(table);
    }
  };

  const toggleDetails = (tableId) => {
    setShowDetails(showDetails === tableId ? null : tableId);
  };

  // Compact Variant
  if (variant === 'compact') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${className}`}>
        {tables.map((table) => {
          const Icon = typeIcons[table.type] || FaChair;
          const isSelected = selectedTable?.id === table.id;
          const isAvailable = table.status === 'available';

          return (
            <motion.div
              key={table.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={isAvailable ? { y: -2 } : {}}
              onClick={() => handleSelect(table)}
              className={`glass-card rounded-2xl p-3 cursor-pointer transition-all duration-300 text-center ${
                isSelected
                  ? 'ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-gray-900 shadow-2xl shadow-orange-500/20'
                  : isAvailable
                  ? 'hover:shadow-2xl'
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${typeColors[table.type] || typeColors.standard} flex items-center justify-center text-white text-lg mx-auto mb-2`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">
                {table.number}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">{table.capacity} seats</p>
              <span className={`inline-block w-2 h-2 rounded-full ${statusColors[table.status]} mt-1`} />
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                  <FiCheck className="w-3 h-3 text-white" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Detailed Variant
  if (variant === 'detailed') {
    return (
      <div className={`space-y-4 ${className}`}>
        {tables.map((table) => {
          const Icon = typeIcons[table.type] || FaChair;
          const isSelected = selectedTable?.id === table.id;
          const isAvailable = table.status === 'available';
          const isHovered = hoveredTable === table.id;
          const isDetailsOpen = showDetails === table.id;

          return (
            <motion.div
              key={table.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={isAvailable ? { y: -2 } : {}}
              onClick={() => handleSelect(table)}
              className={`glass-card rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-gray-900 shadow-2xl shadow-orange-500/20'
                  : isAvailable
                  ? 'hover:shadow-2xl'
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onMouseEnter={() => setHoveredTable(table.id)}
              onMouseLeave={() => setHoveredTable(null)}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${typeColors[table.type] || typeColors.standard} flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800 dark:text-white">
                          {table.name}
                        </h4>
                        <span className="text-xs text-gray-400">{table.number}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${typeColors[table.type] || typeColors.standard} text-white font-semibold`}>
                          {typeLabels[table.type] || 'Standard'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {table.capacity} guests • Floor {table.floor || 'Ground'}
                      </p>
                    </div>
                    {showPricing && (
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold text-orange-500">₹{table.price}</p>
                        <p className="text-xs text-gray-400">Min. ₹{table.minSpend}</p>
                      </div>
                    )}
                  </div>

                  {/* Status & Features */}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${
                      table.status === 'available' ? 'text-green-600 dark:text-green-400' :
                      table.status === 'reserved' ? 'text-yellow-600 dark:text-yellow-400' :
                      table.status === 'occupied' ? 'text-red-600 dark:text-red-400' :
                      'text-gray-500 dark:text-gray-400'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${statusColors[table.status]}`} />
                      {statusLabels[table.status] || table.status}
                    </span>
                    
                    {showFeatures && table.features && table.features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {table.features.slice(0, 4).map((feature, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-600 dark:text-gray-300">
                            {feature.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {table.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {table.description}
                    </p>
                  )}
                </div>

                {/* Action */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {isAvailable && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); handleSelect(table); }}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        isSelected
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {isSelected ? '✓ Selected' : 'Select'}
                    </motion.button>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleDetails(table.id); }}
                    className="text-xs text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    {isDetailsOpen ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {isDetailsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-400">Table Type</p>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {typeLabels[table.type] || 'Standard'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Capacity</p>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {table.capacity} guests
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Floor</p>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {table.floor || 'Ground'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="font-medium text-orange-500">₹{table.price}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-400">Features</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {table.features?.map((feature, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300">
                              {feature.replace('-', ' ')}
                            </span>
                          )) || 'No features listed'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Default Variant
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {tables.map((table) => {
        const Icon = typeIcons[table.type] || FaChair;
        const isSelected = selectedTable?.id === table.id;
        const isAvailable = table.status === 'available';
        const isHovered = hoveredTable === table.id;

        return (
          <motion.div
            key={table.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={isAvailable ? { y: -4 } : {}}
            onClick={() => handleSelect(table)}
            className={`glass-card rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
              isSelected
                ? 'ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-gray-900 shadow-2xl shadow-orange-500/20'
                : isAvailable
                ? 'hover:shadow-2xl'
                : 'opacity-60 cursor-not-allowed'
            }`}
            onMouseEnter={() => setHoveredTable(table.id)}
            onMouseLeave={() => setHoveredTable(null)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-orange-500`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-800 dark:text-white">{table.name}</h4>
                    <span className="text-xs text-gray-400">{table.number}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{typeLabels[table.type] || 'Standard'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-orange-500">₹{table.price}</p>
                <p className="text-xs text-gray-400">Min. ₹{table.minSpend}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <FiUsers className="w-4 h-4" /> {table.capacity} guests
              </span>
              {showStatus && (
                <>
                  <span className={`w-2 h-2 rounded-full ${statusColors[table.status]}`} />
                  <span className="capitalize">{statusLabels[table.status] || table.status}</span>
                </>
              )}
            </div>

            {showFeatures && table.features && table.features.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {table.features.slice(0, 3).map((feature, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300">
                    {feature.replace('-', ' ')}
                  </span>
                ))}
                {table.features.length > 3 && (
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-400">
                    +{table.features.length - 3}
                  </span>
                )}
              </div>
            )}

            {isSelected && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 text-orange-500 text-xs font-semibold flex items-center gap-1"
              >
                <FiCheck className="w-4 h-4" /> Selected
              </motion.div>
            )}

            {isHovered && isAvailable && !isSelected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-orange-500/5 rounded-2xl pointer-events-none"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default AvailableTables;