import styled from "styled-components";

interface IColorDictionary {
    [key: string] : string
}

interface IHairColorPreviewProps {
    color: string
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
`

export const Table = styled.table`
  width: 100%;
  text-align: left;
  font-weight: 500;
`

export const THeadCell = styled.th`
  padding-bottom: 30px;
  color: gray;
  width: calc(100% / 5);
`

export const TableRow = styled.tr`
  position: relative;
  
  &:after {
    content: '';
    width: 110%;
    height: 1px;
    background: #eee;
    position: absolute;
    bottom: 0;
    left: -5%;
  }
`

export const TableCell = styled.td`
  padding: 15px 0;
  vertical-align: center;
`

export const Heading = styled.h1`
  color: gray;
  font-size: 24px;
  align-self: flex-start;
  margin-bottom: 50px;
`


const colorsDictionary: IColorDictionary = {
    Blond: '#FFFF00',
    Brown: '#964B00',
    Black: '#000',
    Chestnut: '#C4A484',
    Auburn: '#C04000',
}

export const HairColorPreview = styled.span<IHairColorPreviewProps>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ color }: IHairColorPreviewProps) => colorsDictionary[color]};
`
export const Loader = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`
export const InputWrapper = styled.div`
  width: 100%;
  height: 35px;
  margin-bottom: 45px;
  text-align: left;
  position: relative;
    
  label {
    position: absolute;
    top: -18px;
    left: 0;
  }
  
  input:not([type='checkbox']), select {
    width: 100%;
    height: 100%;
    color: #000
  }
  
  div {
    color: #f00;
    font-size: 12px;
  }
`
