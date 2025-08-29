import { useUser } from "@/store/userContext";
import { useWatchlist } from "@/store/watchlistContext";
import { Container, Title, Box } from "@mantine/core";
import PageHeader from "../PageHeader/PageHeader";
import WatchlistItem from "../WatchlistItem/WatchlistItem";

function Watchlist() {
  const { user } = useUser();
  const { items, handleRemoveWatchlist } = useWatchlist();
  const posterURI = items[0]?.backdrop_path ? items[0].backdrop_path : null;

  if (!user) {
    return (
      <>
        <PageHeader bgPath={null}>
          <Title c="altText" order={1}>
            Log in now to build your watchlist!
          </Title>
        </PageHeader>
        <Container my={200}></Container>
      </>
    );
  }

  return (
    <>
      <PageHeader bgPath={posterURI}>
        <Title order={1} c="#fff">
          {user.firstName}'s Watchlist
        </Title>
      </PageHeader>
      <Container mt={20}>
        {items.length === 0 && (
          <Box>
            <Title c="dimText" order={2}>
              No items yet!
            </Title>
          </Box>
        )}
        {items.length > 0 &&
          items.map((item) => (
            <WatchlistItem
              key={item.id}
              content={item}
              handleRemove={handleRemoveWatchlist}
            />
          ))}
      </Container>
    </>
  );
}

export default Watchlist;
