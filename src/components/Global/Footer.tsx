import { useState } from "react";
import { FaFacebook, FaWhatsapp, FaTwitter, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  // Set darkMode to false by default, or replace with your actual logic
  const [darkMode] = useState(false);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src={
                  darkMode
                    ? "/assets/logo/logo-light.png"
                    : "/assets/logo/logo-dark.png"
                }
                alt="Accelera Auto Parts Logo"
                className="w-20 h-20 object-contain"
              />

              <span className="ml-2 text-lg font-bold">
                Accelera <span className="text-orange-500">Auto Parts</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for high-quality used auto parts. We provide
              OEM-grade components with the best deals in the market.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <FaWhatsapp className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Used Auto Parts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Free Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Parts Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Parts Categories</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Engines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Transmissions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Body Parts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Electrical Components
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Suspension Parts
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                Phone:{" "}
                <a
                  href="tel:+1 201-984-5730"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  +1 201-984-5730
                </a>
              </li>
              <li className="text-gray-400">
                Email:{" "}
                <a
                  href="mailto:info@acceleraautoparts.com"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  info@acceleraautoparts.com
                </a>
              </li>
              <li className="text-gray-400">
                Address:{" "}
                <span className="hover:text-orange-500 transition-colors duration-200">
                  Supreme Auto Parts LLC, 1325 Main Street, Katy, TX, United
                  States, Texas
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Accelera Auto Parts. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
