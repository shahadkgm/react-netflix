import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";

const WatchlistContext = createContext();
export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from Firestore
  useEffect(() => {
    if (user) {
      const fetchWatchlist = async () => {
        const ref = doc(db, "watchlists", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setWatchlist(snap.data().movies || []);
        } else {
          await setDoc(ref, { movies: [] }); // create empty doc if not exists
        }
      };
      fetchWatchlist();
    } else {
      setWatchlist([]);
    }
  }, [user]);

  const addToWatchlist = async (movie) => {
    if (!user) return;
    const ref = doc(db, "watchlists", user.uid);
    await updateDoc(ref, {
      movies: arrayUnion(movie),
    });
    setWatchlist((prev) => [...prev, movie]);
  };

  const removeFromWatchlist = async (id) => {
    if (!user) return;
    const ref = doc(db, "watchlists", user.uid);
    const movieToRemove = watchlist.find((m) => m.id === id);
    if (!movieToRemove) return;
    await updateDoc(ref, {
      movies: arrayRemove(movieToRemove),
    });
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};