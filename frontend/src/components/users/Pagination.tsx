import { MoveLeft, MoveRight } from 'lucide-react';
import { PaginationButton } from './PaginationButton';
import { generatePaginationItems } from '../../utils/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const items = generatePaginationItems(currentPage, totalPages);

  return (
    <nav className="flex justify-end items-center space-x-1 mt-6">
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <MoveLeft className="h-4 w-4 mx-1" />
        Previous
      </PaginationButton>

      {items.map((item, index) => {
        if (item === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-sm text-gray-500"
            >
              ...
            </span>
          );
        }

        if (typeof item === 'number') {
          return (
            <PaginationButton
              key={item}
              onClick={() => onPageChange(item)}
              active={currentPage === item}
            >
              {item}
            </PaginationButton>
          );
        }
      })}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next <MoveRight className="h-4 w-4 mx-1" />
      </PaginationButton>
    </nav>
  );
}
