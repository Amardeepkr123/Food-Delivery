// src/services/trackingService.js
import api from './api';

export const trackingService = {
  // ============================================
  // ORDER TRACKING
  // ============================================

  // Get order tracking details
  async getOrderTracking(orderId) {
    const response = await api.get(`/tracking/order/${orderId}`);
    return response.data;
  },

  // Get live tracking for order
  async getLiveTracking(orderId) {
    const response = await api.get(`/tracking/order/${orderId}/live`);
    return response.data;
  },

  // Update order location (delivery partner)
  async updateOrderLocation(orderId, locationData) {
    const response = await api.patch(`/tracking/order/${orderId}/location`, locationData);
    return response.data;
  },

  // Get order status history
  async getOrderStatusHistory(orderId) {
    const response = await api.get(`/tracking/order/${orderId}/status-history`);
    return response.data;
  },

  // Get order timeline
  async getOrderTimeline(orderId) {
    const response = await api.get(`/tracking/order/${orderId}/timeline`);
    return response.data;
  },

  // ============================================
  // DELIVERY PARTNER TRACKING
  // ============================================

  // Get delivery partner location
  async getDeliveryPartnerLocation(partnerId) {
    const response = await api.get(`/tracking/partner/${partnerId}/location`);
    return response.data;
  },

  // Update delivery partner location
  async updateDeliveryPartnerLocation(partnerId, locationData) {
    const response = await api.patch(`/tracking/partner/${partnerId}/location`, locationData);
    return response.data;
  },

  // Get delivery partner route
  async getDeliveryPartnerRoute(partnerId, orderId) {
    const response = await api.get(`/tracking/partner/${partnerId}/route/${orderId}`);
    return response.data;
  },

  // Get delivery partner status
  async getDeliveryPartnerStatus(partnerId) {
    const response = await api.get(`/tracking/partner/${partnerId}/status`);
    return response.data;
  },

  // Get delivery partner history
  async getDeliveryPartnerHistory(partnerId, params = {}) {
    const response = await api.get(`/tracking/partner/${partnerId}/history`, { params });
    return response.data;
  },

  // ============================================
  // REAL-TIME TRACKING (WebSocket/Socket.io)
  // ============================================

  // Subscribe to order tracking updates
  subscribeToOrderTracking(orderId, callback) {
    // This would typically use WebSocket or Socket.io
    // Implemented in the socket context
    // For now, we'll return a mock subscription
    return {
      unsubscribe: () => {},
    };
  },

  // Subscribe to delivery partner location updates
  subscribeToPartnerLocation(partnerId, callback) {
    return {
      unsubscribe: () => {},
    };
  },

  // Subscribe to multiple order tracking
  subscribeToMultipleOrders(orderIds, callback) {
    return {
      unsubscribe: () => {},
    };
  },

  // ============================================
  // GEOCODING & MAP SERVICES
  // ============================================

  // Geocode address (convert address to coordinates)
  async geocodeAddress(address) {
    const response = await api.post('/tracking/geocode', { address });
    return response.data;
  },

  // Reverse geocode (convert coordinates to address)
  async reverseGeocode(lat, lng) {
    const response = await api.get('/tracking/reverse-geocode', { params: { lat, lng } });
    return response.data;
  },

  // Get distance between two locations
  async getDistance(origin, destination) {
    const response = await api.post('/tracking/distance', { origin, destination });
    return response.data;
  },

  // Get travel time between locations
  async getTravelTime(origin, destination) {
    const response = await api.post('/tracking/travel-time', { origin, destination });
    return response.data;
  },

  // Get route between locations
  async getRoute(origin, destination, waypoints = []) {
    const response = await api.post('/tracking/route', { origin, destination, waypoints });
    return response.data;
  },

  // Get nearby locations
  async getNearbyLocations(lat, lng, radius = 5, type = 'restaurant') {
    const response = await api.get('/tracking/nearby', { 
      params: { lat, lng, radius, type },
    });
    return response.data;
  },

  // ============================================
  // ORDER DELIVERY ZONES
  // ============================================

  // Get delivery zone for address
  async getDeliveryZone(address) {
    const response = await api.post('/tracking/delivery-zone', { address });
    return response.data;
  },

  // Check if address is in delivery zone
  async isInDeliveryZone(lat, lng, restaurantId) {
    const response = await api.get('/tracking/in-delivery-zone', { 
      params: { lat, lng, restaurantId },
    });
    return response.data;
  },

  // Get all delivery zones for restaurant
  async getRestaurantDeliveryZones(restaurantId) {
    const response = await api.get(`/tracking/restaurant/${restaurantId}/delivery-zones`);
    return response.data;
  },

  // ============================================
  // ETA (Estimated Time of Arrival)
  // ============================================

  // Get ETA for order
  async getOrderETA(orderId) {
    const response = await api.get(`/tracking/order/${orderId}/eta`);
    return response.data;
  },

  // Get ETA for delivery
  async getDeliveryETA(origin, destination, traffic = true) {
    const response = await api.post('/tracking/eta', { origin, destination, traffic });
    return response.data;
  },

  // Update ETA for order
  async updateOrderETA(orderId, etaData) {
    const response = await api.patch(`/tracking/order/${orderId}/eta`, etaData);
    return response.data;
  },

  // ============================================
  // CUSTOMER TRACKING
  // ============================================

  // Get customer location
  async getCustomerLocation(customerId) {
    const response = await api.get(`/tracking/customer/${customerId}/location`);
    return response.data;
  },

  // Update customer location (for delivery)
  async updateCustomerLocation(customerId, locationData) {
    const response = await api.patch(`/tracking/customer/${customerId}/location`, locationData);
    return response.data;
  },

  // Get customer's order history with tracking
  async getCustomerOrderTracking(customerId, params = {}) {
    const response = await api.get(`/tracking/customer/${customerId}/orders`, { params });
    return response.data;
  },

  // ============================================
  // RESTAURANT TRACKING
  // ============================================

  // Get restaurant location
  async getRestaurantLocation(restaurantId) {
    const response = await api.get(`/tracking/restaurant/${restaurantId}/location`);
    return response.data;
  },

  // Get all active orders for restaurant with tracking
  async getRestaurantActiveOrders(restaurantId) {
    const response = await api.get(`/tracking/restaurant/${restaurantId}/active-orders`);
    return response.data;
  },

  // Get restaurant delivery stats
  async getRestaurantDeliveryStats(restaurantId, period = 'today') {
    const response = await api.get(`/tracking/restaurant/${restaurantId}/stats`, { 
      params: { period },
    });
    return response.data;
  },

  // ============================================
  // ADMIN TRACKING
  // ============================================

  // Get all active deliveries (admin only)
  async getActiveDeliveries(params = {}) {
    const response = await api.get('/tracking/admin/active-deliveries', { params });
    return response.data;
  },

  // Get delivery analytics (admin only)
  async getDeliveryAnalytics(params = {}) {
    const response = await api.get('/tracking/admin/analytics', { params });
    return response.data;
  },

  // Get delivery performance metrics (admin only)
  async getDeliveryPerformance(params = {}) {
    const response = await api.get('/tracking/admin/performance', { params });
    return response.data;
  },

  // Get delivery partner performance (admin only)
  async getPartnerPerformance(partnerId, params = {}) {
    const response = await api.get(`/tracking/admin/partner/${partnerId}/performance`, { params });
    return response.data;
  },

  // ============================================
  // TRACKING ALERTS & NOTIFICATIONS
  // ============================================

  // Create tracking alert
  async createAlert(alertData) {
    const response = await api.post('/tracking/alerts', alertData);
    return response.data;
  },

  // Get tracking alerts
  async getAlerts(params = {}) {
    const response = await api.get('/tracking/alerts', { params });
    return response.data;
  },

  // Mark alert as read
  async markAlertAsRead(alertId) {
    const response = await api.patch(`/tracking/alerts/${alertId}/read`);
    return response.data;
  },

  // Delete alert
  async deleteAlert(alertId) {
    const response = await api.delete(`/tracking/alerts/${alertId}`);
    return response.data;
  },

  // ============================================
  // LOCATION HISTORY
  // ============================================

  // Get location history for delivery partner
  async getPartnerLocationHistory(partnerId, params = {}) {
    const response = await api.get(`/tracking/partner/${partnerId}/location-history`, { params });
    return response.data;
  },

  // Get order location history
  async getOrderLocationHistory(orderId) {
    const response = await api.get(`/tracking/order/${orderId}/location-history`);
    return response.data;
  },

  // Get customer location history
  async getCustomerLocationHistory(customerId, params = {}) {
    const response = await api.get(`/tracking/customer/${customerId}/location-history`, { params });
    return response.data;
  },

  // ============================================
  // LIVE MAP DATA
  // ============================================

  // Get live map data for order
  async getLiveMapData(orderId) {
    const response = await api.get(`/tracking/order/${orderId}/map-data`);
    return response.data;
  },

  // Get all live orders on map (admin only)
  async getAllLiveOrders(params = {}) {
    const response = await api.get('/tracking/live-orders', { params });
    return response.data;
  },

  // Get map markers for delivery partners
  async getDeliveryPartnerMarkers(params = {}) {
    const response = await api.get('/tracking/partner-markers', { params });
    return response.data;
  },

  // ============================================
  // ADDRESS AUTOCOMPLETE
  // ============================================

  // Get address suggestions
  async getAddressSuggestions(query, params = {}) {
    const response = await api.get('/tracking/address-suggestions', { 
      params: { q: query, ...params },
    });
    return response.data;
  },

  // Get place details
  async getPlaceDetails(placeId) {
    const response = await api.get(`/tracking/place/${placeId}`);
    return response.data;
  },

  // ============================================
  // DELIVERY OPTIMIZATION
  // ============================================

  // Get optimized delivery route
  async getOptimizedRoute(orders, params = {}) {
    const response = await api.post('/tracking/optimize-route', { orders, ...params });
    return response.data;
  },

  // Get delivery capacity
  async getDeliveryCapacity(params = {}) {
    const response = await api.get('/tracking/delivery-capacity', { params });
    return response.data;
  },

  // Optimize delivery assignment
  async optimizeDeliveryAssignment(orders, partners) {
    const response = await api.post('/tracking/optimize-assignment', { orders, partners });
    return response.data;
  },

  // ============================================
  // TRACKING ANALYTICS
  // ============================================

  // Get tracking analytics for order
  async getOrderTrackingAnalytics(orderId) {
    const response = await api.get(`/tracking/order/${orderId}/analytics`);
    return response.data;
  },

  // Get delivery time analytics
  async getDeliveryTimeAnalytics(params = {}) {
    const response = await api.get('/tracking/delivery-time-analytics', { params });
    return response.data;
  },

  // Get customer tracking analytics
  async getCustomerTrackingAnalytics(customerId, params = {}) {
    const response = await api.get(`/tracking/customer/${customerId}/analytics`, { params });
    return response.data;
  },

  // ============================================
  // WEBHOOKS & CALLBACKS
  // ============================================

  // Register tracking webhook
  async registerWebhook(webhookData) {
    const response = await api.post('/tracking/webhooks', webhookData);
    return response.data;
  },

  // Get registered webhooks
  async getWebhooks() {
    const response = await api.get('/tracking/webhooks');
    return response.data;
  },

  // Delete webhook
  async deleteWebhook(webhookId) {
    const response = await api.delete(`/tracking/webhooks/${webhookId}`);
    return response.data;
  },

  // ============================================
  // GEO FENCING
  // ============================================

  // Create geofence
  async createGeofence(geofenceData) {
    const response = await api.post('/tracking/geofences', geofenceData);
    return response.data;
  },

  // Get geofences
  async getGeofences(params = {}) {
    const response = await api.get('/tracking/geofences', { params });
    return response.data;
  },

  // Update geofence
  async updateGeofence(geofenceId, geofenceData) {
    const response = await api.put(`/tracking/geofences/${geofenceId}`, geofenceData);
    return response.data;
  },

  // Delete geofence
  async deleteGeofence(geofenceId) {
    const response = await api.delete(`/tracking/geofences/${geofenceId}`);
    return response.data;
  },

  // Check if location is in geofence
  async checkInGeofence(lat, lng, geofenceId) {
    const response = await api.get('/tracking/geofences/check', { 
      params: { lat, lng, geofenceId },
    });
    return response.data;
  },

  // ============================================
  // TRACKING EXPORTS
  // ============================================

  // Export tracking data
  async exportTrackingData(params = {}) {
    const response = await api.get('/tracking/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },

  // Export delivery report
  async exportDeliveryReport(params = {}) {
    const response = await api.get('/tracking/export/delivery-report', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },

  // ============================================
  // TRACKING SETTINGS
  // ============================================

  // Get tracking settings
  async getTrackingSettings() {
    const response = await api.get('/tracking/settings');
    return response.data;
  },

  // Update tracking settings (admin only)
  async updateTrackingSettings(settingsData) {
    const response = await api.put('/tracking/settings', settingsData);
    return response.data;
  },

  // Get delivery settings
  async getDeliverySettings() {
    const response = await api.get('/tracking/delivery-settings');
    return response.data;
  },

  // Update delivery settings (admin only)
  async updateDeliverySettings(settingsData) {
    const response = await api.put('/tracking/delivery-settings', settingsData);
    return response.data;
  },
};

// ============================================
// NAMED EXPORTS FOR BACKWARDS COMPATIBILITY
// ============================================

export const getOrderTracking = trackingService.getOrderTracking.bind(trackingService);
export const getLiveTracking = trackingService.getLiveTracking.bind(trackingService);
export const updateOrderLocation = trackingService.updateOrderLocation.bind(trackingService);
export const getOrderStatusHistory = trackingService.getOrderStatusHistory.bind(trackingService);
export const getOrderTimeline = trackingService.getOrderTimeline.bind(trackingService);
export const getDeliveryPartnerLocation = trackingService.getDeliveryPartnerLocation.bind(trackingService);
export const updateDeliveryPartnerLocation = trackingService.updateDeliveryPartnerLocation.bind(trackingService);
export const getDeliveryPartnerRoute = trackingService.getDeliveryPartnerRoute.bind(trackingService);
export const getDeliveryPartnerStatus = trackingService.getDeliveryPartnerStatus.bind(trackingService);
export const getDeliveryPartnerHistory = trackingService.getDeliveryPartnerHistory.bind(trackingService);
export const subscribeToOrderTracking = trackingService.subscribeToOrderTracking.bind(trackingService);
export const subscribeToPartnerLocation = trackingService.subscribeToPartnerLocation.bind(trackingService);
export const geocodeAddress = trackingService.geocodeAddress.bind(trackingService);
export const reverseGeocode = trackingService.reverseGeocode.bind(trackingService);
export const getDistance = trackingService.getDistance.bind(trackingService);
export const getTravelTime = trackingService.getTravelTime.bind(trackingService);
export const getRoute = trackingService.getRoute.bind(trackingService);
export const getNearbyLocations = trackingService.getNearbyLocations.bind(trackingService);
export const getDeliveryZone = trackingService.getDeliveryZone.bind(trackingService);
export const isInDeliveryZone = trackingService.isInDeliveryZone.bind(trackingService);
export const getRestaurantDeliveryZones = trackingService.getRestaurantDeliveryZones.bind(trackingService);
export const getOrderETA = trackingService.getOrderETA.bind(trackingService);
export const getDeliveryETA = trackingService.getDeliveryETA.bind(trackingService);
export const updateOrderETA = trackingService.updateOrderETA.bind(trackingService);
export const getCustomerLocation = trackingService.getCustomerLocation.bind(trackingService);
export const updateCustomerLocation = trackingService.updateCustomerLocation.bind(trackingService);
export const getCustomerOrderTracking = trackingService.getCustomerOrderTracking.bind(trackingService);
export const getRestaurantLocation = trackingService.getRestaurantLocation.bind(trackingService);
export const getRestaurantActiveOrders = trackingService.getRestaurantActiveOrders.bind(trackingService);
export const getRestaurantDeliveryStats = trackingService.getRestaurantDeliveryStats.bind(trackingService);
export const getActiveDeliveries = trackingService.getActiveDeliveries.bind(trackingService);
export const getDeliveryAnalytics = trackingService.getDeliveryAnalytics.bind(trackingService);
export const getDeliveryPerformance = trackingService.getDeliveryPerformance.bind(trackingService);
export const getPartnerPerformance = trackingService.getPartnerPerformance.bind(trackingService);
export const createAlert = trackingService.createAlert.bind(trackingService);
export const getAlerts = trackingService.getAlerts.bind(trackingService);
export const markAlertAsRead = trackingService.markAlertAsRead.bind(trackingService);
export const deleteAlert = trackingService.deleteAlert.bind(trackingService);
export const getPartnerLocationHistory = trackingService.getPartnerLocationHistory.bind(trackingService);
export const getOrderLocationHistory = trackingService.getOrderLocationHistory.bind(trackingService);
export const getCustomerLocationHistory = trackingService.getCustomerLocationHistory.bind(trackingService);
export const getLiveMapData = trackingService.getLiveMapData.bind(trackingService);
export const getAllLiveOrders = trackingService.getAllLiveOrders.bind(trackingService);
export const getDeliveryPartnerMarkers = trackingService.getDeliveryPartnerMarkers.bind(trackingService);
export const getAddressSuggestions = trackingService.getAddressSuggestions.bind(trackingService);
export const getPlaceDetails = trackingService.getPlaceDetails.bind(trackingService);
export const getOptimizedRoute = trackingService.getOptimizedRoute.bind(trackingService);
export const getDeliveryCapacity = trackingService.getDeliveryCapacity.bind(trackingService);
export const optimizeDeliveryAssignment = trackingService.optimizeDeliveryAssignment.bind(trackingService);
export const getOrderTrackingAnalytics = trackingService.getOrderTrackingAnalytics.bind(trackingService);
export const getDeliveryTimeAnalytics = trackingService.getDeliveryTimeAnalytics.bind(trackingService);
export const getCustomerTrackingAnalytics = trackingService.getCustomerTrackingAnalytics.bind(trackingService);
export const registerWebhook = trackingService.registerWebhook.bind(trackingService);
export const getWebhooks = trackingService.getWebhooks.bind(trackingService);
export const deleteWebhook = trackingService.deleteWebhook.bind(trackingService);
export const createGeofence = trackingService.createGeofence.bind(trackingService);
export const getGeofences = trackingService.getGeofences.bind(trackingService);
export const updateGeofence = trackingService.updateGeofence.bind(trackingService);
export const deleteGeofence = trackingService.deleteGeofence.bind(trackingService);
export const checkInGeofence = trackingService.checkInGeofence.bind(trackingService);
export const exportTrackingData = trackingService.exportTrackingData.bind(trackingService);
export const exportDeliveryReport = trackingService.exportDeliveryReport.bind(trackingService);
export const getTrackingSettings = trackingService.getTrackingSettings.bind(trackingService);
export const updateTrackingSettings = trackingService.updateTrackingSettings.bind(trackingService);
export const getDeliverySettings = trackingService.getDeliverySettings.bind(trackingService);
export const updateDeliverySettings = trackingService.updateDeliverySettings.bind(trackingService);

export default trackingService;