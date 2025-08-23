import { Card, Title, Text, Button } from "@mantine/core";
import { useState } from "react";

function ReviewCard({ review }) {
  const [opened, setOpened] = useState(false);
  return (
    <Card c="altText" w={"85%"} mx="auto" mt={10} p={0} bg="accentBg">
      <Title order={2}>Review By: {review.author}</Title>
      <Text mt={5} px={20} lineClamp={opened ? undefined : 3}>
        {review.content}
      </Text>
      <Button variant="subtle" size="xs" onClick={() => setOpened((o) => !o)}>
        {opened ? "Show less" : "Show more"}
      </Button>
    </Card>
  );
}

export default ReviewCard;
