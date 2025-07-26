import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook for fetching PubMed article abstracts
 *
 * This hook retrieves the full abstract text for a specific PubMed article
 * using the NCBI E-utilities efetch API. It's designed to work seamlessly
 * with the usePubMedArticles hook to provide detailed article content.
 *
 * @param pmid - The PubMed unique identifier (PMID) for the article
 *               Can be null to disable fetching (useful for conditional rendering)
 *
 * @returns React Query result object containing:
 *   - data: String containing the full abstract text in plain text format
 *   - isLoading: Boolean indicating if the request is in progress
 *   - error: Error object if the request failed
 *   - isError: Boolean indicating if an error occurred
 *   - refetch: Function to manually refetch the data
 *   - Additional React Query properties for state management
 *
 * @example
 * ```tsx
 * // Basic usage with a known PMID
 * const { data: abstract, isLoading, error } = usePubMedAbstract("12345678");
 *
 * // Conditional usage (won't fetch if selectedArticle is null)
 * const { data: abstract, isLoading } = usePubMedAbstract(
 *   selectedArticle?.uid || null
 * );
 * ```
 */

export function usePubMedAbstract(pmid: string | null) {
  return useQuery<string>({
    queryKey: ["pubmedAbstract", pmid],
    queryFn: async () => {
      const res = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid}&retmode=text&rettype=abstract`
      );
      return res.text();
    },
    enabled: !!pmid, // only run if pmid is provided
    staleTime: 1000 * 60 * 10,
  });
}
