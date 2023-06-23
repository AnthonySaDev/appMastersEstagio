'use client'
import Header from '@/components/Header';
import { api } from '@/data/api';
import { useEffect, useState } from 'react';
import Loading from '../../loading';
import HasError from '@/app/hasError';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Games({ params }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/`);
        const newData = response.data.filter(item => item.id === Number(params.id));
        setData(newData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setHasError(true);
        setLoading(true);
      }
    };

    fetchData();
  }, [params.id]);

  const addFavorite = () => {
    toast.warn("Building...")
  }

  const handleGoBack = () => {
    router.back();
  };

  if (hasError) {
    return (
      <HasError/>
    );
  }

  return (
    <div className='font-sans'>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex bg-black h-fit md:h-screen pb-10 mb:pb-0 bg-opacity-75 flex-col md:flex-col-reverse items-center justify-center">
          <Header />
          {data.map((item) => (
            <div key={item.id} className="bg-black bg-opacity-75 rounded-lg p-8 mt-20 mb-6 flex flex-col animate-fade-in-down">
              <img src={item.thumbnail} alt={item.title} className="mx-auto h-auto object-cover" />
              <div>
                <h1 className="text-4xl font-semibold text-yellow-400 text-center my-4">{item.title}</h1>
                <p className="text-lg text-white break-words">Genre: {item.genre}</p>
                <p className="text-lg text-white break-words">Developed by: {item.developer}</p>
                <p className="text-lg text-white break-words">Published for: {item.publisher}</p>
                <p className="text-lg text-white break-words">Available for: {item.platform}</p>
                <p className="text-lg text-white break-words">Description: {item.short_description}</p>
                <p className="text-lg text-white break-words">Release date: {item.release_date}</p>
                <div className='flex items-center w-full justify-center my-2 gap-3 text-lg text-blue-600'>
                  <a href={item.game_url} target="_blank" rel="noopener noreferrer">Official page link</a>
                  <a href={item.freetogame_profile_url} target="_blank" rel="noopener noreferrer">Freetogame link</a>
                </div>
              </div>
            </div>
          ))}
          <div className='flex items-center gap-4'>
          <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleGoBack}>
            <FiArrowLeft className="mr-2" />
            Voltar
          </button>
          <button className="flex items-center bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={addFavorite}>
            <FiHeart className="mr-2" />
            Favoritar
          </button>
        </div>
        </div>
      )}
    </div>
  );
}
