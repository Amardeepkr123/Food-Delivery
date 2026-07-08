// src/components/review/ReviewCard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  FiCheckCircle,
  FiUser,
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiX,
  FiAlertCircle,
  FiSend,
  FiImage,
  FiCamera,
} from 'react-icons/fi';
import { FaRegSmile, FaSmile } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

// ============================================
// SUB-COMPONENTS
// ============================================

// Star Rating Display
const StarRating = ({ rating, size = 'sm', showLabel = false }) => {
  const sizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const iconSize = sizes[size] || sizes.sm;

  return (
    <div className="flex items-center gap-1">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`${iconSize} ${i < rating ? 'fill-current' : ''}`}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
          {rating}
        </span>
      )}
    </div>
  );
};

// Reply Component
const Reply = ({ reply, onLike, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 pl-8 pt-3 border-t border-gray-100 dark:border-gray-800"
    >
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
        {reply.image ? (
          <img src={reply.image} alt={reply.user} className="w-full h-full object-cover" />
        ) : (
          reply.user.charAt(0)
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-gray-800 dark:text-white">
            {reply.user}
          </span>
          <span className="text-xs text-gray-400">• {reply.time}</span>
          {reply.isOwner && (
            <span className="px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-semibold">
              Owner
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
          {reply.content}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={() => onLike(reply.id)}
            className="text-xs text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-1"
          >
            <FiThumbsUp className="w-3 h-3" />
            {reply.likes > 0 && reply.likes}
          </button>
          {reply.isOwner && onDelete && (
            <button
              onClick={() => onDelete(reply.id)}
              className="text-xs text-red-400 hover:text-red-500 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Image Gallery
const ImageGallery = ({ images, onImageClick }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="flex gap-2 mt-3 flex-wrap">
      {images.slice(0, 4).map((img, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          className="relative w-16 h-16 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => onImageClick?.(img)}
        >
          <img
            src={img}
            alt={`Review image ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {index === 3 && images.length > 4 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-semibold">
              +{images.length - 4}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ============================================
// MAIN REVIEW CARD COMPONENT
// ============================================
const ReviewCard = ({
  review,
  variant = 'default',
  className = '',
  onReply,
  onLike,
  onDelete,
  onReport,
  onImageClick,
  isOwner = false,
  isAdmin = false,
  showReplies = true,
  showActions = true,
  ...props
}) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(review.isLiked || false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRepliesList, setShowRepliesList] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    id,
    user: customer,
    rating,
    comment,
    date,
    time,
    image,
    verified = true,
    helpful = 0,
    replies = [],
    images = [],
    isEdited = false,
    isPinned = false,
    isOwnerReply = false,
    location,
    orderDetails,
  } = review;

  // Handle like
  const handleLike = () => {
    const newState = !isLiked;
    setIsLiked(newState);
    if (onLike) {
      onLike(id, newState);
    }
    if (newState) {
      setIsDisliked(false);
      toast.success('You liked this review ❤️');
    }
  };

  // Handle dislike
  const handleDislike = () => {
    const newState = !isDisliked;
    setIsDisliked(newState);
    if (newState) {
      setIsLiked(false);
    }
  };

  // Handle reply
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    try {
      if (onReply) {
        await onReply(id, replyText.trim());
      }
      toast.success('Reply added successfully!');
      setReplyText('');
      setShowReplyForm(false);
    } catch (error) {
      toast.error('Failed to add reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      if (onDelete) {
        onDelete(id);
      }
      toast.success('Review deleted');
    }
  };

  // Handle report
  const handleReport = () => {
    if (onReport) {
      onReport(id);
    }
    toast.info('Review reported');
    setShowActionsMenu(false);
  };

  // Compact Variant
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ y: -2 }}
        className={`flex items-start gap-3 p-3 rounded-xl glass-card hover:shadow-3xl transition-all duration-300 ${className}`}
        {...props}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-sm font-bold">
          {image ? (
            <img src={image} alt={customer} className="w-full h-full object-cover" />
          ) : (
            customer?.charAt(0) || 'U'
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800 dark:text-white text-sm">
              {customer || 'Anonymous'}
            </span>
            {verified && (
              <FiCheckCircle className="w-3 h-3 text-blue-500" />
            )}
          </div>
          <StarRating rating={rating} size="xs" />
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
            {comment}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-gray-400">{time || date}</p>
        </div>
      </motion.div>
    );
  }

  // Mini Variant
  if (variant === 'mini') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -2 }}
        className={`glass-card rounded-xl p-3 hover:shadow-2xl transition-all duration-300 ${className}`}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-xs font-bold">
            {image ? (
              <img src={image} alt={customer} className="w-full h-full object-cover" />
            ) : (
              customer?.charAt(0) || 'U'
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 dark:text-white text-xs">
                {customer || 'Anonymous'}
              </span>
              <StarRating rating={rating} size="xs" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
              {comment}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Full/Default Variant
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
              <span className="text-lg">{customer?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-gray-800 dark:text-white">
                {customer || 'Anonymous'}
              </h4>
              {verified && (
                <span className="flex items-center gap-0.5 text-[10px] text-blue-500">
                  <FiCheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
              {isPinned && (
                <span className="flex items-center gap-0.5 text-[10px] text-orange-500">
                  <FiStar className="w-3 h-3 fill-current" /> Pinned
                </span>
              )}
              {isOwner && (
                <span className="px-1.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-semibold">
                  Owner
                </span>
              )}
              {isEdited && (
                <span className="text-[10px] text-gray-400">(Edited)</span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <StarRating rating={rating} size="sm" showLabel={true} />
              <span className="text-xs text-gray-400">• {time || date}</span>
              {location && (
                <span className="text-xs text-gray-400">• {location}</span>
              )}
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        {showActions && (
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Review actions"
            >
              <FiMoreVertical className="w-4 h-4 text-gray-400" />
            </button>

            <AnimatePresence>
              {showActionsMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute right-0 top-full mt-1 glass-card rounded-xl p-1 shadow-2xl z-10 min-w-[140px]"
                >
                  {(isOwner || isAdmin) && (
                    <>
                      <button
                        onClick={handleDelete}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 text-sm text-red-500"
                      >
                        <FiTrash2 className="w-3 h-3" /> Delete
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-sm text-gray-600 dark:text-gray-300">
                        <FiEdit2 className="w-3 h-3" /> Edit
                      </button>
                    </>
                  )}
                  <button
                    onClick={handleReport}
                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <FiFlag className="w-3 h-3" /> Report
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-sm text-gray-600 dark:text-gray-300">
                    <FiShare2 className="w-3 h-3" /> Share
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Review Content */}
      <div className="mt-3">
        <div className="relative">
          <p className={`text-gray-600 dark:text-gray-300 text-sm leading-relaxed ${
            !isExpanded && comment?.length > 200 ? 'line-clamp-4' : ''
          }`}>
            {comment}
          </p>
          {comment?.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-orange-500 hover:text-orange-600 mt-1 font-medium"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>

      {/* Images Gallery */}
      <ImageGallery images={images} onImageClick={onImageClick} />

      {/* Order Details (if available) */}
      {orderDetails && (
        <div className="mt-3 p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/50 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium">Order #{orderDetails.id}</span>
          <span className="mx-2">•</span>
          <span>${orderDetails.amount}</span>
          <span className="mx-2">•</span>
          <span>{orderDetails.items} items</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-300 ${
            isLiked ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'
          }`}
        >
          <FiThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-blue-500' : ''}`} />
          <span className="text-xs">{helpful + (isLiked ? 1 : 0)}</span>
        </button>

        <button
          onClick={handleDislike}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-300 ${
            isDisliked ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'
          }`}
        >
          <FiThumbsDown className={`w-4 h-4 ${isDisliked ? 'fill-red-500' : ''}`} />
        </button>

        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-500 text-sm"
        >
          <FiMessageSquare className="w-4 h-4" />
          <span className="text-xs">Reply {replies.length > 0 && `(${replies.length})`}</span>
        </button>

        {replies.length > 0 && (
          <button
            onClick={() => setShowRepliesList(!showRepliesList)}
            className="text-xs text-gray-400 hover:text-orange-500 transition-colors"
          >
            {showRepliesList ? 'Hide replies' : `View ${replies.length} replies`}
          </button>
        )}
      </div>

      {/* Reply Form */}
      <AnimatePresence>
        {showReplyForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleReplySubmit} className="mt-3 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-sm"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={!replyText.trim() || isSubmitting}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiSend className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowReplyForm(false)}
                className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replies List */}
      <AnimatePresence>
        {showRepliesList && replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2">
              {replies.map((reply) => (
                <Reply
                  key={reply.id}
                  reply={reply}
                  onLike={handleLike}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ============================================
// SKELETON LOADER
// ============================================
export const ReviewCardSkeleton = ({ variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-start gap-3 p-3 rounded-xl glass-card animate-pulse">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-5 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48" />
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
      <div className="flex gap-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
      </div>
    </div>
  );
};

// ============================================
// EXPORTS
// ============================================
export default ReviewCard;