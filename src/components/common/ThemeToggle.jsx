import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const ThemeToggle = ({ 
  variant = 'default', 
  size = 'md',
  showLabel = false,
  className = '',
  ...props 
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState(false);

  // Size configurations
  const sizes = {
    sm: 'p-2 text-sm',
    md: 'p-2.5 text-base',
    lg: 'p-3 text-lg',
    xl: 'p-4 text-xl',
  };

  // Variant configurations
  const variants = {
    default: 'glass-card hover:shadow-2xl transition-all duration-300',
    solid: `${isDark ? 'bg-gray-800' : 'bg-gray-200'} hover:shadow-lg transition-all duration-300`,
    outline: `border-2 ${isDark ? 'border-gray-700' : 'border-gray-300'} hover:shadow-lg transition-all duration-300`,
    gradient: `bg-gradient-to-r ${isDark ? 'from-gray-800 to-gray-700' : 'from-gray-100 to-gray-200'} hover:shadow-xl transition-all duration-300`,
  };

  // Get icon size based on size prop
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  // Handle toggle with ripple effect
  const handleToggle = () => {
    setRipple(true);
    toggleTheme();
    setTimeout(() => setRipple(false), 600);
  };

  // Get the current theme display name
  const getThemeDisplay = () => {
    if (isDark === true) return 'Dark';
    if (isDark === false) return 'Light';
    return 'System';
  };

  // Get the current theme icon
  const getThemeIcon = () => {
    if (isDark === true) return FiMoon;
    if (isDark === false) return FiSun;
    return FiMonitor;
  };

  // Get the current theme color
  const getThemeColor = () => {
    if (isDark === true) return 'text-yellow-400';
    if (isDark === false) return 'text-orange-500';
    return 'text-blue-400';
  };

  const Icon = getThemeIcon();

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      rotate: isDark ? 15 : -15,
      transition: { type: 'spring', stiffness: 300 },
    },
    tap: { 
      scale: 0.9,
      transition: { type: 'spring', stiffness: 400 },
    },
    ripple: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    initial: { 
      rotate: 0,
      scale: 1,
    },
    animate: {
      rotate: isDark ? 180 : 0,
      scale: [1, 1.2, 1],
      transition: { 
        rotate: { duration: 0.5, ease: 'easeInOut' },
        scale: { duration: 0.3, ease: 'easeInOut' },
      },
    },
    exit: {
      rotate: isDark ? -180 : 0,
      scale: 0,
      transition: { duration: 0.2 },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: 10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className={`relative ${className}`} {...props}>
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        animate={ripple ? 'ripple' : 'initial'}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleToggle}
        className={`relative rounded-xl ${variants[variant]} ${sizes[size]} flex items-center justify-center transition-all duration-300 overflow-hidden`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {/* Ripple effect */}
        {ripple && (
          <motion.span
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl pointer-events-none"
          />
        )}

        {/* Icon with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isDark ? 'dark' : 'light'}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10"
          >
            <Icon className={`${iconSizes[size]} ${getThemeColor()} transition-colors duration-300`} />
          </motion.div>
        </AnimatePresence>

        {/* Theme label */}
        {showLabel && (
          <AnimatePresence mode="wait">
            <motion.span
              key={getThemeDisplay()}
              variants={labelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {getThemeDisplay()}
            </motion.span>
          </AnimatePresence>
        )}

        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${isDark ? 'from-yellow-400/10 to-orange-400/10' : 'from-blue-400/10 to-purple-400/10'}`}
          />
        )}
      </motion.button>

      {/* Tooltip */}
      {isHovered && !showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-gray-900 dark:bg-gray-700 text-white text-xs whitespace-nowrap"
        >
          {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </motion.div>
      )}
    </div>
  );
};

// Additional theme toggle variants
export const ThemeToggleWithLabel = (props) => {
  return <ThemeToggle {...props} showLabel={true} size="lg" />;
};

export const ThemeToggleCompact = (props) => {
  return <ThemeToggle {...props} size="sm" variant="solid" />;
};

export const ThemeToggleGradient = (props) => {
  return <ThemeToggle {...props} variant="gradient" size="lg" />;
};

export default ThemeToggle;