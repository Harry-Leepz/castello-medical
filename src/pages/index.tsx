import FilterForm from "../components/filter-form";
import Header from "../components/header";
import MainLayout from "../components/layout";

import { usePubMedExplorer } from "../lib/context/usePubMedExplorer";

export default function Home() {
  const {
    filters,
    setFilters,

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
          <></>
        )}
      </MainLayout>
    </div>
  );
}
