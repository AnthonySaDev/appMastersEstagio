'use client'
import { AuthContext } from '@/contexts/auth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { FaHeart, FaHome } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5';
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
      <div className="flex items-center gap-8 w-full px-2 lg:px-5 justify-between relative">

        <motion.div
          initial={{ y: -400 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5 }}
          className=' w-5/12 lg:w-[220px]'
        >
          <Link href="/#home" className={'brightness-[4]'}>
            <Logo />
          </Link>
        </motion.div>

        <motion.nav
          initial={{ opacity:0, x: 800 }}
          animate={{opacity:1, x: 0 }}
          transition={{ duration: 2 }}
          className=" hidden w-8/12 xl:flex items-center font-extrabold justify-between gap-20 text-sm">
          <div className='flex gap-20 items-center justify-center'>
            <Link href='/#games' className="hover:text-pink-600 transition-colors duration-300 w-fit whitespace-nowrap flex items-center gap-2">
              <IoGameController size={25} />
              <p className=" cursor-pointer  ">
                GAMES
              </p>
            </Link>
            <Link href='/favorites' className="hover:text-red-500  w-fit whitespace-nowrap flex items-center gap-2" >
              <FaHeart className='transition-colors duration-300' size={25} />
              <p className="transition-colors duration-300 cursor-pointer  ">
                FAVORITES
              </p>
            </Link>
          </div>
          <div>
            <button onClick={() => setIsVisible(!isVisible)} className='relative w-32 '>
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
                <motion.div 
                initial={{ y: -400 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className='absolute text-xl w-full px-2 py-4 bg-black/90'>
                  {user ?
                    <div className='flex my-10 flex-col items-center justify-center gap-5  font-bold'>
                      <Link href='/account' className='hover:text-orange-600 transition-colors duration-300'>Edit Credentials</Link>
                      <button className='hover:text-orange-600 transition-colors duration-300' onClick={() => signOut()}>Logout</button>
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center gap-2 font-bold'>
                      <Link
                        href='/auth'
                        className="flex items-center justify-center text-center bg-gradient-to-r from-pink-600 to-purple-800 text-white font-bold py-2 rounded mt-4 w-24 text-sm"
                      >
                        Authenticate
                      </Link>
                     
                    </div>
                  }

                </motion.div>
              }
            </button>
          </div>
        </motion.nav>

      </div>

      <motion.section
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1.5 }}
        className="flex xl:hidden text-center transition-all delay-100 cursor-pointer">
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
          <div className="showMenuNav w-full flex items-center justify-center bg-black/90">
            <div className="flex flex-col gap-5 text-center font-extrabold items-start w-1/4 mx-auto justify-around min-h-[100px]">
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
            <div className="w-1/4 mx-auto">
              <button onClick={() => setIsVisible(!isVisible)} className='relative'>
                <span
                  className="hover:text-orange-600 transition-colors duration-300 w-fit whitespace-nowrap flex items-center gap-2"
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
                          Authenticate
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



    </header>
  );
}
