import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/utilities/theme.ts";
const queryClient = new QueryClient();
import UserProvider from "./store/userContext.tsx";
import WatchlistProvider from "./store/watchlistContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <WatchlistProvider>
          <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme}>
              <App />
            </MantineProvider>
          </QueryClientProvider>
        </WatchlistProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
