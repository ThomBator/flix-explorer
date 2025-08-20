import { useReactQuery } from "../useReactQuery";
import { getDetails } from "@/services/tmdb";

export const useDetails = (id) => {
  const { isPending, error, data } = useReactQuery(
    ["details", "movies", id],
    async () => {
      const data = await getDetails(id);
      return data;
    }
  );

  return { isPending, error, data };
};
