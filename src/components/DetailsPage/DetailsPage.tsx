import { useParams } from "react-router";
import { useDetails } from "@/hooks/data-hooks/useDetails";
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
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { BASE_URL } from "@/utilities/baseURL";
import { formatYear } from "@/utilities/formatDate";
import classes from "./DetailsPage.module.css";

function DetailsPage() {
  const id = useParams().id;

  const { isPending, error, data } = useDetails(id);

  //Fallback image is provided in header component if this is null
  const bgPath = data?.backdrop_path ?? null;

  if (isPending) {
    return <div>...Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  console.log("Detail data ", data);

  const genreString = data?.genres?.map((genre) => genre.name).join(", ");

  let trailerURL = null;

  if (data.trailers.length > 0) {
    const { site, key } = data.trailers[0];

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
            src={BASE_URL + data?.poster_path}
            visibleFrom="sm"
          />
          <Box px={25} w="100%" maw={{ sm: "40%" }}>
            <Title order={1} c="altText">
              {`${data.title} (${formatYear(data.release_date)})`}
            </Title>
            <Text c="altText">{`${data.vote_average.toFixed(
              2
            )}⭐ | ${genreString} | 🕥 ${data.runtime} mins `}</Text>
            <Text mt={10} c="altText">
              {data.overview}
            </Text>
          </Box>
        </Flex>
      </PageHeader>
      <Container>
        {" "}
        {trailerURL && (
          <Box mt={40}>
            <Title c="dimText" order={2} mb={10}>
              Trailer
            </Title>
            <iframe
              src={trailerURL}
              className={classes.video}
              title="Flix Explorer Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Box>
        )}
        {data?.reviews?.length > 0 && (
          <>
            <Divider my={40} />
            <Paper
              ta="center"
              radius="md"
              p={{ base: "sm", sm: "xl" }}
              bg="accentBg"
              shadow="xl"
            >
              <Carousel
                slideSize="100%"
                slideGap="xs"
                controlSize={36}
                withControls={true}
                withIndicators={false}
                classNames={{ control: classes.control }}
              >
                {data.reviews.map((review) => (
                  <Carousel.Slide key={review.id}>
                    <ReviewCard review={review} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Paper>
          </>
        )}
        <Divider my={40} />
        <Box>
          <Title c="dimText" order={2} mb={10}>
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
            {data.credits.map((castMember) => (
              <Carousel.Slide key={castMember.id}>
                <CastCard castMember={castMember} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
        <Divider my={40} />
      </Container>
    </>
  );
}

export default DetailsPage;
