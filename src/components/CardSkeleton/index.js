import React from 'react';
import { motion } from 'framer-motion';

export default function CardSkeleton() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const skeletonVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  };

  return (
    <div className="grid gap-10 justify-center items-center mt-10 w-9/12 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <motion.div
        className="border mx-auto relative bg-zinc-600 h-[450px] w-[220px] lg:w-[300px] brightness-80 flex items-center justify-start p-5 animate-pulse"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className=" shadow-md"
          variants={skeletonVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full bg-gray-400"></div>
          <div className="bg-transparent w-full h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="w-full h-[50%] lg:h-auto mb-1">
                <div className="w-full h-full bg-gray-400"></div>
              </div>
              <div className="flex flex-col w-full items-center justify-center h-full">
                <motion.h1
                  className="md:text-xl text-sm font-extrabold text-center bg-gray-400"
                  variants={skeletonVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                ></motion.h1>
                <div className="w-full flex flex-col gap-3 text-gray-400">
                  <div className="text-white bg-zinc-700 w-[250px] h-[20px]" />
                  <div className="text-white bg-zinc-700 w-[250px] h-[20px]" />
                  <div className="text-white bg-zinc-700 w-[250px] h-[20px]" />
                  <motion.a
                    href="#"
                    className="absolute bottom-2 w-[250px] h-[20px] flex font-bold gap-4 items-center justify-center mx-auto py-3 px-6 bg-gradient-to-r from-pink-600 to-purple-800 text-white rounded-lg shadow hover:bg-purple-400 hover:brightness-125 transition-all duration-700 bg-gray-400"
                    variants={skeletonVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                  ></motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
