'use client'
import React, { useState, useEffect, useContext } from 'react';
import Header from '@/components/Header';
import FavoriteRedirect from '@/app/FavoritesRedirect';
import { AuthContext } from '@/contexts/auth';
import { DataContext } from '@/contexts/data';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import HasError from '../hasError';

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const { hasError } = useContext(DataContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@games");
    const savedGames = JSON.parse(myList) || [];
    setFavorites(savedGames);
  }, []);

  if (!user) {
    return <FavoriteRedirect />;
  }


  function deleteFavorite(gameId) {
    const updatedFavorites = favorites.filter((game) => game.id !== gameId);
    setFavorites(updatedFavorites);
    localStorage.setItem('@games', JSON.stringify(updatedFavorites));
  }
  if (hasError) {
    return (
      <HasError />
    )
  }
  return (
    <div className="flex flex-col  h-screen bg-gradient-to-r text-white">
      <Header />
      <div className="w-10/12 mt-20 md:mt-24 flex flex-col items-center justify-center mx-auto ">
        <div className='flex w-full md:w-5/12 mx-auto justify-between items-center mb-5'>
          <h1 className="text-red-600 text-xl font-bold">Hello, {user.name}</h1>
          <img src={user.avatarUrl} width="60" height="60" className='object-cover md:hidden rounded-full' />
          <img src={user.avatarUrl} width="150" height="150" className='object-cover md:flex hidden rounded-full' />
        </div>
        <p className='text-center text-2xl'>This is your list of favorite games.</p>
        <p className='text-center text-2xl'>You can edit anything you want 😊</p>
        {favorites.length === 0 ? (
          <p>To add favorites, simply click on See More on the game card that you like.</p>
        ) : (
          <>
            {favorites.map((game) => (
              <div key={game.id} className='flex md:flex-row filter flex-col gap-2 md:w-7/12 mx-auto h-fit pr-2 my-5'>
                <img src={game.thumbnail} />
                <div className='py-2 text-center flex flex-col gap-2'>
                  <h1 className=' text-red-600 text-lg'>{game.title}</h1>
                  <p>{game.short_description}</p>
                  <Link className='my-3 text-blue-600' target="_blank" rel="external" href={`https://youtube.com/results?search_query=${game.title} trailer`}>
                    Trailer of Game
                  </Link>
                  <button onClick={() => deleteFavorite(game.id)} className='flex w-fit mx-auto rounded text-red-600 justify-center items-center gap-1'>
                    Remove Favorite
                    <FaTrash />
                  </button>
                </div>

              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
