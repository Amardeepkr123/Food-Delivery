// src/utils/validators.js

// ============================================
// EMAIL VALIDATION
// ============================================

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const validateEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate email with additional checks
 * @param {string} email - Email to validate
 * @returns {Object} Validation result
 */
export const validateEmailDetailed = (email) => {
  if (!email) {
    return { valid: false, message: 'Email is required' };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Please enter a valid email address' };
  }

  // Check for common domains
  const domain = email.split('@')[1];
  const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'protonmail.com'];
  
  if (!domain || domain.length < 3) {
    return { valid: false, message: 'Invalid email domain' };
  }

  return { valid: true, message: 'Valid email address' };
};

// ============================================
// PASSWORD VALIDATION
// ============================================

/**
 * Validate password (minimum 8 characters)
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid
 */
export const validatePassword = (password) => {
  if (!password) return false;
  return password.length >= 8;
};

/**
 * Validate password with strength check
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with strength
 */
export const validatePasswordDetailed = (password) => {
  if (!password) {
    return { 
      valid: false, 
      message: 'Password is required',
      strength: 'none',
      score: 0,
    };
  }

  let score = 0;
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Calculate score
  if (checks.length) score++;
  if (checks.uppercase) score++;
  if (checks.lowercase) score++;
  if (checks.numbers) score++;
  if (checks.special) score++;

  let strength = 'weak';
  let message = 'Password is weak';

  if (score >= 4) {
    strength = 'strong';
    message = 'Password is strong';
  } else if (score >= 3) {
    strength = 'medium';
    message = 'Password is medium strength';
  } else if (score >= 2) {
    strength = 'weak';
    message = 'Password is weak';
  }

  if (!checks.length) {
    message = 'Password must be at least 8 characters';
  } else if (!checks.uppercase) {
    message = 'Password must contain at least one uppercase letter';
  } else if (!checks.lowercase) {
    message = 'Password must contain at least one lowercase letter';
  } else if (!checks.numbers) {
    message = 'Password must contain at least one number';
  } else if (!checks.special) {
    message = 'Password must contain at least one special character';
  }

  return {
    valid: score >= 3,
    message,
    strength,
    score,
    checks,
  };
};

/**
 * Check password strength
 * @param {string} password - Password to check
 * @returns {string} Strength level
 */
export const getPasswordStrength = (password) => {
  if (!password) return 'none';
  
  const result = validatePasswordDetailed(password);
  return result.strength;
};

/**
 * Get password strength color
 * @param {string} password - Password to check
 * @returns {string} Color code
 */
export const getPasswordStrengthColor = (password) => {
  const strength = getPasswordStrength(password);
  const colors = {
    none: 'gray',
    weak: 'red',
    medium: 'orange',
    strong: 'green',
  };
  return colors[strength] || 'gray';
};

// ============================================
// PHONE VALIDATION
// ============================================

/**
 * Validate phone number (10 digits)
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if valid
 */
