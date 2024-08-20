import React from 'react'

export default function Login() {
  return (
    <div>
      <div className="card px-8 py-6 rounded-3xl bg-[#1C2C4C] w-72 mx-auto mt-40 shadow-2xl shadow-black ">
        <div className='flex py-10 justify-center '>
          <div className='relative h-5 w-5'>
          <div className='h-full w-full bg-[#e49d6a] [border:3px solid black] [border-radius:50%] mt-2 absolute animate-ping right-1'></div>
          <div className='h-5 w-5 bg-[#E8792C] [border:3px solid black] [border-radius:50%] mt-2 absolute right-1'></div>
          </div>
          <h1 className="text-center font-bold text-3xl text-[#E8792C] ml-3"><u>Login</u></h1>
        </div>

        <form action="" method="POST">
          <input className="p-2 my-4 rounded w-[100%] focus:outline-blue-600" placeholder="Username" type="text" name="username" />
          <input className="p-2 my-4 rounded w-[100%] focus:outline-blue-600" placeholder="Password" type="password" name="password"/>
          <button className="bg-blue-500 hover:bg-[#E8792C] my-7 text-white font-semibold p-2 mt-3 rounded-2xl w-[100%]">Login</button>

        </form>

      </div>
    </div>
  )
}
