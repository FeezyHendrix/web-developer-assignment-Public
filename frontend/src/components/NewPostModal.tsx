import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { createPost } from '../api';
import { useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'sonner';

interface NewPostModalProps {
  onClose: () => void;
}

export default function NewPostModal({ onClose }: NewPostModalProps) {
  const queryClient = useQueryClient();
  const { userId } = useParams<{ userId: string }>();
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully');
      onClose();
    },
    onError: () => {
      toast.error('Error creating post');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    const data = { title, body, userId: userId || '' };
    e.preventDefault();
    createPostMutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-medium text-text-bold">
            New Post
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-text-light mb-1"
            >
              Post title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="body"
              className="block text-sm font-medium text-text-light mb-1"
            >
              Post content
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write something mind-blowing"
              className="w-full px-3 py-2 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 h-10 flex items-center text-text-light hover:text-gray-900 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createPostMutation.isPending}
              className="px-4 py-2 h-10 flex items-center bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {createPostMutation?.isPending ? (
                <span className="flex items-center">
                  Publish{' '}
                  <ThreeDots
                    height="40"
                    width="40"
                    color="#fff"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                </span>
              ) : (
                'Publish'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
