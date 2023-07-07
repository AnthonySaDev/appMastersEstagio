import { AnimatePresence, motion } from "framer-motion";
export const GenreFilter = ({ selectedGenre, handleFilter, genres, isOpen }) => {
  return (
    <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        exit={{ y: 500 }}
        transition={{ duration: 0.9 }}
        className={`grid grid-cols-2 filter rounded-lg items-center gap-2 pb-2 px-2`}
      >
      <div
        className={`text-white cursor-pointer hover:text-[#7cbcff] text-sm py-2 px-3 text-center focus:outline-none ${selectedGenre === 'all' ? 'bg-blue-900' : 'transparent'
          }`}
        onClick={() => handleFilter('all')}
      >
        All
      </div>
      {genres.map((genre) => (
        <div
          key={genre}
          className={`text-white cursor-pointer hover:text-[#7cbcff] text-sm py-2 px-3 text-center font-bold focus:outline-none ${selectedGenre === genre ? 'bg-blue-900' : 'bg-transparent'
            }`}
          onClick={() => handleFilter(genre)}
        >
          {genre}
        </div>
      ))}
      </motion.div>
         )}
    </AnimatePresence>
  );
};