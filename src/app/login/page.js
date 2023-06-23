'use client'
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
    platform: '',
    name: '',
    phoneNumber: ''
  });
  const router = useRouter();


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.error('Invalid email or password');
        return;
      }
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      if (userData.password === password) {
        toast.success('Login successful');
        setUser(userData);
        router.push('/');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r text-white">
      <div className="max-w-md mt-10 px-4 py-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-[#ff0f7b] text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-lg">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:bg-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-800 text-white font-bold rounded-lg shadow hover:bg-purple-400 hover:brightness-125 transition-all duration-700"
          >
            Login
          </button>
        </form>
        <button onClick={() => console.log(user)}>Teste</button>
      </div>
    </div>
  );
}
