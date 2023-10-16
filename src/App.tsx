import {Context, createContext, useEffect, useState} from "react";
import "./App.css";
import {Container, Heading, Loader, Table} from "./lesson14/Users-homework.styled.tsx";
import {TableHead} from "./lesson14/components/TableHead.tsx";
import TableBody from "./lesson14/Users-homework.tsx";
import Button from "./lesson14/components/Button.tsx";
import Modal from "./lesson14/components/Modal.tsx";
import UserForm from "./lesson14/components/UserForm.tsx";
import {IUser, TAppContext} from "./lesson14/types.ts";
import {getUsers, TUpdateUsersPositionsParams, updateUserList} from "./lesson14/api.ts";

export const AppContext:Context<TAppContext> = createContext<TAppContext>({} as TAppContext)

export function App() {
  const [users, setUsers] = useState<Array<IUser>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [swappedUsers, setSwappedUsers] = useState<TUpdateUsersPositionsParams | null>(null)

  useEffect(() => {
    setIsLoading(true)
    getUsers()
      .then((res) => setUsers(res.data))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    swappedUsers && updateUserList(swappedUsers)
      .then(res => setUsers(res.data))
  }, [swappedUsers])

  const onMoveUser = (index: number, direction: string): void => {
    let swappedItems: TUpdateUsersPositionsParams
    if (direction === 'down') {
      const firstUser = users[index];
      const secondUser = users[index + 1]
      swappedItems = [firstUser, secondUser];
      [[swappedItems[0].position, swappedItems[1].position] = [swappedItems[1].position, swappedItems[0].position]]
      setSwappedUsers(() => {
        return swappedItems;
      })
    } else {
      const firstUser = users[index]
      const secondUser = users[index - 1]
      swappedItems = [firstUser, secondUser];
      [[swappedItems[0].position, swappedItems[1].position] = [swappedItems[1].position, swappedItems[0].position]]
      setSwappedUsers(() => {
        return swappedItems;
      })
    }
  }

    return (
        <AppContext.Provider value={{
          users,
          isLoading,
          setIsLoading,
          onMoveUser,
          setUsers,
          setIsModalOpen
        }}>
          <Container>
            {isLoading
              ?
              <Loader>Loading...</Loader>
              :
              <>
                <Heading>Users</Heading>
                <Table>
                  <TableHead></TableHead>
                  <TableBody></TableBody>
                </Table>
                <Button
                  text={'Create user'}
                  onClick={() => setIsModalOpen(true)}
                  disabled={false}
                />
                <Modal
                  isModalOpen={isModalOpen}
                  title='Create User'
                  setIsModalOpen={setIsModalOpen}
                >
                  <UserForm />
                </Modal>
              </>}
          </Container>
        </AppContext.Provider>
    )
}

export default App;
