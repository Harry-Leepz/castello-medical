import FilterForm from "../components/filter-form";
import Header from "../components/header";
import MainLayout from "../components/layout";
import ResultsTable from "../components/results-table";

import { usePubMedExplorer } from "../lib/context/usePubMedExplorer";
import { tableHeaders } from "../lib/constants";
import type { PubMedArticle } from "../lib/types";
import { formatArticleValue } from "../lib/utils";
import PaginationControls from "../components/pagination-controls";

export default function Home() {
  const {
    filters,
    setFilters,
    articles,
    setSelectedArticle,

    isLoading,
    error,
  } = usePubMedExplorer();
  return (
    <div className='h-screen w-full flex flex-col'>
      <Header />

      <MainLayout
        sidebar={<FilterForm initialFilters={filters} onSubmit={setFilters} />}
      >
        {isLoading ? (
          <p className='p-4 text-gray-600'>Loading articles...</p>
        ) : error ? (
          <p className='p-4 text-red-600'>Error loading articles.</p>
        ) : (
          <>
            <ResultsTable<PubMedArticle>
              data={articles}
              headers={tableHeaders}
              onRowClick={setSelectedArticle}
              formatCell={(article, key) => formatArticleValue(article, key)}
            />
            <PaginationControls />
          </>
        )}
      </MainLayout>
    </div>
  );
}
