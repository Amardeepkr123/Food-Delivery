import api from './api';

export const foodService = {
  // Get all foods
  async getAllFoods(params) {
    const response = await api.get('/foods', { params });
    return response.data;
  },

  // Get popular foods
  async getPopularFoods() {
    const response = await api.get('/foods/popular');
    return response.data;
  },

  // Get food by ID
  async getFoodById(id) {
    const response = await api.get(`/foods/${id}`);
    return response.data;
  },

  // Search foods
  async searchFoods(query) {
    const response = await api.get('/foods/search', { params: { q: query } });
    return response.data;
  },

  // Get foods by category
  async getFoodsByCategory(categoryId) {
    const response = await api.get(`/foods/category/${categoryId}`);
    return response.data;
  },

  // Get categories
  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get featured foods
  async getFeaturedFoods() {
    const response = await api.get('/foods/featured');
    return response.data;
  },

  // Add to cart
  async addToCart(foodId, quantity) {
    const response = await api.post('/cart', { foodId, quantity });
    return response.data;
  },
};

// Also export individual functions for named imports
export const getAllFoods = foodService.getAllFoods;
export const getPopularFoods = foodService.getPopularFoods;
export const getFoodById = foodService.getFoodById;
export const searchFoods = foodService.searchFoods;
export const getFoodsByCategory = foodService.getFoodsByCategory;
export const getCategories = foodService.getCategories;
export const getFeaturedFoods = foodService.getFeaturedFoods;
export const addToCart = foodService.addToCart;

export default foodService;