import { useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { useAppSelector, useAppDispatch } from './hooks';
import { fetchUsers, updateUser, deleteUser } from './store/reducers/ActionCreators';
import { filteredUsersSelector } from './store/selectors';
import { setFilters } from './store/reducers/filtersSlice';

import Form from './Form';
import User from './User';

interface IPayloadFilter {
  age: string;
  eyeColor: string;
  gender: string;
}
export function Users() {

  const dispatch = useAppDispatch();
  const filteredUsers = useAppSelector(filteredUsersSelector);
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      gender: "all",
      eyeColor: "all",
      age: "all",
    }
  });
  const { watch } = methods;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  useEffect(() => {
    const subscription = watch((filter) => dispatch(setFilters(filter as IPayloadFilter)));
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleLike = useCallback((id: number, body: { isLike: boolean }) => {
    dispatch(updateUser({ id, body }));
  }, []);

  const handledelete = useCallback((id: number) => {
    dispatch(deleteUser(id));
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <Form />
      </FormProvider>
      <ul>
        {filteredUsers.map((user) => (
          <User user={user} key={user.id} handleLike={handleLike} handledelete={handledelete} />
        ))}
      </ul>
    </>
  );
}

export default Users;
