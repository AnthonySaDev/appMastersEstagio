'use client'
import React, { useState, useEffect } from 'react';
import { collection, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import { toast } from 'react-toastify';
import AccountRedirect from '@/components/AccountRedirect';
import Loading from '../loading';
import Header from '@/components/Header';

export default function Account() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [favoritePlatform, setFavoritePlatform] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
      setEmail(userData?.email || '');
      setName(userData?.name || '');
      setPhoneNumber(userData?.phoneNumber || '');
      setFavoritePlatform(userData?.favoritePlatform || '');
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('email', '==', userData.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error('User not found');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;
      const userRef = doc(db, 'users', userId);
      const userDataToUpdate = {
        email: email || userData.email,
        name: name || userData.name,
        phoneNumber: phoneNumber || userData.phoneNumber,
        favoritePlatform: favoritePlatform || userData.favoritePlatform,
      };

      await updateDoc(userRef, userDataToUpdate);

      const updatedUserData = { ...userData, ...userDataToUpdate };
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile: ' + error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <AccountRedirect />;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r text-white">
      <Header/>
      <div className="max-w-md mt-10 px-4 py-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-orange-600 text-center">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div>
              <label htmlFor="email" className="text-lg">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={userData?.email || ''}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:bg-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="text-lg">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={userData?.name || ''}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:bg-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="text-lg">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={userData?.phoneNumber || ''}
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
                onChange={(e) => setFavoritePlatform(e.target.value)}
                placeholder={userData?.favoritePlatform || ''}
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
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-800 to-orange-700 text-white font-bold rounded-lg shadow hover:bg-orange-400 hover:brightness-125 transition-all duration-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
