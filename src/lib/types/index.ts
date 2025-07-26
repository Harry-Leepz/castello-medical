/**
 * Filters that can be used when querying PubMed articles.
 */
export type PubMedFilters = {
  title?: string;
  author?: string;
  journal?: string;
};

/**
 * Represents the structure of a PubMed article summary returned from the API.
 */
export type PubMedArticle = {
  uid: string;
  title: string;
  fulljournalname: string;
  pubdate: string;
  authors: { name: string }[];
  pages?: string;
  doi?: string;
};

/**
 * Response structure from the PubMed esummary API.
 */
export type PubMedSummaryResponse = {
  result: {
    uids: string[];
    [uid: string]: PubMedArticle | string[] | string;
  };
};
