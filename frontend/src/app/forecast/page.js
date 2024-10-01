"use client";
import React, { useEffect, useState } from 'react';

const Forecast = () => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the graph image from the Django API
    fetch('http://localhost:8000/api/forecast/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setImage(data.image); // Set the base64 image string
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#1C2C4C] to-[#f2b383]">  
        <main className="max-w-6xl mx-auto px-4 py-8">
          <h1 className='text-white text-3xl font-bold mb-6'>Sales Forecast</h1>
          {loading && <p className="text-white">Loading...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {/* Display Graph */}
          {!loading && !error && image && (
            <img src={`data:image/png;base64,${image}`} alt="Sales Forecast Graph" />
          )}
        </main>

      </div>
    </>
  );
};
export default Forecast;