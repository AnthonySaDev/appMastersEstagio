import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Head from 'next/head';
export default function SearchComponent({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    onSearch(searchValue);
  };

  return (
    <div className="flex flex-col items-center text-black">
      
    <h1 className='text-2xl font-bold mt-10 mb-5 text-white font-ttoctosquares'>Search your games:</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border text-black border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaSearch />
        </div>
      </div>
    </div>
  );
}
