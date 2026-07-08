// src/pages/booking/TableBooking.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiUsers,
  FiMapPin,
  FiStar,
  FiHeart,
  FiShare2,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiX,
  FiPlus,
  FiMinus,
  FiCreditCard,
  FiSmartphone,
  FiDollarSign,
  FiTag,
  FiGift,
  FiAward,
  FiInfo,
  FiAlertCircle,
  FiCheckCircle,
  FiClock as FiClockIcon,
  FiPhone,
  FiMail,
  FiGlobe,
  FiCamera,
  FiZoomIn,
  FiArrowRight,
  FiArrowLeft,
  FiTruck,
  FiShield,
  FiLock,
  FiZap,
  FiTrendingUp,
  FiAward as FiAwardIcon,
} from 'react-icons/fi';
import {
  FaUtensils,
  FaWifi,
  FaParking,
  FaWheelchair,
  FaChild,
  FaLeaf,
  FaFire,
  FaCrown,
  FaChair,
  FaBirthdayCake,
  FaHeart,
  FaBriefcase,
  FaUsers,
  FaGlassCheers,
  FaGift,
  FaMusic,
  FaFlower,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import MainLayout from '../../layouts/MainLayout';
import { useAuth } from '../../hooks/useAuth';

// ============================================
// MOCK DATA
// ============================================
const mockRestaurant = {
  id: 1,
  name: 'Pizza Palace',
  logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200',
  coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200',
  cuisine: 'Italian • Pizza • Pasta',
  rating: 4.8,
  reviews: 1245,
  priceRange: '₹₹',
  distance: '1.2 km',
  travelTime: '8 min',
  isOpen: true,
  address: '123, Marine Drive, Mumbai - 400001',
  phone: '+91 98765 43210',
  openingHours: '10:00 AM - 11:00 PM',
  availableTables: 12,
  waitingTime: '10-15 min',
  description: 'Experience authentic Italian pizza made with love. Our hand-tossed pizzas are crafted with the finest ingredients.',
  features: ['Free Wi-Fi', 'Outdoor Seating', 'Parking Available', 'AC Dining', 'Kids Friendly'],
};

const mockTables = [
  { id: 1, number: 'T-01', name: 'Window Seat', capacity: 2, type: 'window', status: 'available', price: 99, minSpend: 500, features: ['window-view', 'ac'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300' },
  { id: 2, number: 'T-02', name: 'Family Table', capacity: 6, type: 'family', status: 'available', price: 149, minSpend: 1000, features: ['ac', 'wifi', 'kids-friendly'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300' },
  { id: 3, number: 'T-03', name: 'VIP Lounge', capacity: 4, type: 'vip', status: 'reserved', price: 299, minSpend: 2000, features: ['ac', 'wifi', 'window-view', 'live-music'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300' },
  { id: 4, number: 'T-04', name: 'Rooftop', capacity: 8, type: 'rooftop', status: 'available', price: 199, minSpend: 1500, features: ['outdoor', 'live-music', 'ac'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300' },
  { id: 5, number: 'T-05', name: 'Private Cabin', capacity: 10, type: 'private-cabin', status: 'cleaning', price: 399, minSpend: 3000, features: ['ac', 'wifi', 'private', 'charging-point'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300' },
  { id: 6, number: 'T-06', name: 'Couple Table', capacity: 2, type: 'couple', status: 'available', price: 79, minSpend: 300, features: ['window-view', 'ac', 'romantic'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300' },
];

const mockTimeSlots = [
  { id: 'breakfast', label: 'Breakfast', time: '8:00 AM - 11:00 AM', available: true },
  { id: 'lunch', label: 'Lunch', time: '12:00 PM - 3:00 PM', available: true },
  { id: 'evening', label: 'Evening', time: '4:00 PM - 7:00 PM', available: true },
  { id: 'dinner', label: 'Dinner', time: '7:00 PM - 10:00 PM', available: true },
  { id: 'night', label: 'Night', time: '10:00 PM - 12:00 AM', available: false },
];

const mockOccasions = [
  { id: 'birthday', label: 'Birthday', icon: FaBirthdayCake, color: 'from-pink-400 to-rose-500' },
  { id: 'anniversary', label: 'Anniversary', icon: FaHeart, color: 'from-red-400 to-pink-500' },
  { id: 'date-night', label: 'Date Night', icon: FaHeart, color: 'from-purple-400 to-pink-500' },
  { id: 'family-dinner', label: 'Family Dinner', icon: FaUsers, color: 'from-green-400 to-emerald-500' },
  { id: 'business', label: 'Business Meeting', icon: FaBriefcase, color: 'from-blue-400 to-indigo-500' },
  { id: 'engagement', label: 'Engagement', icon: FaGift, color: 'from-yellow-400 to-amber-500' },
  { id: 'wedding', label: 'Wedding', icon: FaGlassCheers, color: 'from-orange-400 to-red-500' },
  { id: 'party', label: 'Party', icon: FaFire, color: 'from-orange-400 to-purple-500' },
  { id: 'festival', label: 'Festival', icon: FaGift, color: 'from-red-400 to-yellow-500' },
  { id: 'other', label: 'Other', icon: FaUtensils, color: 'from-gray-400 to-gray-500' },
];

const mockDecorations = [
  { id: 'cake', label: 'Cake', price: 500, icon: FaBirthdayCake },
  { id: 'flowers', label: 'Flowers', price: 300, icon: FaFlower },
  { id: 'candles', label: 'Candles', price: 200, icon: FaFire },
  { id: 'balloons', label: 'Balloons', price: 250, icon: FaGift },
  { id: 'live-music', label: 'Live Music', price: 1000, icon: FaMusic },
  { id: 'romantic-setup', label: 'Romantic Setup', price: 800, icon: FaHeart },
];

const mockCoupons = [
  { code: 'FIRST50', description: '50% off on first booking', discount: 50, minAmount: 500 },
  { code: 'WELCOME100', description: '₹100 off on first booking', discount: 100, minAmount: 300 },
  { code: 'DINNER20', description: '20% off on dinner bookings', discount: 20, minAmount: 400 },
  { code: 'FAMILY25', description: '25% off for family bookings', discount: 25, minAmount: 600 },
];

// ============================================
// COMPONENTS
// ============================================

// Stepper Component
const Stepper = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        return (
          <React.Fragment key={index}>
            <motion.button
              onClick={() => onStepClick(index)}
              className={`flex items-center gap-3 ${isActive || isCompleted ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              whileHover={isActive || isCompleted ? { scale: 1.02 } : {}}
            >
              <div className={`flex items-center gap-2`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                      : isActive
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 animate-pulse'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {isCompleted ? <FiCheck className="w-5 h-5" /> : index + 1}
                </div>
                <div className="hidden md:block text-left">
                  <p className={`text-xs font-medium ${isActive ? 'text-orange-500' : isCompleted ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
                    Step {index + 1}
                  </p>
                  <p className={`text-sm font-semibold ${isActive ? 'text-gray-800 dark:text-white' : isCompleted ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                </div>
              </div>
            </motion.button>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2">
                <div className={`h-full transition-all duration-500 ${isCompleted ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Table Card Component
const TableCard = ({ table, isSelected, onSelect }) => {
  const statusColors = {
    available: 'bg-green-500',
    reserved: 'bg-yellow-500',
    occupied: 'bg-red-500',
    cleaning: 'bg-blue-500',
    'out-of-service': 'bg-gray-500',
  };

  const typeLabels = {
    vip: 'VIP',
    window: 'Window',
    rooftop: 'Rooftop',
    family: 'Family',
    couple: 'Couple',
    outdoor: 'Outdoor',
    'private-cabin': 'Private Cabin',
    standard: 'Standard',
  };

  const typeIcons = {
    vip: FaCrown,
    window: FiSun,
    rooftop: FiMoon,
    family: FaChild,
    couple: FaHeart,
    outdoor: FiWind,
    'private-cabin': FiUsers,
    standard: FaChair,
  };

  const TypeIcon = typeIcons[table.type] || FaChair;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      onClick={() => table.status === 'available' && onSelect(table)}
      className={`glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-gray-900 shadow-2xl shadow-orange-500/20'
          : table.status === 'available'
          ? 'hover:shadow-2xl'
          : 'opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={table.image}
          alt={table.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          <span className={`px-2 py-0.5 rounded-full text-white text-xs font-semibold ${statusColors[table.status]}`}>
            {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold flex items-center gap-1">
            <TypeIcon className="w-3 h-3" />
            {typeLabels[table.type] || 'Standard'}
          </span>
        </div>
        {isSelected && (
          <div className="absolute inset-0 bg-orange-500/10 border-2 border-orange-500" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{table.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{table.number}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-orange-500">₹{table.price}</p>
            <p className="text-xs text-gray-400">Min. ₹{table.minSpend}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <FiUsers className="w-4 h-4" />
          <span>{table.capacity} guests</span>
        </div>
        {table.features && table.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {table.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300">
                {feature.replace('-', ' ')}
              </span>
            ))}
          </div>
        )}
        {table.status === 'available' && (
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(table); }}
            className={`w-full mt-3 py-2 rounded-xl text-white font-semibold text-sm transition-all ${
              isSelected
                ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/30'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {isSelected ? 'Selected ✓' : 'Select Table'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Time Slot Button
const TimeSlotButton = ({ slot, isSelected, onSelect }) => {
  return (
    <motion.button
      whileHover={slot.available ? { scale: 1.02 } : {}}
      whileTap={slot.available ? { scale: 0.98 } : {}}
      onClick={() => slot.available && onSelect(slot)}
      disabled={!slot.available}
      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
        isSelected
          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
          : slot.available
          ? 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
          : 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
          <FiClock className="w-5 h-5" />
        </div>
        <div>
          <p className={`font-semibold ${isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'}`}>
            {slot.label}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{slot.time}</p>
        </div>
      </div>
    </motion.button>
  );
};

// Occasion Card
const OccasionCard = ({ occasion, isSelected, onSelect }) => {
  const Icon = occasion.icon;
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(occasion.id)}
      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
        isSelected
          ? `border-orange-500 bg-gradient-to-br ${occasion.color} text-white shadow-lg shadow-orange-500/20`
          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
      }`}
    >
      <div className={`flex flex-col items-center gap-1 ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
        <Icon className="w-6 h-6" />
        <span className="text-sm font-medium">{occasion.label}</span>
      </div>
    </motion.button>
  );
};

// Decoration Option
const DecorationOption = ({ decoration, isSelected, onSelect }) => {
  const Icon = decoration.icon;
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(decoration.id)}
      className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-300 ${
        isSelected
          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg shadow-orange-500/10'
          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
      }`}
    >
      <Icon className={`w-5 h-5 ${isSelected ? 'text-orange-500' : 'text-gray-400'}`} />
      <div className="flex-1 text-left">
        <p className={`font-medium ${isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'}`}>
          {decoration.label}
        </p>
        <p className="text-xs text-gray-400">+₹{decoration.price}</p>
      </div>
      {isSelected && <FiCheck className="w-5 h-5 text-orange-500" />}
    </motion.button>
  );
};

// ============================================
// MAIN TABLE BOOKING PAGE
// ============================================
const TableBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [restaurant, setRestaurant] = useState(mockRestaurant);
  const [tables, setTables] = useState(mockTables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0 });
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [selectedDecorations, setSelectedDecorations] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      specialRequests: '',
      dietaryPreferences: '',
      allergyInfo: '',
      gstNumber: '',
    },
  });

  const steps = [
    { label: 'Select Restaurant' },
    { label: 'Select Table' },
    { label: 'Date & Time' },
    { label: 'Customer Details' },
    { label: 'Payment & Confirm' },
  ];

  // Calculate totals
  const totalGuests = guests.adults + guests.children + guests.infants;
  const decorationCost = selectedDecorations.reduce((sum, id) => {
    const dec = mockDecorations.find(d => d.id === id);
    return sum + (dec?.price || 0);
  }, 0);
  const bookingFee = selectedTable?.price || 0;
  const subtotal = bookingFee + decorationCost;
  const tax = subtotal * 0.08;
  const discount = appliedCoupon?.discount || 0;
  const grandTotal = subtotal + tax - discount;

  // Handle table selection
  const handleTableSelect = (table) => {
    if (table.status === 'available') {
      setSelectedTable(table);
    }
  };

  // Handle guest change
  const handleGuestChange = (type, change) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + change),
    }));
  };

  // Handle decoration toggle
  const handleDecorationToggle = (id) => {
    setSelectedDecorations(prev =>
      prev.includes(id)
        ? prev.filter(d => d !== id)
        : [...prev, id]
    );
  };

  // Handle coupon apply
  const handleApplyCoupon = () => {
    const found = mockCoupons.find(c => c.code === couponCode.toUpperCase());
    if (found && subtotal >= found.minAmount) {
      setAppliedCoupon(found);
      toast.success('Coupon applied successfully! 🎉');
    } else if (found) {
      toast.error(`Minimum order of ₹${found.minAmount} required`);
    } else {
      toast.error('Invalid coupon code');
    }
    setCouponCode('');
  };

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  // Handle booking submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const booking = {
        ...data,
        restaurant: restaurant.name,
        table: selectedTable,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        guests,
        occasion: selectedOccasion,
        decorations: selectedDecorations,
        coupon: appliedCoupon,
        subtotal,
        tax,
        discount,
        grandTotal,
        bookingId: `BK-${Date.now()}`,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      setBookingData(booking);
      setIsSuccess(true);
      toast.success('Table booked successfully! 🎉');
    } catch (error) {
      toast.error('Failed to book table. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle step navigation
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-48" />
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                </div>
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Success state
  if (isSuccess && bookingData) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Table Booked Successfully!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Your table has been reserved at {restaurant.name}
            </p>
            <p className="text-sm font-semibold text-orange-500 mb-6">
              Booking ID: {bookingData.bookingId}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6 text-left">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xs text-gray-400">Table</p>
                <p className="font-semibold text-gray-800 dark:text-white">{selectedTable?.name}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xs text-gray-400">Date & Time</p>
                <p className="font-semibold text-gray-800 dark:text-white">{selectedDate} • {selectedTimeSlot?.label}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xs text-gray-400">Guests</p>
                <p className="font-semibold text-gray-800 dark:text-white">{totalGuests} guests</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xs text-gray-400">Total</p>
                <p className="font-semibold text-orange-500">₹{grandTotal}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/bookings">
                <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all">
                  View My Bookings
                </button>
              </Link>
              <Link to="/restaurants">
                <button className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                  Browse More Restaurants
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Book a Table
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {restaurant.name} • {restaurant.cuisine}
              </p>
            </div>
          </div>

          {/* Stepper */}
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-3xl p-6 md:p-8"
              >
                {/* Step 0: Select Restaurant */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <FiMapPin className="text-orange-500" />
                      Restaurant Details
                    </h2>

                    {/* Restaurant Info */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={restaurant.coverImage}
                        alt={restaurant.name}
                        className="w-full md:w-48 h-48 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {restaurant.name}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                            {restaurant.isOpen ? 'Open Now' : 'Closed'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <FiStar className="text-yellow-400 fill-current" />
                          <span>{restaurant.rating} ({restaurant.reviews} reviews)</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{restaurant.cuisine}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <FiMapPin className="w-4 h-4" /> {restaurant.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiClockIcon className="w-4 h-4" /> {restaurant.travelTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiClockIcon className="w-4 h-4" /> {restaurant.openingHours}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <button className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1">
                            <FiPhone className="w-4 h-4" /> Call
                          </button>
                          <button className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1">
                            <FiMapPin className="w-4 h-4" /> Navigate
                          </button>
                          <button className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1">
                            <FiHeart className="w-4 h-4" /> Save
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.features.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
                    >
                      Continue to Select Table <FiArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Step 1: Select Table */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <FiUsers className="text-orange-500" />
                        Select a Table
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-green-500" /> Available
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-yellow-500" /> Reserved
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {tables.map((table) => (
                        <TableCard
                          key={table.id}
                          table={table}
                          isSelected={selectedTable?.id === table.id}
                          onSelect={handleTableSelect}
                        />
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!selectedTable}
                        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Continue to Date & Time <FiArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <FiCalendar className="text-orange-500" />
                      Select Date & Time
                    </h2>

                    {/* Date Picker */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300"
                      />
                    </div>

                    {/* Time Slots */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Time Slot</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mockTimeSlots.map((slot) => (
                          <TimeSlotButton
                            key={slot.id}
                            slot={slot}
                            isSelected={selectedTimeSlot?.id === slot.id}
                            onSelect={setSelectedTimeSlot}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Number of Guests</label>
                      <div className="grid grid-cols-3 gap-4">
                        {['adults', 'children', 'infants'].map((type) => (
                          <div key={type} className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                            <p className="text-xs text-gray-500 capitalize mb-2">{type}</p>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleGuestChange(type, -1)}
                                className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-bold">{guests[type]}</span>
                              <button
                                onClick={() => handleGuestChange(type, 1)}
                                className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Total: {totalGuests} guests</p>
                    </div>

                    {/* Occasion */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Occasion</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {mockOccasions.map((occasion) => (
                          <OccasionCard
                            key={occasion.id}
                            occasion={occasion}
                            isSelected={selectedOccasion === occasion.id}
                            onSelect={setSelectedOccasion}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Decorations */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Decorations</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mockDecorations.map((decoration) => (
                          <DecorationOption
                            key={decoration.id}
                            decoration={decoration}
                            isSelected={selectedDecorations.includes(decoration.id)}
                            onSelect={handleDecorationToggle}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!selectedTimeSlot || totalGuests === 0}
                        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Continue to Details <FiArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Customer Details */}
                {currentStep === 3 && (
                  <form className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <FiUser className="text-orange-500" />
                      Customer Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          className={`w-full px-4 py-3 rounded-2xl border ${
                            errors.name ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                          } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number *
                        </label>
                        <input
                          {...register('phone', { required: 'Phone is required' })}
                          className={`w-full px-4 py-3 rounded-2xl border ${
                            errors.phone ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'
                          } bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300`}
                          placeholder="9876543210"
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          {...register('email')}
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          GST Number (Optional)
                        </label>
                        <input
                          {...register('gstNumber')}
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300"
                          placeholder="GSTIN123456789"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Special Requests
                      </label>
                      <textarea
                        {...register('specialRequests')}
                        rows="2"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300 resize-none"
                        placeholder="Any special requests?"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2"
                      >
                        Continue to Payment <FiArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 4: Payment & Confirm */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <FiCreditCard className="text-orange-500" />
                      Payment & Confirm
                    </h2>

                    {/* Coupon Section */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Apply Coupon
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Enter coupon code"
                          className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 outline-none transition-all duration-300"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all"
                        >
                          Apply
                        </button>
                      </div>
                      {appliedCoupon && (
                        <div className="mt-2 flex items-center gap-2 p-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30">
                          <FiCheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-700 dark:text-green-400">
                            {appliedCoupon.code} - {appliedCoupon.description}
                          </span>
                          <button
                            onClick={handleRemoveCoupon}
                            className="ml-auto p-1 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                          >
                            <FiX className="w-4 h-4 text-green-500" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Summary */}
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Booking Fee</span>
                          <span className="text-gray-800 dark:text-white">₹{bookingFee}</span>
                        </div>
                        {decorationCost > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Decorations</span>
                            <span className="text-gray-800 dark:text-white">₹{decorationCost}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Tax (8%)</span>
                          <span className="text-gray-800 dark:text-white">₹{tax}</span>
                        </div>
                        {appliedCoupon && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>-₹{discount}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg">
                          <span className="text-gray-800 dark:text-white">Grand Total</span>
                          <span className="text-orange-500">₹{grandTotal}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Payment Method</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['UPI', 'Card', 'Wallet', 'Net Banking', 'Pay at Restaurant'].map((method) => (
                          <button
                            key={method}
                            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 transition-all text-sm text-gray-600 dark:text-gray-300"
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isLoading}
                        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FiLock className="w-5 h-5" />
                            Confirm Booking
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-3xl p-6 sticky top-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FiInfo className="text-orange-500" />
                  Booking Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">Restaurant</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{restaurant.name}</p>
                  </div>
                  {selectedTable && (
                    <div>
                      <p className="text-xs text-gray-400">Table</p>
                      <p className="font-semibold text-gray-800 dark:text-white">{selectedTable.name} ({selectedTable.number})</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-400">Date & Time</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {selectedDate} {selectedTimeSlot ? `• ${selectedTimeSlot.label}` : ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Guests</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{totalGuests} guests</p>
                  </div>
                  {selectedOccasion && (
                    <div>
                      <p className="text-xs text-gray-400">Occasion</p>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {mockOccasions.find(o => o.id === selectedOccasion)?.label}
                      </p>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                      <span className="text-gray-800 dark:text-white">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Tax</span>
                      <span className="text-gray-800 dark:text-white">₹{tax}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg">
                      <span className="text-gray-800 dark:text-white">Total</span>
                      <span className="text-orange-500">₹{grandTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TableBooking;