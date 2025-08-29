import { useReactQuery } from "../useReactQuery";
import { getReviews } from "@/services/tmdb";

export const useReviews = (id) => {
  const { isPending, error, data } = useReactQuery(
    ["details", "movies", "reviews", id],
    async () => {
      const data = await getReviews(id);
      return data;
    }
  );

  return { isPending, error, data };
};
