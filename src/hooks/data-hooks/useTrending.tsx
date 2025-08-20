import { getTrending } from "@/services/tmdb";
import { useReactQuery } from "../useReactQuery";

export const useTrending = (page = 1, enabled = true) => {
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
