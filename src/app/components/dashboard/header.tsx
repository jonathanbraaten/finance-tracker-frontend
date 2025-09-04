import { Avatar, AvatarGroup, AvatarIcon } from '@heroui/avatar';
import { API_URL } from 'lib/env';
import { User } from 'lib/types/transaction';
import { cookies } from 'next/headers';

async function getUser(): Promise<User> {
  const cookie = (await cookies()).toString();
  const response = await fetch(`${API_URL}/accounts/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: cookie,
    },
  });
  return response.json();
}
export default async function Header() {
  const user = await getUser();
  return (
    <header className="flex justify-between px-10  border-b border-gray-200 py-3">
      <div></div>

      <Avatar name={user.first_name} />
    </header>
  );
}
3;
