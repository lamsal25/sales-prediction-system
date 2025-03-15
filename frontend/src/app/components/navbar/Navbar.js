"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '../button/Button';
import getSession from '@/helpers/getSession';
import axios from 'axios';

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState('')

  useEffect(() => {
    const getToken = async () => {
      const tokenValue = await getSession()
      console.log("toke is : ", tokenValue)
      setToken(tokenValue)
    }
    getToken()
  }, [token])

  const handleLogout = async () => {
    const response = await axios.get('/api/logout')
    console.log(response)
    setToken('')
    router.push('/')
  };

  const handlePrediction = async () => {
    const tokenValue = await getSession()
    if (!tokenValue) {
      alert("Please Login for Prediction ")
    }
  }
  return (
    <div className="bg-gradient-to-r from-[#1C2C4C] to-[#E8792C]">
      <div className="container mx-auto flex justify-between items-center text-white py-4">
        <Link href="/">
          <img src="images/logo.png" alt="Logo" className="h-16 w-16 cursor-pointer" />
        </Link>

        <div className="space-x-10 uppercase">
          <Link href="/" className="hover:scale-105 transition-all">Home</Link>
          <Link href="/about-us" className="hover:scale-105 transition-all">About Us</Link>

          <Link href="/prediction" className="hover:scale-105 transition-all" onClick={handlePrediction}>Prediction</Link>
        </div>

        {!token ? (
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
          <div className="flex space-x-6">
            {/* Reports Button - Opens in a New Tab */}
            <Link href="/reports" className="hover:scale-105 transition-all">
            <Button title="Reports" bgColor="#1C2C4C" padL={10} padT={5} color="white" borderRadius="30px" />
          </Link>

            {/* Logout Button */}
            <button className="bg-[#1C2C4C] text-white px-4 py-2 rounded-lg" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
