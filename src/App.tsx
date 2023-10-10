import "./App.css";
import {Container, Heading, Table} from "./lesson13/Users-homework.styled.tsx";
import {TableHead} from "./lesson13/TableHead.tsx";
import TableBody from "./lesson13/Users-homework.tsx";

export function App() {
  return (
    <Container>
      <Heading>Users</Heading>
      <Table>
        <TableHead></TableHead>
        <TableBody></TableBody>
      </Table>
    </Container>
  )
}

export default App;
