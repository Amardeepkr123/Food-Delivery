import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingBag,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiHeart,
  FiClock,
  FiStar,
  FiTruck,
  FiShield,
  FiGift,
  FiTag,
  FiPercent,
  FiArrowLeft,
  FiArrowRight,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiCreditCard,
  FiMapPin,
  FiPackage,
  FiTruck as FiTruckIcon,
  FiAward,
  FiTrendingUp
} from 'react-icons/fi';
import { 
  FaUtensils, 
  FaPizzaSlice, 
  FaHamburger, 
  FaIceCream, 
  FaCoffee,
  FaLeaf,
  FaPepperHot,
  FaFish,
  FaBirthdayCake
} from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    cartItems, 
    itemCount, 
    totalAmount, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getSubtotal,
    getTotal
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [savedItems, setSavedItems] = useState([]);
  const [recommendedItems, setRecommendedItems] = useState([]);

  useEffect(() => {
    // Load saved items from localStorage
    const saved = localStorage.getItem('savedItems');
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }

    // Mock recommended items
    setRecommendedItems([
      { id: 101, name: 'Garlic Bread', price: 4.99, image: '🍞', restaurant: 'Pizza Palace' },
      { id: 102, name: 'French Fries', price: 3.99, image: '🍟', restaurant: 'Burger House' },
      { id: 103, name: 'Miso Soup', price: 5.99, image: '🍜', restaurant: 'Sushi Master' },
    ]);
  }, []);

  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 0 ? (subtotal > 50 ? 0 : 3.99) : 0;
  const tax = subtotal * 0.08;
  const total = getTotal();

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // Simulate coupon validation
    if (couponCode.toUpperCase() === 'SAVE20') {
      setDiscount(subtotal * 0.2);
      setCouponApplied(true);
      setCouponError('');
    } else if (couponCode.toUpperCase() === 'FIRST10') {
      setDiscount(subtotal * 0.1);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setDiscount(0);
    setCouponCode('');
    setCouponError('');
  };

  const handleSaveForLater = (item) => {
    const updatedSaved = [...savedItems, item];
    setSavedItems(updatedSaved);
    localStorage.setItem('savedItems', JSON.stringify(updatedSaved));
    removeFromCart(item.id);
  };

  const handleMoveToCart = (item) => {
    const updatedSaved = savedItems.filter(i => i.id !== item.id);
    setSavedItems(updatedSaved);
    localStorage.setItem('savedItems', JSON.stringify(updatedSaved));
    // Add back to cart with quantity 1
    updateQuantity(item.id, 1);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/restaurants');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium animate-pulse">
              Loading cart...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <FiShoppingBag className="text-orange-500" />
              Shopping Cart
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {itemCount > 0 
                ? `${itemCount} items in your cart` 
                : 'Your cart is empty'}
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300"
            >
              <FiTrash2 className="w-4 h-4" />
              Clear Cart
            </button>
          )}
        </motion.div>

        {cartItems.length === 0 && savedItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/restaurants">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                >
                  Browse Restaurants
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Cart Items List */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      {/* Image */}
                      <div className="sm:w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-4xl">
                        {item.image || '🍽️'}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.restaurant || 'Restaurant'}
                            </p>
                            {item.isVeg !== undefined && (
                              <div className="flex items-center gap-1 mt-1">
                                {item.isVeg ? (
                                  <span className="text-green-500 flex items-center gap-1 text-xs">
                                    <FaLeaf /> Veg
                                  </span>
                                ) : (
                                  <span className="text-red-500 flex items-center gap-1 text-xs">
                                    <FaUtensils /> Non-Veg
                                  </span>
                                )}
                                {item.rating && (
                                  <span className="flex items-center gap-1 text-xs text-yellow-500">
                                    <FiStar className="fill-current" /> {item.rating}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <span className="text-xl font-bold text-orange-500">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            </button>
                            <span className="w-8 text-center font-bold text-gray-800 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 transition-all duration-300"
                            >
                              <FiPlus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSaveForLater(item)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 text-sm font-medium"
                            >
                              <FiHeart className="w-4 h-4" />
                              Save
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 text-sm font-medium"
                            >
                              <FiTrash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Saved Items */}
              {savedItems.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiHeart className="text-purple-500" />
                    Saved for Later ({savedItems.length})
                  </h3>
                  <div className="space-y-3">
                    {savedItems.map((item) => (
                      <div key={item.id} className="glass-card rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-3xl">
                            {item.image || '🍽️'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white">{item.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">${item.price}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                        >
                          Move to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal ({itemCount} items)</span>
                    <span className="font-semibold text-gray-800 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Delivery Fee</span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Tax (8%)</span>
                    <span className="font-semibold text-gray-800 dark:text-white">${tax.toFixed(2)}</span>
                  </div>

                  {couponApplied && discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span className="flex items-center gap-1">
                        <FiTag className="w-4 h-4" /> Discount
                      </span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-800 dark:text-white">Total</span>
                      <span className="text-orange-500">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="mt-4">
                  {!couponApplied ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-1 px-4 py-2.5 rounded-xl food-input text-sm"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <FiAlertCircle className="w-3 h-3" />
                          {couponError}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Available:</span>
                        <button
                          onClick={() => {
                            setCouponCode('SAVE20');
                            handleApplyCoupon();
                          }}
                          className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          SAVE20
                        </button>
                        <button
                          onClick={() => {
                            setCouponCode('FIRST10');
                            handleApplyCoupon();
                          }}
                          className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          FIRST10
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30">
                      <div className="flex items-center gap-2">
                        <FiCheckCircle className="text-green-500" />
                        <div>
                          <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                            Coupon Applied!
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-300">
                            You saved ${discount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-green-500 hover:text-green-600 transition-colors"
                      >
                        <FiXCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Delivery Info */}
                <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <FiTruckIcon className="text-orange-500" />
                    <span>{deliveryFee === 0 ? 'Free Delivery' : `Delivery Fee: $${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mt-1">
                    <FiShield className="text-orange-500" />
                    <span>Quality Guaranteed</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiCreditCard className="w-5 h-5" />
                  Proceed to Checkout
                  <FiArrowRight className="w-5 h-5" />
                </motion.button>

                <button
                  onClick={handleContinueShopping}
                  className="w-full mt-3 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Items */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-orange-500" />
              You Might Also Like
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommendedItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-2xl p-4 text-center hover:shadow-3xl transition-all duration-300"
                >
                  <div className="text-4xl mb-2">{item.image}</div>
                  <h4 className="font-semibold text-gray-800 dark:text-white text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.restaurant}</p>
                  <p className="text-sm font-bold text-orange-500 mt-1">${item.price}</p>
                  <button
                    onClick={() => {
                      // Add to cart logic
                      toast.success('Added to cart!');
                    }}
                    className="mt-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;