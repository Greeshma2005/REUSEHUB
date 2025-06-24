import React from 'react';
import { FaRecycle, FaMoon, FaLeaf } from 'react-icons/fa';

import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';
import img4 from '../assets/img4.jpeg';

const EcoBenefitsSection = () => {
  return (
    <section className="bg-green-100 py-20 px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
          WHY REUSEHUB?
        </h2>
      </div>
      <div className="max-w-7xl mx-auto mb-20 flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="flex items-start gap-4 max-w-sm">
          <FaRecycle className="text-black text-3xl mt-1" />
          <div>
            <h3 className="text-base font-semibold text-black mb-1">Sustainable Impact</h3>
            <p className="text-sm text-gray-700">Make a difference with every donation.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 max-w-sm">
          <FaMoon className="text-black text-3xl mt-1" />
          <div>
            <h3 className="text-base font-semibold text-black mb-1">Sleep Better</h3>
            <p className="text-sm text-gray-700">Rest easy knowing you're helping the planet.</p>
          </div>
        </div>

        <div className="flex items-start gap-4 max-w-sm">
          <FaLeaf className="text-black text-3xl mt-1" />
          <div>
            <h3 className="text-base font-semibold text-black mb-1">Reduce Waste</h3>
            <p className="text-sm text-gray-700">Contribute to a cleaner environment.</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black mb-12 leading-snug text-center">
            Connect with a community of <span className="text-green-700">eco-conscious</span> users
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {[
            {
              text: 'This app changed how I recycle.',
              name: 'Emma R.',
              role: 'Eco Activist',
              img: img1,
            },
            {
              text: 'ReuseHub makes donating easy!',
              name: 'Liam T.',
              role: 'Sustainability Blogger',
              img: img2,
            },
            {
              text: 'Recycling has never been simpler.',
              name: 'Sophie J.',
              role: 'Student',
              img: img3,
            },
            {
              text: 'I love how easy it is to donate!',
              name: 'Noah B.',
              role: 'Project Coordinator',
              img: img4,
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 md:p-8 rounded-xl shadow transition-all duration-300 transform hover:scale-105 hover:shadow-lg h-full flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl text-black mb-3">❝</div>
                <p className="text-sm text-black font-medium leading-relaxed">{t.text}</p>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full grayscale" />
                <div>
                  <p className="text-xs font-semibold text-black">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcoBenefitsSection;
