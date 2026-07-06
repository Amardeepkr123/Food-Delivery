import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList,
  FiChevronDown,
  FiX,
  FiSave,
  FiRefreshCw,
  FiUpload,
  FiImage,
  FiStar,
  FiClock,
  FiDollarSign,
  FiTag,
  FiFolder,
  FiEye,
  FiEyeOff,
  FiCopy,
  FiArchive,
  FiArrowUp,
  FiArrowDown,
  FiDownload,
  FiShare2
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
  FaBirthdayCake,
  FaCocktail
} from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';

const MenuManagement = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    isVeg: true,
    isAvailable: true,
    preparationTime: '',
    ingredients: [],
    allergens: [],
    nutritionalInfo: {
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    }
  });
  const [categories, setCategories] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [allergenInput, setAllergenInput] = useState('');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockCategories = [
          { id: 'pizza', name: 'Pizza', icon: '🍕', count: 8 },
          { id: 'burger', name: 'Burger', icon: '🍔', count: 6 },
          { id: 'pasta', name: 'Pasta', icon: '🍝', count: 5 },
          { id: 'salads', name: 'Salads', icon: '🥗', count: 4 },
          { id: 'desserts', name: 'Desserts', icon: '🍰', count: 5 },
          { id: 'beverages', name: 'Beverages', icon: '🥤', count: 6 },
          { id: 'appetizers', name: 'Appetizers', icon: '🍤', count: 7 },
        ];

        const mockMenuItems = [
          {
            id: 1,
            name: 'Margherita Pizza',
            category: 'pizza',
            price: 16.99,
            description: 'Fresh tomato sauce, mozzarella, basil',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
            isVeg: true,
            isAvailable: true,
            preparationTime: '15-20',
            ingredients: ['Tomato Sauce', 'Mozzarella', 'Basil', 'Olive Oil'],
            allergens: ['Gluten', 'Dairy'],
            nutritionalInfo: {
              calories: '250',
              protein: '12g',
              carbs: '30g',
              fat: '10g'
            },
            rating: 4.7,
            orders: 342,
            isPopular: true
          },
          {
            id: 2,
            name: 'Pepperoni Pizza',
            category: 'pizza',
            price: 19.99,
            description: 'Tomato sauce, mozzarella, pepperoni',
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
            isVeg: false,
            isAvailable: true,
            preparationTime: '15-20',
            ingredients: ['Tomato Sauce', 'Mozzarella', 'Pepperoni', 'Oregano'],
            allergens: ['Gluten', 'Dairy'],
            nutritionalInfo: {
              calories: '320',
              protein: '15g',
              carbs: '28g',
              fat: '18g'
            },
            rating: 4.8,
            orders: 456,
            isPopular: true
          },
          {
            id: 3,
            name: 'Classic Burger',
            category: 'burger',
            price: 12.99,
            description: 'Juicy beef patty with lettuce, tomato, cheese',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
            isVeg: false,
            isAvailable: true,
            preparationTime: '10-15',
            ingredients: ['Beef Patty', 'Lettuce', 'Tomato', 'Cheese', 'Sauce'],
            allergens: ['Gluten', 'Dairy'],
            nutritionalInfo: {
              calories: '450',
              protein: '25g',
              carbs: '35g',
              fat: '22g'
            },
            rating: 4.5,
            orders: 289,
            isPopular: true
          },
          {
            id: 4,
            name: 'Pasta Alfredo',
            category: 'pasta',
            price: 18.99,
            description: 'Creamy parmesan sauce with fettuccine',
            image: 'https://images.unsplash.com/photo-1645112411342-4665a10a3a1d?w=400',
            isVeg: true,
            isAvailable: true,
            preparationTime: '20-25',
            ingredients: ['Fettuccine', 'Parmesan', 'Butter', 'Cream'],
            allergens: ['Gluten', 'Dairy'],
            nutritionalInfo: {
              calories: '380',
              protein: '14g',
              carbs: '40g',
              fat: '20g'
            },
            rating: 4.6,
            orders: 234,
            isPopular: false
          },
          {
            id: 5,
            name: 'Caesar Salad',
            category: 'salads',
            price: 14.99,
            description: 'Romaine, parmesan, croutons, Caesar dressing',
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
            isVeg: true,
            isAvailable: true,
            preparationTime: '10-15',
            ingredients: ['Romaine', 'Parmesan', 'Croutons', 'Caesar Dressing'],
            allergens: ['Gluten', 'Dairy', 'Eggs'],
            nutritionalInfo: {
              calories: '180',
              protein: '8g',
              carbs: '12g',
              fat: '14g'
            },
            rating: 4.3,
            orders: 187,
            isPopular: false
          },
          {
            id: 6,
            name: 'Tiramisu',
            category: 'desserts',
            price: 8.99,
            description: 'Classic Italian dessert with coffee',
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
            isVeg: true,
            isAvailable: true,
            preparationTime: '15-20',
            ingredients: ['Mascarpone', 'Coffee', 'Cocoa', 'Ladyfingers'],
            allergens: ['Gluten', 'Dairy', 'Eggs'],
            nutritionalInfo: {
              calories: '220',
              protein: '6g',
              carbs: '25g',
              fat: '12g'
            },
            rating: 4.9,
            orders: 412,
            isPopular: true
          },
          {
            id: 7,
            name: 'Fresh Lemonade',
            category: 'beverages',
            price: 4.99,
            description: 'Freshly squeezed lemonade',
            image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400',
            isVeg: true,
            isAvailable: true,
            preparationTime: '5-10',
            ingredients: ['Lemon', 'Sugar', 'Water', 'Mint'],
            allergens: [],
            nutritionalInfo: {
              calories: '90',
              protein: '0g',
              carbs: '22g',
              fat: '0g'
            },
            rating: 4.2,
            orders: 156,
            isPopular: false
          },
          {
            id: 8,
            name: 'Mozzarella Sticks',
            category: 'appetizers',
            price: 9.99,
            description: 'Crispy fried mozzarella with marinara sauce',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
            isVeg: true,
            isAvailable: false,
            preparationTime: '10-15',
            ingredients: ['Mozzarella', 'Breadcrumbs', 'Marinara'],
            allergens: ['Gluten', 'Dairy'],
            nutritionalInfo: {
              calories: '280',
              protein: '12g',
              carbs: '20g',
              fat: '16g'
            },
            rating: 4.4,
            orders: 98,
            isPopular: false
          }
        ];

        setCategories(mockCategories);
        setMenuItems(mockMenuItems);
        setFilteredItems(mockMenuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Handle search and filters
  useEffect(() => {
    let filtered = [...menuItems];

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, menuItems]);

  const handleAddItem = () => {
    // Validate form
    if (!formData.name || !formData.category || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    const newItem = {
      id: menuItems.length + 1,
      ...formData,
      rating: 0,
      orders: 0,
      isPopular: false,
      ingredients: formData.ingredients || [],
      allergens: formData.allergens || [],
      nutritionalInfo: formData.nutritionalInfo || { calories: '', protein: '', carbs: '', fat: '' }
    };

    setMenuItems([...menuItems, newItem]);
    setShowAddModal(false);
    resetForm();
    alert('Item added successfully!');
  };

  const handleEditItem = () => {
    setMenuItems(menuItems.map(item =>
      item.id === selectedItem.id ? { ...selectedItem, ...formData } : item
    ));
    setShowEditModal(false);
    setSelectedItem(null);
    resetForm();
    alert('Item updated successfully!');
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
      alert('Item deleted successfully!');
    }
  };

  const handleToggleAvailability = (id) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  const handleDuplicateItem = (item) => {
    const newItem = {
      ...item,
      id: menuItems.length + 1,
      name: `${item.name} (Copy)`,
      orders: 0,
      rating: 0,
      isPopular: false
    };
    setMenuItems([...menuItems, newItem]);
    alert('Item duplicated successfully!');
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description || '',
      image: item.image || '',
      isVeg: item.isVeg,
      isAvailable: item.isAvailable,
      preparationTime: item.preparationTime || '',
      ingredients: item.ingredients || [],
      allergens: item.allergens || [],
      nutritionalInfo: item.nutritionalInfo || { calories: '', protein: '', carbs: '', fat: '' }
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      isVeg: true,
      isAvailable: true,
      preparationTime: '',
      ingredients: [],
      allergens: [],
      nutritionalInfo: {
        calories: '',
        protein: '',
        carbs: '',
        fat: ''
      }
    });
    setIngredientInput('');
    setAllergenInput('');
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, ingredientInput.trim()]
      });
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index)
    });
  };

  const handleAddAllergen = () => {
    if (allergenInput.trim()) {
      setFormData({
        ...formData,
        allergens: [...formData.allergens, allergenInput.trim()]
      });
      setAllergenInput('');
    }
  };

  const handleRemoveAllergen = (index) => {
    setFormData({
      ...formData,
      allergens: formData.allergens.filter((_, i) => i !== index)
    });
  };

  const getCategoryIcon = (categoryId) => {
    const icons = {
      'pizza': FaPizzaSlice,
      'burger': FaHamburger,
      'pasta': FaUtensils,  // Changed from FaSpaghetti to FaUtensils
      'salads': FaLeaf,
      'desserts': FaBirthdayCake,
      'beverages': FaCoffee,
      'appetizers': FaUtensils
    };
    return icons[categoryId] || FaUtensils;
  };

  const getCategoryName = (categoryId) => {
    const names = {
      'pizza': 'Pizza',
      'burger': 'Burger',
      'pasta': 'Pasta',
      'salads': 'Salads',
      'desserts': 'Desserts',
      'beverages': 'Beverages',
      'appetizers': 'Appetizers'
    };
    return names[categoryId] || categoryId;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05
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
              Loading menu items...
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
              <FaUtensils className="text-orange-500" />
              Menu Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your restaurant menu items
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
            >
              <FiPlus className="w-4 h-4" />
              Add New Item
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl food-input"
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl food-input min-w-[150px]"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' : 'glass-card hover:shadow-2xl'
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' : 'glass-card hover:shadow-2xl'
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Items', value: menuItems.length, icon: FaUtensils, color: 'from-orange-500 to-red-500' },
            { label: 'Available', value: menuItems.filter(i => i.isAvailable).length, icon: FiEye, color: 'from-green-500 to-emerald-500' },
            { label: 'Unavailable', value: menuItems.filter(i => !i.isAvailable).length, icon: FiEyeOff, color: 'from-red-500 to-rose-500' },
            { label: 'Categories', value: categories.length, icon: FiFolder, color: 'from-blue-500 to-cyan-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
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

        {/* Menu Items Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }
        >
          {filteredItems.length === 0 ? (
            <div className="col-span-full glass-card rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Menu Items Found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${viewMode === 'list' ? 'md:w-48 h-48 md:h-auto' : 'h-48'} overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700`}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {item.isVeg ? '🥗' : '🍖'}
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {item.isVeg && (
                      <span className="px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-semibold flex items-center gap-1">
                        <FaLeaf className="w-3 h-3" /> Veg
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-semibold">
                        🔥 Popular
                      </span>
                    )}
                    {!item.isAvailable && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-semibold">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => handleToggleAvailability(item.id)}
                      className="p-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300"
                      title={item.isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
                    >
                      {item.isAvailable ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-5 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-center' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <span>{getCategoryIcon(item.category)()}</span>
                        {getCategoryName(item.category)}
                      </p>
                    </div>
                    <span className="text-xl font-bold text-orange-500">${item.price}</span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {item.preparationTime && (
                      <span className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" /> {item.preparationTime} min
                      </span>
                    )}
                    {item.rating > 0 && (
                      <span className="flex items-center gap-1">
                        <FiStar className="w-4 h-4 text-yellow-400 fill-current" /> {item.rating}
                      </span>
                    )}
                    {item.orders > 0 && (
                      <span className="flex items-center gap-1">
                        <FiDollarSign className="w-4 h-4" /> {item.orders} orders
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 text-sm font-medium"
                    >
                      <FiEdit2 className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDuplicateItem(item)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 text-sm font-medium"
                    >
                      <FiCopy className="w-4 h-4" /> Duplicate
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 text-sm font-medium"
                    >
                      <FiTrash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {(showAddModal || showEditModal) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setSelectedItem(null);
                resetForm();
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {showAddModal ? 'Add New Menu Item' : 'Edit Menu Item'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setSelectedItem(null);
                      resetForm();
                    }}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <FiX className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Item Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl food-input"
                        placeholder="Enter item name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl food-input"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl food-input"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Preparation Time (minutes)
                      </label>
                      <input
                        type="text"
                        value={formData.preparationTime}
                        onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl food-input"
                        placeholder="15-20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl food-input resize-none"
                      rows="2"
                      placeholder="Enter item description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isVeg}
                        onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Vegetarian</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isAvailable}
                        onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Available</span>
                    </label>
                  </div>

                  {/* Image */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl food-input"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Ingredients */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Ingredients
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={ingredientInput}
                        onChange={(e) => setIngredientInput(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl food-input"
                        placeholder="Add ingredient"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
                      />
                      <button
                        onClick={handleAddIngredient}
                        className="px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-300"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm"
                        >
                          {ingredient}
                          <button
                            onClick={() => handleRemoveIngredient(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Allergens */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Allergens
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={allergenInput}
                        onChange={(e) => setAllergenInput(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl food-input"
                        placeholder="Add allergen"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddAllergen()}
                      />
                      <button
                        onClick={handleAddAllergen}
                        className="px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-300"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.allergens.map((allergen, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"
                        >
                          {allergen}
                          <button
                            onClick={() => handleRemoveAllergen(index)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Nutritional Info */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Nutritional Information
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Calories</label>
                        <input
                          type="text"
                          value={formData.nutritionalInfo.calories}
                          onChange={(e) => setFormData({
                            ...formData,
                            nutritionalInfo: { ...formData.nutritionalInfo, calories: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl food-input text-sm"
                          placeholder="250"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Protein</label>
                        <input
                          type="text"
                          value={formData.nutritionalInfo.protein}
                          onChange={(e) => setFormData({
                            ...formData,
                            nutritionalInfo: { ...formData.nutritionalInfo, protein: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl food-input text-sm"
                          placeholder="12g"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Carbs</label>
                        <input
                          type="text"
                          value={formData.nutritionalInfo.carbs}
                          onChange={(e) => setFormData({
                            ...formData,
                            nutritionalInfo: { ...formData.nutritionalInfo, carbs: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl food-input text-sm"
                          placeholder="30g"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Fat</label>
                        <input
                          type="text"
                          value={formData.nutritionalInfo.fat}
                          onChange={(e) => setFormData({
                            ...formData,
                            nutritionalInfo: { ...formData.nutritionalInfo, fat: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl food-input text-sm"
                          placeholder="10g"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                        setSelectedItem(null);
                        resetForm();
                      }}
                      className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={showAddModal ? handleAddItem : handleEditItem}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FiSave className="w-4 h-4" />
                      {showAddModal ? 'Add Item' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default MenuManagement;