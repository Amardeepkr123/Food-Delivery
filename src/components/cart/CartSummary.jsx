// src/components/cart/CartSummary.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTruck, 
  FiDollarSign, 
  FiPercent, 
  FiTag, 
  FiGift,
  FiCheckCircle,
  FiXCircle,
  FiShoppingBag,
  FiArrowRight,
  FiArrowLeft,
  FiClock,
  FiShield,
  FiCreditCard,
  FiLock,
  FiChevronDown,
  FiChevronUp,
  FiTrendingUp,
  FiAward,
  FiStar,
  FiInfo,
  FiAlertCircle,
  FiHeart,
  FiZap,
  FiCoffee,
  FiSun,
  FiMoon,
  FiSend,
  FiLoader,
  FiMoreHorizontal,
} from 'react-icons/fi';
import { FaRegCreditCard, FaGooglePay, FaApplePay, FaPaypal, FaAmazonPay } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

// ============================================
// SUB-COMPONENTS
// ============================================

// Trust Badge
const TrustBadge = ({ icon: Icon, label, color }) => {
  return (
    <span className={`flex items-center gap-1 text-xs ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};

// Payment Method Button
const PaymentMethodButton = ({ method, isSelected, onSelect }) => {
  const Icon = method.icon;
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(method.id)}
      className={`flex items-center gap-2 p-2.5 rounded-xl border-2 transition-all duration-300 ${
        isSelected
          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
      }`}
    >
      <Icon className={`w-4 h-4 ${isSelected ? 'text-orange-500' : 'text-gray-400'}`} />
      <span className={`text-xs font-medium ${
        isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-600 dark:text-gray-300'
      }`}>
        {method.label}
      </span>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center"
        >
          <FiCheckCircle className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.button>
  );
};

// Coupon Input
const CouponInput = ({ value, onChange, onApply, error, isApplied, onRemove, discount }) => {
  if (isApplied) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30"
      >
        <div className="flex items-center gap-2">
          <FiCheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              Coupon Applied: {value.toUpperCase()}
            </p>
            <p className="text-xs text-green-600 dark:text-green-300">
              You saved ${discount.toFixed(2)}
            </p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
        >
          <FiXCircle className="w-4 h-4 text-green-500" />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder="Enter coupon code"
          className={`flex-1 px-4 py-2.5 rounded-xl border ${
            error ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
          } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300 text-sm`}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onApply}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 whitespace-nowrap"
        >
          Apply
        </motion.button>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 flex items-center gap-1"
        >
          <FiAlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </div>
  );
};

// ============================================
// MAIN CART SUMMARY COMPONENT
// ============================================
const CartSummary = ({
  subtotal = 0,
  deliveryFee = 2.99,
  packingFee = 0.99,
  platformFee = 1.49,
  discount = 0,
  tax = 0.08,
  total = 0,
  couponCode = '',
  savings = 0,
  rewardPoints = 0,
  deliveryEstimate = '25-35 min',
  onApplyCoupon,
  onCheckout,
  onContinueShopping,
  isCheckoutLoading = false,
  className = '',
  variant = 'default', // 'default', 'compact', 'minimal'
  showPaymentMethods = true,
  showTrustBadges = true,
  showPriceBreakdown = true,
  showRewardPoints = true,
  showSavings = true,
  showDeliveryEstimate = true,
  showCouponSection = true,
  itemsCount = 0,
}) => {
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [coupon, setCoupon] = useState(couponCode);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isPriceBreakdownOpen, setIsPriceBreakdownOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  const deliveryFeeCalculated = subtotal > 0 ? deliveryFee : 0;
  const packingFeeCalculated = subtotal > 0 ? packingFee : 0;
  const platformFeeCalculated = subtotal > 0 ? platformFee : 0;
  const taxCalculated = subtotal > 0 ? subtotal * tax : 0;
  const grandTotal = subtotal + deliveryFeeCalculated + packingFeeCalculated + platformFeeCalculated + taxCalculated - discount;
  const totalSavings = savings + discount;

  const handleApplyCoupon = () => {
    if (!coupon.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // Simulate coupon validation
    if (coupon.toUpperCase() === 'SAVE20') {
      setIsCouponApplied(true);
      setCouponError('');
      onApplyCoupon?.(coupon, 20);
      toast.success('Coupon applied successfully! 🎉');
    } else if (coupon.toUpperCase() === 'FIRST10') {
      setIsCouponApplied(true);
      setCouponError('');
      onApplyCoupon?.(coupon, 10);
      toast.success('Coupon applied successfully! 🎉');
    } else if (coupon.toUpperCase() === 'FREE50') {
      setIsCouponApplied(true);
      setCouponError('');
      onApplyCoupon?.(coupon, 50);
      toast.success('Coupon applied successfully! 🎉');
    } else {
      setCouponError('Invalid coupon code');
      setIsCouponApplied(false);
      toast.error('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setCoupon('');
    setCouponError('');
    onApplyCoupon?.('', 0);
    toast.info('Coupon removed');
  };

  const handleCheckout = () => {
    if (subtotal === 0) {
      toast.error('Your cart is empty');
      return;
    }
    onCheckout?.();
  };

  const paymentMethods = [
    { id: 'card', icon: FaRegCreditCard, label: 'Credit/Debit Card' },
    { id: 'google', icon: FaGooglePay, label: 'Google Pay' },
    { id: 'apple', icon: FaApplePay, label: 'Apple Pay' },
    { id: 'paypal', icon: FaPaypal, label: 'PayPal' },
    { id: 'amazon', icon: FaAmazonPay, label: 'Amazon Pay' },
  ];

  const availableCoupons = [
    { code: 'SAVE20', discount: 20, description: '20% off on your order', minOrder: 50 },
    { code: 'FIRST10', discount: 10, description: '10% off on first order', minOrder: 30 },
    { code: 'FREE50', discount: 50, description: '$50 off on orders above $100', minOrder: 100 },
  ];

  const priceBreakdownItems = [
    { label: 'Subtotal', value: subtotal, icon: FiShoppingBag },
    { label: 'Delivery Fee', value: deliveryFeeCalculated, icon: FiTruck },
    { label: 'Packing Charge', value: packingFeeCalculated, icon: FiCoffee },
    { label: 'Platform Fee', value: platformFeeCalculated, icon: FiZap },
    { label: 'Coupon Discount', value: -discount, highlight: true, icon: FiTag },
    { label: 'GST (8%)', value: taxCalculated, icon: FiPercent },
  ];

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  // Empty state
  if (subtotal === 0) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`glass-card rounded-3xl p-6 md:p-8 shadow-2xl ${className}`}
      >
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Your Cart is Empty
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Add some delicious items to your cart
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinueShopping}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
          >
            Browse Restaurants
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`glass-card rounded-2xl p-4 shadow-xl ${className}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold text-orange-500">${grandTotal.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">{itemsCount} items</span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              Checkout
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <div className={`glass-card rounded-xl p-3 shadow-lg ${className}`}>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Total</span>
          <span className="font-bold text-orange-500">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`lg:sticky lg:top-4 ${className}`}
    >
      <div className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FiShoppingBag className="text-orange-500" />
              Order Summary
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          {subtotal > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold shadow-lg"
            >
              ${grandTotal.toFixed(2)}
            </motion.div>
          )}
        </div>

        {/* Delivery Estimate */}
        {showDeliveryEstimate && (
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 mb-4"
          >
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <FiTruck className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                Delivery in {deliveryEstimate}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Free delivery on orders above $50
              </p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs font-semibold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full"
            >
              ✓ On Time
            </motion.div>
          </motion.div>
        )}

        {/* Price Breakdown */}
        {showPriceBreakdown && (
          <div className="mb-4">
            <button
              onClick={() => setIsPriceBreakdownOpen(!isPriceBreakdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Price Breakdown
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-800 dark:text-white">
                  ${grandTotal.toFixed(2)}
                </span>
                {isPriceBreakdownOpen ? (
                  <FiChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {isPriceBreakdownOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 space-y-2">
                    {priceBreakdownItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex justify-between text-sm ${
                            item.highlight
                              ? 'text-green-600 dark:text-green-400 font-semibold'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {Icon && <Icon className="w-3 h-3" />}
                            {item.label}
                          </span>
                          <span>${item.value.toFixed(2)}</span>
                        </motion.div>
                      );
                    })}
                    <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-gray-800 dark:text-white">
                      <span>Grand Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Coupon Section */}
        {showCouponSection && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FiTag className="text-orange-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Apply Coupon
              </span>
            </div>

            <CouponInput
              value={coupon}
              onChange={setCoupon}
              onApply={handleApplyCoupon}
              error={couponError}
              isApplied={isCouponApplied}
              onRemove={handleRemoveCoupon}
              discount={discount}
            />

            {!isCouponApplied && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                  Available coupons:
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableCoupons.map((c, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setCoupon(c.code);
                        setCouponError('');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                    >
                      {c.code} - {c.description}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Savings Highlight */}
        {showSavings && totalSavings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 mb-4"
          >
            <FiTrendingUp className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                You saved ${totalSavings.toFixed(2)}!
              </p>
              <p className="text-xs text-green-600 dark:text-green-300">
                Great deal on your order
              </p>
            </div>
          </motion.div>
        )}

        {/* Reward Points */}
        {showRewardPoints && rewardPoints > 0 && (
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/30 mb-4"
          >
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <FiAward className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-purple-700 dark:text-purple-400">
                Earn {rewardPoints} reward points
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-300">
                Use points on your next order
              </p>
            </div>
          </motion.div>
        )}

        {/* Payment Methods */}
        {showPaymentMethods && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Payment Method
            </p>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((method) => (
                <PaymentMethodButton
                  key={method.id}
                  method={method}
                  isSelected={selectedPaymentMethod === method.id}
                  onSelect={setSelectedPaymentMethod}
                />
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={subtotal === 0 || isCheckoutLoading}
            className={`w-full py-3.5 rounded-2xl text-white font-semibold text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              subtotal > 0
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-orange-500/30 hover:shadow-orange-500/40'
                : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
            }`}
          >
            {isCheckoutLoading ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FiCreditCard className="w-5 h-5" />
                Proceed to Checkout
                <FiArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinueShopping}
            className="w-full py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            Continue Shopping
          </motion.button>
        </div>

        {/* Security & Trust Badges */}
        {showTrustBadges && (
          <motion.div
            variants={itemVariants}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <TrustBadge icon={FiLock} label="Secure Payment" color="text-green-500" />
              <TrustBadge icon={FiShield} label="100% Safe" color="text-blue-500" />
              <TrustBadge icon={FiCheckCircle} label="Quality Guaranteed" color="text-orange-500" />
              <TrustBadge icon={FiClock} label="24/7 Support" color="text-purple-500" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CartSummary;