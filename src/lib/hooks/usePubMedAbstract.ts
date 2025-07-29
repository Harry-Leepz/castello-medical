import { useQuery } from "@tanstack/react-query";

import { mockPubMedAbstracts } from "../mock-data/pubmedMockData";

/**
 * Custom hook for fetching PubMed article abstracts
 *
 * This hook retrieves the full abstract text for a specific PubMed article
 * using the NCBI E-utilities efetch API. It's designed to work seamlessly
 * with the usePubMedArticles hook to provide detailed article content.
 *
 * @param pmid - The PubMed unique identifier (PMID) for the article
 *               Can be null to disable fetching (useful for conditional rendering)
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

export function usePubMedAbstract(pmid: string | null, useMock = false) {
  return useQuery<string>({
    queryKey: ["pubmedAbstract", pmid],
    queryFn: async () => {
      if (!pmid) throw new Error("PMID is required");

      if (useMock) {
        const mock = mockPubMedAbstracts[pmid];
        if (!mock) throw new Error(`No mock abstract for PMID ${pmid}`);

        // ✅ Just return the string abstract
        return new Promise<string>((resolve) =>
          setTimeout(() => resolve(mock.abstract), 300)
        );
      }

      // fallback to real API if not using mock
      const res = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmid}&retmode=text&rettype=abstract`
      );
      return res.text();
    },
    enabled: !!pmid,
    staleTime: 1000 * 60 * 10,
  });
}
