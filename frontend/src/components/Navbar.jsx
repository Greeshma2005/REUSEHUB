/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import RecycleLogo from '../assets/Logo.png';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm w-full relative z-50">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
        {/* Left: Logo + Name */}
        <div className="flex items-center space-x-2">
          <img src={RecycleLogo} alt="Recycle Logo" className="h-8 w-8" />
          <span className="text-lg font-semibold text-black">ReuseHub</span>
        </div>

        {/* Center: Nav Links (Desktop) */}
        <div className="hidden md:flex flex-grow justify-center space-x-16 text-sm font-medium text-black">
          <a href="#" className="hover:text-green-600">Home</a>
          <a href="#" className="hover:text-green-600">About Us</a>
          <a href="#" className="hover:text-green-600">Service</a>
          <a href="#" className="hover:text-green-600">Contact</a>
        </div>

        {/* Right: Buttons (Desktop) */}
        <div className="hidden md:flex space-x-3">
          <button className="px-4 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 text-black">
            Log in
          </button>
          <button className="px-4 py-1 text-sm rounded bg-green-600 hover:bg-green-700 text-white">
            Get started
          </button>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Slide-down Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-4 py-4 space-y-4 transition-all duration-300">
          <div className="space-y-2 text-center">
            <a href="#" className="block text-sm font-medium text-black hover:text-green-600">Home</a>
            <a href="#" className="block text-sm font-medium text-black hover:text-green-600">About Us</a>
            <a href="#" className="block text-sm font-medium text-black hover:text-green-600">Service</a>
            <a href="#" className="block text-sm font-medium text-black hover:text-green-600">Contact</a>
          </div>
          <hr className="my-2" />
          <div className="space-y-2">
            <button className="w-full px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-black rounded">
              Log in
            </button>
            <button className="w-full px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded">
              Get started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
