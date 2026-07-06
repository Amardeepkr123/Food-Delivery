import React from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export const AuthCard = ({
  children,
  title,
  subtitle,
  footer,
  illustration,
  maxWidth = 'max-w-5xl',
}) => {
  // Floating food items with better positioning
  const floatingItems = [
    { emoji: '🍕', size: '7xl', top: '10%', left: '5%', delay: 0 },
    { emoji: '🍔', size: '6xl', top: '20%', right: '8%', delay: 1 },
    { emoji: '🍣', size: '8xl', bottom: '15%', left: '10%', delay: 2 },
    { emoji: '🍩', size: '7xl', bottom: '25%', right: '5%', delay: 0.5 },
    { emoji: '🍟', size: '6xl', top: '50%', left: '2%', delay: 1.5 },
    { emoji: '🌮', size: '5xl', top: '40%', right: '2%', delay: 0.8 },
    { emoji: '🍜', size: '6xl', top: '65%', left: '15%', delay: 1.2 },
    { emoji: '🥘', size: '7xl', bottom: '35%', right: '12%', delay: 0.3 },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const illustrationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 200,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Food Items */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingItems.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute text-${item.size} opacity-10 dark:opacity-5`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
        
        {/* Gradient Orbs with better animation */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`w-full ${maxWidth} grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10`}
      >
        {/* Illustration Section - Enhanced */}
        <motion.div
          variants={itemVariants}
          className="hidden lg:flex flex-col items-center justify-center p-10 glass-card rounded-3xl relative overflow-hidden group"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-orange-50/20 to-purple-50/30 dark:from-red-900/10 dark:via-orange-900/10 dark:to-purple-900/10" />
          
          <motion.div
            variants={illustrationVariants}
            className="relative z-10"
          >
            {illustration || (
              <div className="text-center">
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-8xl mb-6"
                >
                  🍽️
                </motion.div>
                <h2 className="text-4xl font-bold food-gradient-text mb-3">
                  Food Delivery
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Delicious food at your doorstep
                </p>
              </div>
            )}
          </motion.div>
          
          {/* Feature badges with animation */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 justify-center mt-8 relative z-10"
          >
            {[
              { icon: '🚀', label: 'Fast Delivery', color: 'from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20' },
              { icon: '⭐', label: 'Best Quality', color: 'from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20' },
              { icon: '💝', label: 'Great Deals', color: 'from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${badge.color} border border-white/20 dark:border-gray-700/30 shadow-lg`}
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Form Section - Enhanced */}
        <motion.div
          variants={itemVariants}
          className="glass-card rounded-3xl p-6 md:p-8 lg:p-10 hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
        >
          {/* Form background decoration */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-full blur-2xl" />
          
          <div className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-block p-4 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20"
            >
              <span className="text-4xl">🍕</span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold food-gradient-text mt-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base">
                {subtitle}
              </p>
            )}
          </div>

          <div className="space-y-5 relative z-10">
            {children}
          </div>

          {footer && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400 relative z-10">
              {footer}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};