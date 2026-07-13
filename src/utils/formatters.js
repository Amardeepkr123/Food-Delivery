// src/utils/formatters.js

// ============================================
// CURRENCY FORMATTERS
// ============================================

/**
 * Format currency amount
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00';
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

/**
 * Format currency without symbol
 * @param {number} amount - The amount to format
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted number string
 */
export const formatCurrencyWithoutSymbol = (amount, locale = 'en-US') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0.00';
  }

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @param {string} symbol - Currency symbol (default: '$')
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, symbol = '$') => {
  if (price === null || price === undefined || isNaN(price)) {
    return `${symbol}0.00`;
  }

  return `${symbol}${price.toFixed(2)}`;
};

/**
 * Format discount percentage
 * @param {number} discount - Discount percentage
 * @returns {string} Formatted discount string
 */
export const formatDiscount = (discount) => {
  if (discount === null || discount === undefined || isNaN(discount)) {
    return '0% OFF';
  }

  return `${Math.round(discount)}% OFF`;
};

// ============================================
// DATE FORMATTERS
// ============================================

/**
 * Format date
 * @param {string|Date} date - Date to format
 * @param {string} format - Format style (default: 'full')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'full', locale = 'en-US') => {
  if (!date) return 'N/A';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const options = {
    full: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    numeric: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
    dateTime: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
    dateTimeShort: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
    time: {
      hour: '2-digit',
      minute: '2-digit',
    },
    timeWithSeconds: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
    relative: {},
  };

  const formatOptions = options[format] || options.full;

  if (format === 'relative') {
    return formatRelativeTime(dateObj);
  }

  const formatter = new Intl.DateTimeFormat(locale, formatOptions);
  return formatter.format(dateObj);
};

/**
 * Format time
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted time string
 */
export const formatTime = (date, locale = 'en-US') => {
  if (!date) return 'N/A';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Time';
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return formatter.format(dateObj);
};

/**
 * Format time with seconds
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted time string
 */
export const formatTimeWithSeconds = (date, locale = 'en-US') => {
  if (!date) return 'N/A';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Time';
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return formatter.format(dateObj);
};

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return 'N/A';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  // Past
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  }
};

/**
 * Format date range
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate, locale = 'en-US') => {
  if (!startDate || !endDate) return 'N/A';

  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid Date Range';
  }

  const sameDay = start.getDate() === end.getDate() &&
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  if (sameDay) {
    return `${formatDate(start, 'short', locale)} ${formatTime(start, locale)} - ${formatTime(end, locale)}`;
  }

  return `${formatDate(start, 'short', locale)} - ${formatDate(end, 'short', locale)}`;
};

/**
 * Get time ago in short format
 * @param {string|Date} date - Date to format
 * @returns {string} Short time ago string
 */
export const timeAgoShort = (date) => {
  if (!date) return 'N/A';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else if (diffInDays < 30) {
    return `${diffInDays}d`;
  } else {
    return formatDate(dateObj, 'short');
  }
};

// ============================================
// NUMBER FORMATTERS
// ============================================

/**
 * Format number with commas
 * @param {number} number - Number to format
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted number string
 */
export const formatNumber = (number, locale = 'en-US') => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(number);
};

/**
 * Format decimal number
 * @param {number} number - Number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted decimal string
 */
export const formatDecimal = (number, decimals = 2, locale = 'en-US') => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0.00';
  }

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(number);
};

/**
 * Format percentage
 * @param {number} value - Percentage value
 * @param {number} decimals - Number of decimal places (default: 1)
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1, locale = 'en-US') => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(value / 100);
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted file size string
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  if (bytes === null || bytes === undefined || isNaN(bytes)) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format phone number
 * @param {string} phone - Phone number to format
 * @param {string} countryCode - Country code (default: 'US')
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone, countryCode = 'US') => {
  if (!phone) return 'N/A';

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  if (countryCode === 'US' || countryCode === 'CA') {
    // US/Canada: (XXX) XXX-XXXX
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
    }
  } else if (countryCode === 'IN') {
    // India: XXXXX-XXXXX
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 10)}`;
    }
  }

  // Default: return as is with limited formatting
  return cleaned;
};

/**
 * Format mobile number with country code
 * @param {string} phone - Phone number
 * @param {string} countryCode - Country code (default: '+1')
 * @returns {string} Formatted mobile number
 */
export const formatMobileNumber = (phone, countryCode = '+1') => {
  if (!phone) return 'N/A';

  const cleaned = phone.replace(/\D/g, '');
  return `${countryCode} ${cleaned}`;
};

