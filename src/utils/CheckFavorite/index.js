import { db } from "@/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";

const checkFavorite = async (favoriteId, user, setIsGameFavorited, setValue) => {
  if (user) {
    const docRef = doc(db, 'favorites', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let favorites = docSnap.data().favorites;

      const foundGame = favorites.find(game => game.id === favoriteId);

      if (foundGame) {
        setIsGameFavorited(true);
        setValue(foundGame.rate);
      } else {
        setIsGameFavorited(false);
      }
    } else {
      setIsGameFavorited(false);
    }
  }
};

export { checkFavorite };

