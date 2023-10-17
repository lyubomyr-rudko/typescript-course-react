import { TUser } from "../../../users-data";

import { Table, Thead, Tbody, HairColorIcon } from './UsersTable.styled'

interface IUserProps {
  data: TUser[];
  tableHead: string[];
  maxPosition: number;
  handleMove: (id: number, position: number, index: number, move: "up" | "down") => void
}

const hairColors: { [key: string]: string } = {
  black: '#000',
  blond: '#faf0be',
  brown: '#5c4827 ',
  chestnut: '#bdaa8d',
  auburn: '#9d3e0c',
};

const UsersTable = (props: IUserProps) => {
  const { data, tableHead, maxPosition, handleMove } = props;
  return (
    <Table>
      <Thead>
        <tr>
          {tableHead.map(head => <th key={head}>{head}</th>)}
        </tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>
              <button disabled={item.position <= 1} onClick={() => handleMove(item.id, item.position, index, 'up')}>Up</button>
              <button disabled={item.position >= maxPosition} onClick={() => handleMove(item.id, item.position, index, 'down')}>Down</button>
            </td>
            <td>{item.firstName} {item.lastName}</td>
            <td>{item.gender}</td>
            <td><HairColorIcon color={hairColors[`${item.hair.color.toLowerCase()}`]} /></td>
            <td>{item.birthDate}</td>
            <td>{item.phone}</td>
          </tr>
        ))
        }
      </Tbody>
    </Table>
  );
};

export default UsersTable;