'use client'
import React, { createContext, useEffect, useState } from 'react';
import { api } from '@/data/setupApi';

export const DataContext = createContext();

function DataProvider({ children }){
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/');
        const newData = response.data;
        setData(newData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setHasError(true);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{data, loading, hasError}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