// ============================================
// TEXT FORMATTERS
// ============================================

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50, suffix = '...') => {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).trim() + suffix;
};

/**
 * Capitalize first letter of string
 * @param {string} string - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

/**
 * Capitalize first letter of each word
 * @param {string} string - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (string) => {
  if (!string) return '';
  return string
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

/**
 * Convert to title case
 * @param {string} string - String to convert
 * @returns {string} Title case string
 */
export const toTitleCase = (string) => {
  if (!string) return '';

  const exceptions = ['and', 'or', 'but', 'for', 'nor', 'on', 'at', 'to', 'by', 'in', 'of', 'with'];

  return string
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0 || !exceptions.includes(word)) {
        return capitalize(word);
      }
      return word;
    })
    .join(' ');
};

/**
 * Convert to kebab case
 * @param {string} string - String to convert
 * @returns {string} Kebab case string
 */
export const toKebabCase = (string) => {
  if (!string) return '';
  return string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, '-');
};

/**
 * Convert to snake case
 * @param {string} string - String to convert
 * @returns {string} Snake case string
 */
export const toSnakeCase = (string) => {
  if (!string) return '';
  return string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, '_');
};

/**
 * Convert to camel case
 * @param {string} string - String to convert
 * @returns {string} Camel case string
 */
export const toCamelCase = (string) => {
  if (!string) return '';
  return string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .trim()
    .replace(/\s+(\w)/g, (_, char) => char.toUpperCase())
    .replace(/\s/g, '');
};

/**
 * Convert to Pascal case
 * @param {string} string - String to convert
 * @returns {string} Pascal case string
 */
export const toPascalCase = (string) => {
  if (!string) return '';
  const camel = toCamelCase(string);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
};

/**
 * Format slug for URLs
 * @param {string} string - String to slugify
 * @returns {string} Slugified string
 */
export const slugify = (string) => {
  if (!string) return '';
  return string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @param {number} maxInitials - Maximum number of initials (default: 2)
 * @returns {string} Initials
 */
export const getInitials = (name, maxInitials = 2) => {
  if (!name) return '';

  const words = name.trim().split(' ');
  const initials = words
    .slice(0, maxInitials)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  return initials || '';
};

/**
 * Format address
 * @param {Object} address - Address object
 * @param {string} address.address - Street address
 * @param {string} address.city - City
 * @param {string} address.state - State
 * @param {string} address.pincode - Pincode
 * @param {string} address.country - Country
 * @returns {string} Formatted address
 */
export const formatAddress = (address) => {
  if (!address) return 'N/A';

  const parts = [];

  if (address.address) parts.push(address.address);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.pincode) parts.push(address.pincode);
  if (address.country) parts.push(address.country);

  return parts.join(', ');
};

/**
 * Format address for display (short)
 * @param {Object} address - Address object
 * @returns {string} Short formatted address
 */
export const formatAddressShort = (address) => {
  if (!address) return 'N/A';

  const parts = [];

  if (address.address) parts.push(address.address);
  if (address.city) parts.push(address.city);

  return parts.join(', ');
};

// ============================================
// ORDER FORMATTERS
// ============================================

/**
 * Format order status
 * @param {string} status - Order status
 * @param {Object} statusMap - Status mapping object
 * @returns {string} Formatted status
 */
export const formatOrderStatus = (status, statusMap) => {
  if (!status) return 'Unknown';
  return statusMap?.[status] || status;
};

/**
 * Format order ID
 * @param {string} orderId - Order ID
 * @param {string} prefix - Prefix (default: 'ORD')
 * @returns {string} Formatted order ID
 */
export const formatOrderId = (orderId, prefix = 'ORD') => {
  if (!orderId) return 'N/A';
  return `${prefix}-${orderId}`;
};

/**
 * Format transaction ID
 * @param {string} transactionId - Transaction ID
 * @param {string} prefix - Prefix (default: 'TXN')
 * @returns {string} Formatted transaction ID
 */
export const formatTransactionId = (transactionId, prefix = 'TXN') => {
  if (!transactionId) return 'N/A';
  return `${prefix}-${transactionId}`;
};

// ============================================
// PAYMENT FORMATTERS
// ============================================

/**
 * Format payment method
 * @param {string} method - Payment method
 * @param {Object} methodMap - Method mapping object
 * @returns {string} Formatted payment method
 */
export const formatPaymentMethod = (method, methodMap) => {
  if (!method) return 'Unknown';
  return methodMap?.[method] || method;
};