export const validatePhone = (phone) => {
  if (!phone) return false;
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

/**
 * Validate phone with country code
 * @param {string} phone - Phone to validate
 * @param {string} countryCode - Country code (default: 'IN')
 * @returns {Object} Validation result
 */
export const validatePhoneDetailed = (phone, countryCode = 'IN') => {
  if (!phone) {
    return { valid: false, message: 'Phone number is required' };
  }

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  const countryPatterns = {
    IN: /^[6-9][0-9]{9}$/,
    US: /^[0-9]{10}$/,
    UK: /^[0-9]{10}$/,
    default: /^[0-9]{10}$/,
  };

  const pattern = countryPatterns[countryCode] || countryPatterns.default;

  if (!pattern.test(cleaned)) {
    return { 
      valid: false, 
      message: `Please enter a valid ${countryCode} phone number` 
    };
  }

  return { valid: true, message: 'Valid phone number' };
};

/**
 * Format phone number before validation
 * @param {string} phone - Raw phone number
 * @returns {string} Cleaned phone number
 */
export const cleanPhoneNumber = (phone) => {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
};

// ============================================
// OTP VALIDATION
// ============================================

/**
 * Validate OTP (6 digits)
 * @param {string} otp - OTP to validate
 * @returns {boolean} True if valid
 */
export const validateOTP = (otp) => {
  if (!otp) return false;
  return /^[0-9]{6}$/.test(otp);
};

/**
 * Validate OTP with detailed check
 * @param {string} otp - OTP to validate
 * @param {number} length - OTP length (default: 6)
 * @returns {Object} Validation result
 */
export const validateOTPDetailed = (otp, length = 6) => {
  if (!otp) {
    return { valid: false, message: 'OTP is required' };
  }

  const cleaned = otp.replace(/\D/g, '');
  
  if (cleaned.length !== length) {
    return { 
      valid: false, 
      message: `OTP must be ${length} digits` 
    };
  }

  if (cleaned.length === length && /^\d+$/.test(cleaned)) {
    return { valid: true, message: 'Valid OTP' };
  }

  return { valid: false, message: 'Invalid OTP format' };
};

// ============================================
// NAME VALIDATION
// ============================================

/**
 * Validate name (minimum 2 characters)
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
export const validateName = (name) => {
  if (!name) return false;
  const cleaned = name.trim();
  return cleaned.length >= 2 && /^[a-zA-Z\s'-]+$/.test(cleaned);
};

/**
 * Validate name with detailed check
 * @param {string} name - Name to validate
 * @returns {Object} Validation result
 */
export const validateNameDetailed = (name) => {
  if (!name) {
    return { valid: false, message: 'Name is required' };
  }

  const cleaned = name.trim();

  if (cleaned.length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters' };
  }

  if (cleaned.length > 50) {
    return { valid: false, message: 'Name must be less than 50 characters' };
  }

  if (!/^[a-zA-Z\s'-]+$/.test(cleaned)) {
    return { 
      valid: false, 
      message: 'Name can only contain letters, spaces, apostrophes, and hyphens' 
    };
  }

  return { valid: true, message: 'Valid name' };
};

// ============================================
// ADDRESS VALIDATION
// ============================================

/**
 * Validate address
 * @param {string} address - Address to validate
 * @returns {boolean} True if valid
 */
export const validateAddress = (address) => {
  if (!address) return false;
  return address.trim().length >= 10;
};

/**
 * Validate address with detailed check
 * @param {string} address - Address to validate
 * @returns {Object} Validation result
 */
export const validateAddressDetailed = (address) => {
  if (!address) {
    return { valid: false, message: 'Address is required' };
  }

  const cleaned = address.trim();

  if (cleaned.length < 10) {
    return { valid: false, message: 'Address must be at least 10 characters' };
  }

  if (cleaned.length > 200) {
    return { valid: false, message: 'Address must be less than 200 characters' };
  }

  return { valid: true, message: 'Valid address' };
};

// ============================================
// PINCODE VALIDATION
// ============================================

/**
 * Validate pincode
 * @param {string} pincode - Pincode to validate
 * @param {string} country - Country code (default: 'IN')
 * @returns {boolean} True if valid
 */
export const validatePincode = (pincode, country = 'IN') => {
  if (!pincode) return false;
  
  const patterns = {
    IN: /^[0-9]{6}$/,
    US: /^[0-9]{5}(-[0-9]{4})?$/,
    UK: /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/,
    default: /^[0-9]{5,6}$/,
  };

  const pattern = patterns[country] || patterns.default;
  return pattern.test(pincode.replace(/\s/g, ''));
};

/**
 * Validate pincode with detailed check
 * @param {string} pincode - Pincode to validate
 * @param {string} country - Country code (default: 'IN')
 * @returns {Object} Validation result
 */
export const validatePincodeDetailed = (pincode, country = 'IN') => {
  if (!pincode) {
    return { valid: false, message: 'Pincode is required' };
  }

  const cleaned = pincode.replace(/\s/g, '');

  const patterns = {
    IN: {
      regex: /^[0-9]{6}$/,
      message: 'Please enter a valid 6-digit pincode',
    },
    US: {
      regex: /^[0-9]{5}(-[0-9]{4})?$/,
      message: 'Please enter a valid ZIP code (5 digits or 5+4)',
    },
    UK: {
      regex: /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/,
      message: 'Please enter a valid UK postcode',
    },
    default: {
      regex: /^[0-9]{5,6}$/,
      message: 'Please enter a valid pincode (5-6 digits)',
    },
  };

  const pattern = patterns[country] || patterns.default;

  if (!pattern.regex.test(cleaned)) {
    return { valid: false, message: pattern.message };
  }

  return { valid: true, message: 'Valid pincode' };
};

// ============================================
// CARD VALIDATION
// ============================================

/**
 * Validate credit card number
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} True if valid
 */
export const validateCardNumber = (cardNumber) => {
  if (!cardNumber) return false;
  
  const cleaned = cardNumber.replace(/\s/g, '');
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validate card expiry date
 * @param {string} expiry - Expiry date (MM/YY)
 * @returns {boolean} True if valid
 */
export const validateCardExpiry = (expiry) => {
  if (!expiry) return false;

  const cleaned = expiry.replace(/\D/g, '');
  
  if (cleaned.length !== 4) return false;

  const month = parseInt(cleaned.slice(0, 2));
  const year = parseInt(cleaned.slice(2, 4));

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
};

/**
 * Validate card CVV
 * @param {string} cvv - CVV to validate
 * @returns {boolean} True if valid
 */
export const validateCardCVV = (cvv) => {
  if (!cvv) return false;
  return /^[0-9]{3,4}$/.test(cvv);
};

/**
 * Detect card type
 * @param {string} cardNumber - Card number
 * @returns {string} Card type
 */
export const detectCardType = (cardNumber) => {
  if (!cardNumber) return 'unknown';

  const cleaned = cardNumber.replace(/\s/g, '');
  
  const patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    unionpay: /^62[0-9]{14,17}$/,
    maestro: /^(?:5[0678]|6)[0-9]{12,18}$/,
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cleaned)) {
      return type;
    }
  }

  return 'unknown';
};

