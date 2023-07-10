import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";


export default function Modal({ closeModal }) {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 z-50">
      <div className="bg-[#0f0f47]/90 text-zinc-200 p-8 rounded shadow-md relative w-fit mx-auto text-center">
        <button onClick={closeModal} className="absolute top-0 right-0 p-2 m-2 cursor-pointer bg-red-600 w-fit px-6 py-2 rounded-lg text-white font-bold">
          Close
        </button>
        <h2 className="text-xl font-bold mb-4">Hello there!</h2>
        <p>You need to sign in or register to edit items</p>
        <div className="flex items-center justify-center gap-5">
          <motion.button
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9 }}
            onClick={() => {
              router.push('/auth');
            }}
            className="flex items-center bg-gradient-to-r from-pink-600 to-purple-800 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Login
          </motion.button>
          <motion.button
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9 }}
            onClick={() => {
              router.push('/register');
            }}
            className="flex items-center bg-gradient-to-l from-pink-600 to-purple-800 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Register
          </motion.button>
        </div>
      </div>
    </div>
  );
}