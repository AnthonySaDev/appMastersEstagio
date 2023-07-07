import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
export default function SearchComponent({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    onSearch(searchValue);
  };

  return (
    <div className="flex flex-col items-center text-black">
      
    <h1 className='text-2xl font-bold mt-10 mb-5 text-white'>Search your games:</h1>
      <div className="relative">
      <div className="relative">
              <input 
              value={searchTerm}
                onChange={handleSearch} 
                type="text" 
                id="name" 
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-zinc-600 appearance-none  dark:border-zinc-500 dark:focus:border-pink-600 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" " />
              
              <label 
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#060623] px-2 peer-focus:px-2 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Search</label>
            </div>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaSearch />
        </div>
      </div>
    </div>
  );
}
