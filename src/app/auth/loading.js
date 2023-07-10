import React from 'react';
import { FaCircle } from 'react-icons/fa';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <main className="flex items-center justify-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-3xl text-white font-extrabold mb-4">Loading</h1>
          <div className="flex items-center space-x-2">
            <FaCircle className="text-[#ff0f7b] animate-bounce" size={10} />
            <FaCircle className="text-[#ff0f7b] animate-bounce" size={10} />
            <FaCircle className="text-[#ff0f7b] animate-bounce" size={10} />
          </div>
        </div>
      </main>
      <footer className="text-white font-bold text-sm mt-4 px-2">
      Do you know the definition of insanity?
        <h1 className='text-[#ff0f7b] text-center'>Halo: Reach</h1>
      </footer>
    </div>
  );
}
