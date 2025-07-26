import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PubMedExplorerProvider from "./lib/context/PubMedExplorerProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PubMedExplorerProvider>
        <App />
      </PubMedExplorerProvider>
    </QueryClientProvider>
  </StrictMode>
);
