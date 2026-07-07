// src/pages/restaurant/RestaurantDetails.jsx
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
  FiShoppingBag,
  FiUsers,
  FiAward,
  FiCoffee,
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
  FiXCircle as FiXCircleIcon,
  FiGift,
  FiThumbsUp,
  FiThumbsDown,
  FiMoreVertical,
  FiEye,
} from 'react-icons/fi';
import { 
  FaUtensils, 
  FaLeaf, 
  FaPepperHot, 
  FaFish, 
  FaPizzaSlice, 
  FaHamburger,
  FaBirthdayCake,
  FaCoffee as FaCoffeeIcon,
} from 'react-icons/fa';

// ✅ FIXED: Correct import path for MainLayout
import MainLayout from '../../layouts/MainLayout';

// ============================================
// LOCAL COMPONENTS
// ============================================

const MenuCard = ({ item, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="glass-card rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => onAddToCart(item)}
    >
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">{item.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                {item.isVeg ? (
                  <span className="text-green-500 text-xs flex items-center gap-1">
                    <FaLeaf /> Veg
                  </span>
                ) : (
                  <span className="text-red-500 text-xs flex items-center gap-1">
                    <FaUtensils /> Non-Veg
                  </span>
                )}
                {item.popular && (
                  <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
                <span className="text-xs text-yellow-500 flex items-center gap-1">
                  <FiStar className="fill-current" /> {item.rating}
                </span>
              </div>
            </div>
            <span className="text-lg font-bold text-orange-500">${item.price}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {item.description}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            className="mt-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4"
    >
      <div className="flex items-start gap-3">
        <img
          src={review.image}
          alt={review.customer}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">{review.customer}</p>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={`${i < review.rating ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-xs text-gray-400">{review.time}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <FiMoreVertical />
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{review.comment}</p>
          <div className="flex items-center gap-4 mt-2">
            <button className="text-sm text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1">
              <FiThumbsUp /> Helpful
            </button>
            <button className="text-sm text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1">
              <FiMessageSquare /> Reply
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
          {restaurant.isOpen ? 'Open' : 'Closed'}
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 dark:text-white">{restaurant.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{restaurant.cuisine}</p>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <FiStar className="text-yellow-400 fill-current" /> {restaurant.rating}
          </span>
          <span className="flex items-center gap-1">
            <FiClock /> {restaurant.deliveryTime}
          </span>
          <span className="flex items-center gap-1">
            <FiMapPin /> {restaurant.distance}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('menu');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [similarRestaurants, setSimilarRestaurants] = useState([]);

  // Mock Data
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
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
          description: 'Experience authentic Italian pizza made with love. Our hand-tossed pizzas are crafted with the finest ingredients, imported from Italy. From classic Margherita to gourmet creations, we bring the taste of Naples to your doorstep.',
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
          ],
          offers: [
            { title: '20% OFF', description: 'On first order', code: 'FIRST20' },
            { title: 'Free Delivery', description: 'On orders above $50', code: 'FREEDEL' },
          ]
        };

        const mockMenu = [
          { id: 1, name: 'Margherita Pizza', category: 'pizza', description: 'Fresh tomato sauce, mozzarella, basil', price: 16.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', isVeg: true, rating: 4.7, popular: true },
          { id: 2, name: 'Pepperoni Pizza', category: 'pizza', description: 'Tomato sauce, mozzarella, pepperoni', price: 19.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', isVeg: false, rating: 4.8, popular: true },
          { id: 3, name: 'Pasta Alfredo', category: 'pasta', description: 'Creamy parmesan sauce, fettuccine', price: 18.99, image: 'https://images.unsplash.com/photo-1645112411342-4665a10a3a1d?w=400', isVeg: true, rating: 4.6, popular: true },
          { id: 4, name: 'Caesar Salad', category: 'salads', description: 'Romaine, parmesan, croutons, Caesar dressing', price: 14.99, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', isVeg: true, rating: 4.5, popular: false },
          { id: 5, name: 'Tiramisu', category: 'desserts', description: 'Classic Italian dessert with coffee', price: 8.99, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', isVeg: true, rating: 4.9, popular: true },
          { id: 6, name: 'Fresh Lemonade', category: 'beverages', description: 'Freshly squeezed lemonade', price: 4.99, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400', isVeg: true, rating: 4.4, popular: false },
        ];

        const mockReviews = [
          { id: 1, customer: 'Amit Sharma', rating: 5, comment: 'Amazing pizza! Best in town. Highly recommend!', date: '2024-01-15', time: '2 hours ago', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
          { id: 2, customer: 'Priya Patel', rating: 4, comment: 'Good food, fast delivery. Will order again.', date: '2024-01-14', time: '1 day ago', image: 'https://images.unsplash.com/photo-1494790108375-be9c24b29a4b?w=100' },
          { id: 3, customer: 'Rahul Singh', rating: 5, comment: 'The pizza was fresh and delicious!', date: '2024-01-13', time: '2 days ago', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
        ];

        const mockSimilarRestaurants = [
          { id: 2, name: 'Burger House', cuisine: 'American', rating: 4.6, deliveryTime: '20-30', deliveryFee: 1.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', isOpen: true, distance: '0.8 km' },
          { id: 3, name: 'Sushi Master', cuisine: 'Japanese', rating: 4.9, deliveryTime: '30-40', deliveryFee: 3.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400', isOpen: true, distance: '2.3 km' },
          { id: 4, name: 'Taco Fiesta', cuisine: 'Mexican', rating: 4.4, deliveryTime: '15-25', deliveryFee: 1.49, image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400', isOpen: true, distance: '1.8 km' },
        ];

        setRestaurant(mockRestaurant);
        setMenu(mockMenu);
        setReviews(mockReviews);
        setSimilarRestaurants(mockSimilarRestaurants);
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
          <div className="text-center max-w-md">
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                  <button className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold">
                    View Cart
                  </button>
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
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 mb-8">
            {['menu', 'reviews', 'info'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Menu Tab */}
              {activeTab === 'menu' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
                      <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                          activeCategory === 'all'
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
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
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {category.icon} {category.name}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {filteredMenu.map((item) => (
                        <MenuCard
                          key={item.id}
                          item={item}
                          onAddToCart={() => {
                            setSelectedItem(item);
                            setQuantity(1);
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    {restaurant.offers && restaurant.offers.length > 0 && (
                      <div className="glass-card rounded-2xl p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                          <FiGift className="text-orange-500" />
                          Exclusive Offers
                        </h3>
                        <div className="space-y-3">
                          {restaurant.offers.map((offer, index) => (
                            <div key={index} className="p-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800/30">
                              <p className="font-bold text-gray-800 dark:text-white">{offer.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{offer.description}</p>
                              <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded-lg mt-1 inline-block">
                                Code: {offer.code}
                              </code>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                      Customer Reviews ({reviews.length})
                    </h3>
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-1">
                    <div className="glass-card rounded-2xl p-6 sticky top-4">
                      <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        Rating Summary
                      </h4>
                      <div className="text-center">
                        <div className="text-5xl font-bold text-orange-500">{restaurant.rating}</div>
                        <div className="flex justify-center text-yellow-400 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className={`${i < Math.round(restaurant.rating) ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Based on {restaurant.reviews} reviews
                        </p>
                      </div>
                      <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300">
                        Write a Review
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Tab */}
              {activeTab === 'info' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="glass-card rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <FiMapPin className="text-orange-500 w-5 h-5" />
                          <div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">Address</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{restaurant.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <FiPhone className="text-orange-500 w-5 h-5" />
                          <div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">Phone</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{restaurant.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <FiMail className="text-orange-500 w-5 h-5" />
                          <div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">Email</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{restaurant.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <FiGlobe className="text-orange-500 w-5 h-5" />
                          <div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">Website</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{restaurant.website}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6 mt-6">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        Follow Us
                      </h3>
                      <div className="flex gap-3">
                        <a href="#" className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-110 transition-transform duration-300">
                          <FiInstagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-3 rounded-full bg-blue-400 text-white hover:scale-110 transition-transform duration-300">
                          <FiTwitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-3 rounded-full bg-blue-600 text-white hover:scale-110 transition-transform duration-300">
                          <FiFacebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-3 rounded-full bg-red-600 text-white hover:scale-110 transition-transform duration-300">
                          <FiYoutube className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="glass-card rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                        Similar Restaurants
                      </h3>
                      <div className="space-y-4">
                        {similarRestaurants.map((rest) => (
                          <RestaurantCard key={rest.id} restaurant={rest} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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
      </div>
    </MainLayout>
  );
};

export default RestaurantDetails;