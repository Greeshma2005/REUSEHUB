import React from 'react';
import Step1 from '../assets/step1.png';
import Step2 from '../assets/step2.png';
import Step3 from '../assets/step3.png';

const DonationProcess = () => {
  return (
    <section className="bg-green-50 py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-14 text-black">
        Eco-Friendly Donation Process
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Step 1: List Your Item',
            desc: 'List items you no longer need and contribute to sustainable practices by donating them.',
            img: Step1,
          },
          {
            title: 'Step 2: View or Request',
            desc: 'Explore listed items and request those that can benefit you or your community.',
            img: Step2,
          },
          {
            title: 'Step 3: Donate',
            desc: 'Complete the donation by giving your item to someone who needs it, fostering community connection.',
            img: Step3,
          },
        ].map((step, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:bg-green-100 transform hover:scale-[1.02] transition-all duration-300 ease-in-out text-center"
          >
            <img
              src={step.img}
              alt={step.title}
              className="mx-auto mb-4 w-36 h-36 object-contain"
            />
            <h3 className="text-base font-bold text-black mb-3">{step.title}</h3>
            <p className="text-sm text-gray-700">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DonationProcess;
