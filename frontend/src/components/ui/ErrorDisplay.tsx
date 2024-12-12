import React from 'react';

interface ErrorDisplayProps {
  message?: string;
}

export function ErrorDisplay({ message = 'An error occurred' }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">{message}</p>
    </div>
  );
}