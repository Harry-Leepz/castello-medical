import { useState } from "react";
import type { ReactNode } from "react";

import type { PubMedArticle, PubMedFilters } from "../types";

import { PubMedExplorerContext } from "./PubMedExplorerContext";
import { usePubMedArticles } from "../hooks/usePubMedArticle";

export default function PubMedExplorerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filters, setFilters] = useState<PubMedFilters>({
    title: "",
    author: "",
    journal: "",
  });
  const [page, setPage] = useState<number>(1);
  const resultsPerPage = 10;

  const [selectedArticle, setSelectedArticle] = useState<PubMedArticle | null>(
    null
  );

  const updateFilters = (newFilters: PubMedFilters) => {
    setPage(1); // Reset pagination when filters change
    setFilters(newFilters);
  };

  const {
    data = [],
    isLoading,
    error,
  } = usePubMedArticles(filters, {
    page,
    resultsPerPage,
  });

  return (
    <PubMedExplorerContext.Provider
      value={{
        filters,
        setFilters: updateFilters,
        selectedArticle,
        setSelectedArticle,
        articles: data,
        isLoading,
        error,
        page,
        setPage,
        resultsPerPage,
      }}
    >
      {children}
    </PubMedExplorerContext.Provider>
  );
}
