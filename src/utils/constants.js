// src/constants/constants.js

// ============================================
// API CONFIGURATION
// ============================================

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5000';

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// ============================================
// ROUTE CONFIGURATION
// ============================================

export const ROUTES = {
  // Public Routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  VERIFY_OTP: '/verify-otp',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
  
  // Restaurant Routes
  RESTAURANTS: '/restaurants',
  RESTAURANT_DETAILS: '/restaurant/:id',
  RESTAURANT_MENU: '/restaurant/:id/menu',
  RESTAURANT_REVIEWS: '/restaurant/:id/reviews',
  
  // Cart & Checkout Routes
  CART: '/cart',
  CHECKOUT: '/checkout',
  PAYMENT: '/payment',
  PAYMENT_SUCCESS: '/payment/success',
  PAYMENT_FAILED: '/payment/failed',
  
  // Booking Routes
  TABLE_BOOKING: '/table-booking',
  BOOKING_HISTORY: '/booking-history',
  BOOKING_DETAILS: '/booking/:id',
  
  // Order Routes
  ORDERS: '/orders',
  ORDER_DETAILS: '/order/:id',
  ORDER_TRACKING: '/tracking/:orderId',
  ORDER_CONFIRMATION: '/order-confirmation/:orderId',
  ORDER_HISTORY: '/order-history',
  
  // Profile Routes
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_ADDRESSES: '/profile/addresses',
  PROFILE_PAYMENT_METHODS: '/profile/payment-methods',
  
  // Customer Dashboard
  CUSTOMER_DASHBOARD: '/customer/dashboard',
  CUSTOMER_ORDERS: '/customer/orders',
  CUSTOMER_WISHLIST: '/customer/wishlist',
  CUSTOMER_FAVORITES: '/customer/favorites',
  
  // Restaurant Owner Dashboard
  RESTAURANT_OWNER_DASHBOARD: '/restaurant-owner/dashboard',
  RESTAURANT_OWNER_MENU: '/restaurant-owner/menu',
  RESTAURANT_OWNER_ORDERS: '/restaurant-owner/orders',
  RESTAURANT_OWNER_RESERVATIONS: '/restaurant-owner/reservations',
  RESTAURANT_OWNER_ANALYTICS: '/restaurant-owner/analytics',
  RESTAURANT_OWNER_SETTINGS: '/restaurant-owner/settings',
  RESTAURANT_OWNER_REVIEWS: '/restaurant-owner/reviews',
  
  // Delivery Partner Dashboard
  DELIVERY_DASHBOARD: '/delivery/dashboard',
  DELIVERY_ORDERS: '/delivery/orders',
  DELIVERY_EARNINGS: '/delivery/earnings',
  DELIVERY_LIVE: '/delivery/live',
  DELIVERY_HISTORY: '/delivery/history',
  DELIVERY_PROFILE: '/delivery/profile',
  
  // Admin Routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_RESTAURANTS: '/admin/restaurants',
  ADMIN_DELIVERY_PARTNERS: '/admin/delivery-partners',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_NOTIFICATIONS: '/admin/notifications',
  ADMIN_LOGS: '/admin/logs',
  
  // Not Found
  NOT_FOUND: '/404',
};

// ============================================
// STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  TOKEN: 'food_delivery_token',
  REFRESH_TOKEN: 'food_delivery_refresh_token',
  USER: 'food_delivery_user',
  USER_ROLE: 'food_delivery_user_role',
  THEME: 'food_delivery_theme',
  CART: 'food_delivery_cart',
  CART_ITEMS: 'food_delivery_cart_items',
  REMEMBER_ME: 'food_delivery_remember',
  REMEMBERED_EMAIL: 'food_delivery_remembered_email',
  SESSION_ID: 'food_delivery_session_id',
  DEVICE_ID: 'food_delivery_device_id',
  LAST_ACTIVITY: 'food_delivery_last_activity',
  PENDING_ORDER: 'food_delivery_pending_order',
  ORDER_GRAND_TOTAL: 'food_delivery_order_grand_total',
  NOTIFICATIONS: 'food_delivery_notifications',
  PUSH_NOTIFICATION_TOKEN: 'food_delivery_push_token',
  LANGUAGE: 'food_delivery_language',
  LOCATION: 'food_delivery_location',
};

