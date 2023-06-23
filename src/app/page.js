'use client'
import Cards from '@/components/Cards';
import Header from '@/components/Header';
import { api } from '@/data/api';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import background from '../../public/background.jpg';
import Loading from './loading';
import HasError from './hasError';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/');
        const newData = response.data;
        setData(newData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setHasError(true);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  if (hasError) {
    return (
      <HasError />
    )
      ;
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className='font-sans'>
          <Header />
          <main id='home'>
            <div className='h-screen relative w-full z-40'>
              <Image
                src={background}
                alt='background'
                className='h-screen w-full object-cover brightness-50'
              />
              <div className='absolute top-0  h-full md:w-7/12 mx-auto'>
                <span className="flex flex-col gap-4 md:items-start items-end  justify-center h-full font-extrabold md:w-5/12 w-9/12 mx-auto">
                  <p className="text-[2rem] brightness-200">
                    Unleash your gaming potential. Level up your{" "}
                    <span className="text-[#97399a] animate-pulse">experiencie.</span> Join the excitement!
                  </p>
                  <a href='#games'>
                  <button className='flex whitespace-nowrap items-center justify-center gap-4 text-left w-fit mt-10 pl-6 pr-2 py-2 bg-gradient-to-r from-blue-900 to-blue-700 brightness-100 text-white rounded-3xl shadow hover:bg-blue-400 hover:brightness-150 transition-all duration-700'>
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
      )}
      <footer className='bg-[#01004e] w-full text-center py-2'>
        <p>Made with by AnthonySá © All rights reserved.</p>
      </footer>
    </div>
  );
}
