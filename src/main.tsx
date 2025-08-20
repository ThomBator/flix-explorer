import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { theme, cssVariablesResolver } from "@/utilities/theme.ts";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={theme}
          cssVariablesResolver={cssVariablesResolver}
        >
          <App />
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
