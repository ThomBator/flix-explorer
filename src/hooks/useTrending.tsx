import { getTrending } from "../services/tmdbData";
import { useReactQuery } from "./useReactQuery";

export const useTrending = (enabled = true, page) => {
  const { isPending, error, data } = useReactQuery(
    ["trending", "movies", page],
    async () => {
      const data = await getTrending(page);

      return data;
    },
    { enabled }
  );

  return { isPending, error, data };
};
