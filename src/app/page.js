'use client'
import Cards from '@/app/screens/Cards';
import { DataContext } from '@/contexts/data';
import { useContext } from 'react';
import HasError from './hasError';
import Loading from './loading';

export default function Home() {
  const { data, hasError, loading } = useContext(DataContext);

  if (hasError) {
    return (
      <HasError />
    )
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div>
      <div className='font-sans'>
        <main>
          <Cards data={data} />
        </main>
      </div>
    </div>
  );
}
