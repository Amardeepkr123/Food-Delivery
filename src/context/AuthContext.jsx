// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

// ============================================
// STORAGE UTILITY (Fallback)
// ============================================

const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      // Try to parse as JSON, return raw if fails
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }
};

// ============================================
// AUTH SERVICE (Fallback)
// ============================================

const authService = {
  setAuthToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },
  getAuthToken: () => {
    return localStorage.getItem('token');
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_role');
  }
};

// ============================================
// AUTH CONTEXT
// ============================================

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

// ============================================
// MOCK USERS FOR TESTING
// ============================================

export const MOCK_USERS = {
  ADMIN: {
    id: 0,
    name: 'Admin User',
    email: 'admin@fooddelivery.com',
    password: 'admin123',
    role: 'admin',
    isAdmin: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    phone: '9876543210',
    address: '123 Admin Street, Admin City',
  },
  RESTAURANT_OWNER: {
    id: 2,
    name: 'Restaurant Owner',
    email: 'restaurant@fooddelivery.com',
    password: 'restaurant123',
    role: 'restaurant_owner',
    isAdmin: false,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
    phone: '9876543211',
    address: '456 Restaurant Street, Food City',
  },
  DELIVERY_PARTNER: {
    id: 3,
    name: 'Delivery Partner',
    email: 'delivery@fooddelivery.com',
    password: 'delivery123',
    role: 'delivery_partner',
    isAdmin: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    phone: '9876543212',
    address: '789 Delivery Street, Courier City',
  },
  CUSTOMER: {
    id: 1,
    name: 'Customer User',
    email: 'customer@fooddelivery.com',
    password: 'customer123',
    role: 'customer',
    isAdmin: false,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    phone: '9876543213',
    address: '321 Customer Street, User City',
  }
};

