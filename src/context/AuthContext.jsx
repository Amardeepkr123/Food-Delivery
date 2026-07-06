import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { storage } from '../utils/storage';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

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

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = storage.get('token');
        const userData = storage.get('user');
        
        if (token && userData) {
          setUser(userData);
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

  const login = async (email, password, rememberMe) => {
    setError(null);
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let user = null;
      let token = 'mock-jwt-token';
      
      // Check for admin credentials (case-insensitive)
      if (email.toLowerCase() === 'admin@fooddelivery.com' && password === 'admin123') {
        // Admin user
        user = { 
          id: 0, 
          name: 'Admin User', 
          email: email,
          role: 'admin',
          isAdmin: true,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
        };
        toast.success('Welcome Admin! 🎉');
      } else {
        // Regular user
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
      return { success: true, user };
    } catch (err) {
      const message = err.message || 'Login failed';
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = { 
        id: Date.now(), 
        name: userData.fullName || userData.name || 'User', 
        email: userData.email,
        phone: userData.phone || '',
        role: 'customer',
        isAdmin: false
      };
      const token = 'mock-jwt-token';
      
      storage.set('token', token);
      storage.set('user', user);
      authService.setAuthToken(token);
      setUser(user);
      toast.success('Account created successfully! 🎉');
      return { success: true };
    } catch (err) {
      const message = err.message || 'Registration failed';
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
        isAdmin: false
      };
      const token = 'mock-google-token';
      
      storage.set('token', token);
      storage.set('user', user);
      authService.setAuthToken(token);
      setUser(user);
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
    setError(null);
    toast.info('Logged out successfully');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    googleAuth,
    logout,
    isAuthenticated: !!user && !!storage.get('token'),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;