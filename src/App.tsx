import { Routes, Route } from "react-router";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import Home from "./components/Home/Home";
import CategoryResultsPage from "./components/CategoryResultsPage/CategoryResultsPage";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import SignUpPage from "./components/SignUp/SignUpPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";
import { AppShell, Box } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import Watchlist from "./components/Watchlist/Watchlist";
import ContentCard from "./components/ContentCard/ContentCard";

const content = {
  adult: false,
  backdrop_path: "/kyqM6padQzZ1eYxv84i9smNvZAG.jpg",
  id: 1078605,
  title: "Weapons",
  original_title: "Weapons",
  overview:
    "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance.",
  poster_path: "/cpf7vsRZ0MYRQcnLWteD5jK9ymT.jpg",
  media_type: "movie",
  original_language: "en",
  genre_ids: [27, 9648],
  popularity: 349.2693,
  release_date: "2025-08-04",
  video: false,
  vote_average: 7.47,
  vote_count: 644,
};

function App() {
  const pinned = useHeadroom({ fixedAt: 30 });
  return (
    <AppShell
      withBorder={false}
      header={{ height: 60, collapsed: !pinned, offset: false }}
    >
      <AppShell.Header bg="headerBg" pt={40} pb={80}>
        <HeaderMenu />
      </AppShell.Header>
      <AppShell.Main>
        <Box
          pt={120}
          mih="100dvh"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Box mb={50} component="main" style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:name" element={<CategoryResultsPage />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/details/:id" element={<DetailsPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/card" element={<ContentCard content={content} />} />
            </Routes>
          </Box>
          <Box mt="auto">
            <Footer />
          </Box>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
