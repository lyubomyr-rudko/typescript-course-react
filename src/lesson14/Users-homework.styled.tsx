import styled from 'styled-components';

export const Container = styled.div`
  background-color: white;
  padding: 20px;
`;

export const HeadText = styled.h2`
  font-size: 24px;
  color: grey;
  margin: 0 0 30px 20px;
`;

export const HeaderList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const HeaderSublist = styled.li`
  color: grey;
`;

export const UnorderedList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid grey;
`;

export const List = styled.li`
  color: black;
  width: 150px;
`;

interface IHairColor {
  hairColor: string;
}

export const HairColor = styled.p<IHairColor>`
  background: ${(props) => props.hairColor};
  border-radius: 20px;
  width: 20px;
  height: 20px;
`;

export const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.p`
  color: black;
  font-size: 50px;
`;

export const Button = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`;

export const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const UserForm = styled.form`
  background-color: rgb(255, 255, 255);
  padding 20px;
  display flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: black;
`;

export const Input = styled.input`
  background-color: rgb(255, 255, 255);
  margin: 10px;
  color: black;
`;

export const Select = styled.select`
  background-color: rgb(255, 255, 255);
  color: black;
  margin: 10px;
`;

export const ButtonSubmit = styled.button`
  background-color: white;
  color: black;
  :hover {
    color: blue;
  }
`;
