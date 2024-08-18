import React from 'react'

export default function Card({ title1, title2, imagesrc }) {
  return (

    <div className='border-4 border-[#1C2C4C] hover:border-blue-400 bg-blue-400 cursor-pointer group m-auto rounded-xl h-auto w-1/4 shadow-blue-400 shadow-xl mt-10 bg-blue-950 hover:bg-[#1C2C4C] hover:text-white '>
      <img src={imagesrc} className="w-full rounded-lg p-7 hover:invert " />
      
      <h3 style={{ textShadow: '5px 5px 10px #1C2C4C' }} className='text-center p-4 text-2xl font-bold hidden group-hover:block bg-white text-black'>
        {title1}<br /> {title2}
      </h3>
    </div>


  )
}
