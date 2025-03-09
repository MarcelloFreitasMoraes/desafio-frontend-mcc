import React from 'react';
import { usePaginationStore } from '../constants/usePaginationStore';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';

interface PaginationProps {
  hasNext: boolean;
  hasPrevious: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ hasNext, hasPrevious }) => {
  const { page, setPage } = usePaginationStore();

  return (
    <div className="flex justify-center items-center gap-4 p-4">
      <button
        className={`bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50 ${hasPrevious ? 'cursor-pointer' : 'cursor-not-allowed'} `}
        onClick={() => setPage(page - 1)}
        disabled={!hasPrevious}
      >
        <ArrowBigLeft />
      </button>
      <span className="text-white font-bold">Page {page}</span>
      <button
        className={`bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50 ${hasNext ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        onClick={() => setPage(page + 1)}
        disabled={!hasNext}
      >
        <ArrowBigRight />
      </button>
    </div>
  );
};

export default Pagination;
