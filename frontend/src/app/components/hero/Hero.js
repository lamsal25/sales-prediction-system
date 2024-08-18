"use client";
import React from 'react';
import { Carousel } from "@material-tailwind/react";

import Image from 'next/image';

export default function Hero() {
    return (
        <div>
            <Carousel className="rounded-xl">
                <div className="relative h-[90vh] w-full">
                    <img
                        src="images/img1.jpg"
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay */}

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className='text-2xl text-white [font-variant:small-caps] mt-[20%]'>
                            "Data science is the ability to take data, understand it, process it, extract value from it, visualize it, communicate it."
                        </h1>
                        <p className='text-white mt-4'>
                            - DJ Patil (Former U.S. Chief Data Scientist, LinkedIn)
                        </p>
                    </div>
                </div>


                <div className="relative h-[90vh] w-full">
                    <img
                        src="images/img2.webp"
                        alt="image 2"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay */}

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className='text-2xl text-white [font-variant:small-caps] mt-[20%]'>
                            "In deep learning, we don't know how our networks work. We just have to trust them."                        </h1>
                        <p className='text-white mt-4'>
                            -Geoffrey Hinton (Pioneer in Neural Networks, Google)

                        </p>
                    </div>
                </div>

                <div className="relative h-[90vh] w-full">
                    <img
                        src="images/img3.jpg"
                        alt="image 3"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay */}

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className='text-2xl text-white [font-variant:small-caps] mt-[20%]'>
                            "Data science is about 80% data preparation, 20% complaining about the need to prepare data."                        </h1>
                        <p className='text-white mt-4'>
                            -Hadley Wickham (Chief Scientist at RStudio, Creator of ggplot2)
                        </p>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}
