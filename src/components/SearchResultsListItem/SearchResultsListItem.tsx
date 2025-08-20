import { Link } from "react-router";
import { Flex, Image, Text } from "@mantine/core";
import { BASE_URL } from "@/utilities/baseURL";
import Logo from "@/assets/FlixExplorerLogoNoText.png";
import { formatYear } from "@/utilities/formatDate";
import classes from "./SearchResultsListItem.module.css";

function SearchResultsListItem({ result }) {
  const posterURI = result.poster_path ? BASE_URL + result.poster_path : Logo;

  const yearStr = formatYear(result.release_date);

  return (
    <Link className={classes.link} to={`/details/${result.id}`}>
      <Flex className={classes.flex} p={10} gap={10} align="flex-end">
        <Image w={100} src={posterURI} />
        <Text c="#000"> {`${result.title} (${yearStr})`}</Text>
      </Flex>
    </Link>
  );
}

export default SearchResultsListItem;
