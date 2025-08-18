import { useState } from "react";
import { usePopular } from "../../hooks/usePopular";
import { useTrending } from "../../hooks/useTrending";
import { useSearch } from "../../hooks/useSearch";
import {
  Container,
  TextInput,
  Title,
  Text,
  Button,
  Group,
} from "@mantine/core";
import classes from "./Home.module.css";
import CategoryCarousel from "../CategoryCarousel/CategoryCarousel";
import fallbackBG from "../../assets/fallbackBG.png";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../utilities/baseURL";

function Home() {
  const [input, setInput] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input.trim())}&page=1`);
    }
  };

  if (popularIsPending && trendingIsPending) {
    return <p>...Loading</p>;
  }

  if (popularError && trendingError) {
    return <p>Error, contact site admin.</p>;
  }

  //Made a simple fallabck in case the backdrop image is not available
  const bgURL = popularData.results[0]?.backdrop_path
    ? BASE_URL + popularData.results[0].backdrop_path
    : fallbackBG;

  return (
    <>
      <header
        className={classes.mainHeader}
        style={{
          backgroundImage: ` linear-gradient(
        to top,
        rgba(39, 55, 69, 0.85) 0%,
        rgba(39, 55, 69, 0.6) 40%,
        rgba(39, 55, 69, 0.3) 70%,
        rgba(39, 55, 69, 0.2) 100%
      ),url(${bgURL})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 35%",
        }}
      >
        <Container ta={"left"} w={"80%"}>
          {" "}
          <Title order={1} c={"#FFF"}>
            Find Your Flix, Get Your Fix.
          </Title>
          <Text c={"#FFF"} fz={"20"} fw={700}>
            The possibilities are endless. Search our database to build your
            watchlist.
          </Text>
          <form onSubmit={handleSubmit}>
            <TextInput
              mt={5}
              aria-label="Search movies"
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="Search for movies to watch tonight"
              w="100%"
            />
            <Button mt={10} type="submit" bg="#D13900" disabled={!input.trim()}>
              Search
            </Button>
          </form>
        </Container>
      </header>
      {popularData && (
        <CategoryCarousel title="Popular" url="/category/popular?page=1" categoryData={popularData.results} />
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
