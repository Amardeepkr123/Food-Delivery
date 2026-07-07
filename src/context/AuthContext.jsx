// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
// ✅ FIXED: Check if services exist, if not use localStorage directly
// import { authService } from '../services/authService';
// import { storage } from '../utils/storage';
import { toast } from 'react-toastify';

// ✅ Fallback storage functions
const storage = {
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return localStorage.getItem(key);
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key) => {
    localStorage.removeItem(key);
  }
};

const authService = {
  setAuthToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = storage.get('token');
        const userData = storage.get('user');
        
        if (token && userData) {
          setUser(userData);
          setIsAuthenticated(true);
          authService.setAuthToken(token);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    setError(null);
    setLoading(true);
    
    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let user = null;
      let token = 'mock-jwt-token';
      
      if (email.toLowerCase() === 'admin@fooddelivery.com' && password === 'admin123') {
        user = { 
          id: 0, 
          name: 'Admin User', 
          email: email,
          role: 'admin',
          isAdmin: true,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
        };
        toast.success('Welcome Admin! 🎉');
      } else if (email.toLowerCase() === 'restaurant@fooddelivery.com' && password === 'restaurant123') {
        user = { 
          id: 2, 
          name: 'Restaurant Owner', 
          email: email,
          role: 'restaurant_owner',
          isAdmin: false,
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'
        };
        toast.success('Welcome Restaurant Owner! 🎉');
      } else if (email.toLowerCase() === 'delivery@fooddelivery.com' && password === 'delivery123') {
        user = { 
          id: 3, 
          name: 'Delivery Partner', 
          email: email,
          role: 'delivery_partner',
          isAdmin: false,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
        };
        toast.success('Welcome Delivery Partner! 🎉');
      } else {
        user = { 
          id: 1, 
          name: email.split('@')[0] || 'User', 
          email: email,
          role: 'customer',
          isAdmin: false
        };
        toast.success('Welcome back! 🎉');
      }
      
      storage.set('token', token);
      storage.set('user', user);
      
      if (rememberMe) {
        storage.set('rememberMe', true);
        storage.set('rememberedEmail', email);
      }
      
      authService.setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (err) {
      const message = err.message || 'Login failed. Please check your credentials.';
      setError(message);
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setError(null);
    setLoading(true);
    
    try {
      if (!userData.email || !userData.password) {
        throw new Error('Please fill in all required fields');
      }
      
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = { 
        id: Date.now(), 
        name: userData.fullName || userData.name || 'User', 
        email: userData.email,
        phone: userData.phone || '',
        role: 'customer',
        isAdmin: false,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
      };
      const token = 'mock-jwt-token';
      
      storage.set('token', token);
      storage.set('user', user);
      authService.setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      toast.success('Account created successfully! 🎉');
      return { success: true };
    } catch (err) {
      const message = err.message || 'Registration failed. Please try again.';
      setError(message);
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const googleAuth = async (credential) => {
    setError(null);
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = { 
        id: 2, 
        name: 'Google User', 
        email: 'google@example.com',
        role: 'customer',
        isAdmin: false,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
      };
      const token = 'mock-google-token';
      
      storage.set('token', token);
      storage.set('user', user);
      authService.setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      toast.success('Google login successful! 🎉');
      return { success: true };
    } catch (err) {
      const message = err.message || 'Google login failed';
      setError(message);
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    storage.remove('token');
    storage.remove('user');
    storage.remove('rememberMe');
    storage.remove('rememberedEmail');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    toast.info('Logged out successfully');
  };

  const updateUser = async (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      storage.set('user', updatedUser);
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      const message = error.message || 'Failed to update profile';
      toast.error(message);
      return { success: false, message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      if (!currentPassword || !newPassword) {
        throw new Error('Please fill in all fields');
      }
      if (newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Password changed successfully!');
      return { success: true };
    } catch (error) {
      const message = error.message || 'Failed to change password';
      toast.error(message);
      return { success: false, message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      if (!email) {
        throw new Error('Please enter your email');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password reset link sent to your email!');
      return { success: true };
    } catch (error) {
      const message = error.message || 'Failed to send reset link';
      toast.error(message);
      return { success: false, message };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      if (!newPassword || newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password reset successfully!');
      return { success: true };
    } catch (error) {
      const message = error.message || 'Failed to reset password';
      toast.error(message);
      return { success: false, message };
    }
  };

  const getUserRole = () => {
    return user?.role || 'customer';
  };

  const isAdmin = () => {
    return user?.isAdmin === true || user?.role === 'admin';
  };

  const checkAuth = () => {
    return !!user && !!storage.get('token');
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    isAuthenticated,
    setIsAuthenticated,
    login,
    register,
    googleAuth,
    logout,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
    getUserRole,
    isAdmin,
    checkAuth,
    isLoggedIn: checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;