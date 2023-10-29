import { TUser } from "../../users-data";

export const fetchData = async (): Promise<TUser[]> => {
  const response = await fetch('http://localhost:3004/users');
  if (!response.ok) throw new Error("error fetching error");
  const data: TUser[] = await response.json();
  return data;
}

export const updateData = async (id: number, body: { isLike: boolean }): Promise<TUser> => {
  const response = await fetch(`http://localhost:3004/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      isLike: body.isLike
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },

  })
  if (!response.ok) throw new Error("error PATCH ");
  const data: TUser = await response.json();
  return data;
}

export const deleteData = async (id: number): Promise<number> => {
  const response = await fetch(`http://localhost:3004/users/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error("error DELETE ");
  return id;
}