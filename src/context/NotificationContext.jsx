// src/context/NotificationContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';

const NotificationContext = createContext(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }
  return context;
};

// Toast configuration presets
const toastConfigs = {
  success: {
    icon: '✅',
    style: {
      background: '#10b981',
      color: '#ffffff',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
    },
    autoClose: 3000,
  },
  error: {
    icon: '❌',
    style: {
      background: '#ef4444',
      color: '#ffffff',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 10px 40px rgba(239, 68, 68, 0.3)',
    },
    autoClose: 4000,
  },
  warning: {
    icon: '⚠️',
    style: {
      background: '#f59e0b',
      color: '#ffffff',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 10px 40px rgba(245, 158, 11, 0.3)',
    },
    autoClose: 3500,
  },
  info: {
    icon: 'ℹ️',
    style: {
      background: '#3b82f6',
      color: '#ffffff',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
    },
    autoClose: 3000,
  },
  loading: {
    icon: '⏳',
    style: {
      background: '#6b7280',
      color: '#ffffff',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 10px 40px rgba(107, 114, 128, 0.3)',
    },
    autoClose: false,
  },
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Show toast notification
  const showNotification = useCallback((message, type = 'info', options = {}) => {
    const config = toastConfigs[type] || toastConfigs.info;
    
    const toastOptions = {
      position: options.position || 'top-right',
      autoClose: options.duration || config.autoClose,
      hideProgressBar: options.hideProgressBar || false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: options.icon || config.icon,
      style: { ...config.style, ...options.style },
      className: options.className || '',
      ...options,
    };

    // Show toast based on type
    switch (type) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'warning':
        toast.warning(message, toastOptions);
        break;
      case 'info':
      default:
        toast.info(message, toastOptions);
        break;
    }

    // Store notification in state
    const newNotification = {
      id: Date.now(),
      message,
      type,
      read: false,
      timestamp: new Date().toISOString(),
      options,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto-mark as read after autoClose
    if (toastOptions.autoClose !== false && toastOptions.autoClose !== Infinity) {
      setTimeout(() => {
        markAsRead(newNotification.id);
      }, toastOptions.autoClose + 500);
    }
  }, []);

  // Show loading notification
  const showLoading = useCallback((message = 'Loading...') => {
    setIsLoading(true);
    const loadingId = toast.loading(message, {
      position: 'top-right',
      style: {
        background: '#6b7280',
        color: '#ffffff',
        borderRadius: '12px',
        padding: '16px 20px',
      },
      icon: '⏳',
    });
    return loadingId;
  }, []);

  // Hide loading notification
  const hideLoading = useCallback((loadingId) => {
    setIsLoading(false);
    if (loadingId) {
      toast.dismiss(loadingId);
    }
  }, []);

  // Show success with custom action
  const showSuccess = useCallback((message, action = null) => {
    if (action) {
      toast.success(message, {
        autoClose: 4000,
        icon: '✅',
        style: {
          background: '#10b981',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '16px 20px',
          boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
        },
        onClick: action.onClick || (() => {}),
      });
    } else {
      toast.success(message, {
        autoClose: 3000,
        icon: '✅',
        style: {
          background: '#10b981',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '16px 20px',
          boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
        },
      });
    }
    
    const newNotification = {
      id: Date.now(),
      message,
      type: 'success',
      read: false,
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  // Show error with retry option
  const showError = useCallback((message, retry = null) => {
    const toastOptions = {
      autoClose: 5000,
      icon: '❌',
      style: {
        background: '#ef4444',
        color: '#ffffff',
        borderRadius: '12px',
        padding: '16px 20px',
        boxShadow: '0 10px 40px rgba(239, 68, 68, 0.3)',
      },
    };

    if (retry) {
      toast.error(message, {
        ...toastOptions,
        onClick: retry,
      });
    } else {
      toast.error(message, toastOptions);
    }
    
    const newNotification = {
      id: Date.now(),
      message,
      type: 'error',
      read: false,
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    toast.dismiss();
    setNotifications([]);
  }, []);

  // Mark a single notification as read
  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  }, []);

  // Delete a single notification
  const deleteNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  // Delete all read notifications
  const deleteReadNotifications = useCallback(() => {
    setNotifications(prev => prev.filter(notif => !notif.read));
  }, []);

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Get notification by type
  const getNotificationsByType = useCallback((type) => {
    return notifications.filter(n => n.type === type);
  }, [notifications]);

  // Show confirmation toast with actions
  const showConfirmation = useCallback((message, onConfirm, onCancel) => {
    toast.info(message, {
      autoClose: false,
      position: 'top-center',
      closeOnClick: false,
      draggable: false,
      style: {
        background: 'white',
        color: '#1f2937',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        minWidth: '300px',
      },
      icon: '❓',
    });
  }, []);

  const value = {
    // State
    notifications,
    unreadCount,
    isLoading,
    
    // Basic methods
    showNotification,
    showSuccess,
    showError,
    showLoading,
    hideLoading,
    showConfirmation,
    
    // Management methods
    clearNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteReadNotifications,
    getNotificationsByType,
    
    // Toast shortcuts
    success: (msg, opts) => showNotification(msg, 'success', opts),
    error: (msg, opts) => showNotification(msg, 'error', opts),
    warning: (msg, opts) => showNotification(msg, 'warning', opts),
    info: (msg, opts) => showNotification(msg, 'info', opts),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;