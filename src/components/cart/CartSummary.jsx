import React, { useState } from 'react';
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
  FiStar
} from 'react-icons/fi';
import { FaRegCreditCard, FaGooglePay, FaApplePay, FaPaypal } from 'react-icons/fa';

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
  className = ''
}) => {
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [coupon, setCoupon] = useState(couponCode);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
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
    } else if (coupon.toUpperCase() === 'FIRST10') {
      setIsCouponApplied(true);
      setCouponError('');
      onApplyCoupon?.(coupon, 10);
    } else {
      setCouponError('Invalid coupon code');
      setIsCouponApplied(false);
    }
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setCoupon('');
    setCouponError('');
    onApplyCoupon?.('', 0);
  };

  const handleCheckout = () => {
    if (subtotal === 0) {
      return;
    }
    onCheckout?.();
  };

  const paymentMethods = [
    { id: 'card', icon: FaRegCreditCard, label: 'Credit/Debit Card' },
    { id: 'google', icon: FaGooglePay, label: 'Google Pay' },
    { id: 'apple', icon: FaApplePay, label: 'Apple Pay' },
    { id: 'paypal', icon: FaPaypal, label: 'PayPal' },
  ];

  const availableCoupons = [
    { code: 'SAVE20', discount: 20, description: '20% off on your order', minOrder: 50 },
    { code: 'FIRST10', discount: 10, description: '10% off on first order', minOrder: 30 },
    { code: 'FREE50', discount: 50, description: '$50 off on orders above $100', minOrder: 100 },
  ];

  const priceBreakdownItems = [
    { label: 'Subtotal', value: subtotal },
    { label: 'Delivery Fee', value: deliveryFeeCalculated },
    { label: 'Packing Charge', value: packingFeeCalculated },
    { label: 'Platform Fee', value: platformFeeCalculated },
    { label: 'Coupon Discount', value: -discount, highlight: true },
    { label: 'GST (8%)', value: taxCalculated },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

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
              {subtotal > 0 ? `${subtotal.toFixed(2)} items` : 'Your cart is empty'}
            </p>
          </div>
          {subtotal > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold shadow-lg"
            >
              {grandTotal.toFixed(2)}
            </motion.div>
          )}
        </div>

        {/* Delivery Estimate */}
        {subtotal > 0 && (
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
        {subtotal > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Price Breakdown
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-800 dark:text-white">
                  ${grandTotal.toFixed(2)}
                </span>
                {showPriceBreakdown ? (
                  <FiChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {showPriceBreakdown && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 space-y-2">
                    {priceBreakdownItems.map((item, index) => (
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
                        <span>{item.label}</span>
                        <span>${item.value.toFixed(2)}</span>
                      </motion.div>
                    ))}
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
        {subtotal > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FiTag className="text-orange-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Apply Coupon
              </span>
            </div>

            {isCouponApplied ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30"
              >
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                      Coupon Applied: {coupon.toUpperCase()}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-300">
                      You saved ${discount.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <FiXCircle className="w-4 h-4 text-green-500" />
                </button>
              </motion.div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setCouponError('');
                    }}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApplyCoupon}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 whitespace-nowrap"
                  >
                    Apply
                  </motion.button>
                </div>
                {couponError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 flex items-center gap-1"
                  >
                    <FiXCircle className="w-3 h-3" />
                    {couponError}
                  </motion.p>
                )}

                {/* Available Coupons */}
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
              </div>
            )}
          </div>
        )}

        {/* Savings Highlight */}
        {totalSavings > 0 && (
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
        {rewardPoints > 0 && (
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
        {subtotal > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Payment Method
            </p>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedPaymentMethod === method.id;
                return (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-orange-500' : 'text-gray-400'}`} />
                    <span className={`text-xs font-medium ${
                      isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {method.label}
                    </span>
                  </motion.button>
                );
              })}
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
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
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
        {subtotal > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <FiLock className="w-3 h-3 text-green-500" />
                Secure Payment
              </span>
              <span className="flex items-center gap-1">
                <FiShield className="w-3 h-3 text-blue-500" />
                100% Safe
              </span>
              <span className="flex items-center gap-1">
                <FiCheckCircle className="w-3 h-3 text-orange-500" />
                Quality Guaranteed
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CartSummary;