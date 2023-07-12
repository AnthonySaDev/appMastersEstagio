'use client'
import FavoriteRedirect from '@/app/screens/FavoritesRedirect';
import FilterRating from '@/components/FilterRating';
import HalfRating from '@/components/Rating';
import { AuthContext } from '@/contexts/auth';
import { DataContext } from '@/contexts/data';
import { db } from '@/services/firebaseConnection';
import { doc, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { BsSortDown, BsSortUp } from 'react-icons/bs';
import { IoIosRefresh } from 'react-icons/io';
import HasError from '../hasError';
import Loading from './loading';
import { FavoriteCard } from '@/components/FavoriteCards';

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const { data, hasError, loading } = useContext(DataContext);
  const [favorites, setFavorites] = useState([]);
  const [value, setValue] = useState(0);
  const [isGameFavorited, setIsGameFavorited] = useState(true);
  const [visible, setVisible] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(-1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showOptions, setShowOptions] = useState(false);
  const [uniqueRatings, setUniqueRatings] = useState([]);
  const [imageLoaded, setImageLoaded] = useState({});
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      setUserLoading(true);
      const docRef = doc(db, 'favorites', user.uid);
      unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const favoritesData = docSnap.data().favorites;
          const favoritesFromContext = favoritesData.map(fav => ({
            ...data.find(game => game.id === fav.id),
            rate: fav.rate,
          }));
          setFavorites(favoritesFromContext);
          const ratings = Array.from(new Set(favoritesFromContext.map(game => game.rate))).sort();
          setUniqueRatings(ratings);
        }
        setUserLoading(false);
      });
    } else {
      setUserLoading(false);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, [user, data, isGameFavorited]);
  
  const handleSortOrderClick = () => {
    setRatingFilter(-1)
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleOptionClick = (value) => {
    setRatingFilter(value);
    setSortOrder('default');
    setShowOptions(false);
  }

  let ratedFavorites = favorites.filter(game => game.rate > 0 && (ratingFilter === -1 || game.rate === ratingFilter));
  let zeroRatedFavorites = favorites.filter(game => game.rate === 0 && (ratingFilter === -1 || game.rate === ratingFilter));

  if (ratingFilter === -1) {
    if (sortOrder === 'asc') {
      ratedFavorites.sort((a, b) => a.rate - b.rate);
    } else if (sortOrder === 'desc') {
      ratedFavorites.sort((a, b) => b.rate - a.rate);
    }
  }

  let filteredFavorites = [...ratedFavorites, ...zeroRatedFavorites];

  const funnyMessage = "Oops! Looks like your games are shy. None of them match this rating filter. Try a different one! 😄";

  if (loading || userLoading) {
    return <Loading />;
  }

  if (!user) {
    return <FavoriteRedirect />;
  }

  if (hasError) {
    return <HasError />;
  }
  return (
    <div className="flex flex-col pb-10 h-fit bg-gradient-to-r text-white">
      <div className="w-10/12 mt-20 md:mt-24 flex flex-col items-center justify-center mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className='flex w-full md:w-5/12 mx-auto justify-between items-center mb-5'>
            <h1 className="text-red-600 text-xl font-bold">Hello, {user.name}</h1>
            {user.avatarUrl !== null ? (
              <div>
                <motion.img
                  src={user.avatarUrl}
                  width="150"
                  height="150"
                  className='object-cover lg:flex hidden rounded-full mx-10'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1 }}
                />
              </div>
            ) : <></>}
          </div>
          <p className='text-center text-2xl'>This is your list of favorite games.</p>
          <p className='text-center text-2xl'>You can edit anything you want 😊</p>
        </motion.div>

        <div className='w-full py-10 flex items-center justify-center text-yellow-600 outline-none font-semibold '>
          {uniqueRatings.length > 0 && (
            <div className='text-red-600 mr-3 outline-none'>Rating Filter:
              <div className='relative ml-3 bg-transparent border-b-2 border-yeelow-600 focus:border-yellow-500 outline-none' onClick={() => setShowOptions(!showOptions)}>
                <motion.div
                  className="cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  Selected: {ratingFilter == -1 ? (sortOrder == 'asc' ? 'Ascending' : sortOrder == 'desc' ? 'Descending' : 'All Games') : ratingFilter}
                </motion.div>
                {showOptions && (
                 <FilterRating handleOptionClick={handleOptionClick}/>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center">
            <motion.button
              className="bg-transparent text-red-700 mx-2"
              onClick={handleSortOrderClick}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8 }}
            >
              {sortOrder === 'asc' ? <BsSortUp size={35} /> : <BsSortDown size={35} />}
            </motion.button>
          </div>
        </div>

        {filteredFavorites.length === 0 ? (
          <p>{funnyMessage}</p>
        ) : (
        
          filteredFavorites.map((game) => (
           <FavoriteCard
           key={game.id}
           game={game}
           isGameFavorited={isGameFavorited}
           setIsGameFavorited={setIsGameFavorited}
           setValue={setValue}
           favorites={favorites}
           user={user}
           setVisible={setVisible}
           imageLoaded={imageLoaded}
           setImageLoaded={setImageLoaded}
           />
          ))
        )}
      </div>
    </div>
  );
}