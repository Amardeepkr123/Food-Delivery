import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiSearch, 
  FiArrowLeft, 
  FiHelpCircle,
  FiMail,
  FiAlertCircle,
  FiMapPin,
  FiCompass,
  FiCoffee
} from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mouseenter', handleMouseMove);
    return () => window.removeEventListener('mouseenter', handleMouseMove);
  }, []);

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

  const floatingFoods = [
    { emoji: '🍕', size: '8xl', top: '8%', left: '5%', delay: 0 },
    { emoji: '🍔', size: '7xl', top: '15%', right: '10%', delay: 0.5 },
    { emoji: '🍣', size: '9xl', bottom: '12%', left: '8%', delay: 1 },
    { emoji: '🍩', size: '7xl', bottom: '20%', right: '8%', delay: 1.5 },
    { emoji: '🌮', size: '6xl', top: '45%', left: '3%', delay: 0.8 },
    { emoji: '🍝', size: '6xl', top: '35%', right: '3%', delay: 1.2 },
    { emoji: '🥘', size: '7xl', bottom: '35%', left: '15%', delay: 0.3 },
    { emoji: '🍜', size: '6xl', top: '55%', right: '15%', delay: 1.8 },
  ];

  const suggestedLinks = [
    { title: 'Home', path: '/', icon: FiHome },
    { title: 'Restaurants', path: '/restaurants', icon: FiMapPin },
    { title: 'Search', path: '/search', icon: FiSearch },
    { title: 'Help Center', path: '/help', icon: FiHelpCircle },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Food Items */}
        {floatingFoods.map((item, index) => (
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
            {item.emoji}
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
        {/* Animated 404 Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative inline-block mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-2xl" />
          <div className="relative bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-full shadow-2xl shadow-orange-500/30">
            <FiCompass className="w-20 h-20 text-white" />
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.div variants={itemVariants}>
          <h1 className="text-7xl md:text-8xl font-bold food-gradient-text">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-sm font-mono text-gray-400 dark:text-gray-500">
              Page Not Found
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="text-sm font-mono text-gray-400 dark:text-gray-500">
              Error: NF-404
            </span>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-3">
            <FiAlertCircle className="text-orange-500" />
            Oops! Page Not Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2 max-w-lg mx-auto">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm max-w-md mx-auto">
            Let us help you find your way back to delicious food!
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-6 max-w-md mx-auto"
        >
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for restaurants or dishes..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl glass-card focus:ring-2 focus:ring-orange-400 outline-none transition-all duration-300"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300">
              Search
            </button>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6"
        >
          {suggestedLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                to={link.path}
                className="glass-card rounded-xl p-3 hover:shadow-3xl transition-all duration-300 group"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
                    <Icon className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {link.title}
                  </span>
                </div>
              </Link>
            );
          })}
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

          <Link to="/restaurants">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700 w-full sm:w-auto justify-center"
            >
              <FaUtensils className="w-5 h-5" />
              Browse Restaurants
            </motion.button>
          </Link>
        </motion.div>

        {/* Secondary Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-gray-400 dark:text-gray-500"
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1 hover:text-orange-500 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <Link to="/contact" className="flex items-center gap-1 hover:text-orange-500 transition-colors">
            <FiMail className="w-4 h-4" />
            Contact Support
          </Link>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
          <Link to="/help" className="flex items-center gap-1 hover:text-orange-500 transition-colors">
            <FiHelpCircle className="w-4 h-4" />
            Help Center
          </Link>
        </motion.div>

        {/* Fun Fact / Random Message */}
        <motion.div
          variants={itemVariants}
          className="mt-8 p-4 glass-card rounded-2xl max-w-md mx-auto"
        >
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <FiCoffee className="w-4 h-4 text-orange-500" />
            <span>
              While you're here, did you know we have over 100+ restaurants ready to serve you?
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;