import { getSearch } from "../services/tmdbData";
import { useReactQuery } from "./useReactQuery";

export const useSearch = (term, page = 1) => {


  const query = useReactQuery(["search", term, page], async () => {
    {
      const data = await getSearch(term, page);
      return data;
    }
  });

   return {
    isPending: query.isPending,
    error: query.error,
    data: query.data,
  };
};
