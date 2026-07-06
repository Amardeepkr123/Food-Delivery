import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ 
  fullScreen = false, 
  size = 'md', 
  variant = 'default',
  text = 'Loading...',
  showText = true,
  overlay = false,
  className = '',
  ...props 
}) => {
  // Size configurations
  const sizes = {
    xs: 'w-6 h-6 border-2',
    sm: 'w-8 h-8 border-3',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
    xl: 'w-20 h-20 border-4',
    '2xl': 'w-24 h-24 border-4',
  };

  // Variant configurations
  const variants = {
    default: {
      primary: 'border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent',
      secondary: 'border-t-blue-500 border-r-cyan-500 border-b-indigo-500 border-l-transparent',
      success: 'border-t-green-500 border-r-emerald-500 border-b-teal-500 border-l-transparent',
      warning: 'border-t-yellow-500 border-r-amber-500 border-b-orange-500 border-l-transparent',
      danger: 'border-t-red-500 border-r-rose-500 border-b-pink-500 border-l-transparent',
    },
    gradient: {
      primary: 'border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent',
      secondary: 'border-t-blue-500 border-r-cyan-500 border-b-indigo-500 border-l-transparent',
    },
    pulse: {
      primary: 'border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent',
      secondary: 'border-t-blue-500 border-r-cyan-500 border-b-indigo-500 border-l-transparent',
    },
    dots: {
      primary: 'bg-gradient-to-r from-red-500 to-orange-500',
      secondary: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    },
  };

  // Size for text
  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  // Get loader content based on variant
  const getLoaderContent = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`${sizes[size]} rounded-full bg-gradient-to-r from-red-500 to-orange-500`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{ width: '12px', height: '12px' }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className="relative">
            <div className={`${sizes[size]} rounded-full border-4 border-gray-200 dark:border-gray-700`} />
            <div className={`absolute top-0 left-0 ${sizes[size]} rounded-full border-4 ${variants.pulse.primary} animate-spin`} style={{ animationDuration: '0.8s' }} />
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 animate-pulse`} />
          </div>
        );

      case 'gradient':
        return (
          <div className="relative">
            <div className={`${sizes[size]} rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-purple-500 animate-spin`} style={{ animationDuration: '1s' }} />
            <div className={`absolute inset-1 rounded-full bg-white dark:bg-gray-900`} />
            <div className={`absolute inset-1 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-purple-500 animate-spin`} style={{ animationDuration: '1s' }} />
          </div>
        );

      default:
        return (
          <div className="relative">
            <div className={`${sizes[size]} rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin`} />
            <div className={`absolute top-0 left-0 ${sizes[size]} rounded-full border-4 ${variants.default.primary} animate-spin`} style={{ animationDuration: '0.8s' }} />
          </div>
        );
    }
  };

  const loaderContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
      {...props}
    >
      {getLoaderContent()}
      
      {showText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-1"
        >
          <p className={`${textSizes[size]} font-medium text-gray-500 dark:text-gray-400 animate-pulse`}>
            {text}
          </p>
          {/* Loading dots animation */}
          <div className="flex gap-1 mt-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  // Full screen loader
  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm"
      >
        {loaderContent}
      </motion.div>
    );
  }

  // Overlay loader
  if (overlay) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 dark:bg-black/40 backdrop-blur-sm rounded-2xl"
        >
          {loaderContent}
        </motion.div>
      </AnimatePresence>
    );
  }

  return loaderContent;
};

// Additional loader variants
export const SkeletonLoader = ({ 
  type = 'text', 
  count = 1, 
  className = '',
  ...props 
}) => {
  const getSkeletonStyles = () => {
    switch (type) {
      case 'text':
        return 'h-4 rounded-lg';
      case 'title':
        return 'h-8 rounded-lg w-3/4';
      case 'avatar':
        return 'w-12 h-12 rounded-full';
      case 'image':
        return 'w-full h-48 rounded-2xl';
      case 'card':
        return 'w-full h-64 rounded-2xl';
      case 'button':
        return 'h-10 rounded-xl w-32';
      default:
        return 'h-4 rounded-lg';
    }
  };

  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.15,
          }}
          className={`${getSkeletonStyles()} bg-gray-200 dark:bg-gray-700`}
        />
      ))}
    </div>
  );
};

export const Spinner = ({ 
  size = 'md', 
  color = 'primary',
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colors = {
    primary: 'text-red-500',
    secondary: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  return (
    <svg
      className={`animate-spin ${sizes[size]} ${colors[color]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Loader;