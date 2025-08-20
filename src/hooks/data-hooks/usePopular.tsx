import { getPopular } from "@/services/tmdb";
import { useReactQuery } from "../useReactQuery";

export const usePopular = (page = 1, enabled = true) => {
  const { isPending, error, data } = useReactQuery(
    ["popular", "movies", page],
    async () => {
      const data = await getPopular(page);
      return data;
    },
    { enabled }
  );

  return { isPending, error, data };
};
