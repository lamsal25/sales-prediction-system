import React from 'react'
import Image from 'next/image'
import Button from '../button/Button'
import Link from 'next/link'


export default function Navbar() {
  return (
    // Adjusted the color of the navbar background
    <div className='  bg-gradient-to-r from-[#1C2C4C] to-[#E8792C] justify-between items-center'>
      <div className='container w-5/6 flex justify-between  items-center m-auto text-white '>

      <Link href={"/"}> <img src="images/logo.png" alt="" height="100" width="100"  /></Link> 


        <div className='container flex gap-10  uppercase justify-center'>
         
         <Link href={"/"} className=' hover:scale-105 transition-all'>Home</Link>
         <Link href={"/about-us"} className=' hover:scale-105 transition-all'>About Us</Link>
         <Link href={"/"} className=' hover:scale-105 transition-all'>Forecast</Link>
            <link rel="stylesheet" href="" />
       </div>

        <Link href={"login"} className=' hover:scale-105 transition-all'>

        
        <Button
          
          title={"LogIn"}
          bgColor={"#1C2C4C"}
          padL={10}
          padT={5}
          color={"white"}
          borderRadius={"30px"}
        // event={onLogin}
        /></Link>
      </div>
    </div>
  )
}
