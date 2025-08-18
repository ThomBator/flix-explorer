import { useSearchParams } from "react-router";
import { useSearch } from "../../hooks/useSearch";
import { SimpleGrid, Container,Pagination } from "@mantine/core";
import ContentCard from "../ContentCard/ContentCard";


function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ? searchParams.get("q") : "";
  const searchPage = searchParams.get("page") ? searchParams.get("page") : 1; 

  const { data, isPending, error } = useSearch(searchQuery, +searchPage); 


  if (!searchQuery) return <p>No search term provided.</p>;

  if (isPending) {
    return <div>...Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  console.log(data);

  return (
    <Container ta="center" w={"80%"} mt={20}>
      <h1>
        Search Results For:{" "}
        {searchQuery.slice(0, 1).toUpperCase() + searchQuery.slice(1)}
      </h1>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="md">
        {data.results.map((content) => {
          return <ContentCard content={content} />;
        })}
      </SimpleGrid>
      <Pagination
        total={data.total_pages}
        value={+searchPage}
        onChange={(pgNum) => setSearchParams({q: searchQuery, page:pgNum})}
        mt="md"
      />
    </Container>
  );
}

export default SearchResultsPage;
