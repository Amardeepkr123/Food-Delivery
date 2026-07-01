import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';

const AuthLayout = ({ children, title, subtitle, footer }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute text-8xl opacity-5 animate-float" style={{ top: '5%', right: '10%' }}>🍕</div>
        <div className="absolute text-7xl opacity-5 animate-float-delayed" style={{ bottom: '10%', left: '8%' }}>🍔</div>
        <div className="absolute text-6xl opacity-5 animate-float" style={{ top: '40%', left: '3%', animationDelay: '1s' }}>🍣</div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card rounded-3xl p-8 md:p-10">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="text-4xl mb-3"
              >
                🍽️
              </motion.div>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold food-gradient-text">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                {subtitle}
              </p>
            )}
          </div>

          {children}

          {footer && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
              {footer}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;