// src/pages/admin/Reviews.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiStar,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiUser,
  FiClock,
  FiMessageSquare,
  FiThumbsUp,
  FiThumbsDown,
  FiMoreVertical,
  FiFlag,
  FiMail,
  FiCalendar,
  FiStar as FiStarFilled,
} from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-toastify';

const Reviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const reviews = [
    {
      id: 1,
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      },
      restaurant: {
        name: 'Pizza Palace',
        id: 1,
      },
      rating: 5,
      title: 'Amazing Pizza!',
      comment: 'The best pizza I\'ve ever had! Fresh ingredients, perfect crust, and amazing service. Highly recommend the Margherita pizza.',
      date: '2024-01-15T14:30:00',
      status: 'approved',
      likes: 24,
      dislikes: 2,
      helpful: 18,
      images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200'],
      reply: {
        text: 'Thank you for your wonderful review! We\'re so glad you enjoyed our pizza. Hope to see you again soon!',
        date: '2024-01-16T10:00:00',
        by: 'Pizza Palace Team',
      },
      isVerified: true,
      orderId: 'ORD-12345',
    },
    {
      id: 2,
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      },
      restaurant: {
        name: 'Burger House',
        id: 2,
      },
      rating: 4,
      title: 'Great Burgers!',
      comment: 'Delicious burgers with fresh ingredients. The fries were perfect too. Will definitely order again.',
      date: '2024-01-14T18:20:00',
      status: 'pending',
      likes: 12,
      dislikes: 1,
      helpful: 8,
      images: [],
      reply: null,
      isVerified: true,
      orderId: 'ORD-12346',
    },
    {
      id: 3,
      customer: {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      },
      restaurant: {
        name: 'Sushi Master',
        id: 3,
      },
      rating: 2,
      title: 'Disappointed',
      comment: 'The sushi was not fresh. The fish smelled off and the rice was dry. Very disappointed with the quality.',
      date: '2024-01-13T20:15:00',
      status: 'flagged',
      likes: 3,
      dislikes: 8,
      helpful: 2,
      images: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200'],
      reply: null,
      isVerified: true,
      orderId: 'ORD-12347',
    },
    {
      id: 4,
      customer: {
        name: 'Alice Brown',
        email: 'alice@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      },
      restaurant: {
        name: 'Pasta Paradise',
        id: 4,
      },
      rating: 5,
      title: 'Perfect Pasta!',
      comment: 'Authentic Italian pasta! The Alfredo sauce was creamy and delicious. Garlic bread was amazing too.',
      date: '2024-01-12T19:45:00',
      status: 'approved',
      likes: 32,
      dislikes: 0,
      helpful: 25,
      images: ['https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200'],
      reply: {
        text: 'Grazie mille! We\'re thrilled you loved our pasta. Come back soon for more authentic Italian dishes!',
        date: '2024-01-13T11:30:00',
        by: 'Pasta Paradise Team',
      },
      isVerified: true,
      orderId: 'ORD-12348',
    },
    {
      id: 5,
      customer: {
        name: 'Charlie Wilson',
        email: 'charlie@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      },
      restaurant: {
        name: 'Taco Bell',
        id: 5,
      },
      rating: 3,
      title: 'Average experience',
      comment: 'The food was okay but nothing special. Delivery was late and the food was cold.',
      date: '2024-01-11T13:00:00',
      status: 'approved',
      likes: 5,
      dislikes: 3,
      helpful: 4,
      images: [],
      reply: null,
      isVerified: false,
      orderId: 'ORD-12349',
    },
    {
      id: 6,
      customer: {
        name: 'Diana Prince',
        email: 'diana@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      },
      restaurant: {
        name: 'Sweet Treats',
        id: 6,
      },
      rating: 5,
      title: 'Best Desserts in Town!',
      comment: 'The chocolate lava cake was heavenly! Perfectly baked with a gooey center. The tiramisu was also excellent.',
      date: '2024-01-10T21:30:00',
      status: 'approved',
      likes: 45,
      dislikes: 1,
      helpful: 30,
      images: ['https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200'],
      reply: {
        text: 'Thank you so much! We put our heart into every dessert. Can\'t wait to serve you again!',
        date: '2024-01-11T09:00:00',
        by: 'Sweet Treats Team',
      },
      isVerified: true,
      orderId: 'ORD-12350',
    },
    {
      id: 7,
      customer: {
        name: 'Eva Martinez',
        email: 'eva@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      },
      restaurant: {
        name: 'Pizza Palace',
        id: 1,
      },
      rating: 4,
      title: 'Good but pricey',
      comment: 'The pizza was good but the prices are a bit high for the portion size. Taste was great though.',
      date: '2024-01-09T12:15:00',
      status: 'pending',
      likes: 6,
      dislikes: 4,
      helpful: 3,
      images: [],
      reply: null,
      isVerified: true,
      orderId: 'ORD-12351',
    },
    {
      id: 8,
      customer: {
        name: 'Frank Castle',
        email: 'frank@example.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      },
      restaurant: {
        name: 'Burger House',
        id: 2,
      },
      rating: 1,
      title: 'Terrible Experience',
      comment: 'Order never arrived. Customer service was unhelpful. Had to get a refund after 2 hours of waiting.',
      date: '2024-01-08T20:00:00',
      status: 'flagged',
      likes: 1,
      dislikes: 10,
      helpful: 1,
      images: [],
      reply: null,
      isVerified: true,
      orderId: 'ORD-12352',
    },
  ];

  const statuses = [
    { id: 'all', label: 'All', count: reviews.length },
    { id: 'approved', label: 'Approved', count: reviews.filter(r => r.status === 'approved').length },
    { id: 'pending', label: 'Pending', count: reviews.filter(r => r.status === 'pending').length },
    { id: 'flagged', label: 'Flagged', count: reviews.filter(r => r.status === 'flagged').length },
  ];

  const ratingOptions = [
    { id: 'all', label: 'All Ratings' },
    { id: '5', label: '5 Stars' },
    { id: '4', label: '4 Stars' },
    { id: '3', label: '3 Stars' },
    { id: '2', label: '2 Stars' },
    { id: '1', label: '1 Star' },
  ];

  const typeOptions = [
    { id: 'all', label: 'All Types' },
    { id: 'with_images', label: 'With Images' },
    { id: 'with_replies', label: 'With Replies' },
    { id: 'verified', label: 'Verified Orders' },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
      } else {
        stars.push(<FaRegStar key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const getStatusBadge = (status) => {
    const badges = {
      approved: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      flagged: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    };
    return badges[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status) => {
    const icons = {
      approved: <FiCheckCircle className="w-4 h-4" />,
      pending: <FiClock className="w-4 h-4" />,
      flagged: <FiFlag className="w-4 h-4" />,
    };
    return icons[status] || null;
  };

  const getStatusLabel = (status) => {
    const labels = {
      approved: 'Approved',
      pending: 'Pending',
      flagged: 'Flagged',
    };
    return labels[status] || status;
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          review.restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = selectedRating === 'all' || review.rating === parseInt(selectedRating);
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    const matchesType = selectedType === 'all' || 
                        (selectedType === 'with_images' && review.images.length > 0) ||
                        (selectedType === 'with_replies' && review.reply !== null) ||
                        (selectedType === 'verified' && review.isVerified);
    return matchesSearch && matchesRating && matchesStatus && matchesType;
  });

  const totalPages = Math.ceil(filteredReviews.length / 5);
  const paginatedReviews = filteredReviews.slice((currentPage - 1) * 5, currentPage * 5);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Reviews refreshed!');
    }, 1000);
  };

  const handleExport = () => {
    toast.success('Reviews exported successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      toast.success('Review deleted successfully');
    }
  };

  const handleApprove = (id) => {
    toast.success('Review approved successfully');
  };

  const handleFlag = (id) => {
    toast.success('Review flagged for review');
  };

  const handleReply = (id) => {
    toast.info('Reply feature coming soon');
  };

  // Stats
  const totalReviews = filteredReviews.length;
  const avgRating = totalReviews > 0 
    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0;
  const positiveReviews = filteredReviews.filter(r => r.rating >= 4).length;
  const negativeReviews = filteredReviews.filter(r => r.rating <= 2).length;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <FiStar className="text-orange-500" />
                Reviews
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Manage all customer reviews and ratings</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <FiDownload className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalReviews}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-bold text-yellow-500">{avgRating} ★</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Positive Reviews</p>
              <p className="text-2xl font-bold text-green-500">{positiveReviews}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <p className="text-sm text-gray-500">Negative Reviews</p>
              <p className="text-2xl font-bold text-red-500">{negativeReviews}</p>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            {statuses.map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedStatus === status.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="font-semibold">{status.count}</span>
                <span className="ml-1 text-sm">{status.label}</span>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by customer, restaurant, or review..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-gray-600 dark:text-gray-300"
              >
                {ratingOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-gray-600 dark:text-gray-300"
              >
                {typeOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {paginatedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex flex-wrap gap-4">
                  {/* Avatar & Customer Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={review.customer.avatar}
                      alt={review.customer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {review.customer.name}
                        </h3>
                        {review.isVerified && (
                          <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 text-xs font-medium flex items-center gap-1">
                            <FiCheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                        <span className="text-sm text-gray-500">• {review.restaurant.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {review.rating}.0
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-800 dark:text-white mt-1">
                        {review.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        {review.comment}
                      </p>
                      {review.images.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {review.images.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`Review ${i + 1}`}
                              className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiThumbsUp className="w-3 h-3 text-green-500" />
                          {review.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiThumbsDown className="w-3 h-3 text-red-500" />
                          {review.dislikes}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiMessageSquare className="w-3 h-3 text-blue-500" />
                          {review.helpful} helpful
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(review.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(review.status)}`}>
                        {getStatusLabel(review.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleApprove(review.id)}
                        className="p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                        title="Approve"
                      >
                        <FiCheckCircle className="w-4 h-4 text-green-500" />
                      </button>
                      <button
                        onClick={() => handleFlag(review.id)}
                        className="p-2 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                        title="Flag"
                      >
                        <FiFlag className="w-4 h-4 text-yellow-500" />
                      </button>
                      <button
                        onClick={() => handleReply(review.id)}
                        className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="Reply"
                      >
                        <FiMessageSquare className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4 text-red-500" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="More">
                        <FiMoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reply Section */}
                {review.reply && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
                      <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/20">
                        <FiMessageSquare className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-800 dark:text-white">
                            {review.reply.by}
                          </p>
                          <span className="text-xs text-gray-500">
                            {new Date(review.reply.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {review.reply.text}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <p>Showing {paginatedReviews.length} of {filteredReviews.length} reviews</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      currentPage === i + 1
                        ? 'bg-orange-500 text-white'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Reviews Found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Reviews;