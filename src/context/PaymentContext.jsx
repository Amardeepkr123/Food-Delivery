// src/context/PaymentContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { paymentService } from '../services/paymentService';
import { toast } from 'react-toastify';

const PaymentContext = createContext();

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext must be used within PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, failed
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  // Process payment
  const processPayment = async (paymentDetails) => {
    setLoading(true);
    setPaymentStatus('processing');
    
    try {
      const response = await paymentService.processPayment(paymentDetails);
      
      if (response.success) {
        setPaymentStatus('success');
        setTransactionId(response.transactionId);
        setPaymentData(response.data);
        toast.success('Payment successful!');
        return { success: true, data: response.data };
      } else {
        setPaymentStatus('failed');
        toast.error(response.message || 'Payment failed');
        return { success: false, error: response.message };
      }
    } catch (error) {
      setPaymentStatus('failed');
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || 'Payment processing failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Validate payment method
  const validatePaymentMethod = (method, data) => {
    switch (method) {
      case 'upi':
        return validateUPI(data);
      case 'card':
        return validateCard(data);
      case 'wallet':
        return validateWallet(data);
      case 'netbanking':
        return validateNetBanking(data);
      case 'cod':
        return { valid: true };
      default:
        return { valid: false, error: 'Invalid payment method' };
    }
  };

  // UPI Validation
  const validateUPI = (data) => {
    if (!data.upiId) {
      return { valid: false, error: 'UPI ID is required' };
    }
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    if (!upiRegex.test(data.upiId)) {
      return { valid: false, error: 'Invalid UPI ID format (e.g., name@upi)' };
    }
    return { valid: true };
  };

  // Card Validation
  const validateCard = (data) => {
    if (!data.cardNumber) {
      return { valid: false, error: 'Card number is required' };
    }
    const cardRegex = /^[0-9\s]{16,19}$/;
    if (!cardRegex.test(data.cardNumber.replace(/\s/g, ''))) {
      return { valid: false, error: 'Invalid card number' };
    }
    if (!data.cardName || data.cardName.length < 2) {
      return { valid: false, error: 'Cardholder name is required' };
    }
    if (!data.cardExpiry) {
      return { valid: false, error: 'Expiry date is required' };
    }
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(data.cardExpiry)) {
      return { valid: false, error: 'Invalid expiry date (MM/YY)' };
    }
    if (!data.cardCvv || !/^[0-9]{3,4}$/.test(data.cardCvv)) {
      return { valid: false, error: 'Invalid CVV' };
    }
    return { valid: true };
  };

  // Wallet Validation
  const validateWallet = (data) => {
    if (!data.walletPin) {
      return { valid: false, error: 'Wallet PIN is required' };
    }
    if (!/^[0-9]{4}$/.test(data.walletPin)) {
      return { valid: false, error: 'Invalid wallet PIN (4 digits required)' };
    }
    return { valid: true };
  };

  // Net Banking Validation
  const validateNetBanking = (data) => {
    if (!data.bankName) {
      return { valid: false, error: 'Please select a bank' };
    }
    return { valid: true };
  };

  // Reset payment state
  const resetPayment = () => {
    setSelectedMethod(null);
    setPaymentStatus('idle');
    setPaymentData(null);
    setTransactionId(null);
    setLoading(false);
  };

  const value = {
    selectedMethod,
    setSelectedMethod,
    paymentStatus,
    paymentData,
    loading,
    transactionId,
    processPayment,
    validatePaymentMethod,
    resetPayment,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};