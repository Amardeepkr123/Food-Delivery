import axios from 'axios';
import { storage } from '../utils/storage';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

export default api;