// ============================================
// ORDER STATUS
// ============================================

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  ON_THE_WAY: 'on_the_way',
  NEAR_YOUR_LOCATION: 'near_your_location',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
  REFUNDED: 'refunded',
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Order Placed',
  [ORDER_STATUS.CONFIRMED]: 'Restaurant Accepted',
  [ORDER_STATUS.PREPARING]: 'Preparing Food',
  [ORDER_STATUS.READY]: 'Food Ready',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ORDER_STATUS.ON_THE_WAY]: 'On The Way',
  [ORDER_STATUS.NEAR_YOUR_LOCATION]: 'Near Your Location',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.RETURNED]: 'Returned',
  [ORDER_STATUS.REFUNDED]: 'Refunded',
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'warning',
  [ORDER_STATUS.CONFIRMED]: 'info',
  [ORDER_STATUS.PREPARING]: 'info',
  [ORDER_STATUS.READY]: 'info',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'primary',
  [ORDER_STATUS.ON_THE_WAY]: 'primary',
  [ORDER_STATUS.NEAR_YOUR_LOCATION]: 'primary',
  [ORDER_STATUS.DELIVERED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'danger',
  [ORDER_STATUS.RETURNED]: 'danger',
  [ORDER_STATUS.REFUNDED]: 'secondary',
};

export const ORDER_STATUS_ICONS = {
  [ORDER_STATUS.PENDING]: '🕐',
  [ORDER_STATUS.CONFIRMED]: '✅',
  [ORDER_STATUS.PREPARING]: '🍳',
  [ORDER_STATUS.READY]: '🍽️',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: '🚚',
  [ORDER_STATUS.ON_THE_WAY]: '🛵',
  [ORDER_STATUS.NEAR_YOUR_LOCATION]: '📍',
  [ORDER_STATUS.DELIVERED]: '🎉',
  [ORDER_STATUS.CANCELLED]: '❌',
  [ORDER_STATUS.RETURNED]: '↩️',
  [ORDER_STATUS.REFUNDED]: '💰',
};

// ============================================
// USER ROLES
// ============================================

export const USER_ROLES = {
  CUSTOMER: 'customer',
  RESTAURANT_OWNER: 'restaurant_owner',
  DELIVERY_PARTNER: 'delivery_partner',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.CUSTOMER]: 'Customer',
  [USER_ROLES.RESTAURANT_OWNER]: 'Restaurant Owner',
  [USER_ROLES.DELIVERY_PARTNER]: 'Delivery Partner',
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
};

// ============================================
// PAYMENT METHODS
// ============================================

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  UPI: 'upi',
  WALLET: 'wallet',
  NET_BANKING: 'net_banking',
  COD: 'cod',
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CASH]: 'Cash',
  [PAYMENT_METHODS.CARD]: 'Credit/Debit Card',
  [PAYMENT_METHODS.UPI]: 'UPI',
  [PAYMENT_METHODS.WALLET]: 'Wallet',
  [PAYMENT_METHODS.NET_BANKING]: 'Net Banking',
  [PAYMENT_METHODS.COD]: 'Cash on Delivery',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// ============================================
// DELIVERY OPTIONS
// ============================================

export const DELIVERY_OPTIONS = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SCHEDULED: 'scheduled',
};

export const DELIVERY_OPTION_LABELS = {
  [DELIVERY_OPTIONS.STANDARD]: 'Standard Delivery',
  [DELIVERY_OPTIONS.EXPRESS]: 'Express Delivery',
  [DELIVERY_OPTIONS.SCHEDULED]: 'Schedule Delivery',
};

// ============================================
// NOTIFICATION TYPES
// ============================================

export const NOTIFICATION_TYPES = {
  ORDER: 'order',
  PAYMENT: 'payment',
  DELIVERY: 'delivery',
  PROMOTIONAL: 'promotional',
  SYSTEM: 'system',
  REVIEW: 'review',
  BOOKING: 'booking',
};

export const NOTIFICATION_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

// ============================================
// PAGINATION
// ============================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [5, 10, 20, 50, 100],
  MAX_LIMIT: 100,
};

// ============================================
// SORTING
// ============================================

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
};

export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  PRICE_LOW: 'price_low',
  PRICE_HIGH: 'price_high',
  RATING: 'rating',
  POPULARITY: 'popularity',
  DELIVERY_TIME: 'delivery_time',
};

// ============================================
// THEME
// ============================================

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// ============================================
// LANGUAGE
// ============================================

export const LANGUAGES = {
  EN: 'en',
  HI: 'hi',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  ZH: 'zh',
};

export const LANGUAGE_LABELS = {
  [LANGUAGES.EN]: 'English',
  [LANGUAGES.HI]: 'हिन्दी',
  [LANGUAGES.ES]: 'Español',
  [LANGUAGES.FR]: 'Français',
  [LANGUAGES.DE]: 'Deutsch',
  [LANGUAGES.ZH]: '中文',
};

