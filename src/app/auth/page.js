'use client'
import { AuthContext } from '@/contexts/auth';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Login from '../screens/Login';
import Register from '../screens/Register';

export default function Auth() {

  const { user } = useContext(AuthContext);
  const [auth, setAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, []);

return(
  <div>
    {auth? <Login/> : <Register/>}
    <p className='text-center my-2'>{auth ? "Dont have account ? " : "Already registered?"} </p>
        <button
          onClick={() => {
          setAuth(!auth)
          }}
          className='flex items-center mx-auto bg-gradient-to-l from-pink-600 to-purple-800 text-white font-bold py-2 px-4 rounded mt-4'>{auth ? "Register " : "Login"}</button>
  </div>
)


}
