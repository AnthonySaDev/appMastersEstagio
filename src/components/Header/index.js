'use client'
import { AuthContext } from '@/contexts/auth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { FaHeart, FaHome } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5';
import avatar from '../../../public/jettAvatar.jpg';
import Logo from '../Logo';
export default function Header() {
  const { user, signOut } = useContext(AuthContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState();
  useEffect(()=>{
    if(user){
      setAvatarUrl(user.avatarUrl);
    }
  },[user])
  return (
    <header className={`top-0 font-sans fixed w-full text-white text-xs tracking-widest z-50 items-center flex px-8 justify-around py-5 bg-black/90`}>
      <div className="flex items-center gap-8 w-full md:px-5 justify-between">

        <motion.div
          initial={{ y: -400 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5 }}
          className=' w-2/4 lg:w-[220px]'
        >
          <Link href="/#home" className={'brightness-[4]'}>
            <Logo />
          </Link>
        </motion.div>

        <motion.nav
          initial={{ x: 800 }}
          animate={{ x: 0 }}
          transition={{ duration: 2 }}
          className=" hidden w-8/12 lg:flex items-center font-extrabold justify-between gap-20 text-sm">
          <div className='flex gap-20 items-center justify-center'>
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
            <Link href='/favorites' className="hover:text-red-500  w-fit whitespace-nowrap flex items-center gap-2" >
              <FaHeart className='transition-colors duration-300' size={25} />
              <p className="transition-colors duration-300 cursor-pointer ">
                FAVORITES
              </p>
            </Link>
          </div>
          <div>
            <button onClick={() => setIsVisible(!isVisible)} className='relative w-28 '>
              <span
                className="hover:text-orange-600 transition-colors duration-300 w-fit whitespace-nowrap flex items-center gap-6"
              >
                {
                  user ? 
                  <>
                {avatarUrl === null ? 
                <BsPersonFill size={30}/>
                :
                <img src={avatarUrl} className='w-16 h-16 rounded-full' alt="Foto de perfil do usuario" />
              }
                  </>
              :
              <BsPersonFill color='' size={30}/>
            }
                <p className="cursor-pointer font-bold">{!user ? "ACCOUNT" : user.name}</p>
              </span>
              {isVisible &&
                <div className='absolute text-lg w-full bg-black/90'>
                  {user ?
                    <div className='flex my-10 flex-col items-center justify-center gap-5  font-bold'>
                      <Link href='/account' className='hover:text-orange-600 transition-colors duration-300'>Edit Credentials</Link>
                      <button className='hover:text-orange-600 transition-colors duration-300' onClick={() => signOut()}>Logout</button>
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center gap-2 font-bold'>
                      <Link
                        href='/auth'
                        className="flex items-center justify-center text-center bg-gradient-to-r from-pink-600 to-purple-800 text-white font-bold py-2 px-4 rounded mt-4"
                      >
                        Login
                      </Link>
                      <Link
                        href='/register'
                        className="flex items-center justify-center text-center bg-gradient-to-l from-pink-600 to-purple-800 text-white font-bold py-2 px-4 rounded mt-4"
                      >
                        Register
                      </Link>
                    </div>
                  }

                </div>
              }
            </button>
          </div>
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
          <div className="showMenuNav w-full flex items-center justify-center gap-20 bg-black/90">
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
            <div>
              <button onClick={() => setIsVisible(!isVisible)} className='relative'>
                <span
                  className="hover:text-orange-600 transition-colors duration-300 w-fit whitespace-nowrap flex items-center gap-2"
                >
                  {!user ? <BsPersonFill size={25} /> : <img src={user.avatarUrl !== null || user.avatarUrl !== '' ? user.avatarUrl : avatar} className='w-16 h-16 rounded-full' />}

                  <p className="cursor-pointer font-bold">{!user ? "ACCOUNT" : user.name}</p>
                </span>
                {isVisible &&
                  <div>
                    {user ?
                      <div className='flex my-2 flex-col items-center justify-center gap-5  font-bold'>
                        <Link className='hover:text-orange-600 transition-colors duration-300' href='/account'>Edit Credentials</Link>
                        <button className='hover:text-orange-600 transition-colors duration-300' onClick={() => signOut()}>Logout</button>
                      </div>
                      :
                      <div className='flex flex-col items-center justify-center gap-2 font-bold'>
                        <Link
                          href='/auth'
                          className="flex items-center justify-center text-center bg-gradient-to-r from-pink-600 to-purple-800 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                          Login
                        </Link>
                        <Link
                          href='/register'
                          className="flex items-center justify-center text-center bg-gradient-to-l from-pink-600 to-purple-800 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                          Register
                        </Link>
                      </div>
                    }

                  </div>
                }
              </button>
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
  background:'black';
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
