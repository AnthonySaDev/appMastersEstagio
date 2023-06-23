'use client'
import React, { useState } from 'react';
import Header from '@/components/Header';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [favoritePlatform, setFavoritePlatform] = useState('')
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warn('Passwords do not match');
      return;
    }

    try {
        const userData = {
            email,
            phoneNumber,
            favoritePlatform,
            name,
            password,
          };
          await addDoc(collection(db, 'users'), userData);
        toast.success('Registration successful');
      router.push('/login');
    } catch (error) {
      toast.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="flex flex-col mt-10 items-center justify-center h-screen bg-gradient-to-r text-white">
      <Header />
      <div className="max-w-md mt-10 px-4 py-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-[#ff0f7b] text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-lg">
              Name:
            </label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:bg-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-lg">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:bg-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-lg">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:bg-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-lg">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:bg-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="text-lg">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e)=>setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:bg-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="favoritePlatform" className="text-lg">
              Favorite Platform:
            </label>
            <select
              id="favoritePlatform"
              value={favoritePlatform}
              onChange={(e)=>setFavoritePlatform(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:bg-gray-900"
              required
            >
              <option value="">Select a platform</option>
              <option value="pc">PC</option>
              <option value="xbox">Xbox</option>
              <option value="playstation">PlayStation</option>
              <option value="nintendo">Nintendo</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-800 text-white font-bold rounded-lg shadow hover:bg-purple-400 hover:brightness-125 transition-all duration-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}