import type { PubMedArticle } from "../types";

export const mockPubMedArticles: PubMedArticle[] = Array.from({
  length: 10,
}).map((_, index) => ({
  uid: `${100000 + index}`,
  title: `Artificial Intelligence in Healthcare – Study ${index + 1}`,
  fulljournalname: "Journal of Medical AI",
  pubdate: `202${index % 5}-01-01`,
  authors: [{ name: "Smith, John" }, { name: "Doe, Jane" }],
  pages: `${index * 10 + 1}-${index * 10 + 10}`,
  doi: `10.1234/jmai.${index + 1}`,
}));

type PubMedAbstract = {
  uid: string;
  title: string;
  authors: string[];
  journal: string;
  pubDate: string;
  abstract: string;
};

export const mockPubMedAbstracts: Record<string, PubMedAbstract> = {
  "100001": {
    uid: "10001",
    title: "AI Applications in Robotic Surgery",
    authors: ["Smith J", "Doe A"],
    journal: "Journal of Medical Robotics",
    pubDate: "2023 Mar 12",
    abstract:
      "This study explores the integration of artificial intelligence into robotic surgical systems. The results show enhanced precision, reduced operating time, and improved patient outcomes.",
  },
  "100002": {
    uid: "100002",
    title: "Machine Learning in Radiology",
    authors: ["Nguyen L", "Patel R"],
    journal: "AI in Medicine",
    pubDate: "2022 Dec 01",
    abstract:
      "We present a novel deep learning approach for detecting anomalies in radiological images. Our method achieves state-of-the-art accuracy on benchmark datasets.",
  },
  "1000003": {
    uid: "1000003",
    title: "Ethical Considerations of AI in Healthcare",
    authors: ["Ali M", "Chen Y"],
    journal: "Bioethics and Technology",
    pubDate: "2021 Jul 21",
    abstract:
      "This paper discusses the ethical implications of deploying AI in clinical settings, including bias, transparency, and accountability. Recommendations for policy development are provided.",
  },
  "1000004": {
    uid: "1000004",
    title: "Natural Language Processing for Clinical Notes",
    authors: ["Kumar S", "Lee T"],
    journal: "Journal of Biomedical Informatics",
    pubDate: "2023 Jan 5",
    abstract:
      "We introduce a lightweight NLP pipeline that extracts patient data from unstructured clinical notes with high precision, supporting downstream applications like diagnosis support and billing.",
  },
};
