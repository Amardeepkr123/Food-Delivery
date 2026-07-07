// src/components/footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaPinterest,
} from 'react-icons/fa';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiArrowRight,
  FiHeart,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Restaurants', path: '/restaurants' },
    { label: 'Book Table', path: '/table-booking' },
    { label: 'Offers', path: '/offers' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const supportLinks = [
    { label: 'Help Center', path: '/help' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Refund Policy', path: '/refund-policy' },
    { label: 'Cancellation Policy', path: '/cancellation-policy' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: '#', color: 'hover:text-blue-500' },
    { icon: FaInstagram, href: '#', color: 'hover:text-pink-500' },
    { icon: FaTwitter, href: '#', color: 'hover:text-blue-400' },
    { icon: FaLinkedinIn, href: '#', color: 'hover:text-blue-600' },
    { icon: FaYoutube, href: '#', color: 'hover:text-red-500' },
    { icon: FaGithub, href: '#', color: 'hover:text-gray-400' },
    { icon: FaPinterest, href: '#', color: 'hover:text-red-600' },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
  };

  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍽️</span>
              <h2 className="text-2xl font-bold food-gradient-text">FoodDelivery</h2>
            </div>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Order delicious food, reserve tables, and track your deliveries in real time.
              Your one-stop solution for all food needs.
            </p>

            <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
              <FiHeart className="text-orange-500" />
              <span>Made with love in India</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300`}
                >
                  <social.icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 text-sm"
                  >
                    <FiArrowRight className="text-orange-500 text-xs opacity-0 group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
              Support
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
              Get In Touch
            </h3>

            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-start gap-3 hover:text-orange-500 transition-colors group">
                <FiMail className="text-orange-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>support@fooddelivery.com</span>
              </div>

              <div className="flex items-start gap-3 hover:text-orange-500 transition-colors group">
                <FiPhone className="text-orange-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-start gap-3 hover:text-orange-500 transition-colors group">
                <FiMapPin className="text-orange-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>123 Food Street, Mumbai, India</span>
              </div>

              <div className="flex items-start gap-3 hover:text-orange-500 transition-colors group">
                <FiClock className="text-orange-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>24/7 Customer Support</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-gray-400 text-sm mb-3">
                Subscribe to get offers & updates
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.elements.email.value;
                  if (email) {
                    alert(`Subscribed with: ${email}`);
                    e.target.reset();
                  }
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-orange-500 text-sm placeholder-gray-500 transition-all"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                >
                  <FiSend className="text-sm" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <hr className="border-gray-700 my-8" />
        </motion.div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
          <div className="flex items-center gap-2">
            <p>© {year} FoodDelivery. All Rights Reserved.</p>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span className="flex items-center gap-1">
              Made with <FiHeart className="text-red-500 text-xs" /> in India
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 justify-center">
            <Link to="/privacy" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-orange-500 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="hover:text-orange-500 transition-colors">
              Refund Policy
            </Link>
            <Link to="/sitemap" className="hover:text-orange-500 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

        {/* Payment Methods Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 pt-6 border-t border-gray-800 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500"
        >
          <span>Secure Payments</span>
          <span>|</span>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded bg-gray-800">💳 UPI</span>
            <span className="px-3 py-1 rounded bg-gray-800">💳 Cards</span>
            <span className="px-3 py-1 rounded bg-gray-800">💳 Net Banking</span>
            <span className="px-3 py-1 rounded bg-gray-800">💳 Wallet</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;