// src/services/orderService.js
import axios from 'axios';
import { storage } from '../utils/storage';

// ✅ FIX: Use import.meta.env instead of process.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const orderService = {
  // ============================================
  // ORDER CRUD OPERATIONS
  // ============================================

  /**
   * Create new order
   * @param {Object} orderData - Order data
   * @returns {Promise<Object>} Created order
   */
  async createOrder(orderData) {
    try {
      const token = storage.get('token');
      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  /**
   * Get all orders for current user
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Orders list
   */
  async getUserOrders(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/orders/user`, {
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          status: params.status || '',
          sortBy: params.sortBy || 'createdAt',
          sortOrder: params.sortOrder || 'desc',
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  /**
   * Get order by ID
   * @param {string|number} orderId - Order ID
   * @returns {Promise<Object>} Order details
   */
  async getOrder(orderId) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  /**
   * Update order status
   * @param {string|number} orderId - Order ID
   * @param {string} status - New status
   * @param {Object} data - Additional data
   * @returns {Promise<Object>} Updated order
   */
  async updateOrderStatus(orderId, status, data = {}) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      if (!status) throw new Error('Status is required');
      
      const token = storage.get('token');
      const response = await axios.patch(
        `${API_URL}/orders/${orderId}/status`,
        { status, ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  /**
   * Cancel order
   * @param {string|number} orderId - Order ID
   * @param {string} reason - Cancellation reason
   * @returns {Promise<Object>} Cancelled order
   */
  async cancelOrder(orderId, reason = '') {
    try {
      if (!orderId) throw new Error('Order ID is required');
      
      const token = storage.get('token');
      const response = await axios.patch(
        `${API_URL}/orders/${orderId}/cancel`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  },

  // ============================================
  // ORDER TRACKING
  // ============================================

  /**
   * Get order tracking details
   * @param {string|number} orderId - Order ID
   * @returns {Promise<Object>} Tracking details
   */
  async getOrderTracking(orderId) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/orders/${orderId}/tracking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order tracking:', error);
      throw error;
    }
  },

  /**
   * Get order status history
   * @param {string|number} orderId - Order ID
   * @returns {Promise<Object>} Status history
   */
  async getOrderStatusHistory(orderId) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/orders/${orderId}/status-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order status history:', error);
      throw error;
    }
  },

  /**
   * Get order timeline
   * @param {string|number} orderId - Order ID
   * @returns {Promise<Object>} Order timeline
   */
  async getOrderTimeline(orderId) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/orders/${orderId}/timeline`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order timeline:', error);
      throw error;
    }
  },

  // ============================================
  // ORDER REVIEWS & RATINGS
  // ============================================

  /**
   * Rate order
   * @param {string|number} orderId - Order ID
   * @param {Object} data - Rating data
   * @param {number} data.rating - Rating (1-5)
   * @param {string} data.review - Review text
   * @param {string} data.restaurantId - Restaurant ID
   * @returns {Promise<Object>} Rating result
   */
  async rateOrder(orderId, data) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      if (!data.rating) throw new Error('Rating is required');
      
      const token = storage.get('token');
      const response = await axios.post(
        `${API_URL}/orders/${orderId}/rate`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error rating order:', error);
      throw error;
    }
  },

  /**
   * Reorder items from previous order
   * @param {string|number} orderId - Order ID
   * @returns {Promise<Object>} Reorder result
   */
  async reorder(orderId) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      
      const token = storage.get('token');
      const response = await axios.post(
        `${API_URL}/orders/${orderId}/reorder`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error reordering:', error);
      throw error;
    }
  },

  // ============================================
  // ADMIN ORDER OPERATIONS
  // ============================================

  /**
   * Get all orders (admin only)
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} All orders
   */
  async getAllOrders(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/admin/orders`, {
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          status: params.status || '',
          restaurantId: params.restaurantId || '',
          customerId: params.customerId || '',
          startDate: params.startDate || '',
          endDate: params.endDate || '',
          search: params.search || '',
          sortBy: params.sortBy || 'createdAt',
          sortOrder: params.sortOrder || 'desc',
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  },

  /**
   * Get order statistics (admin only)
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Order statistics
   */
  async getOrderStats(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/admin/orders/stats`, {
        params: {
          period: params.period || 'month',
          startDate: params.startDate || '',
          endDate: params.endDate || '',
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order stats:', error);
      throw error;
    }
  },

  /**
   * Get order analytics (admin only)
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Order analytics
   */
  async getOrderAnalytics(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/admin/orders/analytics`, {
        params: {
          period: params.period || 'month',
          startDate: params.startDate || '',
          endDate: params.endDate || '',
          metric: params.metric || 'revenue',
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order analytics:', error);
      throw error;
    }
  },

  /**
   * Update order (admin only)
   * @param {string|number} orderId - Order ID
   * @param {Object} orderData - Updated order data
   * @returns {Promise<Object>} Updated order
   */
  async updateOrder(orderId, orderData) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      
      const token = storage.get('token');
      const response = await axios.put(`${API_URL}/admin/orders/${orderId}`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  /**
   * Delete order (admin only)
   * @param {string|number} orderId - Order ID
   * @returns {Promise<Object>} Delete result
   */
  async deleteOrder(orderId) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      
      const token = storage.get('token');
      const response = await axios.delete(`${API_URL}/admin/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },

  // ============================================
  // DELIVERY PARTNER ORDER OPERATIONS
  // ============================================

  /**
   * Get assigned orders for delivery partner
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Assigned orders
   */
  async getAssignedOrders(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/delivery/orders/assigned`, {
        params: {
          status: params.status || '',
          page: params.page || 1,
          limit: params.limit || 20,
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching assigned orders:', error);
      throw error;
    }
  },

  /**
   * Get available orders for delivery partners
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Available orders
   */
  async getAvailableOrders(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/delivery/orders/available`, {
        params: {
          lat: params.lat || '',
          lng: params.lng || '',
          radius: params.radius || 10,
          page: params.page || 1,
          limit: params.limit || 20,
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching available orders:', error);
      throw error;
    }
  },

  /**
   * Accept delivery order
   * @param {string|number} orderId - Order ID
   * @returns {Promise<Object>} Accept result
   */
  async acceptDeliveryOrder(orderId) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      
      const token = storage.get('token');
      const response = await axios.patch(
        `${API_URL}/delivery/orders/${orderId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error accepting delivery order:', error);
      throw error;
    }
  },

  /**
   * Update delivery status
   * @param {string|number} orderId - Order ID
   * @param {string} status - Delivery status
   * @param {Object} data - Additional data
   * @returns {Promise<Object>} Updated delivery
   */
  async updateDeliveryStatus(orderId, status, data = {}) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      if (!status) throw new Error('Status is required');
      
      const token = storage.get('token');
      const response = await axios.patch(
        `${API_URL}/delivery/orders/${orderId}/status`,
        { status, ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating delivery status:', error);
      throw error;
    }
  },

  /**
   * Update delivery location
   * @param {string|number} orderId - Order ID
   * @param {Object} location - Location data
   * @param {number} location.lat - Latitude
   * @param {number} location.lng - Longitude
   * @returns {Promise<Object>} Updated location
   */
  async updateDeliveryLocation(orderId, location) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      if (!location.lat || !location.lng) {
        throw new Error('Location coordinates are required');
      }
      
      const token = storage.get('token');
      const response = await axios.patch(
        `${API_URL}/delivery/orders/${orderId}/location`,
        location,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating delivery location:', error);
      throw error;
    }
  },

  // ============================================
  // RESTAURANT ORDER OPERATIONS
  // ============================================

  /**
   * Get restaurant orders
   * @param {string|number} restaurantId - Restaurant ID
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Restaurant orders
   */
  async getRestaurantOrders(restaurantId, params = {}) {
    try {
      if (!restaurantId) throw new Error('Restaurant ID is required');
      
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/restaurants/${restaurantId}/orders`, {
        params: {
          status: params.status || '',
          page: params.page || 1,
          limit: params.limit || 20,
          startDate: params.startDate || '',
          endDate: params.endDate || '',
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurant orders:', error);
      throw error;
    }
  },

  /**
   * Update order status for restaurant
   * @param {string|number} orderId - Order ID
   * @param {string} status - New status
   * @param {Object} data - Additional data
   * @returns {Promise<Object>} Updated order
   */
  async updateRestaurantOrderStatus(orderId, status, data = {}) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      if (!status) throw new Error('Status is required');
      
      const token = storage.get('token');
      const response = await axios.patch(
        `${API_URL}/restaurant/orders/${orderId}/status`,
        { status, ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating restaurant order status:', error);
      throw error;
    }
  },

  // ============================================
  // ORDER EXPORTS
  // ============================================

  /**
   * Export orders
   * @param {Object} params - Filter parameters
   * @param {string} params.format - Export format (csv, excel, pdf)
   * @returns {Promise<Blob>} Exported file
   */
  async exportOrders(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/orders/export`, {
        params: {
          format: params.format || 'csv',
          status: params.status || '',
          startDate: params.startDate || '',
          endDate: params.endDate || '',
          restaurantId: params.restaurantId || '',
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting orders:', error);
      throw error;
    }
  },

  // ============================================
  // ORDER NOTIFICATIONS
  // ============================================

  /**
   * Send order notification
   * @param {string|number} orderId - Order ID
   * @param {Object} data - Notification data
   * @param {string} data.type - Notification type
   * @param {string} data.message - Notification message
   * @returns {Promise<Object>} Notification result
   */
  async sendOrderNotification(orderId, data) {
    try {
      if (!orderId) throw new Error('Order ID is required');
      
      const token = storage.get('token');
      const response = await axios.post(
        `${API_URL}/orders/${orderId}/notify`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error sending order notification:', error);
      throw error;
    }
  },
};

// ============================================
// NAMED EXPORTS FOR BACKWARDS COMPATIBILITY
// ============================================

export const createOrder = orderService.createOrder.bind(orderService);
export const getUserOrders = orderService.getUserOrders.bind(orderService);
export const getOrder = orderService.getOrder.bind(orderService);
export const updateOrderStatus = orderService.updateOrderStatus.bind(orderService);
export const cancelOrder = orderService.cancelOrder.bind(orderService);
export const getOrderTracking = orderService.getOrderTracking.bind(orderService);
export const getOrderStatusHistory = orderService.getOrderStatusHistory.bind(orderService);
export const getOrderTimeline = orderService.getOrderTimeline.bind(orderService);
export const rateOrder = orderService.rateOrder.bind(orderService);
export const reorder = orderService.reorder.bind(orderService);
export const getAllOrders = orderService.getAllOrders.bind(orderService);
export const getOrderStats = orderService.getOrderStats.bind(orderService);
export const getOrderAnalytics = orderService.getOrderAnalytics.bind(orderService);
export const updateOrder = orderService.updateOrder.bind(orderService);
export const deleteOrder = orderService.deleteOrder.bind(orderService);
export const getAssignedOrders = orderService.getAssignedOrders.bind(orderService);
export const getAvailableOrders = orderService.getAvailableOrders.bind(orderService);
export const acceptDeliveryOrder = orderService.acceptDeliveryOrder.bind(orderService);
export const updateDeliveryStatus = orderService.updateDeliveryStatus.bind(orderService);
export const updateDeliveryLocation = orderService.updateDeliveryLocation.bind(orderService);
export const getRestaurantOrders = orderService.getRestaurantOrders.bind(orderService);
export const updateRestaurantOrderStatus = orderService.updateRestaurantOrderStatus.bind(orderService);
export const exportOrders = orderService.exportOrders.bind(orderService);
export const sendOrderNotification = orderService.sendOrderNotification.bind(orderService);

export default orderService;