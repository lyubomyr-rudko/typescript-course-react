import styled from "styled-components";

interface IColorProps {
  color: string;
}
export const ContainerTablename = styled.div`
  width: 100%;
  height: 54px;
  margin: 0 auto;
  display:flex;
  alighn-items:centre;
`;

export const Container = styled.div`
  width: 100%;
  height: 54px;
  margin: 0 auto;
  display:flex;
  alighn-items:centre;
  border-bottom: 2px solid grey;
`;
export const SubContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 250px 150px 100px 200px 250px;
  height: 100%px;
  width:fit-content;
  margin:0 auto;
`;
export const HairColor = styled.div<IColorProps>`
  width:21px;
  height: 21px;
  border-radius: 50%;
  background-color:${(props) => (props.color==='Blond' ? "lightcoral" : props.color)};
  
`;

export const SubContainerHeader = styled.div`
  display: inline-grid;
  grid-template-columns: 250px 150px 100px 200px 250px;
  height: 100%px;
  width:fit-content;
  margin:0 auto;
  color:#6F767E
`;
export const ContainerHeader = styled.div`
  width: 100%;
  height: 54px;
  margin: 0 auto;
  display:flex;
  alighn-items:centre;
  margin-bottom:20px
`;