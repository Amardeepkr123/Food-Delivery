import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import MainLayout from '../../layouts/MainLayout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Home.css';
import { 
  FiSearch, 
  FiMapPin, 
  FiClock, 
  FiStar, 
  FiTruck, 
  FiShield,
  FiChevronRight,
  FiHeart,
  FiShare2,
  FiShoppingBag,
  FiTrendingUp,
  FiUser,
  FiAward,
  FiCoffee,
  FiSun,
  FiMoon,
  FiGift,
  FiZap,
  FiArrowRight,
  FiMic,
  FiCpu,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiDownload,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiMap
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
  FaCocktail,
  FaDragon,
  FaApple,
  FaGooglePlay,
  FaWhatsapp,
  FaFacebookF
} from 'react-icons/fa';

const Home = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [popularFoods, setPopularFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const heroRef = useRef(null);

  const fullText = "Delicious Food Delivered To Your Doorstep";
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mockRestaurants = [
          { 
            id: 1, 
            name: 'Pizza Palace', 
            cuisine: 'Italian', 
            rating: 4.8, 
            deliveryTime: '25-35', 
            deliveryFee: 2.99, 
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800', 
            isFeatured: true,
            reviews: 1245,
            distance: '1.2 km',
            open: true,
            discount: '20% OFF'
          },
          { 
            id: 2, 
            name: 'Burger House', 
            cuisine: 'American', 
            rating: 4.6, 
            deliveryTime: '20-30', 
            deliveryFee: 1.99, 
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', 
            isFeatured: true,
            reviews: 987,
            distance: '0.8 km',
            open: true,
            discount: 'Free Delivery'
          },
          { 
            id: 3, 
            name: 'Sushi Master', 
            cuisine: 'Japanese', 
            rating: 4.9, 
            deliveryTime: '30-40', 
            deliveryFee: 3.99, 
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800', 
            isFeatured: true,
            reviews: 2156,
            distance: '2.3 km',
            open: true,
            discount: '15% OFF'
          },
          { 
            id: 4, 
            name: 'Taco Fiesta', 
            cuisine: 'Mexican', 
            rating: 4.4, 
            deliveryTime: '15-25', 
            deliveryFee: 1.49, 
            image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800', 
            isFeatured: false,
            reviews: 654,
            distance: '1.8 km',
            open: true,
            discount: '25% OFF'
          },
          { 
            id: 5, 
            name: 'Thai Garden', 
            cuisine: 'Thai', 
            rating: 4.7, 
            deliveryTime: '35-45', 
            deliveryFee: 2.49, 
            image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800', 
            isFeatured: false,
            reviews: 876,
            distance: '3.1 km',
            open: true,
            discount: null
          },
        ];

        const mockFoods = [
          { id: 1, name: 'Margherita Pizza', restaurant: 'Pizza Palace', price: 16.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', isVeg: true, rating: 4.7, orders: 342, popular: true },
          { id: 2, name: 'Classic Burger', restaurant: 'Burger House', price: 12.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', isVeg: false, rating: 4.5, orders: 289, popular: true },
          { id: 3, name: 'California Roll', restaurant: 'Sushi Master', price: 14.99, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400', isVeg: true, rating: 4.8, orders: 412, popular: true },
          { id: 4, name: 'Pasta Alfredo', restaurant: 'Pizza Palace', price: 18.99, image: 'https://images.unsplash.com/photo-1645112411342-4665a10a3a1d?w=400', isVeg: true, rating: 4.6, orders: 234, popular: false },
          { id: 5, name: 'Spicy Tacos', restaurant: 'Taco Fiesta', price: 11.99, image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400', isVeg: false, rating: 4.3, orders: 567, popular: true },
          { id: 6, name: 'Green Curry', restaurant: 'Thai Garden', price: 15.99, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400', isVeg: true, rating: 4.9, orders: 198, popular: false },
          { id: 7, name: 'Pepperoni Pizza', restaurant: 'Pizza Palace', price: 19.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', isVeg: false, rating: 4.8, orders: 456, popular: true },
          { id: 8, name: 'Chicken Burger', restaurant: 'Burger House', price: 14.99, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', isVeg: false, rating: 4.4, orders: 321, popular: false },
        ];

        const mockCategories = [
          { id: 1, name: 'Pizza', count: 45, icon: '🍕', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', color: 'from-red-500 to-orange-500' },
          { id: 2, name: 'Burger', count: 32, icon: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', color: 'from-yellow-500 to-yellow-600' },
          { id: 3, name: 'Sushi', count: 28, icon: '🍣', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400', color: 'from-pink-500 to-rose-500' },
          { id: 4, name: 'Dessert', count: 20, icon: '🍰', image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400', color: 'from-purple-500 to-pink-500' },
          { id: 5, name: 'Coffee', count: 15, icon: '☕', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', color: 'from-brown-500 to-amber-500' },
          { id: 6, name: 'Mexican', count: 24, icon: '🌮', image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400', color: 'from-green-500 to-emerald-500' },
          { id: 7, name: 'Thai', count: 18, icon: '🥘', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400', color: 'from-orange-500 to-red-500' },
          { id: 8, name: 'Italian', count: 30, icon: '🍝', image: 'https://images.unsplash.com/photo-1645112411342-4665a10a3a1d?w=400', color: 'from-blue-500 to-indigo-500' },
        ];

        setFeaturedRestaurants(mockRestaurants.filter(r => r.isFeatured));
        setPopularFoods(mockFoods);
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categoryIcons = {
    'Pizza': FaPizzaSlice,
    'Burger': FaHamburger,
    'Sushi': FaFish,
    'Dessert': FaBirthdayCake,
    'Coffee': FaCoffee,
    'Mexican': FaPepperHot,
    'Thai': FaUtensils,
    'Italian': FaUtensils,
    'Default': FaUtensils,
  };

  const features = [
    {
      icon: FiTruck,
      title: 'Fast Delivery',
      description: 'Get your food delivered in 30 minutes or less',
      color: 'from-red-500 to-orange-500',
      stats: '98% on-time',
    },
    {
      icon: FiShield,
      title: 'Safe & Secure',
      description: 'Contactless delivery with safety protocols',
      color: 'from-blue-500 to-blue-600',
      stats: '100% safe',
    },
    {
      icon: FiStar,
      title: 'Top Rated',
      description: 'Handpicked restaurants with top ratings',
      color: 'from-yellow-500 to-yellow-600',
      stats: '4.8 avg rating',
    },
    {
      icon: FiTrendingUp,
      title: 'Great Deals',
      description: 'Exclusive offers and discounts daily',
      color: 'from-purple-500 to-pink-500',
      stats: 'Save up to 50%',
    },
    {
      icon: FiAward,
      title: 'Rewards Program',
      description: 'Earn points and get exclusive benefits',
      color: 'from-green-500 to-emerald-500',
      stats: 'Cashback up to 10%',
    },
    {
      icon: FiMap,
      title: 'Live Tracking',
      description: 'Track your order in real-time',
      color: 'from-indigo-500 to-purple-500',
      stats: 'Real-time updates',
    },
  ];

  const handleAddToCart = (food) => {
    addToCart(food);
    setLastAddedItem(food);
    setShowCartNotification(true);
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

  // Hero Slides Data
  const heroSlides = [
    {
      id: 1,
      title: 'Pizza Paradise',
      description: 'Authentic Italian pizza delivered hot & fresh',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920',
      badge: '🔥 20% OFF',
      color: 'from-red-600 to-orange-600'
    },
    {
      id: 2,
      title: 'Burger Bliss',
      description: 'Juicy burgers with premium ingredients',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920',
      badge: '🍔 Buy 1 Get 1',
      color: 'from-orange-600 to-yellow-600'
    },
    {
      id: 3,
      title: 'Sushi Sensation',
      description: 'Fresh Japanese cuisine delivered to you',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1920',
      badge: '🎌 15% OFF',
      color: 'from-pink-600 to-rose-600'
    },
    {
      id: 4,
      title: 'Biryani Bliss',
      description: 'Aromatic biryani made with love',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1920',
      badge: '🌶️ Free Gulab Jamun',
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 5,
      title: 'Pasta Perfection',
      description: 'Creamy pasta with authentic Italian flavors',
      image: 'https://images.unsplash.com/photo-1645112411342-4665a10a3a1d?w=1920',
      badge: '🍝 25% OFF',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 6,
      title: 'Chicken Wings',
      description: 'Crispy chicken wings with spicy sauces',
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=1920',
      badge: '🍗 Buy 2 Get 1',
      color: 'from-red-600 to-orange-600'
    },
  ];

  const offers = [
    { icon: '🔥', title: 'Flat 60% OFF', description: 'On first order', color: 'from-red-500 to-orange-500' },
    { icon: '🍕', title: 'Buy 1 Get 1 Free', description: 'On select pizzas', color: 'from-orange-500 to-yellow-500' },
    { icon: '🚚', title: 'Free Delivery', description: 'On orders above $50', color: 'from-green-500 to-emerald-500' },
    { icon: '💳', title: 'UPI Cashback', description: 'Get 10% cashback', color: 'from-purple-500 to-pink-500' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Amit Sharma',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 5,
      review: 'Amazing food delivery service! The food arrived hot and fresh. Highly recommend!',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Priya Patel',
      image: 'https://images.unsplash.com/photo-1494790108375-be9c24b29a4b?w=100',
      rating: 5,
      review: 'Best food delivery app in town. The variety of restaurants is incredible.',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Rahul Singh',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      rating: 4,
      review: 'Great food and fast delivery. The tracking feature is very useful.',
      date: '3 days ago'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 5,
      review: 'I love the loyalty program! Earn points and get amazing discounts.',
      date: '5 days ago'
    },
  ];

  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
              Loading delicious food...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center max-w-md">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              😅
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300"
            >
              Try Again
            </motion.button>
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

      {/* Hero Section with 4K Slider */}
      <section ref={heroRef} className="relative min-h-[90vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop={true}
          className="h-full min-h-[90vh]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full min-h-[90vh]">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                    transform: `scale(${1 + mousePosition.x * 0.001})`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${slide.color} opacity-20`} />
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/20 rounded-full"
                      animate={{
                        y: [Math.random() * 100, Math.random() * 100 - 100],
                        x: [Math.random() * 100, Math.random() * 100 - 100],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: Math.random() * 10 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 4 + 1}px`,
                        height: `${Math.random() * 4 + 1}px`,
                      }}
                    />
                  ))}
                </div>

                {/* Floating Food Items */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {['🍕', '🍔', '🍣', '🌮', '🍝', '🥘', '🍩', '🥗'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-6xl opacity-20"
                      animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 6 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      style={{
                        left: `${10 + (i * 12)}%`,
                        top: `${20 + (i * 8) % 60}%`,
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block mb-4"
                    >
                      <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                        🇮🇳 India's #1 Food Delivery App
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                    >
                      <span className="block">Delicious Food</span>
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 animate-shimmer">
                        {typedText}
                        <span className="animate-pulse">|</span>
                      </span>
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl text-gray-200/90 mt-4 max-w-xl"
                    >
                      Experience fast & easy online ordering on the FoodDelivery app
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8"
                    >
                      <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 max-w-2xl">
                        <div className="flex-1 relative">
                          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                          <input
                            type="text"
                            placeholder="Enter your delivery location"
                            className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/95 dark:bg-gray-900/95 text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                          />
                        </div>
                        <div className="flex-[2] relative">
                          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                          <input
                            type="text"
                            placeholder="Search for food, restaurants..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/95 dark:bg-gray-900/95 text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                          />
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                          >
                            <FiMic className="text-white text-lg" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                          >
                            <FiCpu className="text-white text-lg" />
                          </motion.button>
                          <Link to="/restaurants">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 flex items-center gap-2"
                            >
                              <FiSearch className="text-lg" />
                              Search
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap items-center gap-6 mt-6"
                    >
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="text-xl font-bold text-white">10k+</span>
                        <span className="text-sm">Happy Customers</span>
                      </div>
                      <div className="w-px h-6 bg-white/20" />
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="text-xl font-bold text-white">4.8</span>
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <FiStar key={i} className="fill-current w-4 h-4" />
                          ))}
                        </div>
                        <span className="text-sm">(2.5k reviews)</span>
                      </div>
                      <div className="w-px h-6 bg-white/20" />
                      <div className="flex items-center gap-2 text-white/80">
                        <span className="text-xl font-bold text-white">100+</span>
                        <span className="text-sm">Restaurant Partners</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Slide Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute top-24 right-8 z-20"
                >
                  <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${slide.color} text-white font-bold shadow-2xl animate-pulse`}>
                    {slide.badge}
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300 text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <div className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300 text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-white/40 font-medium tracking-wider">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center">
              <div className="w-1 h-2 rounded-full bg-white/40 mt-2 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Promotional Cards */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`glass-card rounded-2xl p-6 text-center bg-gradient-to-r ${offer.color} text-white shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                <div className="text-4xl mb-3">{offer.icon}</div>
                <h3 className="text-lg font-bold">{offer.title}</h3>
                <p className="text-sm opacity-90">{offer.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollRevealVariants}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-4">
                Categories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Popular Categories</h2>
              <p className="text-gray-500 dark:text-gray-400">Explore our wide range of food categories</p>
            </div>
            <Link
              to="/restaurants"
              className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors group"
            >
              View All 
              <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.name] || categoryIcons.Default;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        <Icon />
                      </div>
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-sm opacity-80">{category.count} items</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500 rounded-2xl transition-all duration-300" />
                  <div className="absolute inset-0 shadow-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollRevealVariants}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 text-red-600 dark:text-red-400 text-sm font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Delivering Excellence</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-2">
              We make sure you get the best food experience with our premium service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card rounded-2xl p-8 text-center hover:shadow-3xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
                <span className="inline-block mt-3 text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                  {feature.stats}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollRevealVariants}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4">
                Featured
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Top Restaurants</h2>
              <p className="text-gray-500 dark:text-gray-400">Handpicked restaurants just for you</p>
            </div>
            <Link
              to="/restaurants"
              className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors group"
            >
              View All 
              <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {restaurant.isFeatured && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1">
                        <FiStar className="fill-current" /> Featured
                      </span>
                    )}
                    {restaurant.discount && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1">
                        <FiGift /> {restaurant.discount}
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full ${restaurant.open ? 'bg-green-500' : 'bg-red-500'} text-white text-xs font-semibold shadow-lg`}>
                      {restaurant.open ? '✓ Open' : '✗ Closed'}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all duration-300"
                    >
                      <FiHeart className="text-gray-600 dark:text-gray-300" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all duration-300"
                    >
                      <FiShare2 className="text-gray-600 dark:text-gray-300" />
                    </motion.button>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                      <p className="text-sm text-gray-200">{restaurant.cuisine}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      <FiStar className="text-white fill-current" />
                      <span className="text-sm font-semibold text-white">
                        {restaurant.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiClock /> {restaurant.deliveryTime} min
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin /> {restaurant.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiTruck /> ${restaurant.deliveryFee}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {restaurant.reviews} reviews
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="text-xs text-gray-400">
                      {restaurant.distance} away
                    </span>
                  </div>
                  <Link to={`/restaurant/${restaurant.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      View Menu <FiArrowRight />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Foods */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollRevealVariants}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-4">
              Popular Dishes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Most Loved Dishes</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-2">
              Most loved dishes by our customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularFoods.map((food, index) => (
              <motion.div
                key={food.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {food.isVeg && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1">
                      <FaLeaf size={12} /> Veg
                    </div>
                  )}
                  {food.popular && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1">
                      <FiZap /> Popular
                    </div>
                  )}
                  {food.rating && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1">
                      <FiStar className="fill-current text-yellow-400" />
                      {food.rating}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-red-500 transition-colors">
                    {food.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{food.restaurant}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-400">{food.orders} orders</span>
                    {food.isVeg && (
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <FaLeaf size={10} /> Veg
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xl font-bold text-orange-500">${food.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(food)}
                      className="p-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                    >
                      <FiShoppingBag className="text-sm" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollRevealVariants}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">What Our Customers Say</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-2">
              Real reviews from real customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card rounded-2xl p-6 hover:shadow-3xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-3 h-3 ${i < testimonial.rating ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.review}</p>
                <p className="text-xs text-gray-400 mt-3">{testimonial.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-orange-500">
        <div className="absolute inset-0 overflow-hidden">
          {['📱', '🍕', '🚀', '⭐', '🎉', '🔥'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl opacity-20"
              animate={{
                y: [0, -50, 0],
                x: [0, 30, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${20 + (i * 10) % 60}%`,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollRevealVariants}
              className="flex-1 text-white"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Download Our App
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-lg">
                Get 20% off on your first order. Order food anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <FaGooglePlay className="text-3xl" />
                  <div>
                    <p className="text-xs font-medium">GET IT ON</p>
                    <p className="text-lg font-bold">Google Play</p>
                  </div>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <FaApple className="text-3xl" />
                  <div>
                    <p className="text-xs font-medium">Download on the</p>
                    <p className="text-lg font-bold">App Store</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollRevealVariants}
              className="flex-1 flex justify-center"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="text-9xl"
              >
                📱
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollRevealVariants}
            className="glass-card rounded-3xl p-12 text-center max-w-4xl mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              🎉
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Ready to Order?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Download our app and get 20% off on your first order. Start your food journey now!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <span className="text-xl">📱</span>
                Download App
              </motion.a>
              <motion.a
                href="/restaurants"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 justify-center border-2 border-gray-200 dark:border-gray-700"
              >
                <span className="text-xl">🍕</span>
                Order Now
              </motion.a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <span>✓ No hidden fees</span>
              <span>✓ 24/7 support</span>
              <span>✓ Free delivery on first order</span>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