/**
 * Format card number (masked)
 * @param {string} cardNumber - Card number
 * @returns {string} Masked card number
 */
export const formatMaskedCardNumber = (cardNumber) => {
  if (!cardNumber) return '•••• •••• •••• ••••';

  const cleaned = cardNumber.replace(/\s/g, '');
  const lastFour = cleaned.slice(-4);
  const masked = '•••• •••• •••• ' + lastFour;

  return masked;
};

/**
 * Format card expiry
 * @param {string} expiry - Expiry date (MM/YY)
 * @returns {string} Formatted expiry
 */
export const formatCardExpiry = (expiry) => {
  if (!expiry) return '';

  const cleaned = expiry.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
};

// ============================================
// RATING FORMATTERS
// ============================================

/**
 * Format rating
 * @param {number} rating - Rating value
 * @param {number} maxRating - Maximum rating (default: 5)
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted rating
 */
export const formatRating = (rating, maxRating = 5, decimals = 1) => {
  if (rating === null || rating === undefined || isNaN(rating)) {
    return `0.0 (${maxRating})`;
  }

  const formatted = rating.toFixed(decimals);
  return `${formatted} (${maxRating})`;
};

/**
 * Format star rating
 * @param {number} rating - Rating value
 * @param {number} maxStars - Maximum stars (default: 5)
 * @returns {string} Star rating string
 */
export const formatStarRating = (rating, maxStars = 5) => {
  if (rating === null || rating === undefined || isNaN(rating)) {
    return '☆☆☆☆☆';
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];
  stars.push('★'.repeat(fullStars));
  if (hasHalfStar) stars.push('½');
  stars.push('☆'.repeat(emptyStars));

  return stars.join('');
};

// ============================================
// DISTANCE FORMATTERS
// ============================================

/**
 * Format distance
 * @param {number} distance - Distance in kilometers
 * @param {string} unit - Unit ('km' or 'mi') (default: 'km')
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted distance
 */
export const formatDistance = (distance, unit = 'km', decimals = 1) => {
  if (distance === null || distance === undefined || isNaN(distance)) {
    return '0 km';
  }

  const formatted = distance.toFixed(decimals);
  return `${formatted} ${unit}`;
};

/**
 * Format duration (time)
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration
 */
export const formatDuration = (minutes) => {
  if (minutes === null || minutes === undefined || isNaN(minutes)) {
    return '0 min';
  }

  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);

  if (remainingMinutes === 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }

  return `${hours} hr ${remainingMinutes} min`;
};

// ============================================
// WEIGHT FORMATTERS
// ============================================

/**
 * Format weight
 * @param {number} weight - Weight in grams
 * @param {string} unit - Unit ('g' or 'kg') (default: 'g')
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted weight
 */
export const formatWeight = (weight, unit = 'g', decimals = 0) => {
  if (weight === null || weight === undefined || isNaN(weight)) {
    return `0 ${unit}`;
  }

  let formattedWeight = weight;
  let displayUnit = unit;

  if (unit === 'kg' && weight >= 1000) {
    formattedWeight = weight / 1000;
    displayUnit = 'kg';
  } else if (unit === 'g' && weight >= 1000) {
    formattedWeight = weight / 1000;
    displayUnit = 'kg';
  }

  return `${formattedWeight.toFixed(decimals)} ${displayUnit}`;
};

// ============================================
// EXPORT ALL FORMATTERS
// ============================================

const formatters = {
  // Currency
  formatCurrency,
  formatCurrencyWithoutSymbol,
  formatPrice,
  formatDiscount,

  // Date
  formatDate,
  formatTime,
  formatTimeWithSeconds,
  formatRelativeTime,
  formatDateRange,
  timeAgoShort,

  // Number
  formatNumber,
  formatDecimal,
  formatPercentage,
  formatFileSize,

  // Phone
  formatPhoneNumber,
  formatMobileNumber,

  // Text
  truncateText,
  capitalize,
  capitalizeWords,
  toTitleCase,
  toKebabCase,
  toSnakeCase,
  toCamelCase,
  toPascalCase,
  slugify,
  getInitials,

  // Address
  formatAddress,
  formatAddressShort,

  // Order
  formatOrderStatus,
  formatOrderId,
  formatTransactionId,

  // Payment
  formatPaymentMethod,
  formatMaskedCardNumber,
  formatCardExpiry,

  // Rating
  formatRating,
  formatStarRating,

  // Distance & Duration
  formatDistance,
  formatDuration,

  // Weight
  formatWeight,
};

export default formatters;