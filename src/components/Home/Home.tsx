import { useState } from "react";
import { Link } from "react-router";
import { usePopular } from "../../hooks/data-hooks/usePopular";
import { useTrending } from "../../hooks/data-hooks/useTrending";
import { useSearch } from "@/hooks/data-hooks/useSearch";
import { Flex, TextInput, Title, Text, Button, Popover } from "@mantine/core";
import CategoryCarousel from "../CategoryCarousel/CategoryCarousel";
import PageHeader from "../PageHeader/PageHeader";
import { useNavigate } from "react-router";
import SearchResultsListItem from "../SearchResultsListItem/SearchResultsListItem";
import classes from "./Home.module.css";

function Home() {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    isPending: popularIsPending,
    error: popularError,
    data: popularData,
  } = usePopular();

  const {
    isPending: trendingIsPending,
    error: trendingError,
    data: trendingData,
  } = useTrending();

  const {
    isPending: searchIsPending,
    error: searchError,
    data: searchData,
  } = useSearch(input);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim()) {
      navigate(`/category/search?q=${encodeURIComponent(input.trim())}&page=1`);
    }
  };

  if (popularIsPending && trendingIsPending) {
    return <p>...Loading</p>;
  }

  if (popularError && trendingError && searchError) {
    return <p>Error, contact site admin.</p>;
  }

  //Fallback image is provided in header component if this is null
  const bgPath = popularData?.results[0]?.backdrop_path ?? null;

  return (
    <>
      <PageHeader bgPath={bgPath}>
        <Title order={1} c={"altText"}>
          Find Your Flix, Get Your Fix.
        </Title>
        <Text c={"altText"} fz={"20"} fw={700}>
          The possibilities are endless. Search our database to build your
          watchlist.
        </Text>
        <Popover
          width="target"
          position="bottom"
          hideDetached={false}
          opened={open}
          offset={{ mainAxis: -46, crossAxis: 0 }}
        >
          <Popover.Target>
            <form
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              onSubmit={handleSubmit}
            >
              <TextInput
                mt={5}
                aria-label="Search movies"
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                placeholder="Search for movies to watch tonight"
              />
              <Button
                mt={10}
                type="submit"
                bg="brand"
                className={classes.searchButton}
                disabled={!input.trim()}
              >
                Search
              </Button>
            </form>
          </Popover.Target>
          {input && (
            <Popover.Dropdown>
              {searchData &&
                searchData.results
                  .slice(0, 5)
                  .map((result) => <SearchResultsListItem result={result} />)}
              {input && (
                <Link
                  to={`/category/search?q=${encodeURIComponent(
                    input.trim()
                  )}&page=1`}
                  style={{ textDecoration: "none" }}
                >
                  <Text c="dimText" ta="center" py={10}>
                    See More
                  </Text>
                </Link>
              )}
            </Popover.Dropdown>
          )}
        </Popover>
      </PageHeader>

      {popularData && (
        <CategoryCarousel
          title="Popular"
          url="/category/popular?page=1"
          categoryData={popularData.results}
        />
      )}
      {trendingData && (
        <CategoryCarousel
          title="Trending"
          url="/category/trending?page=1"
          categoryData={trendingData.results}
        />
      )}
    </>
  );
}

export default Home;
