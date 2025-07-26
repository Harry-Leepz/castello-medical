import { createContext } from "react";
import type { PubMedArticle, PubMedFilters } from "../types";

export type PubMedExplorerContextType = {
  filters: PubMedFilters;
  setFilters: (filters: PubMedFilters) => void;
  selectedArticle: PubMedArticle | null;
  setSelectedArticle: (article: PubMedArticle | null) => void;
  articles: PubMedArticle[];
  isLoading: boolean;
  error: unknown;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  resultsPerPage: number;
};

export const PubMedExplorerContext =
  createContext<PubMedExplorerContextType | null>(null);
