// src/pages/orders/Invoice.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiDownload,
  FiPrinter,
  FiShare2,
  FiFileText,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiMapPin,
  FiPackage,
  FiCreditCard,
  FiCheckCircle,
} from 'react-icons/fi';
import MainLayout from '../../layouts/MainLayout';
import { toast } from 'react-hot-toast';

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockInvoice = {
          id: 'INV-2024-001',
          orderId: 'ORD-2024-001',
          date: '2024-01-15',
          restaurant: {
            name: 'Pizza Palace',
            address: '123, Marine Drive, Mumbai - 400001',
            phone: '+91 98765 43211',
            email: 'info@pizzapalace.com',
            gst: 'GST123456789',
          },
          customer: {
            name: 'Amit Kumar',
            address: '456, Connaught Place, Delhi - 110001',
            phone: '+91 98765 43210',
            email: 'amit@example.com',
          },
          items: [
            { name: 'Margherita Pizza', quantity: 2, price: 16.99 },
            { name: 'Garlic Bread', quantity: 1, price: 4.99 },
            { name: 'Coca-Cola', quantity: 2, price: 2.49 },
          ],
          subtotal: 46.94,
          deliveryFee: 2.99,
          platformFee: 1.99,
          gst: 2.35,
          discount: 5.00,
          total: 49.27,
          paymentMethod: 'Credit Card',
          paymentStatus: 'Paid',
          transactionId: 'TXN-2024-001',
        };

        setInvoice(mockInvoice);
      } catch (error) {
        toast.error('Failed to load invoice');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success('Invoice downloaded! 📄');
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard?.writeText(`${window.location.origin}/invoice/${id}`);
      toast.success('Link copied to clipboard! 📋');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-spin" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-red-500 border-r-orange-500 border-b-purple-500 border-l-transparent animate-spin" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium animate-pulse">
              Loading invoice...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!invoice) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">😅</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Invoice Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">The invoice you're looking for doesn't exist.</p>
            <Link to="/orders">
              <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all">
                View Orders
              </button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Invoice
            </h1>
          </div>
          <div className="flex gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiPrinter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiDownload className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl glass-card hover:shadow-2xl transition-all duration-300"
            >
              <FiShare2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 md:p-12"
          id="invoice-content"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-3xl font-bold text-orange-500">INVOICE</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">#{invoice.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {invoice.restaurant.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{invoice.restaurant.address}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{invoice.restaurant.phone}</p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Bill To</h4>
              <p className="text-gray-800 dark:text-white">{invoice.customer.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.customer.address}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.customer.phone}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.customer.email}</p>
            </div>
            <div className="text-right md:text-left">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Order ID</span>
                <span className="font-medium text-gray-800 dark:text-white">{invoice.orderId}</span>
                <span className="text-gray-500 dark:text-gray-400">Date</span>
                <span className="font-medium text-gray-800 dark:text-white">{invoice.date}</span>
                <span className="text-gray-500 dark:text-gray-400">Payment</span>
                <span className="font-medium text-green-600 dark:text-green-400">{invoice.paymentStatus}</span>
                <span className="text-gray-500 dark:text-gray-400">Transaction</span>
                <span className="font-medium text-gray-800 dark:text-white">{invoice.transactionId}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Item</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Quantity</th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Price</th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-white">{item.name}</td>
                    <td className="px-4 py-2 text-center text-sm text-gray-600 dark:text-gray-300">{item.quantity}</td>
                    <td className="px-4 py-2 text-right text-sm text-gray-600 dark:text-gray-300">${item.price}</td>
                    <td className="px-4 py-2 text-right text-sm font-medium text-gray-800 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-gray-200 dark:border-gray-700">
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-right text-sm text-gray-600 dark:text-gray-300">Subtotal</td>
                  <td className="px-4 py-2 text-right text-sm text-gray-800 dark:text-white">${invoice.subtotal}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-right text-sm text-gray-600 dark:text-gray-300">Delivery Fee</td>
                  <td className="px-4 py-2 text-right text-sm text-gray-800 dark:text-white">${invoice.deliveryFee}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-right text-sm text-gray-600 dark:text-gray-300">Platform Fee</td>
                  <td className="px-4 py-2 text-right text-sm text-gray-800 dark:text-white">${invoice.platformFee}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-right text-sm text-gray-600 dark:text-gray-300">GST</td>
                  <td className="px-4 py-2 text-right text-sm text-gray-800 dark:text-white">${invoice.gst}</td>
                </tr>
                {invoice.discount > 0 && (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-right text-sm text-green-600">Discount</td>
                    <td className="px-4 py-2 text-right text-sm text-green-600">-${invoice.discount}</td>
                  </tr>
                )}
                <tr className="border-t-2 border-gray-300 dark:border-gray-600">
                  <td colSpan="3" className="px-4 py-3 text-right text-lg font-bold text-gray-800 dark:text-white">Grand Total</td>
                  <td className="px-4 py-3 text-right text-lg font-bold text-orange-500">${invoice.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-400">
            <p>Thank you for your order! 🎉</p>
            <p className="mt-1">This is a computer generated invoice. No signature required.</p>
            <p className="mt-1">GST: {invoice.restaurant.gst}</p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Invoice;