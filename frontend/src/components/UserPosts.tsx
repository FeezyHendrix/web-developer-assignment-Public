import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { getUserPosts } from '../api';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ErrorDisplay } from './ui/ErrorDisplay';
import { PostCard } from './posts/PostCard';
import { NewPostCard } from './posts/NewPostCard';
import NewPostModal from './NewPostModal';

export default function UserPosts() {
  const { userId } = useParams<{ userId: string }>();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { state } = useLocation();
  const { name, email } = state;

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', { userId }],
    queryFn: getUserPosts,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message="Error loading posts" />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2 text-text-light" />
          Back to Users
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <div>
          <h1 className="text-4xl sm:text-4xl font-medium text-text-bold md-10">
            {name}
          </h1>
          <p className="text-sm sm:text-base text-text-light">
            {email} • {posts?.length} Posts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <NewPostCard onClick={() => setIsModalOpen(true)} />
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {isModalOpen && (
        <NewPostModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
