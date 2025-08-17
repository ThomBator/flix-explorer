import { getPopular } from "../services/tmdbData";
import { useReactQuery } from "./useReactQuery";

export const usePopular = () => {
  const { isPending, error, data } = useReactQuery(
    ["popular", "movies"],
    async () => {
      const data = await getPopular();
      return data;
    }
  );

  return { isPending, error, data };
};
