import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiStar, 
  FiClock, 
  FiMapPin, 
  FiTruck, 
  FiHeart, 
  FiShare2,
  FiChevronLeft,
  FiChevronRight,
  FiShoppingBag,
  FiUsers,
  FiAward,
  FiCoffee,
  FiSun,
  FiMoon,
  FiInfo,
  FiCheckCircle,
  FiXCircle,
  FiClock as FiClockIcon,
  FiCalendar,
  FiMessageSquare,
  FiPhone,
  FiMail,
  FiGlobe,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiMinus,
  FiPlus,
  FiXCircle as FiXCircleIcon
} from 'react-icons/fi';
import { FaUtensils, FaLeaf, FaPepperHot, FaFish, FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import MainLayout from '../../layouts/MainLayout';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        // Mock data - replace with API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockRestaurant = {
          id: parseInt(id),
          name: 'Pizza Palace',
          cuisine: 'Italian',
          rating: 4.8,
          reviews: 1245,
          deliveryTime: '25-35',
          deliveryFee: 2.99,
          distance: '1.2 km',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200',
          logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200',
          isOpen: true,
          address: '123 Foodie Street, Mumbai, Maharashtra 400001',
          phone: '+91 9876543210',
          email: 'info@pizzapalace.com',
          website: 'www.pizzapalace.com',
          social: {
            instagram: '@pizzapalace',
            twitter: '@pizzapalace',
            facebook: '/pizzapalace',
            youtube: '/pizzapalace'
          },
          description: 'Experience authentic Italian pizza made with love. Our hand-tossed pizzas are crafted with the finest ingredients, imported from Italy. From classic Margherita to gourmet creations, we bring the taste of Naples to your doorstep. Our chefs have over 20 years of experience in traditional Italian cooking, ensuring every bite is a culinary journey through Italy.',
          features: ['Free Wi-Fi', 'Outdoor Seating', 'Parking Available', 'Takeaway', 'Delivery'],
          openingHours: {
            monday: '10:00 AM - 11:00 PM',
            tuesday: '10:00 AM - 11:00 PM',
            wednesday: '10:00 AM - 11:00 PM',
            thursday: '10:00 AM - 11:00 PM',
            friday: '10:00 AM - 12:00 AM',
            saturday: '10:00 AM - 12:00 AM',
            sunday: '10:00 AM - 10:00 PM'
          },
          categories: [
            { id: 'pizza', name: 'Pizza', icon: '🍕' },
            { id: 'pasta', name: 'Pasta', icon: '🍝' },
            { id: 'salads', name: 'Salads', icon: '🥗' },
            { id: 'desserts', name: 'Desserts', icon: '🍰' },
            { id: 'beverages', name: 'Beverages', icon: '🥤' }
          ]
        };

        const mockMenu = [
          // Pizza
          { id: 1, name: 'Margherita Pizza', category: 'pizza', description: 'Fresh tomato sauce, mozzarella, basil', price: 16.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', isVeg: true, rating: 4.7, popular: true },
          { id: 2, name: 'Pepperoni Pizza', category: 'pizza', description: 'Tomato sauce, mozzarella, pepperoni', price: 19.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', isVeg: false, rating: 4.8, popular: true },
          { id: 3, name: 'Quattro Formaggi', category: 'pizza', description: 'Four cheese blend, tomato sauce', price: 21.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', isVeg: true, rating: 4.6, popular: false },
          { id: 4, name: 'Hawaiian Pizza', category: 'pizza', description: 'Tomato sauce, mozzarella, ham, pineapple', price: 18.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', isVeg: false, rating: 4.4, popular: false },
          
          // Pasta
          { id: 5, name: 'Pasta Alfredo', category: 'pasta', description: 'Creamy parmesan sauce, fettuccine', price: 18.99, image: 'https://images.unsplash.com/photo-1645112411342-4665a10a3a1d?w=400', isVeg: true, rating: 4.6, popular: true },
          { id: 6, name: 'Spaghetti Bolognese', category: 'pasta', description: 'Rich meat sauce, spaghetti', price: 20.99, image: 'https://images.unsplash.com/photo-1622973536968-3d8c6b2b0f5b?w=400', isVeg: false, rating: 4.7, popular: true },
          
          // Salads
          { id: 7, name: 'Caesar Salad', category: 'salads', description: 'Romaine, parmesan, croutons, Caesar dressing', price: 14.99, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', isVeg: true, rating: 4.5, popular: false },
          { id: 8, name: 'Greek Salad', category: 'salads', description: 'Tomatoes, cucumbers, feta, olives', price: 15.99, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', isVeg: true, rating: 4.3, popular: false },
          
          // Desserts
          { id: 9, name: 'Tiramisu', category: 'desserts', description: 'Classic Italian dessert with coffee', price: 8.99, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', isVeg: true, rating: 4.9, popular: true },
          { id: 10, name: 'Gelato', category: 'desserts', description: 'Italian ice cream, choose any flavor', price: 6.99, image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400', isVeg: true, rating: 4.7, popular: false },
          
          // Beverages
          { id: 11, name: 'Fresh Lemonade', category: 'beverages', description: 'Freshly squeezed lemonade', price: 4.99, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400', isVeg: true, rating: 4.4, popular: false },
          { id: 12, name: 'Italian Soda', category: 'beverages', description: 'Sparkling water with fruit syrup', price: 5.99, image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=400', isVeg: true, rating: 4.2, popular: false }
        ];

        setRestaurant(mockRestaurant);
        setMenu(mockMenu);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const filteredMenu = activeCategory === 'all' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  const handleAddToCart = (item) => {
    const cartItem = { ...item, quantity: quantity };
    addToCart(cartItem);
    setLastAddedItem(item);
    setShowCartNotification(true);
    setSelectedItem(null);
    setQuantity(1);
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
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
              Loading restaurant details...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!restaurant) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">😅</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Restaurant Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">The restaurant you're looking for doesn't exist.</p>
            <Link to="/restaurants">
              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300">
                Browse Restaurants
              </button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Cart Notification */}
      <AnimatePresence>
        {showCartNotification && lastAddedItem && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-20 right-4 z-50 glass-card rounded-2xl p-4 shadow-2xl max-w-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xl">
                ✅
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  Added to Cart!
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {lastAddedItem.name} - ${lastAddedItem.price}
                </p>
              </div>
              <Link to="/cart">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold"
                >
                  View Cart
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8 md:pb-12">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-white/20 overflow-hidden shadow-2xl"
              >
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    {restaurant.name}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {restaurant.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-white/80">
                  <span className="flex items-center gap-1">
                    <FiStar className="text-yellow-400 fill-current" />
                    {restaurant.rating} ({restaurant.reviews} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock /> {restaurant.deliveryTime} min
                  </span>
                  <span className="flex items-center gap-1">
                    <FiTruck /> ${restaurant.deliveryFee} delivery
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin /> {restaurant.distance}
                  </span>
                </div>
                <p className="text-white/70 text-sm mt-2 max-w-2xl">
                  {restaurant.cuisine} • {restaurant.address}
                </p>
              </div>
              
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFavorite}
                  className={`p-3 rounded-full ${isFavorite ? 'bg-red-500' : 'bg-white/10 backdrop-blur-sm'} text-white hover:bg-red-500 transition-all duration-300`}
                >
                  <FiHeart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
                >
                  <FiShare2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <Link to="/restaurants">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>
        </Link>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Menu */}
          <div className="lg:col-span-2">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                All Items
              </button>
              {restaurant.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              {filteredMenu.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex flex-col sm:flex-row gap-4 p-4">
                    <div className="sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            {item.isVeg ? (
                              <span className="text-green-500 flex items-center gap-1 text-xs">
                                <FaLeaf /> Veg
                              </span>
                            ) : (
                              <span className="text-red-500 flex items-center gap-1 text-xs">
                                <FaUtensils /> Non-Veg
                              </span>
                            )}
                            {item.popular && (
                              <span className="text-yellow-500 flex items-center gap-1 text-xs">
                                <FiAward /> Popular
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-xs text-yellow-500">
                              <FiStar className="fill-current" /> {item.rating}
                            </span>
                          </div>
                        </div>
                        <span className="text-xl font-bold text-orange-500">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.description}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                        }}
                        className="mt-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar - Restaurant Info */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                About {restaurant.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {showFullDescription ? restaurant.description : `${restaurant.description.slice(0, 150)}...`}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-red-500 text-sm font-semibold hover:text-red-600 transition-colors"
                  >
                    {showFullDescription ? 'Show Less' : 'Read More'}
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Opening Hours</h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Monday - Thursday</span>
                      <span>{restaurant.openingHours.monday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday - Saturday</span>
                      <span>{restaurant.openingHours.friday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>{restaurant.openingHours.sunday}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact</h4>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p className="flex items-center gap-2">
                      <FiMapPin className="text-red-500" />
                      {restaurant.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiPhone className="text-red-500" />
                      {restaurant.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMail className="text-red-500" />
                      {restaurant.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiGlobe className="text-red-500" />
                      {restaurant.website}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Follow Us</h4>
                  <div className="flex gap-3">
                    <a href="#" className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-110 transition-transform duration-300">
                      <FiInstagram className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-blue-400 text-white hover:scale-110 transition-transform duration-300">
                      <FiTwitter className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-blue-600 text-white hover:scale-110 transition-transform duration-300">
                      <FiFacebook className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-red-600 text-white hover:scale-110 transition-transform duration-300">
                      <FiYoutube className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-56 object-cover rounded-t-3xl"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <FiXCircleIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                {selectedItem.popular && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-semibold shadow-lg">
                    🔥 Popular
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {selectedItem.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedItem.isVeg ? (
                        <span className="text-green-500 flex items-center gap-1 text-sm">
                          <FaLeaf /> Veg
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center gap-1 text-sm">
                          <FaUtensils /> Non-Veg
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-sm text-yellow-500">
                        <FiStar className="fill-current" /> {selectedItem.rating}
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-orange-500">
                    ${selectedItem.price}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {selectedItem.description}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <FiMinus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <span className="w-10 text-center font-bold text-gray-800 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="p-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white hover:scale-105 transition-all duration-300"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(selectedItem)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiShoppingBag className="w-5 h-5" />
                    Add to Cart - ${(selectedItem.price * quantity).toFixed(2)}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default RestaurantDetails;