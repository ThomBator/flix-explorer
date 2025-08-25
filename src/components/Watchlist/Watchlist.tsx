import { useUser } from "@/store/userContext";
import { Container, Title, Text } from "@mantine/core";

function Watchlist() {
  const { user } = useUser();

  if (!user) {
    return (
      <Container>
        <Text>Log in now to build your watchlist!</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Watchlist</Title>
    </Container>
  );
}

export default Watchlist;
