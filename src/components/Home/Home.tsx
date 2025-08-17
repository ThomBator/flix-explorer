import { usePopular } from "../../hooks/usePopular";
import { useTrending } from "../../hooks/useTrending";
import { Container, TextInput, Title, Text, Button } from "@mantine/core";
import styles from "./Home.module.css";
import CategoryCarousel from "../CategoryCarousel/CategoryCarousel";
import fallbackBG from "../../assets/fallbackBG.png";

function Home() {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
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

  if (popularIsPending && trendingIsPending) {
    return <p>...Loading</p>;
  }

  if (popularError && trendingError) {
    return <p>Error, contact site admin.</p>;
  }

  //Made a simple fallabck in case the backdrop image is not available
  const bgURL = popularData[0]?.backdrop_path
    ? BASE_URL + popularData[0].backdrop_path
    : fallbackBG;

  return (
    <>
      <header
        className={styles.mainHeader}
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
          <TextInput mt={10} placeholder="Search for movies to watch tonight" />
          <Button bg={"#D13900"} mt={8}>
            Search
          </Button>
        </Container>
      </header>
     {popularData &&  <CategoryCarousel title="Popular" categoryData={popularData} />}
     { trendingData && <CategoryCarousel title="Trending" categoryData={trendingData} /> }
    </>
  );
}

export default Home;
