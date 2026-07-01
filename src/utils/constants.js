export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_OTP: '/verify-otp',
  RESTAURANTS: '/restaurants',
  RESTAURANT_DETAILS: '/restaurant/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  TABLE_BOOKING: '/table-booking',
  BOOKING_HISTORY: '/booking-history',
  TRACKING: '/tracking/:orderId',
  PROFILE: '/profile',
  CUSTOMER_DASHBOARD: '/customer/dashboard',
  RESTAURANT_OWNER_DASHBOARD: '/restaurant-owner/dashboard',
  RESTAURANT_OWNER_MENU: '/restaurant-owner/menu',
  RESTAURANT_OWNER_ORDERS: '/restaurant-owner/orders',
  RESTAURANT_OWNER_RESERVATIONS: '/restaurant-owner/reservations',
  RESTAURANT_OWNER_ANALYTICS: '/restaurant-owner/analytics',
  DELIVERY_DASHBOARD: '/delivery/dashboard',
  DELIVERY_ORDERS: '/delivery/orders',
  DELIVERY_EARNINGS: '/delivery/earnings',
  DELIVERY_LIVE: '/delivery/live',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_RESTAURANTS: '/admin/restaurants',
  ADMIN_DELIVERY_PARTNERS: '/admin/delivery-partners',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ANALYTICS: '/admin/analytics',
};

export const STORAGE_KEYS = {
  TOKEN: 'food_delivery_token',
  USER: 'food_delivery_user',
  THEME: 'food_delivery_theme',
  CART: 'food_delivery_cart',
  REMEMBER_ME: 'food_delivery_remember',
  REMEMBERED_EMAIL: 'food_delivery_remembered_email',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  RESTAURANT_OWNER: 'restaurant_owner',
  DELIVERY_PARTNER: 'delivery_partner',
  ADMIN: 'admin',
};