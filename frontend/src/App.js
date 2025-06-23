import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import EcoBenefitsSection from './components/EcoBenefitsSection';
import DonationProcess from './components/DonationProcess';
import AboutUs from './pages/AboutUs';
import WhatWeOffer from './pages/WhatWeOffer';

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
