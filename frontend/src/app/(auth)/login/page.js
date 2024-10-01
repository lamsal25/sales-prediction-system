"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Both username and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // Store token in localStorage
        console.log('Login Successful:', response.data);

        // Redirect the user to the homepage
        setError('');
        router.push('/');
     
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      if (err.response) {
        console.log('Error Response:', err.response.data);
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An error occurred during login.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C2C4C] to-[#f2b383] flex justify-center items-center">
      <div className="card px-8 py-6 rounded-3xl bg-[#1C2C4C] w-72 mx-auto shadow-2xl shadow-black">
        <div className='flex py-10 justify-center'>
          <div className='relative h-5 w-5'>
            <div className='h-full w-full bg-[#e49d6a] [border:3px solid black] [border-radius:50%] mt-2 absolute animate-ping right-1'></div>
            <div className='h-5 w-5 bg-[#E8792C] [border:3px solid black] [border-radius:50%] mt-2 absolute right-1'></div>
          </div>
          <h1 className="text-center font-bold text-3xl text-[#E8792C] ml-3"><u>Login</u></h1>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="p-2 my-4 rounded w-[100%] focus:outline-blue-600"
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <input
            className="p-2 my-4 rounded w-[100%] focus:outline-blue-600"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button
            type="submit"
            className="bg-blue-500 hover:bg-[#E8792C] my-7 text-white font-semibold p-2 mt-3 rounded-2xl w-[100%]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
