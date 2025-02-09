import React from 'react'
import Card from '../card/Card'
import Image from 'next/image'

export default function Features() {
    return (


        <div className='container w-5/6 m-auto mt-20 mb-10'>

            <h1 className='text-4xl text-center font-bold text-[#1C2C4C]'>
                <span className='border-b-4 border-indigo-500'>Features</span>
            </h1>
            <div className=' justify-between flex'>
                <Card
                className

                    title1={"Highly Accurate"}
                    title2={"Result"}
                    imagesrc={"images/accuracy.png"}
                />

                <Card

                    title1={"High"}
                    title2={"Performance"}
                    imagesrc={"images/speed.png"}
                />

                <Card

                    title1={"Advance"}
                     title2={" Training Models"}
                    imagesrc={"images/advance.png"}
                />
            </div>
        </div>

    )
}
