import React from "react";
import { Card, Title, Text, Image } from "@mantine/core";
const BASE_URL = "https://image.tmdb.org/t/p/original";
function ContentCard({ content }) {
  const dateToFormat = new Date(content.release_date);
  const month = dateToFormat.toLocaleString("en", { month: "long" });
  const day = dateToFormat.getDate();
  const year = dateToFormat.getFullYear();

  console.log(month, day, year);

  return (
    <Card w={150} pt={0} px={0} pb={2}>
      <Image
        h={250}
        src={BASE_URL + content.poster_path}
        radius="md"
        fit="cover"
        pt={0}
        mt={0}
      />
      <Text mt={-20}   style={{
    backgroundImage: "linear-gradient(to right, rgba(17, 18, 19, 0.85) 0%, rgba(17, 18, 19s, 0.6) 40%, rgba(17, 18, 19, 0.0) 70%, rgba(17, 18, 19, 0.0) 100%)",
    display: "inline-block", 
    backgroundClip: "padding-box", 
  }} c="#FFF"  px={10} size={"sm"}>
        {content.vote_average.toFixed(2)}⭐
      </Text>
      <Title px={10} order={3} size={"sm"} mt={1}>
        {content.title}
      </Title>
      <Text c="dimmed" px={10} size={"sm"}>{`${month}, ${day} ${year}`}</Text>
    </Card>
  );
}

export default ContentCard;
