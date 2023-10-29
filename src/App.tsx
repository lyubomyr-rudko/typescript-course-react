import "./App.css";
import {Container, Heading, Loader, Table} from "./lesson17-homework/components/Components.styled.tsx";
import { TableHead } from "./lesson17-homework/components/TableHead.tsx";
import {TableBody} from "./lesson17-homework/components/TableBody.tsx";
import {useEffect} from "react";
import {getAllUsers} from "./lesson17-homework/store/thunkActions.ts";
import {useAppDispatch, useAppSelector} from "./lesson17-homework/store";
import {Filters} from "./lesson17-homework/components/Filters.tsx";

export function App() {
  const dispatch = useAppDispatch()
  const {isLoading} = useAppSelector((state) => state.users)
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  return (
    <>
      <Container>
        {isLoading
          ?
          <Loader>Loading...</Loader>
          :
          <>
            <Filters />
            <Heading>Users</Heading>
            <Table>
              <TableHead></TableHead>
              <TableBody></TableBody>
            </Table>
          </>}
      </Container>
    </>
  )
}

export default App;
