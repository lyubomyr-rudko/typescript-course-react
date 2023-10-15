import usersData from "../users-data";
import { TUser } from "../users-data";
import {Container, HairColor, SubContainer, SubContainerHeader, ContainerHeader, ContainerTablename } from "./Users-homework.styled"
import styles from "./Users.module.css"

interface IUserProps {
  data: TUser;
}
// TODO: Update User component to display user's name, Gender, Hair color, Birth dat and phone number
// TODO: Style this component using styled-components
// TODO: Use Users-homework.jpg or Users-homework.fig as a reference
// TODO: Add a component to display user's hair color as a colored circle HairColorIcon
// TODO: Add a color prop to HairColorIcon, so it can be used to display different colors
// TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

const User = (props: IUserProps) => {
  const { data } = props;

  return (
      <Container>
        <SubContainer>
          <span className={`${styles.dataContainer} ${styles.firstElement}`}>{data.firstName} {data.lastName}</span>
          <span className={styles.dataContainer}>{data.gender}</span>
          <span className={styles.dataContainer}><HairColor color={data.hair.color}/></span>
          <span className={styles.dataContainer}>{data.birthDate}</span>
          <span className={styles.dataContainer}>{data.phone}</span>
        </SubContainer>
      </Container>
  );
};

const Header = () => {


  return (
      <ContainerHeader>
        <SubContainerHeader>
          <span className={styles.dataContainer}>User Name</span>
          <span className={styles.dataContainer}>Gender</span>
          <span className={styles.dataContainer}>Hair Color</span>
          <span className={styles.dataContainer}>Birth date</span>
          <span className={styles.dataContainer}>Phone number</span>
        </SubContainerHeader>
      </ContainerHeader>
  );
};

export function Users() {
  // TOOD: update this component to display a header and a list of users
  // User Name | Gender | Hair Color | Birth date | Phone number
  // TODO: Style this component using styled-components
  // TODO: Use Users-homework.jpg or Users-homework.fig as a reference
  // TODO: Add your styled-components to src/lesson13/Users-homework.styled.tsx

  return (
    <div className={styles.mainContainer}>
      <ContainerTablename><div className={styles.dataContainer}>Users</div></ContainerTablename>
      <Header/>
      {usersData.map((user) => (
        <User data={user} key={user.id} />
      ))}
    </div>
  );
}

export default Users;
