'use client'
import React, { createContext, useEffect, useState } from 'react';
import { api } from '@/data/setupApi';
export const DataContext = createContext();
function DataProvider({ children }){
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await api.get('/');
        const newData = response.data;
        setData(newData);
      } catch (error) {
        setHasError(true);
      }
    };

    fetchData();
    setLoading(false);
  }, []);

  return (
    <DataContext.Provider value={{data, loading, hasError}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
