'use client'
import React from 'react';
import Link from 'next/link';
import { FiFrown } from 'react-icons/fi';
import Header from '@/components/Header';
export default function FavoriteRedirect() {
    return (
        <div>

          <div className="flex flex-col items-center px-2 justify-center h-screen bg-gradient-to-r text-white">
            <h1 className="text-4xl font-bold mb-8 text-red-800">Oops!</h1>
            <p className="text-lg mb-6 flex flex-col items-center justify-center">
              It seems like you dont have any favorites yet.
              <span className="text-4xl mt-2">
                <FiFrown className='text-red-800' />
              </span>
            </p>
            <div className="text-lg flex flex-col text-center mb-8">
              To start adding favorites, please{' '}
              <p className="flex w-full justify-around">
                <Link href="/register" className="underline text-blue-600">
                  register
                </Link>{' '}
                or{' '}
                <Link href="/auth" className="underline text-blue-600">
                  login
                </Link>
              </p>
            </div>
            <p className="text-sm">Enjoy discovering and saving your favorites!</p>
    
          </div>
        </div>
      );
}
