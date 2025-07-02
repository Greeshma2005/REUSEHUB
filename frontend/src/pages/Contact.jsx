import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = localStorage.getItem('reusehubLoggedInUser');
    if (!user) {
      alert('Please log in to send a message.');
      navigate('/login');
      return;
    }

    const parsed = JSON.parse(user);

    const messageData = {
      name: parsed.name,
      email: parsed.email,
      message: formData.message,
    };

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });

      if (!res.ok) throw new Error('Failed to send message');
      alert("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert("Failed to send message. Please try again.");
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen bg-green-50 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-green-900">Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-900">Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-green-900">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
