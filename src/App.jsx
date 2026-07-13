// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ============================================
// CONTEXT PROVIDERS
// ============================================
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { PaymentProvider } from './context/PaymentContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
// ✅ SocketProvider is now correctly imported
import { SocketProvider } from './context/SocketContext';
import { PartnersProvider } from './context/PartnersContext';

// ============================================
// ROUTE GUARDS
// ============================================
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// ============================================
// LAYOUTS
// ============================================
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// ============================================
// PUBLIC PAGES - AUTH
// ============================================
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyOtp from './pages/auth/VerifyOtp';

// ============================================
// PUBLIC PAGES - RESTAURANTS
// ============================================
import RestaurantList from './pages/restaurant/RestaurantList';
import Restaurants from './pages/restaurant/Restaurants';
import RestaurantDetails from './pages/restaurant/RestaurantDetails';
import SearchResults from './pages/restaurant/SearchResults';

// ============================================
// CART & CHECKOUT
// ============================================
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';

// ============================================
// PAYMENT PAGES
// ============================================
import Payment from './pages/payment/Payment';
import PaymentSuccess from './pages/payment/PaymentSuccess';
import PaymentFailed from './pages/payment/PaymentFailed';

// ============================================
// ORDER PAGES
// ============================================
import MyOrders from './pages/orders/MyOrders';
import OrderDetails from './pages/orders/OrderDetails';
import OrderTracking from './pages/orders/OrderTracking';
import OrderSuccess from './pages/orders/OrderSuccess';
import ReviewOrder from './pages/orders/ReviewOrder';
import CancelOrder from './pages/orders/CancelOrder';
import Refund from './pages/orders/Refund';
import Invoice from './pages/orders/Invoice';

// ============================================
// ADMIN PAGES
// ============================================
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import AdminRestaurants from './pages/admin/Restaurants';
import AdminUsers from './pages/admin/Users';
import AdminDeliveryPartners from './pages/admin/DeliveryPartners';
import AdminAnalytics from './pages/admin/Analytics';
import AdminBookings from './pages/admin/Bookings';
import AdminPayments from './pages/admin/Payments';
import AdminCoupons from './pages/admin/Coupons';
import AdminNotifications from './pages/admin/Notifications';
import AdminReviews from './pages/admin/Reviews';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';

// ============================================
// PROFILE PAGE
// ============================================
import Profile from './pages/profile/Profile';

// ============================================
// BOOKING PAGES
// ============================================
import TableBooking from './pages/booking/TableBooking';
import BookingHistory from './pages/booking/BookingHistory';
import AvailableTables from './pages/booking/AvailableTables';
import BookingForm from './pages/booking/BookingForm';
import BookingSummary from './pages/booking/BookingSummary';
import GuestSelector from './pages/booking/GuestSelector';
import TimeSlot from './pages/booking/TimeSlot';
import BookingStepper from './pages/booking/BookingStepper';

// ============================================
// CUSTOMER DASHBOARD
// ============================================
import CustomerDashboard from './pages/customer/CustomerDashboard';

// ============================================
// DELIVERY PARTNER PAGES
// ============================================
import DeliveryPartnerDashboard from './pages/deliveryPartner/Dashboard';
import AvailableOrders from './pages/deliveryPartner/AvailableOrders';
import AcceptedOrders from './pages/deliveryPartner/AcceptedOrders';
import LiveDelivery from './pages/deliveryPartner/LiveDelivery';
import DeliveryDetails from './pages/deliveryPartner/DeliveryDetails';
import DeliveryHistory from './pages/deliveryPartner/DeliveryHistory';
import Earnings from './pages/deliveryPartner/Earnings';
import DeliveryPartnerProfile from './pages/deliveryPartner/Profile';

// ============================================
// RESTAURANT OWNER PAGES
// ============================================
import RestaurantOwnerDashboard from './pages/restaurantOwner/Dashboard';
import MenuManagement from './pages/restaurantOwner/MenuManagement';
import RestaurantOwnerOrders from './pages/restaurantOwner/Orders';
import Reservations from './pages/restaurantOwner/Reservations';
import RestaurantOwnerAnalytics from './pages/restaurantOwner/Analytics';

