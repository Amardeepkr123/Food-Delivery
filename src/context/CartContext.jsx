import React, { createContext, useState, useContext, useEffect } from 'react';
import { storage } from '../utils/storage';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const savedCart = storage.get('cart');
    if (savedCart) {
      setCartItems(savedCart);
      calculateTotals(savedCart);
    }
  }, []);

  useEffect(() => {
    storage.set('cart', cartItems);
    calculateTotals(cartItems);
  }, [cartItems]);

  const calculateTotals = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setTotalAmount(total);
    setItemCount(count);
  };

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        const updated = prev.map(i => 
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
        toast.info('Item quantity updated');
        return updated;
      }
      toast.success('Added to cart! 🛒');
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.info('Removed from cart');
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const deliveryFee = subtotal > 0 ? 3.99 : 0;
    const tax = subtotal * 0.08;
    return subtotal + deliveryFee + tax;
  };

  const value = {
    cartItems,
    totalAmount,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    getTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;