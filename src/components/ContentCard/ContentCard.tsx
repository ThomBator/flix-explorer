import { useState, useEffect } from "react";
import {
  Card,
  Title,
  Text,
  Image,
  ActionIcon,
  Tooltip,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { Link } from "react-router";
import Logo from "../../assets/FlixExplorerLogoNoText.png";
import { BASE_URL } from "../../utilities/baseURL";
import classes from "./ContentCard.module.css";
import { useWatchlist } from "@/store/watchlistContext";
import { useUser } from "@/store/userContext";

function ContentCard({ content }) {
  const [watched, setWatched] = useState(false);
  const { user } = useUser();
  const theme = useMantineTheme();
  const dateToFormat = new Date(content.release_date);
  const month = dateToFormat.toLocaleString("en", { month: "long" });
  const day = dateToFormat.getDate();
  const year = dateToFormat.getFullYear();
  const { items, handleAddWatchlist, handleRemoveWatchlist } = useWatchlist();
  const posterURI = content.poster_path ? BASE_URL + content.poster_path : Logo;
  console.log("content", content);

  const handleClick = (e) => {
    e.preventDefault();
    if (watched) {
      handleRemoveWatchlist(content.id);
      setWatched(false);
    } else {
      handleAddWatchlist(content);
      setWatched(true);
    }
  };

  useEffect(() => {
    const isWatched = items.some((item) => {
      return +item.id === content.id;
    });

    setWatched(isWatched);
  }, [content.id, items]);

  return (
    <Card
      w={150}
      pt={0}
      px={0}
      pb={2}
      bg="var(--mantine-color-body)"
      className={classes.card}
    >
      <Link to={`/details/${content.id}`} style={{ textDecoration: "none" }}>
        <Image
          h={250}
          src={posterURI}
          radius="md"
          fit="cover"
          pt={0}
          mt={0}
          alt={content.title + " movie poster"}
        />

        <Title order={3} pt={5} size={"sm"} mt={1} c={theme.colors.brand[8]}>
          {content.title}
        </Title>
        <Text c="dimText" size={"sm"}>{`${month}, ${day} ${year}`}</Text>
      </Link>

      <Flex
        className={classes.ratingWatchlist}
        align="flex-end"
        justify="space-between"
        py={2}
      >
        {" "}
        <Text c="#FFF" px={10} size={"md"}>
          {content.vote_average.toFixed(2)}⭐
        </Text>
        {user && (
          <Tooltip
            label={watched ? "Remove from watchlist" : "Add to watchlist"}
            withArrow
          >
            <ActionIcon
              size={24}
              variant="default"
              aria-label="Add to watchlist"
              className={classes.watchlistIcon}
              onClick={handleClick}
            >
              <IconHeart
                className={classes.icon}
                size={24}
                color="#fff"
                fill={watched ? theme.colors.brand[6] : "transparent"}
              />
            </ActionIcon>
          </Tooltip>
        )}
      </Flex>
    </Card>
  );
}

export default ContentCard;
