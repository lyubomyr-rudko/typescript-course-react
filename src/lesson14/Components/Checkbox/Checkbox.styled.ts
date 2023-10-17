import styled from 'styled-components';

interface IStyleProps {
  width?: string,
  height?: string,
  labelFontSize?: string
  padding?: string
  borderRadius?: string
  fontSize?: string
}

export const Wrapper = styled.div<IStyleProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  column-gap: 12px;
`;

export const Input = styled.input<IStyleProps>`
  height: ${({ height }) => height || '18px'};
  width: ${({ width }) => width || '18px'};
`;

export const Label = styled.label<IStyleProps>`
  display: inline;
  color: #828FA3;
  font-size: ${({ labelFontSize }) => labelFontSize || '14px'};
  font-weight: 500;
`;