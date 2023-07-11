import { StarBorder } from '@mui/icons-material'
import { motion } from 'framer-motion'
import React from 'react'

export default function FilterRating({handleOptionClick}) {
  return (
    <ul className="absolute w-48 px-2 mt-2 bg-[#060623] text-yellow-600 py-5 rounded shadow top-full z-30">
    <motion.li
      className='cursor-pointer'
      onClick={() => handleOptionClick(-1)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      All Games
    </motion.li>
    <motion.li
      className='cursor-pointer'
      onClick={() => handleOptionClick(0)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <StarBorder style={{ color: '#ccc' }} />
      <StarBorder style={{ color: '#ccc' }} />
      <StarBorder style={{ color: '#ccc' }} />
      <StarBorder style={{ color: '#ccc' }} />
      <StarBorder style={{ color: '#ccc' }} />
    </motion.li>
    <motion.li
      className='cursor-pointer'
      onClick={() => handleOptionClick(1)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <StarBorder />
      <StarBorder style={{ color: '#ccc' }} />
      <StarBorder style={{ color: '#ccc' }} />
      <StarBorder style={{ color: '#ccc' }} />
      <StarBorder style={{ color: '#ccc' }} />
    </motion.li>
    <motion.li
      className='cursor-pointer'
      onClick={() => handleOptionClick(2)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <StarBorder />
      <StarBorder />
      <StarBorder style={{ color: '#ccc' }} />
      <StarBorder style={{ color: '#ccc' }} />
      <StarBorder style={{ color: '#ccc' }} />
    </motion.li>
    <motion.li
      className='cursor-pointer'
      onClick={() => handleOptionClick(3)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <StarBorder />
      <StarBorder />
      <StarBorder />
      <StarBorder style={{ color: '#ccc' }} />
      <StarBorder style={{ color: '#ccc' }} />
    </motion.li>
    <motion.li
      className='cursor-pointer'
      onClick={() => handleOptionClick(4)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <StarBorder />
      <StarBorder />
      <StarBorder />
      <StarBorder />
      <StarBorder style={{ color: '#ccc' }} />
    </motion.li>
    <motion.li
      className='cursor-pointer'
      onClick={() => handleOptionClick(5)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <StarBorder />
      <StarBorder />
      <StarBorder />
      <StarBorder />
      <StarBorder />
    </motion.li>
  </ul>
  )
}
