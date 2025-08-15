import { getTrending } from "../services/tmdbData";
import { useReactQuery } from "./useReactQuery";

export const useTrending = () => {
  const { isPending, error, data } = useReactQuery(
    ["trending", "movies"],
    async () => {
      const data = await getTrending();
    
      return data.results;
    }
  );

  return { isPending, error, data };
};
