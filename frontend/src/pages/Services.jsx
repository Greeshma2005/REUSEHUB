import React from 'react';

const services = [
  {
    title: 'Donate Items',
    description: 'Easily give away items you no longer need to someone who truly does. Help reduce waste and support your community.',
    icon: '📦',
  },
  {
    title: 'Request Essentials',
    description: 'In need of basic items? Browse available donations or place a request for specific needs — no judgment, just support.',
    icon: '🙏',
  },
  {
    title: 'Eco-Friendly Impact',
    description: 'Contribute to a greener planet by reusing and repurposing. Every donation is a step toward sustainability.',
    icon: '🌱',
  },
  {
    title: 'Verified Users',
    description: 'All donors and requesters go through a simple verification process to ensure a safe and trustworthy experience.',
    icon: '🛡️',
  },
  {
    title: 'Location-Based Matching',
    description: 'We connect you with people in your city so items can be exchanged quickly and conveniently.',
    icon: '📍',
  },
  {
    title: 'Email Notifications',
    description: 'Stay updated about your donations and requests with timely email alerts and confirmations.',
    icon: '📧',
  },
];

const Services = () => {
  return (
    <section className="min-h-screen bg-white text-green-900 py-16 px-4 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-lg text-green-800">Empowering communities through reuse, sustainability, and social impact.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-green-100 rounded-lg shadow-md p-6 hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-green-800 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
