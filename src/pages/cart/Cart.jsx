// src/pages/cart/Cart.jsx
import React, { useState, forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartContext } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';
import MainLayout from '../../layouts/MainLayout';
import {
  FiShoppingBag,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiHeart,
  FiClock,
  FiMapPin,
  FiStar,
  FiTruck,
  FiGift,
  FiTag,
  FiCreditCard,
  FiSmartphone,
  FiDollarSign,
  FiArrowLeft,
  FiArrowRight,
  FiX,
  FiCheck,
  FiEdit2,
  FiHome,
  FiBriefcase,
  FiMap,
  FiInfo,
  FiAlertCircle,
  FiCoffee,
  FiZap,
  FiAward,
  FiTrendingUp,
  FiShoppingCart,
  FiLoader,
  FiPackage,
  FiSend,
} from 'react-icons/fi';
import { FaLeaf, FaUtensils } from 'react-icons/fa';

// ============================================
// MOCK DATA (for demo)
// ============================================
const mockCartItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    category: 'Pizza',
    description: 'Fresh tomato sauce, mozzarella, basil, olive oil',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    price: 16.99,
    originalPrice: 19.99,
    quantity: 2,
    isVeg: true,
    isAvailable: true,
    discount: 15,
    customizations: {
      extraCheese: false,
      extraSauce: false,
      extraToppings: false,
      spiceLevel: 2,
    },
    specialInstructions: 'Extra cheese please',
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    description: 'Tomato sauce, mozzarella, pepperoni, oregano',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    price: 19.99,
    originalPrice: 22.99,
    quantity: 1,
    isVeg: false,
    isAvailable: true,
    discount: 10,
    customizations: {
      extraCheese: true,
      extraSauce: false,
      extraToppings: true,
      spiceLevel: 3,
    },
    specialInstructions: '',
  },
  {
    id: 3,
    name: 'Garlic Bread',
    category: 'Snacks',
    description: 'Fresh bread with garlic butter, parsley, and cheese',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400',
    price: 4.99,
    originalPrice: 6.99,
    quantity: 3,
    isVeg: true,
    isAvailable: true,
    discount: 0,
    customizations: {
      extraCheese: false,
      extraSauce: false,
      extraToppings: false,
      spiceLevel: 1,
    },
    specialInstructions: '',
  },
];

const mockRecommendedFoods = [
  { id: 4, name: 'Pasta Alfredo', price: 18.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1645112411342-4665a10a3a1d?w=200', isVeg: true },
  { id: 5, name: 'Caesar Salad', price: 14.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200', isVeg: true },
  { id: 6, name: 'Tiramisu', price: 8.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200', isVeg: true },
];

const mockCoupons = [
  { code: 'FIRST20', description: '20% off on first order', discount: 20, minOrder: 50 },
  { code: 'FREEDEL', description: 'Free delivery on orders above ₹300', discount: 0, minOrder: 30 },
  { code: 'SAVE50', description: '₹50 off on orders above ₹200', discount: 50, minOrder: 20 },
];

const mockAddresses = [
  { id: 1, type: 'Home', address: '123, Marine Drive, Mumbai - 400001', isDefault: true },
  { id: 2, type: 'Office', address: '456, Connaught Place, Delhi - 110001', isDefault: false },
];

// ============================================
// CART ITEM COMPONENT - WITH FORWARD REF
// ============================================
const CartItem = forwardRef(({ 
  item, 
  onUpdateQuantity, 
  onRemove, 
  onSaveForLater, 
  onFavorite 
}, ref) => {
  const [showCustomizations, setShowCustomizations] = useState(false);
  const [instructions, setInstructions] = useState(item.specialInstructions || '');

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="glass-card rounded-2xl p-4 md:p-6 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Image */}
        <div className="relative md:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {item.discount > 0 && (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold">
              {item.discount}% OFF
            </div>
          )}
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">Unavailable</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {item.isVeg ? (
                  <span className="text-green-500 text-sm flex items-center gap-1">
                    <FaLeaf /> Veg
                  </span>
                ) : (
                  <span className="text-red-500 text-sm flex items-center gap-1">
                    <FaUtensils /> Non-Veg
                  </span>
                )}
                <span className="text-xs text-gray-400">{item.category}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                {item.originalPrice > item.price && (
                  <p className="text-sm text-gray-400 line-through">${item.originalPrice}</p>
                )}
                <p className="text-xl font-bold text-orange-500">${item.price}</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold text-gray-800 dark:text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <button
              onClick={() => setShowCustomizations(!showCustomizations)}
              className="text-xs text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1"
            >
              <FiEdit2 className="w-3 h-3" />
              Customize
            </button>
            <button
              onClick={() => onSaveForLater(item.id)}
              className="text-xs text-gray-500 hover:text-blue-500 transition-colors flex items-center gap-1"
            >
              <FiClock className="w-3 h-3" />
              Save for later
            </button>
            <button
              onClick={() => onFavorite(item.id)}
              className="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <FiHeart className="w-3 h-3" />
              Favorite
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="text-xs text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 ml-auto"
            >
              <FiTrash2 className="w-3 h-3" />
              Remove
            </button>
          </div>

          {/* Customizations */}
          <AnimatePresence>
            {showCustomizations && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                      <input type="checkbox" className="rounded" />
                      Extra Cheese
                    </label>
                    <label className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                      <input type="checkbox" className="rounded" />
                      Extra Sauce
                    </label>
                    <label className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                      <input type="checkbox" className="rounded" />
                      Extra Toppings
                    </label>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300">Spice Level</label>
                    <div className="flex gap-2 mt-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          className={`px-3 py-1 rounded-full text-xs transition-all ${
                            level === item.customizations?.spiceLevel
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300">Special Instructions</label>
                    <input
                      type="text"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="Add cooking instructions..."
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
});

