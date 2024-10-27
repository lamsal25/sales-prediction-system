// Navbar.js
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '../button/Button';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

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
    <div className="bg-gradient-to-r from-[#1C2C4C] to-[#E8792C]">
      <div className="container mx-auto flex justify-between items-center text-white py-4">
        <Link href="/">
          <img src="images/logo.png" alt="Logo" className="h-16 w-16 cursor-pointer" />
        </Link>

        <div className="space-x-10 uppercase">
          <Link href="/" className="hover:scale-105 transition-all">Home</Link>
          <Link href="/about-us" className="hover:scale-105 transition-all">About Us</Link>
          <Link href="/prediction" className="hover:scale-105 transition-all">Prediction</Link>
        </div>

        {!loggedIn ? (
          <div className="flex space-x-6">
            <Link href="/login" className="hover:scale-105 transition-all">
            <Button
                title={"LogIn"}
                bgColor={"#1C2C4C"}
                padL={10}
                padT={5}
                color={"white"}
                borderRadius={"30px"}
              />
            </Link>
           
            <Link href="/register" className="hover:scale-105 transition-all">
            <Button
                title={"register"}
                bgColor={"#1C2C4C"}
                padL={10}
                padT={5}
                color={"white"}
                borderRadius={"30px"}
              />
            </Link>
          </div>
        ) : (
          <div className="space-x-6">
            <button
              className="bg-[#1C2C4C] text-white px-4 py-2 rounded-lg"
              onClick={handleLogout}
            >
           Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
