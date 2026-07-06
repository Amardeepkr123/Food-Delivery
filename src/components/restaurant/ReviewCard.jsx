import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiStar, 
  FiHeart, 
  FiShare2, 
  FiFlag,
  FiMessageSquare,
  FiThumbsUp,
  FiThumbsDown,
  FiClock,
  FiMoreVertical,
  FiCheckCircle
} from 'react-icons/fi';

const ReviewCard = ({
  review,
  variant = 'default',
  className = '',
  ...props
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  const {
    id,
    customer,
    rating,
    comment,
    date,
    time,
    image,
    verified = true,
    helpful = 12,
    replies = 3
  } = review;

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
    }
  };

  // Compact Variant
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-start gap-3 p-3 rounded-xl glass-card hover:shadow-3xl transition-all duration-300 ${className}`}
        {...props}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-sm font-bold">
          {image ? (
            <img src={image} alt={customer} className="w-full h-full object-cover" />
          ) : (
            customer.charAt(0)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800 dark:text-white text-sm">{customer}</span>
            {verified && (
              <FiCheckCircle className="w-3 h-3 text-blue-500" />
            )}
          </div>
          <div className="flex text-yellow-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={`w-3 h-3 ${i < rating ? 'fill-current' : ''}`} />
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{comment}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">{time}</p>
        </div>
      </motion.div>
    );
  }

  // Default Variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`glass-card rounded-2xl p-5 hover:shadow-3xl transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white font-bold">
            {image ? (
              <img src={image} alt={customer} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg">{customer.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-800 dark:text-white">
                {customer}
              </h4>
              {verified && (
                <span className="flex items-center gap-0.5 text-[10px] text-blue-500">
                  <FiCheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={`w-3 h-3 ${i < rating ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-xs text-gray-400">{time}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            <FiMoreVertical className="w-4 h-4 text-gray-400" />
          </button>

          {showActions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 top-full mt-1 glass-card rounded-xl p-1 shadow-2xl z-10 min-w-[120px]"
            >
              <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-sm text-gray-600 dark:text-gray-300">
                <FiFlag className="w-3 h-3" /> Report
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-sm text-gray-600 dark:text-gray-300">
                <FiShare2 className="w-3 h-3" /> Share
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Review Content */}
      <div className="mt-3">
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {comment}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-300 ${
              isLiked ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'
            }`}
          >
            <FiThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-blue-500' : ''}`} />
            <span className="text-xs">{helpful + (isLiked ? 1 : 0)}</span>
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-300 ${
              isDisliked ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'
            }`}
          >
            <FiThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-red-500' : ''}`} />
          </button>
        </div>

        <button className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-500 text-sm">
          <FiMessageSquare className="w-4 h-4" />
          <span className="text-xs">Reply ({replies})</span>
        </button>

        <button className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-500 text-sm">
          <FiHeart className="w-4 h-4" />
          <span className="text-xs">Thanks</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewCard;