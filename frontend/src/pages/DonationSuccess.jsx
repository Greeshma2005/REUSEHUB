import React from 'react';
import donateImage from '../assets/donate.png'; 
import { useNavigate } from 'react-router-dom';

const DonationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md w-full">
        <img src={donateImage} alt="Thank You" className="mx-auto mb-6 w-40" />
        <h2 className="text-xl font-bold text-green-800 mb-2">Thank You for Your Generous Donation!</h2>
        <p className="text-sm text-gray-700 mb-4">
          You've made a positive impact by donating your item. Share this moment with others to inspire more acts of kindness.
        </p>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => navigate('/donate')}
        >
          Make Another Donation
        </button>
      </div>

      <div className="mt-10 text-center text-sm text-gray-600">
        <h3 className="font-semibold text-green-700 mb-2">Eco-Friendly Tips</h3>
        <ul className="space-y-1">
          <li>Reduce waste by recycling and reusing materials.</li>
          <li>Support local eco-friendly businesses.</li>
          <li>Opt for digital alternatives to minimize paper use.</li>
        </ul>
        <p className="mt-4">
          Looking for more ways to give back?{' '}
          <a href="/" className="text-green-600 underline">
            Explore other opportunities
          </a>.
        </p>
      </div>
    </div>
  );
};

export default DonationSuccess;
