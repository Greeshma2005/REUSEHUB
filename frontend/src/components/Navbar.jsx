/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecycleLogo from '../assets/Logo.png';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = (smooth = false) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  const handleNavClick = (targetPath) => {
    const isSamePage = location.pathname === targetPath;

    if (isSamePage) {
      scrollToTop(true);
    } else {
      navigate(targetPath);
      setTimeout(() => scrollToTop(false), 10);
    }

    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToTop(false), 10);
    } else {
      scrollToTop(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
        <div
          onClick={handleLogoClick}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img src={RecycleLogo} alt="Recycle Logo" className="h-8 w-8" />
          <span className="text-lg font-semibold text-black">ReuseHub</span>
        </div>
        <div className="hidden md:flex flex-grow justify-center space-x-16 text-sm font-medium text-black">
          <button onClick={() => handleNavClick('/')} className="hover:text-green-600">Home</button>
          <button onClick={() => handleNavClick('/about')} className="hover:text-green-600">About Us</button>
          <button onClick={() => handleNavClick('/services')} className="hover:text-green-600">Services</button>
          <button onClick={() => handleNavClick('/contact')} className="hover:text-green-600">Contact</button>
        </div>
        <div className="hidden md:flex space-x-3">
          <button className="px-5 py-2 text-sm font-medium rounded-full bg-white text-green-700 border border-green-600 hover:bg-green-50 hover:shadow-md transform hover:scale-105 transition duration-200">
            Log in
          </button>
          <button className="px-5 py-2 text-sm font-medium rounded-full bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:scale-105 transition duration-200">
            Get started
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-4 transition-all duration-300">
          <button
            onClick={() => handleNavClick('/')}
            className="block w-full text-left text-sm font-medium text-black hover:text-green-600"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('/about')}
            className="block w-full text-left text-sm font-medium text-black hover:text-green-600"
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('/services')}
            className="block w-full text-left text-sm font-medium text-black hover:text-green-600"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('/contact')}
            className="block w-full text-left text-sm font-medium text-black hover:text-green-600"
          >
            Contact
          </button>

          <hr className="my-2" />

          <button className="w-full px-4 py-2 text-sm font-medium bg-white text-green-700 border border-green-600 rounded-full hover:bg-green-50 hover:shadow-md transform hover:scale-105 transition duration-200">
            Log in
          </button>
          <button className="w-full px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-full hover:bg-green-700 hover:shadow-lg transform hover:scale-105 transition duration-200">
            Get started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
