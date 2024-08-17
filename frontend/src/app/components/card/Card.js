import React from 'react'

export default function Card({title1, title2, imagesrc}) {
  return (
    
        <div className='m-auto rounded-lg h-96 w-1/4  border-2 shadow-blue-400 shadow-lg mt-10 bg-blue-950 text-white'>
            <img src={imagesrc}  className="w-full h-56 rounded-lg border-2 border-black" />
            <h3 className='text-center mt-14  text-2xl'>
              {title1}<br/> {title2}
            </h3>
        </div>
   
  )
}
