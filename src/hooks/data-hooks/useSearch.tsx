import { getSearch } from "@/services/tmdb";
import { useReactQuery } from "../useReactQuery";

export const useSearch = (term, page = 1, enabled = true) => {
  const query = useReactQuery(
    ["search", term, page],
    async () => {
      const data = await getSearch(term, page);
      return data;
    },
    { enabled }
  );

  return {
    isPending: query.isPending,
    error: query.error,
    data: query.data,
  };
};
