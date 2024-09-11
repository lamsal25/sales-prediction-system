import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import Introduction from '../components/about/Introduction';
import MissionStatement from '../components/about/MissionStatement';
import VisionStatement from '../components/about/VisionStatement';
import Values from '../components/about/Values';
import Team from '../components/about/Team';
import Contact from '../components/about/Contact';

const AboutUs = () => {
  return (
    <>
      {/* Page Theme */}
      <div className="min-h-screen bg-gradient-to-b from-[#1C2C4C] to-[#f2b383]">
        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Introduction />
          <MissionStatement />
          <VisionStatement />
          <Values />
          <Team />
          <Contact />
        </main>
      </div>
    </>
  );
};

export default AboutUs;
