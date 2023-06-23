'use client'
import Cards from '@/components/Cards';
import Header from '@/components/Header';
import Image from 'next/image';
import { useContext } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import background from '../../public/background.jpg';
import HasError from './hasError';
import { DataContext } from '@/contexts/data';

export default function Home() {
  const {data, hasError} = useContext(DataContext);
  if (hasError) {
    return (
      <HasError />
    )
  }
  return (
    <div>
        <div className='font-sans'>
          <Header />
          <main id='home'>
            <div className='h-screen relative w-full z-40'>
              <Image
                src={background}
                alt='background'
                className='h-screen w-full object-cover brightness-50 opacity-40'
              />
              <div className='absolute top-0  h-full md:w-7/12 mx-auto'>
                <span className="flex flex-col gap-4 md:items-start items-end  justify-center h-full font-extrabold md:w-5/12 w-9/12 mx-auto">
                  <p className="md:text-[2rem] text-2xl brightness-200">
                    Unleash your gaming potential. Level up your{" "}
                    <span className="text-[#f831ff] animate-pulse">experiencie.</span> Join the excitement!
                  </p>
                  <a href='#games'>
                  <button className='flex whitespace-nowrap items-center justify-center gap-4 text-left w-fit mt-10 pl-6 pr-2 py-2 bg-gradient-to-l from-pink-600 to-purple-800 text-white rounded-lg shadow hover:bg-purple-400 hover:brightness-125 transition-all duration-700'>
                    START NOW
                    <FaArrowCircleDown className='cursor-pointer P-3' size={32} />
                  </button>
                  </a>
                </span>
              </div>
            </div>
            <Cards data={data} />
          </main>

        </div>
   
      <footer className='bg-[#01004e] w-full text-center py-2'>
        <p>Made with by AnthonySá © All rights reserved.</p>
      </footer>
    </div>
  );
}
