import { Container, Title } from "@mantine/core";
import ContentCard from "../ContentCard/ContentCard";
import { Carousel } from "@mantine/carousel";

function CategoryCarousel({ title, categoryData }) {
    const slides = categoryData.map((content) => ( 
    <Carousel.Slide key={content.id}>
      <ContentCard content={content}/>
    </Carousel.Slide>)); 

  return (
 <Container my={50} style={{position:"relative"}}>
  <Title mb={15}order={2}>{title}</Title>
     <Carousel
      slideSize="15%"
      height={340}
      slideGap="xs"
      controlsOffset="s"
      controlSize={36}
      withControls
      withIndicators={false}
    >
      {slides}
    </Carousel>
    <a style={{position: "absolute", top: 20, right: 15}}href="#">see more</a>
 </Container>
  );
}

export default CategoryCarousel;
