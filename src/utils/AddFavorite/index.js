import { db } from "@/services/firebaseConnection";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export async function addFavorite(favoriteId, filteredData, user, setVisible, setIsGameFavorited) {
  if (!user) {
    toast.warn("You need to be authenticated to favorite a game, access your account.");
    setVisible(true);
    return;
  }

  const gameToAdd = filteredData.find((game) => game.id === favoriteId);

  try {
    const docRef = doc(db, 'favorites', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        favorites: arrayUnion(gameToAdd),
      });
    } else {
      await setDoc(docRef, {
        favorites: [gameToAdd],
      });
    }

    setIsGameFavorited(true);
    toast.success('Game saved successfully.');
  } catch (error) {
    console.error("Error adding favorite: ", error);
  }
}
