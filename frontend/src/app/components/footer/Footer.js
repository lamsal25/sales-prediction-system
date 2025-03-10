"use client"

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../button/Button';

export default function Footer() {
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter(); // Initialize router
    
    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        setLoggedIn(!!token); // Update loggedIn state based on token presence
    }, [loggedIn]);

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem('token'); // Remove token from localStorage
        setLoggedIn(false); // Update loggedIn state
        router.push("/"); // Redirect to login page after logout
    };
    return (
        <div>

            <footer className="  bg-gradient-to-r from-[#1C2C4C] to-[#a45d29] text-white py-6 flex flex-col md:flex-row justify-between items-center w-full ">
                <div className="container m-auto flex flex-col md:flex-row justify-between items-center w-full max-w-screen-xl px-4 space-y-6 md:space-y-0">
                    {/* Section 1: Logo and Contact Info */}
                    <div className="flex flex-col items-center md:items-start min-w-[150px] px-2 text-center md:text-left">
                        <div className="font-bold mb-4">
                            <Image src="/images/logo.png" alt="Logo" height={100} width={100} />

                        </div>
                        <div className="mb-2">www.salesprediction.com</div>
                        <div>01-4455997</div>
                    </div>

                    {/* Section 2: Navigation Links */}
                    <div className="flex flex-col items-center md:items-start min-w-[150px] px-2 text-center md:text-left space-y-2">
                        <h1 className='text-2xl font-bold underline my-2'>Links</h1>
                        <Link href="/">Home</Link>
                        <Link href="/prediction">prediction</Link>
                        <Link href="/about-us">About Us</Link>

                    </div>
                    <div>
                        
                    </div>
                    {/* Section 3: Login */}
                    {/* <div >
                         <p>Sales Prediction System Using<br/> Gradient Boosting  Algorithm,<br/> aims to implement a data-driven, <br/> machine learning-based solution <br/>that can predict sales for <br/> Walmart with higher accuracy.</p>
                    </div> */}

                </div>
               
            </footer>

            {/* Copyright Section */}
            <div className="bg-gradient-to-r from-[#1C2C4C] to-[#a45d29] text-white py-2 text-center text-sm">
                © 2024 Sales prediction. All rights reserved.
            </div>


        </div>
    )
}
