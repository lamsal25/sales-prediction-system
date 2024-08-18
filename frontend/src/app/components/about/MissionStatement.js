// src/app/components/about/MissionStatement.js
import React from 'react';

const MissionStatement = () => {
  return (
    <section className="py-12 bg-white px-9">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-indigo-800">Our Mission</h2>
          <p className="mt-4 text-gray-600">
            Our mission is to empower businesses with precise and actionable sales predictions, enabling them to optimize their strategies, improve efficiency, and drive sustainable growth.
          </p>
          <p className="mt-4 text-gray-600">
            We believe that data-driven decision-making is the cornerstone of success in today’s fast-paced market. By providing advanced predictive analytics tools and personalized support, we help our clients stay ahead of the curve and achieve their business objectives.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src="/images/5.png" alt="Mission" className="w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
