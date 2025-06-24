import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import EcoBenefitsSection from './components/EcoBenefitsSection';
import DonationProcess from './components/DonationProcess';
import AboutUs from './pages/AboutUs';
import WhatWeOffer from './pages/WhatWeOffer';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Profile from './pages/Profile';
import DonatePage from './pages/Donate';
import DonationSuccess from './pages/DonationSuccess';
const Home = () => (
  <>
    <Hero />
    <EcoBenefitsSection />
    <DonationProcess />
  </>
);

const AboutPage = () => (
  <>
    <AboutUs />
    <WhatWeOffer />
  </>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/donation-success" element={<DonationSuccess />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
