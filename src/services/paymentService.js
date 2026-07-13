// src/services/paymentService.js
import axios from 'axios';
import { storage } from '../utils/storage';

// ✅ FIX: Use import.meta.env instead of process.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const paymentService = {
  // ============================================
  // PAYMENT PROCESSING
  // ============================================

  /**
   * Process payment
   * @param {Object} paymentData - Payment data
   * @param {string} paymentData.method - Payment method (card, upi, wallet, cod, netbanking)
   * @param {number} paymentData.amount - Payment amount
   * @param {string} paymentData.orderId - Order ID
   * @param {string} paymentData.userId - User ID
   * @param {Object} paymentData.details - Payment method specific details
   * @returns {Promise<Object>} Payment result
   */
  async processPayment(paymentData) {
    try {
      if (!paymentData.method) throw new Error('Payment method is required');
      if (!paymentData.amount) throw new Error('Payment amount is required');
      if (!paymentData.orderId) throw new Error('Order ID is required');

      const token = storage.get('token');
      const response = await axios.post(`${API_URL}/payments/process`, paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  },

  /**
   * Verify payment
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Verification result
   */
  async verifyPayment(transactionId) {
    try {
      if (!transactionId) throw new Error('Transaction ID is required');

      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/payments/verify/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },

  /**
   * Get payment status
   * @param {string} paymentId - Payment ID
   * @returns {Promise<Object>} Payment status
   */
  async getPaymentStatus(paymentId) {
    try {
      if (!paymentId) throw new Error('Payment ID is required');

      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/payments/${paymentId}/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching payment status:', error);
      throw error;
    }
  },

  /**
   * Get payment details
   * @param {string} paymentId - Payment ID
   * @returns {Promise<Object>} Payment details
   */
  async getPaymentDetails(paymentId) {
    try {
      if (!paymentId) throw new Error('Payment ID is required');

      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching payment details:', error);
      throw error;
    }
  },

  // ============================================
  // PAYMENT METHODS
  // ============================================

  /**
   * Get available payment methods
   * @param {Object} params - Filter parameters
   * @param {number} params.amount - Order amount
   * @param {string} params.userId - User ID
   * @returns {Promise<Object>} Available payment methods
   */
  async getPaymentMethods(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/payments/methods`, {
        params: {
          amount: params.amount || 0,
          userId: params.userId || '',
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  },

  // ============================================
  // CARD MANAGEMENT
  // ============================================

  /**
   * Save card for future use
   * @param {Object} cardData - Card data
   * @param {string} cardData.cardNumber - Card number
   * @param {string} cardData.cardName - Cardholder name
   * @param {string} cardData.cardExpiry - Card expiry (MM/YY)
   * @param {string} cardData.cardCvv - Card CVV
   * @param {boolean} cardData.saveCard - Save card flag
   * @returns {Promise<Object>} Saved card result
   */
  async saveCard(cardData) {
    try {
      if (!cardData.cardNumber) throw new Error('Card number is required');
      if (!cardData.cardName) throw new Error('Cardholder name is required');
      if (!cardData.cardExpiry) throw new Error('Card expiry is required');
      if (!cardData.cardCvv) throw new Error('Card CVV is required');

      const token = storage.get('token');
      const response = await axios.post(`${API_URL}/payments/cards`, cardData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error saving card:', error);
      throw error;
    }
  },

  /**
   * Get saved cards
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Saved cards
   */
  async getSavedCards(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/payments/cards`, {
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching saved cards:', error);
      throw error;
    }
  },

  /**
   * Delete saved card
   * @param {string} cardId - Card ID
   * @returns {Promise<Object>} Delete result
   */
  async deleteSavedCard(cardId) {
    try {
      if (!cardId) throw new Error('Card ID is required');

      const token = storage.get('token');
      const response = await axios.delete(`${API_URL}/payments/cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting saved card:', error);
      throw error;
    }
  },

  // ============================================
  // TRANSACTION MANAGEMENT
  // ============================================

  /**
   * Get user transactions
   * @param {Object} params - Filter parameters
   * @param {string} params.userId - User ID
   * @param {string} params.status - Transaction status
   * @param {string} params.type - Transaction type
   * @param {string} params.startDate - Start date
   * @param {string} params.endDate - End date
   * @returns {Promise<Object>} Transactions
   */
  async getUserTransactions(params = {}) {
    try {
      if (!params.userId) throw new Error('User ID is required');

      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/payments/transactions`, {
        params: {
          userId: params.userId,
          status: params.status || '',
          type: params.type || '',
          startDate: params.startDate || '',
          endDate: params.endDate || '',
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
      console.error('Error fetching user transactions:', error);
      throw error;
    }
  },

  /**
   * Get transaction details
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Transaction details
   */
  async getTransactionDetails(transactionId) {
    try {
      if (!transactionId) throw new Error('Transaction ID is required');

      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/payments/transactions/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction details:', error);
      throw error;
    }
  },

  // ============================================
  // REFUND MANAGEMENT
  // ============================================

  /**
   * Process refund
   * @param {Object} refundData - Refund data
   * @param {string} refundData.transactionId - Transaction ID
   * @param {number} refundData.amount - Refund amount
   * @param {string} refundData.reason - Refund reason
   * @returns {Promise<Object>} Refund result
   */
  async processRefund(refundData) {
    try {
      if (!refundData.transactionId) throw new Error('Transaction ID is required');
      if (!refundData.amount) throw new Error('Refund amount is required');
      if (!refundData.reason) throw new Error('Refund reason is required');

      const token = storage.get('token');
      const response = await axios.post(`${API_URL}/payments/refund`, refundData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  },

  /**
   * Get refund status
   * @param {string} refundId - Refund ID
   * @returns {Promise<Object>} Refund status
   */
  async getRefundStatus(refundId) {
    try {
      if (!refundId) throw new Error('Refund ID is required');

      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/payments/refund/${refundId}/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching refund status:', error);
      throw error;
    }
  },

  // ============================================
  // WALLET MANAGEMENT
  // ============================================

  /**
   * Get wallet balance
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Wallet balance
   */
  async getWalletBalance(userId) {
    try {
      if (!userId) throw new Error('User ID is required');

      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/payments/wallet/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      throw error;
    }
  },

  /**
   * Add money to wallet
   * @param {Object} data - Add money data
   * @param {string} data.userId - User ID
   * @param {number} data.amount - Amount to add
   * @param {string} data.paymentMethod - Payment method
   * @returns {Promise<Object>} Add money result
   */
  async addMoneyToWallet(data) {
    try {
      if (!data.userId) throw new Error('User ID is required');
      if (!data.amount) throw new Error('Amount is required');

      const token = storage.get('token');
      const response = await axios.post(`${API_URL}/payments/wallet/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding money to wallet:', error);
      throw error;
    }
  },

  /**
   * Get wallet transactions
   * @param {string} userId - User ID
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Wallet transactions
   */
  async getWalletTransactions(userId, params = {}) {
    try {
      if (!userId) throw new Error('User ID is required');

      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/payments/wallet/${userId}/transactions`, {
        params: {
          type: params.type || '',
          startDate: params.startDate || '',
          endDate: params.endDate || '',
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
      console.error('Error fetching wallet transactions:', error);
      throw error;
    }
  },

  // ============================================
  // ADMIN PAYMENT OPERATIONS
  // ============================================

  /**
   * Get all payments (admin only)
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Payments
   */
  async getAllPayments(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/admin/payments`, {
        params: {
          status: params.status || '',
          method: params.method || '',
          startDate: params.startDate || '',
          endDate: params.endDate || '',
          userId: params.userId || '',
          orderId: params.orderId || '',
          search: params.search || '',
          page: params.page || 1,
          limit: params.limit || 20,
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
      console.error('Error fetching all payments:', error);
      throw error;
    }
  },

  /**
   * Get payment statistics (admin only)
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Payment statistics
   */
  async getPaymentStats(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/admin/payments/stats`, {
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
      console.error('Error fetching payment stats:', error);
      throw error;
    }
  },

  /**
   * Get payment analytics (admin only)
   * @param {Object} params - Filter parameters
   * @returns {Promise<Object>} Payment analytics
   */
  async getPaymentAnalytics(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/admin/payments/analytics`, {
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
      console.error('Error fetching payment analytics:', error);
      throw error;
    }
  },

  // ============================================
  // PAYMENT EXPORTS
  // ============================================

  /**
   * Export payments
   * @param {Object} params - Filter parameters
   * @param {string} params.format - Export format (csv, excel, pdf)
   * @returns {Promise<Blob>} Exported file
   */
  async exportPayments(params = {}) {
    try {
      const token = storage.get('token');
      const response = await axios.get(`${API_URL}/payments/export`, {
        params: {
          format: params.format || 'csv',
          status: params.status || '',
          method: params.method || '',
          startDate: params.startDate || '',
          endDate: params.endDate || '',
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting payments:', error);
      throw error;
    }
  },

  // ============================================
  // PAYMENT WEBHOOKS
  // ============================================

  /**
   * Handle payment webhook
   * @param {Object} webhookData - Webhook data
   * @returns {Promise<Object>} Webhook result
   */
  async handleWebhook(webhookData) {
    try {
      const response = await axios.post(`${API_URL}/payments/webhook`, webhookData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error handling payment webhook:', error);
      throw error;
    }
  },
};

// ============================================
// NAMED EXPORTS FOR BACKWARDS COMPATIBILITY
// ============================================

export const processPayment = paymentService.processPayment.bind(paymentService);
export const verifyPayment = paymentService.verifyPayment.bind(paymentService);
export const getPaymentStatus = paymentService.getPaymentStatus.bind(paymentService);
export const getPaymentDetails = paymentService.getPaymentDetails.bind(paymentService);
export const getPaymentMethods = paymentService.getPaymentMethods.bind(paymentService);
export const saveCard = paymentService.saveCard.bind(paymentService);
export const getSavedCards = paymentService.getSavedCards.bind(paymentService);
export const deleteSavedCard = paymentService.deleteSavedCard.bind(paymentService);
export const getUserTransactions = paymentService.getUserTransactions.bind(paymentService);
export const getTransactionDetails = paymentService.getTransactionDetails.bind(paymentService);
export const processRefund = paymentService.processRefund.bind(paymentService);
export const getRefundStatus = paymentService.getRefundStatus.bind(paymentService);
export const getWalletBalance = paymentService.getWalletBalance.bind(paymentService);
export const addMoneyToWallet = paymentService.addMoneyToWallet.bind(paymentService);
export const getWalletTransactions = paymentService.getWalletTransactions.bind(paymentService);
export const getAllPayments = paymentService.getAllPayments.bind(paymentService);
export const getPaymentStats = paymentService.getPaymentStats.bind(paymentService);
export const getPaymentAnalytics = paymentService.getPaymentAnalytics.bind(paymentService);
export const exportPayments = paymentService.exportPayments.bind(paymentService);
export const handleWebhook = paymentService.handleWebhook.bind(paymentService);

export default paymentService;