'use client'
import FavoriteRedirect from '@/app/FavoritesRedirect';
import { AuthContext } from '@/contexts/auth';
import { DataContext } from '@/contexts/data';
import { db } from '@/services/firebaseConnection';
import { deleteFavorite } from '@/utils/DeleteFavorite';
import { doc, getDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import HasError from '../hasError';
import Loading from './loading';

export default function Favorites() {
  const { user, signOut } = useContext(AuthContext);
  const { hasError } = useContext(DataContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, 'favorites', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFavorites(docSnap.data().favorites);
        } else {
        }
      }
      setLoading(false);
    };
    
    fetchData();
  }, [user]);


  const handleDeleteFavorite = async (gameId) => {
    const removedGame = await deleteFavorite(gameId, user);
    if (removedGame) {
      setFavorites((prevFavorites) => prevFavorites.filter((game) => game.id !== removedGame.id));
    }
  };


  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <FavoriteRedirect />;
  }

  
  if (hasError) {
    return (
      <HasError />
    )
  }
  return (
    <div className="flex flex-col  h-screen bg-gradient-to-r text-white">

      <div className="w-10/12 mt-20 md:mt-24 flex flex-col items-center justify-center mx-auto ">
        <div className='flex w-full md:w-5/12 mx-auto justify-between items-center mb-5'>
          <h1 className="text-red-600 text-xl font-bold">Hello, {user.name}</h1>
          {user.avatarUrl !== null ?
          <div>
            <img src={user.avatarUrl} width="60" height="60" className='object-cover md:hidden rounded-full' />
            <img src={user.avatarUrl} width="150" height="150" className='object-cover md:flex hidden rounded-full' />
          </div> : <></>}
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
                
                  <button onClick={() => handleDeleteFavorite(game.id)} className='flex w-fit mx-auto rounded text-red-600 justify-center items-center gap-1'>
                    Remove Favorite
                    <FaTrash />
                  </button>
                </div>

              </div>
            ))}
          </>
        )}
      </div>
      <div className='py-10 flex items-center justify-center'>
          <button onClick={signOut} className='mt-20 bg-red-600 w-fit mx-auto px-6 font-semibold p-3 rounded-lg'>LogOut</button>
      </div>
    </div>
  );
}
