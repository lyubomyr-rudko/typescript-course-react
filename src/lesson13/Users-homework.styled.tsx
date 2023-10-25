import styled from "styled-components";
import { TUser } from '../users-data';

interface THairColor {
  [key: string]: string;
}
const Haircolor: THairColor = {
   auburn: '#ac4e00',
    black: '#000',
    blond: '#c6b080',
    chestnut: '#763022',
    brown: '#3b2208',
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
`;

export const Header = styled.h2`
  font-weight: bold;
  font-size: 20px;
  color: #807f7f;
  margin-bottom: 10px;
`

export const Table = styled.table`
  /* margin: 0 auto; */
  padding: 10px 20px;
  table-layout: fixed ;
  width: 60%;
`

export const TableRow = styled.tr`
  padding: 7px 40px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
`
export const TableHeader = styled.th`
  font-weight: bold;
  color: #424242;
  width: 20%;
`
export const TableCell = styled.td`
  width: 20%;
`

export const HairColorIcon = styled.span`
display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ color }: { color: TUser['hair']['color'] }) =>
        Haircolor[color]};
`