import React from 'react';
import AboutImage from '../assets/about.png';

const AboutUs = () => {
  return (
    <section className="bg-green-50 py-24 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800">
          Our Mission
        </h1>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <span className="font-bold text-green-800">ReuseHub</span> makes sustainable living simple.
            By connecting communities through donations, we reduce waste and give pre-loved items a second life.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Together, we’re building a greener, more generous world—one item at a time.
            <span className="block mt-4 text-green-700 font-semibold">Join us and be part of the change.</span>
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src={AboutImage}
            alt="About ReuseHub"
            className="w-full rounded-2xl shadow-xl object-cover border border-green-100"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
