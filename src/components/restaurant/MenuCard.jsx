// src/components/restaurant/MenuCard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiStar,
  FiHeart,
  FiShare2,
  FiClock,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiCheck,
  FiX,
  FiEye,
  FiInfo,
  FiAward,
  FiZap,
  FiTrendingUp,
  FiTag,
  FiGift,
  FiUsers,
  FiCoffee,
  FiLeaf,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
  FiEdit2,
  FiCamera,
  FiZoomIn,
  FiExternalLink,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { FaLeaf, FaUtensils, FaFire, FaPepperHot } from 'react-icons/fa';
import { useCartContext } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

// ============================================
// SUB-COMPONENTS
// ============================================

// Badge Component
const Badge = ({ type, label, icon: Icon }) => {
  const styles = {
    veg: 'bg-green-500 text-white',
    'non-veg': 'bg-red-500 text-white',
    bestseller: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white',
    new: 'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
    'chef-special': 'bg-gradient-to-r from-purple-400 to-purple-500 text-white',
    offer: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
    combo: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white',
    'bogo': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
  };

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-lg ${styles[type] || styles.new}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {label}
    </motion.span>
  );
};

// Quantity Selector
const QuantitySelector = ({ quantity, onIncrease, onDecrease, isLoading }) => {
  return (
    <div className="flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 rounded-xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1 || isLoading}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiMinus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>
      <span className="w-8 text-center font-semibold text-gray-800 dark:text-white text-sm">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={isLoading}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiPlus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
};

// Customization Options
const CustomizationOptions = ({ options, selectedOptions, onOptionChange }) => {
  const [expanded, setExpanded] = useState(false);

  if (!options || options.length === 0) return null;

  return (
    <div className="mt-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
      >
        <FiEdit2 className="w-3 h-3" />
        Customize
        {expanded ? <FiChevronUp className="w-3 h-3" /> : <FiChevronDown className="w-3 h-3" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/50 space-y-2">
              {options.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    {option.name}
                    {option.price > 0 && (
                      <span className="text-xs text-gray-400 ml-1">+${option.price}</span>
                    )}
                  </label>
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => onOptionChange(option.id)}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Image Preview Modal
const ImagePreviewModal = ({ image, name, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-white dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image} alt={name} className="w-full h-full object-contain max-h-[80vh]" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <FiX className="w-6 h-6" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white font-semibold text-lg">{name}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// MAIN MENU CARD COMPONENT
// ============================================
const MenuCard = ({
  item,
  onAddToCart: externalAddToCart,
  onRemoveFromCart: externalRemoveFromCart,
  onUpdateQuantity: externalUpdateQuantity,
  className = '',
  variant = 'default', // 'default', 'compact', 'detailed'
  showCustomizations = true,
  showReviews = true,
  showImagePreview = true,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const cartContext = useCartContext();

  // Use context methods if available, otherwise use props
  const addToCart = externalAddToCart || cartContext?.addToCart;
  const removeFromCart = externalRemoveFromCart || cartContext?.removeFromCart;
  const updateQuantity = externalUpdateQuantity || cartContext?.updateQuantity;

  // Local state
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if item is in cart
  useEffect(() => {
    if (cartContext?.findItem) {
      const cartItem = cartContext.findItem(item.id);
      setIsInCart(!!cartItem);
      if (cartItem) {
        setQuantity(cartItem.quantity || 1);
      }
    }
  }, [cartContext, item.id]);

  // Handlers
  const handleAddToCart = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const itemToAdd = {
        ...item,
        quantity,
        customizations: selectedOptions,
      };

      if (addToCart) {
        await addToCart(itemToAdd);
      }
      setIsInCart(true);
      toast.success(`${item.name} added to cart! 🛒`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (removeFromCart) {
        await removeFromCart(item.id);
      }
      setIsInCart(false);
      setQuantity(1);
      toast.info(`${item.name} removed from cart`);
    } catch (error) {
      toast.error('Failed to remove item from cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (newQuantity) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (newQuantity <= 0) {
        await handleRemoveFromCart();
        return;
      }

      if (updateQuantity) {
        await updateQuantity(item.id, newQuantity);
      }
      setQuantity(newQuantity);
    } catch (error) {
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites ❤️');
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard?.writeText(`${window.location.origin}/restaurant/${item.restaurantId}`);
      toast.success('Link copied to clipboard! 📋');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleImageClick = () => {
    if (showImagePreview) {
      setShowImageModal(true);
    }
  };

  const handleOptionChange = (optionId) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  // Calculate discount percentage
  const discountPercentage = item.originalPrice && item.price
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  // Get badges
  const getBadges = () => {
    const badges = [];

    if (item.isVeg) {
      badges.push({ type: 'veg', label: 'Veg', icon: FaLeaf });
    } else {
      badges.push({ type: 'non-veg', label: 'Non-Veg', icon: FaUtensils });
    }

    if (item.isBestseller) {
      badges.push({ type: 'bestseller', label: 'Bestseller', icon: FiTrendingUp });
    }

    if (item.isNew) {
      badges.push({ type: 'new', label: 'New', icon: FiZap });
    }

    if (item.isChefRecommended) {
      badges.push({ type: 'chef-special', label: 'Chef Special', icon: FiAward });
    }

    if (item.offer) {
      badges.push({ type: 'offer', label: item.offer, icon: FiTag });
    }

    if (item.isCombo) {
      badges.push({ type: 'combo', label: 'Combo', icon: FiGift });
    }

    if (item.isBOGO) {
      badges.push({ type: 'bogo', label: 'Buy 1 Get 1', icon: FiGift });
    }

    return badges;
  };

  const badges = getBadges();

  // Price calculation
  const finalPrice = item.discountPrice || item.price;
  const originalPrice = item.originalPrice || finalPrice;
  const hasDiscount = originalPrice > finalPrice;

  // Loading skeleton
  if (item.isLoading) {
    return <MenuCardSkeleton variant={variant} />;
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className={`glass-card rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 ${className}`}
      >
        <div className="flex gap-4">
          {/* Image */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full rounded-xl object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={handleImageClick}
            />
            {hasDiscount && (
              <div className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold">
                {discountPercentage}% OFF
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {badges.slice(0, 2).map((badge, idx) => (
                    <Badge key={idx} {...badge} />
                  ))}
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm mt-1 truncate">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                  {item.category}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div>
                {hasDiscount ? (
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-orange-500 text-sm">${finalPrice}</span>
                    <span className="text-xs text-gray-400 line-through">${originalPrice}</span>
                  </div>
                ) : (
                  <span className="font-bold text-gray-800 dark:text-white text-sm">${finalPrice}</span>
                )}
              </div>

              {isInCart ? (
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => handleUpdateQuantity(quantity + 1)}
                  onDecrease={() => handleUpdateQuantity(quantity - 1)}
                  isLoading={isLoading}
                />
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={isLoading || !item.isAvailable}
                  className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <FiLoader className="w-4 h-4 animate-spin" />
                  ) : (
                    <FiPlus className="w-4 h-4" />
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Detailed variant
  if (variant === 'detailed') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className={`glass-card rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-300 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
            onClick={handleImageClick}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {badges.map((badge, idx) => (
              <Badge key={idx} {...badge} />
            ))}
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavorite}
              className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all"
            >
              <FiHeart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all"
            >
              <FiShare2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleImageClick}
              className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all"
            >
              <FiZoomIn className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>

          {/* Price badge */}
          {hasDiscount && (
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-bold shadow-lg">
              ${finalPrice}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
            </div>
            {item.rating && (
              <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2.5 py-1 rounded-full">
                <FiStar className="text-yellow-500 fill-current w-4 h-4" />
                <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">{item.rating}</span>
                {item.reviews && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">({item.reviews})</span>
                )}
              </div>
            )}
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-3">
            {item.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
            {item.prepTime && (
              <span className="flex items-center gap-1">
                <FiClock className="w-4 h-4" />
                {item.prepTime} min
              </span>
            )}
            {item.calories && (
              <span className="flex items-center gap-1">
                <FiInfo className="w-4 h-4" />
                {item.calories} cal
              </span>
            )}
            {item.servingSize && (
              <span className="flex items-center gap-1">
                <FiUsers className="w-4 h-4" />
                Serves {item.servingSize}
              </span>
            )}
            {item.deliveryEstimate && (
              <span className="flex items-center gap-1">
                <FiClock className="w-4 h-4" />
                {item.deliveryEstimate}
              </span>
            )}
          </div>

          {/* Spice level */}
          {item.spiceLevel && (
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-gray-500">Spice Level:</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaPepperHot
                    key={i}
                    className={`w-3 h-3 ${i < item.spiceLevel ? 'text-red-500' : 'text-gray-300 dark:text-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              {hasDiscount ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-orange-500">${finalPrice}</span>
                  <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold">
                    {discountPercentage}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-800 dark:text-white">${finalPrice}</span>
              )}
              {item.stock !== undefined && (
                <p className={`text-xs ${item.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {isInCart ? (
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => handleUpdateQuantity(quantity + 1)}
                  onDecrease={() => handleUpdateQuantity(quantity - 1)}
                  isLoading={isLoading}
                />
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={isLoading || !item.isAvailable || item.stock === 0}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <FiLoader className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <FiShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>

          {/* Customizations */}
          {showCustomizations && item.customizations && (
            <CustomizationOptions
              options={item.customizations}
              selectedOptions={selectedOptions}
              onOptionChange={handleOptionChange}
            />
          )}

          {/* Reviews preview */}
          {showReviews && item.reviewPreview && (
            <div className="mt-3 p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={`w-3 h-3 ${i < (item.reviewPreview.rating || 5) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  "{item.reviewPreview.comment}"
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {showImageModal && (
            <ImagePreviewModal
              image={item.image}
              name={item.name}
              onClose={() => setShowImageModal(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Default variant
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        className={`glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 ${
          isHovered ? 'shadow-2xl' : ''
        } ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
            onClick={handleImageClick}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {badges.slice(0, 3).map((badge, idx) => (
              <Badge key={idx} {...badge} />
            ))}
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavorite}
              className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
            >
              <FiHeart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
            >
              <FiShare2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </motion.button>
          </div>

          {/* Quick view button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleImageClick}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1"
          >
            <FiEye className="w-3 h-3" /> Quick View
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.category}</p>
            </div>
            {item.rating && (
              <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                <FiStar className="text-yellow-500 fill-current w-3.5 h-3.5" />
                <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">{item.rating}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">
            {item.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
            {item.prepTime && (
              <span className="flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {item.prepTime}m
              </span>
            )}
            {item.calories && (
              <span className="flex items-center gap-1">
                <FiInfo className="w-3 h-3" />
                {item.calories} cal
              </span>
            )}
            {item.isAvailable === false && (
              <span className="flex items-center gap-1 text-red-500">
                <FiAlertCircle className="w-3 h-3" />
                Unavailable
              </span>
            )}
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div>
              {hasDiscount ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold text-orange-500">${finalPrice}</span>
                  <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
                  {discountPercentage > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-800 dark:text-white">${finalPrice}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isInCart ? (
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => handleUpdateQuantity(quantity + 1)}
                  onDecrease={() => handleUpdateQuantity(quantity - 1)}
                  isLoading={isLoading}
                />
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={isLoading || !item.isAvailable}
                  className="p-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <FiLoader className="w-4 h-4 animate-spin" />
                  ) : (
                    <FiShoppingBag className="w-4 h-4" />
                  )}
                </motion.button>
              )}
            </div>
          </div>

          {/* Customizations */}
          {showCustomizations && item.customizations && (
            <CustomizationOptions
              options={item.customizations}
              selectedOptions={selectedOptions}
              onOptionChange={handleOptionChange}
            />
          )}
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {showImageModal && (
            <ImagePreviewModal
              image={item.image}
              name={item.name}
              onClose={() => setShowImageModal(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

// ============================================
// SKELETON LOADER
// ============================================
export const MenuCardSkeleton = ({ variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <div className="glass-card rounded-2xl p-4 animate-pulse">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-pulse">
      <div className="h-56 bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="flex justify-between items-center pt-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// ============================================
// EXPORTS
// ============================================
export default MenuCard;