// src/app/components/about/MemberCard.js
import React from 'react';

const MemberCard = ({ name, role, image, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <img src={image} alt={name} className="w-32 h-32 mx-auto rounded-full" />
      <h3 className="mt-4 text-xl font-semibold">{name}</h3>
      <p className="text-gray-500">{role}</p>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default MemberCard;
