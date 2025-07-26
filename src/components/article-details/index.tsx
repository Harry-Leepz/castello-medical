import { usePubMedExplorer } from "../../lib/context/usePubMedExplorer";
import { usePubMedAbstract } from "../../lib/hooks/usePubMedAbstract";

export default function ArticleDetailPanel() {
  const { selectedArticle, setSelectedArticle } = usePubMedExplorer();
  const { data: abstract, isLoading } = usePubMedAbstract(
    selectedArticle?.uid ?? null,
    true
  );
  if (!selectedArticle) return null;

  return (
    <div className='fixed inset-0 bg-black/10 flex justify-end z-50'>
      <div className='w-full max-w-xl bg-white h-full p-6 shadow-lg overflow-y-auto'>
        <button
          onClick={() => setSelectedArticle(null)}
          className='text-gray-500 text-sm mb-4 hover:underline'
        >
          Close
        </button>

        <h2 className='castello-dark text-xl font-bold mb-2'>
          {selectedArticle.title}
        </h2>

        <div className='space-y-2 text-sm castello-dark'>
          <p>
            <strong>Journal:</strong> {selectedArticle.fulljournalname}
          </p>
          <p>
            <strong>Published:</strong> {selectedArticle.pubdate}
          </p>
          <p>
            <strong>DOI:</strong> {selectedArticle.doi || "N/A"}
          </p>
          <p>
            <strong>Pages:</strong> {selectedArticle.pages || "N/A"}
          </p>
          <p>
            <strong>Authors:</strong>{" "}
            {selectedArticle.authors.map((a) => a.name).join(", ")}
          </p>
        </div>

        <h3 className='castello-dark text-lg font-semibold mt-6 mb-2'>
          Abstract
        </h3>
        {isLoading ? (
          <p className='text-gray-500'>Loading abstract...</p>
        ) : abstract ? (
          <p className='whitespace-pre-wrap text-sm text-gray-800'>
            {abstract}
          </p>
        ) : (
          <p className='text-gray-500'>No abstract found.</p>
        )}
      </div>
    </div>
  );
}
