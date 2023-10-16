import styled from "styled-components";

interface IBlockProps {
  color: string;
}

export const HairType = styled.div<IBlockProps>`
  font-weight: bold;
  color: pink;
  width: 25px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${(props) =>
    props.color === "Blond"
      ? "#b38b67"
      : props.color === "Chestnut"
      ? "#954535"
      : props.color === "Auburn"
      ? "#b00b69"
      : props.color};
`;

export const Table = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 25px;
  font-weight: 600;
`;
export const FormWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;
export const AddNewUserForm = styled.form`
  z-index: 6;
  opacity: 1;
  margin-top: 50px;
  width: 330px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 3px solid black;
  padding: 10px;
`;
export const FormFieldWrapper = styled.fieldset`
  margin: 10px 0 10px 5%;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;
export const Legend = styled.legend`
  background-color: black;
  padding: 2px;
  color: white;
`;

export const TableFieldWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const InfoWrapper = styled.div`
  display: flex;
  width: 250px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 5px 3px;
`;
export const HeaderWrapper = styled.div`
  display: flex;
  width: 250px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 10px 3px;
  font-size: 22px;
  font-weight: 600;
  background-color: grey;
  color: white;
`;

export const Button = styled.button`
  width: 75%;
  font-weight: 600;
  border-radius: 10px;
  margin: 3px 3px;
  padding: 3px 0;
  border: 2px solid black;
  background-color: gainsboro;
`;
