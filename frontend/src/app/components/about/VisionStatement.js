// src/app/components/about/VisionStatement.js
import React from 'react';

const VisionStatement = () => {
  return (
    <section className="py-12 bg-gray-50 px-9">
      <div className="container mx-auto flex flex-col md:flex-row-reverse items-center">
        <div className="md:w-1/2 text-center md:text-right">
          <h2 className="text-2xl font-bold text-indigo-800">Our Vision</h2>
          <p className="mt-4 text-gray-600">
            Our vision is to become the leading provider of sales prediction and analytics solutions globally, helping businesses of all sizes to navigate the complexities of the market with confidence and precision.
          </p>
          <p className="mt-4 text-gray-600">
            We aspire to be a catalyst for positive change, fostering innovation and driving growth in every industry we serve. Through continuous improvement and a commitment to excellence, we aim to set new standards in predictive analytics.
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img src="/images/4.png" alt="Vision" className="w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  );
};

export default VisionStatement;
