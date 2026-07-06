import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiStar,
  FiClock,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowUp,
  FiArrowDown,
  FiCalendar,
  FiDownload,
  FiRefreshCw,
  FiBarChart2,
  FiPieChart,
  FiSettings,
  FiLogOut,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiUserCheck,
  FiUserX,
  FiShoppingCart,
  FiCreditCard,
  FiMapPin,
  FiGlobe,
  FiMail,
  FiPhone,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiTrash2,
  FiUserPlus,
  FiUserMinus
} from 'react-icons/fi';
import { 
  FaUtensils, 
  FaPizzaSlice, 
  FaHamburger, 
  FaIceCream, 
  FaCoffee,
  FaLeaf,
  FaPepperHot,
  FaFish,
  FaBirthdayCake
} from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [pendingRestaurants, setPendingRestaurants] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockStats = {
          totalUsers: 1256,
          totalRestaurants: 342,
          totalOrders: 5678,
          totalRevenue: 84560.50,
          activeUsers: 892,
          pendingRestaurants: 23,
          ordersToday: 156,
          revenueToday: 2345.50,
          usersGrowth: 12.5,
          restaurantsGrowth: 8.3,
          ordersGrowth: 15.2,
          revenueGrowth: 18.7
        };

        const mockRecentOrders = [
          {
            id: '#ORD-2024-001',
            customer: 'Amit Sharma',
            restaurant: 'Pizza Palace',
            total: 36.97,
            status: 'delivered',
            date: '2024-01-15',
            time: '7:30 PM'
          },
          {
            id: '#ORD-2024-002',
            customer: 'Priya Patel',
            restaurant: 'Burger House',
            total: 18.99,
            status: 'in_transit',
            date: '2024-01-15',
            time: '1:15 PM'
          },
          {
            id: '#ORD-2024-003',
            customer: 'Rahul Singh',
            restaurant: 'Sushi Master',
            total: 45.00,
            status: 'preparing',
            date: '2024-01-15',
            time: '11:00 AM'
          },
          {
            id: '#ORD-2024-004',
            customer: 'Sneha Reddy',
            restaurant: 'Thai Garden',
            total: 28.50,
            status: 'cancelled',
            date: '2024-01-14',
            time: '8:45 PM'
          }
        ];

        const mockPendingRestaurants = [
          {
            id: 1,
            name: 'Taco Fiesta',
            cuisine: 'Mexican',
            owner: 'Carlos Lopez',
            email: 'carlos@tacofiesta.com',
            phone: '+91 9876543215',
            location: 'Mumbai',
            joined: '2024-01-15',
            status: 'pending'
          },
          {
            id: 2,
            name: 'Thai Garden',
            cuisine: 'Thai',
            owner: 'Nina Patel',
            email: 'nina@thaigarden.com',
            phone: '+91 9876543216',
            location: 'Mumbai',
            joined: '2024-01-14',
            status: 'pending'
          },
          {
            id: 3,
            name: 'Dim Sum House',
            cuisine: 'Chinese',
            owner: 'Wei Chen',
            email: 'wei@dimsumhouse.com',
            phone: '+91 9876543217',
            location: 'Mumbai',
            joined: '2024-01-13',
            status: 'pending'
          }
        ];

        const mockRecentUsers = [
          {
            id: 1,
            name: 'Amit Sharma',
            email: 'amit@example.com',
            phone: '+91 9876543210',
            role: 'customer',
            status: 'active',
            joined: '2024-01-15',
            orders: 12,
            spent: 456.50
          },
          {
            id: 2,
            name: 'Priya Patel',
            email: 'priya@example.com',
            phone: '+91 9876543211',
            role: 'restaurant_owner',
            status: 'active',
            joined: '2024-01-14',
            orders: 0,
            spent: 0
          },
          {
            id: 3,
            name: 'Rahul Singh',
            email: 'rahul@example.com',
            phone: '+91 9876543212',
            role: 'delivery_partner',
            status: 'pending',
            joined: '2024-01-13',
            orders: 45,
            spent: 0
          }
        ];

        setStats(mockStats);
        setRecentOrders(mockRecentOrders);
        setPendingRestaurants(mockPendingRestaurants);
        setRecentUsers(mockRecentUsers);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
      pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      delivered: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      in_transit: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      preparing: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.pending;
  };

  const getRoleBadge = (role) => {
    const badges = {
      customer: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      restaurant_owner: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      delivery_partner: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      admin: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
    };
    return badges[role] || badges.customer;
  };

  const getRoleText = (role) => {
    const texts = {
      customer: 'Customer',
      restaurant_owner: 'Restaurant Owner',
      delivery_partner: 'Delivery Partner',
      admin: 'Admin'
    };
    return texts[role] || role;
  };

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

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium animate-pulse">
              Loading dashboard...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <FiHome className="text-orange-500" />
              Admin Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back, {user?.name || 'Admin'}! Here's your platform overview
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-2">
              {['day', 'week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 capitalize ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiRefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              <FiDownload className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { 
              label: 'Total Users', 
              value: stats.totalUsers, 
              icon: FiUsers, 
              change: `+${stats.usersGrowth}%`,
              trend: 'up',
              color: 'from-blue-500 to-cyan-500'
            },
            { 
              label: 'Total Orders', 
              value: stats.totalOrders, 
              icon: FiShoppingBag, 
              change: `+${stats.ordersGrowth}%`,
              trend: 'up',
              color: 'from-green-500 to-emerald-500'
            },
            { 
              label: 'Total Revenue', 
              value: `$${stats.totalRevenue.toLocaleString()}`, 
              icon: FiDollarSign, 
              change: `+${stats.revenueGrowth}%`,
              trend: 'up',
              color: 'from-purple-500 to-pink-500'
            },
            { 
              label: 'Restaurants', 
              value: stats.totalRestaurants, 
              icon: FaUtensils, 
              change: `+${stats.restaurantsGrowth}%`,
              trend: 'up',
              color: 'from-orange-500 to-red-500'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 hover:shadow-3xl transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <FiArrowUp className="text-green-500" />
                    ) : (
                      <FiArrowDown className="text-red-500" />
                    )}
                    <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-400">vs last {selectedPeriod}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl`}>
                  <stat.icon />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Active Users', value: stats.activeUsers, icon: FiUserCheck, color: 'from-green-500 to-emerald-500' },
            { label: 'Pending Restaurants', value: stats.pendingRestaurants, icon: FiClock, color: 'from-yellow-500 to-orange-500' },
            { label: 'Orders Today', value: stats.ordersToday, icon: FiShoppingCart, color: 'from-blue-500 to-cyan-500' },
            { label: 'Revenue Today', value: `$${stats.revenueToday.toFixed(2)}`, icon: FiCreditCard, color: 'from-purple-500 to-pink-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card rounded-2xl p-4 text-center hover:shadow-3xl transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-lg mx-auto mb-2`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Orders & Pending Restaurants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Orders */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <FiPackage className="text-orange-500" />
                Recent Orders
              </h3>
              <Link to="/admin/orders" className="text-sm text-orange-500 hover:text-orange-600 font-semibold">
                View All
              </Link>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{order.id}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer} • {order.restaurant}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 dark:text-white">${order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Restaurants */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <FiClock className="text-orange-500" />
                Pending Restaurants
              </h3>
              <Link to="/admin/restaurants" className="text-sm text-orange-500 hover:text-orange-600 font-semibold">
                View All
              </Link>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {pendingRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{restaurant.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{restaurant.cuisine} • {restaurant.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FiUsers className="text-orange-500" />
              Recent Users
            </h3>
            <Link to="/admin/users" className="text-sm text-orange-500 hover:text-orange-600 font-semibold">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Orders</th>
                  <th className="pb-3">Spent</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-xs font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadge(user.role)}`}>
                        {getRoleText(user.role)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">{user.orders}</td>
                    <td className="py-3 font-semibold text-gray-800 dark:text-white">${user.spent.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;