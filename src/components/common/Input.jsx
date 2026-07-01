import React from 'react';
import { motion } from 'framer-motion';

export const Input = ({
  label,
  type = 'text',
  placeholder,
  register,
  name,
  error,
  icon: Icon,
  className = '',
  rules = {},
  ...props
}) => {
  return (
    <motion.div 
      className="space-y-1.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, rules)}
          className={`w-full px-4 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 border-2 border-gray-200/50 dark:border-gray-700/50 focus:border-red-400 dark:focus:border-red-400 focus:ring-4 focus:ring-red-400/20 dark:focus:ring-red-400/20 outline-none transition-all duration-300 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${Icon ? 'pl-12' : ''} ${error ? 'border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500/20 dark:focus:ring-red-500/20' : ''} ${className}`}
          {...props}
        />
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
        )}
      </div>
      {error && (
        <motion.p 
          className="text-red-500 dark:text-red-400 text-sm mt-1.5 flex items-center gap-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error.message}
        </motion.p>
      )}
    </motion.div>
  );
};