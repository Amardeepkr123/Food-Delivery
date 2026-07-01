import api from './api';

export const orderService = {
  async createOrder(orderData) {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async getOrders(params) {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  async getOrderById(id) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(id, status) {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  async cancelOrder(id) {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },

  async getOrderHistory() {
    const response = await api.get('/orders/history');
    return response.data;
  },

  async trackOrder(orderId) {
    const response = await api.get(`/orders/${orderId}/track`);
    return response.data;
  },
};

export default orderService;