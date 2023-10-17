'use client'
import styled, { css } from 'styled-components';

interface IStyleProps {
  width?: string;
  height?: string;
  labelFontSize?: string;
  padding?: string;
  borderRadius?: string;
  fontSize?: string;
  isShow?: boolean
}

export const Wrapper = styled.div<IStyleProps>`
position: relative;
  display: inline-flex;
  flex-direction: column;
  row-gap: 8px;
  width: ${({ width }) => width || '100%'};
`;

export const Input = styled.input<IStyleProps>`
  height: ${({ height }) => height || '40px'};
  width: 100%;
  padding: ${({ padding }) => padding || '8px 16px'};
  border: solid 1px rgba(130, 143, 163, 0.25);
  border-radius: ${({ borderRadius }) => borderRadius || '8px'};
  font-size: ${({ fontSize }) => fontSize || '13px'};
  font-weight: 500;
  /* color: ${({ theme }) => theme.textColor}; */
  outline: none;
  background-color: transparent;
`;

export const Label = styled.label<IStyleProps>`
  display: inline;
  color: #828FA3;
  font-size: ${({ labelFontSize }) => labelFontSize || '12px'};
  font-weight: 500;
`;

export const DropDownMenu = styled.div<IStyleProps>`
  position: absolute;
  top: 65px;
  display: grid;
  width: ${({ width }) => width || '100%'};
  grid-template-rows: 0fr;
  transition: all 1s;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 1);

  ul {
    overflow: hidden;
    padding: 0 16px;
  }

  ${({ isShow }) => isShow && css`
  
    grid-template-rows: 1fr;
    
    ul {
      overflow: visible;
      padding: 16px; 
    }
  `}
`;

export const OptionsList = styled.ul<IStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 8px;
  border-radius: 8px;
  ${({ isShow }) => isShow && css`
    border: solid 1px rgba(130, 143, 163, 0.25);
  `}
  /* background-color: ${({ theme }) => theme.primaryBgColor}; */
`;

export const OptionItem = styled.li`
  width: 100%;
  cursor: pointer;
  list-style-type: none;
  font-size: 13px;
  color: #000112;
  font-weight: 500;
  line-height: 23px; 

  &:hover {
    background-color:#E4EBFA;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 12px;
  color: #EA5555;
  font-weight: 500;
`;