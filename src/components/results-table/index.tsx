type TableHeader<T> = {
  label: string;
  key: keyof T;
};

type ResultsTableProps<T> = {
  data: T[];
  headers: TableHeader<T>[];
  onRowClick?: (row: T) => void;
  formatCell?: (row: T, key: keyof T) => React.ReactNode;
};

export default function ResultsTable<T>({
  data,
  headers,
  onRowClick,
  formatCell,
}: ResultsTableProps<T>) {
  return (
    <div className='w-full overflow-x-auto overflow-y-auto'>
      <table className='min-w-[800px] text-xs text-left bg-white shadow-md rounded border border-gray-200'>
        <thead className='castello-light castello-dark'>
          <tr>
            {headers.map((header) => (
              <th key={String(header.key)} className='px-4 py-3'>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className='hover:bg-slate-100 cursor-pointer border-t'
              onClick={() => onRowClick?.(row)}
            >
              {headers.map(({ key }) => (
                <td key={String(key)} className='px-4 py-3'>
                  {formatCell
                    ? formatCell(row, key)
                    : (row[key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
