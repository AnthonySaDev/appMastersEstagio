import { db } from "@/services/firebaseConnection";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { toast } from "react-toastify";

export async function deleteFavorite(gameId, user) {
  let gameToRemove = null;
  
  if (user) {
    const docRef = doc(db, 'favorites', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      gameToRemove = docSnap.data().favorites.find((game) => game.id === gameId);
      
      if (gameToRemove) {
        await updateDoc(docRef, {
          favorites: arrayRemove(gameToRemove)
        });
      }
    }
  }
  toast.success("Game deleted successfully");
  return gameToRemove;
}