// ============================================
// AUTH PROVIDER
// ============================================

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // ============================================
  // INITIALIZATION
  // ============================================

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
        // Clear invalid data
        storage.remove('token');
        storage.remove('user');
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();
  }, []);

  // ============================================
  // AUTH METHODS
  // ============================================

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {boolean} rememberMe - Remember user
   * @returns {Promise<Object>} Login result
   */
  const login = async (email, password, rememberMe = false) => {
    setError(null);
    setLoading(true);
    
    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let userData = null;
      let token = 'mock-jwt-token-' + Date.now();
      
      // Check against mock users
      const emailLower = email.toLowerCase();
      
      if (emailLower === MOCK_USERS.ADMIN.email && password === MOCK_USERS.ADMIN.password) {
        userData = { ...MOCK_USERS.ADMIN };
        toast.success('Welcome Admin! 🎉');
      } else if (emailLower === MOCK_USERS.RESTAURANT_OWNER.email && password === MOCK_USERS.RESTAURANT_OWNER.password) {
        userData = { ...MOCK_USERS.RESTAURANT_OWNER };
        toast.success('Welcome Restaurant Owner! 🎉');
      } else if (emailLower === MOCK_USERS.DELIVERY_PARTNER.email && password === MOCK_USERS.DELIVERY_PARTNER.password) {
        userData = { ...MOCK_USERS.DELIVERY_PARTNER };
        toast.success('Welcome Delivery Partner! 🎉');
      } else if (emailLower === MOCK_USERS.CUSTOMER.email && password === MOCK_USERS.CUSTOMER.password) {
        userData = { ...MOCK_USERS.CUSTOMER };
        toast.success('Welcome back! 🎉');
      } else {
        // Dynamic user creation for demo
        // Check if user exists in localStorage
        const savedUsers = storage.get('registered_users') || [];
        const existingUser = savedUsers.find(u => u.email === emailLower);
        
        if (existingUser && existingUser.password === password) {
          userData = { ...existingUser };
          delete userData.password; // Remove password from user object
          toast.success('Welcome back! 🎉');
        } else {
          throw new Error('Invalid email or password');
        }
      }
      
      // Store auth data
      storage.set('token', token);
      storage.set('user', userData);
      
      if (rememberMe) {
        storage.set('rememberMe', true);
        storage.set('rememberedEmail', email);
      } else {
        storage.remove('rememberMe');
        storage.remove('rememberedEmail');
      }
      
      authService.setAuthToken(token);
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, user: userData };
    } catch (err) {
      const message = err.message || 'Login failed. Please check your credentials.';
      setError(message);
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration result
   */
  const register = async (userData) => {
    setError(null);
    setLoading(true);
    
    try {
      // Validate input
      if (!userData.email || !userData.password) {
        throw new Error('Please fill in all required fields');
      }
      
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const savedUsers = storage.get('registered_users') || [];
      const existingUser = savedUsers.find(u => u.email === userData.email.toLowerCase());
      
      if (existingUser) {
        throw new Error('User already exists. Please login.');
      }
      
      // Create new user
      const newUser = {
        id: Date.now(),
        name: userData.fullName || userData.name || userData.email.split('@')[0],
        email: userData.email.toLowerCase(),
        password: userData.password, // Store password for demo
        phone: userData.phone || '',
        role: 'customer',
        isAdmin: false,
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        address: userData.address || '',
        createdAt: new Date().toISOString(),
      };
      
      // Save user
      savedUsers.push(newUser);
      storage.set('registered_users', savedUsers);
      
      // Create user object without password for state
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      
      const token = 'mock-jwt-token-' + Date.now();
      
      storage.set('token', token);
      storage.set('user', userWithoutPassword);
      authService.setAuthToken(token);
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      toast.success('Account created successfully! 🎉');
      return { success: true, user: userWithoutPassword };
    } catch (err) {
      const message = err.message || 'Registration failed. Please try again.';
      setError(message);
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Google OAuth login
   * @param {string} credential - Google credential
   * @returns {Promise<Object>} Login result
   */
  const googleAuth = async (credential) => {
    setError(null);
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: 999,
        name: 'Google User',
        email: 'google.user@gmail.com',
        role: 'customer',
        isAdmin: false,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        phone: '',
        address: '',
        googleId: credential || 'mock-google-id',
      };
      
      const token = 'mock-google-token-' + Date.now();
      
      storage.set('token', token);
      storage.set('user', userData);
      authService.setAuthToken(token);
      setUser(userData);
      setIsAuthenticated(true);
      
      toast.success('Google login successful! 🎉');
      return { success: true, user: userData };
    } catch (err) {
      const message = err.message || 'Google login failed';
      setError(message);
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
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

  /**
   * Update user profile
   * @param {Object} userData - User data to update
   * @returns {Promise<Object>} Update result
   */
  const updateUser = async (userData) => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }
      
      const updatedUser = { ...user, ...userData };
      
      // Update in localStorage
      storage.set('user', updatedUser);
      
      // Update in registered users list if exists
      const savedUsers = storage.get('registered_users') || [];
      const updatedUsers = savedUsers.map(u => {
        if (u.email === user.email) {
          return { ...u, ...userData };
        }
        return u;
      });
      storage.set('registered_users', updatedUsers);
      
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      return { success: true, user: updatedUser };
    } catch (error) {
      const message = error.message || 'Failed to update profile';
      toast.error(message);
      return { success: false, message };
    }
  };

  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Result
   */
  const changePassword = async (currentPassword, newPassword) => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }
      if (!currentPassword || !newPassword) {
        throw new Error('Please fill in all fields');
      }
      if (newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      if (currentPassword === newPassword) {
        throw new Error('New password must be different from current password');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update in registered users list
      const savedUsers = storage.get('registered_users') || [];
      const updatedUsers = savedUsers.map(u => {
        if (u.email === user.email) {
          return { ...u, password: newPassword };
        }
        return u;
      });
      storage.set('registered_users', updatedUsers);
      
      toast.success('Password changed successfully!');
      return { success: true };
    } catch (error) {
      const message = error.message || 'Failed to change password';
      toast.error(message);
      return { success: false, message };
    }
  };

  /**
   * Forgot password - send reset link
   * @param {string} email - User email
   * @returns {Promise<Object>} Result
   */
  const forgotPassword = async (email) => {
    try {
      if (!email) {
        throw new Error('Please enter your email');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      const savedUsers = storage.get('registered_users') || [];
      const userExists = savedUsers.some(u => u.email === email.toLowerCase());
      
      if (!userExists && email !== MOCK_USERS.ADMIN.email && 
          email !== MOCK_USERS.CUSTOMER.email && 
          email !== MOCK_USERS.RESTAURANT_OWNER.email && 
          email !== MOCK_USERS.DELIVERY_PARTNER.email) {
        // Still return success for security (don't reveal if user exists)
        toast.info('If an account exists, a reset link has been sent.');
        return { success: true };
      }
      
      toast.success('Password reset link sent to your email!');
      return { success: true };
    } catch (error) {
      const message = error.message || 'Failed to send reset link';
      toast.error(message);
      return { success: false, message };
    }
  };

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Result
   */
  const resetPassword = async (token, newPassword) => {
    try {
      if (!token) {
        throw new Error('Invalid reset token');
      }
      if (!newPassword || newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Password reset successfully! You can now login.');
      return { success: true };
    } catch (error) {
      const message = error.message || 'Failed to reset password';
      toast.error(message);
      return { success: false, message };
    }
  };

  // ============================================
  // HELPER METHODS
  // ============================================

  /**
   * Get user role
   * @returns {string} User role
   */
  const getUserRole = () => {
    return user?.role || 'customer';
  };

  /**
   * Check if user is admin
   * @returns {boolean} True if admin
   */
  const isAdmin = () => {
    return user?.isAdmin === true || user?.role === 'admin';
  };

  /**
   * Check if user is restaurant owner
   * @returns {boolean} True if restaurant owner
   */
  const isRestaurantOwner = () => {
    return user?.role === 'restaurant_owner';
  };

  /**
   * Check if user is delivery partner
   * @returns {boolean} True if delivery partner
   */
  const isDeliveryPartner = () => {
    return user?.role === 'delivery_partner';
  };

  /**
   * Check if user is customer
   * @returns {boolean} True if customer
   */
  const isCustomer = () => {
    return user?.role === 'customer';
  };

  /**
   * Check authentication status
   * @returns {boolean} True if authenticated
   */
  const checkAuth = () => {
    return !!user && !!storage.get('token');
  };

  /**
   * Get user display name
   * @returns {string} User name
   */
  const getUserName = () => {
    return user?.name || 'User';
  };

  /**
   * Get user email
   * @returns {string} User email
   */
  const getUserEmail = () => {
    return user?.email || '';
  };

  /**
   * Get user avatar
   * @returns {string} Avatar URL
   */
  const getUserAvatar = () => {
    return user?.avatar || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100';
  };

  /**
   * Get user full name with role
   * @returns {string} Display name with role
   */
  const getUserDisplayName = () => {
    if (!user) return 'Guest';
    const roleLabels = {
      admin: '👑 Admin',
      restaurant_owner: '🍽️ Restaurant Owner',
      delivery_partner: '🚚 Delivery Partner',
      customer: '👤 Customer',
    };
    return `${user.name} (${roleLabels[user.role] || user.role})`;
  };

  // ============================================
  // CONTEXT VALUE
  // ============================================

  const value = {
    // State
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    isAuthenticated,
    setIsAuthenticated,
    initialized,

    // Auth methods
    login,
    register,
    googleAuth,
    logout,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,

    // Helper methods
    getUserRole,
    isAdmin,
    isRestaurantOwner,
    isDeliveryPartner,
    isCustomer,
    checkAuth,
    getUserName,
    getUserEmail,
    getUserAvatar,
    getUserDisplayName,
    isLoggedIn: checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default AuthProvider;