// src/pages/booking/BookingStepper.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiChevronRight } from 'react-icons/fi';

const BookingStepper = ({ 
  steps, 
  currentStep, 
  onStepClick,
  variant = 'default', // 'default', 'compact', 'vertical'
  showLabels = true,
  className = '',
}) => {
  // Vertical Variant
  if (variant === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="relative">
              {/* Line */}
              {!isLast && (
                <div className={`absolute left-5 top-10 w-0.5 h-12 ${
                  isCompleted ? 'bg-gradient-to-b from-orange-500 to-red-500' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}

              <motion.button
                onClick={() => onStepClick(index)}
                className={`flex items-start gap-4 w-full text-left ${
                  isActive || isCompleted ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
                whileHover={isActive || isCompleted ? { scale: 1.02 } : {}}
              >
                {/* Icon */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 flex-shrink-0 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                      : isActive
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 animate-pulse'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {isCompleted ? <FiCheck className="w-5 h-5" /> : index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <p className={`text-xs font-medium ${
                    isActive ? 'text-orange-500' : isCompleted ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'
                  }`}>
                    Step {index + 1}
                  </p>
                  <p className={`text-sm font-semibold ${
                    isActive ? 'text-gray-800 dark:text-white' : isCompleted ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  {step.description && (
                    <p className={`text-xs mt-0.5 ${
                      isActive ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  )}
                </div>

                {/* Status Indicator */}
                {isCompleted && (
                  <div className="flex items-center gap-1 text-green-500 text-xs font-medium">
                    <FiCheck className="w-4 h-4" /> Done
                  </div>
                )}
                {isActive && (
                  <div className="flex items-center gap-1 text-orange-500 text-xs font-medium">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> In Progress
                  </div>
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    );
  }

  // Compact Variant
  if (variant === 'compact') {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <React.Fragment key={index}>
              <motion.button
                onClick={() => onStepClick(index)}
                className={`flex items-center gap-2 ${
                  isActive || isCompleted ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                whileHover={isActive || isCompleted ? { scale: 1.05 } : {}}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                      : isActive
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 animate-pulse'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {isCompleted ? <FiCheck className="w-4 h-4" /> : index + 1}
                </div>
                {showLabels && (
                  <span className={`text-xs font-medium ${
                    isActive ? 'text-orange-500' : isCompleted ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                )}
              </motion.button>
              {index < steps.length - 1 && (
                <FiChevronRight className={`w-4 h-4 ${
                  isCompleted ? 'text-orange-500' : 'text-gray-300 dark:text-gray-600'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // Default Variant
  return (
    <div className={`flex items-center justify-between w-full max-w-3xl mx-auto mb-8 ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <React.Fragment key={index}>
            <motion.button
              onClick={() => onStepClick(index)}
              className={`flex items-center gap-3 ${
                isActive || isCompleted ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
              whileHover={isActive || isCompleted ? { scale: 1.02 } : {}}
              whileTap={isActive || isCompleted ? { scale: 0.98 } : {}}
              aria-label={`Step ${index + 1}: ${step.label}`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                      : isActive
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 animate-pulse'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {isCompleted ? <FiCheck className="w-5 h-5" /> : index + 1}
                </div>
                {showLabels && (
                  <div className="hidden md:block text-left">
                    <p className={`text-xs font-medium ${
                      isActive ? 'text-orange-500' : isCompleted ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'
                    }`}>
                      Step {index + 1}
                    </p>
                    <p className={`text-sm font-semibold ${
                      isActive ? 'text-gray-800 dark:text-white' : isCompleted ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                )}
              </div>
            </motion.button>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2">
                <div className={`h-full transition-all duration-500 ${
                  isCompleted ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BookingStepper;