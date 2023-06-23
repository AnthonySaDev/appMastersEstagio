'use client'
import AccountRedirect from '@/app/AccountRedirect';
import Header from '@/components/Header';
import { AuthContext } from '@/contexts/auth';
import { DataContext } from '@/contexts/data';
import { db, storage } from "@/services/firebaseConnection";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { FiSettings, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import avatar from '../../../public/avatar.png';
import HasError from '../hasError';

export default function Account() {

  const { user, signOut, setUser, storageUser } = useContext(AuthContext)
  const { hasError } = useContext(DataContext);
  const [name, setName] = useState(user && user.name);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);


  async function handleSubmit(e) {
    e.preventDefault();
    const usersRef = doc(db, "users", user.uid);
    let updatedData = {};

    if (name !== user.name) {
      updatedData.name = name;
    }

    if (avatar !== user.avatarUrl) {
      const imageUrl = await handleUpload();
      updatedData.avatarUrl = imageUrl;
    }

    try {
      await setDoc(usersRef, updatedData);
      const data = { ...user, ...updatedData };
      setUser(data);
      storageUser(data);
      toast.success("Success!");
    } catch (error) {
      console.error(error);
    }
  }


  function handleFile(e) {

    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png' || image.type === "image/jpg") {

        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]))

      } else {
        toast.error('Send an image in PNG or JPEG format');
        setImageAvatar(null);
        return null;
      }

    }

  }

  async function handleUpload() {
    if (avatarUrl !== null) {
      const imagesRef = ref(storage, `imagesUser/${user.uid}`);
      const uploadTask = uploadBytesResumable(imagesRef, imageAvatar);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => { },
          (error) => {
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });

      const url = await getDownloadURL(imagesRef);
      return url;
    }

    return null;
  }


  if (hasError) {
    return (
      <HasError />
    )
  }

  if (!storageUser) {
    return <AccountRedirect />;
  }
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r text-white">
      <div className='w-full'>
      <Header />
      </div>
      <h1 className='text-xl text-orange-600 mt-20 md:mt-24'>Hello, {user.name}</h1>
      <div className="md:w-6/12 mx-auto mt-10 px-4 py-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-4 justify-center text-orange-600 text-center">Edit Profile <FiSettings size={25} />
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col mx-auto">
          <div>
            <label className="w-9/12 mt-10 m-auto md:h-[400px] h-[200px] z-10 bg-orange-700 rounded flex items-center justify-center cursor-pointer">
              <span className='absolute opacity-50'>
                <FiUpload color="#FFF" size={25} />
              </span>

              <input type="file" accept="image/*" className="hidden" onChange={handleFile} /><br />
              {avatarUrl === null ?
                <Image src={avatar} width="250" height="250" className='w-full h-full object-cover' alt="Foto de perfil do usuario" />
                :
                <img src={avatarUrl} width="250" height="250" className='w-full h-full object-cover' alt="Foto de perfil do usuario" />
              }
            </label>


            <div className="relative my-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-orange-600 appearance-none dark:text-white dark:border-zinc-500 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " />

              <label
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-800 0 px-2 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-800 to-orange-700 text-white font-bold rounded-lg shadow hover:bg-orange-400 hover:brightness-125 transition-all duration-700"
          >
            Save
          </button>
        </form>
      </div>
          <button onClick={signOut} className='mt-20 bg-orange-600 w-fit mx-auto px-6 font-semibold p-3 rounded-lg'>LogOut</button>
    </div>
  );
}
