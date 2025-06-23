import React from 'react';
import Background from '../assets/Background.jpeg';

const Hero = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Give What You Don’t Need. Help Someone in Need.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-6">
          ReuseHub lets you donate or request items — building a sustainable and supportive community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-6 py-3 font-medium rounded-lg bg-green-600 hover:bg-green-700 text-white">
            Donate
          </button>
          <button className="px-6 py-3 font-medium rounded-lg border border-white text-white hover:bg-white hover:text-black transition">
            Request
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;