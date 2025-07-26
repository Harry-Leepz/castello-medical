import { usePubMedExplorer } from "../../lib/context/usePubMedExplorer";

export default function PaginationControls() {
  const { page, setPage, articles, resultsPerPage } = usePubMedExplorer();

  const handleNext = () => setPage(page + 1);
  const handlePrev = () => setPage(Math.max(1, page - 1));

  return (
    <div className='flex justify-end gap-4 mt-6'>
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className='px-4 py-2 castello-light castello-dark text-sm rounded disabled:opacity-50'
      >
        Previous Page
      </button>
      <button
        onClick={handleNext}
        disabled={articles.length < resultsPerPage}
        className='px-4 py-2 castello-light castello-dark text-sm rounded disabled:opacity-50'
      >
        Next Page
      </button>
    </div>
  );
}
