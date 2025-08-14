import { useQuery } from "@tanstack/react-query";

//Trying to be more DRY, realized I could repeat this pattern for all my requests
export const useReactQuery = (key, queryFn, options = {}) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: key,
    queryFn,
    staleTime: 5 * 60 * 1000, //refresh every 5 minutes to limit API calls
    retry: 1,
    ...options,
  });
  return { isPending, error, data, isFetching };
};
