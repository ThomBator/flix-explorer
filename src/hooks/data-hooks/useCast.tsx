import { useReactQuery } from "../useReactQuery";
import { getCast } from "@/services/tmdb";

export const useCast = (id) => {
  const { isPending, error, data } = useReactQuery(
    ["details", "movies", "cast", id],
    async () => {
      const data = await getCast(id);
      return data;
    }
  );

  return { isPending, error, data };
};
