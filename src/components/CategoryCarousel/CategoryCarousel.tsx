import { Container, Title } from "@mantine/core";
import ContentCard from "../ContentCard/ContentCard";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router";
import classes from "./CategoryCarousel.module.css";

function CategoryCarousel({ title, url, categoryData }) {
  return (
    <Container className={`${classes.container} carousel-fade`} my={50}>
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
        {categoryData.map((content) => (
          <Carousel.Slide key={content.id}>
            <ContentCard content={content} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Link className={classes.seeMore} to={url} c="dimText">
        see more
      </Link>
    </Container>
  );
}

export default CategoryCarousel;
