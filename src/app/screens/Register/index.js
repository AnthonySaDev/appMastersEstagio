import { motion } from 'framer-motion';
import { AuthContext } from '@/contexts/auth';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, loadingAuth, user } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      if (name !== '' && email !== '' && password !== '') {
        signUp(email, password, name);
      }
    } else {
      toast.warn('The passwords do not match');
    }
  }

  return (
    <div className="flex flex-col mt-10 items-center justify-center mt-28 bg-gradient-to-r text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md mt-10 px-4 py-8 bg-gray-800 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold mb-8 text-[#ff0f7b] text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative my-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-[#ff0f7b] appearance-none dark:border-zinc-500 dark:focus:border-[#ff0f7b] focus:outline-none focus:ring-0 focus:border-[#ff0f7b] peer"
                placeholder=" "
              
              />

              <label
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 0 px-2 peer-focus:px-2 peer-focus:text-[#ff0f7b] peer-focus:dark:text-[#ff0f7b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
               
              >
                Name
              </label>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-5"
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-[#ff0f7b] appearance-none dark:border-zinc-500 dark:focus:border-[#ff0f7b] focus:outline-none focus:ring-0 focus:border-[#ff0f7b] peer"
              placeholder=" "
             
            />

            <label
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 0 px-2 peer-focus:px-2 peer-focus:text-[#ff0f7b] peer-focus:dark:text-[#ff0f7b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
             
            >
              E-mail
            </label>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              type="password"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-[#ff0f7b] appearance-none dark:border-zinc-500 dark:focus:border-[#ff0f7b] focus:outline-none focus:ring-0 focus:border-[#ff0f7b] peer"
              placeholder=" "
          
            />

            <label
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 0 px-2 peer-focus:px-2 peer-focus:text-[#ff0f7b] peer-focus:dark:text-[#ff0f7b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
             
            >
              Password
            </label>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8}}
            className="relative"
          >
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              type="password"
              id="confirmPassword"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border border-[#ff0f7b] appearance-none dark:border-zinc-500 dark:focus:border-[#ff0f7b] focus:outline-none focus:ring-0 focus:border-[#ff0f7b] peer"
              placeholder=" "
              
            />

            <label
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 0 px-2 peer-focus:px-2 peer-focus:text-[#ff0f7b] peer-focus:dark:text-[#ff0f7b] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            
            >
              Confirm Password
            </label>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-800 text-white font-bold rounded-lg shadow hover:bg-purple-400 hover:brightness-125 transition-all duration-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {loadingAuth ? 'Loading...' : 'Register'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
