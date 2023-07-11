import { AuthContext } from "@/contexts/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContext, useState } from "react";
import Button from "../Button";
import HalfRating from "../Rating";

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const childVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const GameCard = ({ item, filteredData, setVisible }) => {
  const { user } = useContext(AuthContext);
  const [isGameFavorited, setIsGameFavorited] = useState(false);
  const [value, setValue] = useState(0);

  return (
    <motion.div 
      className="card-container border border-t-0 border-pink-700 shadow-2xl shadow-pink-600"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="card bg-gradient-to-r from-pink-600 to-purple-800 bg-opacity-90"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="front-content bg-zinc-800 flex flex-col gap-10 w-full h-full">
          <motion.img
            src={item.thumbnail}
            alt={item.title}
            className="w-full lg:h-[220px] h-[210px] object-cover"
            variants={childVariants}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className="flex flex-col gap-10 h-full pb-3 justify-evenly"
            variants={childVariants}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <motion.h1
              className="text-lg font-extrabold text-center"
              variants={childVariants}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {item.title}
            </motion.h1>

            <motion.div
              className="w-full  flex flex-col gap-3 text-zinc-300"
              variants={childVariants}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="font-semibold pl-3 flex items-center gap-2 text-inherit">
                <p className="text-white text-lg">Genre: </p>
                <p className="font-thin text-white">{item.genre}</p>
              </span>
              <span className="font-semibold pl-3 flex items-center gap-2 text-inherit">
                <p className="text-white text-lg">Developer: </p>
                <p className="font-thin text-white">{item.developer}</p>
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div className="content z-50 bg-gradient-to-r from-pink-600 to-purple-800 bg-opacity-90">
          <motion.div
            variants={childVariants}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
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
            />
          </motion.div>

          <motion.span
            className="font-semibold p-4 border border-zinc-100 rounded-lg text-inherit"
            variants={childVariants}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="font-thin text-white text-xs">
              {item.platform}
            </p>
          </motion.span>

          <motion.span
            className="font-semibold pl-3 flex items-center gap-2 text-inherit"
            variants={childVariants}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-white text-lg">Release: </p>
            <p className="font-thin text-white text-lg sm:text-xs">
              {item.release_date}
            </p>
          </motion.span>

          <motion.div
            className="text-center flex w-full items-center justify-center"
            variants={childVariants}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link href={`/games/${item.id}`}>
              <Button>See more</Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
