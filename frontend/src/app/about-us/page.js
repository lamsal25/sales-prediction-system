
import React from 'react';
import Navbar from "../components/navbar/Navbar";
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
      <Navbar/>
      <main className="max-w-6xl mx-auto px-4">
        <Introduction />
        <MissionStatement />
        <VisionStatement />
        <Values />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
