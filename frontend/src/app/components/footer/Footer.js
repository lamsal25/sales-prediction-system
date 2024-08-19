import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <div>
            
            <footer className=" bg-black text-white py-6 flex flex-col md:flex-row justify-between items-center w-full ">
                <div className="container w-5/6 m-auto flex flex-col md:flex-row justify-between items-center w-full max-w-screen-xl px-4 space-y-6 md:space-y-0">
                    {/* Section 1: Logo and Contact Info */}
                    <div className="flex flex-col items-center md:items-start min-w-[150px] px-2 text-center md:text-left">
                        <div className="font-bold mb-4">
                            <Image src="/images/logo.png" alt="Logo" height={100} width={100} />
                            
                        </div>
                        <div className="mb-2">www.salesforecast.com</div>
                        <div>01-4455997</div>
                    </div>

                    {/* Section 2: Navigation Links */}
                    <div className="flex flex-col items-center md:items-start min-w-[150px] px-2 text-center md:text-left space-y-2">
                        <h1 className='text-2xl font-bold underline my-2'>Links</h1>
                        <Link href="/">Home</Link>
                        <div>Forecast</div>
                        <Link href="/about-us">About Us</Link>
                        
                    </div>

                    {/* Section 3: Login */}
                    <div className="flex flex-col items-center md:items-start min-w-[150px] px-2 text-center md:text-left">
                        <Link href="login">Login</Link>
                    </div>
                </div>
            </footer>

            {/* Copyright Section */}
            <div className="bg-black text-white py-2 text-center text-sm">
                © 2024 Sales Forecast. All rights reserved.
            </div>


        </div>
    )
}
