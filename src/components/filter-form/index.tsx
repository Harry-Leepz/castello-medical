import { useState } from "react";

import Input from "../input";
import type { PubMedFilters } from "../../lib/types";

type FilterFormProps = {
  initialFilters: PubMedFilters;
  onSubmit: (filters: PubMedFilters) => void;
};

export default function FilterForm({
  initialFilters,
  onSubmit,
}: FilterFormProps) {
  const [form, setForm] = useState<PubMedFilters>(initialFilters);

  const handleChange = (field: keyof PubMedFilters, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <h2 className='text-lg font-semibold text-gray-800'>Filters</h2>

      <Input
        label='Title'
        name='title'
        value={form.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder='e.g. Robotics'
      />

      <Input
        label='Author'
        name='author'
        value={form.author || ""}
        onChange={(e) => handleChange("author", e.target.value)}
        placeholder='e.g. Smith'
      />

      <Input
        label='Journal'
        name='journal'
        value={form.journal || ""}
        onChange={(e) => handleChange("journal", e.target.value)}
        placeholder='e.g. Nature'
      />

      <button
        type='submit'
        className='mt-2 bg-[#002b74] text-white px-4 py-2 rounded transition text-sm'
      >
        Apply Filters
      </button>
    </form>
  );
}
