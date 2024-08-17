import React from 'react'
import Card from '../card/Card'
import Image from 'next/image'

export default function Features() {
    return (


            <div className='container w-5/6 m-auto mt-20 mb-10'>
               <div className=' text-center text-4xl'>
               <h2> Features </h2>
               </div>
                <div className=' justify-between flex'>
                    <Card

                        title1={"Accurate"}
                        title2={"Result"}
                        imagesrc={"images/accurate.jpg"}
                    />

                    <Card

                        title1={"High"}
                        title2={"performance"}
                        imagesrc={"images/performance.jpg"}
                    />

                    <Card

                        title1={"Advance"}
                        title2={"Analytics"}
                        imagesrc={"images/advance_analytics.webp"}
                    />
                </div>
            </div>
       
    )
}
