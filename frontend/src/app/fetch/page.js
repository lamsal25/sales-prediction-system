"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Fetch() {
  const [itemName, setItemName]=useState([])
  useEffect(()=>{
    fetchItem()
  },[itemName])

  const fetchItem = async () => 
    {
        const response = await axios.get("http://localhost:8000/api/fetchitem/")
        console.log(response.data)
        setItemName(response.data)
    }

    return (
    <div>
        {itemName.map(item=>(
            
                <span>{item.name} </span>
                
        )

    )}
    </div>
  )
}
