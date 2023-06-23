import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AiFillCloseCircle, AiOutlineArrowUp } from 'react-icons/ai';
import { IoListCircleOutline } from 'react-icons/io5';
import { GenreFilter } from '../Filter';
import { Partciles } from '../Particles';
import SearchComponent from '../Search';
import { GameCard } from '../gameCards';

const Cards = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const itemsPerPage = 6;

  const filteredData = useMemo(() => {
    let updatedData = data;
    if (searchTerm) {
      updatedData = updatedData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedGenre !== 'all') {
      updatedData = updatedData.filter((item) => item.genre === selectedGenre);
    }

    return updatedData;
  }, [data, searchTerm, selectedGenre]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleFilter = (filtered) => {
    setCurrentPage(1);
    setSelectedGenre(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = useMemo(() => filteredData.slice(0, endIndex), [filteredData, endIndex]);
  const genres = Array.from(new Set(data.map((item) => item.genre)));

  return (
    <div  className="md:py-28 py-10" id="games">
      <Partciles />
      <div className="flex justify-center relative items-end">
        <SearchComponent onSearch={handleSearch} />
        <div className="cursor-pointer filter rounded-full p-2 " onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiFillCloseCircle size={25} /> : <IoListCircleOutline size={25} />}
        </div>
        <div className="absolute top-[8.9rem] z-20">
          {isOpen && (
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
        <div className="grid gap-10 justify-center items-center mt-10 w-9/12 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {visibleData.length > 0 ? (
            visibleData.map((item) => <GameCard item={item} key={item.id} />)
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
        <Link href="#games" className="absolute animate-bounce md:right-10 right-1 bg-blue-500 text-white rounded-full p-2 shadow hover:bg-blue-400  transition-all duration-700">
          <AiOutlineArrowUp size={30} />
        </Link>
      </div>
    </div>
  );
};

export default Cards;
