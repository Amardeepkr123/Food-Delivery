import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiRefreshCw, 
  FiHelpCircle, 
  FiMail,
  FiAlertTriangle,
  FiArrowLeft,
  FiClock,
  FiServer,
  FiDatabase,
  FiCloudOff
} from 'react-icons/fi';

const ServerError = () => {
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

  const floatingIcons = [
    { icon: '🔧', top: '10%', left: '8%', delay: 0 },
    { icon: '⚡', top: '20%', right: '12%', delay: 0.5 },
    { icon: '🔄', bottom: '15%', left: '12%', delay: 1 },
    { icon: '💻', bottom: '25%', right: '8%', delay: 1.5 },
    { icon: '🔌', top: '45%', left: '3%', delay: 0.8 },
    { icon: '📡', top: '35%', right: '3%', delay: 1.2 },
  ];

  const errorCodes = [
    '500 Internal Server Error',
    '502 Bad Gateway',
    '503 Service Unavailable',
    '504 Gateway Timeout',
  ];

  const [currentCode, setCurrentCode] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCode((prev) => (prev + 1) % errorCodes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-7xl opacity-10 dark:opacity-5"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          >
            {item.icon}
          </motion.div>
        ))}

        {/* Gradient Orbs */}
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

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, ${'#000'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10 max-w-2xl mx-auto"
      >
        {/* Animated Error Icon */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative inline-block mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-2xl" />
          <div className="relative bg-gradient-to-br from-red-500 to-orange-500 p-8 rounded-full shadow-2xl shadow-red-500/30">
            <FiServer className="w-20 h-20 text-white" />
          </div>
        </motion.div>

        {/* Error Code with Animation */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="text-7xl md:text-8xl font-bold food-gradient-text">
            500
          </h1>
          <motion.p
            key={currentCode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm font-mono text-gray-400 dark:text-gray-500 mt-2"
          >
            {errorCodes[currentCode]}
          </motion.p>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-3">
            <FiAlertTriangle className="text-orange-500" />
            Server Error
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2 max-w-lg mx-auto">
            Oops! Something went wrong on our servers.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm max-w-md mx-auto">
            We're working on fixing the issue. Please try again in a few minutes.
          </p>
        </motion.div>

        {/* Error Details */}
        <motion.div
          variants={itemVariants}
          className="mt-6 p-4 glass-card rounded-2xl max-w-md mx-auto"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FiClock className="w-4 h-4" />
            <span>Error ID: </span>
            <span className="font-mono text-xs">ERR-500-{Date.now().toString().slice(-6)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
            <FiDatabase className="w-4 h-4" />
            <span>Status: </span>
            <span className="text-orange-500 font-semibold">Service Unavailable</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <FiHome className="w-5 h-5" />
              Go Home
            </motion.button>
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700 w-full sm:w-auto justify-center"
          >
            <FiRefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </motion.div>

        {/* Secondary Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-gray-400 dark:text-gray-500"
        >
          <Link to="/contact" className="flex items-center gap-1 hover:text-orange-500 transition-colors">
            <FiMail className="w-4 h-4" />
            Contact Support
          </Link>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <Link to="/help" className="flex items-center gap-1 hover:text-orange-500 transition-colors">
            <FiHelpCircle className="w-4 h-4" />
            Help Center
          </Link>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1 hover:text-orange-500 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>

        {/* Status Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mt-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-gray-400 dark:text-gray-500">Server Error</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-xs text-gray-400 dark:text-gray-500">Investigating</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="text-xs text-gray-400 dark:text-gray-500">ETA: ~5 min</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServerError;