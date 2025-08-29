import {
  Card,
  Title,
  Text,
  Image,
  Flex,
  UnstyledButton,
  useMantineTheme,
  Divider,
} from "@mantine/core";
import { Link } from "react-router";
import Logo from "../../assets/FlixExplorerLogoNoText.png";
import { BASE_URL } from "../../utilities/baseURL";
import classes from "./WatchlistItem.module.css";

function WatchlistItem({ content, handleRemove }) {
  const dateToFormat = new Date(content.release_date);
  const month = dateToFormat.toLocaleString("en", { month: "long" });
  const day = dateToFormat.getDate();
  const year = dateToFormat.getFullYear();
  const posterURI = content.poster_path ? BASE_URL + content.poster_path : Logo;
  const theme = useMantineTheme();
  return (
    <>
      <Card bg="var(--mantine-color-body)">
        <Flex gap={20} align={{ base: "flex-start", sm: "center" }}>
          <Flex direction="column">
            <Image
              w={100}
              src={posterURI}
              radius="md"
              fit="cover"
              pt={0}
              mt={0}
              alt={content.title + " movie poster"}
            />
            <Flex
              direction="column"
              align="flex-start"
              pt={10}
              gap={1}
              hiddenFrom="sm"
            >
              <Link
                to={`/details/${content.id}`}
                style={{
                  color: `${theme.colors.brand[8]}`,
                  fontWeight: "800",
                }}
                className={classes.links}
              >
                View details
              </Link>
              <UnstyledButton
                className={classes.links}
                c={theme.colors.brand[8]}
                fw={800}
                onClick={() => handleRemove(content.id)}
              >
                Remove
              </UnstyledButton>
            </Flex>
          </Flex>
          <Flex direction="column">
            <Title order={3} size={"sm"} mt={{ base: 0, sm: -16 }}>
              {content.title}
            </Title>
            <Text c="dimText" size={"sm"}>{`${month}, ${day} ${year}`}</Text>
            <Text c="dimText" size={"sm"}>
              {content.overview}
            </Text>
            <Flex align="flex-start" pt={10} gap={10} visibleFrom="sm">
              <Link
                to={`/details/${content.id}`}
                style={{
                  color: `${theme.colors.brand[8]}`,
                  fontWeight: "800",
                }}
                className={classes.links}
              >
                View details
              </Link>
              <UnstyledButton
                className={classes.links}
                c={theme.colors.brand[8]}
                fw={800}
                onClick={() => handleRemove(content.id)}
              >
                Remove
              </UnstyledButton>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      <Divider my={10} />
    </>
  );
}

export default WatchlistItem;