// ============================================
// CURRENCY
// ============================================

export const CURRENCY = {
  CODE: 'USD',
  SYMBOL: '$',
  LOCALE: 'en-US',
};

// ============================================
// DATE FORMATS
// ============================================

export const DATE_FORMATS = {
  FULL: 'MMMM D, YYYY',
  SHORT: 'MMM D, YYYY',
  TIME: 'h:mm A',
  DATE_TIME: 'MMMM D, YYYY h:mm A',
  DATE_TIME_SHORT: 'MMM D, YYYY h:mm A',
  ISO: 'YYYY-MM-DDTHH:mm:ssZ',
};

// ============================================
// AUTH CONSTANTS
// ============================================

export const AUTH = {
  TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  REFRESH_TOKEN_EXPIRY: 30 * 24 * 60 * 60 * 1000, // 30 days
  OTP_EXPIRY: 5 * 60 * 1000, // 5 minutes
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 30 * 60 * 1000, // 30 minutes
};

// ============================================
// FILE UPLOAD CONSTANTS
// ============================================

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  MAX_FILES: 10,
};

// ============================================
// BOOKING CONSTANTS
// ============================================

export const BOOKING = {
  STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CHECKED_IN: 'checked_in',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    NO_SHOW: 'no_show',
  },
  MAX_GUESTS: 20,
  MIN_GUESTS: 1,
};

// ============================================
// MAP CONSTANTS
// ============================================

export const MAP = {
  DEFAULT_LAT: 28.6139,
  DEFAULT_LNG: 77.2090,
  DEFAULT_ZOOM: 12,
  MAX_ZOOM: 18,
  MIN_ZOOM: 3,
};

// ============================================
// RATING CONSTANTS
// ============================================

export const RATING = {
  MAX: 5,
  MIN: 1,
  DEFAULT: 0,
};

// ============================================
// REGEX PATTERNS
// ============================================

export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^[0-9]{10}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PINCODE: /^[0-9]{5,6}$/,
  CARD_NUMBER: /^[0-9]{16}$/,
  CARD_CVV: /^[0-9]{3,4}$/,
  CARD_EXPIRY: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
  UPI_ID: /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/,
  WALLET_PIN: /^[0-9]{4}$/,
};

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please login to continue.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  VALIDATION: 'Please check your input and try again.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, number and special character.',
  INVALID_PINCODE: 'Please enter a valid pincode.',
  INVALID_CARD: 'Please enter a valid card number.',
  INVALID_CVV: 'Please enter a valid CVV.',
  INVALID_EXPIRY: 'Please enter a valid expiry date (MM/YY).',
  INVALID_UPI: 'Please enter a valid UPI ID (e.g., name@upi).',
  INVALID_WALLET_PIN: 'Please enter a valid 4-digit PIN.',
  CART_EMPTY: 'Your cart is empty.',
  ORDER_FAILED: 'Failed to place order. Please try again.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
};

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  LOGIN: 'Welcome back!',
  REGISTER: 'Account created successfully!',
  LOGOUT: 'Logged out successfully.',
  ORDER_PLACED: 'Order placed successfully!',
  PAYMENT_SUCCESS: 'Payment successful!',
  PROFILE_UPDATED: 'Profile updated successfully.',
  ADDRESS_ADDED: 'Address added successfully.',
  ADDRESS_UPDATED: 'Address updated successfully.',
  ADDRESS_DELETED: 'Address deleted successfully.',
  REVIEW_ADDED: 'Review added successfully.',
  FAVORITE_ADDED: 'Added to favorites.',
  FAVORITE_REMOVED: 'Removed from favorites.',
  COUPON_APPLIED: 'Coupon applied successfully!',
};

// ============================================
// EXPORT ALL CONSTANTS
// ============================================

const constants = {
  API_URL,
  WS_URL,
  SOCKET_URL,
  ROUTES,
  STORAGE_KEYS,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_ICONS,
  USER_ROLES,
  USER_ROLE_LABELS,
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS,
  DELIVERY_OPTIONS,
  DELIVERY_OPTION_LABELS,
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITY,
  PAGINATION,
  SORT_ORDERS,
  SORT_OPTIONS,
  THEMES,
  LANGUAGES,
  LANGUAGE_LABELS,
  CURRENCY,
  DATE_FORMATS,
  AUTH,
  FILE_UPLOAD,
  BOOKING,
  MAP,
  RATING,
  REGEX,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};

export default constants;