import { Trash2 } from 'lucide-react';
import type { Post } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Oval } from 'react-loader-spinner';
import { deletePost } from '../../api';
import { toast } from 'sonner';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully');
    },
    onError: () => {
      toast.error('Error deleting post');
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 relative min-h-[200px] flex flex-col shadow-md">
      <button
        onClick={() => deleteMutation.mutate(post.id)}
        className="absolute top-4 right-4 text-red-500 hover:text-red-600"
      >
        {deleteMutation?.isPending ? (
          <Oval
            color="#000"
            secondaryColor="#eee"
            height={20}
            width={20}
          />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </button>
      <h2 className="text-lg sm:text-xl font-medium mb-4 text-text-light">
        {post.title}
      </h2>
      <p className="text-sm sm:text-base text-text-light flex-grow font-normal">
        {post.body}
      </p>
    </div>
  );
}
