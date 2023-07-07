import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import borda from '../../../public/borda.png';
import Favorite from "../Favorite";
import HalfRating from "../Rating";
import Button from "../Button";

export const GameCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9 }}
        key={item.id}
        className="text-sm h-[600px] relative shadow-md "
      >
        <Image src={borda} className="w-full h-full object-fill brightness-150 shadow-2xl" />
        <div className="absolute bg-transparent top-0 left-0 w-full h-full">
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="w-full h-[50%] lg:h-auto mb-1">
              <img src={item.thumbnail} alt={item.title} className="w-full h-[250px] object-fill" />
            </div>

            <div className="flex flex-col h-full pb-3 justify-evenly">
              <h1 className="md:text-xl text-lg font-extrabold text-center">{item.title}</h1>

              <div className="w-full  flex flex-col gap-3 text-zinc-300">
                <span className="font-semibold pl-3 flex items-center gap-2 text-inherit">
                  <p className="text-white text-lg">Genre: </p>
                  <p className="font-thin text-white ">{item.genre}</p>
                </span>
                <span className="font-semibold pl-3 flex items-center gap-2 text-inherit">
                  <p className="text-white text-lg">Developer: </p>
                  <p className="font-thin text-white ">{item.developer}</p>
                </span>
              </div>
            </div>

            <motion.div
              className="details absolute bottom-0 left-0 right-0 w-full"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }} 
              transition={{ opacity: { duration: 0.3 }, y: { duration: 0.7 } }}> 
              <div className="bg-black/90 mx-auto flex flex-col items-center gap-4 py-14 justify-center">
                <div className="flex items-start justify-center gap-2">
                  <HalfRating />
                  <Favorite />
                </div>
                <span className="font-semibold p-4 border border-zinc-600 rounded-lg text-inherit">
                  <p className="font-thin text-white text-xs ">{item.platform}</p>
                </span>
                <span className="font-semibold pl-3 flex items-center gap-2 text-inherit">
                  <p className="text-white text-lg">Release: </p>
                  <p className="font-thin text-white text-lg sm:text-xs ">{item.release_date}</p>
                </span>
                <Link href={`/games/${item.id}`} >
                  <Button>See more</Button>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div >
  );
};
