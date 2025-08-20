import { useQuery } from "@tanstack/react-query";

//Trying to be more DRY, realized I could repeat this pattern for all my requests
export const useReactQuery = (key, queryFn, options = {}) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: key,
    queryFn,
    retry: 1,
    ...options,
  });
  return { isPending, error, data, isFetching };
};
