import { motion } from "framer-motion";
import Image from "next/image";
import borda from '../../../public/borda.png'
import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";

export const GameCard = ({ item }) => {
    return (
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9 }}
        key={item.id}
        className="text-sm h-fit relative shadow-md"
      >
        <Image src={borda} className="w-full h-full object-cover brightness-150 shadow-2xl" />
        <div className="absolute bg-transparent top-0 left-0 w-full h-full">
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="w-full h-[50%] lg:h-auto mb-1">
            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col h-full pb-3 justify-evenly">
              <h1 className="md:text-xl text-sm font-extrabold text-center">{item.title}</h1>
              <div className="w-full  flex flex-col gap-3 text-zinc-300">
                <span className="font-semibold pl-3 flex items-center gap-2">
                  <p className="text-white">Genre: </p>
                  <p className="font-thin text-white text-xs ">{item.genre}</p>
                </span>
                <span className="font-semibold pl-3 flex items-center gap-2">
                  <p className="text-white">Platform:</p>
                  <p className="font-thin text-white text-xs">{item.platform}</p>
                </span>
                <span className="font-semibold pl-3 flex items-center gap-2">
                  <p className="text-white">Developer: </p>
                  <p className="font-thin text-white text-xs">{item.developer}</p>
                </span>
                <span className="font-semibold pl-3 flex items-center gap-2">
                  <p className="text-white">Release date: </p>
                  <p className="font-thin text-white text-xs">{item.release_date}</p>
                </span>
  
                <Link href={`/games/${item.id}`} className="flex font-bold mt-2 gap-4 items-center justify-center w-fit mx-auto py-3 px-6 bg-gradient-to-r from-pink-600 to-purple-800 text-white rounded-lg shadow hover:bg-purple-400 hover:brightness-125 transition-all duration-700">
                  <p>See more</p>
                  <FaArrowCircleRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };