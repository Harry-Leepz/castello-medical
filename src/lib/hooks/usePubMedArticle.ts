import { useQuery } from "@tanstack/react-query";

import type {
  PubMedArticle,
  PubMedFilters,
  PubMedSummaryResponse,
} from "../types";

/**
 * Custom hook for fetching PubMed articles with AI-related research focus
 *
 * This hook provides a convenient way to search and retrieve PubMed articles
 * using the NCBI E-utilities API. It performs a two-step process:
 * 1. Searches for article IDs using the esearch API
 * 2. Fetches detailed article summaries using the esummary API
 *
 * @param filters - Object containing search criteria
 * @param filters.title - Optional title search term (searches in article titles)
 * @param filters.author - Optional author name (searches in author fields)
 * @param filters.journal - Optional journal name (searches in journal fields)
 *
 * @returns React Query result object containing:
 *   - data: Array of PubMedArticle objects (empty array if no results)
 *   - isLoading: Boolean indicating if the request is in progress
 *   - error: Error object if the request failed
 *   - isError: Boolean indicating if an error occurred
 *   - refetch: Function to manually refetch the data
 *   - Additional React Query properties for state management
 *
 * @example
 * ```tsx
 * const { data: articles, isLoading, error } = usePubMedArticles({
 *   title: "machine learning",
 *   author: "Smith",
 *   journal: "Nature"
 * });
 * ```
 */

export function usePubMedArticles(filters: PubMedFilters) {
  return useQuery<PubMedArticle[]>({
    queryKey: ["pubmedArticles", filters],
    queryFn: async () => {
      const searchTerm = buildSearchQuery(filters);

      const searchUrl = new URL(
        "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
      );
      searchUrl.searchParams.append("db", "pubmed");
      searchUrl.searchParams.append("retmode", "json");
      searchUrl.searchParams.append("term", searchTerm);
      searchUrl.searchParams.append("retmax", "20");

      const searchRes = await fetch(searchUrl.toString());
      const searchData = await searchRes.json();

      const ids: string[] = searchData?.esearchresult?.idlist ?? [];

      if (!ids.length) return [];

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

  const terms = [];
  if (title) terms.push(`${title}[title]`);
  if (author) terms.push(`${author}[author]`);
  if (journal) terms.push(`${journal}[journal]`);

  return terms.join(" AND ");
}
