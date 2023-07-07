'use client';
import { useContext, useEffect, useState } from 'react';
import { db } from '@/services/firebaseConnection';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '@/contexts/auth';
import { DataContext } from '@/contexts/data';
import FavoriteRedirect from '@/app/FavoritesRedirect';
import Loading from './loading';
import HasError from '../hasError';
import Link from 'next/link';
import HalfRating from '@/utils/Rating';
import { StarBorder } from '@mui/icons-material';

export default function Favorites() {
  const { user, signOut } = useContext(AuthContext);
  const { hasError } = useContext(DataContext);
  const [favorites, setFavorites] = useState([]);
  const [value, setValue]= useState(0);
  const [isGameFavorited, setIsGameFavorited] = useState(true);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, 'favorites', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFavorites(docSnap.data().favorites);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [user, favorites, isGameFavorited]);

  const uniqueRatings = Array.from(new Set(favorites.map(game => game.rate))).sort();

  const filteredFavorites = ratingFilter === -1 ? favorites : favorites.filter(game => game.rate === ratingFilter);

  const funnyMessage = "Oops! Looks like your games are shy. None of them match this rating filter. Try a different one! 😄";

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <FavoriteRedirect />;
  }

  if (hasError) {
    return <HasError />;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r text-white">
      <div className="w-10/12 mt-20 md:mt-24 flex flex-col items-center justify-center mx-auto ">
        <div className='flex w-full md:w-5/12 mx-auto justify-between items-center mb-5'>
          <h1 className="text-red-600 text-xl font-bold">Hello, {user.name}</h1>
          {user.avatarUrl !== null ? (
            <div>
              <img src={user.avatarUrl} width="60" height="60" className='object-cover md:hidden rounded-full' />
              <img src={user.avatarUrl} width="150" height="150" className='object-cover md:flex hidden rounded-full' />
            </div>
          ) : <></>}
        </div>
        <p className='text-center text-2xl'>This is your list of favorite games.</p>
        <p className='text-center text-2xl'>You can edit anything you want 😊</p>

        <div className='w-full py-10 flex items-center justify-center text-yellow-600 outline-none font-semibold'>
          {uniqueRatings.length > 0 && (
            <label className='text-red-600 mr-3 outline-none'>Rating Filter:  
              <select value={ratingFilter} className='ml-3 bg-transparent border-b-2 border-red-600 focus:border-red-600 outline-none' onChange={(e) => setRatingFilter(Number(e.target.value))}>
                <option className='text-zinc-900 outline-none' value={-1}>All</option>
                {uniqueRatings.map(rate => (
                  <option className='text-yellow-600 outline-none' key={rate} value={rate}>{rate}</option>
                ))}
              </select>
            </label>
          )}
        </div>

        {filteredFavorites.length === 0 ? (
          <p>{funnyMessage}</p>
        ) : (
          filteredFavorites.map((game) => (
            <div key={game.id} className='flex md:flex-row filter flex-col text-center items-center gap-2 md:w-7/12 mx-auto h-fit pr-2 my-5'>
              <img src={game.thumbnail} />
              <div className='py-2 text-center flex items-center justify-center w-fit mx-auto flex-col gap-2'>
                <h1 className='text-red-600 text-lg'>{game.title}</h1>
                <p>{game.short_description}</p>
                <HalfRating isGameFavorited={isGameFavorited} setIsGameFavorited={setIsGameFavorited} value={game.rate} setValue={setValue} gameId={game.id} filteredData={favorites} user={user} setVisible={setVisible} readOnly={true}/>
                <Link href={game.game_url} target="_blank" rel="noopener noreferrer" className='text-blue-600 cursor-pointer'>
                  Official page
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <div className='py-10 flex items-center justify-center'>
        <button onClick={signOut} className='mt-20 bg-red-600 w-fit mx-auto px-6 font-semibold p-3 rounded-lg'>LogOut</button>
      </div>
    </div>
  );
}
