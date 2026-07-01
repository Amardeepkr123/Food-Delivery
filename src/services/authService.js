import api from './api';
import { storage } from '../utils/storage';

export const authService = {
  setAuthToken(token) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async googleAuth(token) {
    const response = await api.post('/auth/google', { token });
    return response.data;
  },

  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  async verifyOTP(email, otp) {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  },

  async resetPassword(email, otp, newPassword) {
    const response = await api.post('/auth/reset-password', { email, otp, newPassword });
    return response.data;
  },

  logout() {
    this.setAuthToken(null);
    storage.remove('token');
    storage.remove('user');
  },

  getCurrentUser() {
    return storage.get('user');
  },

  isAuthenticated() {
    return !!storage.get('token');
  },
};

export default authService;