import React from 'react';

interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function PaginationButton({
  children,
  active,
  className = '',
  ...props
}: PaginationButtonProps) {
  return (
    <button
      className={` flex items-center justify-center
        px-3 py-2 text-sm rounded-md
        ${
          active
            ? 'bg-button-active text-button-active-text'
            : 'text-gray-500 hover:bg-gray-100'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
