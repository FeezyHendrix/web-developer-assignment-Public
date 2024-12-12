import { Plus } from 'lucide-react';

interface NewPostCardProps {
  onClick: () => void;
}

export function NewPostCard({ onClick }: NewPostCardProps) {
  return (
    <button
      onClick={onClick}
      className="h-full min-h-[200px] w-full border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-400 transition-colors duration-200 flex flex-col items-center justify-center p-6 text-gray-500 hover:text-gray-600"
    >
      <Plus className="h-8 w-8 mb-2" />
      <span className="font-medium">New Post</span>
    </button>
  );
}
