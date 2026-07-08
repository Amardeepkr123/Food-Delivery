// src/components/cart/CartItem.jsx
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
  FiDollarSign,
  FiEdit2,
  FiTag,
  FiGift,
  FiAward,
  FiAlertCircle,
  FiInfo,
  FiSend,
  FiSmile,
} from 'react-icons/fi';
import { FaLeaf, FaUtensils, FaFire, FaCrown } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// ============================================
// SUB-COMPONENTS
// ============================================

// Badge Component
const Badge = ({ icon: Icon, label, color, bg }) => {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${bg} ${color}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </span>
  );
};

// Quantity Selector
const QuantitySelector = ({ quantity, minOrder, maxOrder, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center gap-1.5">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onDecrease}
        className={`p-1.5 rounded-xl transition-all duration-300 ${
          quantity <= minOrder
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
        }`}
        disabled={quantity <= minOrder}
        aria-label="Decrease quantity"
      >
        <FiMinus className="w-4 h-4" />
      </motion.button>

      <motion.span
        key={quantity}
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-8 text-center font-bold text-gray-800 dark:text-white text-base"
      >
        {quantity}
      </motion.span>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onIncrease}
        className={`p-1.5 rounded-xl transition-all duration-300 ${
          quantity >= maxOrder
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40'
        }`}
        disabled={quantity >= maxOrder}
        aria-label="Increase quantity"
      >
        <FiPlus className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

// ============================================
// MAIN CART ITEM COMPONENT
// ============================================
const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onSaveLater,
  onEdit,
  onApplyCoupon,
  isSaved = false,
  index = 0,
  showActions = true,
  variant = 'default', // 'default', 'compact', 'minimal'
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [quantityAnimation, setQuantityAnimation] = useState(false);
  const [showCustomizations, setShowCustomizations] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
    isBestseller = false,
    dietaryInfo = [],
    maxOrder = 10,
    minOrder = 1,
    customizationOptions = [],
    selectedCustomizations = [],
    notes = '',
    availability = true,
    preparationTime = '15-20',
  } = item;

  const handleIncrease = () => {
    if (quantity < maxOrder) {
      onIncrease(id);
      setQuantityAnimation(true);
      setTimeout(() => setQuantityAnimation(false), 300);
    } else {
      toast.error(`Maximum order limit is ${maxOrder}`);
    }
  };

  const handleDecrease = () => {
    if (quantity > minOrder) {
      onDecrease(id);
      setQuantityAnimation(true);
      setTimeout(() => setQuantityAnimation(false), 300);
    } else if (quantity === minOrder) {
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

  const handleApplyCoupon = () => {
    if (onApplyCoupon) {
      onApplyCoupon(id);
    } else {
      toast.success('Coupon applied successfully! 🎉');
    }
  };

  const discountPercent = calculateDiscount();

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
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  const quantityVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 },
    },
  };

  // Compact Variant
  if (variant === 'compact') {
    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className={`glass-card rounded-2xl p-3 hover:shadow-2xl transition-all duration-300 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3">
          {/* Image */}
          <div className="relative w-14 h-14 flex-shrink-0">
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-3xl">
              {image || '🍽️'}
            </div>
            {isVeg && (
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                <FaLeaf className="w-2 h-2 text-white" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm truncate">
                {name}
              </h4>
              <span className="font-bold text-orange-500 text-sm">
                ${calculateTotal()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{restaurant}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              <span>Qty: {quantity}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <QuantitySelector
              quantity={quantity}
              minOrder={minOrder}
              maxOrder={maxOrder}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
            <button
              onClick={handleRemove}
              className="p-1.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <FiTrash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Minimal Variant
  if (variant === 'minimal') {
    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className={`flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors ${className}`}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-2xl flex-shrink-0">
          {image || '🍽️'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800 dark:text-white text-sm truncate">{name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">${price} × {quantity}</p>
        </div>
        <span className="font-bold text-orange-500 text-sm">${calculateTotal()}</span>
        <button
          onClick={handleRemove}
          className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <FiX className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>
      </motion.div>
    );
  }

  // Default Variant
  return (
    <AnimatePresence mode="wait">
      {!isRemoving && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
          className={`glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 group ${className}`}
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

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                <Badge
                  icon={isVeg ? FaLeaf : FaUtensils}
                  label={isVeg ? 'Veg' : 'Non-Veg'}
                  color="text-white"
                  bg={isVeg ? 'bg-green-500' : 'bg-red-500'}
                />
              </div>

              <div className="absolute top-2 right-2 flex flex-wrap gap-1">
                {isPopular && (
                  <Badge
                    icon={FaFire}
                    label="Popular"
                    color="text-white"
                    bg="bg-gradient-to-r from-orange-500 to-red-500"
                  />
                )}
                {isBestseller && (
                  <Badge
                    icon={FaCrown}
                    label="Bestseller"
                    color="text-white"
                    bg="bg-gradient-to-r from-yellow-400 to-yellow-500"
                  />
                )}
              </div>

              {discountPercent > 0 && (
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold shadow-lg animate-pulse-soft">
                  {discountPercent}% OFF
                </div>
              )}

              {!availability && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                  <span className="text-white text-sm font-semibold">Unavailable</span>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate group-hover:text-orange-500 transition-colors">
                      {name}
                    </h3>
                    {isRecommended && (
                      <span className="px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-semibold">
                        Recommended
                      </span>
                    )}
                  </div>
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
                <QuantitySelector
                  quantity={quantity}
                  minOrder={minOrder}
                  maxOrder={maxOrder}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />

                {/* Max order indicator */}
                {quantity >= maxOrder && (
                  <span className="text-xs text-red-500 font-medium">
                    Max {maxOrder}
                  </span>
                )}
              </div>

              {/* Actions */}
              {showActions && (
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

                  {onEdit && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onEdit(id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      Edit
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRemove}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Remove
                  </motion.button>

                  {onApplyCoupon && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleApplyCoupon}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300"
                    >
                      <FiTag className="w-4 h-4" />
                      Apply Coupon
                    </motion.button>
                  )}

                  {/* Order info */}
                  <div className="ml-auto flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                    <FiShoppingBag className="w-3 h-3" />
                    <span>Min. {minOrder} • Max. {maxOrder}</span>
                  </div>
                </div>
              )}
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
                <div className="flex flex-wrap items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1">
                      <FiTruck className="w-3 h-3 text-orange-500" />
                      Free delivery
                    </span>
                    <span className="flex items-center gap-1">
                      <FiDollarSign className="w-3 h-3 text-green-500" />
                      Cashback available
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-3 h-3 text-blue-500" />
                      Prep: {preparationTime} min
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