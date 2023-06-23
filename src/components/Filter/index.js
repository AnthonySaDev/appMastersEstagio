import { useEffect, useState } from 'react';

const FilterComponent = ({ data, onFilter }) => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const uniqueGenres = [...new Set(data.map(item => item.genre))];
    setGenres(uniqueGenres);
    setIsLoading(false);
  }, [data]);

  const handleFilterChange = genre => {
    setSelectedGenre(genre);
    onFilter(genre);
  };

  return (
    <div className='bg-black md:bg-transparent py-2 w-10/12'>
      <p className='text-xl font-bold px-2 text-center my-2'>Filter by Genre:</p>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading genres...</p>
      ) : (
        <ul className="md:flex md:flex-col grid grid-cols-2 items-center justify-center py-2 overflow-y-auto space-y-2">
          <li
            key="all"
            className={`cursor-pointer px-2 ${selectedGenre === 'all' ? 'font-bold text-[#3784fa]' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Genres
          </li>
          {genres.map(genre => (
            <li
              key={genre}
              className={`cursor-pointer px-2 ${selectedGenre === genre ? 'font-bold text-[#3784fa]' : ''}`}
              onClick={() => handleFilterChange(genre)}
            >
              {genre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterComponent;
