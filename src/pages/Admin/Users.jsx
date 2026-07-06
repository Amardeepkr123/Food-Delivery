import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers,
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiRefreshCw,
  FiDownload,
  FiUserCheck,
  FiUserX,
  FiMail,
  FiPhone,
  FiCalendar,
  FiDollarSign,
  FiShoppingBag,
  FiAward,
  FiGift,
  FiZap
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';

const Users = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUsers = [
          {
            id: 1,
            name: 'Amit Sharma',
            email: 'amit@example.com',
            phone: '+91 9876543210',
            role: 'customer',
            status: 'active',
            joined: '2024-01-15',
            orders: 12,
            spent: 456.50,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
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
            spent: 0,
            avatar: 'https://images.unsplash.com/photo-1494790108375-be9c24b29a4b?w=100'
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
            spent: 0,
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
          },
          {
            id: 4,
            name: 'Sneha Reddy',
            email: 'sneha@example.com',
            phone: '+91 9876543213',
            role: 'customer',
            status: 'inactive',
            joined: '2024-01-12',
            orders: 8,
            spent: 267.25,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
          },
          {
            id: 5,
            name: 'Vikram Singh',
            email: 'vikram@example.com',
            phone: '+91 9876543214',
            role: 'restaurant_owner',
            status: 'active',
            joined: '2024-01-11',
            orders: 0,
            spent: 0,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
          },
          {
            id: 6,
            name: 'Neha Gupta',
            email: 'neha@example.com',
            phone: '+91 9876543215',
            role: 'delivery_partner',
            status: 'active',
            joined: '2024-01-10',
            orders: 67,
            spent: 0,
            avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100'
          },
          {
            id: 7,
            name: 'Arjun Kumar',
            email: 'arjun@example.com',
            phone: '+91 9876543216',
            role: 'customer',
            status: 'active',
            joined: '2024-01-09',
            orders: 23,
            spent: 789.50,
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100'
          },
          {
            id: 8,
            name: 'Meera Shah',
            email: 'meera@example.com',
            phone: '+91 9876543217',
            role: 'restaurant_owner',
            status: 'pending',
            joined: '2024-01-08',
            orders: 0,
            spent: 0,
            avatar: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=100'
          }
        ];

        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle filters and search
  useEffect(() => {
    let filtered = [...users];

    if (searchQuery) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.phone.includes(searchQuery)
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(u => u.status === statusFilter);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.joined) - new Date(a.joined));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.joined) - new Date(b.joined));
        break;
      case 'orders':
        filtered.sort((a, b) => b.orders - a.orders);
        break;
      case 'spent':
        filtered.sort((a, b) => b.spent - a.spent);
        break;
      default:
        break;
    }

    setFilteredUsers(filtered);
  }, [searchQuery, roleFilter, statusFilter, sortBy, users]);

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
      pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
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
              Loading users...
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
              <FiUsers className="text-orange-500" />
              Users Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage all platform users
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              <FiPlus className="w-4 h-4" />
              Add User
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Users', value: users.length, icon: FiUsers, color: 'from-blue-500 to-cyan-500' },
            { label: 'Active', value: users.filter(u => u.status === 'active').length, icon: FiUserCheck, color: 'from-green-500 to-emerald-500' },
            { label: 'Pending', value: users.filter(u => u.status === 'pending').length, icon: FiUserX, color: 'from-yellow-500 to-orange-500' },
            { label: 'Restaurant Owners', value: users.filter(u => u.role === 'restaurant_owner').length, icon: FiAward, color: 'from-purple-500 to-pink-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-4 text-center hover:shadow-3xl transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-lg mx-auto mb-2`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <div className="glass-card rounded-2xl p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl food-input"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  showFilters ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' : 'glass-card hover:shadow-2xl'
                }`}
              >
                <FiFilter className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl food-input min-w-[130px]"
                >
                  <option value="all">All Roles</option>
                  <option value="customer">Customer</option>
                  <option value="restaurant_owner">Restaurant Owner</option>
                  <option value="delivery_partner">Delivery Partner</option>
                  <option value="admin">Admin</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl food-input min-w-[130px]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl food-input min-w-[130px]"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="orders">Most Orders</option>
                  <option value="spent">Most Spent</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-card rounded-2xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Orders</th>
                  <th className="pb-3">Spent</th>
                  <th className="pb-3">Joined</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            user.name.charAt(0)
                          )}
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-300">{user.phone}</td>
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
                    <td className="py-3 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.joined).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <FiEye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <FiEdit2 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <FiTrash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No users found</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Users;