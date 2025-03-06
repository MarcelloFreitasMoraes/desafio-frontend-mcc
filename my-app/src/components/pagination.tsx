import React from 'react';
import { usePaginationStore } from '../constants/usePaginationStore';

interface PaginationProps {
  hasNext: boolean;
  hasPrevious: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ hasNext, hasPrevious }) => {
  const { page, setPage } = usePaginationStore();

  return (
    <div className="flex justify-center items-center gap-4 p-4">
      <button
        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={!hasPrevious}
      >
        Anterior
      </button>
      <span className="text-white font-bold">Página {page}</span>
      <button
        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={!hasNext}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
