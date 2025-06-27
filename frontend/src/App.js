import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RequestPage from './pages/RequestPage';
import RequestItemDetails from './pages/RequestItemDetails';
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
    <AuthProvider>
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/request/:id" element={<RequestItemDetails />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
}

export default App;