// ============================================
// TRACKING PAGES
// ============================================
import LiveTracking from './pages/tracking/LiveTracking';

// ============================================
// ERROR PAGES
// ============================================
import NotFound from './pages/error/NotFound';
import ServerError from './pages/error/ServerError';
import Unauthorized from './pages/error/Unauthorized';

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <PaymentProvider>
                <NotificationProvider>
                  <PartnersProvider>
                    {/* ✅ SocketProvider is now properly imported */}
                    <SocketProvider>
                      <Routes>
                        {/* PUBLIC ROUTES */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/verify-otp" element={<VerifyOtp />} />
                        
                        {/* RESTAURANT ROUTES */}
                        <Route path="/restaurants" element={<RestaurantList />} />
                        <Route path="/restaurants/search" element={<SearchResults />} />
                        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                        
                        {/* PROTECTED ROUTES */}
                        <Route element={<ProtectedRoute />}>
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                          
                          <Route path="/payment" element={<Payment />} />
                          <Route path="/payment/success" element={<PaymentSuccess />} />
                          <Route path="/payment/failed" element={<PaymentFailed />} />
                          
                          <Route path="/my-orders" element={<MyOrders />} />
                          <Route path="/orders" element={<MyOrders />} />
                          <Route path="/order/:id" element={<OrderDetails />} />
                          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
                          
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/profile/edit" element={<Profile />} />
                          
                          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                          
                          <Route path="/table-booking" element={<TableBooking />} />
                          <Route path="/booking-history" element={<BookingHistory />} />
                          
                          <Route path="/tracking/:orderId" element={<LiveTracking />} />
                          
                          <Route path="/delivery/dashboard" element={<DeliveryPartnerDashboard />} />
                          <Route path="/delivery/available" element={<AvailableOrders />} />
                          <Route path="/delivery/accepted" element={<AcceptedOrders />} />
                          <Route path="/delivery/live" element={<LiveDelivery />} />
                          <Route path="/delivery/earnings" element={<Earnings />} />
                        </Route>
                        
                        {/* ADMIN ROUTES */}
                        <Route element={<AdminRoute />}>
                          <Route path="/admin" element={<AdminDashboard />} />
                          <Route path="/admin/dashboard" element={<AdminDashboard />} />
                          <Route path="/admin/orders" element={<AdminOrders />} />
                          <Route path="/admin/restaurants" element={<AdminRestaurants />} />
                          <Route path="/admin/users" element={<AdminUsers />} />
                          <Route path="/admin/delivery-partners" element={<AdminDeliveryPartners />} />
                          <Route path="/admin/analytics" element={<AdminAnalytics />} />
                          <Route path="/admin/bookings" element={<AdminBookings />} />
                          <Route path="/admin/payments" element={<AdminPayments />} />
                          <Route path="/admin/coupons" element={<AdminCoupons />} />
                          <Route path="/admin/notifications" element={<AdminNotifications />} />
                          <Route path="/admin/reviews" element={<AdminReviews />} />
                          <Route path="/admin/reports" element={<AdminReports />} />
                          <Route path="/admin/settings" element={<AdminSettings />} />
                          
                          <Route path="/restaurant-owner/dashboard" element={<RestaurantOwnerDashboard />} />
                          <Route path="/restaurant-owner/menu" element={<MenuManagement />} />
                          <Route path="/restaurant-owner/orders" element={<RestaurantOwnerOrders />} />
                        </Route>
                        
                        {/* ERROR ROUTES */}
                        <Route path="/404" element={<NotFound />} />
                        <Route path="/500" element={<ServerError />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        
                        <Route path="*" element={<Navigate to="/404" replace />} />
                      </Routes>
                    </SocketProvider>
                  </PartnersProvider>
                </NotificationProvider>
              </PaymentProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;