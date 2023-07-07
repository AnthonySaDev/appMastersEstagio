import { db } from "@/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";

const checkFavorite = async (favoriteId, user, setIsGameFavorited) => {
  if (user) {
    const docRef = doc(db, 'favorites', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let favorites = (docSnap.data().favorites);

      const isFavorited = favorites.some(game => game.id === favoriteId);

      // Only update isGameFavorited if it has changed
      setIsGameFavorited(prevState => {
        if (prevState !== isFavorited) {
          return isFavorited;
        } else {
          return prevState;
        }
      });
    } else {
      setIsGameFavorited(prevState => {
        if (prevState !== false) {
          return false;
        } else {
          return prevState;
        }
      });
    }
  }
};

export { checkFavorite };

