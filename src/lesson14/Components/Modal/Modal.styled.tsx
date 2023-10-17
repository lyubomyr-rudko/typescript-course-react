import styled from "styled-components";

export const ModalWrapper = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(9, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  opacity: ${({ active }) => active ? 1 : 0};
  pointer-events: ${({ active }) => active ? 'all' : 'none'};
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 30px;
  position: relative;
  padding: 40px;
  border-radius: 8px;
  background-color: white;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 24px;
  color: black;
  cursor: pointer;

  &:hover {
    color: red;

  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  row-gap: 10px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: black;
  text-align: center;
`;