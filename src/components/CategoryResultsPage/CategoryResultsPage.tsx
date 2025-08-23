import { useParams, useSearchParams } from "react-router";
import { SimpleGrid, Flex, Pagination, Title } from "@mantine/core";
import ContentCard from "../ContentCard/ContentCard";
import { usePopular } from "@/hooks/data-hooks/usePopular";
import { useTrending } from "@/hooks/data-hooks/useTrending";
import { useSearch } from "@/hooks/data-hooks/useSearch";

function CategoryResultsPage() {
  const category = useParams().name;

  const [searchParams, setSearchParams] = useSearchParams();
  const searchPage = searchParams.get("page") ? searchParams.get("page") : 1;
  const searchQuery = searchParams.get("q") ? searchParams.get("q") : "";
  //React Query has a prop that will only fire the hook if the category is enabled
  //Passing a boolean to my custom hook will make sure we only fetch one category at a time
  const popular = usePopular(+searchPage, category === "popular");
  const trending = useTrending(+searchPage, category === "trending");
  const search = useSearch(searchQuery, +searchPage, category === "search");
  const isSearch = search.data?.results?.length > 0;

  console.log("data", popular);

  const { isPending, error, data } =
    category === "popular"
      ? popular
      : category === "trending"
      ? trending
      : search;

  if (isPending) {
    return <div>...Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <Flex
      mt={20}
      direction="column"
      gap={{ base: "sm", sm: "lg" }}
      justify="center"
      align="center"
    >
      {!isSearch && (
        <Title order={1} c="dimText">
          {category.slice(0, 1).toUpperCase() + category.slice(1)}
        </Title>
      )}
      {isSearch && (
        <Title order={1} c="dimText">
          Search Results For:{" "}
          {searchQuery.slice(0, 1).toUpperCase() + searchQuery.slice(1)}
        </Title>
      )}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="md">
        {data?.results?.map((content) => {
          return <ContentCard content={content} />;
        })}
      </SimpleGrid>

      <Pagination
        total={data.total_pages}
        value={+searchPage}
        onChange={(pgNum) => setSearchParams({ page: pgNum })}
        mt="md"
      />
    </Flex>
  );
}

export default CategoryResultsPage;
