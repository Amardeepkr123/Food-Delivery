// src/layouts/MainLayout.jsx
import React from 'react';
import { motion } from 'framer-motion';
// ✅ FIXED: Correct import path for Navbar
import Navbar from '../components/navbar/Navbar';
// ✅ FIXED: Correct import path for Footer
import Footer from '../components/footer/Footer';
// ✅ FIXED: Correct import path for useAuth
import { useAuth } from '../hooks/useAuth';

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar user={user} onLogout={logout} />
      <main className="flex-1 pt-[70px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full"
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;