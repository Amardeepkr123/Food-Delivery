// src/pages/admin/Bookings.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiMapPin,
  FiPhone,
  FiMail,
  FiUser,
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
  FiClock as FiClockIcon,
  FiMoreVertical,
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-toastify';

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const bookings = [
    {
      id: 'BK-001',
      customer: 'David Lee',
      customerPhone: '+1 234 567 890',
      customerEmail: 'david@example.com',
      restaurant: 'Pizza Palace',
      date: '2024-01-20',
      time: '7:30 PM',
      guests: 4,
      status: 'confirmed',
      tablePreference: 'Window View',
      occasion: 'Birthday Dinner',
      specialRequests: 'Birthday cake for celebration',
      createdAt: '2024-01-15T10:30:00',
    },
    {
      id: 'BK-002',
      customer: 'Sarah Kim',
      customerPhone: '+1 234 567 891',
      customerEmail: 'sarah@example.com',
      restaurant: 'Sushi Master',
      date: '2024-01-18',
      time: '8:00 PM',
      guests: 2,
      status: 'pending',
      tablePreference: 'Private Room',
      occasion: 'Date Night',
      specialRequests: 'Vegetarian options please',
      createdAt: '2024-01-14T14:20:00',
    },
    {
      id: 'BK-003',
      customer: 'Mike Brown',
      customerPhone: '+1 234 567 892',
      customerEmail: 'mike@example.com',
      restaurant: 'Burger House',
      date: '2024-01-16',
      time: '12:30 PM',
      guests: 3,
      status: 'completed',
      tablePreference: 'Any Table',
      occasion: 'Lunch Meeting',
      specialRequests: '',
      createdAt: '2024-01-14T09:15:00',
    },
    {
      id: 'BK-004',
      customer: 'Emily Wilson',
      customerPhone: '+1 234 567 893',
      customerEmail: 'emily@example.com',
      restaurant: 'Pasta Paradise',
      date: '2024-01-22',
      time: '6:00 PM',
      guests: 6,
      status: 'confirmed',
      tablePreference: 'Outdoor',
      occasion: 'Family Dinner',
      specialRequests: 'High chair for toddler',
      createdAt: '2024-01-16T11:45:00',
    },
    {
      id: 'BK-005',
      customer: 'Chris Davis',
      customerPhone: '+1 234 567 894',
      customerEmail: 'chris@example.com',
      restaurant: 'Sushi Master',
      date: '2024-01-15',
      time: '9:00 PM',
      guests: 2,
      status: 'cancelled',
      tablePreference: 'Bar Seating',
      occasion: 'Dinner',
      specialRequests: '',
      createdAt: '2024-01-13T16:00:00',
    },
    {
      id: 'BK-006',
      customer: 'Lisa Park',
      customerPhone: '+1 234 567 895',
      customerEmail: 'lisa@example.com',
      restaurant: 'Pizza Palace',
      date: '2024-01-25',
      time: '7:00 PM',
      guests: 8,
      status: 'pending',
      tablePreference: 'Private Room',
      occasion: 'Corporate Dinner',
      specialRequests: 'Projector for presentation',
      createdAt: '2024-01-17T09:30:00',
    },
  ];

  const statuses = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
    { id: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
    { id: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      confirmed: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      completed: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    };
    return badges[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FiClockIcon className="w-4 h-4" />,
      confirmed: <FiCheckCircle className="w-4 h-4" />,
      completed: <FiCheckCircle className="w-4 h-4" />,
      cancelled: <FiXCircle className="w-4 h-4" />,
    };
    return icons[status] || null;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBookings.length / 5);
  const paginatedBookings = filteredBookings.slice((currentPage - 1) * 5, currentPage * 5);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Bookings refreshed!');
    }, 1000);
  };

  const handleExport = () => {
    toast.success('Bookings exported successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      toast.success('Booking deleted successfully');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    toast.success(`Booking status updated to ${newStatus}`);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <FiCalendar className="text-orange-500" />
                Table Bookings
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Manage all table reservations</p>
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

          {/* Status Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
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

          {/* Search */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Booking ID, Customer, or Restaurant..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Booking ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Restaurant</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Guests</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedBookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">{booking.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{booking.customer}</p>
                          <p className="text-xs text-gray-500">{booking.customerPhone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{booking.restaurant}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-300">{booking.date}</div>
                        <div className="text-xs text-gray-400">{booking.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                          <FiUsers className="w-4 h-4" />
                          {booking.guests}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(booking.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(booking.status)}`}>
                            {getStatusLabel(booking.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="View Details">
                            <FiEye className="w-4 h-4 text-blue-500" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Edit">
                            <FiEdit2 className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4 text-red-500" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="More">
                            <FiMoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <p>Showing {paginatedBookings.length} of {filteredBookings.length} bookings</p>
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
          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Bookings Found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Bookings;