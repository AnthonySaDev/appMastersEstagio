'use client'
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillCloseCircle, AiOutlineArrowUp } from 'react-icons/ai';
import { IoListCircleOutline } from 'react-icons/io5';
import CardSkeleton from '../../../components/CardSkeleton';
import { GenreFilter } from '../../../components/Filter';
import Modal from '../../../components/Modal';
import SearchComponent from '../../../components/Search';
import { GameCard } from '../../../components/gameCards';

const Cards = ({ data }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visibleCategory, setVisibleCategory] = useState(false);

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
    setVisibleCategory(true);
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
      <div className="flex flex-col justify-center items-center text-center relative ">
        <div className="flex items-end justify-center">
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
        <div className="w-full flex items-center justify-center text-center">
        {selectedGenre !== 'all' && visibleCategory && <div className="w-fit mx-auto my-4 font-bold flex filter px-2 rounded-lg items-center justify-center gap-3">
          <h1>{selectedGenre}</h1>
          <button onClick={() => setSelectedGenre('all')} className="w-5 h-5 rounded-full bg-zinc-300/80 text-red-500 text-sm p-2 text-center flex items-center justify-center">X</button>
        </div>}
        </div>
      </div>
      <h1 className='text-center font-semibold my-5 hidden lg:flex items-center justify-center'>Place your cursor over the card 😉</h1>
      <h1 className='text-center font-semibold my-3 lg:hidden'>Press the card 😉 </h1>
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
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-400 font-bold transition-all duration-700"
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
      {visible && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default Cards;
