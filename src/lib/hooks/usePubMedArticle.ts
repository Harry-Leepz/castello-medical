import { useQuery } from "@tanstack/react-query";
import type {
  PubMedFilters,
  PubMedArticle,
  PubMedSummaryResponse,
} from "../types";

import { mockPubMedArticles } from "../mock-data/pubmedMockData";

/**
 * Custom hook for fetching paginated PubMed articles with AI-related research focus
 *
 * This hook provides a comprehensive solution for searching and retrieving PubMed articles
 * with built-in pagination support. It performs a two-step process:
 * 1. Searches for article IDs using the esearch API with pagination parameters
 * 2. Fetches detailed article summaries using the esummary API
 *
 * @param filters - Object containing search criteria
 * @param filters.title - Optional title search term (searches in article titles)
 * @param filters.author - Optional author name (searches in author fields)
 * @param filters.journal - Optional journal name (searches in journal fields)
 *
 * @param pagination - Object containing pagination configuration
 * @param pagination.page - Current page number (1-based indexing)
 * @param pagination.resultsPerPage - Number of results to fetch per page
 *
 *
 * @example
 * ```tsx
 * // Basic usage with pagination
 * const { data: articles, isLoading, error } = usePubMedArticles(
 *   {
 *     title: "machine learning",
 *     author: "Smith",
 *     journal: "Nature"
 *   },
 *   {
 *     page: 1,
 *     resultsPerPage: 20
 *   }
 * );
 * ```
 */
export function usePubMedArticles(
  filters: PubMedFilters,
  pagination: { page: number; resultsPerPage: number },
  useMock = true
) {
  const { page, resultsPerPage } = pagination;
  const retstart = (page - 1) * resultsPerPage;

  return useQuery<PubMedArticle[]>({
    queryKey: ["pubmedArticles", filters, page, useMock],
    queryFn: async () => {
      if (useMock) {
        // Simulate pagination from mock data
        const start = retstart;
        const end = retstart + resultsPerPage;
        const paginated = mockPubMedArticles.slice(start, end);
        return new Promise((resolve) =>
          setTimeout(() => resolve(paginated), 300)
        );
      }

      const searchTerm = buildSearchQuery(filters);

      //  Fetch article IDs
      const searchUrl = new URL(
        "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
      );
      searchUrl.searchParams.append("db", "pubmed");
      searchUrl.searchParams.append("retmode", "json");
      searchUrl.searchParams.append("term", searchTerm);
      searchUrl.searchParams.append("retmax", resultsPerPage.toString());
      searchUrl.searchParams.append("retstart", retstart.toString());

      const searchRes = await fetch(searchUrl.toString());
      const searchData = await searchRes.json();

      const ids: string[] = searchData?.esearchresult?.idlist ?? [];
      if (!ids.length) return [];

      // Fetch summaries
      const summaryUrl = new URL(
        "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
      );
      summaryUrl.searchParams.append("db", "pubmed");
      summaryUrl.searchParams.append("retmode", "json");
      summaryUrl.searchParams.append("id", ids.join(","));

      const summaryRes = await fetch(summaryUrl.toString());
      const summaryData: PubMedSummaryResponse = await summaryRes.json();

      const articles: PubMedArticle[] = summaryData.result.uids.map(
        (uid) => summaryData.result[uid] as PubMedArticle
      );

      return articles;
    },
    staleTime: 1000 * 60 * 5,
  });
}

function buildSearchQuery(filters: PubMedFilters): string {
  const { title, author, journal } = filters;

  const terms: string[] = [];
  if (title) terms.push(`${title}[title]`);
  if (author) terms.push(`${author}[author]`);
  if (journal) terms.push(`${journal}[journal]`);

  return terms.join(" AND ");
}
