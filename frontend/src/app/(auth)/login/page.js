import React from 'react'

export default function Login() {
  return (
    <div>
      <div class="card px-8 py-6 rounded-3xl bg-gray-800 w-72 mx-auto mt-40 shadow-2xl shadow-black ">
      <h1 class="text-center font-bold text-3xl text-white py-10">Login</h1>

      <form action="">
        <input class="p-2 my-4 rounded w-[100%] focus:outline-blue-600" placeholder="Username" type="text" />
        <input class="p-2 my-4 rounded w-[100%] focus:outline-blue-600" placeholder="Password" type="password" />
        <button class="bg-blue-600 hover:bg-blue-500 text-white font-semibold p-2 mt-3 rounded w-[100%]">Login</button>
        <p class="text-slate-500 py-7"> Don't have account?        
          <a class="font-semibold text-white hover:text-blue-500 transition-all duration-200" href="">Sign up</a>
        </p>

      </form>

    </div>
    </div>
  )
}
