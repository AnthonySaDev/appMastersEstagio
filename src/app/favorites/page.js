'use client';
import FavoriteRedirect from '@/app/FavoritesRedirect';
import { AuthContext } from '@/contexts/auth';
import { DataContext } from '@/contexts/data';
import { db } from '@/services/firebaseConnection';
import HalfRating from '@/utils/Rating';
import { StarBorder } from '@mui/icons-material';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import HasError from '../hasError';
import Loading from './loading';

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const { hasError } = useContext(DataContext);
  const [favorites, setFavorites] = useState([]);
  const [value, setValue] = useState(0);
  const [isGameFavorited, setIsGameFavorited] = useState(true);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(-1);
  const [sortOrder, setSortOrder] = useState('default'); // State for sorting
  const [showOptions, setShowOptions] = useState(false);

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

  const handleOrderClick = (order) => {
    setRatingFilter(-1);
    setSortOrder(order);
    setShowOptions(false);
  }

  const handleOptionClick = (value) => {
    setRatingFilter(value);
    setSortOrder('default'); 
    setShowOptions(false);
  }

  let filteredFavorites = favorites
    .filter(game => ratingFilter === -1 || game.rate === ratingFilter);
  if (ratingFilter === -1) {
    if (sortOrder === 'asc') {
      filteredFavorites.sort((a, b) => a.rate - b.rate);
    } else if (sortOrder === 'desc') {
      filteredFavorites.sort((a, b) => b.rate - a.rate);
    }
  }

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

        <div className='w-full py-10 flex items-center justify-center text-yellow-600 outline-none font-semibold '>
          {uniqueRatings.length > 0 && (
            <div className='text-red-600 mr-3 outline-none'>Rating Filter:
              <div className='relative ml-3 bg-transparent border-b-2 border-red-600 focus:border-red-600 outline-none' onClick={() => setShowOptions(!showOptions)}>
                <div className="cursor-pointer">
                  Selected: {ratingFilter == -1 ? (sortOrder == 'asc' ? 'Ascending' : sortOrder == 'desc' ? 'Descending' : 'All Games') : ratingFilter}
                </div>
                {showOptions && (
                  <ul className="absolute w-64 p-2 mt-2 bg-[#060623] text-yellow-600 py-5 rounded shadow top-full z-30">
                    <li className='cursor-pointer' onClick={() => handleOptionClick(-1)}>
                      All Games
                    </li>
                    <li className='cursor-pointer' onClick={() => handleOrderClick('asc')}>
                      Ascending
                    </li>
                    <li className='cursor-pointer' onClick={() => handleOrderClick('desc')}>
                      Descending
                    </li>
                    <li className='cursor-pointer' onClick={() => handleOptionClick(0)}>
                      <StarBorder style={{ color: '#ccc' }} />
                      <StarBorder style={{ color: '#ccc' }} />
                      <StarBorder style={{ color: '#ccc' }} />
                      <StarBorder style={{ color: '#ccc' }} />
                      <StarBorder style={{ color: '#ccc' }} />
                    </li>
                    <li className='cursor-pointer' onClick={() => handleOptionClick(1)}>
                      <StarBorder />
                      <StarBorder style={{ color: '#ccc' }} />
                      <StarBorder style={{ color: '#ccc' }} />
                      <StarBorder style={{ color: '#ccc' }} />
                      <StarBorder style={{ color: '#ccc' }} />
                    </li>
                    <li className='cursor-pointer' onClick={() => handleOptionClick(2)}>
                      <StarBorder />
                      <StarBorder />
                      <StarBorder style={{ color: '#ccc' }} />
                      <StarBorder style={{ color: '#ccc' }} />
                      <StarBorder style={{ color: '#ccc' }} />
                    </li>
                    <li className='cursor-pointer' onClick={() => handleOptionClick(3)}>
                      <StarBorder />
                      <StarBorder />
                      <StarBorder />
                      <StarBorder style={{ color: '#ccc' }} />
                      <StarBorder style={{ color: '#ccc' }} />
                    </li>
                    <li className='cursor-pointer' onClick={() => handleOptionClick(4)}>
                      <StarBorder />
                      <StarBorder />
                      <StarBorder />
                      <StarBorder />
                      <StarBorder style={{ color: '#ccc' }} />
                    </li>
                    <li className='cursor-pointer' onClick={() => handleOptionClick(5)}>
                      <StarBorder />
                      <StarBorder />
                      <StarBorder />
                      <StarBorder />
                      <StarBorder />
                    </li>
                  </ul>
                )}
              </div>
            </div>
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
                <HalfRating isGameFavorited={isGameFavorited} setIsGameFavorited={setIsGameFavorited} value={game.rate} setValue={setValue} gameId={game.id} filteredData={favorites} user={user} setVisible={setVisible} readOnly={true} />
                <Link href={game.game_url} target="_blank" rel="noopener noreferrer" className='text-blue-600 cursor-pointer'>
                  Official page
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
