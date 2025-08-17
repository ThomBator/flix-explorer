import { getSearch } from "../services/tmdbData";
import { useReactQuery } from "./useReactQuery";
import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useSearch = (initalTerm = "") => {
  const [term, setTerm] = useState(initalTerm);
  const [page, setPage] = useState(1);
  const searchQueryClient = useQueryClient();

  const query = useReactQuery(["search", term], async () => {
    {
      const data = await getSearch(term);
      return data;
    }
  });

  //return page 1 of search results
  const search = useCallback(
    async (newTerm) => {
      const trimmedTerm = newTerm.trim();

      if (!trimmedTerm) return;
      setTerm(trimmedTerm);
      setPage(1);
      await searchQueryClient.fetchQuery({
        queryKey: ["search", trimmedTerm, 1],
        queryFn: () => getSearch(trimmedTerm, 1),
        staleTime: 5 * 60 * 1000, //Limit API Calls refreshing every 5 mins
      });
    },
    [searchQueryClient]
  );

  //Let users go through multiple pages for the same search result
  const goToPage = useCallback(
    async (p) => {
      //I think this is needed to prevent people from accessing pages like -1 by changing queryParams
      if (!term || p < 1) return;
      setPage(p);
      await searchQueryClient.fetchQuery({
        queryKey: ["search", term, p],
        queryFn: () => getSearch(term, p),
        staleTime: 5 * 60 * 1000,
      });
    },
    [searchQueryClient, term]
  );

  return {
    search,
    goToPage,
    isPending: query.isPending,
    error: query.error,
    data: query.data,
  };
};
