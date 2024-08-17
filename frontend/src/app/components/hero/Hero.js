import React from 'react';

export default function Hero() {
    return (
        <div className='relative'>
            <div className='relative w-full h-[90vh]'>
                <img src="images/heroimg.jpg" alt="Hero Image" className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-[#1C2C4C] opacity-60 mix-blend-multiply'></div>
            </div>
            <div className='absolute inset-36 flex flex-col text-white'>
                <h2 className='text-6xl leading-snug'>Welcome!</h2>
                <p className='text-2xl leading-snug mt-10'>
                    Your Trusted Tool for <br /> Sales forecasting
                </p>
            </div>
        </div>
    );
}
