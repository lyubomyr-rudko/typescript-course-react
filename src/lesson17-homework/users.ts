import { IUser } from './types';

export const fetchData = async (): Promise<IUser[]> => {
  const response = await fetch('http://localhost:3004/users');
  if (!response.ok) {
    throw new Error('Fetching users failed');
  }
  const data: IUser[] = await response.json();
  return data;
};

export const updateData = async (id: string, body: { isLike: boolean }): Promise<IUser> => {
  const response = await fetch(`http://localhost:3004/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Updating user failed');
  }
  const data: IUser = await response.json();
  return data;
};

export const deleteData = async (id: string): Promise<void> => {
  const response = await fetch(`http://localhost:3004/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Deleting user failed');
  }
};

