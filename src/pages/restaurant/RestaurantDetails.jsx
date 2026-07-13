// src/pages/restaurant/RestaurantDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowLeft,
  FiStar,
  FiClock,
  FiMapPin,
  FiHeart,
  FiShare2,
  FiTruck,
  FiDollarSign,
  FiPlus,
  FiMinus,
  FiCheck,
  FiInfo,
  FiShoppingBag,
  FiAward,
  FiTrendingUp,
  FiCoffee,
  // ✅ FIX: Remove FiUtensils, use FiTool or FiCoffee instead
  FiTool,
  FiBriefcase,
  FiServer,
} from 'react-icons/fi';
// ✅ ADD: Import FaUtensils from react-icons/fa
import { FaLeaf, FaUtensils } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { useCartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCartContext();
  
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  const fetchRestaurantDetails = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockRestaurant = {
        id: parseInt(id),
        name: 'Pizza Palace',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
        coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200',
        cuisine: 'Italian, Pizza',
        rating: 4.8,
        reviews: 1245,
        deliveryTime: '25-35 min',
        distance: '1.2 km',
        address: '123 Food Street, Downtown',
        phone: '+1 234 567 890',
        isVeg: true,
        isOpen: true,
        minOrder: 10,
        deliveryFee: 'FREE',
        description: 'Authentic Italian pizzas made with fresh ingredients. Family-owned since 1990.',
        offers: [
          '20% OFF on first order',
          'Free delivery on orders above $30',
        ],
        gallery: [
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
          'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
          'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400',
        ],
      };
      setRestaurant(mockRestaurant);

      // Mock menu
      const mockMenu = [
        {
          category: 'Pizzas',
          items: [
            {
              id: 1,
              name: 'Margherita Pizza',
              description: 'Fresh tomato sauce, mozzarella, basil, olive oil',
              price: 16.99,
              originalPrice: 19.99,
              image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200',
              isVeg: true,
              isPopular: true,
              isNew: false,
              customizations: ['Extra Cheese +$2', 'Extra Sauce +$1'],
            },
            {
              id: 2,
              name: 'Pepperoni Pizza',
              description: 'Tomato sauce, mozzarella, pepperoni, oregano',
              price: 19.99,
              originalPrice: 22.99,
              image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200',
              isVeg: false,
              isPopular: true,
              isNew: false,
              customizations: ['Extra Cheese +$2', 'Extra Pepperoni +$3'],
            },
            {
              id: 3,
              name: 'Vegetarian Delight',
              description: 'Bell peppers, mushrooms, onions, olives, tomatoes',
              price: 18.99,
              originalPrice: 21.99,
              image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200',
              isVeg: true,
              isPopular: false,
              isNew: true,
              customizations: ['Extra Cheese +$2'],
            },
          ],
        },
        {
          category: 'Sides',
          items: [
            {
              id: 4,
              name: 'Garlic Bread',
              description: 'Fresh bread with garlic butter, parsley, and cheese',
              price: 4.99,
              originalPrice: 6.99,
              image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=200',
              isVeg: true,
              isPopular: true,
              isNew: false,
              customizations: ['Extra Cheese +$1'],
            },
            {
              id: 5,
              name: 'Caesar Salad',
              description: 'Romaine lettuce, parmesan, croutons, caesar dressing',
              price: 8.99,
              originalPrice: null,
              image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200',
              isVeg: true,
              isPopular: false,
              isNew: false,
              customizations: ['Add Chicken +$3', 'Add Salmon +$4'],
            },
          ],
        },
        {
          category: 'Desserts',
          items: [
            {
              id: 6,
              name: 'Tiramisu',
              description: 'Coffee-flavored Italian dessert with mascarpone',
              price: 6.99,
              originalPrice: 8.99,
              image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200',
              isVeg: true,
              isPopular: true,
              isNew: false,
              customizations: [],
            },
            {
              id: 7,
              name: 'Chocolate Lava Cake',
              description: 'Warm chocolate cake with molten center',
              price: 7.99,
              originalPrice: null,
              image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200',
              isVeg: true,
              isPopular: false,
              isNew: true,
              customizations: ['Add Ice Cream +$2'],
            },
          ],
        },
        {
          category: 'Drinks',
          items: [
            {
              id: 8,
              name: 'Coca-Cola',
              description: 'Classic cola drink',
              price: 2.99,
              originalPrice: null,
              image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=200',
              isVeg: true,
              isPopular: false,
              isNew: false,
              customizations: [],
            },
            {
              id: 9,
              name: 'Fresh Lemonade',
              description: 'Homemade lemonade with mint',
              price: 3.99,
              originalPrice: 4.99,
              image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200',
              isVeg: true,
              isPopular: false,
              isNew: false,
              customizations: ['Extra Lemon +$0.5'],
            },
          ],
        },
      ];
      setMenu(mockMenu);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
      toast.error('Failed to load restaurant details');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(menu.map(item => item.category))];

  const filteredMenu = selectedCategory === 'all'
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    const quantity = (quantities[item.id] || 0) + 1;
    setQuantities({ ...quantities, [item.id]: quantity });
    
    addToCart({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      quantity: 1,
    });
    
    toast.success(`Added ${item.name} to cart!`);
  };

  const handleRemoveFromCart = (item) => {
    const currentQty = getItemQuantity(item.id);
    if (currentQty > 0) {
      const newQty = currentQty - 1;
      setQuantities({ ...quantities, [item.id]: newQty });
      // Remove from cart logic would go here
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!restaurant) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Restaurant Not Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              The restaurant you're looking for doesn't exist.
            </p>
            <Link to="/restaurants">
              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
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
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <img
            src={restaurant.coverImage || restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>

          {/* Favorite & Share */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={toggleFavorite}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            >
              <FiHeart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button
              onClick={() => {
                navigator.share?.({ title: restaurant.name, url: window.location.href })
                  .catch(() => toast.info('Link copied to clipboard'));
              }}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
            >
              <FiShare2 className="w-6 h-6" />
            </button>
          </div>

          {/* Restaurant Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <div className="container mx-auto">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                <span className="flex items-center gap-1">
                  <FiStar className="fill-yellow-400 text-yellow-400" />
                  {restaurant.rating} ({restaurant.reviews} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="text-gray-300" />
                  {restaurant.deliveryTime}
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin className="text-gray-300" />
                  {restaurant.distance}
                </span>
                <span className="flex items-center gap-1">
                  {restaurant.isVeg ? (
                    <FaLeaf className="text-green-400" />
                  ) : (
                    // ✅ FIX: Use FaUtensils from react-icons/fa instead of FiUtensils
                    <FaUtensils className="text-red-400" />
                  )}
                  {restaurant.isVeg ? 'Pure Veg' : 'Non-Veg'}
                </span>
                {restaurant.isOpen ? (
                  <span className="flex items-center gap-1 text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Open Now
                  </span>
                ) : (
                  <span className="text-red-400">Closed</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Restaurant Info */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-gray-600 dark:text-gray-300">{restaurant.description}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <FiTruck className="text-orange-500" />
                    Delivery: {restaurant.deliveryFee}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <FiDollarSign className="text-orange-500" />
                    Min Order: ${restaurant.minOrder}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <FiInfo className="text-orange-500" />
                    {restaurant.cuisine}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {restaurant.offers.map((offer, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium"
                  >
                    🎉 {offer}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Categories */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category === 'all' ? 'All Items' : category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="space-y-6">
            {filteredMenu.map((category) => (
              <div key={category.category}>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.items.map((item) => {
                    const quantity = getItemQuantity(item.id);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-2xl p-4 hover:shadow-lg transition-all"
                      >
                        <div className="flex gap-4">
                          {/* Item Image */}
                          {item.image && (
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          
                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-gray-800 dark:text-white">
                                    {item.name}
                                  </h3>
                                  {item.isVeg ? (
                                    <FaLeaf className="text-green-500 text-sm" />
                                  ) : (
                                    // ✅ FIX: Use FaUtensils from react-icons/fa
                                    <FaUtensils className="text-red-500 text-sm" />
                                  )}
                                  {item.isPopular && (
                                    <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-medium">
                                      <FiTrendingUp className="inline w-3 h-3" /> Popular
                                    </span>
                                  )}
                                  {item.isNew && (
                                    <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium">
                                      New
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {item.description}
                                </p>
                              </div>
                              <div className="text-right">
                                {item.originalPrice && (
                                  <p className="text-sm text-gray-400 line-through">
                                    ${item.originalPrice}
                                  </p>
                                )}
                                <p className="text-xl font-bold text-orange-500">
                                  ${item.price}
                                </p>
                              </div>
                            </div>

                            {/* Customizations */}
                            {item.customizations.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {item.customizations.map((custom, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs"
                                  >
                                    {custom}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Add to Cart */}
                            <div className="flex items-center justify-end gap-3 mt-3">
                              {quantity > 0 ? (
                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                  <button
                                    onClick={() => handleRemoveFromCart(item)}
                                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <FiMinus className="w-4 h-4" />
                                  </button>
                                  <span className="w-6 text-center font-semibold">
                                    {quantity}
                                  </span>
                                  <button
                                    onClick={() => handleAddToCart(item)}
                                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <FiPlus className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleAddToCart(item)}
                                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                                >
                                  Add to Cart
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RestaurantDetails;