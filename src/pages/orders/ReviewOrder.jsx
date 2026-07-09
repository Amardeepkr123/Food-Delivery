// src/pages/orders/ReviewOrder.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiStar,
  FiArrowLeft,
  FiSend,
  FiCamera,
  FiImage,
  FiX,
  FiCheck,
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-hot-toast';

const ReviewOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [images, setImages] = useState([]);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      toast.error('Maximum 3 images allowed');
      return;
    }
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      toast.success('Review submitted successfully! ⭐');
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-4">
              <FiStar className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Thank You! 🎉
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Your review has been submitted successfully.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
              You earned 25 loyalty points!
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/orders">
                <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all">
                  View My Orders
                </button>
              </Link>
              <Link to="/restaurants">
                <button className="w-full py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                  Explore More
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Rate Your Order
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6"
        >
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              How was your experience with order #{id}?
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-5xl transition-transform hover:scale-110"
                >
                  <FiStar
                    className={`${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {rating === 0 && 'Tap a star to rate'}
              {rating === 1 && '⭐ Poor'}
              {rating === 2 && '⭐⭐ Fair'}
              {rating === 3 && '⭐⭐⭐ Good'}
              {rating === 4 && '⭐⭐⭐⭐ Very Good'}
              {rating === 5 && '⭐⭐⭐⭐⭐ Excellent!'}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Write a review
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="4"
                placeholder="Share your experience..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Add photos (optional)
              </label>
              <div className="flex flex-wrap gap-3">
                <label className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 transition-colors">
                  <FiCamera className="w-6 h-6 text-gray-400" />
                  <span className="text-xs text-gray-400">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {images.map((img, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-xl overflow-hidden">
                    <img src={img} alt={`Review ${index}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">Maximum 3 images</p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={rating === 0 || isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  Submit Review
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ReviewOrder;