import styled from "styled-components";

export const Table = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: white;
  color: black;
`;
export const TableRow = styled.div`
  border: 2px solid black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
export const RowHeader = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  font-weight: 600;
  border-bottom: 1px solid black;
  padding: 10px;
  background-color: pink;
`;
export const InfoWrapper = styled.li`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  font-weight: 600;
  border-bottom: 1px solid black;
  padding: 10px;
  justify-content: center;
`;

interface IBlockProps {
  color: string;
}

export const HairType = styled.div<IBlockProps>`
  font-weight: bold;
  color: pink;
  width: 16px;
  height: 100%;
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
