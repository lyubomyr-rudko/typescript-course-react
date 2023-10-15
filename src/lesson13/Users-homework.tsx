import usersData from "../users-data";
import { TUser } from "../users-data";
import { HairType, InfoWrapper, RowHeader, Table, TableRow } from "./Users-homework.styled";

const categorys = [
  { category: "firstName", text: "User Name" },
  { category: "age", text: "Age" },
  { category: "email", text: "Email" },
  { category: "gender", text: "Gender" },
  { category: "hair", text: "Hair Color" },
  { category: "birthDate", text: "Birth Date" },
  { category: "phone", text: "Phone Number" },
] as const;

type TCategory = Pick<
  TUser,
  "firstName" | "lastName" | "gender" | "birthDate" | "phone" | "hair" | "age" | "email"
>;
interface IUserProps {
  data: TUser;
  category: keyof TCategory;
}

const User = (props: IUserProps) => {
  const { data, category } = props;
  const info =
    category === "firstName" ? (
      data.lastName + " " + data.firstName
    ) : category === "hair" ? (
      <HairType color={data.hair.color}></HairType>
    ) : (
      data[category]
    );
  return <InfoWrapper>{info}</InfoWrapper>;
};

export function Users() {
  return (
    <Table>
      {categorys.map((category, index) => (
        <TableRow key={index}>
          <RowHeader>{category.text}</RowHeader>
          {usersData.map((user) => (
            <User data={user} category={category.category} key={user.id} />
          ))}
        </TableRow>
      ))}
    </Table>
  );
}

export default Users;
