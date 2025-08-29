import { Link } from "react-router";
import { Flex, Image, Text } from "@mantine/core";
import { BASE_URL } from "@/utilities/baseURL";
import Logo from "@/assets/FlixExplorerLogoNoText.png";
import { formatYear } from "@/utilities/formatDate";
import classes from "./SearchResultsListItem.module.css";

function SearchResultsListItem({ result }) {
  const posterURI = result.poster_path ? BASE_URL + result.poster_path : Logo;

  const yearStr = formatYear(result.release_date);

  console.log("Search result", result);

  return (
    <Link className={classes.link} to={`/details/${result.id}`}>
      <Flex className={classes.flex} p={10} gap={10} align="center">
        <Image w={80} src={posterURI} />
        <Flex direction="column" justify="center" align="start">
          <Text c="mainText"> {result.title}</Text>
          <Text c="mainText">{yearStr}</Text>
          <Text c="mainText">{result.vote_average.toFixed(2)} ⭐</Text>
        </Flex>
      </Flex>
    </Link>
  );
}

export default SearchResultsListItem;
