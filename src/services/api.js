// src/services/deliveryPartnersAPI.js
import axios from 'axios';
import { storage } from '../utils/storage';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = storage.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases
    if (error.response?.status === 401) {
      storage.remove('token');
      storage.remove('user');
      storage.remove('user_role');
      // Don't redirect if already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
        toast.error('Session expired. Please login again.');
      }
    }
    
    if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action.');
    }
    
    if (error.response?.status === 404) {
      // Only show toast for non-GET requests or specific cases
      if (error.config?.method !== 'get') {
        toast.error('Resource not found.');
      }
    }
    
    if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    
    // Network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// ============================================
// DELIVERY PARTNERS API ENDPOINTS
// ============================================

export const deliveryPartnersAPI = {
  // Get all delivery partners with filters
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/delivery-partners', { 
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          search: params.search || '',
          status: params.status || '',
          city: params.city || '',
          rating: params.rating || '',
          sortBy: params.sortBy || 'createdAt',
          sortOrder: params.sortOrder || 'desc',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single delivery partner by ID
  getById: async (id) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner by user ID
  getByUserId: async (userId) => {
    try {
      if (!userId) throw new Error('User ID is required');
      const response = await api.get(`/delivery-partners/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new delivery partner
  create: async (data) => {
    try {
      const formData = new FormData();
      
      // Handle nested objects
      Object.keys(data).forEach(key => {
        if (key === 'documents' && data.documents) {
          Object.keys(data.documents).forEach(docKey => {
            if (data.documents[docKey]) {
              formData.append(`documents[${docKey}]`, data.documents[docKey]);
            }
          });
        } else if (key === 'vehicle' && data.vehicle) {
          formData.append('vehicle', JSON.stringify(data.vehicle));
        } else if (key === 'availability' && data.availability) {
          formData.append('availability', JSON.stringify(data.availability));
        } else if (key === 'avatar' && data.avatar) {
          formData.append('avatar', data.avatar);
        } else if (key === 'address' && data.address) {
          formData.append('address', JSON.stringify(data.address));
        } else if (key === 'bankDetails' && data.bankDetails) {
          formData.append('bankDetails', JSON.stringify(data.bankDetails));
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });
      
      const response = await api.post('/delivery-partners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update delivery partner
  update: async (id, data) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      
      const formData = new FormData();
      
      Object.keys(data).forEach(key => {
        if (key === 'documents' && data.documents) {
          Object.keys(data.documents).forEach(docKey => {
            if (data.documents[docKey]) {
              formData.append(`documents[${docKey}]`, data.documents[docKey]);
            }
          });
        } else if (key === 'vehicle' && data.vehicle) {
          formData.append('vehicle', JSON.stringify(data.vehicle));
        } else if (key === 'availability' && data.availability) {
          formData.append('availability', JSON.stringify(data.availability));
        } else if (key === 'avatar' && data.avatar) {
          formData.append('avatar', data.avatar);
        } else if (key === 'address' && data.address) {
          formData.append('address', JSON.stringify(data.address));
        } else if (key === 'bankDetails' && data.bankDetails) {
          formData.append('bankDetails', JSON.stringify(data.bankDetails));
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });
      
      const response = await api.put(`/delivery-partners/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete delivery partner
  delete: async (id) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.delete(`/delivery-partners/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update partner status
  updateStatus: async (id, status) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      if (!status) throw new Error('Status is required');
      
      const response = await api.patch(`/delivery-partners/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner statistics
  getStats: async (params = {}) => {
    try {
      const response = await api.get('/delivery-partners/stats', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner earnings
  getEarnings: async (id, period = 'month') => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/earnings`, { 
        params: { period } 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner performance
  getPerformance: async (id, params = {}) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/performance`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner location (real-time)
  getLocation: async (id) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/location`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update partner location
  updateLocation: async (id, lat, lng, accuracy = null) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      if (lat === undefined || lng === undefined) {
        throw new Error('Latitude and longitude are required');
      }
      
      const response = await api.post(`/delivery-partners/${id}/location`, { 
        lat, 
        lng,
        accuracy,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Assign order to partner
  assignOrder: async (partnerId, orderId) => {
    try {
      if (!partnerId) throw new Error('Partner ID is required');
      if (!orderId) throw new Error('Order ID is required');
      
      const response = await api.post(`/delivery-partners/${partnerId}/assign-order`, { orderId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner's orders
  getOrders: async (id, params = {}) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/orders`, { 
        params: {
          status: params.status || '',
          page: params.page || 1,
          limit: params.limit || 20,
          fromDate: params.fromDate || '',
          toDate: params.toDate || '',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner ratings
  getRatings: async (id, params = {}) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/ratings`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add partner rating
  addRating: async (id, data) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      if (!data.rating) throw new Error('Rating is required');
      
      const response = await api.post(`/delivery-partners/${id}/ratings`, {
        rating: data.rating,
        comment: data.comment || '',
        orderId: data.orderId || '',
        customerId: data.customerId || '',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner documents
  getDocuments: async (id) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/documents`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload partner document
  uploadDocument: async (id, type, file) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      if (!type) throw new Error('Document type is required');
      if (!file) throw new Error('File is required');
      
      const formData = new FormData();
      formData.append('document', file);
      formData.append('type', type);
      
      const response = await api.post(`/delivery-partners/${id}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete partner document
  deleteDocument: async (id, documentId) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      if (!documentId) throw new Error('Document ID is required');
      
      const response = await api.delete(`/delivery-partners/${id}/documents/${documentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Suspend partner
  suspend: async (id, reason) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      if (!reason) throw new Error('Suspension reason is required');
      
      const response = await api.post(`/delivery-partners/${id}/suspend`, { reason });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Activate partner
  activate: async (id) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.post(`/delivery-partners/${id}/activate`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner withdrawal requests
  getWithdrawals: async (id, params = {}) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/withdrawals`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create withdrawal request
  requestWithdrawal: async (id, amount, bankDetails = null) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      if (!amount || amount <= 0) throw new Error('Valid amount is required');
      
      const response = await api.post(`/delivery-partners/${id}/withdrawals`, { 
        amount,
        bankDetails,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner notifications
  getNotifications: async (id, params = {}) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/notifications`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mark notification as read
  markNotificationRead: async (partnerId, notificationId) => {
    try {
      if (!partnerId) throw new Error('Partner ID is required');
      if (!notificationId) throw new Error('Notification ID is required');
      
      const response = await api.patch(`/delivery-partners/${partnerId}/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mark all notifications as read
  markAllNotificationsRead: async (id) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.patch(`/delivery-partners/${id}/notifications/read-all`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner availability
  getAvailability: async (id) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/availability`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update partner availability
  updateAvailability: async (id, availability) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      if (!availability) throw new Error('Availability data is required');
      
      const response = await api.patch(`/delivery-partners/${id}/availability`, { availability });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner vehicle details
  getVehicle: async (id) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/vehicle`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update partner vehicle
  updateVehicle: async (id, vehicleData) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      if (!vehicleData) throw new Error('Vehicle data is required');
      
      const response = await api.patch(`/delivery-partners/${id}/vehicle`, vehicleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Export partner data
  exportData: async (params = {}) => {
    try {
      const response = await api.get('/delivery-partners/export', {
        params: {
          format: params.format || 'csv',
          ...params,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Import partners
  importData: async (file, options = {}) => {
    try {
      if (!file) throw new Error('File is required');
      
      const formData = new FormData();
      formData.append('file', file);
      if (options.overwrite) {
        formData.append('overwrite', options.overwrite);
      }
      
      const response = await api.post('/delivery-partners/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner dashboard stats
  getDashboardStats: async (id) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/dashboard`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner current order
  getCurrentOrder: async (id) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      const response = await api.get(`/delivery-partners/${id}/current-order`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Complete delivery
  completeDelivery: async (id, orderId, data = {}) => {
    try {
      if (!id) throw new Error('Partner ID is required');
      if (!orderId) throw new Error('Order ID is required');
      
      const response = await api.post(`/delivery-partners/${id}/complete-delivery`, {
        orderId,
        deliveryTime: data.deliveryTime || new Date().toISOString(),
        signature: data.signature || '',
        photo: data.photo || '',
        notes: data.notes || '',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ============================================
// BULK OPERATIONS
// ============================================

export const bulkAPI = {
  // Bulk delete partners
  deleteMultiple: async (ids) => {
    try {
      if (!ids || !ids.length) throw new Error('Partner IDs are required');
      
      const response = await api.delete('/delivery-partners/bulk', { 
        data: { ids } 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Bulk update status
  updateStatusBulk: async (ids, status) => {
    try {
      if (!ids || !ids.length) throw new Error('Partner IDs are required');
      if (!status) throw new Error('Status is required');
      
      const response = await api.patch('/delivery-partners/bulk/status', { 
        ids, 
        status 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Bulk assign orders
  assignOrdersBulk: async (assignments) => {
    try {
      if (!assignments || !assignments.length) {
        throw new Error('Assignments are required');
      }
      
      const response = await api.post('/delivery-partners/bulk/assign', { assignments });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Bulk update availability
  updateAvailabilityBulk: async (ids, availability) => {
    try {
      if (!ids || !ids.length) throw new Error('Partner IDs are required');
      if (!availability) throw new Error('Availability is required');
      
      const response = await api.patch('/delivery-partners/bulk/availability', { 
        ids, 
        availability 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ============================================
// ANALYTICS API
// ============================================

export const analyticsAPI = {
  // Get overall analytics
  getOverview: async (params = {}) => {
    try {
      const response = await api.get('/analytics/delivery-partners', { 
        params: {
          period: params.period || 'month',
          fromDate: params.fromDate || '',
          toDate: params.toDate || '',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get performance trends
  getTrends: async (params = {}) => {
    try {
      const response = await api.get('/analytics/delivery-partners/trends', { 
        params: {
          period: params.period || 'week',
          metric: params.metric || 'orders',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get top performers
  getTopPerformers: async (params = {}) => {
    try {
      const response = await api.get('/analytics/delivery-partners/top-performers', { 
        params: {
          limit: params.limit || 10,
          metric: params.metric || 'rating',
          period: params.period || 'month',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get earnings report
  getEarningsReport: async (params = {}) => {
    try {
      const response = await api.get('/analytics/delivery-partners/earnings', { 
        params: {
          period: params.period || 'month',
          partnerId: params.partnerId || '',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get delivery time analytics
  getDeliveryTimeAnalytics: async (params = {}) => {
    try {
      const response = await api.get('/analytics/delivery-partners/delivery-time', { 
        params: {
          period: params.period || 'month',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get customer satisfaction analytics
  getSatisfactionAnalytics: async (params = {}) => {
    try {
      const response = await api.get('/analytics/delivery-partners/satisfaction', { 
        params: {
          period: params.period || 'month',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ============================================
// AUTHENTICATION API
// ============================================

export const authAPI = {
  // Partner login
  login: async (email, password) => {
    try {
      if (!email) throw new Error('Email is required');
      if (!password) throw new Error('Password is required');
      
      const response = await api.post('/auth/delivery-partner/login', { email, password });
      
      // Store token if provided
      if (response.data.token) {
        storage.set('token', response.data.token);
        storage.set('user', response.data.user);
        storage.set('user_role', 'delivery_partner');
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Partner logout
  logout: async () => {
    try {
      const response = await api.post('/auth/delivery-partner/logout');
      
      // Clear stored data
      storage.remove('token');
      storage.remove('user');
      storage.remove('user_role');
      
      return response.data;
    } catch (error) {
      // Even if API fails, clear local storage
      storage.remove('token');
      storage.remove('user');
      storage.remove('user_role');
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      if (!email) throw new Error('Email is required');
      
      const response = await api.post('/auth/delivery-partner/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      if (!token) throw new Error('Reset token is required');
      if (!newPassword) throw new Error('New password is required');
      
      const response = await api.post('/auth/delivery-partner/reset-password', { 
        token, 
        newPassword 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      if (!currentPassword) throw new Error('Current password is required');
      if (!newPassword) throw new Error('New password is required');
      
      const response = await api.post('/auth/delivery-partner/change-password', { 
        currentPassword, 
        newPassword 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Verify partner
  verify: async (token) => {
    try {
      if (!token) throw new Error('Verification token is required');
      
      const response = await api.post('/auth/delivery-partner/verify', { token });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Resend verification
  resendVerification: async (email) => {
    try {
      if (!email) throw new Error('Email is required');
      
      const response = await api.post('/auth/delivery-partner/resend-verification', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ============================================
// NOTIFICATION API
// ============================================

export const notificationAPI = {
  // Send notification to partner
  send: async (partnerId, data) => {
    try {
      if (!partnerId) throw new Error('Partner ID is required');
      if (!data.title) throw new Error('Notification title is required');
      if (!data.message) throw new Error('Notification message is required');
      
      const response = await api.post(`/delivery-partners/${partnerId}/notifications`, {
        title: data.title,
        message: data.message,
        type: data.type || 'info',
        data: data.data || {},
        priority: data.priority || 'medium',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Send bulk notifications
  sendBulk: async (data) => {
    try {
      if (!data.partnerIds || !data.partnerIds.length) {
        throw new Error('Partner IDs are required');
      }
      if (!data.title) throw new Error('Notification title is required');
      if (!data.message) throw new Error('Notification message is required');
      
      const response = await api.post('/delivery-partners/notifications/bulk', {
        partnerIds: data.partnerIds,
        title: data.title,
        message: data.message,
        type: data.type || 'info',
        data: data.data || {},
        priority: data.priority || 'medium',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all notifications
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/delivery-partners/notifications', { 
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          read: params.read || '',
          type: params.type || '',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ============================================
// DOCUMENT UPLOAD HELPERS
// ============================================

export const documentHelpers = {
  // Upload single document
  upload: async (file, type, partnerId = null) => {
    try {
      if (!file) throw new Error('File is required');
      if (!type) throw new Error('Document type is required');
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      if (partnerId) {
        formData.append('partnerId', partnerId);
      }
      
      const response = await api.post('/upload/delivery-partner-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload multiple documents
  uploadMultiple: async (files, partnerId = null) => {
    try {
      if (!files || !files.length) throw new Error('Files are required');
      
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      if (partnerId) {
        formData.append('partnerId', partnerId);
      }
      
      const response = await api.post('/upload/delivery-partner-documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete document
  delete: async (documentId) => {
    try {
      if (!documentId) throw new Error('Document ID is required');
      
      const response = await api.delete(`/upload/delivery-partner-document/${documentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get document URL
  getDocumentUrl: (documentId) => {
    if (!documentId) return null;
    return `${API_URL}/upload/delivery-partner-document/${documentId}`;
  },

  // Download document
  download: async (documentId) => {
    try {
      if (!documentId) throw new Error('Document ID is required');
      
      const response = await api.get(`/upload/delivery-partner-document/${documentId}/download`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ============================================
// REPORT API
// ============================================

export const reportAPI = {
  // Generate partner report
  generate: async (params = {}) => {
    try {
      const response = await api.get('/reports/delivery-partners', {
        params: {
          format: params.format || 'pdf',
          partnerId: params.partnerId || '',
          fromDate: params.fromDate || '',
          toDate: params.toDate || '',
          ...params,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get report templates
  getTemplates: async () => {
    try {
      const response = await api.get('/reports/delivery-partners/templates');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Generate performance report
  generatePerformanceReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/delivery-partners/performance', {
        params: {
          format: params.format || 'pdf',
          partnerId: params.partnerId || '',
          period: params.period || 'month',
          ...params,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Generate earnings report
  generateEarningsReport: async (params = {}) => {
    try {
      const response = await api.get('/reports/delivery-partners/earnings', {
        params: {
          format: params.format || 'pdf',
          partnerId: params.partnerId || '',
          period: params.period || 'month',
          ...params,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const apiHelpers = {
  // Handle API errors
  handleError: (error, fallbackMessage = 'An error occurred') => {
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response.data?.message || 
             error.response.data?.error || 
             error.response.statusText || 
             fallbackMessage;
    } else if (error.request) {
      // The request was made but no response was received
      return 'Network error. Please check your connection.';
    } else {
      // Something happened in setting up the request
      return error.message || fallbackMessage;
    }
  },

  // Check if error is 404
  isNotFound: (error) => {
    return error.response?.status === 404;
  },

  // Check if error is 401 (Unauthorized)
  isUnauthorized: (error) => {
    return error.response?.status === 401;
  },

  // Check if error is 403 (Forbidden)
  isForbidden: (error) => {
    return error.response?.status === 403;
  },

  // Check if error is 409 (Conflict)
  isConflict: (error) => {
    return error.response?.status === 409;
  },

  // Check if error is 422 (Validation Error)
  isValidationError: (error) => {
    return error.response?.status === 422;
  },

  // Check if error is 500 (Server Error)
  isServerError: (error) => {
    return error.response?.status >= 500;
  },

  // Check if error is network error
  isNetworkError: (error) => {
    return !error.response && error.request;
  },

  // Get error message with fallback
  getErrorMessage: (error, fallback = 'Something went wrong') => {
    return error.response?.data?.message || 
           error.response?.data?.error || 
           error.message || 
           fallback;
  },

  // Get validation errors
  getValidationErrors: (error) => {
    if (error.response?.status === 422 && error.response?.data?.errors) {
      return error.response.data.errors;
    }
    return null;
  },

  // Get error status code
  getStatusCode: (error) => {
    return error.response?.status || null;
  },

  // Check if should retry request
  shouldRetry: (error, retryCount = 0, maxRetries = 3) => {
    // Don't retry on 4xx errors (except 429)
    if (error.response) {
      const status = error.response.status;
      if (status >= 400 && status < 500 && status !== 429) {
        return false;
      }
    }
    
    // Don't retry if max retries exceeded
    if (retryCount >= maxRetries) {
      return false;
    }
    
    // Retry on network errors, 5xx, and 429
    return !error.response || 
           error.response.status >= 500 || 
           error.response.status === 429;
  },

  // Get retry delay
  getRetryDelay: (retryCount) => {
    // Exponential backoff: 1s, 2s, 4s, 8s...
    return Math.min(1000 * Math.pow(2, retryCount), 30000);
  },
};

// ============================================
// EXPORT ALL
// ============================================

export default api;