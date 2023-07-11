import { db } from "@/services/firebaseConnection";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export async function addFavorite(gameId, user, setVisible, setIsGameFavorited, value) {

  if (!user) {
    toast.warn("You need to be authenticated to favorite a game, access your account.");
    setVisible(true);
    return 
  }


  if (value === null || value === undefined || value === 0) {
    const confirmToast = toast.warn(
      <>
        You did not rate this game. It will be added to your favorites with a rating of zero.
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button 
            style={{ backgroundColor: '#f56565', color: '#ffffff', padding: '5px 10px', margin: '0 10px', borderRadius: '3px', fontWeight:'bold' }}
            onClick={() => {
              toast.dismiss(confirmToast);
              toast.warn('Adding game to favorites was cancelled.');
            }}>
            Cancel
          </button>
          <button 
            style={{ backgroundColor: '#48bb78', color: '#ffffff', padding: '5px 10px', margin: '0 10px', borderRadius: '3px', fontWeight:'bold' }}
            onClick={() => {
              toast.dismiss(confirmToast);
              value = 0;
              addGameToFavorites(gameId, user, setIsGameFavorited, value);
              setIsGameFavorited(true);
              toast.success('Game was added to favorites.');
            }}>
            Continue
          </button>
        </div>
      </>, 
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  } else {
    addGameToFavorites(gameId, user, setIsGameFavorited, value);
    setIsGameFavorited(true);
  }
}

async function addGameToFavorites(gameId, user, setIsGameFavorited, value) {
  const gameToAdd = { id: gameId, rate: value };
  try {
    const docRef = doc(db, 'favorites', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let favorites = docSnap.data().favorites;
      const existingFavoriteIndex = favorites.findIndex(fav => fav.id === gameId);
      if (existingFavoriteIndex !== -1) {
        favorites[existingFavoriteIndex] = gameToAdd;
      } else {
        favorites.push(gameToAdd);
      }
      await updateDoc(docRef, { favorites: favorites });
    } else {
      await setDoc(docRef, { favorites: [gameToAdd] });
    }

    setIsGameFavorited(true);
    toast.success('Game saved successfully.');
  } catch (error) {
    console.error("Error adding favorite: ", error);
  }
}
