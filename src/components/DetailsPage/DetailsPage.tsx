import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDetails } from "@/hooks/data-hooks/useDetails";
import { useVideo } from "@/hooks/data-hooks/useVideo";
import { useReviews } from "@/hooks/data-hooks/useReviews";
import { useCast } from "@/hooks/data-hooks/useCast";
import PageHeader from "../PageHeader/PageHeader";
import CastCard from "../CastCard/CastCard";
import ReviewCard from "../ReviewCard/ReviewCard";
import {
  Flex,
  Image,
  Box,
  Title,
  Text,
  Container,
  Paper,
  Divider,
  Loader,
  Skeleton,
  Button,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { BASE_URL } from "@/utilities/baseURL";
import { formatYear } from "@/utilities/formatDate";
import { useWatchlist } from "@/store/watchlistContext";
import classes from "./DetailsPage.module.css";

function DetailsPage() {
  const [watched, setWatched] = useState(false);
  const id = useParams().id;
  const { items, handleAddWatchlist, handleRemoveWatchlist } = useWatchlist();

  const {
    isPending: isPendingDetails,
    error: errorDetails,
    data: dataDetails,
  } = useDetails(id);
  const {
    isPending: isPendingVideo,
    error: errorVideo,
    data: dataVideo,
  } = useVideo(id);

  const {
    isPending: isPendingReviews,
    error: errorReviews,
    data: dataReviews,
  } = useReviews(id);

  const {
    isPending: isPendingCast,
    error: errorCast,
    data: dataCast,
  } = useCast(id);

  const handleClick = (e) => {
    e.preventDefault();
    if (watched) {
      handleRemoveWatchlist(dataDetails.id);
      setWatched(false);
    } else {
      handleAddWatchlist(dataDetails);
      setWatched(true);
    }
  };

  useEffect(() => {
    const isWatched =
      items.some((item) => {
        if (dataDetails && item) {
          return +item.id === +dataDetails.id;
        }
      }) || false;

    setWatched(isWatched);
  }, [dataDetails, items]);

  //Fallback image is provided in header component if this is null
  const bgPath = dataDetails?.backdrop_path ?? null;

  const skeletonArr = Array(10).fill(null);

  if (isPendingDetails) {
    return (
      <Flex align="center" justify="center" mt="10%">
        <Loader />
      </Flex>
    );
  }
  if (errorDetails) {
    return <Container>Error</Container>;
  }

  const genreString = dataDetails?.genres
    ?.map((genre) => genre.name)
    .join(", ");

  let trailerURL = null;

  if (dataVideo.length > 0) {
    const { site, key } = dataVideo[0];

    if (site === "YouTube") {
      trailerURL = `https://www.youtube.com/embed/${key}`;
    } else if (site === "Vimeo") {
      trailerURL = `https://player.vimeo.com/video/${key}`;
    }
  }

  return (
    <>
      <PageHeader bgPath={bgPath}>
        <Flex justify="flex-start" gap={80}>
          <Image
            w={250}
            fit="contain"
            radius="md"
            src={BASE_URL + dataDetails?.poster_path}
            visibleFrom="sm"
          />
          <Box px={25} w="100%" maw={{ sm: "40%" }}>
            <Title order={1} c="altText">
              {`${dataDetails.title} (${formatYear(dataDetails.release_date)})`}
            </Title>
            <Text c="altText">{`${dataDetails.vote_average.toFixed(
              2
            )}⭐ | ${genreString} | 🕥 ${dataDetails.runtime} mins `}</Text>
            <Text mt={10} c="altText">
              {dataDetails.overview}
            </Text>
            <Button onClick={handleClick}>
              {watched ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          </Box>
        </Flex>
      </PageHeader>
      <Container>
        {" "}
        <Box>
          <Title c="dimText" order={2} mt={20} mb={10}>
            Cast
          </Title>
          <Carousel
            slideSize="15%"
            height={340}
            slideGap="xs"
            controlSize={36}
            withControls={true}
            withIndicators={false}
            className="carousel-fade"
          >
            {dataCast &&
              dataCast.map((castMember) => (
                <Carousel.Slide key={castMember.id}>
                  <CastCard castMember={castMember} />
                </Carousel.Slide>
              ))}
            {!dataCast &&
              skeletonArr.map((skel, index) => (
                <Carousel.Slide key={index}>
                  <Skeleton key={index} w={150} h={250} pt={0} px={0} />
                </Carousel.Slide>
              ))}
          </Carousel>
        </Box>
        <Divider my={30} />
        <Box>
          <Title c="dimText" order={2} mb={10}>
            Trailer
          </Title>
          {dataVideo && (
            <iframe
              src={trailerURL}
              className={classes.video}
              title="Flix Explorer Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
          {!dataVideo && <Skeleton w="80%" h={414} />}
        </Box>
        <Divider my={30} />
        {dataReviews.results.length > 0 && (
          <>
            <Title c="dimText" order={2} mb={10}>
              Reviews
            </Title>
            <Paper
              ta="center"
              radius="md"
              p={{ base: "sm", sm: "xl" }}
              style={{
                background:
                  "linear-gradient(135deg, #2c3540, #475561, #6b7c89)",
              }}
              shadow="xl"
              my={40}
              mih={200}
            >
              <Carousel
                slideSize="100%"
                slideGap="xs"
                controlSize={36}
                withControls={true}
                withIndicators={false}
                classNames={{ control: classes.control }}
              >
                {dataReviews.results.map((review) => (
                  <Carousel.Slide key={review.id}>
                    <ReviewCard review={review} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Paper>
          </>
        )}
      </Container>
    </>
  );
}

export default DetailsPage;
