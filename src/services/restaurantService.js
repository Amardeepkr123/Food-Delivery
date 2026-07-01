import api from './api';

export const restaurantService = {
  // Get all restaurants
  async getAllRestaurants(params) {
    const response = await api.get('/restaurants', { params });
    return response.data;
  },

  // Get featured restaurants
  async getFeaturedRestaurants() {
    const response = await api.get('/restaurants/featured');
    return response.data;
  },

  // Get restaurant by ID
  async getRestaurantById(id) {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },

  // Search restaurants
  async searchRestaurants(query) {
    const response = await api.get('/restaurants/search', { params: { q: query } });
    return response.data;
  },

  // Get restaurants by category
  async getRestaurantsByCategory(categoryId) {
    const response = await api.get(`/restaurants/category/${categoryId}`);
    return response.data;
  },

  // Get restaurant menu
  async getRestaurantMenu(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/menu`);
    return response.data;
  },

  // Add review
  async addReview(restaurantId, reviewData) {
    const response = await api.post(`/restaurants/${restaurantId}/reviews`, reviewData);
    return response.data;
  },

  // Get restaurant reviews
  async getRestaurantReviews(restaurantId) {
    const response = await api.get(`/restaurants/${restaurantId}/reviews`);
    return response.data;
  },
};

// Also export individual functions for named imports
export const getAllRestaurants = restaurantService.getAllRestaurants;
export const getFeaturedRestaurants = restaurantService.getFeaturedRestaurants;
export const getRestaurantById = restaurantService.getRestaurantById;
export const searchRestaurants = restaurantService.searchRestaurants;
export const getRestaurantsByCategory = restaurantService.getRestaurantsByCategory;
export const getRestaurantMenu = restaurantService.getRestaurantMenu;
export const addReview = restaurantService.addReview;
export const getRestaurantReviews = restaurantService.getRestaurantReviews;

export default restaurantService;