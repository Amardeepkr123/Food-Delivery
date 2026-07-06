import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const StatsCard = ({
  label,
  value,
  icon: Icon,
  change,
  trend = 'up',
  color = 'from-orange-500 to-red-500',
  subtitle,
  delay = 0,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`glass-card rounded-2xl p-4 md:p-6 hover:shadow-3xl transition-all duration-300 ${className}`}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {label}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mt-1">
            {value}
          </p>
          
          {subtitle && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {subtitle}
            </p>
          )}

          {change && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <FiArrowUp className="text-green-500 text-sm" />
              ) : (
                <FiArrowDown className="text-red-500 text-sm" />
              )}
              <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {change}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
                vs last period
              </span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0 ml-3`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {/* Progress bar for additional context */}
      {props.progress !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{props.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${props.progress}%` }}
              transition={{ duration: 0.8, delay: delay + 0.2 }}
              className={`h-full rounded-full bg-gradient-to-r ${color}`}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Additional Stats Card Variants
export const StatsCardWithIcon = (props) => {
  return <StatsCard {...props} />;
};

export const StatsCardMini = (props) => {
  return (
    <StatsCard
      {...props}
      className="p-3"
    />
  );
};

export const StatsCardHorizontal = ({ label, value, icon: Icon, color = 'from-orange-500 to-red-500' }) => {
  return (
    <div className="flex items-center gap-4 p-4 glass-card rounded-2xl hover:shadow-3xl transition-all duration-300">
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-xl font-bold text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;