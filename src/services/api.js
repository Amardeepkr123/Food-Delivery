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
    if (error.response?.status === 401) {
      storage.remove('token');
      storage.remove('user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    }
    
    if (error.response?.status === 500) {
      toast.error('Server error. Please try again later.');
    }
    
    if (error.response?.status === 404) {
      toast.error('Resource not found.');
    }
    
    return Promise.reject(error);
  }
);

// ============================================
// DELIVERY PARTNERS API ENDPOINTS
// ============================================

export const deliveryPartnersAPI = {
  // Get all delivery partners
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/delivery-partners', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single delivery partner by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/delivery-partners/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new delivery partner
  create: async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'documents') {
          Object.keys(data.documents).forEach(docKey => {
            if (data.documents[docKey]) {
              formData.append(`documents[${docKey}]`, data.documents[docKey]);
            }
          });
        } else if (key === 'avatar' && data.avatar) {
          formData.append('avatar', data.avatar);
        } else {
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
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'documents') {
          Object.keys(data.documents).forEach(docKey => {
            if (data.documents[docKey]) {
              formData.append(`documents[${docKey}]`, data.documents[docKey]);
            }
          });
        } else if (key === 'avatar' && data.avatar) {
          formData.append('avatar', data.avatar);
        } else {
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
      const response = await api.delete(`/delivery-partners/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update partner status
  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/delivery-partners/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner statistics
  getStats: async () => {
    try {
      const response = await api.get('/delivery-partners/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner earnings
  getEarnings: async (id, period = 'month') => {
    try {
      const response = await api.get(`/delivery-partners/${id}/earnings`, { params: { period } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner performance
  getPerformance: async (id) => {
    try {
      const response = await api.get(`/delivery-partners/${id}/performance`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner location (real-time)
  getLocation: async (id) => {
    try {
      const response = await api.get(`/delivery-partners/${id}/location`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update partner location
  updateLocation: async (id, lat, lng) => {
    try {
      const response = await api.post(`/delivery-partners/${id}/location`, { lat, lng });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Assign order to partner
  assignOrder: async (partnerId, orderId) => {
    try {
      const response = await api.post(`/delivery-partners/${partnerId}/assign-order`, { orderId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner's completed orders
  getOrders: async (id, params = {}) => {
    try {
      const response = await api.get(`/delivery-partners/${id}/orders`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner ratings
  getRatings: async (id) => {
    try {
      const response = await api.get(`/delivery-partners/${id}/ratings`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add partner rating
  addRating: async (id, data) => {
    try {
      const response = await api.post(`/delivery-partners/${id}/ratings`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner documents
  getDocuments: async (id) => {
    try {
      const response = await api.get(`/delivery-partners/${id}/documents`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload partner document
  uploadDocument: async (id, type, file) => {
    try {
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

  // Suspend partner
  suspend: async (id, reason) => {
    try {
      const response = await api.post(`/delivery-partners/${id}/suspend`, { reason });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Activate partner
  activate: async (id) => {
    try {
      const response = await api.post(`/delivery-partners/${id}/activate`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner withdrawal requests
  getWithdrawals: async (id) => {
    try {
      const response = await api.get(`/delivery-partners/${id}/withdrawals`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create withdrawal request
  requestWithdrawal: async (id, amount) => {
    try {
      const response = await api.post(`/delivery-partners/${id}/withdrawals`, { amount });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get partner notifications
  getNotifications: async (id) => {
    try {
      const response = await api.get(`/delivery-partners/${id}/notifications`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mark notification as read
  markNotificationRead: async (partnerId, notificationId) => {
    try {
      const response = await api.patch(`/delivery-partners/${partnerId}/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Export partner data
  exportData: async (params = {}) => {
    try {
      const response = await api.get('/delivery-partners/export', {
        params,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Import partners
  importData: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
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
};

// ============================================
// BULK OPERATIONS
// ============================================

export const bulkAPI = {
  // Bulk delete partners
  deleteMultiple: async (ids) => {
    try {
      const response = await api.delete('/delivery-partners/bulk', { data: { ids } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Bulk update status
  updateStatusBulk: async (ids, status) => {
    try {
      const response = await api.patch('/delivery-partners/bulk/status', { ids, status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Bulk assign orders
  assignOrdersBulk: async (assignments) => {
    try {
      const response = await api.post('/delivery-partners/bulk/assign', { assignments });
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
      const response = await api.get('/analytics/delivery-partners', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get performance trends
  getTrends: async (params = {}) => {
    try {
      const response = await api.get('/analytics/delivery-partners/trends', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get top performers
  getTopPerformers: async (params = {}) => {
    try {
      const response = await api.get('/analytics/delivery-partners/top-performers', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get earnings report
  getEarningsReport: async (params = {}) => {
    try {
      const response = await api.get('/analytics/delivery-partners/earnings', { params });
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
      const response = await api.post('/auth/delivery-partner/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Partner logout
  logout: async () => {
    try {
      const response = await api.post('/auth/delivery-partner/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/delivery-partner/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/delivery-partner/reset-password', { token, newPassword });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/auth/delivery-partner/change-password', { currentPassword, newPassword });
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
      const response = await api.post(`/delivery-partners/${partnerId}/notifications`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Send bulk notifications
  sendBulk: async (data) => {
    try {
      const response = await api.post('/delivery-partners/notifications/bulk', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all notifications
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/delivery-partners/notifications', { params });
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
  upload: async (file, type) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
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
  uploadMultiple: async (files) => {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      
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
      const response = await api.delete(`/upload/delivery-partner-document/${documentId}`);
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
        params,
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
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const apiHelpers = {
  // Handle API errors
  handleError: (error, fallbackMessage = 'An error occurred') => {
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response.data?.message || fallbackMessage;
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

  // Check if error is 500 (Server Error)
  isServerError: (error) => {
    return error.response?.status >= 500;
  },

  // Get error message with fallback
  getErrorMessage: (error, fallback = 'Something went wrong') => {
    return error.response?.data?.message || 
           error.response?.data?.error || 
           error.message || 
           fallback;
  },
};

// ============================================
// EXPORT ALL
// ============================================

export default api;

