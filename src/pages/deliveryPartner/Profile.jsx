// src/pages/deliveryPartner/Profile.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiSave,
  FiX,
  FiTruck,
  FiStar,
  FiDollarSign,
  FiPackage,
  FiClock,
  FiCalendar,
  FiLogOut,
  FiUpload,
  FiCamera,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const DeliveryPartnerProfile = () => {
  const { user, logout, updateUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Delivery Partner',
    email: user?.email || 'delivery@example.com',
    phone: user?.phone || '+1 234 567 890',
    address: user?.address || '123 Delivery St, City',
    vehicle: 'Motorcycle',
    vehicleNumber: 'ABC-1234',
    licenseNumber: 'DL-123456789',
    experience: '2 years',
  });

  const stats = [
    { label: 'Total Deliveries', value: 145, icon: FiPackage, color: 'blue' },
    { label: 'Total Earnings', value: '$1,245.50', icon: FiDollarSign, color: 'green' },
    { label: 'Rating', value: '4.8 ★', icon: FiStar, color: 'yellow' },
    { label: 'On Time', value: '98%', icon: FiClock, color: 'orange' },
  ];

  const recentDeliveries = [
    { id: 'DEL-001', restaurant: 'Pizza Palace', earnings: 5.50, date: '2024-01-15', status: 'completed' },
    { id: 'DEL-002', restaurant: 'Burger House', earnings: 4.50, date: '2024-01-14', status: 'completed' },
    { id: 'DEL-003', restaurant: 'Sushi Master', earnings: 4.00, date: '2024-01-13', status: 'completed' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
  };

  const handlePhotoUpload = () => {
    toast.info('Photo upload feature coming soon');
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    };
    return badges[status] || 'bg-gray-100 text-gray-600';
  };

  const getStatusLabel = (status) => {
    const labels = {
      completed: 'Completed',
      pending: 'Pending',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6"
          >
            <div className="flex flex-wrap items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-3xl font-bold text-white">
                  {formData.name?.charAt(0) || 'D'}
                </div>
                <button
                  onClick={handlePhotoUpload}
                  className="absolute -bottom-1 -right-1 p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-lg"
                >
                  <FiCamera className="w-4 h-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl food-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl food-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl food-input"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Vehicle
                        </label>
                        <select
                          name="vehicle"
                          value={formData.vehicle}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-xl food-input"
                        >
                          <option value="Motorcycle">Motorcycle</option>
                          <option value="Car">Car</option>
                          <option value="Bicycle">Bicycle</option>
                          <option value="Scooter">Scooter</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Vehicle Number
                        </label>
                        <input
                          type="text"
                          name="vehicleNumber"
                          value={formData.vehicleNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-xl food-input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          License Number
                        </label>
                        <input
                          type="text"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-xl food-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Experience
                        </label>
                        <input
                          type="text"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-xl food-input"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                      >
                        <FiSave className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                      >
                        <FiX className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {formData.name}
                        </h2>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-sm text-gray-500">
                            <FiTruck className="w-4 h-4" />
                            {formData.vehicle} • {formData.vehicleNumber}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="flex items-center gap-1 text-sm text-gray-500">
                            <FiShield className="w-4 h-4" />
                            {formData.licenseNumber}
                          </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{formData.email}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formData.phone} • {formData.address}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                          <FiEdit2 className="w-4 h-4" />
                          Edit Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                          <FiLogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg text-center"
                >
                  <div className={`w-12 h-12 mx-auto rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20 flex items-center justify-center mb-2`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Recent Deliveries */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Recent Deliveries
              </h3>
              <Link to="/delivery/history">
                <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                  View All →
                </button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {delivery.restaurant}
                    </p>
                    <p className="text-sm text-gray-500">
                      {delivery.id} • {delivery.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(delivery.status)}`}>
                      {getStatusLabel(delivery.status)}
                    </span>
                    <span className="font-semibold text-orange-500">
                      ${delivery.earnings.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// ✅ THIS IS THE FIX - DEFAULT EXPORT MUST BE PRESENT
export default DeliveryPartnerProfile;