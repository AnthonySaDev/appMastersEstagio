'use client'
import React, { useState, useEffect } from 'react';
import Loading from '../loading';
import Header from '@/components/Header';
import FavoriteRedirect from '@/components/FavoritesRedirect';

export default function Favorites() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const[name,setName] = useState('');
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
      setName(userData?.name || '');
    }
    setLoading(false);
  }, []);

  
  if (loading) {
    return <Loading/>
  }

  if (!userData) {
    return <FavoriteRedirect/>;
  }
  return(
    <div className="flex flex-col mt-10 items-center justify-center h-screen bg-gradient-to-r text-white">
      <Header />
      <div className='w-10/12'>
      <h1 className='text-red-600 text-xl font-bold'>Hello, {userData.name}</h1>
      <p>This is your list of favorite games.</p>
      <p>You can edit anything you want 😊</p>
      {favorites.length==0?<p>To add favorites, simply click on "See More" on the game card that you like.</p>:<></>}
      </div>
    </div>
)
}
