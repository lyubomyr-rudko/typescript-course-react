import styled from "styled-components";

interface IHairColor {
  hairColor: string;
}

export const Container = styled.div`
background-color: white;
`;

export const HeadText = styled.h2`
font-size: 24px;
color: grey;
margin: 0 0 30px 20px;
`

export const HeaderList = styled.ul`
display: flex;
justify-content: space-evenly;
margin-bottom: 30px;
`;

export const HeaderSublist = styled.li`
color: grey;
`

export const UnorderedList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid grey
  `;
  
  export const List = styled.li`
  color: black;
`

export const HairColor = styled.p<IHairColor>`
background: ${props => props.hairColor};
border-radius: 20px;
width: 20px;
height: 20px;
`