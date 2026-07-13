// src/context/OrderContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const OrderContext = createContext();

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);
  const [liveTracking, setLiveTracking] = useState(null);

  // Fetch user orders
  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await orderService.getUserOrders(user.id);
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // Create new order
  const createOrder = async (orderData) => {
    setLoading(true);
    try {
      const response = await orderService.createOrder(orderData);
      const newOrder = response.data;
      setCurrentOrder(newOrder);
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(error.response?.data?.message || 'Failed to create order');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get order details
  const getOrderDetails = async (orderId) => {
    setLoading(true);
    try {
      const response = await orderService.getOrder(orderId);
      setCurrentOrder(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order details');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await orderService.updateOrderStatus(orderId, status);
      const updatedOrder = response.data;
      
      // Update orders list
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? updatedOrder : order
        )
      );
      
      if (currentOrder?.id === orderId) {
        setCurrentOrder(updatedOrder);
        setOrderStatus(status);
      }
      
      return updatedOrder;
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
      throw error;
    }
  };

  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      await orderService.cancelOrder(orderId);
      toast.success('Order cancelled successfully');
      await fetchOrders();
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
      throw error;
    }
  };

  // Get live tracking
  const getLiveTracking = async (orderId) => {
    try {
      const response = await orderService.getTracking(orderId);
      setLiveTracking(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching tracking:', error);
      throw error;
    }
  };

  // Subscribe to order status updates (WebSocket)
  const subscribeToOrderUpdates = (orderId, callback) => {
    // Implement WebSocket subscription
    // This will be handled by SocketContext
  };

  // Get order status history
  const getStatusHistory = async (orderId) => {
    try {
      const response = await orderService.getStatusHistory(orderId);
      setStatusHistory(response.data || []);
      return response.data;
    } catch (error) {
      console.error('Error fetching status history:', error);
      throw error;
    }
  };

  // Rate order
  const rateOrder = async (orderId, rating, review) => {
    try {
      await orderService.rateOrder(orderId, { rating, review });
      toast.success('Thank you for your feedback!');
      await fetchOrders();
    } catch (error) {
      console.error('Error rating order:', error);
      toast.error('Failed to submit rating');
      throw error;
    }
  };

  // Reorder
  const reorder = async (orderId) => {
    try {
      const response = await orderService.reorder(orderId);
      toast.success('Items added to cart');
      return response.data;
    } catch (error) {
      console.error('Error reordering:', error);
      toast.error('Failed to reorder');
      throw error;
    }
  };

  // Initial load
  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const value = {
    orders,
    currentOrder,
    loading,
    orderStatus,
    statusHistory,
    liveTracking,
    fetchOrders,
    createOrder,
    getOrderDetails,
    updateOrderStatus,
    cancelOrder,
    getLiveTracking,
    subscribeToOrderUpdates,
    getStatusHistory,
    rateOrder,
    reorder,
    setCurrentOrder,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};