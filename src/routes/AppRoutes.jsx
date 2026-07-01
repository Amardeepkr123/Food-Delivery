import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import VerifyOtp from '../pages/auth/VerifyOtp';

// Home Page
import Home from '../pages/home/Home';

// Restaurant Pages
import Restaurants from '../pages/restaurant/Restaurants';
import RestaurantDetails from '../pages/restaurant/RestaurantDetails';
import SearchResults from '../pages/restaurant/SearchResults';

// Cart & Checkout
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';

// Booking
import TableBooking from '../pages/booking/TableBooking';
import BookingHistory from '../pages/booking/BookingHistory';

// Tracking
import LiveTracking from '../pages/tracking/LiveTracking';

// Profile
import Profile from '../pages/profile/Profile';

// Customer Dashboard
import CustomerDashboard from '../pages/customer/CustomerDashboard';

// Restaurant Owner Pages - Split splat routes
import RestaurantOwnerDashboard from '../pages/restaurantOwner/Dashboard';
import MenuManagement from '../pages/restaurantOwner/MenuManagement';
import RestaurantOrders from '../pages/restaurantOwner/Orders';
import Reservations from '../pages/restaurantOwner/Reservations';
import RestaurantAnalytics from '../pages/restaurantOwner/Analytics';

// Delivery Partner Pages
import DeliveryPartnerDashboard from '../pages/deliveryPartner/Dashboard';
import AvailableOrders from '../pages/deliveryPartner/AvailableOrders';
import Earnings from '../pages/deliveryPartner/Earnings';
import LiveDelivery from '../pages/deliveryPartner/LiveDelivery';

// Admin Pages - Split splat routes
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminRestaurants from '../pages/admin/Restaurants';
import AdminDeliveryPartners from '../pages/admin/DeliveryPartners';
import AdminOrders from '../pages/admin/Orders';
import AdminAnalytics from '../pages/admin/Analytics';

// Error Pages
import NotFound from '../pages/error/NotFound';
import ServerError from '../pages/error/ServerError';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/table-booking" element={<TableBooking />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/tracking/:orderId" element={<LiveTracking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />

        {/* Restaurant Owner Routes - No splat routes needed */}
        <Route path="/restaurant-owner/dashboard" element={<RestaurantOwnerDashboard />} />
        <Route path="/restaurant-owner/menu" element={<MenuManagement />} />
        <Route path="/restaurant-owner/orders" element={<RestaurantOrders />} />
        <Route path="/restaurant-owner/reservations" element={<Reservations />} />
        <Route path="/restaurant-owner/analytics" element={<RestaurantAnalytics />} />

        {/* Delivery Partner Routes */}
        <Route path="/delivery/dashboard" element={<DeliveryPartnerDashboard />} />
        <Route path="/delivery/orders" element={<AvailableOrders />} />
        <Route path="/delivery/earnings" element={<Earnings />} />
        <Route path="/delivery/live" element={<LiveDelivery />} />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/restaurants" element={<AdminRestaurants />} />
          <Route path="/admin/delivery-partners" element={<AdminDeliveryPartners />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
        </Route>
      </Route>

      {/* Error Routes */}
      <Route path="/404" element={<NotFound />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;