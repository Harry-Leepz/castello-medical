import type { PubMedArticle } from "../types";

/**
 * Formats PubMed article field values for consistent display
 *
 * Handles special cases like concatenating author names and extracting DOI values
 * from multiple possible locations. Provides fallback values for missing data.
 *
 * @param article - The PubMedArticle object
 * @param key - The field key to format
 * @returns Formatted string value with appropriate fallbacks
 *
 * @example
 * ```tsx
 * formatArticleValue(article, "authors") // "John Smith, Jane Doe"
 * formatArticleValue(article, "doi")     // "10.1000/182" or "—"
 * formatArticleValue(article, "title")   // "Article Title" or "-"
 * ```
 */
export function formatArticleValue(
  article: PubMedArticle,
  key: string
): string {
  if (key === "authors") {
    return article.authors.map((a) => a.name).join(", ");
  }

  if (key === "doi") {
    const doiEntry = article.articleids?.find((id) => id.idtype === "doi");
    const fallback = article.elocationid?.replace(/^doi:\s*/, "").trim();
    return doiEntry?.value || fallback || "—";
  }

  const value = article[key as keyof PubMedArticle];
  return typeof value === "string" ? value : "-";
}
