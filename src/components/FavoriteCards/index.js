// FavoriteGame.js
import { motion } from 'framer-motion';
import HalfRating from '@/components/Rating';
import { IoIosRefresh } from 'react-icons/io';

export const FavoriteCard = ({ game, isGameFavorited, setIsGameFavorited, setValue, favorites, user, setVisible, imageLoaded, setImageLoaded }) => {
  return (
    <motion.div
      key={game.id}
      className='flex lg:flex-row filter flex-col text-center items-center gap-2 md:w-7/12 mx-auto h-fit pr-2 my-5'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {!imageLoaded[game.id] && (
        <div className='w-1/2 flex items-center justify-center text-center'>
          <IoIosRefresh className="animate-spin text-red-600 text-4xl" />
        </div>
      )}
      <motion.img
        src={game.thumbnail}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        onLoad={() => setImageLoaded(prevState => ({...prevState, [game.id]: true}))}
        className='h-full w-full xl:w-[300px] object-cover'
      />
      <div className='py-2 text-center flex items-center justify-center w-fit mx-auto flex-col gap-2'>
        <motion.h1
          className='text-red-600 text-lg'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {game.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {game.short_description}
        </motion.p>
        <HalfRating
          isGameFavorited={isGameFavorited}
          setIsGameFavorited={setIsGameFavorited}
          value={game.rate}
          setValue={setValue}
          gameId={game.id}
          filteredData={favorites}
          user={user}
          setVisible={setVisible}
          readOnly={true}
          disabled={true}
        />
      </div>
    </motion.div>
  );
};


