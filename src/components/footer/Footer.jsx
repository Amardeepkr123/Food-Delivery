import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500">
              FoodHub
            </h2>
            <p className="mt-4 text-gray-400 text-sm leading-6">
              Order delicious food, reserve tables, and track your
              deliveries in real time.
            </p>

            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-orange-500">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-orange-500">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-orange-500">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-orange-500">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-orange-500">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-orange-500">
                  Home
                </a>
              </li>
              <li>
                <a href="/restaurants" className="hover:text-orange-500">
                  Restaurants
                </a>
              </li>
              <li>
                <a href="/offers" className="hover:text-orange-500">
                  Offers
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-orange-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <FiMail />
                support@foodhub.com
              </div>

              <div className="flex items-center gap-2">
                <FiPhone />
                +91 9876543210
              </div>

              <div className="flex items-center gap-2">
                <FiMapPin />
                India
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Newsletter
            </h3>

            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive offers and updates.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-orange-500"
            />

            <button className="w-full mt-3 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {year} FoodHub. All Rights Reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-500">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-orange-500">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;