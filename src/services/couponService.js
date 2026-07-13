// src/services/couponService.js
import api from './api';
import { storage } from '../utils/storage';

/**
 * Coupon Service - Handles all coupon-related API operations
 * Includes: CRUD operations, validation, redemption, and analytics
 */
export const couponService = {
  // ============================================
  // COUPON CRUD OPERATIONS
  // ============================================

  /**
   * Get all coupons with filters
   * @param {Object} params - Filter parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {string} params.search - Search query
   * @param {string} params.status - Filter by status (active, inactive, expired)
   * @param {string} params.type - Filter by type (percentage, fixed, free_delivery)
   * @param {string} params.sortBy - Sort field
   * @param {string} params.sortOrder - Sort order (asc, desc)
   * @returns {Promise<Object>} Coupons list with pagination
   */
  async getAllCoupons(params = {}) {
    try {
      const response = await api.get('/coupons', {
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          search: params.search || '',
          status: params.status || '',
          type: params.type || '',
          sortBy: params.sortBy || 'createdAt',
          sortOrder: params.sortOrder || 'desc',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching coupons:', error);
      throw error;
    }
  },

  /**
   * Get coupon by ID
   * @param {string|number} id - Coupon ID
   * @returns {Promise<Object>} Coupon details
   */
  async getCouponById(id) {
    try {
      if (!id) throw new Error('Coupon ID is required');
      const response = await api.get(`/coupons/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon:', error);
      throw error;
    }
  },

  /**
   * Get coupon by code
   * @param {string} code - Coupon code
   * @returns {Promise<Object>} Coupon details
   */
  async getCouponByCode(code) {
    try {
      if (!code) throw new Error('Coupon code is required');
      const response = await api.get(`/coupons/code/${code.toUpperCase()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon by code:', error);
      throw error;
    }
  },

  /**
   * Create new coupon
   * @param {Object} couponData - Coupon data
   * @param {string} couponData.code - Coupon code
   * @param {string} couponData.name - Coupon name
   * @param {string} couponData.description - Coupon description
   * @param {string} couponData.type - percentage, fixed, free_delivery
   * @param {number} couponData.value - Discount value
   * @param {number} couponData.maxDiscount - Maximum discount (for percentage type)
   * @param {number} couponData.minOrder - Minimum order amount
   * @param {string} couponData.startDate - Start date
   * @param {string} couponData.endDate - End date
   * @param {number} couponData.usageLimit - Usage limit
   * @param {string} couponData.applicableTo - all, new_users, category, restaurant, specific_users
   * @param {Array} couponData.categories - Applicable categories
   * @param {Array} couponData.restaurants - Applicable restaurants
   * @param {boolean} couponData.isStackable - Can be combined with other offers
   * @param {boolean} couponData.freeDelivery - Free delivery flag
   * @returns {Promise<Object>} Created coupon
   */
  async createCoupon(couponData) {
    try {
      // Validate required fields
      if (!couponData.code) throw new Error('Coupon code is required');
      if (!couponData.name) throw new Error('Coupon name is required');
      if (!couponData.type) throw new Error('Coupon type is required');
      if (couponData.value === undefined || couponData.value === null) {
        throw new Error('Coupon value is required');
      }
      
      // Format data
      const data = {
        ...couponData,
        code: couponData.code.toUpperCase(),
        value: parseFloat(couponData.value),
        maxDiscount: couponData.maxDiscount ? parseFloat(couponData.maxDiscount) : 0,
        minOrder: couponData.minOrder ? parseFloat(couponData.minOrder) : 0,
        usageLimit: couponData.usageLimit ? parseInt(couponData.usageLimit) : 0,
        isStackable: couponData.isStackable || false,
        freeDelivery: couponData.freeDelivery || false,
        status: couponData.status || 'active',
      };

      const response = await api.post('/coupons', data);
      return response.data;
    } catch (error) {
      console.error('Error creating coupon:', error);
      throw error;
    }
  },

  /**
   * Update coupon
   * @param {string|number} id - Coupon ID
   * @param {Object} couponData - Updated coupon data
   * @returns {Promise<Object>} Updated coupon
   */
  async updateCoupon(id, couponData) {
    try {
      if (!id) throw new Error('Coupon ID is required');
      
      // Format data
      const data = {
        ...couponData,
        code: couponData.code ? couponData.code.toUpperCase() : undefined,
        value: couponData.value !== undefined ? parseFloat(couponData.value) : undefined,
        maxDiscount: couponData.maxDiscount !== undefined ? parseFloat(couponData.maxDiscount) : undefined,
        minOrder: couponData.minOrder !== undefined ? parseFloat(couponData.minOrder) : undefined,
        usageLimit: couponData.usageLimit !== undefined ? parseInt(couponData.usageLimit) : undefined,
      };

      const response = await api.put(`/coupons/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating coupon:', error);
      throw error;
    }
  },

  /**
   * Delete coupon
   * @param {string|number} id - Coupon ID
   * @returns {Promise<Object>} Delete response
   */
  async deleteCoupon(id) {
    try {
      if (!id) throw new Error('Coupon ID is required');
      const response = await api.delete(`/coupons/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting coupon:', error);
      throw error;
    }
  },

  /**
   * Bulk delete coupons
   * @param {Array} ids - Array of coupon IDs
   * @returns {Promise<Object>} Bulk delete response
   */
  async bulkDeleteCoupons(ids) {
    try {
      if (!ids || !ids.length) throw new Error('Coupon IDs are required');
      const response = await api.delete('/coupons/bulk', { data: { ids } });
      return response.data;
    } catch (error) {
      console.error('Error bulk deleting coupons:', error);
      throw error;
    }
  },

  // ============================================
  // COUPON VALIDATION & REDEMPTION
  // ============================================

  /**
   * Validate coupon
   * @param {string} code - Coupon code
   * @param {Object} context - Validation context
   * @param {number} context.subtotal - Order subtotal
   * @param {string} context.userId - User ID
   * @param {Array} context.cartItems - Cart items
   * @param {string} context.restaurantId - Restaurant ID
   * @param {Array} context.categories - Item categories
   * @returns {Promise<Object>} Validation result
   */
  async validateCoupon(code, context = {}) {
    try {
      if (!code) throw new Error('Coupon code is required');
      
      const response = await api.post('/coupons/validate', {
        code: code.toUpperCase(),
        subtotal: context.subtotal || 0,
        userId: context.userId || null,
        cartItems: context.cartItems || [],
        restaurantId: context.restaurantId || null,
        categories: context.categories || [],
      });
      
      return response.data;
    } catch (error) {
      console.error('Error validating coupon:', error);
      throw error;
    }
  },

  /**
   * Apply coupon to order
   * @param {string} code - Coupon code
   * @param {Object} orderData - Order data
   * @param {number} orderData.subtotal - Order subtotal
   * @param {string} orderData.userId - User ID
   * @param {Array} orderData.items - Order items
   * @param {string} orderData.restaurantId - Restaurant ID
   * @returns {Promise<Object>} Applied coupon result
   */
  async applyCoupon(code, orderData = {}) {
    try {
      if (!code) throw new Error('Coupon code is required');
      
      const response = await api.post('/coupons/apply', {
        code: code.toUpperCase(),
        subtotal: orderData.subtotal || 0,
        userId: orderData.userId || null,
        items: orderData.items || [],
        restaurantId: orderData.restaurantId || null,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error applying coupon:', error);
      throw error;
    }
  },

  /**
   * Redeem coupon
   * @param {string} code - Coupon code
   * @param {Object} redemptionData - Redemption data
   * @param {string} redemptionData.orderId - Order ID
   * @param {string} redemptionData.userId - User ID
   * @param {number} redemptionData.discountAmount - Discount amount
   * @param {number} redemptionData.finalAmount - Final amount
   * @returns {Promise<Object>} Redemption result
   */
  async redeemCoupon(code, redemptionData = {}) {
    try {
      if (!code) throw new Error('Coupon code is required');
      if (!redemptionData.orderId) throw new Error('Order ID is required');
      
      const response = await api.post('/coupons/redeem', {
        code: code.toUpperCase(),
        orderId: redemptionData.orderId,
        userId: redemptionData.userId || null,
        discountAmount: redemptionData.discountAmount || 0,
        finalAmount: redemptionData.finalAmount || 0,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error redeeming coupon:', error);
      throw error;
    }
  },

  /**
   * Check if coupon is valid for user
   * @param {string} code - Coupon code
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Check result
   */
  async checkCouponValidity(code, userId) {
    try {
      if (!code) throw new Error('Coupon code is required');
      
      const response = await api.get(`/coupons/check/${code.toUpperCase()}`, {
        params: { userId },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error checking coupon validity:', error);
      throw error;
    }
  },

  // ============================================
  // COUPON STATUS MANAGEMENT
  // ============================================

  /**
   * Update coupon status
   * @param {string|number} id - Coupon ID
   * @param {string} status - New status (active, inactive, expired)
   * @returns {Promise<Object>} Updated coupon
   */
  async updateCouponStatus(id, status) {
    try {
      if (!id) throw new Error('Coupon ID is required');
      if (!status) throw new Error('Status is required');
      
      const response = await api.patch(`/coupons/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating coupon status:', error);
      throw error;
    }
  },

  /**
   * Bulk update coupon status
   * @param {Array} ids - Array of coupon IDs
   * @param {string} status - New status
   * @returns {Promise<Object>} Bulk update response
   */
  async bulkUpdateStatus(ids, status) {
    try {
      if (!ids || !ids.length) throw new Error('Coupon IDs are required');
      if (!status) throw new Error('Status is required');
      
      const response = await api.patch('/coupons/bulk/status', { ids, status });
      return response.data;
    } catch (error) {
      console.error('Error bulk updating coupon status:', error);
      throw error;
    }
  },

  /**
   * Activate coupon
   * @param {string|number} id - Coupon ID
   * @returns {Promise<Object>} Activated coupon
   */
  async activateCoupon(id) {
    return this.updateCouponStatus(id, 'active');
  },

  /**
   * Deactivate coupon
   * @param {string|number} id - Coupon ID
   * @returns {Promise<Object>} Deactivated coupon
   */
  async deactivateCoupon(id) {
    return this.updateCouponStatus(id, 'inactive');
  },

  // ============================================
  // COUPON ANALYTICS & STATISTICS
  // ============================================

  /**
   * Get coupon analytics
   * @param {Object} params - Filter parameters
   * @param {string} params.period - Time period (day, week, month, year)
   * @param {string} params.startDate - Start date
   * @param {string} params.endDate - End date
   * @returns {Promise<Object>} Analytics data
   */
  async getCouponAnalytics(params = {}) {
    try {
      const response = await api.get('/coupons/analytics', {
        params: {
          period: params.period || 'month',
          startDate: params.startDate || '',
          endDate: params.endDate || '',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon analytics:', error);
      throw error;
    }
  },

  /**
   * Get coupon statistics
   * @param {string|number} id - Coupon ID
   * @returns {Promise<Object>} Coupon statistics
   */
  async getCouponStats(id) {
    try {
      if (!id) throw new Error('Coupon ID is required');
      const response = await api.get(`/coupons/${id}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon stats:', error);
      throw error;
    }
  },

  /**
   * Get coupon usage history
   * @param {string|number} id - Coupon ID
   * @param {Object} params - Filter parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise<Object>} Usage history
   */
  async getCouponUsageHistory(id, params = {}) {
    try {
      if (!id) throw new Error('Coupon ID is required');
      const response = await api.get(`/coupons/${id}/usage`, {
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon usage history:', error);
      throw error;
    }
  },

  /**
   * Get top performing coupons
   * @param {Object} params - Filter parameters
   * @param {number} params.limit - Number of coupons
   * @param {string} params.period - Time period
   * @returns {Promise<Object>} Top coupons
   */
  async getTopCoupons(params = {}) {
    try {
      const response = await api.get('/coupons/top', {
        params: {
          limit: params.limit || 10,
          period: params.period || 'month',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top coupons:', error);
      throw error;
    }
  },

  // ============================================
  // COUPON TYPES & CATEGORIES
  // ============================================

  /**
   * Get coupon types
   * @returns {Promise<Object>} Coupon types
   */
  async getCouponTypes() {
    try {
      const response = await api.get('/coupons/types');
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon types:', error);
      throw error;
    }
  },

  /**
   * Get coupon statuses
   * @returns {Promise<Object>} Coupon statuses
   */
  async getCouponStatuses() {
    try {
      const response = await api.get('/coupons/statuses');
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon statuses:', error);
      throw error;
    }
  },

  // ============================================
  // COUPON GENERATION
  // ============================================

  /**
   * Generate random coupon code
   * @param {Object} params - Generation parameters
   * @param {number} params.length - Code length
   * @param {string} params.prefix - Code prefix
   * @param {string} params.suffix - Code suffix
   * @returns {Promise<Object>} Generated code
   */
  async generateCouponCode(params = {}) {
    try {
      const response = await api.post('/coupons/generate-code', {
        length: params.length || 8,
        prefix: params.prefix || '',
        suffix: params.suffix || '',
      });
      return response.data;
    } catch (error) {
      console.error('Error generating coupon code:', error);
      throw error;
    }
  },

  /**
   * Generate bulk coupons
   * @param {Object} params - Generation parameters
   * @param {number} params.count - Number of coupons
   * @param {Object} params.template - Coupon template
   * @returns {Promise<Object>} Generated coupons
   */
  async generateBulkCoupons(params = {}) {
    try {
      if (!params.count || params.count < 1) {
        throw new Error('Number of coupons is required');
      }
      
      const response = await api.post('/coupons/generate-bulk', {
        count: params.count,
        template: params.template || {},
        prefix: params.prefix || '',
      });
      return response.data;
    } catch (error) {
      console.error('Error generating bulk coupons:', error);
      throw error;
    }
  },

  // ============================================
  // COUPON EXPORT & IMPORT
  // ============================================

  /**
   * Export coupons
   * @param {Object} params - Filter parameters
   * @param {string} params.format - Export format (csv, excel, pdf)
   * @returns {Promise<Blob>} Exported file
   */
  async exportCoupons(params = {}) {
    try {
      const response = await api.get('/coupons/export', {
        params: {
          format: params.format || 'csv',
          status: params.status || '',
          type: params.type || '',
          startDate: params.startDate || '',
          endDate: params.endDate || '',
          ...params,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting coupons:', error);
      throw error;
    }
  },

  /**
   * Import coupons
   * @param {File} file - CSV/Excel file
   * @param {Object} options - Import options
   * @param {boolean} options.overwrite - Overwrite existing
   * @returns {Promise<Object>} Import result
   */
  async importCoupons(file, options = {}) {
    try {
      if (!file) throw new Error('File is required');
      
      const formData = new FormData();
      formData.append('file', file);
      if (options.overwrite) {
        formData.append('overwrite', options.overwrite);
      }
      
      const response = await api.post('/coupons/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error importing coupons:', error);
      throw error;
    }
  },

  // ============================================
  // USER COUPON OPERATIONS
  // ============================================

  /**
   * Get user's available coupons
   * @param {string} userId - User ID
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Available coupons
   */
  async getUserCoupons(userId, params = {}) {
    try {
      if (!userId) throw new Error('User ID is required');
      
      const response = await api.get(`/users/${userId}/coupons`, {
        params: {
          status: params.status || 'active',
          type: params.type || '',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user coupons:', error);
      throw error;
    }
  },

  /**
   * Get user's redeemed coupons
   * @param {string} userId - User ID
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Redeemed coupons
   */
  async getUserRedeemedCoupons(userId, params = {}) {
    try {
      if (!userId) throw new Error('User ID is required');
      
      const response = await api.get(`/users/${userId}/coupons/redeemed`, {
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user redeemed coupons:', error);
      throw error;
    }
  },

  /**
   * Get available coupons for checkout
   * @param {Object} context - Checkout context
   * @param {number} context.subtotal - Order subtotal
   * @param {string} context.userId - User ID
   * @param {Array} context.cartItems - Cart items
   * @param {string} context.restaurantId - Restaurant ID
   * @returns {Promise<Object>} Available coupons
   */
  async getAvailableCouponsForCheckout(context = {}) {
    try {
      const response = await api.post('/coupons/available-for-checkout', {
        subtotal: context.subtotal || 0,
        userId: context.userId || null,
        cartItems: context.cartItems || [],
        restaurantId: context.restaurantId || null,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching available coupons:', error);
      throw error;
    }
  },

  // ============================================
  // NOTIFICATION HELPERS
  // ============================================

  /**
   * Send coupon to users
   * @param {string|number} couponId - Coupon ID
   * @param {Object} data - Send data
   * @param {Array} data.userIds - User IDs
   * @param {string} data.message - Custom message
   * @returns {Promise<Object>} Send result
   */
  async sendCouponToUsers(couponId, data = {}) {
    try {
      if (!couponId) throw new Error('Coupon ID is required');
      if (!data.userIds || !data.userIds.length) {
        throw new Error('User IDs are required');
      }
      
      const response = await api.post(`/coupons/${couponId}/send`, {
        userIds: data.userIds,
        message: data.message || '',
        channel: data.channel || 'email',
      });
      return response.data;
    } catch (error) {
      console.error('Error sending coupon to users:', error);
      throw error;
    }
  },

  /**
   * Send coupon to all users
   * @param {string|number} couponId - Coupon ID
   * @param {Object} data - Send data
   * @param {string} data.message - Custom message
   * @param {string} data.userType - User type (all, customers, etc.)
   * @returns {Promise<Object>} Send result
   */
  async sendCouponToAll(couponId, data = {}) {
    try {
      if (!couponId) throw new Error('Coupon ID is required');
      
      const response = await api.post(`/coupons/${couponId}/send-all`, {
        message: data.message || '',
        userType: data.userType || 'all',
        channel: data.channel || 'email',
      });
      return response.data;
    } catch (error) {
      console.error('Error sending coupon to all users:', error);
      throw error;
    }
  },

  // ============================================
  // COUPON SETTINGS
  // ============================================

  /**
   * Get coupon settings
   * @returns {Promise<Object>} Coupon settings
   */
  async getCouponSettings() {
    try {
      const response = await api.get('/coupons/settings');
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon settings:', error);
      throw error;
    }
  },

  /**
   * Update coupon settings
   * @param {Object} settingsData - Settings data
   * @returns {Promise<Object>} Updated settings
   */
  async updateCouponSettings(settingsData) {
    try {
      const response = await api.put('/coupons/settings', settingsData);
      return response.data;
    } catch (error) {
      console.error('Error updating coupon settings:', error);
      throw error;
    }
  },
};

// ============================================
// NAMED EXPORTS FOR BACKWARDS COMPATIBILITY
// ============================================

export const getAllCoupons = couponService.getAllCoupons.bind(couponService);
export const getCouponById = couponService.getCouponById.bind(couponService);
export const getCouponByCode = couponService.getCouponByCode.bind(couponService);
export const createCoupon = couponService.createCoupon.bind(couponService);
export const updateCoupon = couponService.updateCoupon.bind(couponService);
export const deleteCoupon = couponService.deleteCoupon.bind(couponService);
export const bulkDeleteCoupons = couponService.bulkDeleteCoupons.bind(couponService);
export const validateCoupon = couponService.validateCoupon.bind(couponService);
export const applyCoupon = couponService.applyCoupon.bind(couponService);
export const redeemCoupon = couponService.redeemCoupon.bind(couponService);
export const checkCouponValidity = couponService.checkCouponValidity.bind(couponService);
export const updateCouponStatus = couponService.updateCouponStatus.bind(couponService);
export const bulkUpdateStatus = couponService.bulkUpdateStatus.bind(couponService);
export const activateCoupon = couponService.activateCoupon.bind(couponService);
export const deactivateCoupon = couponService.deactivateCoupon.bind(couponService);
export const getCouponAnalytics = couponService.getCouponAnalytics.bind(couponService);
export const getCouponStats = couponService.getCouponStats.bind(couponService);
export const getCouponUsageHistory = couponService.getCouponUsageHistory.bind(couponService);
export const getTopCoupons = couponService.getTopCoupons.bind(couponService);
export const getCouponTypes = couponService.getCouponTypes.bind(couponService);
export const getCouponStatuses = couponService.getCouponStatuses.bind(couponService);
export const generateCouponCode = couponService.generateCouponCode.bind(couponService);
export const generateBulkCoupons = couponService.generateBulkCoupons.bind(couponService);
export const exportCoupons = couponService.exportCoupons.bind(couponService);
export const importCoupons = couponService.importCoupons.bind(couponService);
export const getUserCoupons = couponService.getUserCoupons.bind(couponService);
export const getUserRedeemedCoupons = couponService.getUserRedeemedCoupons.bind(couponService);
export const getAvailableCouponsForCheckout = couponService.getAvailableCouponsForCheckout.bind(couponService);
export const sendCouponToUsers = couponService.sendCouponToUsers.bind(couponService);
export const sendCouponToAll = couponService.sendCouponToAll.bind(couponService);
export const getCouponSettings = couponService.getCouponSettings.bind(couponService);
export const updateCouponSettings = couponService.updateCouponSettings.bind(couponService);

export default couponService;