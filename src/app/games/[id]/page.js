'use client'
import HasError from '@/app/hasError';
import { AuthContext } from '@/contexts/auth';
import { DataContext } from '@/contexts/data';
import { db } from '@/services/firebaseConnection';
import { addFavorite } from '@/utils/AddFavorite';
import { checkFavorite } from '@/utils/CheckFavorite';
import HalfRating from '@/utils/Rating';
import { collection, doc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Games({ params }) {
  const { data, hasError } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [isGameFavorited, setIsGameFavorited] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(null);
  const router = useRouter();

  const filteredData = data.filter((item) => item.id === Number(params.id));
  const favoriteId = Number(params.id);

  useEffect(() => {
    checkFavorite(favoriteId, user, setIsGameFavorited);
  }, [user, favoriteId, setIsGameFavorited]);



  const handleRating = async (rate) => {
    if (!user) {
      toast.warn('Você precisa estar autenticado para avaliar um jogo, acesse sua conta.');
      setVisible(true);
      return;
    }

    try {
      const gameRef = doc(collection(db, 'games'), String(favoriteId));
      await setDoc(gameRef, { rating: rate }, { merge: true });

      setRating(rate);
      toast.success('Avaliação salva com sucesso!');
    } catch (error) {
      toast.error('Algo deu errado ao salvar sua avaliação.');
    }
    setRating(rate);
  };

  const handleGoBack = () => {
    router.push('/#games');
  };

  if (hasError) {
    return <HasError />;
  }

  return (
    <div className="font-sans">
      <div className="flex h-fit md:h-screen md:max-w-10/12 mx-auto mb:pb-0 bg-transparent flex-col md:flex-col-reverse items-center justify-center">

        {filteredData.map((item) => (
          <div
            key={item.id}
            className="rounded-lg bg-transparent p-8 mt-20 h-fit flex flex-col animate-fade-in-down"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="mx-auto h-auto object-cover"
            />
            <div>
              <h1 className="text-4xl font-semibold text-yellow-400 text-center my-4">
                {item.title}
              </h1>
              <p className="text-lg text-white break-words"><strong className='text-xl'>Genre: </strong> {item.genre}</p>
              <p className="text-lg text-white break-words">
                <strong className='text-xl'>Developed by: </strong> {item.developer}
              </p>
              <p className="text-lg text-white break-words">
              <strong className='text-xl'>Published for: </strong> {item.publisher}
              </p>
              <p className="text-lg text-white break-words">
              <strong className='text-xl'>Available for: </strong> {item.platform}
              </p>
              <p className="text-lg text-white break-words">
              <strong className='text-xl'>description: </strong> {item.short_description}
              </p>
              <p className="text-lg text-white break-words">
              <strong className='text-xl'>Relesade date: </strong> {item.release_date}
              </p>
              <div className="flex items-center w-full justify-center font-semibold my-2 gap-3 text-lg text-blue-600">
                <Link href={item.game_url} target="_blank" rel="noopener noreferrer">
                  Official page
                </Link>
                <Link href={item.freetogame_profile_url} target="_blank" rel="noopener noreferrer">
                  Freetogame
                </Link>
                <Link className='my-3 text-blue-600' target="_blank" rel="external" href={`https://youtube.com/results?search_query=${item.title} trailer`}>
                  Trailer
                </Link>
              </div>
              <div className='w-fit mx-auto'>
                <HalfRating />
              </div>
            </div>
            <div className="flex w-full justify-center items-center gap-4">
              <button
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleGoBack}
              >
                <FiArrowLeft className="mr-2" />
                Back
              </button>

              <button
                className={`flex items-center ${isGameFavorited ? 'bg-zinc-600' : 'bg-red-600 hover:bg-red-500'
                  } text-white font-bold py-2 px-4 rounded mt-4`}
                onClick={() => addFavorite(favoriteId, filteredData, user, setVisible, setIsGameFavorited)}
                disabled={isGameFavorited}
              >
                <FiHeart className="mr-2" color={isGameFavorited ? "red" : ""} />
                {isGameFavorited ? 'Favorited' : 'Favorite'}
              </button>

            </div>
            {visible && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 z-50">
                <div className="bg-white text-zinc-800 p-8 rounded shadow-md relative w-fit mx-auto text-center">
                  <button onClick={closeModal} className="absolute top-0 right-0 p-2 m-2 cursor-pointer bg-red-600 w-fit px-6 py-2 rounded-lg text-white font-bold">
                    Close
                  </button>
                  <h2 className="text-xl font-bold mb-4">Hello there!</h2>
                  <p>You need to sign in or register to edit items</p>
                  <div className="flex items-center justify-center gap-5">
                    <motion.button
                      initial={{ x: 500 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.9 }}
                      onClick={() => {
                        router.push('/login');
                      }}
                      className="flex items-center bg-gradient-to-r from-pink-600 to-purple-800 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Login
                    </motion.button>
                    <motion.button
                      initial={{ x: -500 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.9 }}
                      onClick={() => {
                        router.push('/register');
                      }}
                      className="flex items-center bg-gradient-to-l from-pink-600 to-purple-800 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Register
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}