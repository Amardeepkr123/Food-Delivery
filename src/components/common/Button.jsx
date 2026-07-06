import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  fullWidth = false,
  rounded = 'xl',
  shadow = true,
  ...props
}) => {
  // Size configurations
  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  // Rounded configurations
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full',
  };

  // Shadow configurations
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  // Variant configurations
  const variants = {
    // Primary - Orange/Red gradient
    primary: `food-gradient-bg text-white hover:shadow-red-500/40 ${sizes[size]}`,
    
    // Secondary - Gray
    secondary: `bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 ${sizes[size]}`,
    
    // Outline - Border with text
    outline: `border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 ${sizes[size]}`,
    
    // Ghost - Transparent
    ghost: `hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 ${sizes[size]}`,
    
    // Danger - Red
    danger: `bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30 ${sizes[size]}`,
    
    // Success - Green
    success: `bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/30 ${sizes[size]}`,
    
    // Warning - Yellow/Orange
    warning: `bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg shadow-yellow-500/30 ${sizes[size]}`,
    
    // Info - Blue
    info: `bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 ${sizes[size]}`,
    
    // Dark - Dark/Black
    dark: `bg-gray-800 hover:bg-gray-900 text-white ${sizes[size]}`,
    
    // Light - White
    light: `bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 ${sizes[size]}`,
    
    // Gradient - Multicolor
    gradient: `bg-gradient-to-r from-red-500 via-orange-500 to-purple-500 hover:from-red-600 hover:via-orange-600 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30 ${sizes[size]}`,
    
    // Glass - Glassmorphism
    glass: `glass-card hover:shadow-3xl text-gray-700 dark:text-gray-200 ${sizes[size]}`,
    
    // Social - Google/Facebook style
    social: `bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm hover:shadow-md ${sizes[size]}`,
  };

  const baseClasses = `font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''} ${roundedClasses[rounded]} ${shadow ? 'shadow-lg' : ''}`;

  // Get loading spinner color based on variant
  const getSpinnerColor = () => {
    const lightVariants = ['light', 'secondary', 'outline', 'ghost', 'social', 'glass'];
    if (lightVariants.includes(variant)) {
      return 'text-gray-600';
    }
    return 'text-white';
  };

  // Get loading spinner border color
  const getSpinnerBorder = () => {
    const lightVariants = ['light', 'secondary', 'outline', 'ghost', 'social', 'glass'];
    if (lightVariants.includes(variant)) {
      return 'border-gray-300';
    }
    return 'border-white/20';
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-3">
          <svg 
            className={`animate-spin h-5 w-5 ${getSpinnerColor()}`} 
            viewBox="0 0 24 24"
          >
            <circle 
              className={`opacity-25 ${getSpinnerBorder()}`} 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none" 
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
            />
          </svg>
          <span className="animate-pulse">Loading...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
        </div>
      )}
    </motion.button>
  );
};

// Additional helper components
export const ButtonGroup = ({ children, className = '', vertical = false }) => {
  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-2 ${className}`}>
      {children}
    </div>
  );
};

export const IconButton = ({
  icon: Icon,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizes = {
    xs: 'p-1.5 text-xs',
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
    xl: 'p-5 text-xl',
  };

  const variants = {
    primary: `food-gradient-bg text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/40`,
    secondary: `bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200`,
    outline: `border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20`,
    ghost: `hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300`,
    danger: `bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30`,
    success: `bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30`,
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className={`rounded-full transition-all duration-300 ${sizes[size]} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </motion.button>
  );
};

export default Button;