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
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Food Items */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute text-7xl opacity-10 dark:opacity-5 animate-float" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>🍕</div>
        <div className="absolute text-6xl opacity-10 dark:opacity-5 animate-float" style={{ top: '20%', right: '8%', animationDelay: '1s' }}>🍔</div>
        <div className="absolute text-8xl opacity-10 dark:opacity-5 animate-float" style={{ bottom: '15%', left: '10%', animationDelay: '2s' }}>🍣</div>
        <div className="absolute text-7xl opacity-10 dark:opacity-5 animate-float" style={{ bottom: '25%', right: '5%', animationDelay: '0.5s' }}>🍩</div>
        <div className="absolute text-6xl opacity-10 dark:opacity-5 animate-float" style={{ top: '50%', left: '2%', animationDelay: '1.5s' }}>🍟</div>
        <div className="absolute text-5xl opacity-10 dark:opacity-5 animate-float" style={{ top: '40%', right: '2%', animationDelay: '0.8s' }}>🌮</div>
        
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full ${maxWidth} grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10`}
      >
        {/* Illustration Section */}
        <div className="hidden lg:flex flex-col items-center justify-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl shadow-red-500/5 dark:shadow-gray-900/30 rounded-3xl hover:shadow-3xl hover:shadow-red-500/10 dark:hover:shadow-gray-900/40 transition-all duration-300">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6"
          >
            {illustration || (
              <div className="text-center">
                <div className="text-8xl mb-4 animate-bounce" style={{ animationDuration: '3s' }}>🍽️</div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-purple-500 bg-clip-text text-transparent">Food Delivery</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                  Delicious food at your doorstep
                </p>
              </div>
            )}
          </motion.div>
          
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-red-50 dark:bg-red-900/20">
              <span className="text-xl">🚀</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20">
              <span className="text-xl">⭐</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Best Quality</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20">
              <span className="text-xl">💝</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Great Deals</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl shadow-red-500/5 dark:shadow-gray-900/30 rounded-3xl p-6 md:p-8 lg:p-10 hover:shadow-3xl hover:shadow-red-500/10 dark:hover:shadow-gray-900/40 transition-all duration-300">
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-4xl">🍕</span>
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-purple-500 bg-clip-text text-transparent mt-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm md:text-base">
                {subtitle}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {children}
          </div>

          {footer && (
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              {footer}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};