import styled from "styled-components";

export const Container = styled.div`
  padding: 40px 20px;
  width: 1120px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #6F767E;
  margin-bottom: 20px;
`

export const Table = styled.table`
  width: 100%;
`;

export const Thead = styled.thead`

  height: 52px;
  th {
    color: #6F767E;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    text-align: center; 
    vertical-align: middle;
  }
`;

export const Tbody = styled.tbody`
  tr {
    border-bottom: 1px solid rgba(30, 32, 37, 0.08);
  }
  td {
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    height: 52px;
    text-align: center; 
    vertical-align: middle;
  }
`;

export const HairColorIcon = styled.span<{ color: string }>`
  display: inline-block;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

