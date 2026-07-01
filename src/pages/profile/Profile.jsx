import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiStar,
  FiShoppingBag,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiEdit2,
  FiCamera,
  FiTruck,
  FiPackage,
  FiCheckCircle,
  FiXCircle,
  FiClock as FiClockIcon,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiKey,
  FiHome,
  FiBriefcase,
  FiPlus,
  FiTrash2,
  FiCreditCard,
  FiDollarSign,
  FiBell,
  FiMail as FiMailIcon,
  FiSmartphone,
  FiGlobe,
  FiMoon,
  FiSun,
  FiAlertCircle,
  FiChevronRight,
  FiX,
  FiAward
} from 'react-icons/fi';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // User state
  const [user, setUser] = useState({
    name: 'Amar Deep Kumar',
    email: 'amar@example.com',
    phone: '+91 9876543210',
    gender: 'Male',
    dob: '1995-06-15',
    address: '123 Foodie Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    memberSince: 'January 2024',
    loyaltyLevel: 'Gold',
    avatar: null,
    coverImage: null
  });

  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Form States
  const [editForm, setEditForm] = useState({ ...user });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  // Mock Data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      restaurant: 'Pizza Palace',
      items: '2x Margherita Pizza, 1x Garlic Bread',
      total: 36.97,
      status: 'delivered',
      date: '2024-01-15',
      time: '7:30 PM',
      image: '🍕'
    },
    {
      id: 'ORD-2024-002',
      restaurant: 'Burger King',
      items: '1x Whopper Meal, 1x Fries',
      total: 18.99,
      status: 'in_transit',
      date: '2024-01-14',
      time: '1:15 PM',
      image: '🍔'
    },
    {
      id: 'ORD-2024-003',
      restaurant: 'Sushi Master',
      items: '3x California Roll, 2x Miso Soup',
      total: 45.00,
      status: 'preparing',
      date: '2024-01-14',
      time: '11:00 AM',
      image: '🍣'
    },
    {
      id: 'ORD-2024-004',
      restaurant: 'Thai Garden',
      items: '1x Green Curry, 2x Rice',
      total: 28.50,
      status: 'cancelled',
      date: '2024-01-13',
      time: '8:45 PM',
      image: '🥘'
    }
  ]);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      label: 'Home',
      address: '123 Foodie Street, Andheri East',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    {
      id: 2,
      type: 'office',
      label: 'Office',
      address: '456 Business Park, BKC',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      isDefault: false
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'upi',
      label: 'Google Pay',
      details: 'amar@upi',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      label: 'Credit Card',
      details: '**** **** **** 1234',
      isDefault: false
    }
  ]);

  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false
  });

  const [settings, setSettings] = useState({
    darkMode: false,
    language: 'English'
  });

  const [stats, setStats] = useState([
    { label: 'Total Orders', value: '24', icon: FiShoppingBag, color: 'from-blue-500 to-blue-600' },
    { label: 'Favorites', value: '12', icon: FiHeart, color: 'from-red-500 to-pink-500' },
    { label: 'Reviews', value: '8', icon: FiStar, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Total Spent', value: '$156.49', icon: FiDollarSign, color: 'from-green-500 to-green-600' }
  ]);

  // Handlers
  const handleEditProfile = () => {
    if (isEditing) {
      setUser({ ...editForm });
      toast.success('Profile updated successfully!');
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setEditForm({ ...user });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSavePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters!');
      return;
    }
    toast.success('Password changed successfully!');
    setShowPasswordModal(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogout = () => {
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    toast.warning('Account deletion request submitted');
    setShowDeleteModal(false);
  };

  const handleAddAddress = () => {
    const newAddr = {
      id: addresses.length + 1,
      ...newAddress,
      label: newAddress.type.charAt(0).toUpperCase() + newAddress.type.slice(1)
    };
    setAddresses([...addresses, newAddr]);
    setShowAddAddress(false);
    setNewAddress({
      type: 'home',
      address: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
    toast.success('Address added successfully!');
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast.info('Address removed');
  };

  const handleAddPayment = () => {
    toast.success('Payment method added successfully!');
    setShowAddPayment(false);
  };

  const handleRepeatOrder = (orderId) => {
    toast.success('Order repeated! Redirecting to checkout...');
    navigate('/checkout');
  };

  const handleNotificationToggle = (type) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${!notifications[type] ? 'enabled' : 'disabled'}`);
  };

  const handleThemeToggle = () => {
    setSettings({
      ...settings,
      darkMode: !settings.darkMode
    });
    document.documentElement.classList.toggle('dark');
    toast.success(`${!settings.darkMode ? 'Dark' : 'Light'} mode activated`);
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      in_transit: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      preparing: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.preparing;
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: FiCheckCircle,
      in_transit: FiTruck,
      preparing: FiClockIcon,
      cancelled: FiXCircle
    };
    return icons[status] || FiClockIcon;
  };

  const getStatusText = (status) => {
    const texts = {
      delivered: 'Delivered',
      in_transit: 'In Transit',
      preparing: 'Preparing',
      cancelled: 'Cancelled'
    };
    return texts[status] || status;
  };

  const getLoyaltyBadge = (level) => {
    const badges = {
      Bronze: '🥉',
      Silver: '🥈',
      Gold: '🥇',
      Platinum: '💎',
      Diamond: '👑'
    };
    return badges[level] || '⭐';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <span className="text-4xl">👤</span>
              My Profile
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your account and view your orders
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl overflow-hidden mb-8"
        >
          {/* Cover Banner */}
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
            <div className="absolute inset-0 bg-black/20" />
            <button className="absolute bottom-4 right-4 p-2 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300">
              <FiCamera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-16">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-800 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 flex items-center justify-center text-5xl shadow-2xl">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 rounded-xl bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all duration-300"
                >
                  <FiCamera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setUser({ ...user, avatar: event.target?.result });
                        toast.success('Profile picture updated!');
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              {/* User Details */}
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {user.name}
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Active
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-semibold flex items-center gap-1">
                    {getLoyaltyBadge(user.loyaltyLevel)} {user.loyaltyLevel} Member
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiMail className="w-4 h-4" /> {user.email}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiPhone className="w-4 h-4" /> {user.phone}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiCalendar className="w-4 h-4" /> Member since {user.memberSince}
                  </span>
                </div>
                <button
                  onClick={handleEditProfile}
                  className="mt-3 flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                >
                  <FiEdit2 className="w-4 h-4" />
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card rounded-2xl p-4 md:p-6 text-center hover:shadow-3xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl mx-auto mb-2`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
            {['overview', 'orders', 'addresses', 'payments', 'notifications', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-6"
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiUser className="text-orange-500" />
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    {isEditing ? (
                      <>
                        <div>
                          <label className="text-sm text-gray-500 dark:text-gray-400">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-4 py-2 rounded-xl food-input"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={editForm.email}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-4 py-2 rounded-xl food-input"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500 dark:text-gray-400">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={editForm.phone}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-4 py-2 rounded-xl food-input"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500 dark:text-gray-400">Gender</label>
                          <select
                            name="gender"
                            value={editForm.gender}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-4 py-2 rounded-xl food-input"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</label>
                          <input
                            type="date"
                            name="dob"
                            value={editForm.dob}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-4 py-2 rounded-xl food-input"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500 dark:text-gray-400">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={editForm.address}
                            onChange={handleInputChange}
                            className="w-full mt-1 px-4 py-2 rounded-xl food-input"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={handleEditProfile}
                            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <span className="text-gray-500 dark:text-gray-400">Full Name</span>
                          <span className="font-semibold text-gray-800 dark:text-white">{user.name}</span>
                        </div>
                        <div className="flex justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <span className="text-gray-500 dark:text-gray-400">Email</span>
                          <span className="font-semibold text-gray-800 dark:text-white">{user.email}</span>
                        </div>
                        <div className="flex justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <span className="text-gray-500 dark:text-gray-400">Phone</span>
                          <span className="font-semibold text-gray-800 dark:text-white">{user.phone}</span>
                        </div>
                        <div className="flex justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <span className="text-gray-500 dark:text-gray-400">Gender</span>
                          <span className="font-semibold text-gray-800 dark:text-white">{user.gender}</span>
                        </div>
                        <div className="flex justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <span className="text-gray-500 dark:text-gray-400">Date of Birth</span>
                          <span className="font-semibold text-gray-800 dark:text-white">
                            {new Date(user.dob).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <span className="text-gray-500 dark:text-gray-400">Address</span>
                          <span className="font-semibold text-gray-800 dark:text-white">{user.address}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Security & Quick Actions */}
                <div className="space-y-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <FiShield className="text-orange-500" />
                      Security
                    </h3>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FiKey className="text-orange-500" />
                        Change Password
                      </span>
                      <FiChevronRight className="text-gray-400" />
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full mt-2 flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <span className="text-red-600 dark:text-red-400 flex items-center gap-2">
                        <FiAlertCircle className="w-4 h-4" />
                        Delete Account
                      </span>
                      <FiChevronRight className="text-red-400" />
                    </button>
                  </div>

                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <FiAward className="text-orange-500" />
                      Loyalty Status
                    </h3>
                    <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800/30">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{getLoyaltyBadge(user.loyaltyLevel)}</span>
                        <div>
                          <p className="text-lg font-bold text-gray-800 dark:text-white">{user.loyaltyLevel} Member</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">You're {user.loyaltyLevel === 'Gold' ? '200' : '50'} points away from Platinum</p>
                        </div>
                      </div>
                      <div className="mt-3 w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="glass-card rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiShoppingBag className="text-orange-500" />
                    Order History
                  </h3>
                  <span className="text-sm text-gray-400">{orders.length} orders</span>
                </div>
                <div className="space-y-4">
                  {orders.map((order) => {
                    const StatusIcon = getStatusIcon(order.status);
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{order.image}</div>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{order.restaurant}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.items}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                              <span>{order.date}</span>
                              <span>•</span>
                              <span>{order.time}</span>
                              <span>•</span>
                              <span className="font-medium text-gray-600 dark:text-gray-300">${order.total}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                          <span className={`text-xs px-3 py-1.5 rounded-full ${getStatusColor(order.status)} font-medium flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {getStatusText(order.status)}
                          </span>
                          {order.status !== 'cancelled' && (
                            <button
                              onClick={() => handleRepeatOrder(order.id)}
                              className="text-xs px-3 py-1.5 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
                            >
                              Repeat Order
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiMapPin className="text-orange-500" />
                    Saved Addresses
                  </h3>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Address
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <motion.div
                      key={address.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass-card rounded-2xl p-4 hover:shadow-3xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {address.type === 'home' && <FiHome className="text-orange-500" />}
                          {address.type === 'office' && <FiBriefcase className="text-blue-500" />}
                          {address.type === 'other' && <FiMapPin className="text-purple-500" />}
                          <span className="font-semibold text-gray-800 dark:text-white">{address.label}</span>
                          {address.isDefault && (
                            <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <FiEdit2 className="w-4 h-4 text-gray-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{address.address}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <FiCreditCard className="text-orange-500" />
                    Payment Methods
                  </h3>
                  <button
                    onClick={() => setShowAddPayment(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Payment
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass-card rounded-2xl p-4 hover:shadow-3xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-xl">
                            {method.type === 'upi' && '📱'}
                            {method.type === 'card' && '💳'}
                            {method.type === 'wallet' && '👛'}
                            {method.type === 'cod' && '💰'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{method.label}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{method.details}</p>
                          </div>
                        </div>
                        {method.isDefault && (
                          <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold">
                            Default
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FiBell className="text-orange-500" />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <FiBell className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">Push Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Get real-time updates on your orders</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('push')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${notifications.push ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications.push ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <FiMailIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">Email Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive order confirmations and offers</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('email')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${notifications.email ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications.email ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <FiSmartphone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">SMS Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Get delivery updates via SMS</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('sms')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${notifications.sms ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications.sms ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiSettings className="text-orange-500" />
                    Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        {settings.darkMode ? (
                          <FiMoon className="w-5 h-5 text-gray-400" />
                        ) : (
                          <FiSun className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">Dark Mode</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark/light theme</p>
                        </div>
                      </div>
                      <button
                        onClick={handleThemeToggle}
                        className={`relative w-12 h-6 rounded-full transition-colors ${settings.darkMode ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        <FiGlobe className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">Language</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred language</p>
                        </div>
                      </div>
                      <select
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FiAlertCircle className="text-orange-500" />
                    Account Actions
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FiKey className="text-orange-500" />
                        Change Password
                      </span>
                      <FiChevronRight className="text-gray-400" />
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FiLogOut className="text-orange-500" />
                        Logout
                      </span>
                      <FiChevronRight className="text-gray-400" />
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <span className="text-red-600 dark:text-red-400 flex items-center gap-2">
                        <FiAlertCircle className="w-4 h-4" />
                        Delete Account
                      </span>
                      <FiChevronRight className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <FiKey className="text-orange-500" />
                  Change Password
                </h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 rounded-xl food-input pr-12"
                      placeholder="Enter current password"
                    />
                    <button
                      onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword.current ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 rounded-xl food-input pr-12"
                      placeholder="Enter new password"
                    />
                    <button
                      onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword.new ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 rounded-xl food-input pr-12"
                      placeholder="Confirm new password"
                    />
                    <button
                      onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword.confirm ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePassword}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    Save Password
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card rounded-3xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Delete Account
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Address Modal */}
      <AnimatePresence>
        {showAddAddress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddAddress(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <FiMapPin className="text-orange-500" />
                  Add Address
                </h3>
                <button
                  onClick={() => setShowAddAddress(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Address Type
                  </label>
                  <select
                    value={newAddress.type}
                    onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl food-input"
                  >
                    <option value="home">Home</option>
                    <option value="office">Office</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl food-input"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl food-input"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl food-input"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl food-input"
                    placeholder="Pincode"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newAddress.isDefault}
                    onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <label className="text-sm text-gray-700 dark:text-gray-300">Set as default address</label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowAddAddress(false)}
                    className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddAddress}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Payment Modal */}
      <AnimatePresence>
        {showAddPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddPayment(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card rounded-3xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <FiCreditCard className="text-orange-500" />
                  Add Payment Method
                </h3>
                <button
                  onClick={() => setShowAddPayment(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Payment Type
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl food-input">
                    <option value="upi">UPI</option>
                    <option value="card">Credit Card</option>
                    <option value="card">Debit Card</option>
                    <option value="wallet">Wallet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Details
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl food-input"
                    placeholder="Enter payment details"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowAddPayment(false)}
                    className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPayment}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
                  >
                    Add Payment
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;