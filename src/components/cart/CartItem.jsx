import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiMinus, 
  FiTrash2, 
  FiHeart, 
  FiClock, 
  FiStar,
  FiCheck,
  FiX,
  FiShoppingBag,
  FiTruck,
  FiDollarSign
} from 'react-icons/fi';
import { FaLeaf, FaUtensils, FaFire } from 'react-icons/fa';

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onSaveLater,
  isSaved = false,
  index = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [quantityAnimation, setQuantityAnimation] = useState(false);

  const {
    id,
    name,
    restaurant,
    category,
    price,
    quantity = 1,
    image,
    isVeg = true,
    rating,
    deliveryTime,
    discount,
    originalPrice,
    isPopular = false,
    isRecommended = false,
    dietaryInfo = [],
    maxOrder = 10,
    minOrder = 1
  } = item;

  const handleIncrease = () => {
    if (quantity < maxOrder) {
      onIncrease(id);
      setQuantityAnimation(true);
      setTimeout(() => setQuantityAnimation(false), 300);
    }
  };

  const handleDecrease = () => {
    if (quantity > minOrder) {
      onDecrease(id);
      setQuantityAnimation(true);
      setTimeout(() => setQuantityAnimation(false), 300);
    } else if (quantity === minOrder) {
      // If quantity is 1, ask if they want to remove
      if (window.confirm('Remove this item from cart?')) {
        handleRemove();
      }
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(id);
    }, 400);
  };

  const handleSaveLater = () => {
    onSaveLater(id);
  };

  const calculateTotal = () => {
    return (price * quantity).toFixed(2);
  };

  const calculateDiscount = () => {
    if (originalPrice) {
      const discountAmount = originalPrice - price;
      const discountPercent = ((discountAmount / originalPrice) * 100).toFixed(0);
      return discountPercent;
    }
    return discount || 0;
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const quantityVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    }
  };

  const discountPercent = calculateDiscount();

  return (
    <AnimatePresence mode="wait">
      {!isRemoving && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
          className="glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-5">
            {/* Image Section */}
            <div className="relative flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full sm:w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-5xl"
              >
                {image || '🍽️'}
              </motion.div>

              {/* Veg/Non-Veg Badge */}
              <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg ${
                isVeg 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {isVeg ? <FaLeaf className="w-3 h-3" /> : <FaUtensils className="w-3 h-3" />}
                {isVeg ? 'Veg' : 'Non-Veg'}
              </div>

              {/* Popular Badge */}
              {isPopular && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1">
                  <FaFire className="w-3 h-3" /> Popular
                </div>
              )}

              {/* Discount Badge */}
              {discountPercent > 0 && (
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold shadow-lg animate-pulse-soft">
                  {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate group-hover:text-orange-500 transition-colors">
                    {name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{restaurant}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="text-xs text-gray-400 dark:text-gray-500">{category}</span>
                  </div>
                </div>

                {/* Rating & Delivery Time */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {rating && (
                    <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">
                      <FiStar className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">
                        {rating}
                      </span>
                    </div>
                  )}
                  {deliveryTime && (
                    <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                      <FiClock className="w-3 h-3 text-blue-500" />
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                        {deliveryTime} min
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dietary Info */}
              {dietaryInfo.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {dietaryInfo.map((info, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400"
                    >
                      {info}
                    </span>
                  ))}
                </div>
              )}

              {/* Price & Quantity Section */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                {/* Price */}
                <div className="flex items-center gap-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-orange-500">
                      ${calculateTotal()}
                    </span>
                    {originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${(originalPrice * quantity).toFixed(2)}
                      </span>
                    )}
                  </div>
                  {discountPercent > 0 && (
                    <span className="text-xs font-semibold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                      Save ${((originalPrice - price) * quantity).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDecrease}
                    className="p-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= minOrder}
                    aria-label="Decrease quantity"
                  >
                    <FiMinus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </motion.button>

                  <motion.span
                    variants={quantityVariants}
                    initial="initial"
                    animate={quantityAnimation ? 'animate' : 'initial'}
                    className="w-8 text-center font-bold text-gray-800 dark:text-white"
                  >
                    {quantity}
                  </motion.span>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleIncrease}
                    className="p-1.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/30"
                    disabled={quantity >= maxOrder}
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="w-4 h-4" />
                  </motion.button>

                  {/* Max order indicator */}
                  {quantity >= maxOrder && (
                    <span className="text-xs text-red-500 font-medium">
                      Max {maxOrder}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveLater}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isSaved
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiHeart className={`w-4 h-4 ${isSaved ? 'fill-orange-500 text-orange-500' : ''}`} />
                  {isSaved ? 'Saved' : 'Save for later'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRemove}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Remove
                </motion.button>

                {/* Order info */}
                <div className="ml-auto flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                  <FiShoppingBag className="w-3 h-3" />
                  <span>Min. {minOrder} • Max. {maxOrder}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hover Effects - Bottom Bar */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 py-2 bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/20 border-t border-orange-200/50 dark:border-orange-800/30"
              >
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <FiTruck className="w-3 h-3 text-orange-500" />
                      Free delivery
                    </span>
                    <span className="flex items-center gap-1">
                      <FiDollarSign className="w-3 h-3 text-green-500" />
                      Cashback available
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-500">
                    <FiCheck className="w-3 h-3" />
                    <span>Quality guaranteed</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartItem;