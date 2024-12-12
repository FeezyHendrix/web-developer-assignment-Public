import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCount, getUsers } from '../api';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ErrorDisplay } from './ui/ErrorDisplay';
import { Pagination } from './users/Pagination';

export default function UserTable() {
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers(page),
  });

  const count = useQuery({
    queryKey: ['count'],
    queryFn: getCount,
  });

  const totalPages = count?.data?.count / 4;

  if (error) return <ErrorDisplay message="Error loading users" />;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-6xl sm:text-6xl font-medium mb-8 sm:mb-8 text-text-bold">
        Users
      </h1>

      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="min-w-full divide-gray-200">
          <thead className="">
            <tr>
              <th className="px-4 sm:px-6 py-6 text-left text-xs sm:text-sm font-medium text-text-light">
                Full Name
              </th>
              <th className="px-4 sm:px-6 py-6 text-left text-xs sm:text-sm font-medium text-text-light">
                Email Address
              </th>
              <th className="hidden sm:table-cell px-4 sm:px-6 py-6 text-left text-xs sm:text-sm font-medium text-text-light">
                Address
              </th>
            </tr>
          </thead>

          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <tbody className="divide-y divide-gray-200">
              {users?.map((user) => (
                <tr
                  key={user.id}
                  onClick={() =>
                    navigate(`/users/${user.id}`, {
                      state: { name: user?.name, email: user?.email },
                    })
                  }
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 sm:px-6 py-6 text-xs sm:text-sm text-text-light font-medium">
                    {user.name}
                  </td>
                  <td className="px-4 sm:px-6 py-6 text-xs sm:text-sm text-text-light">
                    {user.email}
                  </td>
                  <td className="hidden sm:table-cell px-4 sm:px-6 py-6 text-xs sm:text-sm text-text-light max-w-[392px] truncate">
                    {user?.address}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
