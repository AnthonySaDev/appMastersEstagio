'use client'
import HasError from '@/app/hasError';
import Header from '@/components/Header';
import { AuthContext } from '@/contexts/auth';
import { DataContext } from '@/contexts/data';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Games({ params }) {
  const { data, hasError } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const filteredData = data.filter((item) => item.id === Number(params.id));

  const addFavorite = () => {
    if (!user) {
      toast.warn("You need to be authenticated to favorite a game, access your account.");
      return;
    }

    const favoriteId = Number(params.id);
    const myList = localStorage.getItem("@games");
    let savedGames = JSON.parse(myList) || [];

    const hasGame = savedGames.some((savedGame) => savedGame.id === favoriteId);
    if (hasGame) {
      toast.warn("Game already added to the list.");
      return;
    }

    const gameToAdd = filteredData.find((game) => game.id === favoriteId);
    savedGames.push(gameToAdd);

    localStorage.setItem("@games", JSON.stringify(savedGames));
    toast.success("Game saved successfully.");
  };


  const handleGoBack = () => {
    router.push('/#games');
  };

  if (hasError) {
    return (
      <HasError />
    )
  }

  return (
    <div className="font-sans">
      <div className="flex h-fit md:h-screen md:max-w-10/12 mx-auto mb:pb-0 bg-transparent flex-col md:flex-col-reverse items-center justify-center">
        <Header />
        {filteredData.map((item) => (
          <div key={item.id} className="rounded-lg bg-transparent p-8 mt-20 h-fit flex flex-col animate-fade-in-down">
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
                <a href={item.game_url} target="_blank" rel="noopener noreferrer">Official page</a>
                <a href={item.freetogame_profile_url} target="_blank" rel="noopener noreferrer">Freetogame</a>
              </div>
            </div>
            <div className='flex w-full justify-center items-center gap-4'>
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
        ))}
      </div>
    </div>
  );
}
