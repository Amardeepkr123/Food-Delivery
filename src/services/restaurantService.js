// src/services/restaurantService.js
import api from './api';

export const restaurantService = {
  // ============================================
  // RESTAURANT CRUD OPERATIONS
  // ============================================

  // Get all restaurants with filters
  async getAllRestaurants(params = {}) {
    const response = await api.get('/restaurants', { 
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        search: params.search || '',
        category: params.category || '',
        rating: params.rating || '',
        deliveryTime: params.deliveryTime || '',
        priceRange: params.priceRange || '',
        sortBy: params.sortBy || 'rating',
        sortOrder: params.sortOrder || 'desc',
        lat: params.lat || '',
        lng: params.lng || '',
        radius: params.radius || 10,
        isOpen: params.isOpen || false,
        isVeg: params.isVeg || false,
        ...params,
      },
    });
    return response.data;
  },

  // Get featured restaurants
  async getFeaturedRestaurants(limit = 10) {
    const response = await api.get('/restaurants/featured', { 
      params: { limit },
    });
    return response.data;
  },

  // Get restaurant by ID with full details
  async getRestaurantById(id) {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },

  // Get restaurant by slug
  async getRestaurantBySlug(slug) {
    const response = await api.get(`/restaurants/slug/${slug}`);
    return response.data;
  },

  // Search restaurants with advanced filters
  async searchRestaurants(query, filters = {}) {
    const response = await api.get('/restaurants/search', { 
      params: { 
        q: query,
        ...filters,
      },
    });
    return response.data;
  },

  // Get restaurants by category
  async getRestaurantsByCategory(categoryId, params = {}) {
    const response = await api.get(`/restaurants/category/${categoryId}`, { 
      params,
    });
    return response.data;
  },

  // Get restaurants by cuisine
  async getRestaurantsByCuisine(cuisine, params = {}) {
    const response = await api.get(`/restaurants/cuisine/${cuisine}`, { 
      params,
    });
    return response.data;
  },

  // Get nearby restaurants
  async getNearbyRestaurants(lat, lng, radius = 10) {
    const response = await api.get('/restaurants/nearby', { 
      params: { lat, lng, radius },
    });
    return response.data;
  },

  // ============================================
  // RESTAURANT MENU OPERATIONS
  // ============================================

  // Get restaurant menu with categories
  async getRestaurantMenu(restaurantId, params = {}) {
    const response = await api.get(`/restaurants/${restaurantId}/menu`, { 
      params: {
        category: params.category || '',
        isVeg: params.isVeg || false,
        isAvailable: params.isAvailable || true,
        search: params.search || '',
        sortBy: params.sortBy || 'popularity',
        ...params,
      },
    });
    return response.data;
  },

  // Get menu item details
  async getMenuItem(restaurantId, itemId) {
    const response = await api.get(`/restaurants/${restaurantId}/menu/${itemId}`);
    return response.data;
  },

  // Get menu categories
  async getMenuCategories(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/menu/categories`);
    return response.data;
  },

  // Search menu items
  async searchMenuItems(restaurantId, query) {
    const response = await api.get(`/restaurants/${restaurantId}/menu/search`, { 
      params: { q: query },
    });
    return response.data;
  },

  // Get popular menu items
  async getPopularItems(restaurantId, limit = 10) {
    const response = await api.get(`/restaurants/${restaurantId}/menu/popular`, { 
      params: { limit },
    });
    return response.data;
  },

  // Get recommended items
  async getRecommendedItems(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/menu/recommended`);
    return response.data;
  },

  // ============================================
  // RESTAURANT REVIEWS & RATINGS
  // ============================================

  // Get restaurant reviews with pagination
  async getRestaurantReviews(restaurantId, params = {}) {
    const response = await api.get(`/restaurants/${restaurantId}/reviews`, { 
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        sortBy: params.sortBy || 'recent',
        rating: params.rating || '',
        ...params,
      },
    });
    return response.data;
  },

  // Add review for restaurant
  async addReview(restaurantId, reviewData) {
    const response = await api.post(`/restaurants/${restaurantId}/reviews`, reviewData);
    return response.data;
  },

  // Update review
  async updateReview(restaurantId, reviewId, reviewData) {
    const response = await api.put(`/restaurants/${restaurantId}/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  // Delete review
  async deleteReview(restaurantId, reviewId) {
    const response = await api.delete(`/restaurants/${restaurantId}/reviews/${reviewId}`);
    return response.data;
  },

  // Get review stats
  async getReviewStats(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/reviews/stats`);
    return response.data;
  },

  // Mark review as helpful
  async markReviewHelpful(restaurantId, reviewId) {
    const response = await api.patch(`/restaurants/${restaurantId}/reviews/${reviewId}/helpful`);
    return response.data;
  },

  // ============================================
  // RESTAURANT IMAGES & MEDIA
  // ============================================

  // Get restaurant images
  async getRestaurantImages(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/images`);
    return response.data;
  },

  // Upload restaurant image
  async uploadRestaurantImage(restaurantId, formData) {
    const response = await api.post(`/restaurants/${restaurantId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete restaurant image
  async deleteRestaurantImage(restaurantId, imageId) {
    const response = await api.delete(`/restaurants/${restaurantId}/images/${imageId}`);
    return response.data;
  },

  // ============================================
  // RESTAURANT AVAILABILITY
  // ============================================

  // Get restaurant opening hours
  async getOpeningHours(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/hours`);
    return response.data;
  },

  // Check if restaurant is open
  async isRestaurantOpen(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/is-open`);
    return response.data;
  },

  // Get delivery availability
  async getDeliveryAvailability(restaurantId, address = {}) {
    const response = await api.post(`/restaurants/${restaurantId}/delivery-availability`, address);
    return response.data;
  },

  // Get estimated delivery time
  async getEstimatedDeliveryTime(restaurantId, address = {}) {
    const response = await api.post(`/restaurants/${restaurantId}/delivery-time`, address);
    return response.data;
  },

  // ============================================
  // RESTAURANT FILTERS & CATEGORIES
  // ============================================

  // Get all restaurant categories
  async getRestaurantCategories() {
    const response = await api.get('/restaurants/categories');
    return response.data;
  },

  // Get all cuisines
  async getAllCuisines() {
    const response = await api.get('/restaurants/cuisines');
    return response.data;
  },

  // Get restaurant filters
  async getRestaurantFilters() {
    const response = await api.get('/restaurants/filters');
    return response.data;
  },

  // ============================================
  // RESTAURANT FAVORITES
  // ============================================

  // Add restaurant to favorites
  async addToFavorites(restaurantId) {
    const response = await api.post(`/restaurants/${restaurantId}/favorite`);
    return response.data;
  },

  // Remove restaurant from favorites
  async removeFromFavorites(restaurantId) {
    const response = await api.delete(`/restaurants/${restaurantId}/favorite`);
    return response.data;
  },

  // Get favorite restaurants
  async getFavoriteRestaurants(params = {}) {
    const response = await api.get('/restaurants/favorites', { params });
    return response.data;
  },

  // Check if restaurant is favorite
  async isFavorite(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/is-favorite`);
    return response.data;
  },

  // ============================================
  // RESTAURANT OFFERS & DISCOUNTS
  // ============================================

  // Get restaurant offers
  async getRestaurantOffers(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/offers`);
    return response.data;
  },

  // Get active offers
  async getActiveOffers(params = {}) {
    const response = await api.get('/restaurants/offers/active', { params });
    return response.data;
  },

  // Apply coupon
  async applyCoupon(restaurantId, couponCode) {
    const response = await api.post(`/restaurants/${restaurantId}/apply-coupon`, { couponCode });
    return response.data;
  },

  // ============================================
  // RESTAURANT STATISTICS (Admin only)
  // ============================================

  // Get restaurant statistics
  async getRestaurantStats(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/stats`);
    return response.data;
  },

  // Get restaurant analytics
  async getRestaurantAnalytics(restaurantId, period = 'month') {
    const response = await api.get(`/restaurants/${restaurantId}/analytics`, { 
      params: { period },
    });
    return response.data;
  },

  // ============================================
  // RESTAURANT ADMIN OPERATIONS
  // ============================================

  // Create restaurant (admin only)
  async createRestaurant(restaurantData) {
    const response = await api.post('/admin/restaurants', restaurantData);
    return response.data;
  },

  // Update restaurant (admin only)
  async updateRestaurant(restaurantId, restaurantData) {
    const response = await api.put(`/admin/restaurants/${restaurantId}`, restaurantData);
    return response.data;
  },

  // Delete restaurant (admin only)
  async deleteRestaurant(restaurantId) {
    const response = await api.delete(`/admin/restaurants/${restaurantId}`);
    return response.data;
  },

  // Update restaurant status (admin only)
  async updateRestaurantStatus(restaurantId, status) {
    const response = await api.patch(`/admin/restaurants/${restaurantId}/status`, { status });
    return response.data;
  },

  // Update restaurant menu (admin only)
  async updateMenu(restaurantId, menuData) {
    const response = await api.put(`/admin/restaurants/${restaurantId}/menu`, menuData);
    return response.data;
  },

  // Add menu item (admin only)
  async addMenuItem(restaurantId, itemData) {
    const response = await api.post(`/admin/restaurants/${restaurantId}/menu`, itemData);
    return response.data;
  },

  // Update menu item (admin only)
  async updateMenuItem(restaurantId, itemId, itemData) {
    const response = await api.put(`/admin/restaurants/${restaurantId}/menu/${itemId}`, itemData);
    return response.data;
  },

  // Delete menu item (admin only)
  async deleteMenuItem(restaurantId, itemId) {
    const response = await api.delete(`/admin/restaurants/${restaurantId}/menu/${itemId}`);
    return response.data;
  },

  // Update menu item availability (admin only)
  async updateMenuItemAvailability(restaurantId, itemId, isAvailable) {
    const response = await api.patch(`/admin/restaurants/${restaurantId}/menu/${itemId}/availability`, { 
      isAvailable,
    });
    return response.data;
  },

  // ============================================
  // RESTAURANT DELIVERY PARTNERS
  // ============================================

  // Get delivery partners for restaurant
  async getDeliveryPartners(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/delivery-partners`);
    return response.data;
  },

  // Assign delivery partner
  async assignDeliveryPartner(restaurantId, orderId, partnerId) {
    const response = await api.post(`/restaurants/${restaurantId}/assign-delivery`, {
      orderId,
      partnerId,
    });
    return response.data;
  },

  // ============================================
  // RESTAURANT NOTIFICATIONS
  // ============================================

  // Send notification to restaurant
  async sendNotification(restaurantId, notificationData) {
    const response = await api.post(`/restaurants/${restaurantId}/notify`, notificationData);
    return response.data;
  },

  // Get restaurant notifications
  async getNotifications(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/notifications`);
    return response.data;
  },

  // ============================================
  // RESTAURANT EXPORT
  // ============================================

  // Export restaurant data
  async exportRestaurantData(restaurantId, format = 'csv') {
    const response = await api.get(`/restaurants/${restaurantId}/export`, {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },

  // ============================================
  // RESTAURANT BULK OPERATIONS (Admin only)
  // ============================================

  // Bulk update restaurants
  async bulkUpdateRestaurants(restaurantIds, updateData) {
    const response = await api.patch('/admin/restaurants/bulk', {
      restaurantIds,
      ...updateData,
    });
    return response.data;
  },

  // Bulk delete restaurants
  async bulkDeleteRestaurants(restaurantIds) {
    const response = await api.delete('/admin/restaurants/bulk', {
      data: { restaurantIds },
    });
    return response.data;
  },

  // ============================================
  // RESTAURANT REPORTING
  // ============================================

  // Generate restaurant report
  async generateReport(restaurantId, reportType, dateRange) {
    const response = await api.post(`/restaurants/${restaurantId}/report`, {
      reportType,
      dateRange,
    });
    return response.data;
  },

  // Get restaurant sales report
  async getSalesReport(restaurantId, dateRange) {
    const response = await api.get(`/restaurants/${restaurantId}/sales-report`, {
      params: dateRange,
    });
    return response.data;
  },

  // ============================================
  // RESTAURANT SETTINGS
  // ============================================

  // Get restaurant settings
  async getRestaurantSettings(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/settings`);
    return response.data;
  },

  // Update restaurant settings
  async updateRestaurantSettings(restaurantId, settingsData) {
    const response = await api.put(`/restaurants/${restaurantId}/settings`, settingsData);
    return response.data;
  },

  // ============================================
  // RESTAURANT SOCIAL MEDIA
  // ============================================

  // Get restaurant social media links
  async getSocialLinks(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/social`);
    return response.data;
  },

  // Update social media links
  async updateSocialLinks(restaurantId, socialData) {
    const response = await api.put(`/restaurants/${restaurantId}/social`, socialData);
    return response.data;
  },
};

// ============================================
// NAMED EXPORTS FOR BACKWARDS COMPATIBILITY
// ============================================

// Create a safe wrapper for each exported function
const createNamedExport = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error(`Error in ${fn.name}:`, error);
      throw error;
    }
  };
};

export const getAllRestaurants = createNamedExport(restaurantService.getAllRestaurants.bind(restaurantService));
export const getFeaturedRestaurants = createNamedExport(restaurantService.getFeaturedRestaurants.bind(restaurantService));
export const getRestaurantById = createNamedExport(restaurantService.getRestaurantById.bind(restaurantService));
export const getRestaurantBySlug = createNamedExport(restaurantService.getRestaurantBySlug.bind(restaurantService));
export const searchRestaurants = createNamedExport(restaurantService.searchRestaurants.bind(restaurantService));
export const getRestaurantsByCategory = createNamedExport(restaurantService.getRestaurantsByCategory.bind(restaurantService));
export const getRestaurantsByCuisine = createNamedExport(restaurantService.getRestaurantsByCuisine.bind(restaurantService));
export const getNearbyRestaurants = createNamedExport(restaurantService.getNearbyRestaurants.bind(restaurantService));
export const getRestaurantMenu = createNamedExport(restaurantService.getRestaurantMenu.bind(restaurantService));
export const getMenuItem = createNamedExport(restaurantService.getMenuItem.bind(restaurantService));
export const getMenuCategories = createNamedExport(restaurantService.getMenuCategories.bind(restaurantService));
export const searchMenuItems = createNamedExport(restaurantService.searchMenuItems.bind(restaurantService));
export const getPopularItems = createNamedExport(restaurantService.getPopularItems.bind(restaurantService));
export const getRecommendedItems = createNamedExport(restaurantService.getRecommendedItems.bind(restaurantService));
export const getRestaurantReviews = createNamedExport(restaurantService.getRestaurantReviews.bind(restaurantService));
export const addReview = createNamedExport(restaurantService.addReview.bind(restaurantService));
export const updateReview = createNamedExport(restaurantService.updateReview.bind(restaurantService));
export const deleteReview = createNamedExport(restaurantService.deleteReview.bind(restaurantService));
export const getReviewStats = createNamedExport(restaurantService.getReviewStats.bind(restaurantService));
export const markReviewHelpful = createNamedExport(restaurantService.markReviewHelpful.bind(restaurantService));
export const getRestaurantImages = createNamedExport(restaurantService.getRestaurantImages.bind(restaurantService));
export const uploadRestaurantImage = createNamedExport(restaurantService.uploadRestaurantImage.bind(restaurantService));
export const deleteRestaurantImage = createNamedExport(restaurantService.deleteRestaurantImage.bind(restaurantService));
export const getOpeningHours = createNamedExport(restaurantService.getOpeningHours.bind(restaurantService));
export const isRestaurantOpen = createNamedExport(restaurantService.isRestaurantOpen.bind(restaurantService));
export const getDeliveryAvailability = createNamedExport(restaurantService.getDeliveryAvailability.bind(restaurantService));
export const getEstimatedDeliveryTime = createNamedExport(restaurantService.getEstimatedDeliveryTime.bind(restaurantService));
export const getRestaurantCategories = createNamedExport(restaurantService.getRestaurantCategories.bind(restaurantService));
export const getAllCuisines = createNamedExport(restaurantService.getAllCuisines.bind(restaurantService));
export const getRestaurantFilters = createNamedExport(restaurantService.getRestaurantFilters.bind(restaurantService));
export const addToFavorites = createNamedExport(restaurantService.addToFavorites.bind(restaurantService));
export const removeFromFavorites = createNamedExport(restaurantService.removeFromFavorites.bind(restaurantService));
export const getFavoriteRestaurants = createNamedExport(restaurantService.getFavoriteRestaurants.bind(restaurantService));
export const isFavorite = createNamedExport(restaurantService.isFavorite.bind(restaurantService));
export const getRestaurantOffers = createNamedExport(restaurantService.getRestaurantOffers.bind(restaurantService));
export const getActiveOffers = createNamedExport(restaurantService.getActiveOffers.bind(restaurantService));
export const applyCoupon = createNamedExport(restaurantService.applyCoupon.bind(restaurantService));

// Admin exports
export const createRestaurant = createNamedExport(restaurantService.createRestaurant.bind(restaurantService));
export const updateRestaurant = createNamedExport(restaurantService.updateRestaurant.bind(restaurantService));
export const deleteRestaurant = createNamedExport(restaurantService.deleteRestaurant.bind(restaurantService));
export const updateRestaurantStatus = createNamedExport(restaurantService.updateRestaurantStatus.bind(restaurantService));
export const updateMenu = createNamedExport(restaurantService.updateMenu.bind(restaurantService));
export const addMenuItem = createNamedExport(restaurantService.addMenuItem.bind(restaurantService));
export const updateMenuItem = createNamedExport(restaurantService.updateMenuItem.bind(restaurantService));
export const deleteMenuItem = createNamedExport(restaurantService.deleteMenuItem.bind(restaurantService));
export const updateMenuItemAvailability = createNamedExport(restaurantService.updateMenuItemAvailability.bind(restaurantService));

// ============================================
// DEFAULT EXPORT
// ============================================

export default restaurantService;