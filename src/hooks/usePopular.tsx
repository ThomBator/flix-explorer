import { getPopular } from "../services/tmdbData";
import { useReactQuery } from "./useReactQuery";

export const usePopular = (enabled = true, page) => {
  const { isPending, error, data } = useReactQuery(
    ["popular", "movies", page],
    async () => {
      const data = await getPopular(page);
      return data;
    },
    { enabled}
  );

  return { isPending, error, data };
};
