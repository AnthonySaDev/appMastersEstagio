'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { FaHeart, FaHome } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5';
import Logo from '../Logo';

export default function Header() {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const screenHeight = window.innerHeight;
      const threshold = screenHeight - 100;

      if (scrollPosition > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header className={`top-0 font-sans fixed w-full text-white text-xs tracking-widest z-50 items-center flex px-8 justify-around py-5 ${isScrolled ? 'bg-black transition-all duration-200 ease-in-out' : ''}`} style={{ backgroundImage: 'transparent' }}>
      <div className="flex items-center gap-8 w-full md:px-5 justify-between">
        <motion.div
          initial={{ y: -400 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5 }}
          className=' w-2/4 lg:w-[250px]'
        >
          <Link href="/#home" className={'brightness-[4]'}>
            <Logo/>
          </Link>
        </motion.div>
        <motion.nav
          initial={{ x: 800 }}
          animate={{ x: 0 }}
          transition={{ duration: 2 }}
          className=" hidden w-8/12  lg:flex items-center font-extrabold justify-around gap-10 text-sm">
          <Link href='/#home' className="hover:text-green-600 transition-colors duration-300 w-fit whitespace-nowrap flex items-center gap-2 " >
            <FaHome size={25} />
            <p className=" cursor-pointer ">
              HOME
            </p>
          </Link>
          <Link href='/#games' className="hover:text-pink-600 transition-colors duration-300 w-fit whitespace-nowrap flex items-center gap-2">
            <IoGameController size={25} />
            <p className=" cursor-pointer ">
              GAMES
            </p>
          </Link>
          <Link href='/account' className="hover:text-orange-600 transition-colors duration-300 w-fit whitespace-nowrap flex items-center gap-2">
            <BsPersonFill size={25} />
            <p className=" cursor-pointer  ">
              ACCOUNT
            </p>
          </Link>
          <Link href='/favorites' className="hover:text-red-500  w-fit whitespace-nowrap flex items-center gap-2" >
            <FaHeart className='transition-colors duration-300' size={25} />
            <p className="transition-colors duration-300 cursor-pointer ">
              FAVORITES
            </p>
          </Link>

        </motion.nav>
      </div>

      <motion.section
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1.5 }}
        className="flex text-right lg:hidden transition-all delay-100 cursor-pointer">
        <div
          className="space-y-2 "
          onClick={() => {
            setIsNavOpen((prev) => !prev)
            setIsScrolled(true)
          }}
        >
          {!isNavOpen ?
            <>
              <p className="block h-0.5 w-8 animate-pulse bg-[#66f8ff]"></p>
              <p className="block h-0.5 w-8 animate-pulse bg-[#66f8ff]"></p>
              <p className="block h-0.5 w-8 animate-pulse bg-[#66f8ff]"></p>
            </>
            :
            <div
              onClick={() => {
                setIsNavOpen((prev) => prev)
                setIsScrolled(false);
              }}
              className="flex items-center justify-center"
            >
              <svg
                className="h-8 w-10  text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="10" x2="10" y2="22" />
                <line x1="10" y1="10" x2="22" y2="22" />
              </svg>
            </div>
          }
        </div>

        {isNavOpen && (
          <div className="showMenuNav">
            <div className="flex flex-col gap-5 text-right font-extrabold items-start justify-around min-h-[100px]">
              <Link href='/#home'>
                <span
                  className="hover:text-green-600 transition-colors duration-300 w-fit whitespace-nowrap flex items-center gap-2"
                  onClick={() => setIsNavOpen(false)}
                >
                  <FaHome size={25} />
                  <p className="cursor-pointer">HOME</p>
                </span>
              </Link>
              <Link href='/#games'>
                <span
                  className="hover:text-pink-600 transition-colors duration-300 w-fit whitespace-nowrap flex items-center gap-2"
                  onClick={() => setIsNavOpen(false)}
                >
                  <IoGameController size={25} />
                  <p className="cursor-pointer">GAMES</p>
                </span>
              </Link>
              <Link href='/account'>
                <span
                  className="hover:text-orange-600 transition-colors duration-300 w-fit whitespace-nowrap flex items-center gap-2"
                  onClick={() => setIsNavOpen(false)}
                >
                  <BsPersonFill size={25} />
                  <p className="cursor-pointer">ACCOUNT</p>
                </span>
              </Link>
              <Link href='/favorites'>
                <span
                  className="hover:text-red-500 w-fit whitespace-nowrap flex items-center gap-2"
                  onClick={() => setIsNavOpen(false)}
                >
                  <FaHeart className='transition-colors duration-300' size={25} />
                  <p className="transition-colors duration-300 cursor-pointer">FAVORITES</p>
                </span>
              </Link>

            </div>
          </div>
        )}
      </motion.section>

      <style jsx>{`
.hideMenuNav {
  display: none;
}

.showMenuNav {
  display: flex;
  position: absolute;
  top: 4rem;
  right: 0rem;
  color: white;
  background: ${isScrolled ? '#00060e' : 'transparent'};
  z-index: 99;
  animation: fadeInDown 0.5s ease-in-out;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  justify-content: flex-start;
  padding: 1.5rem;
  text-align: left;
}


@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-50px) rotateX(-90deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

      `}</style>

    </header>
  );
}
