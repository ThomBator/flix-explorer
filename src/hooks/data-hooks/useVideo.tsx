import { useReactQuery } from "../useReactQuery";
import { getVideo } from "@/services/tmdb";

export const useVideo = (id) => {
  const { isPending, error, data } = useReactQuery(
    ["details", "movies", "videos", id],
    async () => {
      const data = await getVideo(id);
      return data;
    }
  );

  return { isPending, error, data };
};
