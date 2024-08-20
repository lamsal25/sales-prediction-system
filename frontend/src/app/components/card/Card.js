import React from 'react';

export default function Card({ title1, title2, imagesrc }) {
  return (
    <div className='border-4 border-[#1C2C4C] bg-[#2E3349] cursor-pointer group m-auto rounded-xl h-auto w-1/4 shadow-blue-400 shadow-xl mt-10 bg-blue-950 text-white transition-all duration-500 ease-in-out transform hover:scale-105 hover:h-auto'>
      <img src={imagesrc} className="w-full invert rounded-lg p-7" />
      
      <h3 style={{ textShadow: '5px 5px 10px #1C2C4C' }} className='text-center p-4 text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out'>
        {title1}<br /> {title2}
      </h3>
    </div>
  );
}
