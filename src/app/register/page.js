'use client'
import React, { useState, useContext } from 'react';
import Header from '@/components/Header';
import { AuthContext } from '@/contexts/auth';
import { toast } from 'react-toastify';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      if (name !== '' && email !== '' && password !== '') {
        signUp(email, password, name);
      }
    } else {
      toast.warn('The passwords do not match');
    }
  }

  return (
    <div className="flex flex-col mt-10 items-center justify-center h-screen bg-gradient-to-r text-white">
      <Header />
      <div className="max-w-md mt-10 px-4 py-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-[#ff0f7b] text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
          <div className="relative my-5">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="email"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-[#ff0f7b] appearance-none dark:text-white dark:border-zinc-500 dark:focus:border-[#ff0f7b] focus:outline-none focus:ring-0 focus:border-[#ff0f7b] peer" placeholder=" " />

            <label
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 0 px-2 peer-focus:px-2 peer-focus:text-[#ff0f7b] peer-focus:dark:text-[#ff0f7b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
          </div>
          </div>
          <div className="relative mb-5">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-[#ff0f7b] appearance-none dark:text-white dark:border-zinc-500 dark:focus:border-[#ff0f7b] focus:outline-none focus:ring-0 focus:border-[#ff0f7b] peer" placeholder=" " />

            <label
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 0 px-2 peer-focus:px-2 peer-focus:text-[#ff0f7b] peer-focus:dark:text-[#ff0f7b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">E-mail</label>
          </div>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              type="text"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-[#ff0f7b] appearance-none dark:text-white dark:border-zinc-500 dark:focus:border-[#ff0f7b] focus:outline-none focus:ring-0 focus:border-[#ff0f7b] peer" placeholder=" " />

            <label
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 0 px-2 peer-focus:px-2 peer-focus:text-[#ff0f7b] peer-focus:dark:text-[#ff0f7b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
          </div>

          <div className="relative">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              type="text"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-[#ff0f7b] appearance-none dark:text-white dark:border-zinc-500 dark:focus:border-[#ff0f7b] focus:outline-none focus:ring-0 focus:border-[#ff0f7b] peer" placeholder=" " />

            <label
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 0 px-2 peer-focus:px-2 peer-focus:text-[#ff0f7b] peer-focus:dark:text-[#ff0f7b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Confirm Password</label>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-800 text-white font-bold rounded-lg shadow hover:bg-purple-400 hover:brightness-125 transition-all duration-700"
          >
            {loadingAuth ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
