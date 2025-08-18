import React from "react";
import { useParams, useSearchParams } from "react-router";
import { SimpleGrid, Container, Pagination } from "@mantine/core";
import ContentCard from "../ContentCard/ContentCard";
import { usePopular } from "../../hooks/usePopular";
import { useTrending } from "../../hooks/useTrending";

function CategoryResultsPage() {
  const category = useParams().name;

  const [searchParams, setSearchParams] = useSearchParams();
  const searchPage = searchParams.get("page") ? searchParams.get("page") : 1;

  //React Query has a prop that will only fire the hook if the category is enabled
  //Passing a boolean to my custom hook will make sure we only fetch one category at a time
  const popular = usePopular(category === "popular", +searchPage);
  const trending = useTrending(category === "trending", +searchPage);

  const { isPending, error, data } =
    category === "popular" ? popular : trending;

  if (isPending) {
    return <div>...Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  console.log("data", data);

  return (
    <Container ta="center" w={"80%"} mt={20}>
      <h1>{category.slice(0, 1).toUpperCase() + category.slice(1)}</h1>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="md">
        {data.results.map((content) => {
          return <ContentCard content={content} />;
        })}
      </SimpleGrid>

      <Pagination
        total={data.total_pages}
        value={+searchPage}
        onChange={(pgNum) => setSearchParams({ page: pgNum })}
        mt="md"
      />
    </Container>
  );
}

export default CategoryResultsPage;
