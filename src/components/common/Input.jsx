import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

export const Input = ({
  label,
  type = 'text',
  placeholder,
  register,
  name,
  error,
  icon: Icon,
  className = '',
  rules = {},
  required = false,
  helperText = '',
  disabled = false,
  readOnly = false,
  value,
  onChange,
  onBlur,
  onFocus,
  autoFocus = false,
  maxLength,
  minLength,
  pattern,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  // Handle password visibility toggle
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  // Handle input change to track value
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (onChange) onChange(e);
  };

  // Input variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const labelVariants = {
    idle: {
      y: 0,
      scale: 1,
      color: '#6b7280',
    },
    focused: {
      y: -24,
      scale: 0.85,
      color: '#ef4444',
    },
    filled: {
      y: -24,
      scale: 0.85,
      color: '#6b7280',
    },
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-1.5"
    >
      {/* Label with required indicator */}
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {maxLength && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {hasValue ? `${value?.length || 0}/${maxLength}` : ''}
            </span>
          )}
        </div>
      )}

      {/* Input wrapper */}
      <div className="relative group">
        {/* Input container with glow effect */}
        <div className={`relative rounded-2xl transition-all duration-300 ${
          isFocused ? 'ring-4 ring-red-400/20 dark:ring-red-400/20' : ''
        } ${error ? 'ring-4 ring-red-500/20 dark:ring-red-500/20' : ''}`}>
          {/* Icon */}
          {Icon && (
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              isFocused ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
          )}

          {/* Input element */}
          <input
            type={inputType}
            placeholder={placeholder}
            {...(register ? register(name, rules) : {})}
            value={value}
            onChange={handleChange}
            onBlur={(e) => {
              setIsFocused(false);
              if (onBlur) onBlur(e);
            }}
            onFocus={(e) => {
              setIsFocused(true);
              if (onFocus) onFocus(e);
            }}
            disabled={disabled}
            readOnly={readOnly}
            autoFocus={autoFocus}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            className={`w-full px-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 
              border-2 transition-all duration-300 
              text-gray-800 dark:text-gray-200 
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              outline-none
              ${Icon ? 'pl-12' : ''}
              ${isPassword ? 'pr-12' : 'pr-4'}
              ${error ? 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500' : 
                isFocused ? 'border-red-400 dark:border-red-400' : 
                'border-gray-200/50 dark:border-gray-700/50'}
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              ${readOnly ? 'cursor-default' : ''}
              ${className}`}
            {...props}
          />

          {/* Password toggle button */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              tabIndex="-1"
            >
              {showPassword ? (
                <FiEyeOff className="w-5 h-5" />
              ) : (
                <FiEye className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Error icon */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <FiAlertCircle className="w-5 h-5 text-red-500" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Helper text */}
      {helperText && !error && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 ml-1">
          {helperText}
        </p>
      )}

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-red-500 dark:text-red-400 text-sm mt-1.5 flex items-center gap-1 ml-1"
          >
            <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Character counter for text inputs */}
      {maxLength && type === 'text' && (
        <div className="flex justify-end">
          <span className={`text-xs transition-colors duration-300 ${
            (value?.length || 0) > maxLength * 0.9 ? 'text-yellow-500' : 'text-gray-400'
          }`}>
            {(value?.length || 0)}/{maxLength}
          </span>
        </div>
      )}
    </motion.div>
  );
};

// Additional input variants
export const TextArea = ({
  label,
  placeholder,
  register,
  name,
  error,
  rows = 4,
  className = '',
  rules = {},
  required = false,
  helperText = '',
  disabled = false,
  readOnly = false,
  value,
  onChange,
  maxLength,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    setCharCount(e.target.value.length);
    if (onChange) onChange(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-1.5"
    >
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <div className={`rounded-2xl transition-all duration-300 ${
          isFocused ? 'ring-4 ring-red-400/20 dark:ring-red-400/20' : ''
        } ${error ? 'ring-4 ring-red-500/20 dark:ring-red-500/20' : ''}`}>
          <textarea
            placeholder={placeholder}
            {...(register ? register(name, rules) : {})}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            className={`w-full px-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 
              border-2 transition-all duration-300 
              text-gray-800 dark:text-gray-200 
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              resize-y min-h-[80px]
              outline-none
              ${error ? 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500' : 
                isFocused ? 'border-red-400 dark:border-red-400' : 
                'border-gray-200/50 dark:border-gray-700/50'}
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              ${readOnly ? 'cursor-default' : ''}
              ${className}`}
            {...props}
          />
        </div>
      </div>

      {helperText && !error && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 ml-1">
          {helperText}
        </p>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 dark:text-red-400 text-sm mt-1.5 flex items-center gap-1 ml-1"
        >
          <FiAlertCircle className="w-4 h-4" />
          {error.message}
        </motion.p>
      )}

      {maxLength && (
        <div className="flex justify-end">
          <span className={`text-xs transition-colors duration-300 ${
            charCount > maxLength * 0.9 ? 'text-yellow-500' : 'text-gray-400'
          }`}>
            {charCount}/{maxLength}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export const Select = ({
  label,
  options = [],
  placeholder = 'Select an option',
  register,
  name,
  error,
  className = '',
  rules = {},
  required = false,
  helperText = '',
  disabled = false,
  value,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-1.5"
    >
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <div className={`rounded-2xl transition-all duration-300 ${
          isFocused ? 'ring-4 ring-red-400/20 dark:ring-red-400/20' : ''
        } ${error ? 'ring-4 ring-red-500/20 dark:ring-red-500/20' : ''}`}>
          <select
            {...(register ? register(name, rules) : {})}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={`w-full px-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 
              border-2 transition-all duration-300 
              text-gray-800 dark:text-gray-200 
              appearance-none
              pr-12
              outline-none
              ${error ? 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500' : 
                isFocused ? 'border-red-400 dark:border-red-400' : 
                'border-gray-200/50 dark:border-gray-700/50'}
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              ${className}`}
            {...props}
          >
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className={`w-5 h-5 transition-transform duration-300 ${
              isFocused ? 'rotate-180 text-red-500' : 'text-gray-400'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {helperText && !error && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 ml-1">
          {helperText}
        </p>
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 dark:text-red-400 text-sm mt-1.5 flex items-center gap-1 ml-1"
        >
          <FiAlertCircle className="w-4 h-4" />
          {error.message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Input;