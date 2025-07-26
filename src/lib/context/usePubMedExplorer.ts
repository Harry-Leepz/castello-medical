import { useContext } from "react";

import { PubMedExplorerContext } from "./PubMedExplorerContext";

export function usePubMedExplorer() {
  const context = useContext(PubMedExplorerContext);
  if (!context) {
    throw new Error(
      "usePubMedExplorer must be used within a PubMedExplorerProvider"
    );
  }
  return context;
}
