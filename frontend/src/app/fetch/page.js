"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Fetch() {
 
  useEffect(()=>{
    fetchItem()
  },[])

  const fetchItem = async () => 
    {
        const response = await axios.get("http://localhost:8000/api/fetchitem/")
        console.log(response)
        
    }

    return (
    <div>
       

  
    </div>
  )
}
