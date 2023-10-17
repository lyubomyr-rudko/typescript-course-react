import styled from 'styled-components';

interface IProps {
  width?: string;
}

export const Button = styled.button<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  width: ${({ width }) => width || "200px"};
  height: 40px;
  color: white;
  font-size: 14px;
  background-color: #1F96A8;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    cursor: auto;
    background-color: #ebe8e8;
    color:#3C3E3D;
  }
`;