// ============================================
// UPI VALIDATION
// ============================================

/**
 * Validate UPI ID
 * @param {string} upiId - UPI ID to validate
 * @returns {boolean} True if valid
 */
export const validateUPI = (upiId) => {
  if (!upiId) return false;
  return /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upiId);
};

/**
 * Validate UPI with detailed check
 * @param {string} upiId - UPI ID to validate
 * @returns {Object} Validation result
 */
export const validateUPIDetailed = (upiId) => {
  if (!upiId) {
    return { valid: false, message: 'UPI ID is required' };
  }

  const cleaned = upiId.trim();

  if (cleaned.length < 5) {
    return { valid: false, message: 'UPI ID is too short' };
  }

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(cleaned)) {
    return { 
      valid: false, 
      message: 'Invalid UPI ID format (e.g., name@upi)' 
    };
  }

  const providers = ['gpay', 'phonepe', 'paytm', 'upi', 'okaxis', 'okhdfc', 'oksbi'];
  const provider = cleaned.split('@')[1];
  
  if (!provider || provider.length < 3) {
    return { 
      valid: false, 
      message: 'Invalid UPI provider' 
    };
  }

  return { valid: true, message: 'Valid UPI ID' };
};

// ============================================
// URL VALIDATION
// ============================================

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const validateURL = (url) => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate URL with detailed check
 * @param {string} url - URL to validate
 * @returns {Object} Validation result
 */
export const validateURLDetailed = (url) => {
  if (!url) {
    return { valid: false, message: 'URL is required' };
  }

  try {
    const parsed = new URL(url);
    
    if (!parsed.protocol.startsWith('http')) {
      return { 
        valid: false, 
        message: 'URL must use HTTP or HTTPS protocol' 
      };
    }

    return { valid: true, message: 'Valid URL' };
  } catch {
    return { 
      valid: false, 
      message: 'Please enter a valid URL' 
    };
  }
};

// ============================================
// DATE VALIDATION
// ============================================

/**
 * Validate date
 * @param {string|Date} date - Date to validate
 * @returns {boolean} True if valid
 */
export const validateDate = (date) => {
  if (!date) return false;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return !isNaN(dateObj.getTime());
};

/**
 * Validate future date
 * @param {string|Date} date - Date to validate
 * @returns {boolean} True if date is in future
 */
export const validateFutureDate = (date) => {
  if (!date) return false;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return !isNaN(dateObj.getTime()) && dateObj > new Date();
};

/**
 * Validate past date
 * @param {string|Date} date - Date to validate
 * @returns {boolean} True if date is in past
 */
export const validatePastDate = (date) => {
  if (!date) return false;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return !isNaN(dateObj.getTime()) && dateObj < new Date();
};

// ============================================
// COMMON VALIDATION COMBINATIONS
// ============================================

/**
 * Validate all fields in an object
 * @param {Object} data - Data to validate
 * @param {Object} schema - Validation schema
 * @returns {Object} Validation results
 */
export const validateAll = (data, schema) => {
  const results = {};
  let isValid = true;

  for (const [key, validator] of Object.entries(schema)) {
    const value = data[key];
    const result = validator(value);
    
    if (typeof result === 'boolean') {
      results[key] = { valid: result };
      if (!result) isValid = false;
    } else {
      results[key] = result;
      if (!result.valid) isValid = false;
    }
  }

  return { valid: isValid, fields: results };
};

// ============================================
// EXPORT ALL VALIDATORS
// ============================================

const validators = {
  // Email
  validateEmail,
  validateEmailDetailed,
  
  // Password
  validatePassword,
  validatePasswordDetailed,
  getPasswordStrength,
  getPasswordStrengthColor,
  
  // Phone
  validatePhone,
  validatePhoneDetailed,
  cleanPhoneNumber,
  
  // OTP
  validateOTP,
  validateOTPDetailed,
  
  // Name
  validateName,
  validateNameDetailed,
  
  // Address
  validateAddress,
  validateAddressDetailed,
  
  // Pincode
  validatePincode,
  validatePincodeDetailed,
  
  // Card
  validateCardNumber,
  validateCardExpiry,
  validateCardCVV,
  detectCardType,
  
  // UPI
  validateUPI,
  validateUPIDetailed,
  
  // URL
  validateURL,
  validateURLDetailed,
  
  // Date
  validateDate,
  validateFutureDate,
  validatePastDate,
  
  // Common
  validateAll,
};

export default validators;