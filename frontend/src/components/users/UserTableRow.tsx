import type { User } from '../../types';

interface UserTableRowProps {
  user: User;
  onClick: () => void;
}

export function UserTableRow({ user, onClick }: UserTableRowProps) {
  return (
    <tr onClick={onClick} className="hover:bg-gray-50 cursor-pointer">
      <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 font-medium truncate max-w-[200px]">
        {user.name}
      </td>
      <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 truncate max-w-[250px]">
        {user.email}
      </td>
      <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 truncate max-w-[392px]">
        {user?.address}
      </td>
    </tr>
  );
}
