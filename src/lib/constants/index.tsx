import type { PubMedArticle } from "../types";

export const tableHeaders: { label: string; key: keyof PubMedArticle }[] = [
  { label: "Title", key: "title" },
  { label: "Authors", key: "authors" },
  { label: "Journal", key: "fulljournalname" },
  { label: "Published Date", key: "pubdate" },
  { label: "Pages", key: "pages" },
  { label: "DOI", key: "doi" },
];