CartItem.displayName = 'CartItem';

// ============================================
// BILL SUMMARY COMPONENT
// ============================================
const BillSummary = ({ subtotal, discount, couponDiscount, deliveryFee, platformFee, packagingFee, gst, tip, grandTotal }) => {
  return (
    <div className="glass-card rounded-2xl p-6 sticky top-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Bill Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-800 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Item Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        {couponDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Coupon Discount</span>
            <span>-${couponDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
          <span className="text-gray-800 dark:text-white">${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Platform Fee</span>
          <span className="text-gray-800 dark:text-white">${platformFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Packaging Charge</span>
          <span className="text-gray-800 dark:text-white">${packagingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">GST (5%)</span>
          <span className="text-gray-800 dark:text-white">${gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Tip</span>
          <span className="text-gray-800 dark:text-white">${tip.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold text-lg">
          <span className="text-gray-800 dark:text-white">Grand Total</span>
          <span className="text-orange-500">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COUPON SECTION COMPONENT
// ============================================
const CouponSection = ({ onApplyCoupon, onRemoveCoupon, appliedCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [showAvailable, setShowAvailable] = useState(false);

  const handleApply = () => {
    if (couponCode.trim()) {
      const found = mockCoupons.find(c => c.code === couponCode.toUpperCase());
      if (found) {
        onApplyCoupon(found);
        setCouponCode('');
      } else {
        alert('Invalid coupon code');
      }
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <FiTag className="text-orange-500" />
        Apply Coupon
      </h3>

      {appliedCoupon ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30"
        >
          <div>
            <p className="font-semibold text-green-600 dark:text-green-400">
              {appliedCoupon.code}
            </p>
            <p className="text-xs text-green-500 dark:text-green-300">{appliedCoupon.description}</p>
          </div>
          <button
            onClick={onRemoveCoupon}
            className="p-1.5 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/30 transition-colors"
          >
            <FiX className="w-4 h-4 text-green-600" />
          </button>
        </motion.div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
          />
          <button
            onClick={handleApply}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
          >
            Apply
          </button>
        </div>
      )}

      <button
        onClick={() => setShowAvailable(!showAvailable)}
        className="text-xs text-orange-500 hover:text-orange-600 mt-2"
      >
        {showAvailable ? 'Hide available coupons' : 'Show available coupons'}
      </button>

      <AnimatePresence>
        {showAvailable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2">
              {mockCoupons.map((coupon) => (
                <div key={coupon.code} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{coupon.code}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{coupon.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCouponCode(coupon.code);
                      handleApply();
                    }}
                    className="px-3 py-1 rounded-lg bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// RECOMMENDED FOODS SLIDER
// ============================================
const RecommendedFoods = ({ foods, onAdd }) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <FiTrendingUp className="text-orange-500" />
        Recommended for You
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {foods.map((food) => (
          <motion.div
            key={food.id}
            whileHover={{ y: -4 }}
            className="glass-card rounded-2xl p-4 min-w-[160px] max-w-[160px] flex-shrink-0"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-24 rounded-xl object-cover"
            />
            <h4 className="font-semibold text-gray-800 dark:text-white text-sm mt-2 truncate">
              {food.name}
            </h4>
            <div className="flex items-center gap-1 text-xs text-yellow-500">
              <FiStar className="fill-current" /> {food.rating}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold text-orange-500 text-sm">${food.price}</span>
              <button
                onClick={() => onAdd(food)}
                className="p-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-110 transition-transform"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// MAIN CART COMPONENT
// ============================================
const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    cartItems: contextCartItems,
    addToCart: contextAddToCart,
    removeFromCart: contextRemoveFromCart,
    updateQuantity: contextUpdateQuantity,
    clearCart: contextClearCart,
    getSubtotal,
    getTotal,
    itemCount: contextItemCount,
  } = useCartContext();

  // Use mock data if context is empty (for demo)
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0]);
  const [tip, setTip] = useState(0);
  const [isOrderPlacing, setIsOrderPlacing] = useState(false);

  // Use context if available, otherwise use local state
  const items = contextCartItems?.length > 0 ? contextCartItems : cartItems;
  const itemCount = contextItemCount || items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemDiscount = items.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0);
  const couponDiscount = appliedCoupon ? Math.min(subtotal * (appliedCoupon.discount / 100), 100) : 0;
  const deliveryFee = subtotal > 30 ? 0 : 2.99;
  const platformFee = 1.99;
  const packagingFee = 0.99;
  const gst = subtotal * 0.05;
  const grandTotal = subtotal - itemDiscount - couponDiscount + deliveryFee + platformFee + packagingFee + gst + tip;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Handlers
  const handleUpdateQuantity = (id, newQuantity) => {
    if (contextUpdateQuantity) {
      contextUpdateQuantity(id, newQuantity);
    } else {
      if (newQuantity <= 0) {
        handleRemoveItem(id);
        return;
      }
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    if (contextRemoveFromCart) {
      contextRemoveFromCart(id);
    } else {
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      if (contextClearCart) {
        contextClearCart();
      } else {
        setCartItems([]);
      }
    }
  };

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleAddToCart = (food) => {
    if (contextAddToCart) {
      contextAddToCart(food);
    } else {
      const existing = cartItems.find(item => item.id === food.id);
      if (existing) {
        handleUpdateQuantity(food.id, existing.quantity + 1);
      } else {
        setCartItems(prev => [...prev, { ...food, quantity: 1 }]);
      }
    }
  };

  const handlePlaceOrder = () => {
    setIsOrderPlacing(true);
    setTimeout(() => {
      setIsOrderPlacing(false);
      navigate('/checkout');
    }, 2000);
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md mx-auto"
            >
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Your Cart is Empty
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Looks like you haven't added any items to your cart yet.
                Explore our delicious menu and order now!
              </p>
              <Link to="/restaurants">
                <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300">
                  Browse Restaurants
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <FiShoppingBag className="text-orange-500" />
                Your Cart
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({totalItems} items)
                </span>
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FiClock className="text-orange-500" />
                  Est. Delivery: 25-35 min
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin className="text-orange-500" />
                  1.2 km away
                </span>
                <span className="flex items-center gap-1">
                  <FiStar className="text-yellow-400 fill-current" />
                  4.8 (1245 reviews)
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/restaurants">
                <button className="px-4 py-2 rounded-xl glass-card hover:shadow-lg transition-all text-sm font-medium text-gray-700 dark:text-gray-300">
                  Continue Shopping
                </button>
              </Link>
              <button
                onClick={handleClearCart}
                className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    onSaveForLater={() => {}}
                    onFavorite={() => {}}
                  />
                ))}
              </AnimatePresence>

              {/* Coupon Section */}
              <CouponSection
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
                appliedCoupon={appliedCoupon}
              />

              {/* Delivery Address */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FiMapPin className="text-orange-500" />
                  Delivery Address
                </h3>
                <div className="flex flex-wrap gap-3">
                  {mockAddresses.map((addr) => (
                    <button
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        selectedAddress.id === addr.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {addr.type === 'Home' ? <FiHome /> : <FiBriefcase />}
                      {addr.type}
                    </button>
                  ))}
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-all">
                    <FiPlus /> Add New
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  {selectedAddress.address}
                </p>
              </div>

              {/* Delivery Options */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FiTruck className="text-orange-500" />
                  Delivery Options
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-semibold shadow-lg shadow-orange-500/30">
                    Deliver Now
                  </button>
                  <button className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors">
                    Schedule Delivery
                  </button>
                </div>
              </div>

              {/* Recommended Foods */}
              <RecommendedFoods foods={mockRecommendedFoods} onAdd={handleAddToCart} />

              {/* Order Instructions */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FiInfo className="text-orange-500" />
                  Order Instructions
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Don\'t Ring Bell', 'Call on Arrival', 'Leave at Door', 'Contactless Delivery'].map((instruction) => (
                    <button
                      key={instruction}
                      className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors text-sm"
                    >
                      {instruction}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add custom note..."
                  className="w-full mt-3 px-4 py-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <BillSummary
                subtotal={subtotal}
                discount={itemDiscount}
                couponDiscount={couponDiscount}
                deliveryFee={deliveryFee}
                platformFee={platformFee}
                packagingFee={packagingFee}
                gst={gst}
                tip={tip}
                grandTotal={grandTotal}
              />

              {/* Payment Methods Preview */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FiCreditCard className="text-orange-500" />
                  Payment Options
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                    <FiSmartphone /> UPI
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                    <FiCreditCard /> Cards
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                    <FiDollarSign /> COD
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                    <FiZap /> Wallet
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Checkout Footer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-gray-200 dark:border-gray-700 px-4 py-3 md:py-4"
          >
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Items: <span className="font-semibold text-gray-800 dark:text-white">{totalItems}</span>
                  </p>
                  <p className="text-2xl font-bold text-orange-500">${grandTotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isOrderPlacing}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isOrderPlacing ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <FiArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;