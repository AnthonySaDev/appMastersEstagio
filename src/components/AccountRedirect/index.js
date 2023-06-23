import React from 'react'
import Link from 'next/link';
import { FiLock } from 'react-icons/fi';
import Header from '@/components/Header';
export default function AccountRedirect() {
  
 ;
    return (
    <div>
    <Header />
    <div className="flex flex-col items-center px-2 justify-center h-screen bg-gradient-to-r  text-white">
      <h1 className="text-4xl font-bold mb-8 text-orange-600">Oops!</h1>
      <p className="text-lg mb-6 flex flex-col items-center justify-center text-center">
        It seems like you're not logged in to view and edit your credentials.
        <span className="text-4xl mt-2">
          <FiLock className='text-orange-600'/>
        </span>
      </p>
      <div className="text-lg flex flex-col text-center mb-8">
        To access your account, please{' '}
        <div className="flex flex-col w-full justify-around">
          <p className='flex w-full justify-around'>
          <Link href="/login" className="underline text-blue-600">
            log in
          </Link>{' '}
          or{' '}
          <Link href="/register" className="underline text-blue-600">
            register
          </Link>{' '}
          </p>
          if you don't have an account.
        </div>
      </div>
      <p className="text-sm">Enjoy managing your data!</p>
    </div>
  </div>
  )
}
