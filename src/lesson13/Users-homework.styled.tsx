import styled from "styled-components";

const secondaryColor = "#6F767E"

export const Container = styled.div`
  padding:16px;
`;

export const Header = styled.div`
  color: ${secondaryColor};
  font-size: 1.5em;
  font-weight: 500;
  padding:16px
`

export const TableRow = styled.tr`
  display:flex;
  font-size:1em;
  font-weight:500;

  padding:1em 2em 1em 2em;

  border-bottom: 1px solid rgba(128, 128, 128, 0.3);
  margin-left:5%;
  margin-right:5%;
`

export const TableRowHeader = styled(TableRow)`
  color:${secondaryColor};
  border-bottom: none;
`

export const TableCell = styled.td`
  width:20%;
  text-align:left;
  margin-left:3px;
  margin-right:3px;
`

export const Table = styled.table`
  width:100%;
`

function getValidHairColor(color:string|undefined):string{
  switch(color?.toLowerCase()){
    case "black":
      return color.toLowerCase()

    case "blond":
      return "#FFD700"

    case "brown":
      return "brown"

    default:
      return "yellow"
  }
}

export const CircleHairColor = styled.canvas<{$inputColor?: string;}>`
  width:1.5em;
  height:1.5em;

  background: ${props => getValidHairColor(props.$inputColor) || "black"};
  border-radius:50%;
`