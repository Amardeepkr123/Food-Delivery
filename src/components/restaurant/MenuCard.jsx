import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiStar, 
  FiShoppingBag, 
  FiPlus, 
  FiMinus,
  FiCheckCircle,
  FiAward,
  FiZap,
  FiLeaf,
  FiUtensils
} from 'react-icons/fi';
import { FaLeaf, FaUtensils as FaUtensilsIcon } from 'react-icons/fa';

const MenuCard = ({ 
  item, 
  onAddToCart, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const {
    id,
    name,
    description,
    price,
    image,
    category,
    isVeg,
    rating,
    popular,
    isAvailable = true
  } = item;

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart({ ...item, quantity });
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }
  };

  // Compact Variant
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-4 p-3 rounded-xl glass-card hover:shadow-3xl transition-all duration-300 ${className}`}
        {...props}
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-2xl">
          {image || '🍽️'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-800 dark:text-white truncate">
              {name}
            </h4>
            {popular && (
              <span className="text-[10px] bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-1.5 py-0.5 rounded-full">
                🔥
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{description}</p>
          <div className="flex items-center gap-2 mt-1">
            {isVeg ? (
              <FaLeaf className="text-green-500 w-3 h-3" />
            ) : (
              <FaUtensilsIcon className="text-red-500 w-3 h-3" />
            )}
            {rating && (
              <span className="flex items-center gap-0.5 text-xs text-yellow-500">
                <FiStar className="fill-current w-3 h-3" /> {rating}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-orange-500">${price}</p>
          <button
            onClick={handleAddToCart}
            className="mt-1 p-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 transition-transform duration-300"
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  // Default Variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 ${className}`}
      {...props}
    >
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Image */}
        <div className="sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-5xl relative">
          {image || '🍽️'}
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-sm font-bold">Unavailable</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {name}
                </h3>
                {popular && (
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold flex items-center gap-1">
                    <FiZap className="w-3 h-3" /> Popular
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {isVeg ? (
                  <span className="text-green-500 flex items-center gap-1 text-xs">
                    <FaLeaf /> Veg
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center gap-1 text-xs">
                    <FaUtensilsIcon /> Non-Veg
                  </span>
                )}
                {rating && (
                  <span className="flex items-center gap-1 text-xs text-yellow-500">
                    <FiStar className="fill-current" /> {rating}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-orange-500">
                ${price}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="p-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <FiMinus className="w-3 h-3 text-gray-600 dark:text-gray-300" />
              </button>
              <span className="w-8 text-center font-bold text-gray-800 dark:text-white text-sm">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange('increase')}
                className="p-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 transition-all duration-300"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={!isAvailable}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isAdded
                  ? 'bg-green-500 text-white'
                  : isAvailable
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {isAdded ? (
                <>
                  <FiCheckCircle className="w-4 h-4" />
                  Added!
                </>
              ) : (
                <>
                  <FiShoppingBag className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;