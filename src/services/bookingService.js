// src/services/bookingService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const bookingService = {
  // ============================================
  // BOOKING CRUD OPERATIONS
  // ============================================

  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(`${API_URL}/bookings`, bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get all bookings for current user
  getUserBookings: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/user`, {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  },

  // Get booking by ID
  getBooking: async (bookingId) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  // Update booking
  updateBooking: async (bookingId, bookingData) => {
    try {
      const response = await axios.put(`${API_URL}/bookings/${bookingId}`, bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId, reason = '') => {
    try {
      const response = await axios.patch(
        `${API_URL}/bookings/${bookingId}/cancel`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  },

  // Delete booking (soft delete)
  deleteBooking: async (bookingId) => {
    try {
      const response = await axios.delete(`${API_URL}/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  },

  // ============================================
  // BOOKING STATUS MANAGEMENT
  // ============================================

  // Update booking status
  updateBookingStatus: async (bookingId, status, notes = '') => {
    try {
      const response = await axios.patch(
        `${API_URL}/bookings/${bookingId}/status`,
        { status, notes },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },

  // Get booking status history
  getBookingStatusHistory: async (bookingId) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/${bookingId}/status-history`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking status history:', error);
      throw error;
    }
  },

  // ============================================
  // BOOKING TYPES & CATEGORIES
  // ============================================

  // Get all booking types
  getBookingTypes: async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings/types`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking types:', error);
      throw error;
    }
  },

  // Get booking categories
  getBookingCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking categories:', error);
      throw error;
    }
  },

  // ============================================
  // BOOKING AVAILABILITY & SCHEDULING
  // ============================================

  // Check availability
  checkAvailability: async (bookingData) => {
    try {
      const response = await axios.post(`${API_URL}/bookings/check-availability`, bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  },

  // Get available time slots
  getAvailableSlots: async (date, category = '') => {
    try {
      const response = await axios.get(`${API_URL}/bookings/available-slots`, {
        params: { date, category },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching available slots:', error);
      throw error;
    }
  },

  // Reserve a time slot
  reserveSlot: async (slotData) => {
    try {
      const response = await axios.post(`${API_URL}/bookings/reserve-slot`, slotData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error reserving slot:', error);
      throw error;
    }
  },

  // Release a reserved slot
  releaseSlot: async (slotId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/bookings/release-slot/${slotId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error releasing slot:', error);
      throw error;
    }
  },

  // ============================================
  // BOOKING PAYMENTS
  // ============================================

  // Make payment for booking
  payForBooking: async (bookingId, paymentData) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookings/${bookingId}/pay`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error processing booking payment:', error);
      throw error;
    }
  },

  // Get booking invoice
  getBookingInvoice: async (bookingId) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/${bookingId}/invoice`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking invoice:', error);
      throw error;
    }
  },

  // ============================================
  // BOOKING CALENDAR
  // ============================================

  // Get calendar events
  getCalendarEvents: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/calendar`, {
        params: { startDate, endDate },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  },

  // ============================================
  // BOOKING REMINDERS & NOTIFICATIONS
  // ============================================

  // Set booking reminder
  setReminder: async (bookingId, reminderData) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookings/${bookingId}/reminder`,
        reminderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error setting reminder:', error);
      throw error;
    }
  },

  // Get booking reminders
  getReminders: async (bookingId) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/${bookingId}/reminders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching reminders:', error);
      throw error;
    }
  },

  // Delete reminder
  deleteReminder: async (reminderId) => {
    try {
      const response = await axios.delete(`${API_URL}/bookings/reminders/${reminderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting reminder:', error);
      throw error;
    }
  },

  // ============================================
  // BOOKING REVIEWS & RATINGS
  // ============================================

  // Add review for booking
  addReview: async (bookingId, reviewData) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookings/${bookingId}/review`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },

  // Get booking reviews
  getReviews: async (bookingId) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/${bookingId}/reviews`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  // ============================================
  // ADMIN BOOKING MANAGEMENT
  // ============================================

  // Get all bookings (admin only)
  getAllBookings: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/admin/bookings`, {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all bookings:', error);
      throw error;
    }
  },

  // Get booking statistics (admin only)
  getBookingStats: async (period = 'month') => {
    try {
      const response = await axios.get(`${API_URL}/admin/bookings/stats`, {
        params: { period },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking stats:', error);
      throw error;
    }
  },

  // Get booking analytics (admin only)
  getBookingAnalytics: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/admin/bookings/analytics`, {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking analytics:', error);
      throw error;
    }
  },

  // ============================================
  // BULK BOOKING OPERATIONS
  // ============================================

  // Create bulk bookings
  createBulkBookings: async (bookingsData) => {
    try {
      const response = await axios.post(`${API_URL}/bookings/bulk`, bookingsData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating bulk bookings:', error);
      throw error;
    }
  },

  // Update bulk bookings status
  updateBulkStatus: async (bookingIds, status) => {
    try {
      const response = await axios.patch(
        `${API_URL}/bookings/bulk/status`,
        { bookingIds, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating bulk bookings status:', error);
      throw error;
    }
  },

  // ============================================
  // BOOKING EXPORTS
  // ============================================

  // Export bookings to CSV
  exportBookingsToCSV: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/export/csv`, {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting bookings to CSV:', error);
      throw error;
    }
  },

  // Export bookings to PDF
  exportBookingsToPDF: async (bookingIds = []) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookings/export/pdf`,
        { bookingIds },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          responseType: 'blob',
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error exporting bookings to PDF:', error);
      throw error;
    }
  },

  // ============================================
  // SEARCH & FILTER
  // ============================================

  // Search bookings
  searchBookings: async (query, filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/search`, {
        params: { q: query, ...filters },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching bookings:', error);
      throw error;
    }
  },

  // Filter bookings
  filterBookings: async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/filter`, {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error filtering bookings:', error);
      throw error;
    }
  },

  // ============================================
  // NOTIFICATIONS FOR BOOKINGS
  // ============================================

  // Send booking notification
  sendBookingNotification: async (bookingId, type, message) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookings/${bookingId}/notify`,
        { type, message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending booking notification:', error);
      throw error;
    }
  },

  // ============================================
  // BOOKING CONFIRMATION
  // ============================================

  // Confirm booking
  confirmBooking: async (bookingId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/bookings/${bookingId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error confirming booking:', error);
      throw error;
    }
  },

  // Send booking confirmation email
  sendConfirmationEmail: async (bookingId) => {
    try {
      const response = await axios.post(
        `${API_URL}/bookings/${bookingId}/send-confirmation`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw error;
    }
  },

  // ============================================
  // BOOKING HISTORY
  // ============================================

  // Get booking history
  getBookingHistory: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/history/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking history:', error);
      throw error;
    }
  },

  // ============================================
  // UPCOMING BOOKINGS
  // ============================================

  // Get upcoming bookings
  getUpcomingBookings: async (days = 30) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/upcoming`, {
        params: { days },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming bookings:', error);
      throw error;
    }
  },

  // ============================================
  // BOOKING SETTINGS
  // ============================================

  // Get booking settings
  getBookingSettings: async () => {
    try {
      const response = await axios.get(`${API_URL}/bookings/settings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking settings:', error);
      throw error;
    }
  },

  // Update booking settings (admin only)
  updateBookingSettings: async (settingsData) => {
    try {
      const response = await axios.put(`${API_URL}/admin/bookings/settings`, settingsData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating booking settings:', error);
      throw error;
    }
  },
};

export default bookingService;