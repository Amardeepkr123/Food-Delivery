// src/pages/admin/Settings.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSettings,
  FiSave,
  FiRefreshCw,
  FiGlobe,
  FiMail,
  FiLock,
  FiBell,
  FiCreditCard,
  FiTruck,
  FiUsers,
  FiShield,
  FiDatabase,
  FiSliders,
  FiMoon,
  FiSun,
  FiMonitor,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiToggleLeft,
  FiToggleRight,
  FiDollarSign,
  FiPercent,
  FiClock,
  FiCalendar,
  FiMapPin,
  FiPhone,
  FiAtSign,
  FiLink,
  FiCode,
  FiFileText,
  FiImage,
  FiVideo,
  FiMusic,
  FiBook,
  FiStar,
  FiHeart,
  // ✅ FIX: Replace FiTrophy with FiAward
  FiAward,
  // FiTrophy, // ❌ REMOVED - Doesn't exist
} from 'react-icons/fi';
import { FaGoogle, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-toastify';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'FoodDelivery',
    siteDescription: 'Order food from your favorite restaurants',
    siteEmail: 'support@fooddelivery.com',
    sitePhone: '+1 234 567 890',
    siteAddress: '123 Food Street, Downtown',
    timezone: 'America/New_York',
    currency: 'USD',
    language: 'en',
    maintenanceMode: false,
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    stripePublishableKey: 'pk_test_...',
    stripeSecretKey: 'sk_test_...',
    paypalEnabled: true,
    paypalClientId: '...',
    paypalSecret: '...',
    razorpayEnabled: false,
    razorpayKeyId: '',
    razorpayKeySecret: '',
    codEnabled: true,
    codMessage: 'Pay when you receive your order',
    upiEnabled: true,
    upiId: 'fooddelivery@upi',
    walletEnabled: true,
    walletName: 'FoodWallet',
  });

  // Delivery Settings
  const [deliverySettings, setDeliverySettings] = useState({
    freeDeliveryThreshold: 50,
    deliveryFee: 3.99,
    expressDeliveryFee: 4.99,
    maxDeliveryDistance: 10,
    estimatedDeliveryTime: 30,
    deliveryRadius: 5,
    allowScheduledDelivery: true,
    allowExpressDelivery: true,
    deliveryPartnerAssignment: 'auto',
    trackingEnabled: true,
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    deliveryUpdates: true,
    paymentUpdates: true,
    promotionalEmails: true,
    newsletter: false,
    orderConfirmation: true,
    deliveryConfirmation: true,
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordPolicy: 'medium',
    requireEmailVerification: true,
    requirePhoneVerification: false,
    allowSocialLogin: true,
    allowGuestCheckout: false,
  });

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    primaryColor: '#f97316',
    secondaryColor: '#ef4444',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    customCSS: '',
    customJS: '',
  });

  // Social Media Settings
  const [socialSettings, setSocialSettings] = useState({
    facebook: 'https://facebook.com/fooddelivery',
    twitter: 'https://twitter.com/fooddelivery',
    instagram: 'https://instagram.com/fooddelivery',
    linkedin: 'https://linkedin.com/company/fooddelivery',
    youtube: 'https://youtube.com/fooddelivery',
    google: 'https://google.com/fooddelivery',
  });

  // SEO Settings
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'FoodDelivery - Order Food Online',
    metaDescription: 'Order food from your favorite restaurants. Fast delivery, great taste.',
    metaKeywords: 'food delivery, order food, restaurants, delivery',
    ogTitle: 'FoodDelivery',
    ogDescription: 'Order food online from your favorite restaurants',
    ogImage: '/og-image.png',
    twitterCard: 'summary_large_image',
    twitterTitle: 'FoodDelivery',
    twitterDescription: 'Order food online from your favorite restaurants',
    twitterImage: '/twitter-image.png',
    robots: 'index, follow',
    canonicalUrl: 'https://fooddelivery.com',
  });

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'payment', label: 'Payments', icon: FiCreditCard },
    { id: 'delivery', label: 'Delivery', icon: FiTruck },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'appearance', label: 'Appearance', icon: FiMonitor },
    { id: 'social', label: 'Social Media', icon: FiGlobe },
    { id: 'seo', label: 'SEO', icon: FiSliders },
  ];

  const timezones = [
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Singapore',
    'Australia/Sydney',
  ];

  const currencies = [
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
    { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
    { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar' },
    { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'hi', label: 'Hindi' },
    { code: 'zh', label: 'Chinese' },
    { code: 'ar', label: 'Arabic' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully!');
    }, 1500);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      toast.success('Settings reset to default');
    }
  };

  const handleToggle = (section, key) => {
    const setters = {
      general: setGeneralSettings,
      payment: setPaymentSettings,
      delivery: setDeliverySettings,
      notifications: setNotificationSettings,
      security: setSecuritySettings,
    };

    const setter = setters[section];
    if (setter) {
      setter(prev => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const handleInputChange = (section, key, value) => {
    const setters = {
      general: setGeneralSettings,
      payment: setPaymentSettings,
      delivery: setDeliverySettings,
      notifications: setNotificationSettings,
      security: setSecuritySettings,
      appearance: setAppearanceSettings,
      social: setSocialSettings,
      seo: setSeoSettings,
    };

    const setter = setters[section];
    if (setter) {
      setter(prev => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Site Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={generalSettings.siteName}
            onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Site Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={generalSettings.siteEmail}
            onChange={(e) => handleInputChange('general', 'siteEmail', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Site Description
        </label>
        <textarea
          rows="2"
          value={generalSettings.siteDescription}
          onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
          className="w-full px-4 py-3 rounded-2xl food-input resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={generalSettings.sitePhone}
            onChange={(e) => handleInputChange('general', 'sitePhone', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Address
          </label>
          <input
            type="text"
            value={generalSettings.siteAddress}
            onChange={(e) => handleInputChange('general', 'siteAddress', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Timezone
          </label>
          <select
            value={generalSettings.timezone}
            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl food-input"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Currency
          </label>
          <select
            value={generalSettings.currency}
            onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl food-input"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} - {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Language
          </label>
          <select
            value={generalSettings.language}
            onChange={(e) => handleInputChange('general', 'language', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl food-input"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={generalSettings.maintenanceMode}
            onChange={() => handleToggle('general', 'maintenanceMode')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Maintenance Mode
        </label>
        {generalSettings.maintenanceMode && (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs font-semibold">
            Site is in maintenance mode
          </span>
        )}
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <input
              type="checkbox"
              checked={paymentSettings.stripeEnabled}
              onChange={() => handleToggle('payment', 'stripeEnabled')}
              className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            Enable Stripe
          </label>
          <input
            type="text"
            value={paymentSettings.stripePublishableKey}
            onChange={(e) => handleInputChange('payment', 'stripePublishableKey', e.target.value)}
            placeholder="Publishable Key"
            className="w-full px-4 py-3 rounded-2xl food-input mt-1"
          />
          <input
            type="password"
            value={paymentSettings.stripeSecretKey}
            onChange={(e) => handleInputChange('payment', 'stripeSecretKey', e.target.value)}
            placeholder="Secret Key"
            className="w-full px-4 py-3 rounded-2xl food-input mt-2"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <input
              type="checkbox"
              checked={paymentSettings.paypalEnabled}
              onChange={() => handleToggle('payment', 'paypalEnabled')}
              className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            Enable PayPal
          </label>
          <input
            type="text"
            value={paymentSettings.paypalClientId}
            onChange={(e) => handleInputChange('payment', 'paypalClientId', e.target.value)}
            placeholder="Client ID"
            className="w-full px-4 py-3 rounded-2xl food-input mt-1"
          />
          <input
            type="password"
            value={paymentSettings.paypalSecret}
            onChange={(e) => handleInputChange('payment', 'paypalSecret', e.target.value)}
            placeholder="Secret"
            className="w-full px-4 py-3 rounded-2xl food-input mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <input
              type="checkbox"
              checked={paymentSettings.razorpayEnabled}
              onChange={() => handleToggle('payment', 'razorpayEnabled')}
              className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            Enable Razorpay
          </label>
          <input
            type="text"
            value={paymentSettings.razorpayKeyId}
            onChange={(e) => handleInputChange('payment', 'razorpayKeyId', e.target.value)}
            placeholder="Key ID"
            className="w-full px-4 py-3 rounded-2xl food-input mt-1"
          />
          <input
            type="password"
            value={paymentSettings.razorpayKeySecret}
            onChange={(e) => handleInputChange('payment', 'razorpayKeySecret', e.target.value)}
            placeholder="Key Secret"
            className="w-full px-4 py-3 rounded-2xl food-input mt-2"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <input
              type="checkbox"
              checked={paymentSettings.codEnabled}
              onChange={() => handleToggle('payment', 'codEnabled')}
              className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            Enable Cash on Delivery
          </label>
          <input
            type="text"
            value={paymentSettings.codMessage}
            onChange={(e) => handleInputChange('payment', 'codMessage', e.target.value)}
            placeholder="COD Message"
            className="w-full px-4 py-3 rounded-2xl food-input mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <input
              type="checkbox"
              checked={paymentSettings.upiEnabled}
              onChange={() => handleToggle('payment', 'upiEnabled')}
              className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            Enable UPI
          </label>
          <input
            type="text"
            value={paymentSettings.upiId}
            onChange={(e) => handleInputChange('payment', 'upiId', e.target.value)}
            placeholder="UPI ID"
            className="w-full px-4 py-3 rounded-2xl food-input mt-1"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <input
              type="checkbox"
              checked={paymentSettings.walletEnabled}
              onChange={() => handleToggle('payment', 'walletEnabled')}
              className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            Enable Wallet
          </label>
          <input
            type="text"
            value={paymentSettings.walletName}
            onChange={(e) => handleInputChange('payment', 'walletName', e.target.value)}
            placeholder="Wallet Name"
            className="w-full px-4 py-3 rounded-2xl food-input mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderDeliverySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Free Delivery Threshold ($)
          </label>
          <input
            type="number"
            value={deliverySettings.freeDeliveryThreshold}
            onChange={(e) => handleInputChange('delivery', 'freeDeliveryThreshold', parseFloat(e.target.value))}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Standard Delivery Fee ($)
          </label>
          <input
            type="number"
            value={deliverySettings.deliveryFee}
            onChange={(e) => handleInputChange('delivery', 'deliveryFee', parseFloat(e.target.value))}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Express Delivery Fee ($)
          </label>
          <input
            type="number"
            value={deliverySettings.expressDeliveryFee}
            onChange={(e) => handleInputChange('delivery', 'expressDeliveryFee', parseFloat(e.target.value))}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Max Delivery Distance (km)
          </label>
          <input
            type="number"
            value={deliverySettings.maxDeliveryDistance}
            onChange={(e) => handleInputChange('delivery', 'maxDeliveryDistance', parseFloat(e.target.value))}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Estimated Delivery Time (minutes)
          </label>
          <input
            type="number"
            value={deliverySettings.estimatedDeliveryTime}
            onChange={(e) => handleInputChange('delivery', 'estimatedDeliveryTime', parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Delivery Radius (km)
          </label>
          <input
            type="number"
            value={deliverySettings.deliveryRadius}
            onChange={(e) => handleInputChange('delivery', 'deliveryRadius', parseFloat(e.target.value))}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={deliverySettings.allowScheduledDelivery}
            onChange={() => handleToggle('delivery', 'allowScheduledDelivery')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Allow Scheduled Delivery
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={deliverySettings.allowExpressDelivery}
            onChange={() => handleToggle('delivery', 'allowExpressDelivery')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Allow Express Delivery
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={deliverySettings.trackingEnabled}
            onChange={() => handleToggle('delivery', 'trackingEnabled')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Enable Live Tracking
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Delivery Partner Assignment
        </label>
        <select
          value={deliverySettings.deliveryPartnerAssignment}
          onChange={(e) => handleInputChange('delivery', 'deliveryPartnerAssignment', e.target.value)}
          className="w-full px-4 py-3 rounded-2xl food-input"
        >
          <option value="auto">Automatic</option>
          <option value="manual">Manual</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Channel Settings</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={notificationSettings.emailNotifications}
            onChange={() => handleToggle('notifications', 'emailNotifications')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Email Notifications
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={notificationSettings.pushNotifications}
            onChange={() => handleToggle('notifications', 'pushNotifications')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Push Notifications
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={notificationSettings.smsNotifications}
            onChange={() => handleToggle('notifications', 'smsNotifications')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          SMS Notifications
        </label>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-6">Event Settings</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={notificationSettings.orderUpdates}
            onChange={() => handleToggle('notifications', 'orderUpdates')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Order Updates
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={notificationSettings.deliveryUpdates}
            onChange={() => handleToggle('notifications', 'deliveryUpdates')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Delivery Updates
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={notificationSettings.paymentUpdates}
            onChange={() => handleToggle('notifications', 'paymentUpdates')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Payment Updates
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={notificationSettings.promotionalEmails}
            onChange={() => handleToggle('notifications', 'promotionalEmails')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Promotional Emails
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={notificationSettings.newsletter}
            onChange={() => handleToggle('notifications', 'newsletter')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Newsletter
        </label>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-6">Confirmation Settings</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={notificationSettings.orderConfirmation}
            onChange={() => handleToggle('notifications', 'orderConfirmation')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Order Confirmation
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={notificationSettings.deliveryConfirmation}
            onChange={() => handleToggle('notifications', 'deliveryConfirmation')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Delivery Confirmation
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={securitySettings.sessionTimeout}
            onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-2xl food-input"
            min="5"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Max Login Attempts
          </label>
          <input
            type="number"
            value={securitySettings.maxLoginAttempts}
            onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-2xl food-input"
            min="3"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Password Policy
        </label>
        <select
          value={securitySettings.passwordPolicy}
          onChange={(e) => handleInputChange('security', 'passwordPolicy', e.target.value)}
          className="w-full px-4 py-3 rounded-2xl food-input"
        >
          <option value="low">Low (6 characters minimum)</option>
          <option value="medium">Medium (8 characters with mix)</option>
          <option value="high">High (12 characters with special chars)</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={securitySettings.twoFactorAuth}
            onChange={() => handleToggle('security', 'twoFactorAuth')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Enable Two-Factor Authentication
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={securitySettings.requireEmailVerification}
            onChange={() => handleToggle('security', 'requireEmailVerification')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Require Email Verification
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={securitySettings.requirePhoneVerification}
            onChange={() => handleToggle('security', 'requirePhoneVerification')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Require Phone Verification
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={securitySettings.allowSocialLogin}
            onChange={() => handleToggle('security', 'allowSocialLogin')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Allow Social Login
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={securitySettings.allowGuestCheckout}
            onChange={() => handleToggle('security', 'allowGuestCheckout')}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Allow Guest Checkout
        </label>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Theme
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => handleInputChange('appearance', 'theme', 'light')}
            className={`p-4 rounded-2xl border-2 transition-all flex-1 flex items-center gap-2 ${
              appearanceSettings.theme === 'light'
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
            }`}
          >
            <FiSun className="w-5 h-5 text-yellow-500" />
            Light
          </button>
          <button
            onClick={() => handleInputChange('appearance', 'theme', 'dark')}
            className={`p-4 rounded-2xl border-2 transition-all flex-1 flex items-center gap-2 ${
              appearanceSettings.theme === 'dark'
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
            }`}
          >
            <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            Dark
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Primary Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={appearanceSettings.primaryColor}
              onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
              className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer"
            />
            <input
              type="text"
              value={appearanceSettings.primaryColor}
              onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl food-input"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Secondary Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={appearanceSettings.secondaryColor}
              onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
              className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer"
            />
            <input
              type="text"
              value={appearanceSettings.secondaryColor}
              onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl food-input"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Custom CSS
        </label>
        <textarea
          rows="4"
          value={appearanceSettings.customCSS}
          onChange={(e) => handleInputChange('appearance', 'customCSS', e.target.value)}
          placeholder="/* Add custom CSS here */"
          className="w-full px-4 py-3 rounded-2xl food-input font-mono text-sm resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Custom JavaScript
        </label>
        <textarea
          rows="4"
          value={appearanceSettings.customJS}
          onChange={(e) => handleInputChange('appearance', 'customJS', e.target.value)}
          placeholder="// Add custom JavaScript here"
          className="w-full px-4 py-3 rounded-2xl food-input font-mono text-sm resize-none"
        />
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <FaFacebook className="text-blue-600" />
            Facebook
          </label>
          <input
            type="url"
            value={socialSettings.facebook}
            onChange={(e) => handleInputChange('social', 'facebook', e.target.value)}
            placeholder="https://facebook.com/yourpage"
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <FaTwitter className="text-blue-400" />
            Twitter
          </label>
          <input
            type="url"
            value={socialSettings.twitter}
            onChange={(e) => handleInputChange('social', 'twitter', e.target.value)}
            placeholder="https://twitter.com/yourhandle"
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <FaInstagram className="text-pink-500" />
            Instagram
          </label>
          <input
            type="url"
            value={socialSettings.instagram}
            onChange={(e) => handleInputChange('social', 'instagram', e.target.value)}
            placeholder="https://instagram.com/yourhandle"
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <FaLinkedin className="text-blue-700" />
            LinkedIn
          </label>
          <input
            type="url"
            value={socialSettings.linkedin}
            onChange={(e) => handleInputChange('social', 'linkedin', e.target.value)}
            placeholder="https://linkedin.com/company/yourcompany"
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <FaYoutube className="text-red-600" />
            YouTube
          </label>
          <input
            type="url"
            value={socialSettings.youtube}
            onChange={(e) => handleInputChange('social', 'youtube', e.target.value)}
            placeholder="https://youtube.com/yourchannel"
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            <FaGoogle className="text-red-500" />
            Google
          </label>
          <input
            type="url"
            value={socialSettings.google}
            onChange={(e) => handleInputChange('social', 'google', e.target.value)}
            placeholder="https://google.com/yourbusiness"
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
      </div>
    </div>
  );

  const renderSeoSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Meta Title
        </label>
        <input
          type="text"
          value={seoSettings.metaTitle}
          onChange={(e) => handleInputChange('seo', 'metaTitle', e.target.value)}
          className="w-full px-4 py-3 rounded-2xl food-input"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Meta Description
        </label>
        <textarea
          rows="2"
          value={seoSettings.metaDescription}
          onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
          className="w-full px-4 py-3 rounded-2xl food-input resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Meta Keywords
        </label>
        <input
          type="text"
          value={seoSettings.metaKeywords}
          onChange={(e) => handleInputChange('seo', 'metaKeywords', e.target.value)}
          placeholder="keyword1, keyword2, keyword3"
          className="w-full px-4 py-3 rounded-2xl food-input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            OG Title
          </label>
          <input
            type="text"
            value={seoSettings.ogTitle}
            onChange={(e) => handleInputChange('seo', 'ogTitle', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            OG Description
          </label>
          <input
            type="text"
            value={seoSettings.ogDescription}
            onChange={(e) => handleInputChange('seo', 'ogDescription', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl food-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Twitter Card Type
          </label>
          <select
            value={seoSettings.twitterCard}
            onChange={(e) => handleInputChange('seo', 'twitterCard', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl food-input"
          >
            <option value="summary">Summary</option>
            <option value="summary_large_image">Summary with Large Image</option>
            <option value="app">App</option>
            <option value="player">Player</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Robots
          </label>
          <select
            value={seoSettings.robots}
            onChange={(e) => handleInputChange('seo', 'robots', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl food-input"
          >
            <option value="index, follow">Index, Follow</option>
            <option value="index, nofollow">Index, NoFollow</option>
            <option value="noindex, follow">NoIndex, Follow</option>
            <option value="noindex, nofollow">NoIndex, NoFollow</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Canonical URL
        </label>
        <input
          type="url"
          value={seoSettings.canonicalUrl}
          onChange={(e) => handleInputChange('seo', 'canonicalUrl', e.target.value)}
          className="w-full px-4 py-3 rounded-2xl food-input"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'payment':
        return renderPaymentSettings();
      case 'delivery':
        return renderDeliverySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'social':
        return renderSocialSettings();
      case 'seo':
        return renderSeoSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                <FiSettings className="text-orange-500" />
                Settings
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Configure your platform settings</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                <FiRefreshCw className="w-4 h-4" />
                Reset Defaults
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;