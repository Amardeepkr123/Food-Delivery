import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServerError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute text-8xl opacity-5 animate-float" style={{ top: '10%', right: '10%' }}>🔧</div>
        <div className="absolute text-7xl opacity-5 animate-float-delayed" style={{ bottom: '10%', left: '10%' }}>⚡</div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 max-w-2xl mx-auto"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-9xl mb-6"
        >
          ⚠️
        </motion.div>
        
        <h1 className="text-6xl md:text-7xl font-bold food-gradient-text mb-4">500</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Server Error
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
          Something went wrong on our end. Please try again later or contact support if the problem persists.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl food-gradient-bg text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300 flex items-center gap-2"
            >
              <span>🏠</span>
              Go Home
            </motion.button>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700"
          >
            <span>🔄</span>
            Try Again
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServerError;