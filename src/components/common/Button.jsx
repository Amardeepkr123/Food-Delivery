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
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variants = {
    primary: `food-gradient-bg text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/40 ${sizes[size]}`,
    secondary: `bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 ${sizes[size]}`,
    outline: `border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 ${sizes[size]}`,
    ghost: `hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 ${sizes[size]}`,
    danger: `bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 ${sizes[size]}`,
    success: `bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 ${sizes[size]}`,
  };

  const baseClasses = `rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''}`;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;