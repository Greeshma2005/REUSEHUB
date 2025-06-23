/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReuseHubLogo from '../assets/Logo.png';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = (smooth = false) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  const handleNavClick = (targetPath, smoothIfSame = true) => {
    if (location.pathname === targetPath) {
      scrollToTop(smoothIfSame);
    } else {
      navigate(targetPath);
      setTimeout(() => scrollToTop(false), 10);
    }
  };

  return (
    <footer className="bg-green-200 text-green-900 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={ReuseHubLogo} alt="ReuseHub Logo" className="w-8 h-8" />
            <span className="text-lg font-semibold text-green-900">ReuseHub</span>
          </div>
          <p className="text-sm text-green-800">
            Building a sustainable and supportive community through reusing and sharing.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-green-900 font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => handleNavClick('/')}
                className="hover:text-green-700 text-left text-green-900"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('/about')}
                className="hover:text-green-700 text-left text-green-900"
              >
                About Us
              </button>
            </li>
            <li><a href="#" className="hover:text-green-700">Services</a></li>
            <li><a href="#" className="hover:text-green-700">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-green-900 font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-700">FAQs</a></li>
            <li><a href="#" className="hover:text-green-700">Terms of Service</a></li>
            <li><a href="#" className="hover:text-green-700">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-green-900 font-semibold mb-3">Contact Us</h4>
          <p className="text-sm text-green-800">support@reusehub.com</p>
          <p className="text-sm text-green-800 mt-1">+91 98765 43210</p>
          <p className="text-sm text-green-800 mt-1">India</p>
        </div>
      </div>
      <div className="mt-10 border-t border-green-300 pt-6 text-center text-sm text-green-800">
        &copy; {new Date().getFullYear()} ReuseHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
