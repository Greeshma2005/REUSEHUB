import React from 'react';
import { 
  FaClock, FaChartLine, FaMugHot, FaGift, 
  FaHeart, FaHandsHelping, FaUsers, FaHome 
} from 'react-icons/fa';

const WhatWeOffer = () => {
  const features = [
    { icon: <FaClock />, label: 'Flexible Donation Options' },
    { icon: <FaChartLine />, label: 'Impact Reports' },
    { icon: <FaMugHot />, label: 'Community Engagement' },
    { icon: <FaGift />, label: 'Gift Matching' },
    { icon: <FaHeart />, label: 'Sustainability Initiatives' },
    { icon: <FaHandsHelping />, label: 'Transparent Processes' },
    { icon: <FaUsers />, label: 'Community Events' },
    { icon: <FaHome />, label: 'User-Friendly Interface' },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          What we offer
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">
        {features.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-3">
            <div className="bg-green-200 text-black p-4 rounded-md text-xl">
              {item.icon}
            </div>
            <p className="text-sm font-medium text-black">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeOffer;
