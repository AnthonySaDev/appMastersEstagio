'use client'
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillCloseCircle, AiOutlineArrowUp } from 'react-icons/ai';
import { IoListCircleOutline } from 'react-icons/io5';
import { GenreFilter } from '../Filter';
import { Partciles } from '../Particles';
import SearchComponent from '../Search';
import CardSkeleton from '../CardSkeleton';
import { GameCard } from '../gameCards';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Cards = ({ data }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const filterData = useCallback((updatedData) => {
    if (searchTerm) {
      updatedData = updatedData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedGenre !== 'all') {
      updatedData = updatedData.filter((item) => item.genre === selectedGenre);
    }
    return updatedData;
  }, [searchTerm, selectedGenre]);

  const filteredData = useMemo(() => filterData(data), [filterData, data]);

  const handleLoadMore = useCallback(() => setCurrentPage((prevPage) => prevPage + 1), []);

  const handleFilter = useCallback((filtered) => {
    setSelectedGenre(filtered);
    setIsOpen(false);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const toggleIsOpen = useCallback(() => setIsOpen((prevIsOpen) => !prevIsOpen), []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleData = useMemo(() => filteredData.slice(0, endIndex), [filteredData, endIndex]);

  const genres = useMemo(() => Array.from(new Set(data.map((item) => item.genre))), [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setVisible(false);
  }

  return (
    <div className="md:py-28 py-10" id="games">
      <Partciles />
      <div className="flex justify-center relative items-end">
        <SearchComponent onSearch={handleSearch} />
        <div
          className="cursor-pointer filter rounded-full p-2 "
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <AiFillCloseCircle size={25} />
          ) : (
            <IoListCircleOutline size={25} />
          )}
        </div>
        <div className="absolute top-[8.9rem] z-20">
          {toggleIsOpen && (
            <GenreFilter
              selectedGenre={selectedGenre}
              handleFilter={handleFilter}
              genres={genres}
              isOpen={isOpen}
            />
          )}
        </div>
      </div>
      <div>
        <div className="grid gap-20 justify-center items-center mt-10 w-9/12 mx-auto sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
            : visibleData.length > 0 ? (
              visibleData.map((item) => (
                <GameCard item={item} key={item.id} filteredData={visibleData} setVisible={setVisible} />
              ))
            ) : (
              <div className="text-white text-center py-20">
                <p>I promise, Im trying to find them 😘.</p>
              </div>
            )}
        </div>
      </div>
      <div className="flex justify-center items-center relative mt-5">
        {filteredData.length > endIndex && (
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-400  transition-all duration-700"
          >
            Load More
          </button>
        )}
        <Link
          href="#games"
          className="absolute animate-bounce md:right-10 right-1 bg-blue-500 text-white rounded-full p-2 shadow hover:bg-blue-400  transition-all duration-700"
        >
          <AiOutlineArrowUp size={30} />
        </Link>
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
  );
};

export default Cards;
