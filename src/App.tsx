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
