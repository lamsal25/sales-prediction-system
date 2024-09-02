"use client";
import React from 'react';
import { Carousel } from "@material-tailwind/react";

import Image from 'next/image';

export default function Hero() {
    return (
        <div>
            <Carousel>
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
      )}
    >
      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
    );
}
