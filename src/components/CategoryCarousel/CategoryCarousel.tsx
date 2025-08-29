import { Container, Title, Skeleton } from "@mantine/core";
import ContentCard from "../ContentCard/ContentCard";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router";
import classes from "./CategoryCarousel.module.css";

function CategoryCarousel({ title, url, categoryData }) {
  const skeletonArr = Array(10).fill(null);

  return (
    <Container className={`${classes.container} carousel-fade`}>
      <Title c="dimText" mb={15} order={2}>
        {title}
      </Title>

      <Carousel
        slideSize="15%"
        height={340}
        slideGap="xs"
        controlSize={36}
        withControls
        withIndicators={false}
      >
        {categoryData &&
          categoryData.map((content) => (
            <Carousel.Slide key={content.id}>
              <ContentCard content={content} />
            </Carousel.Slide>
          ))}

        {!categoryData &&
          skeletonArr.map((skel, index) => (
            <Carousel.Slide key={index}>
              <Skeleton key={index} w={150} h={250} pt={0} px={0} />
            </Carousel.Slide>
          ))}
      </Carousel>

      <Link className={classes.seeMore} to={url}>
        see more
      </Link>
    </Container>
  );
}

export default CategoryCarousel;
