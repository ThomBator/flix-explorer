import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { getWatchlists, setWatchlists } from "@/services/watchlist";
import { useUser } from "./userContext";

export const WatchlistContext = createContext(null);

export default function WatchlistProvider({ children }) {
  const { user } = useUser();
  const [allWatchlists, setAllWatchlists] = useState([]);

  const [userWatchlist, setUserWatchlist] = useState({});

  const value = useMemo(
    () => ({
      user,
      allWatchlists,
      setAllWatchlists,
      userWatchlist,
      setUserWatchlist,
    }),
    [user, allWatchlists, userWatchlist]
  );

  //run once on mount to ensure allWatchlists are there when user is added
  useEffect(() => {
    const storedWatchlists = getWatchlists() || [];
    setAllWatchlists(storedWatchlists);
  }, []);

  //run whenever user changes
  useEffect(() => {
    if (!user) {
      setUserWatchlist({ email: null, items: [] });
      return;
    }

    const storedUserWatchlist = allWatchlists.find(
      (w) => w.email === user.email
    ) ?? { email: user.email, items: [] };

    setUserWatchlist(storedUserWatchlist);
  }, [user, allWatchlists]);

  return <WatchlistContext value={value}>{children}</WatchlistContext>;
}

export const useWatchlist = () => {
  const { user } = useUser();
  const { userWatchlist, setUserWatchlist, allWatchlists, setAllWatchlists } =
    useContext(WatchlistContext);

  const handleAddWatchlist = (watchlistObj) => {
    const updatedListItems = [...(userWatchlist.items || []), watchlistObj];
    const updatedList = { email: user.email, items: updatedListItems };
    const nextAll = [
      ...allWatchlists.filter((l) => l.email !== updatedList.email),
      updatedList,
    ];
    setAllWatchlists(nextAll);
    //Call to local storage for now, to be replaced by db at some point
    setWatchlists(nextAll);
  };

  const handleRemoveWatchlist = (id) => {
    const updatedListItems = userWatchlist.items.filter(
      (item) => item.id !== id
    );
    const updatedList = { ...userWatchlist, items: updatedListItems };
    setUserWatchlist(updatedList);
    setAllWatchlists((prevWatchlists) => [
      ...prevWatchlists.filter((l) => l.email !== updatedList.email),
      updatedList,
    ]);
    //localStorage call
    setWatchlists([
      ...allWatchlists.filter((l) => l.email !== updatedList.email),
      updatedList,
    ]);
  };

  return {
    items: userWatchlist.items ?? [],
    handleAddWatchlist,
    handleRemoveWatchlist,
  };
};
