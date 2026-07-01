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
      
      const user = { 
        id: 1, 
        name: 'John Doe', 
        email,
        role: 'customer'
      };
      const token = 'mock-jwt-token';
      
      storage.set('token', token);
      storage.set('user', user);
      
      if (rememberMe) {
        storage.set('rememberMe', true);
        storage.set('rememberedEmail', email);
      }
      
      authService.setAuthToken(token);
      setUser(user);
      toast.success('Welcome back! 🎉');
      return { success: true };
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
        id: 1, 
        name: userData.fullName || userData.name, 
        email: userData.email,
        phone: userData.phone || '',
        role: 'customer'
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
    logout,
    isAuthenticated: !!user && !!storage.get('token'),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;