//For now we just have one watchlist in localstorage

export const getWatchlists = () => {
  const watchlists = JSON.parse(localStorage.getItem("watchlists")) ?? [];
  return watchlists;
};

export const setWatchlists = (newWatchlist) => {
  const watchlists = JSON.parse(localStorage.getItem("watchlists")) ?? [];
  localStorage.setItem("watchlists", JSON.stringify(newWatchlist));
};
