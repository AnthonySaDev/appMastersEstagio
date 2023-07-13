import { AuthContext } from "@/contexts/auth";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import borda from "../../../public/borda.png";
import Button from "../Button";
import HalfRating from "../Rating";

export const GameCard = ({ item, filteredData, setVisible }) => {
  const { user } = useContext(AuthContext);
  const [isGameFavorited, setIsGameFavorited] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [value, setValue] = useState(0);

  const cardVariants = {
    hidden: { y: 1000 },
    visible: { y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.9 }}
        key={item.id}
        className="text-sm h-[600px] relative shadow-md"
      >
        <Image
          src={borda}
          className="w-full h-full object-fill brightness-150 shadow-2xl"
        />
        <div className="absolute bg-transparent top-0 left-0 w-full h-full">
          <div className="p-[0.84rem] flex flex-col items-center justify-between h-full">
            <div className="w-full flex items-center juntify-center m-auto h-[30%] sm:h-[40%] md:h-[35%] lg:h-[45%] xl:h[50%] 2xl:h-[60%]">
              <motion.img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="flex flex-col h-full pb-3 justify-evenly">
              <motion.h1
                className="text-lg font-extrabold text-center"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
              >
                {item.title}
              </motion.h1>

              <div className="w-full px-2 flex flex-col gap-3 text-zinc-300">
                <span className="font-semibold pl-3 flex items-center gap-2 text-inherit">
                  <p className="text-white text-lg">Genre: </p>
                  <p className="font-thin text-white">{item.genre}</p>
                </span>
                <span className="font-semibold pl-3 flex items-center gap-2 text-inherit">
                  <p className="text-white text-lg">Developer: </p>
                  <p className="font-thin text-white">{item.developer}</p>
                </span>
              </div>
            </div>
            <motion.div
              className="details absolute bottom-0 left-0 right-0 w-full"
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: hovered ? 1 : 0,
                y: hovered ? 0 : 30,
              }}
              transition={{ opacity: { duration: 0.4 }, y: { duration: 0.7 } }}
            >
              <div className="bg-black bg-opacity-[.98] mx-auto flex flex-col items-center px-5 gap-4 py-[3.6rem] justify-center rounded-b">
                <div className="flex items-center justify-around">
                  <HalfRating
                    isGameFavorited={isGameFavorited}
                    setIsGameFavorited={setIsGameFavorited}
                    value={value}
                    setValue={setValue}
                    gameId={item.id}
                    filteredData={filteredData}
                    user={user}
                    setVisible={setVisible}
                    readOnly={false}
                    disabled={false}
                  />
                </div>
                <span className="font-semibold p-4 border border-zinc-600 rounded-lg text-inherit">
                  <p className="font-thin text-white text-xs">
                    {item.platform}
                  </p>
                </span>
                <span className="font-semibold pl-3 flex items-center gap-2 text-inherit">
                  <p className="text-white text-lg">Release: </p>
                  <p className="font-thin text-white text-lg sm:text-xs">
                    {item.release_date}
                  </p>
                </span>
                <Link
                  href={`/games/${item.id}`}
                  className="text-center flex w-full items-center justify-center"
                >
                  <Button>See more</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
