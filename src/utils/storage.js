// src/utils/storage.js

// ============================================
// STORAGE UTILITY
// ============================================

/**
 * Storage utility with enhanced features including:
 * - Expiration support
 * - Encryption support
 * - Session storage support
 * - Error handling
 * - Type safety
 */
export const storage = {
  /**
   * Get item from localStorage with optional decryption
   * @param {string} key - Storage key
   * @param {Object} options - Options
   * @param {boolean} options.encrypted - Whether data is encrypted
   * @param {*} options.defaultValue - Default value if key not found
   * @returns {*} Parsed value or null
   */
  get(key, options = {}) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return options.defaultValue || null;

      // Check if item has expiration
      const parsed = JSON.parse(item);
      
      // Handle encrypted data
      if (options.encrypted) {
        return this.decrypt(parsed);
      }

      // Check expiration
      if (parsed.expiry && Date.now() > parsed.expiry) {
        this.remove(key);
        return options.defaultValue || null;
      }

      return parsed.value !== undefined ? parsed.value : parsed;
    } catch (error) {
      console.error('Storage get error:', error);
      return options.defaultValue || null;
    }
  },

  /**
   * Set item to localStorage with optional encryption and expiration
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @param {Object} options - Options
   * @param {number} options.expiry - Expiry time in milliseconds
   * @param {boolean} options.encrypted - Whether to encrypt data
   */
  set(key, value, options = {}) {
    try {
      let data = value;

      // Handle encryption
      if (options.encrypted) {
        data = this.encrypt(value);
      }

      // Handle expiration
      if (options.expiry) {
        data = {
          value: data,
          expiry: Date.now() + options.expiry,
        };
      }

      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  remove(key) {
    localStorage.removeItem(key);
  },

  /**
   * Clear all localStorage
   */
  clear() {
    localStorage.clear();
  },

  /**
   * Check if key exists in localStorage
   * @param {string} key - Storage key
   * @returns {boolean} True if key exists
   */
  has(key) {
    return localStorage.getItem(key) !== null;
  },

  /**
   * Get all keys from localStorage
   * @returns {string[]} Array of keys
   */
  keys() {
    return Object.keys(localStorage);
  },

  /**
   * Get all items from localStorage
   * @returns {Object} All key-value pairs
   */
  getAll() {
    const items = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        items[key] = this.get(key);
      }
    }
    return items;
  },

  /**
   * Get item size in bytes
   * @param {string} key - Storage key
   * @returns {number} Size in bytes
   */
  getSize(key) {
    const item = localStorage.getItem(key);
    return item ? new Blob([item]).size : 0;
  },

  /**
   * Get total storage usage in bytes
   * @returns {number} Total size in bytes
   */
  getTotalSize() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        total += this.getSize(key);
      }
    }
    return total;
  },

  /**
   * Check if storage is available
   * @returns {boolean} True if storage is available
   */
  isAvailable() {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Get remaining storage space in bytes
   * @returns {number} Remaining space in bytes
   */
  getRemainingSpace() {
    try {
      const maxSize = 5 * 1024 * 1024; // 5MB (typical localStorage limit)
      const used = this.getTotalSize();
      return Math.max(0, maxSize - used);
    } catch (e) {
      return 0;
    }
  },

  /**
   * Simple encryption (Base64 encoding)
   * @param {*} data - Data to encrypt
   * @returns {string} Encrypted data
   */
  encrypt(data) {
    try {
      const str = JSON.stringify(data);
      return btoa(encodeURIComponent(str));
    } catch (e) {
      console.error('Encryption error:', e);
      return data;
    }
  },

  /**
   * Simple decryption (Base64 decoding)
   * @param {string} encrypted - Encrypted data
   * @returns {*} Decrypted data
   */
  decrypt(encrypted) {
    try {
      const str = decodeURIComponent(atob(encrypted));
      return JSON.parse(str);
    } catch (e) {
      console.error('Decryption error:', e);
      return encrypted;
    }
  },

  // ============================================
  // SESSION STORAGE METHODS
  // ============================================

  /**
   * Get item from sessionStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key not found
   * @returns {*} Parsed value or null
   */
  sessionGet(key, defaultValue = null) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Session get error:', error);
      return defaultValue;
    }
  },

  /**
   * Set item to sessionStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   */
  sessionSet(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Session set error:', error);
    }
  },

  /**
   * Remove item from sessionStorage
   * @param {string} key - Storage key
   */
  sessionRemove(key) {
    sessionStorage.removeItem(key);
  },

  /**
   * Clear all sessionStorage
   */
  sessionClear() {
    sessionStorage.clear();
  },

  // ============================================
  // COOKIE METHODS
  // ============================================

  /**
   * Get cookie value
   * @param {string} name - Cookie name
   * @returns {string|null} Cookie value
   */
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  },

  /**
   * Set cookie
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value
   * @param {Object} options - Cookie options
   * @param {number} options.days - Days until expiry
   * @param {string} options.path - Cookie path
   * @param {string} options.domain - Cookie domain
   * @param {boolean} options.secure - Secure flag
   * @param {boolean} options.httpOnly - HttpOnly flag (server-side only)
   * @param {string} options.sameSite - SameSite attribute
   */
  setCookie(name, value, options = {}) {
    try {
      let cookieString = `${name}=${encodeURIComponent(value)}`;

      if (options.days) {
        const date = new Date();
        date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
        cookieString += `; expires=${date.toUTCString()}`;
      }

      if (options.path) {
        cookieString += `; path=${options.path}`;
      }

      if (options.domain) {
        cookieString += `; domain=${options.domain}`;
      }

      if (options.secure) {
        cookieString += '; secure';
      }

      if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
      }

      document.cookie = cookieString;
    } catch (error) {
      console.error('Cookie set error:', error);
    }
  },

  /**
   * Delete cookie
   * @param {string} name - Cookie name
   * @param {string} path - Cookie path
   */
  deleteCookie(name, path = '/') {
    this.setCookie(name, '', { days: -1, path });
  },

  // ============================================
  // STORAGE EVENT LISTENERS
  // ============================================

  /**
   * Listen for storage changes
   * @param {string} key - Storage key to listen to
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  listen(key, callback) {
    const handler = (event) => {
      if (event.key === key) {
        callback(event.oldValue, event.newValue);
      }
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  },

  /**
   * Listen for all storage changes
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  listenAll(callback) {
    const handler = (event) => {
      callback(event.key, event.oldValue, event.newValue);
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  },

  // ============================================
  // BATCH OPERATIONS
  // ============================================

  /**
   * Set multiple items at once
   * @param {Object} items - Key-value pairs to set
   * @param {Object} options - Options (same as set)
   */
  setMultiple(items, options = {}) {
    try {
      for (const [key, value] of Object.entries(items)) {
        this.set(key, value, options);
      }
    } catch (error) {
      console.error('Set multiple error:', error);
    }
  },

  /**
   * Get multiple items at once
   * @param {string[]} keys - Keys to retrieve
   * @param {Object} options - Options (same as get)
   * @returns {Object} Key-value pairs
   */
  getMultiple(keys, options = {}) {
    const result = {};
    for (const key of keys) {
      result[key] = this.get(key, options);
    }
    return result;
  },

  /**
   * Remove multiple items at once
   * @param {string[]} keys - Keys to remove
   */
  removeMultiple(keys) {
    for (const key of keys) {
      this.remove(key);
    }
  },

  // ============================================
  // STORAGE MIGRATION
  // ============================================

  /**
   * Migrate data from one key to another
   * @param {string} oldKey - Old storage key
   * @param {string} newKey - New storage key
   * @param {Object} options - Options (same as get/set)
   * @returns {boolean} True if migration was successful
   */
  migrate(oldKey, newKey, options = {}) {
    try {
      const data = this.get(oldKey, options);
      if (data !== null) {
        this.set(newKey, data, options);
        this.remove(oldKey);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Migration error:', error);
      return false;
    }
  },

  // ============================================
  // STORAGE BACKUP
  // ============================================

  /**
   * Create a backup of localStorage
   * @param {string[]} keys - Specific keys to backup (optional)
   * @returns {Object} Backup data
   */
  createBackup(keys = null) {
    try {
      const backup = {
        timestamp: new Date().toISOString(),
        data: {},
      };

      const storageKeys = keys || this.keys();
      for (const key of storageKeys) {
        backup.data[key] = this.get(key);
      }

      return backup;
    } catch (error) {
      console.error('Backup creation error:', error);
      return null;
    }
  },

  /**
   * Restore from backup
   * @param {Object} backup - Backup data
   * @param {boolean} clearExisting - Clear existing data before restore
   * @returns {boolean} True if restore was successful
   */
  restoreBackup(backup, clearExisting = false) {
    try {
      if (clearExisting) {
        this.clear();
      }

      for (const [key, value] of Object.entries(backup.data)) {
        this.set(key, value);
      }

      return true;
    } catch (error) {
      console.error('Restore error:', error);
      return false;
    }
  },

  // ============================================
  // STORAGE CLEANUP
  // ============================================

  /**
   * Clean expired items from localStorage
   * @returns {number} Number of items removed
   */
  cleanExpired() {
    let removed = 0;
    const keys = this.keys();

    for (const key of keys) {
      const item = this.get(key, { raw: true });
      if (item && item.expiry && Date.now() > item.expiry) {
        this.remove(key);
        removed++;
      }
    }

    return removed;
  },

  /**
   * Clean storage by prefix
   * @param {string} prefix - Key prefix to clean
   * @returns {number} Number of items removed
   */
  cleanByPrefix(prefix) {
    let removed = 0;
    const keys = this.keys();

    for (const key of keys) {
      if (key.startsWith(prefix)) {
        this.remove(key);
        removed++;
      }
    }

    return removed;
  },

  // ============================================
  // STORAGE STATISTICS
  // ============================================

  /**
   * Get storage statistics
   * @returns {Object} Storage statistics
   */
  getStats() {
    const keys = this.keys();
    const totalSize = this.getTotalSize();

    return {
      available: this.isAvailable(),
      totalKeys: keys.length,
      totalSize: totalSize,
      totalSizeFormatted: this.formatBytes(totalSize),
      remainingSpace: this.getRemainingSpace(),
      remainingSpaceFormatted: this.formatBytes(this.getRemainingSpace()),
      keys: keys,
    };
  },

  /**
   * Format bytes to human readable format
   * @param {number} bytes - Bytes to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted string
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
};

// ============================================
// STORAGE KEYS CONSTANTS
// ============================================

export const STORAGE_KEYS = {
  // Auth
  TOKEN: 'food_delivery_token',
  REFRESH_TOKEN: 'food_delivery_refresh_token',
  USER: 'food_delivery_user',
  USER_ROLE: 'food_delivery_user_role',
  
  // Theme & Preferences
  THEME: 'food_delivery_theme',
  LANGUAGE: 'food_delivery_language',
  CURRENCY: 'food_delivery_currency',
  
  // Cart
  CART: 'food_delivery_cart',
  CART_ITEMS: 'food_delivery_cart_items',
  CART_RESTAURANT: 'food_delivery_cart_restaurant',
  
  // Orders
  PENDING_ORDER: 'food_delivery_pending_order',
  ORDER_GRAND_TOTAL: 'food_delivery_order_grand_total',
  ORDER_HISTORY: 'food_delivery_order_history',
  
  // Location
  LOCATION: 'food_delivery_location',
  SAVED_ADDRESSES: 'food_delivery_saved_addresses',
  
  // Favorites
  FAVORITES: 'food_delivery_favorites',
  RECENT_RESTAURANTS: 'food_delivery_recent_restaurants',
  
  // Notifications
  NOTIFICATIONS: 'food_delivery_notifications',
  PUSH_TOKEN: 'food_delivery_push_token',
  
  // Session
  SESSION_ID: 'food_delivery_session_id',
  DEVICE_ID: 'food_delivery_device_id',
  LAST_ACTIVITY: 'food_delivery_last_activity',
  
  // Remember Me
  REMEMBER_ME: 'food_delivery_remember',
  REMEMBERED_EMAIL: 'food_delivery_remembered_email',
};

// ============================================
// SESSION STORAGE KEYS
// ============================================

export const SESSION_KEYS = {
  CHECKOUT_DATA: 'checkout_data',
  PAYMENT_DATA: 'payment_data',
  ORDER_CONFIRMATION: 'order_confirmation',
  TEMP_USER: 'temp_user',
  REDIRECT_URL: 'redirect_url',
};

// ============================================
// COOKIE KEYS
// ============================================

export const COOKIE_KEYS = {
  SESSION: 'session_id',
  DEVICE: 'device_id',
  PREFERENCE: 'preference',
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default storage;