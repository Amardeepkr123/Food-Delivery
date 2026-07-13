// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// ============================================
// AUTH PAGES
// ============================================
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import VerifyOtp from '../pages/auth/VerifyOtp';

// ============================================
// HOME PAGE
// ============================================
import Home from '../pages/home/Home';

// ============================================
// RESTAURANT PAGES
// ============================================
import Restaurants from '../pages/restaurant/Restaurants';
import RestaurantDetails from '../pages/restaurant/RestaurantDetails';
import SearchResults from '../pages/restaurant/SearchResults';

// ============================================
// CART & CHECKOUT
// ============================================
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';

// ============================================
// BOOKING PAGES
// ============================================
import TableBooking from '../pages/booking/TableBooking';
import BookingHistory from '../pages/booking/BookingHistory';
import AvailableTables from '../pages/booking/AvailableTables';
import BookingSummary from '../pages/booking/BookingSummary';
import BookingStepper from '../pages/booking/BookingStepper';
import GuestSelector from '../pages/booking/GuestSelector';
import BookingForm from '../pages/booking/BookingForm';
import TimeSlot from '../pages/booking/TimeSlot';

// ============================================
// TRACKING
// ============================================
import LiveTracking from '../pages/tracking/LiveTracking';
import OrderTracking from '../pages/orders/OrderTracking';

// ============================================
// PROFILE
// ============================================
import Profile from '../pages/profile/Profile';

// ============================================
// CUSTOMER DASHBOARD
// ============================================
import CustomerDashboard from '../pages/customer/CustomerDashboard';

// ============================================
// RESTAURANT OWNER PAGES
// ============================================
import RestaurantOwnerDashboard from '../pages/restaurantOwner/Dashboard';
import MenuManagement from '../pages/restaurantOwner/MenuManagement';
import RestaurantOrders from '../pages/restaurantOwner/Orders';
import Reservations from '../pages/restaurantOwner/Reservations';
import RestaurantAnalytics from '../pages/restaurantOwner/Analytics';

// ============================================
// DELIVERY PARTNER PAGES
// ============================================
import DeliveryPartnerDashboard from '../pages/deliveryPartner/Dashboard';
import AvailableOrders from '../pages/deliveryPartner/AvailableOrders';
import Earnings from '../pages/deliveryPartner/Earnings';
import LiveDelivery from '../pages/deliveryPartner/LiveDelivery';

// ============================================
// ADMIN PAGES
// ============================================
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminRestaurants from '../pages/admin/Restaurants';
import AdminDeliveryPartners from '../pages/admin/DeliveryPartners';
import AdminOrders from '../pages/admin/Orders';
import AdminAnalytics from '../pages/admin/Analytics';


// ============================================
// ORDER PAGES
// ============================================
import MyOrders from '../pages/orders/MyOrders';
import OrderDetails from '../pages/orders/OrderDetails';
// OrderTracking already imported above
import OrderSuccess from '../pages/orders/OrderSuccess';
import CancelOrder from '../pages/orders/CancelOrder';
import Refund from '../pages/orders/Refund';
import ReviewOrder from '../pages/orders/ReviewOrder';
import Invoice from '../pages/orders/Invoice';

// ============================================
// PAYMENT PAGES - ✅ FIXED: Proper imports
// ============================================
import Payment from '../pages/payment/Payment';
import PaymentSuccess from '../pages/payment/PaymentSuccess';
import PaymentFailed from '../pages/payment/PaymentFailed';

// ============================================
// ERROR PAGES
// ============================================
import NotFound from '../pages/error/NotFound';
import ServerError from '../pages/error/ServerError';
import Unauthorized from '../pages/error/Unauthorized';

// ============================================
// APP ROUTES
// ============================================
const AppRoutes = () => {
  return (
    <Routes>
      {/* ==========================================
          PUBLIC ROUTES
          ========================================== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ==========================================
          PROTECTED ROUTES
          ========================================== */}
      <Route element={<PrivateRoute />}>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Restaurant Routes */}
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/search" element={<SearchResults />} />

        {/* Cart & Checkout */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Booking Routes */}
        <Route path="/table-booking" element={<TableBooking />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
        <Route path="/booking-stepper" element={<BookingStepper />} />
        <Route path="/available-table" element={<AvailableTables />} />
        <Route path="/guest-selector" element={<GuestSelector />} />
        <Route path="/time-slot" element={<TimeSlot />} />

        {/* Tracking Routes */}
        <Route path="/tracking/:orderId" element={<LiveTracking />} />
        <Route path="/tracking/:id" element={<OrderTracking />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />

        {/* ==========================================
            ORDER ROUTES
            ========================================== */}
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders/cancel/:id" element={<CancelOrder />} />
        <Route path="/orders/refund/:id" element={<Refund />} />
        <Route path="/orders/review/:id" element={<ReviewOrder />} />
        <Route path="/invoice/:id" element={<Invoice />} />

        {/* ==========================================
            PAYMENT ROUTES - ✅ FIXED: Proper JSX syntax
            ========================================== */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failed" element={<PaymentFailed />} />

        {/* ==========================================
            RESTAURANT OWNER ROUTES
            ========================================== */}
        <Route path="/restaurant-owner" element={<Navigate to="/restaurant-owner/dashboard" replace />} />
        <Route path="/restaurant-owner/dashboard" element={<RestaurantOwnerDashboard />} />
        <Route path="/restaurant-owner/menu" element={<MenuManagement />} />
        <Route path="/restaurant-owner/orders" element={<RestaurantOrders />} />
        <Route path="/restaurant-owner/reservations" element={<Reservations />} />
        <Route path="/restaurant-owner/analytics" element={<RestaurantAnalytics />} />

        {/* ==========================================
            DELIVERY PARTNER ROUTES
            ========================================== */}
        <Route path="/delivery" element={<Navigate to="/delivery/dashboard" replace />} />
        <Route path="/delivery/dashboard" element={<DeliveryPartnerDashboard />} />
        <Route path="/delivery/orders" element={<AvailableOrders />} />
        <Route path="/delivery/earnings" element={<Earnings />} />
        <Route path="/delivery/live" element={<LiveDelivery />} />
        <Route path="/delivery/live/:orderId" element={<LiveDelivery />} />

        {/* ==========================================
            ADMIN ROUTES
            ========================================== */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/restaurants" element={<AdminRestaurants />} />
          <Route path="/admin/delivery-partners" element={<AdminDeliveryPartners />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          
        </Route>
      </Route>

      {/* ==========================================
          ERROR ROUTES
          ========================================== */}
      <Route path="/404" element={<NotFound />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;